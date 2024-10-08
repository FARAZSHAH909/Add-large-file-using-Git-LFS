let storeSecond=()=>{
    const processOrderSecond = document.querySelector('#processordersecond');
   let Totalprice=0;
    let storedDataSecond = JSON.parse(localStorage.getItem('product_order_details_second'));
    let shippingFinalPrice=  JSON.parse(localStorage.getItem('product_order_details')) || [];
    let processOrderSecondHtml = "";
let shippingprice;
    processOrderSecondHtml += `
    
            <tr>
            <th>Product</th>
            <th>Total</th>
        </tr>`
    storedDataSecond.forEach(itemDataSecond => {
        let price = parseFloat(itemDataSecond.productPrice.replace('$', ''));
        shippingprice = parseFloat(shippingFinalPrice.shipping_price.replace('$', ''));
        
    
        processOrderSecondHtml += `
        <tr>
        <td>
        <img src="${itemDataSecond.productImg}" alt="" width="50px"> &nbsp; Product Name (${itemDataSecond.productName}) (product Price ${itemDataSecond.productPrice})   x (QTY ${itemDataSecond.quantity}) 
      </td>
            <td>${price * itemDataSecond.quantity}</td>
        </tr>`
        Totalprice += price * itemDataSecond.quantity;

    });
    console.log(Totalprice);
    processOrderSecondHtml += `
        <tr>
            <th>Cart Subtotal</th>
            <td>$${Totalprice}</td>
        </tr>
        <tr>
            <th>Shipping and Handling</th>
            <td>$${shippingprice}</td>
        </tr>
        <tr>
            <th>VAT</th>
            <td>$0.00</td>
        </tr>
        <tr>
            <th>Order Total</th>
            <td>$${Totalprice += shippingprice}</td>
        </tr>`;
            console.log(storedDataSecond);
   
    // Insert the generated HTML into the process order element
    processOrderSecond.innerHTML = processOrderSecondHtml;


}
storeSecond();


let massage=`

Subject: Start Your Shopping Journey Today at Cara Mart! 🎉

Dear [Customer],

We’re excited to invite you to explore our amazing collection at Cara Mart, where you can find everything you need with just a few clicks!

🛒 Why Shop With Us?

A wide variety of products to suit your every need.
Easy-to-use shopping experience designed for your convenience.
Secure payment methods and a smooth checkout process.
Exclusive deals and promotions just for you!
✨ How to Get Started:

Visit our website: [Insert Cara Mart website link]
Browse through our product categories.
Add your favorite items to the cart.
Enjoy fast and secure checkout.
Don’t wait! Start your shopping journey with Cara Mart today and experience the best in online shopping. If you have any questions or need assistance, feel free to contact us. We’re here to help!

Happy Shopping!
Warm Regards,
Cara Mart Team
`;

const userSendEmail = localStorage.getItem('userEmail');
emailjs.send("service_6ta34zg", "template_if8jsk2", {
    from_name:'Cara Mart Team',
    email_id: userSendEmail,
    massage: massage
}).then((response) => {
    console.log('Email sent successfully!', response.status, response.text);
}).catch((error) => {
    console.error('Failed to send email...', error);
});


// Function to handle storing data from checkout form
function productsaveitemfunction() {
    let removedata1 = JSON.parse(localStorage.getItem('countbag'));
    let removedata2 = JSON.parse(localStorage.getItem('product_order_details_second')) || [];
    let removedata3 = JSON.parse(localStorage.getItem('product_order_details')) || [];

    let checkoutForm = document.querySelector('#checkout-form'); // Get the form

    // Add event listener for form submission
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form values
        let fullName = event.target["billing-name"].value;
        let email = event.target["billing-email"].value;
        let phone = event.target["billing-phone"].value;
        let address = event.target["shipping-address"].value;
        let city = event.target["shipping-city"].value;
        let zip = event.target["shipping-zip"].value;
        let cardName = event.target["card-name"].value;
        let cardNumber = event.target["card-number"].value;
        let cardExpiration = event.target["card-expiration"].value;
        let cardCVC = event.target["card-cvc"].value;

        // Validate all fields
        if (fullName && email && phone && address && city && zip && cardName && cardNumber && cardExpiration && cardCVC) {
            try {
                // Create order data object
                let orderData = {
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    address: address,
                    city: city,
                    zip: zip,
                    cardName: cardName,
                    cardNumber: cardNumber,
                    cardExpiration: cardExpiration,
                    cardCVC: cardCVC
                };

                // Save order data to LocalStorage
                let allOrders = JSON.parse(localStorage.getItem('checkoutData')) || [];
                allOrders.push(orderData);
                localStorage.setItem('productsaveitem', JSON.stringify(allOrders));

                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Checkout information stored successfully!",
                }).then(() => {
                    if (removedata1 && removedata2 && removedata3) {
                        // Clear specific items from local storage
                        localStorage.removeItem('product_order_details_second');
                        localStorage.removeItem('product_order_details');
                        localStorage.removeItem('countbag');
                    }
                    window.location.href = 'index.html';
                });

                checkoutForm.reset(); // Clear the form

            } catch (error) {
                console.error('Error saving order:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to save the order data.",
                });
            }

        } else {
            // Error message for empty fields
            Swal.fire({
                icon: "error",
                title: "Empty Fields!",
                text: "Please fill all the fields!",
            });
        }
    });
}

// Call the function to start storing data
productsaveitemfunction();

