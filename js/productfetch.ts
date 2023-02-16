async function fetchProducts(): Promise<void> {
  try {
    const response = await fetch('http://localhost:8000/product');
    const products = await response.json();

    const table = document.createElement('table');
    const tableContainer = document.querySelector('.table-container');

    const headers: string[] = ["Product ID", "Title", "Author", "Category", "Price", "Update"];
    headers.forEach((header: string) => {
      const th = document.createElement("th");
      th.innerText = header;
      table.appendChild(th);
    });

    products.forEach((product: any) => {
      const row = table.insertRow();
      const productIdCell = row.insertCell();
      const titleCell = row.insertCell();
      const authorCell = row.insertCell();
    
      const priceCell = row.insertCell();
      const categoryCell = row.insertCell();
      const updateCell = row.insertCell();

      productIdCell.innerHTML = product.product_ID;
      titleCell.innerHTML = product.title;
      authorCell.innerHTML = product.author;
     
      priceCell.innerHTML = product.price;
      categoryCell.innerHTML = product.category;

      const updateButton = document.createElement("button");
      updateButton.innerText = "Update";
      updateButton.addEventListener("click", () => {
        
        console.log(`Updating product with ID ${product.product_ID}`);
      });
      updateCell.appendChild(updateButton);
    });

    tableContainer.appendChild(table);

  } catch (error) {
    console.error(error);
  }
}

fetchProducts();
