const request = indexedDB.open("ecommerceadmin", 1); // Open the database with version 2

request.onsuccess = (e) => {
    const db = e.target.result; // Access the database
    console.log('Success: Database opened', db);

    const myform = document.querySelector('#myform');

    myform.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const name = event.target.name.value.trim();
        const email = event.target.email.value.trim();
        const mobile = event.target.mobile.value.trim();
        const password = event.target.password.value;

        // Validate input fields
        if (!name || !email || !mobile || !password) {
            return Swal.fire({
                icon: "error",
                title: "Empty!",
                text: "Please fill all the fields!",
            });
        }

        const transaction = db.transaction("admin", "readwrite");
        const storeObject = transaction.objectStore("admin");

        // Disable the submit button to prevent multiple submissions
        const submitButton = myform.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        try {
            // Check for existing admin by email
            const emailRequest = storeObject.index("email").get(email);
            emailRequest.onsuccess = (event) => {
                if (event.target.result) {
                    // Email already exists
                    Swal.fire({
                        icon: "error",
                        title: "EMAIL!",
                        text: "ADMIN EMAIL ALREADY EXISTS, TRY A NEW ONE!",
                    });
                    submitButton.disabled = false; // Re-enable button
                    return; // Exit if email exists
                }

                // Check for existing admin by mobile
                const mobileRequest = storeObject.index("mobile").get(mobile);
                mobileRequest.onsuccess = (event) => {
                    if (event.target.result) {
                        // Mobile already exists
                        Swal.fire({
                            icon: "error",
                            title: "MOBILE!",
                            text: "ADMIN MOBILE ALREADY EXISTS, TRY A NEW ONE!",
                        });
                        submitButton.disabled = false; // Re-enable button
                        return; // Exit if mobile exists
                    }

                    // Retrieve the next ID
                    const getAll = storeObject.getAll();
                    getAll.onsuccess = (event) => {
                        const newId = event.target.result.length > 0 ? Math.max(...event.target.result.map(r => r.id)) + 1 : 1; // Increment for new ID

                        // Create the new admin object
                        const adminObj = {
                            id: newId,
                            name: name,
                            email: email,
                            mobile: mobile,
                            password: password // Consider hashing this
                        };

                        // Store the new admin object
                        const addRequest = storeObject.put(adminObj);
                        addRequest.onsuccess = () => {
                            console.log('Admin added with ID:', newId);
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: "Admin added successfully!",
                            });
                            myform.reset(); // Clear the form
                        };

                        addRequest.onerror = (error) => {
                            console.error('Error adding/updating admin:', error);
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: "There was an error adding the admin.",
                            });
                        };
                    };

                    getAll.onerror = (error) => {
                        console.error('Error retrieving all admins:', error);
                    };
                };

                mobileRequest.onerror = (error) => {
                    console.error('Error retrieving mobile:', error);
                };
            };

            emailRequest.onerror = (error) => {
                console.error('Error retrieving email:', error);
            };
        } catch (error) {
            console.error('Transaction error:', error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "There was an error processing your request.",
            });
        } finally {
            submitButton.disabled = false; // Re-enable button after processing
        }
    });
};

request.onerror = (e) => {
    console.error('Error opening database', e.target.error);
};

request.onupgradeneeded = (e) => {
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
