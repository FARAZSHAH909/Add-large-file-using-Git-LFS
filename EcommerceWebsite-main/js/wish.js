// Retrieve data from localStorage


document.getElementById('removeallcart').addEventListener('click', function() {
    // Remove items from Local Storage
    localStorage.removeItem('countbag'); 
    localStorage.removeItem('product_order_details_second'); 
    
    // Display SweetAlert message
    Swal.fire({
        title: "warning!",
        text: "All items removed from cart!",
        icon: "warning",
        confirmButtonText: "OK"
    }).then(() => {
        // Redirect to the index page after the alert is closed
        window.location.href = 'index.html';
    });
});

let wishListObj;
let product_storage_data = [];

// Load user email from local storage (or prompt for it)

// Load and display wishlist items
loadcountbagitem();
display();

function loadcountbagitem() {
    wishListObj = countbag.map(val => {
        return productObj.find(product => product.productId === val);
    }).filter(item => item !== undefined);
}

function remove(removeid) {
    countbag = countbag.filter(bagid => bagid != removeid);
    localStorage.setItem('countbag', JSON.stringify(countbag));
    loadcountbagitem(); // Reload the wishlist
    display(); // Update display after removing item
    console.log(countbag);
    showNotification(`Item removed from wishlist.`);
}

function display() {
    let wishListCart = document.querySelector('#wishlist');
    let wishtotalprice = document.querySelector('#totalprice');

    let wishinnerHtml = '';
    let totalPrice = 0; // Initialize total price

    // Load existing product storage data from local storage
    product_storage_data = JSON.parse(localStorage.getItem("product_order_details_second")) || wishListObj.map(item => ({
        id: item.productId,
        productImg: item.productImg,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: 1 // Default quantity is 1
    }));

    // Update the wishlist data in local storage
  

    wishListObj.forEach((tableItem, index) => {
        let price = parseFloat(tableItem.productPrice.replace('$', ''));
        localStorage.setItem("product_order_details_second", JSON.stringify(product_storage_data))|| [];
        // Get the quantity from the stored product storage data
        let quantity = product_storage_data[index]?.quantity || 1; // Default to 1 if undefined

        // Construct HTML for each item in the wishlist
        wishinnerHtml += `
        <table width="100%">
            <tr>
                <td><i class="far fa-times-circle" onclick='remove(${tableItem.productId})'></i></td>
                <td><img src="${tableItem.productImg}" alt=""></td>
                <td>${tableItem.productName}</td>
                <td>${tableItem.productPrice}</td>
                <td><input type="number" value="${quantity}" class="item-quantity" data-index="${index}"></td>
                <td><span class="item-price" id="item-price-${index}">${(price * quantity).toFixed(2)}</span></td>
            </tr>
        </table>
        `;

        totalPrice += price * quantity; // Add the item's total price
    });

    wishListCart.innerHTML = wishinnerHtml;
    
    // Add event listeners to all quantity inputs after rendering
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', (event) => {
            let index = event.target.getAttribute('data-index'); // Get the index of the item
            let quantity = parseInt(event.target.value) || 1; // Ensure it's a valid number
            let itemPrice = parseFloat(wishListObj[index].productPrice.replace('$', '')); // Get base price
            let newPrice = itemPrice * quantity; // Calculate new price

            // Update the individual item price display
            document.getElementById(`item-price-${index}`).innerText = `$${newPrice.toFixed(2)}`;

            // Update the quantity in product_storage_data
            product_storage_data[index].quantity = quantity;

            // Store updated product details with quantity in local storage
            localStorage.setItem("product_order_details_second", JSON.stringify(product_storage_data));

            // Recalculate total price
            recalculateTotalPrice();
        });
    });

    // Initially display total price
    wishtotalprice.innerHTML = `<div>Total Price: $${totalPrice.toFixed(2)}</div>`;

    // Recalculate total price function
    function recalculateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.item-quantity').forEach((input, index) => {
            let quantity = parseInt(input.value) || 1;
            let itemPrice = parseFloat(wishListObj[index].productPrice.replace('$', ''));
            total += itemPrice * quantity;
        });
        wishtotalprice.innerHTML = `<div>Total Price: $${total.toFixed(2)}</div>`;
    }
}



   




// Checkout Event Listener
const checkout = document.querySelector('#checkout');

checkout.addEventListener("click", () => {
    let finalDetails = [];

    // Retrieve existing order details from local storage
    
  
    // Generate a random order number
    let orderNumber = Math.floor(Math.random() * 1000000);

    // Create a new Date object
    const now = new Date();
    const currentDate = now.toLocaleDateString(); // e.g., "10/5/2024"
    const currentTime = now.toLocaleTimeString(); // e.g., "10:30:15 AM"
    const shipping_price = Math.floor(Math.random() * 200 + 5).toFixed(2); // Ensure it's a string for localStorage

    // Create an order object with details
    let orderDetails = {
        shipping_price: shipping_price,
        shipping_currentTime: `${currentTime} ${currentDate}`,
        shipping_order_number: orderNumber,
        
    };

    // Store updated order details back in local storage
    localStorage.setItem("product_order_details", JSON.stringify(orderDetails));

    // Display the current date and time
    console.log(`Current Date: ${currentDate}`);
    console.log(`Current Time: ${currentTime}`);
    console.log(`Shipping Price: $${shipping_price}`);
    console.log(`Order Number: ${orderNumber}`);
});





