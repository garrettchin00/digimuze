// Log in page
document.body.className = "login-page";

document.body.innerHTML = `
  <div class="login-container">
    <form class="login-form" id="login-form">
      <h1>Login to DigiMuze</h1>
      
      <!-- Placeholder for success or error messages -->
      <p id="login-message" style="font-weight: bold;"></p>

      <label for="username-email">Username or Email:</label>
      <input type="text" id="username-email" name="username-email" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>

      <br><button type="submit">Login</button>

      <p>Don't have an account?</p>
      <br><button type="button" id="signup-button">Sign up here</button>.
    </form>
  </div>
`;

const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("login-message");

// Handle form submission
loginForm.addEventListener("submit", (event) => {
  // 1. Stop the page from refreshing
  event.preventDefault();

  // 2. Grab the user's input
  const usernameInput = document.getElementById("username-email").value.trim();
  const passwordInput = document.getElementById("password").value;

  // 3. Check credentials (Replace this block with a real backend API call later)
  if (usernameInput === "admin" && passwordInput === "1234") {
    messageEl.textContent = "Login successful! Redirecting...";
    messageEl.style.color = "green";
    
    // Optional: Redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } else {
    messageEl.textContent = "Invalid username/email or password. Please try again.";
    messageEl.style.color = "red";
  }
});

// Handle signup redirect
document.getElementById("signup-button").addEventListener("click", () => {
  window.location.href = "signup.html";
});