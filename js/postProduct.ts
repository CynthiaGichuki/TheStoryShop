const form = document.querySelector<HTMLFormElement>('#product-form');
const updateButton = document.querySelector<HTMLButtonElement>('#update-button');
let productId: string | null;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector<HTMLInputElement>('#title')!.value;
  const author = document.querySelector<HTMLInputElement>('#author')!.value;
  const bookDescription = document.querySelector<HTMLInputElement>('#bookDescription')!.value;
  const imageURL = document.querySelector<HTMLInputElement>('#imageURL')!.value;
  const price = document.querySelector<HTMLInputElement>('#price')!.value;
  const category = document.querySelector<HTMLInputElement>('#category')!.value;

  const productData = {
    title,
    author,
    bookDescription,
    imageURL,
    price,
    category,
  };

  if (productId) {
    // If a productId is set, update the existing product
    fetch(`http://localhost:8000/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('Product updated successfully');
        form.reset();
        productId = null; // Reset productId
        updateButton.style.display = 'none'; // Hide update button
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to update product. Please try again later.');
      });
  } else {
    // If no productId is set, create a new product
    productData.product_ID = Math.floor(Math.random() * 100000);

    fetch('http://localhost:8000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('Product added successfully');
        form.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add product. Please try again later.');
      });
  }
});

// Event listener for the edit button
const editButtons = document.querySelectorAll<HTMLButtonElement>('.edit-button');
editButtons.forEach((editButton) => {
  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    productId = editButton.dataset.productId; // Set productId
    updateButton.style.display = 'block'; // Show update button
    fetch(`http://localhost:8000/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector<HTMLInputElement>('#title')!.value = data.title;
        document.querySelector<HTMLInputElement>('#author')!.value = data.author;
        document.querySelector<HTMLInputElement>('#bookDescription')!.value = data.bookDescription;
        document.querySelector<HTMLInputElement>('#imageURL')!.value = data.imageURL;
        document.querySelector<HTMLInputElement>('#price')!.value = data.price;
        document.querySelector<HTMLInputElement>('#category')!.value = data.category;
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to retrieve product. Please try again later.');
      });
  });
});
