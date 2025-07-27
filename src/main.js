import "flowbite";
import { initTWE, Collapse } from "tw-elements";

// Initialize components after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Tailwind Elements
  initTWE({ Collapse });

  // Flowbite is automatically initialized, but you can manually reinitialize if needed
  // window.initFlowbite();

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

            // Calculate position with offset
            const targetPosition = targetSection.offsetTop - headerHeight - 20; // 20px extra padding

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

// Nav exit and appear animation when scrolling - Small screens only
document.addEventListener("DOMContentLoaded", function () {
  const navBar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("navbar-default");

  let lastScrollY = window.scrollY;
  let ticking = false;

  // Check if screen is smaller than lg breakpoint (1024px)
  const isSmallScreen = () => {
    return window.matchMedia("(max-width: 1023px)").matches;
  };

  function updateNavbar() {
    // Only run on small screens
    if (isSmallScreen()) {
      navBar.classList.add("bg-white");
    } else {
      // On large screens, ensure navbar is visible and has proper background
      navBar.classList.remove("-translate-y-full");
      navBar.classList.remove("bg-white");
      navBar.classList.add("bg-neutral");

      // Change the background color of the nav to white when scrolling down and back to neutral at the top of the page
      if (window.scrollY > 30) {
        navBar.classList.remove(
          "lg:bg-neutral",
          "opacity-[99%]",
          "lg:shadow-none"
        );
        navBar.classList.add("bg-white");
      } else {
        navBar.classList.add("lg:shadow-none");
      }
      ticking = false;
      return;
    }

    const currentScrollY = window.scrollY;

    // Check if mobile menu is open (has 'open' class)
    const isMobileMenuOpen =
      mobileMenu && mobileMenu.classList.contains("open");

    // Don't hide navbar if mobile menu is open
    if (isMobileMenuOpen) {
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // Only hide navbar when scrolling down and past a certain threshold. For smaller screen sizes only
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down - hide navbar
      navBar.classList.add("-translate-y-full");
    } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
      // Scrolling up or at top - show navbar
      navBar.classList.remove("-translate-y-full");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });

  // Handle screen size changes
  window.addEventListener("resize", function () {
    if (!isSmallScreen()) {
      // Reset navbar state for large screens
      navBar.classList.remove("-translate-y-full");
    }
  });

  // Initial check
  if (!isSmallScreen()) {
    navBar.classList.remove("-translate-y-full");
  }
});

window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});
