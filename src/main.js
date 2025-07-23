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

// Nav exit and appear animation when scrolling
document.addEventListener("DOMContentLoaded", function () {
  const navBar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("navbar-default");
  console.log("Navbar element:", navBar); // Debug log

  if (!navBar) {
    console.error("Navbar element not found!");
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    console.log("Scroll Y:", currentScrollY, "Last:", lastScrollY); // Debug log

    // Check if mobile menu is open (has 'open' class)
    const isMobileMenuOpen =
      mobileMenu && mobileMenu.classList.contains("open");

    // Don't hide navbar if mobile menu is open
    if (isMobileMenuOpen) {
      console.log("Mobile menu is open, skipping navbar animation");
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // Only hide navbar when scrolling down and past a certain threshold
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down - hide navbar
      console.log("Adding -translate-y-full"); // Debug log
      navBar.classList.add("-translate-y-full");
    } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
      // Scrolling up or at top - show navbar
      console.log("Removing -translate-y-full"); // Debug log
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
});
