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

   const desktopCart = document.getElementById('desktopCart');
            const mobileCart = document.getElementById('mobileCart');
            const mobileCartHeader = document.getElementById('mobileCartHeader');
            
            // Get initial cart count
            updateCartCount();
            
            function updateHeaderCartCount(count) {
                const cartText = `CART (${count})`;
                if (desktopCart) desktopCart.textContent = cartText;
                if (mobileCart) mobileCart.textContent = cartText;
                if (mobileCartHeader) mobileCartHeader.textContent = cartText;
            }
            
            function updateCartCount() {
                fetch('{% url "cart:cart_count" %}')
                    .then(response => response.json())
                    .then(data => {
                        updateHeaderCartCount(data.total_items);
                    });
            }
    
            function openCart() {
                htmx.ajax('GET', '{% url "cart:cart_modal" %}', {
                    target: '#cart-container',
                    swap: 'innerHTML'
                });
            }
    
            [desktopCart, mobileCart, mobileCartHeader].forEach(cartLink => {
                if (cartLink) {
                    cartLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        openCart();
                    });
                }
            });

  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });
});
