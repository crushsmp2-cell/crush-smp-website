(() => {
  const languageToggle = document.getElementById('languageToggle');
  let language = 'en';
  languageToggle?.addEventListener('click', () => {
    language = language === 'en' ? 'hi' : 'en';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-hi]').forEach((element) => {
      element.innerHTML = element.dataset[language];
    });
    languageToggle.textContent = language === 'en' ? 'हिंदी' : 'English';
  });

  const selectedRanks = new Map();
  const panel = document.getElementById('interestPanel');
  const items = document.getElementById('interestItems');
  const renderCart = () => {
    if (!panel || !items) return;
    panel.hidden = selectedRanks.size === 0;
    items.textContent = [...selectedRanks.entries()]
      .map(([rank, price]) => `${rank} — ₹${price} (draft)`).join(' · ');
  };
  document.querySelectorAll('.add-rank').forEach((button) => {
    button.addEventListener('click', () => {
      const rank = button.dataset.rank;
      if (selectedRanks.has(rank)) selectedRanks.delete(rank);
      else selectedRanks.set(rank, button.dataset.price);
      button.textContent = selectedRanks.has(rank) ? 'Remove from list' : 'Add to interest list';
      renderCart();
    });
  });
  document.getElementById('clearInterest')?.addEventListener('click', () => {
    selectedRanks.clear();
    document.querySelectorAll('.add-rank').forEach((button) => button.textContent = 'Add to interest list');
    renderCart();
  });

  const modal = document.getElementById('discordModal');
  const closeModal = () => { if (modal) modal.hidden = true; };
  document.getElementById('closeModal')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  try {
    if (modal && !sessionStorage.getItem('crushPromptSeen')) {
      window.setTimeout(() => {
        modal.hidden = false;
        sessionStorage.setItem('crushPromptSeen', 'yes');
      }, 6500);
    }
  } catch (_) { /* Session storage may be unavailable in some preview modes. */ }
})();
