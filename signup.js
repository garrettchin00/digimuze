// Sign up page
document.body.className = 'signup-page';

document.body.innerHTML = `
  <div class="signup-container">
    <form class="signup-form" id="signupForm">
      <h1>Sign Up for DigiMuze</h1>
      
      <label for="firstname">First Name:</label>
      <input type="text" id="firstname" name="first_name" required>
      
      <label for="lastname">Last Name:</label>
      <input type="text" id="lastname" name="last_name" required>
      
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>
      
      <!-- Placeholder for the status message -->
      <p id="status-message"></p>

      <br><button type="submit">Sign Up</button>
      
      <p>Already have an account?</p>
      <br><button type="button" id="login-button">Login here</button>
    </form>
  </div>
`;

const signupForm = document.getElementById('signupForm');
const statusMessage = document.getElementById('status-message');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    firstName: document.getElementById('firstname').value,
    lastName: document.getElementById('lastname').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    // Example: Replace this block with your actual backend API call or validation
    // const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify(formData) });
    // if (!response.ok) throw new Error('Username or email already taken.');

    // Simulated check (e.g., password must be at least 6 characters)
    if (formData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    // --- SUCCESS STATE ---
    statusMessage.textContent = 'Sign up successful! Redirecting to login...';
    statusMessage.style.color = 'green';
    signupForm.reset(); // Clears the input fields

    // Optional: Redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);

  } catch (error) {
    // --- ERROR STATE ---
    statusMessage.textContent = `Sign up failed: ${error.message}`;
    statusMessage.style.color = 'red';
  }
});