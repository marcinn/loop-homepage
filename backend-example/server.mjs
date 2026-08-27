/**
 * Minimalny przykład backendu PayU dla LOOP.
 * Node.js 20+; bez dodatkowych zależności.
 *
 * NIE wdrażaj bez dodania trwałego storage darowizn, idempotencji,
 * pełnej obsługi notyfikacji PayU, rate limiting i logowania audytowego.
 */
import http from 'node:http';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const SITE_ORIGIN = process.env.LOOP_SITE_ORIGIN || 'http://localhost:1313';
const ENV = process.env.PAYU_ENV || 'sandbox';
const PAYU_BASE = ENV === 'production' ? 'https://secure.payu.com' : 'https://secure.snd.payu.com';
const CLIENT_ID = must('PAYU_CLIENT_ID');
const CLIENT_SECRET = must('PAYU_CLIENT_SECRET');
const POS_ID = must('PAYU_MERCHANT_POS_ID');
const NOTIFY_URL = must('PAYU_NOTIFY_URL');
const CONTINUE_URL = process.env.PAYU_CONTINUE_URL || `${SITE_ORIGIN}/?payment=thanks`;

const projects = new Set(['general', 'maszyna-reloaded', 'a800mon', 'simplegamesfactory', 'godot-plugins']);

function must(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function json(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': SITE_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin'
  });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20_000) throw new Error('payload too large');
  }
  return JSON.parse(raw || '{}');
}

async function payuToken() {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });
  const response = await fetch(`${PAYU_BASE}/pl/standard/user/oauth/authorize`, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body
  });
  if (!response.ok) throw new Error(`PayU OAuth failed: ${response.status}`);
  return (await response.json()).access_token;
}

async function createOrder(req, payload) {
  const project = String(payload.project || 'general');
  const amount = Number(payload.amount);
  const currency = String(payload.currency || 'PLN');
  if (!projects.has(project)) throw new Error('unknown project');
  if (!Number.isFinite(amount) || amount < 5 || amount > 100000) throw new Error('invalid amount');
  if (currency !== 'PLN') throw new Error('unsupported currency');

  const amountGrosze = String(Math.round(amount * 100));
  const extOrderId = `loop-${project}-${crypto.randomUUID()}`;
  const token = await payuToken();
  const customerIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();

  const order = {
    notifyUrl: NOTIFY_URL,
    continueUrl: payload.returnUrl || CONTINUE_URL,
    customerIp,
    merchantPosId: POS_ID,
    description: project === 'general' ? 'Darowizna na LOOP' : `Darowizna na projekt LOOP: ${project}`,
    currencyCode: 'PLN',
    totalAmount: amountGrosze,
    extOrderId,
    products: [{name: 'Darowizna', unitPrice: amountGrosze, quantity: '1'}]
  };
  if (payload.email) order.buyer = {email: String(payload.email), language: 'pl'};

  const response = await fetch(`${PAYU_BASE}/api/v2_1/orders`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(order)
  });
  const text = await response.text();
  let data = {};
  try { data = JSON.parse(text); } catch { /* PayU may also expose Location */ }
  const redirectUri = data.redirectUri || response.headers.get('location');
  if (!redirectUri) throw new Error(`PayU order failed: ${response.status} ${text.slice(0,200)}`);

  // W produkcji zapisz extOrderId, project, amount i oczekiwany status w bazie.
  return {redirectUri, orderId: data.orderId || null, extOrderId};
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (req.method === 'POST' && req.url === '/donations/payu/order') {
    try {
      return json(res, 200, await createOrder(req, await readJson(req)));
    } catch (error) {
      console.error(error);
      return json(res, 400, {error: 'payment_init_failed'});
    }
  }
  if (req.method === 'POST' && req.url === '/donations/payu/notify') {
    // TODO: zweryfikuj notyfikację zgodnie z aktualną dokumentacją PayU,
    // odczytaj order/extOrderId z własnej bazy i oznacz płatność jako zakończoną.
    res.writeHead(204); return res.end();
  }
  return json(res, 404, {error: 'not_found'});
});

server.listen(PORT, () => console.log(`LOOP PayU example backend on http://127.0.0.1:${PORT}`));
