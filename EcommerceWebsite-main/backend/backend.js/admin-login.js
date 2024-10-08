const dbRequest = indexedDB.open("ecommerceadmin", 1);

dbRequest.onsuccess = (e) => {
    const db = e.target.result; // Access the database
    let myform = document.querySelector('#myform');

    myform.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission

        // Get form values
        let email = event.target.email.value.trim();
        let password = event.target.password.value;

        // Validate email format
        if (!validateEmail(email)) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Email!",
                text: "Please enter a valid email address.",
            });
        }

        if (email && password) {
            // Disable the submit button to prevent multiple submissions
            myform.querySelector('button[type="submit"]').disabled = true;

            try {
                const transaction = db.transaction("admin", "readonly");
                const store = transaction.objectStore("admin");

                // Get the admin with the provided email
                const request = store.index('email').get(email);

                request.onsuccess = (event) => {
                    const adminUser = event.target.result;

                    if (adminUser && adminUser.password === password) { // Ideally, compare hashed passwords
                        console.log('Login successful!', adminUser);
                        localStorage.setItem('adminuserEmail', adminUser.email);
                        Swal.fire({
                            icon: "success",
                            title: "Login Successful!",
                            text: `Welcome, ${adminUser.name}!`,
                        }).then(() => {
                            window.location.href = 'login-detail.html'; // Redirect after the alert is closed
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Login Failed!",
                            text: "Invalid email or password!",
                        });
                    }

                    // Re-enable the submit button after processing
                    myform.querySelector('button[type="submit"]').disabled = false;
                };

                request.onerror = (e) => {
                    console.error('Error retrieving admin:', e.target.error);
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Could not retrieve admin information.",
                    });
                    myform.querySelector('button[type="submit"]').disabled = false; // Re-enable button
                };
            } catch (error) {
                console.error('Transaction error:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "An error occurred while processing your request.",
                });
                myform.querySelector('button[type="submit"]').disabled = false; // Re-enable button
            }
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
validateEmail();
dbRequest.onerror = (e) => {
    console.error('Error opening database', e.target.error);
    Swal.fire({
        icon: "error",
        title: "Database Error!",
        text: "Could not open the database.",
    });
};
dbRequest.onupgradeneeded = (e) => {
    console.log('Upgrade needed');
    const db = e.target.result; // Access the database

    // Create admin object store if it doesn't exist
    if (!db.objectStoreNames.contains('admin')) {
        const store = db.createObjectStore("admin", { keyPath: 'id' });

        // Create indexes for admin
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('email', 'email', { unique: true });
        store.createIndex('mobile', 'mobile', { unique: true });
        store.createIndex('password', 'password', { unique: false }); // Consider not indexing passwords
    }
};