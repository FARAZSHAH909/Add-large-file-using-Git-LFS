let contactObj = JSON.parse(localStorage.getItem('contactObj')) || [];
let Fullname = document.querySelector('#name');
let subject = document.querySelector('#subject');
let email = document.querySelector('#email');
let textarea = document.querySelector('#textarea');
let information = document.querySelector('.people');
let submit = document.querySelector('#submit');

// Function to display contacts
const displayContacts = () => {
    information.innerHTML = ''; // Clear existing content
    contactObj.forEach(contact => {
        let contactDiv = document.createElement('div');
        contactDiv.innerHTML = `<strong>${contact.name}</strong><br>
                                Email: ${contact.email}<br>
                                Subject: ${contact.subject}<br>
                                Message: ${contact.message}<br><br>`;
                                information.appendChild(contactDiv);
    });
};

// Load initial contacts
displayContacts();

submit.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    // Check if any of the fields are empty
    if (Fullname.value === '' || subject.value === '' || email.value === '' || textarea.value === '') {
        Swal.fire({
            icon: "error",
            title: "Fill all fields",
            text: "Please fill in all fields!"
        });
        console.log('Please fill in all fields');
    } else {
        // Create a new object for the contact
        let newContact = {
            name: Fullname.value,
            email: email.value,
            subject: subject.value,
            message: textarea.value
        };

        // Push the new contact to the array
        contactObj.push(newContact);
        
        // Save the updated array to localStorage
        localStorage.setItem('contactObj', JSON.stringify(contactObj));

        // Clear the form fields
        document.querySelector('#myform').reset();

        // Display the updated list of contacts
        displayContacts();

        console.log(contactObj);
    }
});
