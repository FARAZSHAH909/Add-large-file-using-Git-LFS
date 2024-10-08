const dbRequest = indexedDB.open("ecommercelogin", 1);

dbRequest.onsuccess = (e) => {
    const db = e.target.result; // Access the database
    let myform = document.querySelector('#myform');

    myform.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission

        // Get form values
        let email = event.target.email.value.trim();

        // Validate email format
        if (!validateEmail(email)) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Email!",
                text: "Please enter a valid email address.",
            });
        }

        if (email) {
            // Disable the submit button to prevent multiple submissions
            
            const transaction = db.transaction("registration", "readonly");
            const store = transaction.objectStore("registration");

            // Get the user with the provided email
            const request = store.index('email').get(email);

            request.onsuccess = (event) => {
                const user = event.target.result;

                if (user && user.email === email) { // Ideally, compare hashed passwords
                    console.log('Email Conform successful!', user.email);
                    Swal.fire({
                        icon: "success",
                        title: "Email Conform successful!",
                        text: `NEW PASSOWRD, ${user.email}!`,
                    }).then(() => {
                        window.location.href = `newpassword.html?id=${user.id}`; // Redirect after the alert is closed
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Email Conform Failed!",
                        text: "Invalid email !",
                    });
                }

                // Re-enable the submit button after processing
            };

            request.onerror = (e) => {
                console.error('Error retrieving user:', e.target.error);
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Could not retrieve user information.",
                });
                myform.querySelector('button[type="submit"]').disabled = false; // Re-enable button
            };
        } else {
            Swal.fire({
                icon: "error",
                title: "Empty!",
                text: "Please fill all the fields!",
            });
        }
    });
};

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(String(email).toLowerCase());
}

dbRequest.onupgradeneeded = (e) => {
    const db = e.target.result; // Access the database
    console.log('Upgrade needed');

    // Create registration object store if it doesn't exist
    if (!db.objectStoreNames.contains('registration')) {
        const store = db.createObjectStore("registration", { keyPath: 'id' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('email', 'email', { unique: true });
        store.createIndex('mobile', 'mobile', { unique: true });
        store.createIndex('password', 'password', { unique: false });
    }
};