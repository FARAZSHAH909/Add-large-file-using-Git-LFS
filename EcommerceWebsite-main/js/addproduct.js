let productName = document.querySelector('#product-name');
let productCompany = document.querySelector('#product-comapny');
let productPrice = document.querySelector('#product-price');
let productImage = document.querySelector('#product-img');
let addProductButton = document.querySelector('#addproduct');

// // Initialize or retrieve the product ID counter
let productIdCounter = parseInt(localStorage.getItem('productIdCounter')) || 10;

// Function to add a product
addProductButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    // Validate input fields
    if (!productName.value || !productCompany.value || !productPrice.value || !productImage.files[0]) {
        alert('Please fill in all fields and select an image.');
        return;
    }

    const file = productImage.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({
            productId: ++productIdCounter, // Increment and assign ID
            productName: productName.value,
            companyName: productCompany.value,
            productPrice: parseFloat(productPrice.value).toFixed(2), // Ensure price is a number
            productImg: reader.result
        });
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('productIdCounter', productIdCounter); // Save updated ID counter

        // Clear the form
        productName.value = '';
        productCompany.value = '';
        productPrice.value = '';
        productImage.value = '';
        
        // Optionally redirect to the shop page
        // window.location.href = 'shop.html'; // Redirect to your shop page
    };

    reader.onerror = () => {
        console.error('Error reading file');
        alert('Failed to read the image file.');
    };

    if (file) {
        reader.readAsDataURL(file); // Convert image to base64
    }
});

let productList = document.querySelector('#product-list');
let productContainer = document.querySelector('.product-cart-contanier');

// Function to load products from local storage
const loadProducts = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productList.innerHTML = '';
    let productHTML = '';

    products.forEach((product) => {
        // Create product list entry
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.productName} (ID: ${product.productId})</h3>
            <p>Company: ${product.companyName}</p>
            <p>Price: $${product.productPrice}</p>
            <img src="${product.productImg}" alt="${product.productName}" style="width: 100px; height: auto;" />
            <hr>
        `;
        productList.appendChild(productDiv);

    })

   
};

// Initial load of products
loadProducts();




