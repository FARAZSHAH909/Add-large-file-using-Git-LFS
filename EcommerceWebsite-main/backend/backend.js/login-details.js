function deleteLoginData(id) {
    const dbRequest = indexedDB.open("ecommerceadmin", 1);

    dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("registration", "readwrite");
        const store = transaction.objectStore("registration");

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
    const dbRequest = indexedDB.open("ecommercelogin", 1);

    dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("registration", "readonly");
        const store = transaction.objectStore("registration");

        store.getAll().onsuccess = (event) => {
            const login_details = event.target.result;
            console.log(login_details); // Logs all student data

            let loginDetailsData = document.querySelector('#login-card-data');
            let loginDetailsDataShow = ``;

            login_details.forEach(tableItem => {
                loginDetailsDataShow += `
                <table width="100%">
                    <tr>
                        <td>${tableItem.id}</td>
                        <td>${tableItem.name}</td>
                        <td>${tableItem.email}</td>
                        <td>${tableItem.mobile}</td>
                        <td>${tableItem.password}</td>
                        <td style="cursor: pointer;"><a href='edit-login-page.html?id=${tableItem.id}'><i class="fa-solid fa-pen-to-square" ></i></a> </td>
                        <td style="cursor: pointer;"><i class="fa-solid fa-trash" onclick='deleteLoginData(${tableItem.id})'></i></td>
                    </tr>
                </table>
                `;
            });

            // Inject the generated HTML into the container
            loginDetailsData.innerHTML = loginDetailsDataShow;
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