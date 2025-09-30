import "flowbite";
import './animations';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import fonts
import '@fontsource-variable/grandstander';
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import '@fontsource-variable/rasa';

// Initialize components after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with options
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    offset: 100,
    delay: 0
  });



  // Custom hamburger menu toggle
  const burgerButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("navbar-default");
  const hamburgerIcon = document.querySelector(".hamburger-icon");

  if (burgerButton && mobileMenu && hamburgerIcon) {
    let isOpen = false;

    burgerButton.addEventListener("click", function (e) {
      e.preventDefault();

      isOpen = !isOpen;

      // Toggle hamburger icon animation
      hamburgerIcon.classList.toggle("open", isOpen);

      // Toggle mobile menu visibility
      mobileMenu.classList.toggle("open", isOpen);

      // Update aria attributes for accessibility
      burgerButton.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        isOpen &&
        !burgerButton.contains(e.target) &&
        !mobileMenu.contains(e.target)
      ) {
        isOpen = false;
        hamburgerIcon.classList.remove("open");
        mobileMenu.classList.remove("open");
        burgerButton.setAttribute("aria-expanded", false);
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        isOpen = false;
        hamburgerIcon.classList.remove("open");
        mobileMenu.classList.remove("open");
        burgerButton.setAttribute("aria-expanded", false);
      }
    });

    // Close menu after clicking nav link and handle smooth scrolling with offset
    const navLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Only handle internal links (starting with #)
        if (href && href.startsWith("#") && href !== "#") {
          e.preventDefault();

          // Close menu if open
          if (isOpen) {
            isOpen = false;
            hamburgerIcon.classList.remove("open");
            mobileMenu.classList.remove("open");
            burgerButton.setAttribute("aria-expanded", false);
          }

          // Find the target section
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            // Get header height for offset
            const header = document.querySelector("header");
            const headerHeight = header ? header.offsetHeight : 0;
            
            // Add extra offset for services section
            let extraOffset = 0;
            if (targetId === 'services') {
              extraOffset = window.innerWidth >= 1024 ? 50 : -25; // Negative offset to scroll less
            }

            // Calculate position with offset
            const targetPosition = targetSection.offsetTop - headerHeight + extraOffset;

            // Smooth scroll to position
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        } else {
          // For non-internal links, just close the menu
          if (isOpen) {
            isOpen = false;
            hamburgerIcon.classList.remove("open");
            mobileMenu.classList.remove("open");
            burgerButton.setAttribute("aria-expanded", false);
          }
        }
      });
    });
  }
});

// Theme toggle functionality (only if elements exist)
var themeToggleBtn = document.getElementById("theme-toggle");
var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Only run theme toggle code if all elements exist
if (themeToggleBtn && themeToggleDarkIcon && themeToggleLightIcon) {
  // Change the icons inside the button based on previous settings
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.classList.remove("hidden");
  } else {
    themeToggleDarkIcon.classList.remove("hidden");
  }

  themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });
}

// Navbar scroll behavior
document.addEventListener("DOMContentLoaded", function () {
  const navBar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("navbar-default");
  let lastScrollY = window.scrollY;
  let isScrolling = false;

  // Check if screen is smaller than lg breakpoint (1024px)
  const isSmallScreen = () => window.matchMedia("(max-width: 1023px)").matches;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    const isMobileMenuOpen = mobileMenu && mobileMenu.classList.contains("open");
    const scrollDelta = currentScrollY - lastScrollY;

    // Desktop color change
    if (!isSmallScreen()) {
      if (currentScrollY > 30) {
        navBar.classList.remove("lg:bg-neutral", "opacity-[99%]", "lg:shadow-none", "xl:pt-10");
        navBar.classList.add("bg-white");
      } else {
        navBar.classList.add("lg:bg-neutral", "opacity-[99%]", "lg:shadow-none", "xl:pt-10");
        navBar.classList.remove("bg-white");
      }
      // Remove any transform classes that might be left from mobile view
      navBar.classList.remove("-translate-y-full");
      return;
    }

    // Add a small threshold for scroll sensitivity
    if (Math.abs(scrollDelta) < 5) {
      isScrolling = false;
      return;
    }

    // Mobile scroll behavior
    if (isSmallScreen() && !isMobileMenuOpen) {
      // Scrolling down & past threshold
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navBar.classList.add("-translate-y-full");
      } 
      // Scrolling up or at top
      else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        navBar.classList.remove("-translate-y-full");
      }
    }

    lastScrollY = currentScrollY;
    isScrolling = false;
  }

  // Handle scroll events with throttling
  window.addEventListener("scroll", function() {
    if (!isScrolling) {
      window.requestAnimationFrame(updateNavbar);
      isScrolling = true;
    }
  });

  // Handle resize events
  window.addEventListener("resize", updateNavbar);

  // Initial check
  updateNavbar();
});
