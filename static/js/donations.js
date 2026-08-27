(() => {
  const modal = document.getElementById('donation-modal');
  const form = document.getElementById('donation-form');
  if (!modal || !form) return;

  const label = modal.querySelector('[data-donation-project-label]');
  const projectInput = form.elements.project;
  const amountInput = form.elements.amount;
  const status = modal.querySelector('.form-status');
  const body = document.body;

  function openModal(project, projectLabel) {
    projectInput.value = project || 'general';
    label.textContent = projectLabel || 'LOOP';
    status.textContent = '';
    modal.hidden = false;
    document.documentElement.classList.add('modal-open');
    amountInput.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.documentElement.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-donate-project]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.donateProject, button.dataset.donateLabel));
  });
  modal.querySelectorAll('[data-modal-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });

  modal.querySelectorAll('[data-amount]').forEach((button) => {
    button.addEventListener('click', () => {
      amountInput.value = button.dataset.amount;
      modal.querySelectorAll('[data-amount]').forEach((b) => b.classList.toggle('is-selected', b === button));
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const endpoint = body.dataset.paymentEndpoint;
    const currency = body.dataset.paymentCurrency || 'PLN';
    const min = Number(body.dataset.paymentMin || 5);
    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount < min) {
      status.textContent = `Minimalna kwota to ${min} ${currency}.`;
      return;
    }
    if (!endpoint || endpoint.includes('REPLACE_ME')) {
      status.textContent = 'Integracja płatności jest w trybie demonstracyjnym. Ustaw create_order_endpoint w hugo.toml.';
      return;
    }

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    status.textContent = 'Tworzenie płatności…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: projectInput.value,
          amount,
          currency,
          email: form.elements.email.value || null,
          returnUrl: new URL(`${body.dataset.siteBase}?payment=thanks`, window.location.origin).href
        })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data.redirectUri) throw new Error('Brak redirectUri w odpowiedzi API');
      window.location.assign(data.redirectUri);
    } catch (error) {
      console.error(error);
      status.textContent = 'Nie udało się rozpocząć płatności. Spróbuj ponownie później.';
      submit.disabled = false;
    }
  });
})();
