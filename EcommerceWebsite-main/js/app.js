let countbag = [];

// Load cart data when the page is loaded
onload();

function onload() {
    let countbagStr = localStorage.getItem('countbag');
    countbag = countbagStr ? JSON.parse(countbagStr) : [];

    // Display items from productObj
    displayItem();

    // Update cart count based on saved cart data
    cartCount(countbag);
}

function productid(productshareid) {
    window.location.href=`product.html${productshareid}`
 } 

// Function to add item to the cart
function btnCart(id) {
    // Check if the item is already in the cart
    if (!countbag.includes(id)) {
        // Add the product ID to countbag
        countbag.push(id);

        // Save the updated countbag to localStorage
        localStorage.setItem('countbag', JSON.stringify(countbag));

        // Update the cart count
        cartCount(countbag);
    } else {
        Swal.fire({
            icon: "error",
            title: "already add...",
            text: "Item already in cart!",
            
          });
        // alert("Item already in cart");
    }
}

// Function to update cart count in the UI
function cartCount(countid) {
    let productCartCount = document.querySelector('#count');
    productCartCount.innerText = countid.length;
}

// Function to display product items in the UI
function displayItem() {
    let productContainer = document.querySelector('.product-cart-contanier');
    let productHTML = ``;

    // Assuming productObj is defined and contains products
    productObj.forEach(item => {
        productHTML += `
            <div class="product-cart">
                <a href='product.html?id=${item.productId}' onclick='productid(${item.productId})'><img src='${item.productImg}' alt=""></a>
                <div class="cart-des">
                <a href='#' ><span>${item.companyName}</span></a>
                <a href='#' ><h5>${item.productName}</h5></a>
                    <div class="cart-star">
                        ${item.productStar}
                    </div>
                    <h4>${item.productPrice}</h4>
                </div>
                <a id="cart" class='cart' onclick="btnCart(${item.productId})">
                    <i class="fa-solid fa-cart-shopping"></i>
                </a>
            </div>
        `;
    });

    // Inject the generated HTML into the container
    productContainer.innerHTML = productHTML;
}
