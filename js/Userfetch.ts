async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:8000/user');
    const users = await response.json();
    const table = document.createElement('table');
    const tableContainer = document.querySelector('.table-container');

    console.log(users);
    const headers = ["User ID", "First Name", "Last Name", "Email", "User Role"];
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.innerText = header;
      table.appendChild(th);
    });

    users.forEach((user: any) => {
      const row = table.insertRow();
      const userIdCell = row.insertCell();
      const firstNameCell = row.insertCell();
      const lastNameCell = row.insertCell();
      const emailCell = row.insertCell();
      const userRoleCell = row.insertCell();

      userIdCell.innerHTML = user.user_id;
      firstNameCell.innerHTML = user.first_name;
      lastNameCell.innerHTML = user.last_name;
      emailCell.innerHTML = user.email;
      userRoleCell.innerHTML = user.user_role;
    });

    tableContainer.appendChild(table);

  } catch (error) {
    console.error(error);
  }
}

fetchUsers();
