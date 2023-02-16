const form = document.querySelector<HTMLFormElement>('#signup-form');

form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const firstName = (document.querySelector<HTMLInputElement>('#firstName') as HTMLInputElement).value;
  const lastname = (document.querySelector<HTMLInputElement>('#lastname') as HTMLInputElement).value;
  const emailAddress = (document.querySelector<HTMLInputElement>('#Email') as HTMLInputElement).value;

  const password = (document.querySelector<HTMLInputElement>('#password') as HTMLInputElement).value;
  const conPassword = (document.querySelector<HTMLInputElement>('#con_password') as HTMLInputElement).value;

  const userData = {
    user_ID: Math.floor(Math.random() * 100000),
    first_name: firstName.split(' ')[0],
    last_name: lastname.split(' ')[1] || '',
    email: emailAddress,
    user_password: password,
    user_role: 'user', 
  };


  fetch('http://localhost:8000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Registration successful');
      window.location.href = './signIn.html';
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed. Please try again later.');
    });
});
