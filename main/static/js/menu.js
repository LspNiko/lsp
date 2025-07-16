document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openMobileMenu);
  closeMenu.addEventListener('click', closeMobileMenu);
  overlay.addEventListener('click', closeMobileMenu);

  document.addEventListener('htmx:afterRequest', closeMobileMenu);
  document.addEventListener('htmx:afterSettle', updateActiveNavLinks);

  window.updateHeaderCartCount = function(count) {
    const cartText = `CART (${count})`;
    ['desktopCart', 'mobileCart', 'mobileCartHeader'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = cartText;
    });
  };

  function updateActiveNavLinks() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === currentPath);
    });
  }

  document.addEventListener('cartUpdated', function(e) {
    if (e.detail && e.detail.total_items !== undefined) {
      updateHeaderCartCount(e.detail.total_items);
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });
});
