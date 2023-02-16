const form = document.querySelector('#form') as HTMLFormElement;
const products: any[] = [];

form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const title = (document.querySelector('#title') as HTMLInputElement).value;
  const author = (document.querySelector('#author') as HTMLInputElement).value;
  const bookDescription = (document.querySelector('#bookDescription') as HTMLInputElement).value;
  const imageURL = (document.querySelector('#imageURL') as HTMLInputElement).value;
  const price = (document.querySelector('#price') as HTMLInputElement).value;
  const category = (document.querySelector('#category') as HTMLInputElement).value;

  const productData = {
    product_ID: Math.floor(Math.random() * 100000),
    title: title,
    author: author,
    bookDescription: bookDescription,
    imageURL: imageURL,
    price: price,
    category: category,
  };

  // Send the data to the API endpoint
  products.push(productData);

  // Send the data to the API endpoint
  fetch('http://localhost:8000/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Registration successful');
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed. Please try again later.');
    });
});
