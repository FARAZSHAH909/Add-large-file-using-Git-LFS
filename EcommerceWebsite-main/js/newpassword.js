function editLoginDetailsTable() {
    const url = new URL(window.location.href);
    const editLoginId = url.searchParams.get('id');
    
    console.log(editLoginId);
    
    const dbRequest = indexedDB.open("ecommercelogin", 1);
    
    dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("registration", "readonly");
        const store = transaction.objectStore("registration");
        
        // Retrieve the record with the matching ID
        const request = store.get(Number(editLoginId));
        
        request.onsuccess = (event) => {
            const userData = event.target.result;
            
            if (userData) {
                // Pre-fill the form with current password
                document.getElementById('password').value = userData.password;
                let myform = document.getElementById('myform');
                
                // Add an event listener to the form for password update
                myform.addEventListener('submit', function (event) {
                    event.preventDefault(); // Prevent default form submission
                    
                    // Retrieve updated password
                    const updatedPassword = document.getElementById('password').value;
                    
                    // Update the password field in the retrieved object
                    userData.password = updatedPassword;
                    
                    // Update the record in IndexedDB
                    const updateTransaction = db.transaction("registration", "readwrite");
                    const updateStore = updateTransaction.objectStore("registration");
                    
                    const updateRequest = updateStore.put(userData);
                    
                    updateRequest.onsuccess = () => {
                        Swal.fire({
                            icon: "success",
                            title: "Updated!",
                            text: "Your new password has been updated.",
                        });
                        myform.reset(); // Reset the form after successful update
                    };
                    
                    updateRequest.onerror = (e) => {
                        console.error('Error updating user:', e.target.error); 
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "There was an error updating your password. Please try again.",
                        });
                        myform.reset();
                    };
                });
            } else {
                console.error("User not found");
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "User not found. Please try again.",
                });
            }
        };
       
        request.onerror = (e) => {
            console.error("Error retrieving user:", e.target.error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Could not retrieve user data. Please try again.",
            });
        };

    };
    
    dbRequest.onerror = (e) => {
        console.error("Database error:", e.target.errorCode);
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Database error occurred. Please try again.",
        });
    };
    
    dbRequest.onupgradeneeded = (e) => {
        const db = e.target.result;
        console.log('Upgrade needed');
        
        if (!db.objectStoreNames.contains('registration')) {
            const store = db.createObjectStore("registration", { keyPath: 'id' });
            store.createIndex('name', 'name', { unique: false });
            store.createIndex('email', 'email', { unique: true });
            store.createIndex('mobile', 'mobile', { unique: true });
            store.createIndex('password', 'password', { unique: false });
        }
    };
}

editLoginDetailsTable();
