function editLoginDetailsTable() {
    const url = new URL(window.location.href);
    const editLoginId = url.searchParams.get('id');

    console.log(editLoginId);
    const dbRequest = indexedDB.open("ecommerceadmin", 1);

    dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("admin", "readonly");
        const store = transaction.objectStore("admin");

        store.getAll().onsuccess = (event) => {
            const edit_login_form_detail_admin = event.target.result;
            console.log(edit_login_form_detail_admin); // Logs all student data
            let login_form_detail_admin = document.querySelector('.login-form-detail');
            let login_form_detail_show_admin = ``;

            // Flag to check if the data is found
            let dataFound = false;

            edit_login_form_detail_admin.forEach(formeEditDataAdmin => {
                // Check if the current form data id matches the editLoginId
                if (formeEditDataAdmin.id == editLoginId) {
                    dataFound = true;
                    login_form_detail_show_admin += `
                    <form id="myform" class="login">
                        <span>ADMIN REGISTRATION UPDATE PAGE</span>
                        <input type="text" placeholder="ENTER NAME" value='${formeEditDataAdmin.name}' id="name" name="name" required>
                        <input type="email" placeholder="E-MAIL" value='${formeEditDataAdmin.email}' name="email" id="email" required>
                        <input type="number" placeholder="ENTER MOBILE" value='${formeEditDataAdmin.mobile}' id="mobile" name="mobile" required>
                        <input type="password" placeholder="ENTER PASSWORD" value='${formeEditDataAdmin.password}' id="password" name="password" required>
                        <button id="update" type="submit">UPDATE ADMIN REGISTRATION</button>
                    </form>
                    `;
                }
            });

            if (dataFound) {
                // Inject the generated HTML into the container
                login_form_detail_admin.innerHTML = login_form_detail_show_admin;

                // Add an event listener to the form
                document.getElementById('myform').addEventListener('submit', function (event) {
                    event.preventDefault(); // Prevent default form submission

                    // Retrieve updated values
                    const updatedName = document.getElementById('name').value;
                    const updatedEmail = document.getElementById('email').value;
                    const updatedMobile = document.getElementById('mobile').value;
                    const updatedPassword = document.getElementById('password').value;

                    // Update the record in IndexedDB
                    const updateTransaction = db.transaction("admin", "readwrite");
                    const updateStore = updateTransaction.objectStore("admin");

                    // Create a new object to update
                    const updatedData = {
                        id: Number(editLoginId), // Ensure id is a number
                        name: updatedName,
                        email: updatedEmail,
                        mobile: updatedMobile,
                        password: updatedPassword
                    };

                    // Update the data
                    const request = updateStore.put(updatedData);

                    request.onsuccess = () => {
                        Swal.fire({
                            icon: "success",
                            title: "Updated!",
                            text: "Your admin registration details have been updated.",
                        });
                    };

                    request.onerror = (e) => {
                        console.error('Error updating student:', e.target.error); // Corrected error logging
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "There was an error updating your admin details Email already exist.",
                        });
                    };
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "DATA",
                    text: "DATA NOT FOUND!",
                });

                login_form_detail_admin.innerHTML = '<H1>DATA NOT FOUND!</H1>';
            }
        };
    };

    dbRequest.onerror = (e) => {
        console.error("Database error:", e.target.errorCode);
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
}

editLoginDetailsTable();
