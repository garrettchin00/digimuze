// Sign up page
document.body.className = 'signup-page';

document.body.innerHTML = `
  <div class="signup-container">
    <form class="signup-form" id="signup-form">
      <h1>Sign Up for DigiMaze</h1>
      
      <!-- Container to show success or error feedback -->
      <div id="status-message" role="alert"></div>

      <label for="firstname">First Name:</label>
      <input type="text" id="firstname" name="first_name" required>
      
      <label for="lastname">Last Name:</label>
      <input type="text" id="lastname" name="lastname" required>
      
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br><br>
      
      <button type="submit">Sign Up</button>
      
      <p>Already have an account?</p>
      <br><button id="login-button" onclick="window.location.href='login.html'">Login here</button>
    </form>
  </div>
`;

const signupForm = document.getElementById('signup-form');
const statusMessage = document.getElementById('status-message');

// Helper function to display messages cleanly
function showMessage(text, isSuccess) {
  statusMessage.textContent = text;
  statusMessage.style.color = isSuccess ? 'green' : 'red';
  statusMessage.style.marginBottom = '10px';
  statusMessage.style.fontWeight = 'bold';
}

// Handle Form Submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Stops the browser from refreshing the page

  // Collect all input values automatically using their 'name' attributes
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  try {
    // Replace '/api/signup' with your actual backend endpoint
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      // 1. UNSUCCESSFUL / SUCCESSFUL: Handle Success
      showMessage('Sign up successful! Redirecting to login...', true);
      form.reset(); // Clears the inputs
      
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      // 2. Handle server-side errors (e.g., email/username already taken)
      const errorData = await response.json();
      showMessage(errorData.message || 'Sign up failed. Please try again.', false);
    }
  } catch (error) {
    // 3. Handle network errors (e.g., server offline or no internet)
    showMessage('Unable to connect to the server. Please try again later.', false);
  }
});

// Handle login button redirect
document.getElementById('login-button').addEventListener('click', () => {
  window.location.href = 'login.html';
});