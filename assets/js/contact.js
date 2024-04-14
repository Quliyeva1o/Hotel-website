const nameWarn = document.getElementById("contact-name-warn");
const mailWarn = document.getElementById("contact-mail-warn");
const messageWarn = document.getElementById("contact-message-warn");
const ContactSubmitBtn = document.getElementById("contact-submit");
const nameInput = document.getElementById("name");
const mailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const table = document.getElementById("table");
const sortbyName = document.getElementById("sort-by-name");
const searchbyName = document.getElementById("searchbyname");
const clearCustBtn = document.getElementById("clear-customers");

let customersArr = [];
let id = 0;

class Customers {
    constructor(fullName, email, message) {
        this.fullName = fullName;
        this.email = email;
        this.message = message;
        this.isRead = false;
        this.id = id++;
    }
}

function addCustomer() {
    const customer = customersArr[customersArr.length - 1];
    if (customer) {
        table.innerHTML += `
            <tr>
                <th scope="row">${customer.id}</th>
                <td>${customer.fullName}</td>
                <td>${customer.email}</td>
                <td>${customer.message}</td>
                <td><a href="#" data-id="${customer.id}" class="customer-delete-btn">delete</a></td>
                <td><a href="#" data-id="${customer.id}" class="customer-mark-btn">mark as read</a></td>
            </tr>
        `;
    }
    deleteCustomer();
    markAsRead();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    let isValid = true;

    if (nameInput.value.trim().length == 0) {
        nameWarn.classList.replace('d-none', 'd-flex');
        isValid = false;
    }

    if (!validateEmail(mailInput.value.trim())) {
        mailWarn.classList.replace('d-none', 'd-flex');
        isValid = false;
    }

    if (messageInput.value.trim().length <= 10) {
        messageWarn.classList.replace('d-none', 'd-flex');
        isValid = false;
    }

    if (isValid) {
        ContactSubmitBtn.classList.add('enabled');
        ContactSubmitBtn.classList.remove('disabled');
    } else {
        ContactSubmitBtn.classList.remove('enabled');
        ContactSubmitBtn.classList.add('disabled');
    }

    return isValid;
}

mailInput.addEventListener('keyup', () => {
    if (!validateEmail(mailInput.value.trim())) {
        mailWarn.classList.replace('d-none', 'd-flex');
    } else {
        mailWarn.classList.replace('d-flex', 'd-none');
    }
});

nameInput.addEventListener('keyup', () => {
    nameWarn.classList.replace('d-flex', 'd-none');
});

messageInput.addEventListener('keyup', () => {
    if (messageInput.value.trim().length > 10) {
        messageWarn.classList.replace('d-flex', 'd-none');
    }
});

ContactSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm()) {
        ContactSubmitBtn.classList.remove('disabled');
        customersArr.push(new Customers(nameInput.value, mailInput.value, messageInput.value));
        nameInput.value = '';
        mailInput.value = '';
        messageInput.value = '';
        nameWarn.classList.replace('d-flex', 'd-none');
        mailWarn.classList.replace('d-flex', 'd-none');
        messageWarn.classList.replace('d-flex', 'd-none');
        addCustomer();
    }
});

function deleteCustomer() {
    const custDelBtns = document.querySelectorAll(".customer-delete-btn");

    custDelBtns.forEach(customerDelBtn => {
        customerDelBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const index = customersArr.findIndex(delcust => e.target.dataset.id == delcust.id);
            if (index !== -1) {
                customersArr.splice(index, 1);
                e.target.closest('tr').remove();
            }
        });
    });
}

function markAsRead() {
    const custMarkBtns = document.querySelectorAll(".customer-mark-btn");

    custMarkBtns.forEach(custMarkBtn => {
        custMarkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const index = customersArr.findIndex(mark => e.target.dataset.id == mark.id);
            if (index !== -1) {

                if (customersArr[index].isRead == false) {
                    const row = e.target.closest('tr');
                    row.classList.add('customer-read');
                    customersArr[index].isRead = true;
                }
                else {
                    const row = e.target.closest('tr');
                    row.classList.remove('customer-read');
                    customersArr[index].isRead = false;
                }

            }
        });
    });
}



clearCustBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (customersArr.length > 0) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                customersArr = []
                table.innerHTML = ""
                Swal.fire({
                    title: "Deleted!",
                    text: "Customers have been deleted!",
                    icon: "success"
                });
            }
        });

    }
}
)



searchbyName.addEventListener('keyup', (e) => {
    e.preventDefault();

    const filteredCustomers = customersArr.filter(customer => customer.fullName.toLowerCase().includes(e.target.value.trim().toLowerCase()));
    table.innerHTML = "";
    returnArr(filteredCustomers)
});




sortbyName.addEventListener('change', () => {

    let sortedCustomers = [];

    if (sortbyName.value === 'a-z') {
        sortedCustomers = customersArr.slice().sort((a, b) => a.fullName.localeCompare(b.fullName));
    } 
    else if (sortbyName.value === 'z-a') {
        sortedCustomers = customersArr.slice().sort((a, b) => b.fullName.localeCompare(a.fullName));
    }
    returnArr(sortedCustomers)

});



function returnArr(arr) {
    table.innerHTML = "";
    arr.forEach(customer => {
        table.innerHTML += `
            <tr>
                <th scope="row">${customer.id}</th>
                <td>${customer.fullName}</td>
                <td>${customer.email}</td>
                <td>${customer.message}</td>
                <td><a href="#" data-id="${customer.id}" class="customer-delete-btn">delete</a></td>
                <td><a href="#" data-id="${customer.id}" class="customer-mark-btn">mark as read</a></td>
            </tr>
        `;
    });

    deleteCustomer();
    markAsRead();
}

addCustomer();
