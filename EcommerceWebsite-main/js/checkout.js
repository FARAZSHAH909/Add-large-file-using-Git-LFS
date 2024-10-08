let storeFrist=()=>{
const processOrder = document.querySelector('#processorder');

let storedData = JSON.parse(localStorage.getItem('product_order_details'));
let processOrderHtml = "";
processOrderHtml += `
        <tr>
            <th>Order No</th>
            <td>${storedData.shipping_order_number}</td>
        </tr>
        <tr>
            <th>Date</th>
            <td>${storedData.shipping_currentTime}</td>
        </tr>
        <tr>
            <th>Shipping Total</th>
            <td>$${storedData.shipping_price}</td>
        </tr>
        <tr>
            <th>Payment Method</th>
            <td>Check Payment</td>
        </tr>`;
        console.log(storedData);

// Insert the generated HTML into the process order element
processOrder.innerHTML = processOrderHtml;
}
storeFrist();

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

function payment() {
    let paymentbtn=document.querySelector('#paymentbtn');
    paymentbtn.addEventListener("click",()=>{
        window.location.href = 'payment.html';
    })
}
payment();