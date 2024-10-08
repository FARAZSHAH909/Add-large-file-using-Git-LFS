function editLoginDetailsTable() {
    const url = new URL(window.location.href);
    const editLoginId = url.searchParams.get('id');

    console.log(editLoginId);
    const dbRequest = indexedDB.open("ecommercelogin", 1);

    dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("registration", "readonly");
        const store = transaction.objectStore("registration");

        store.getAll().onsuccess = (event) => {
            const edit_login_form_detail = event.target.result;
            console.log(edit_login_form_detail); // Logs all student data
            let login_form_detail = document.querySelector('.login-form-detail');
            let login_form_detail_show = ``;

            // Flag to check if the data is found
            let dataFound = false;

            edit_login_form_detail.forEach(formeEditData => {
                // Check if the current form data id matches the editLoginId
                if (formeEditData.id == editLoginId) {
                    dataFound = true;
                    login_form_detail_show += `
                    <form id="myform" class="login">
                        <span>REGISTRATION UPDATE PAGE</span>
                        <input type="text" placeholder="ENTER NAME" value='${formeEditData.name}' id="name" name="name" required>
                        <input type="email" placeholder="E-MAIL" value='${formeEditData.email}' name="email" id="email" required>
                        <input type="number" placeholder="ENTER MOBILE" value='${formeEditData.mobile}' id="mobile" name="mobile" required>
                        <input type="password" placeholder="ENTER PASSWORD" value='${formeEditData.password}' id="password" name="password" required>
                        <button id="update" type="submit">UPDATE REGISTRATION</button>
                    </form>
                    `;
                }
            });

            if (dataFound) {
                // Inject the generated HTML into the container
                login_form_detail.innerHTML = login_form_detail_show;

                // Add an event listener to the form
                document.getElementById('myform').addEventListener('submit', function (event) {
                    event.preventDefault(); // Prevent default form submission

                    // Retrieve updated values
                    const updatedName = document.getElementById('name').value;
                    const updatedEmail = document.getElementById('email').value;
                    const updatedMobile = document.getElementById('mobile').value;
                    const updatedPassword = document.getElementById('password').value;

                    // Update the record in IndexedDB
                    const updateTransaction = db.transaction("registration", "readwrite");
                    const updateStore = updateTransaction.objectStore("registration");

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
                            text: "Your registration details have been updated.",
                        });
                    };

                    request.onerror = (e) => {
                        console.error('Error updating student:', e.target.error); // Corrected error logging
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "There was an error updating your registration details Email already exist.",
                        });
                    };
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "DATA",
                    text: "DATA NOT FOUND!",
                });

                login_form_detail.innerHTML = '<H1>DATA NOT FOUND!</H1>';
            }
        };
    };

    dbRequest.onerror = (e) => {
        console.error("Database error:", e.target.errorCode);
    };

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
}
editLoginDetailsTable();
