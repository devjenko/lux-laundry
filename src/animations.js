// Animation classes
const animations = {
  'ca__fx-blurInFromLeft': 'animate-blur-in-from-left',
  'ca__fx-blurInFromRight': 'animate-blur-in-from-right',
  'ca__fx-blurInFromTop': 'animate-blur-in-from-top',
  'ca__fx-quiver': 'animate-quiver'
};

// Initialize animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all elements with cssanimation class
  const animatedElements = document.querySelectorAll('.cssanimation');
  animatedElements.forEach(element => {
    // Get the animation class from the element's classes
    const animationClass = Array.from(element.classList).find(cls => animations[cls]);
    if (animationClass) {
      // Add the corresponding Tailwind animation class
      element.classList.add(animations[animationClass]);
    }
  });
});
