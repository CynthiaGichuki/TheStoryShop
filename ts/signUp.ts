const form = document.querySelector('.signIn');
const emailInput = document.querySelector('#Email') as HTMLInputElement;
const passwordInput = document.querySelector('#password') as HTMLInputElement;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const { token, user_role } = await response.json();

      if (user_role === 'admin') {
        window.location.href = '/admin.html';
      } else {
        window.location.href = '/home.html';
      }

    } catch (error) {
      console.error(error.message);
    }
  };

  const email = emailInput.value;
  const password = passwordInput.value;

  login(email, password);
});
