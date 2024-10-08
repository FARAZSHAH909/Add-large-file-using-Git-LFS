function deleteLoginData(id) {
    const dbRequest = indexedDB.open("ecommerceadmin", 1);

    dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("admin", "readwrite");
        const store = transaction.objectStore("admin");

        const deleteRequest = store.delete(id);

        deleteRequest.onsuccess = () => {
            console.log(`Deleted item with ID: ${id}`);
            // Refresh the table after deletion
            refreshLoginDetailsTable();
        };

        deleteRequest.onerror = () => {
            console.error(`Failed to delete item with ID: ${id}`);
        };
    };

    dbRequest.onerror = () => {
        console.error("Failed to open database.");
    };
}

function refreshLoginDetailsTable() {
    const dbRequest = indexedDB.open("ecommerceadmin", 1);

    dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("admin", "readonly");
        const store = transaction.objectStore("admin");

        store.getAll().onsuccess = (event) => {
            const login_details_admin = event.target.result;
            console.log(login_details_admin); // Logs all student data

            let loginDetailsDataAdmin = document.querySelector('#login-card-data');
            let loginDetailsDataAdminShow = ``;

            login_details_admin.forEach(admintableItem => {
                loginDetailsDataAdminShow += `
                <table width="100%">
                    <tr>
                        <td>${admintableItem.id}</td>
                        <td>${admintableItem.name}</td>
                        <td>${admintableItem.email}</td>
                        <td>${admintableItem.mobile}</td>
                        <td>${admintableItem.password}</td>
                        <td style="cursor: pointer;"><a href='edit-admin-login-page.html?id=${admintableItem.id}'><i class="fa-solid fa-pen-to-square" ></i></a> </td>
                        <td style="cursor: pointer;"><i class="fa-solid fa-trash" onclick='deleteLoginData(${admintableItem.id})'></i></td>
                    </tr>
                </table>
                `;
            });

            // Inject the generated HTML into the container
            loginDetailsDataAdmin.innerHTML = loginDetailsDataAdminShow;
        };

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
refreshLoginDetailsTable();