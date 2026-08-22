const menu = document.querySelector('[data-mobile-menu]');
const openButton = document.querySelector('[data-mobile-menu-open]');
const closeButton = document.querySelector('[data-mobile-menu-close]');

if (menu instanceof HTMLDialogElement && openButton instanceof HTMLButtonElement) {
  let trigger = null;
  const closeMenu = () => {
    if (menu.open) menu.close();
  };

  openButton.addEventListener('click', () => {
    trigger = document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
    menu.showModal();
    openButton.setAttribute('aria-expanded', 'true');
    closeButton?.focus();
  });
  closeButton?.addEventListener('click', closeMenu);

  menu.addEventListener('click', (event) => {
    if (event.target === menu) closeMenu();
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  menu.addEventListener('close', () => {
    openButton.setAttribute('aria-expanded', 'false');
    trigger?.focus();
    trigger = null;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) closeMenu();
  });

  const desktopQuery = window.matchMedia('(min-width: 68rem)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}
