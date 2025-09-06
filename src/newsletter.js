// Newsletter Subscription Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const subscribeButton = document.getElementById("subscribe-button");
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  // Handle form submission
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = emailInput.value.trim();

      if (!email || !isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      subscribeButton.disabled = true;
      subscribeButton.classList.add("opacity-75");
      subscribeButton.innerText = "Submitting...";

      setTimeout(() => {
        emailInput.value = "";
        subscribeButton.disabled = false;
        subscribeButton.classList.remove("opacity-75");
        subscribeButton.innerText = "Subscribe";

        showNotification(
          "Thank you! You've been subscribed to our newsletter.",
          "success"
        );
      }, 1000);
    });
  }
  // Function to show notifications
  function showNotification(message, type) {
    if (notificationContainer) {
      notificationContainer.innerHTML = "";

      const notification = document.createElement("div");
      notification.className = `py-2 px-4 rounded-md text-sm font-medium ${
        type === "success"
          ? "bg-green-50 text-green-800 border border-green-200"
          : "bg-red-50 text-red-800 border border-red-200"
      } flex items-center space-x-2`;

      const iconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      iconSvg.setAttribute("class", "w-4 h-4 flex-shrink-0");
      iconSvg.setAttribute("fill", "currentColor");
      iconSvg.setAttribute("viewBox", "0 0 20 20");

      const iconPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      // Set icon path based on notification type
      if (type === "success") {
        iconPath.setAttribute("fill-rule", "evenodd");
        iconPath.setAttribute(
          "d",
          "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        );
        iconPath.setAttribute("clip-rule", "evenodd");
      } else {
        iconPath.setAttribute("fill-rule", "evenodd");
        iconPath.setAttribute(
          "d",
          "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        );
        iconPath.setAttribute("clip-rule", "evenodd");
      }

      iconSvg.appendChild(iconPath);

      const textSpan = document.createElement("span");
      textSpan.textContent = message;

      notification.appendChild(iconSvg);
      notification.appendChild(textSpan);

      notificationContainer.appendChild(notification);

      setTimeout(() => {
        notification.classList.add(
          "opacity-0",
          "transition-opacity",
          "duration-500"
        );
        setTimeout(() => {
          notificationContainer.innerHTML = "";
        }, 500);
      }, 5000);
    }
  }
  // Simple email validation
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
