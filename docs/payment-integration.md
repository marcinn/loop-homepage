# Integracja darowizn z PayU

Frontend Hugo jest statyczny, dlatego **nie może bezpiecznie przechowywać `client_secret` PayU**. JavaScript w `static/js/donations.js` wysyła wyłącznie dane darowizny do własnego endpointu serwerowego.

Konfiguracja publiczna znajduje się w `hugo.toml`:

- `params.payments.provider = "payu"`
- `params.payments.merchant_pos_id` — identyfikator POS (nie jest używany do podpisywania żądań w przeglądarce)
- `params.payments.create_order_endpoint` — endpoint backendu LOOP
- `params.payments.currency`
- `params.payments.min_amount`

Sekrety są w konfiguracji backendu (`config/payment-server.example.env`).

## Kontrakt endpointu

`POST /donations/payu/order`

```json
{
  "project": "maszyna-reloaded",
  "amount": 50,
  "currency": "PLN",
  "email": "user@example.org",
  "returnUrl": "https://loop.org.pl/?payment=thanks"
}
```

Backend powinien:

1. zweryfikować kwotę i identyfikator projektu,
2. pobrać token OAuth PayU przy użyciu `client_id` i `client_secret`,
3. utworzyć zamówienie w PayU,
4. zapisać własny identyfikator darowizny i projekt,
5. zwrócić wyłącznie bezpieczne dane:

```json
{
  "redirectUri": "https://secure.snd.payu.com/...",
  "orderId": "..."
}
```

Po stronie `notifyUrl` backend powinien weryfikować status płatności i dopiero po potwierdzeniu oznaczać darowiznę jako opłaconą.

Dokumentacja PayU: https://developers.payu.com/europe/pl/docs/payment-flows/auth-and-order/

## Lokalny przykład backendu

Przykład w `backend-example/server.mjs` wymaga Node.js 20+. Skopiuj wartości z `config/payment-server.example.env` do własnego `.env`/sekretów środowiska i uruchom proces z odpowiednimi zmiennymi. W czasie developmentu ustaw `params.payments.create_order_endpoint` w `hugo.toml` na `http://localhost:8787/donations/payu/order`.

Kod przykładowy celowo nie implementuje pełnej księgowości darowizn, idempotencji ani weryfikacji callbacków produkcyjnych. To element, który powinien działać w trwałym backendzie fundacji.
