// Animation classes
const animations = {
  "ca__fx-blurInFromLeft": "animate-blur-in-from-left",
  "ca__fx-blurInFromRight": "animate-blur-in-from-right",
  "ca__fx-blurInFromTop": "animate-blur-in-from-top",
  "ca__fx-quiver": "animate-quiver",
};

// Initialize animations when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all elements with cssanimation class
  const animatedElements = document.querySelectorAll(".cssanimation");
  animatedElements.forEach((element) => {
    // Get the animation class from the element's classes
    const animationClass = Array.from(element.classList).find(
      (cls) => animations[cls]
    );
    if (animationClass) {
      // Add the corresponding Tailwind animation class
      element.classList.add(animations[animationClass]);
    }
  });

  // Open and close location Modal with embedded map
  const html = document.getElementById("html");
  const locationModal = document.getElementById("locationModal");
  const iframe = locationModal.querySelector("iframe");

  // Function to open modal
  function openLocationModal() {
    locationModal.classList.remove("hidden");
    html.classList.add("overflow-y-hidden");
  }

  // Function to close modal
  function closeLocationModal() {
    locationModal.classList.add("hidden");
    html.classList.remove("overflow-y-hidden");
  }

  // Close modal when clicking outside the iframe
  locationModal.addEventListener("click", (event) => {
    // Check if the click happened directly on the backdrop, not inside the iframe
    if (!iframe.contains(event.target)) {
      closeLocationModal();
    }
  });

  // Make the open function global (if using onclick in HTML)
  window.openLocationModal = openLocationModal;
});
