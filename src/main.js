import "flowbite";
import "./animations";
import AOS from "aos";
import "aos/dist/aos.css";

// Import fonts
import "@fontsource-variable/grandstander";
import "@fontsource-variable/inter";
import "@fontsource-variable/outfit";
import "@fontsource-variable/rasa";

// Initialize components after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with options
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 100,
    delay: 0,
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
            if (targetId === "services") {
              extraOffset = window.innerWidth >= 1024 ? 50 : -25;
            }

            // Calculate position with offset
            const targetPosition =
              targetSection.offsetTop - headerHeight + extraOffset;

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

  // Theme toggle functionality (only if elements exist)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );

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

      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }
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
  const navBar = document.getElementById("navbar");

  let lastScrollY = window.scrollY;
  let isScrolling = false;

  const isSmallScreen = () => window.matchMedia("(max-width: 1023px)").matches;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    const isMobileMenuOpen =
      mobileMenu && mobileMenu.classList.contains("open");

    // ✅ Background + shadow toggle
    if (currentScrollY > 0) {
      navBar.classList.remove("bg-neutral");
      navBar.classList.add("bg-white", "shadow-sm");
    } else {
      navBar.classList.remove("bg-white", "shadow-sm");
      navBar.classList.add("bg-neutral");
    }

    // ✅ Hide/show on mobile scroll
    if (isSmallScreen() && !isMobileMenuOpen) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navBar.classList.add("-translate-y-full");
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        navBar.classList.remove("-translate-y-full");
      }
    } else {
      // Reset transforms on desktop
      navBar.classList.remove("-translate-y-full");
    }

    lastScrollY = currentScrollY;
    isScrolling = false;
  }

  // ✅ Throttled scroll listener
  window.addEventListener("scroll", function () {
    if (!isScrolling) {
      window.requestAnimationFrame(updateNavbar);
      isScrolling = true;
    }
  });


  // ✅ On resize, also update
  window.addEventListener("resize", updateNavbar);

  // ✅ Run once on page load (handles refresh-in-middle issue)
  updateNavbar();
});
