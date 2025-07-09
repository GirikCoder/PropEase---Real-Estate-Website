const backendUrl = 'https://your-backend-url.com/api'; // CHANGE THIS to your backend API URL

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      try {
        const res = await fetch(`${backendUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('Login failed');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = signupForm.name.value;
      const email = signupForm.email.value;
      const password = signupForm.password.value;
      try {
        const res = await fetch(`${backendUrl}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        alert('Signup failed');
      }
    });
  }
}); 