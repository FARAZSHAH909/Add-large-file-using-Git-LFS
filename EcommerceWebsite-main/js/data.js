function logout() {
    let logoutBtn = document.querySelector('#logoutBtn');
    logoutBtn.addEventListener("click", () => {
        // Retrieve the user's email from localStorage
        const userEmail = localStorage.getItem('userEmail'); 

        if (userEmail) {
            // Remove the specific user data from localStorage
            localStorage.removeItem('userEmail');
        }

        // Optionally, clear all localStorage if you want to remove everything
        // localStorage.clear();

        // Redirect to the login page
        window.location.href = 'login.html';
    });
}

logout();


let productObj = [
    {
        productId:1,
        productImg: 'img/products/f1.jpg',
        productName: 'Cartoon Astronaut T-Shirts',
        companyName: 'GulAhmed',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$74',
    },
    {
        productId:2,
        productImg: 'img/products/f2.jpg',
        productName: 'Graphic Space Hoodie',
        companyName: 'Outfitters',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$85',
    },
    {
        productId:3,
        productImg: 'img/products/f3.jpg',
        productName: 'Vintage Leather Jacket',
        companyName: 'Levi\'s',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$120',
    },
    {
        productId:4,
        productImg: 'img/products/f4.jpg',
        productName: 'Denim Jeans',
        companyName: 'Diesel',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$95',
    },
    
    {
        productId:6,
        productImg: 'img/products/f6.jpg',
        productName: 'Cotton Casual Shirt',
        companyName: 'H&M',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$40',
    },
    {
        productId:7,
        productImg: 'img/products/f7.jpg',
        productName: 'Plaid Flannel Shirt',
        companyName: 'Zara',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$55',
    },
    {
        productId:8,
        productImg: 'img/products/n2.jpg',
        productName: 'Casual Sneakers',
        companyName: 'Adidas',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$90',
    },
    {
        productId:9,
        productImg: 'img/products/n8.jpg',
        productName: 'Classic Watch',
        companyName: 'Fossil',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$150',
    },
    {
        productId:10,
        productImg: 'img/products/n5.jpg',
        productName: 'Leather Boots',
        companyName: 'Timberland',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$180',
    },



    {
        productId: 11,
        productImg: 'img/shop/1.jpg',
        productName: 'Navy Blue Casual Sneakers',
        companyName: 'Nike',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$120',
    },
    {
        productId: 12,
        productImg: 'img/shop/2.jpg',
        productName: 'Leather Jacket',
        companyName: 'Levi\'s',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$150',
    },
    {
        productId: 13,
        productImg: 'img/shop/3.jpg',
        productName: 'Denim Jeans',
        companyName: 'Diesel',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$90',
    },
    {
        productId: 14,
        productImg: 'img/shop/4.jpg',
        productName: 'Graphic Hoodie',
        companyName: 'Adidas',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$85',
    },
    {
        productId: 15,
        productImg: 'img/shop/5.jpg',
        productName: 'Basic T-Shirt',
        companyName: 'Uniqlo',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$25',
    },
    {
        productId: 16,
        productImg: 'img/shop/6.jpg',
        productName: 'Cotton Casual Shirt',
        companyName: 'Zara',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$40',
    },
    {
        productId: 17,
        productImg: 'img/shop/7.jpg',
        productName: 'High-Top Sneakers',
        companyName: 'Puma',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$110',
    },
    {
        productId: 18,
        productImg: 'img/shop/8.jpg',
        productName: 'Slim Fit Jeans',
        companyName: 'Gap',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$95',
    },
    {
        productId: 19,
        productImg: 'img/shop/9.jpg',
        productName: 'Casual Sneakers',
        companyName: 'New Balance',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$75',
    },
    {
        productId: 20,
        productImg: 'img/shop/10.jpg',
        productName: 'Running Shoes',
        companyName: 'Reebok',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$130',
    },
    {
        productId: 21,
        productImg: 'img/shop/11.jpg',
        productName: 'Sports Hoodie',
        companyName: 'Champion',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$60',
    },
    {
        productId: 22,
        productImg: 'img/shop/12.jpg',
        productName: 'Classic Sunglasses',
        companyName: 'Ray-Ban',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$150',
    },
    // Continue similarly up to 20 products...

    {
        productId: 23,
        productImg: 'img/shop/13.jpg',
        productName: 'Premium Leather Wallet',
        companyName: 'Gucci',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$200',
    },
    {
        productId: 24,
        productImg: 'img/shop/14.jpg',
        productName: 'Athletic Running Shorts',
        companyName: 'Under Armour',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$35',
    },
    {
        productId: 25,
        productImg: 'img/shop/15.jpg',
        productName: 'Stylish Leather Belt',
        companyName: 'Hermès',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$180',
    },
    {
        productId: 26,
        productImg: 'img/shop/16.jpg',
        productName: 'Luxury Watch',
        companyName: 'Rolex',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$5,500',
    },
    {
        productId: 27,
        productImg: 'img/shop/17.jpg',
        productName: 'Fitness Smartwatch',
        companyName: 'Fitbit',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$250',
    },
    {
        productId: 28,
        productImg: 'img/shop/18.jpg',
        productName: 'Winter Woolen Scarf',
        companyName: 'Burberry',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$120',
    },
    {
        productId: 29,
        productImg: 'img/shop/19.jpg',
        productName: 'Graphic Print Tee',
        companyName: 'H&M',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$30',
    },
    {
        productId: 30,
        productImg: 'img/shop/20.jpg',
        productName: 'Running Shoes',
        companyName: 'Asics',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$140',
    },
    {
        productId: 31,
        productImg: 'img/shop/21.jpg',
        productName: 'Silk Tie',
        companyName: 'Tom Ford',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$70',
    },
    {
        productId: 32,
        productImg: 'img/shop/22.jpg',
        productName: 'Leather Boots',
        companyName: 'Timberland',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$180',
    },
    {
        productId: 33,
        productImg: 'img/shop/23.jpg',
        productName: 'Sports Backpack',
        companyName: 'The North Face',
        productStar: `
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>
        <i class="fa-sharp-duotone fa-solid fa-star"></i>`,
        productPrice: '$95',
    }
];
