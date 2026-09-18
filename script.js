const roleRadios = document.querySelectorAll('input[name="role"]');
const loginForm = document.getElementById('loginForm');

roleRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      // Change form action based on selected role
      if (radio.value === 'student') {
        loginForm.action = 'StudentLoginServlet';
      } else if (radio.value === 'warden') {
        loginForm.action = 'WardenLoginServlet';
      }
    }
  });
});

