// Placeholder for authentication logic

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      // TODO: Send login request to backend
      console.log('Login:', { email, password });
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = signupForm.name.value;
      const email = signupForm.email.value;
      const password = signupForm.password.value;
      // TODO: Send signup request to backend
      console.log('Signup:', { name, email, password });
    });
  }
}); 