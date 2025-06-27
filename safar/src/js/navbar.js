// Common navbar functionality for Safar project

// Function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("safarUser") !== null;
}

// Function to get current user data
function getCurrentUser() {
  const userData = localStorage.getItem("safarUser");
  return userData ? JSON.parse(userData) : null;
}

// Function to render navbar based on login status
function renderNavbarUser() {
  const authButtons = document.getElementById("authButtons");
  const profileSection = document.getElementById("profileSection");
  const userWelcome = document.getElementById("userWelcome");
  const userName = document.getElementById("userName");

  if (isLoggedIn()) {
    const user = getCurrentUser();

    // Hide auth buttons, show profile section
    if (authButtons) authButtons.classList.add("hidden");
    if (profileSection) profileSection.classList.remove("hidden");

    // Update user information
    if (user && user.name) {
      if (userWelcome) userWelcome.textContent = `Welcome, ${user.name}!`;
      if (userName) userName.textContent = user.name;
    } else {
      if (userWelcome) userWelcome.textContent = "Welcome, User!";
      if (userName) userName.textContent = "Profile";
    }
  } else {
    // Show auth buttons, hide profile section
    if (authButtons) authButtons.classList.remove("hidden");
    if (profileSection) profileSection.classList.add("hidden");
  }
}

// Function to handle logout
function logout() {
  // Clear user data from localStorage
  localStorage.removeItem("safarUser");

  // Re-render navbar
  renderNavbarUser();

  // Redirect to home page - detect current page location
  const currentPath = window.location.pathname;
  if (currentPath.includes("/src/") || currentPath.includes("/safar/src/")) {
    // If we're in a src subdirectory, go up two levels
    window.location.href = "../index.html";
  } else if (currentPath.includes("/safar/")) {
    // If we're in the safar directory, go to index.html
    window.location.href = "./index.html";
  } else {
    // Default case
    window.location.href = "./index.html";
  }
}

// Profile dropdown toggle functionality
function setupProfileDropdown() {
  const profileButton = document.getElementById("profileButton");
  const profileDropdown = document.getElementById("profileDropdown");
  const logoutButton = document.getElementById("logoutButton");

  if (profileButton && profileDropdown) {
    // Toggle dropdown when profile button is clicked
    profileButton.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      profileDropdown.classList.add("hidden");
    });

    // Prevent dropdown from closing when clicking inside it
    profileDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Handle logout
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
}

// Initialize navbar functionality
function initializeNavbar() {
  renderNavbarUser();
  setupProfileDropdown();
}

// Auto-initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeNavbar();
});

// Also initialize on window load as fallback
window.addEventListener("load", function () {
  initializeNavbar();
});
