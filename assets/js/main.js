(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-mobile-menu]');
  const openButton = document.querySelector('[data-menu-open]');
  const closeButton = document.querySelector('[data-menu-close]');

  try {
    sessionStorage.setItem('shinwa-intro-seen', 'true');
  } catch (_) {}

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (!menu || !openButton || !closeButton) return;

  const openMenu = () => {
    if (typeof menu.showModal === 'function') menu.showModal();
    else menu.setAttribute('open', '');
    openButton.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  };

  const closeMenu = () => {
    if (typeof menu.close === 'function') menu.close();
    else menu.removeAttribute('open');
    openButton.setAttribute('aria-expanded', 'false');
    openButton.focus();
  };

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  menu.addEventListener('cancel', () => openButton.setAttribute('aria-expanded', 'false'));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    if (menu.open) menu.close();
  }));

  const desktopQuery = window.matchMedia('(min-width: 900px)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches && menu.open) {
      menu.close();
      openButton.setAttribute('aria-expanded', 'false');
    }
  });

  root.classList.add('is-ready');
})();
