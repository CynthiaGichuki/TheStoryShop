const form = document.getElementById('signup-form') as HTMLFormElement;
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event: Event) {
  event.preventDefault();

  const emailInput = document.getElementById('Email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  const emailError = document.getElementById('email-error') as HTMLElement;
  const passwordError = document.getElementById('password-error') as HTMLElement;

  // Reset error messages
  emailError.innerText = '';
  passwordError.innerText = '';

  // Validate email and password
  let isValid = true;

  if (emailInput.value === '') {
    emailError.innerText = 'Please enter your email';
    isValid = false;
  }

  if (passwordInput.value === '') {
    passwordError.innerText = 'Please enter your password';
    isValid = false;
  }

  if (isValid) {
    // Make API call to login
    fetch('http://localhost:8000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
     
      if (data.email === "gichukicynthia1@gmail.com") {
       return  window.location.href = './products.html';
      } else {
       return window.location.href = './home.html';
      }
      // Redirect to home page

    })
    .catch(error => console.error(error));
  }
}
