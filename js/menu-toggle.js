(function (Drupal, once) {
  Drupal.behaviors.ericsThemeMenuToggle = {
    attach(context) {
      once('erics-theme-menu-toggle', '.site-header', context).forEach(function (header) {
        const nav = header.querySelector('#block-erics-theme-main-menu');
        if (!nav) {
          return;
        }

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'menu-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'block-erics-theme-main-menu');
        toggle.innerHTML =
          '<span class="visually-hidden">Menu</span>' +
          '<span class="menu-toggle__bar"></span>' +
          '<span class="menu-toggle__bar"></span>' +
          '<span class="menu-toggle__bar"></span>';

        nav.insertAdjacentElement('beforebegin', toggle);

        toggle.addEventListener('click', function () {
          const isOpen = header.classList.toggle('nav-open');
          toggle.setAttribute('aria-expanded', String(isOpen));
        });

        nav.addEventListener('click', function (event) {
          if (event.target.closest('a')) {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });

        document.addEventListener('keydown', function (event) {
          if (event.key === 'Escape' && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
          }
        });
      });
    },
  };
})(Drupal, once);
