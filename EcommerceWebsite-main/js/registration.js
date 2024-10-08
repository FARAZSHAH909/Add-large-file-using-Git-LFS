let request = indexedDB.open("ecommercelogin", 1); // Open the database

request.onsuccess = (e) => {
    const db = e.target.result; // Access the database
    console.log('Success: Database opened', db);

    let myform = document.querySelector('#myform');

    myform.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Get form values
        let name = event.target.name.value;
        let email = event.target.email.value;
        let mobile = event.target.mobile.value;
        let password = event.target.password.value;

        if (name && email && mobile && password) {
            let transaction;

            try {
                transaction = db.transaction("registration", "readwrite");
                let storeObject = transaction.objectStore("registration");

                // Check if email or mobile already exists
                let emailIndex = storeObject.index('email');
                let mobileIndex = storeObject.index('mobile');

                let emailCheck = emailIndex.get(email);
                let mobileCheck = mobileIndex.get(mobile);

                emailCheck.onsuccess = () => {
                    if (emailCheck.result) {
                        Swal.fire({
                            icon: "error",
                            title: "EMAIL!",
                            text: "EMAIL ALREADY EXISTS, TRY A NEW ONE!",
                        });
                        return; // Exit if email exists
                    }

                    mobileCheck.onsuccess = () => {
                        if (mobileCheck.result) {
                            Swal.fire({
                                icon: "error",
                                title: "MOBILE!",
                                text: "MOBILE ALREADY EXISTS, TRY A NEW ONE!",
                            });
                            return; // Exit if mobile exists
                        }

                        // Retrieve the next ID
                        let getAll = storeObject.getAll();
                        getAll.onsuccess = () => {
                            let newId = getAll.result.length > 0 ? Math.max(...getAll.result.map(r => r.id)) + 1 : 1;

                            let requestAddStudent = storeObject.put({
                                id: newId,
                                name: name,
                                email: email,
                                mobile: mobile,
                                password: password
                            });

                            requestAddStudent.onsuccess = () => {
                                console.log('Student added/updated with ID:', newId);
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: "Registration added successfully!",
                                });
                                myform.reset();
                            };

                            requestAddStudent.onerror = (e) => {
                                console.error('Error adding/updating student:', e.target.error);
                            };
                        };

                        getAll.onerror = (e) => {
                            console.error('Error retrieving records:', e.target.error);
                        };
                    };
                };

                transaction.oncomplete = () => {
                    console.log('Transaction completed');
                };

                transaction.onerror = (e) => {
                    console.error('Transaction error:', e.target.error);
                };

            } catch (error) {
                console.error('Transaction failed:', error);
                Swal.fire({
                    icon: "error",
                    title: "Transaction Error",
                    text: "Could not create transaction.",
                });
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

request.onerror = (e) => {
    console.error('Error opening database', e.target.error);
};

request.onupgradeneeded = (e) => {
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
