import 'flowbite';
import { initTWE, Collapse } from 'tw-elements';

// Initialize components after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Tailwind Elements
  initTWE({ Collapse });

  // Flowbite is automatically initialized, but you can manually reinitialize if needed
  // window.initFlowbite();

  // Custom hamburger menu toggle
  const burgerButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('navbar-default');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  if (burgerButton && mobileMenu && hamburgerIcon) {
    let isOpen = false;

    burgerButton.addEventListener('click', function (e) {
      e.preventDefault();

      isOpen = !isOpen;

      // Toggle hamburger icon animation
      hamburgerIcon.classList.toggle('open', isOpen);

      // Toggle mobile menu visibility
      mobileMenu.classList.toggle('open', isOpen);

      // Update aria attributes for accessibility
      burgerButton.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (
        isOpen &&
        !burgerButton.contains(e.target) &&
        !mobileMenu.contains(e.target)
      ) {
        isOpen = false;
        hamburgerIcon.classList.remove('open');
        mobileMenu.classList.remove('open');
        burgerButton.setAttribute('aria-expanded', false);
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        hamburgerIcon.classList.remove('open');
        mobileMenu.classList.remove('open');
        burgerButton.setAttribute('aria-expanded', false);
      }
    });
  }
});
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // if set via local storage previously
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
});
