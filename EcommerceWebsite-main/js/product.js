const url = new URL(window.location.href);

// Use URLSearchParams to get the 'id' parameter
const id = url.searchParams.get('id');

console.log(id);


let product_details=document.querySelector('.product-details');
let product_details_Item='';
productObj.forEach(productItem =>{
if(productItem.productId ==id){
product_details_Item +=`<div class="single-product-img">
<img src='${productItem.productImg}' width="100%" alt="">

<div class="small-img-group">
<div class="small-img-col">
    <img src="img/products/f2.jpg" width="100%" class="small-img" alt="">
</div>

<div class="small-img-col">
    <img src="img/products/f3.jpg" width="100%" class="small-img" alt="">
</div>

<div class="small-img-col">
    <img src="img/products/f4.jpg" width="100%"  class="small-img"  alt="">
</div>

<div class="small-img-col">
    <img src="img/products/f5.jpg"  width="100%" class="small-img"  alt="">
</div>

</div>
</div>

<div class="right-product-deatail">
<h6>Home/${productItem.companyName}</h6>
<h4>${productItem.productName}</h4>
<h2>
${productItem.productPrice} 
</h2>
<select name="" id="">
    <option value="">Select Size</option>
    <option value="">X</option>
    <option value="">XL</option>
    <option value="">SL</option>
</select>
<input type="number" value="1" >
<button onclick="btnCart(${productItem.productId})">ADD TO CARD</button>
<h4>PRODUCT DETAILS</h4>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, in fugiat quos dolor temporibus at, quam quibusdam fugit, voluptates quidem architecto odio. Debitis deleniti officiis illum in placeat consectetur adipisci.</p>
</div>`;
}
 
})

product_details.innerHTML = product_details_Item;