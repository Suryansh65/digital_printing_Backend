const express = require('express');
const Product = require('../Models/Products');
const router = express.Router();
const sampleProducts = [
    {
        product_name: 'Custom Notebook',
        product_description: 'A notebook with your custom cover design.',
        product_img: '/assets/notebook.png',
        product_price: '₹500',
        product_category: 'Stationery'
    },
    {
        product_name: 'Custom Phone Case',
        product_description: 'A durable phone case with your unique design.',
        product_img: '/assets/phonecase.png',
        product_price: '₹1100',
        product_category: 'Accessories'
    },
    {
        product_name: 'Custom Hoodie',
        product_description: 'A cozy hoodie with your custom print.',
        product_img: '/assets/hoodie.png',
        product_price: '₹2500',
        product_category: 'Apparel'
    },
    {
        product_name: 'Custom Poster',
        product_description: 'A vibrant poster with your chosen artwork.',
        product_img: '/assets/poster.png',
        product_price: '₹700',
        product_category: 'Home Decor'
    },
    {
        product_name: 'Custom Mouse Pad',
        product_description: 'A smooth mouse pad with your design.',
        product_img: '/assets/mousepad.png',
        product_price: '₹750',
        product_category: 'Office Supplies'
    },
    {
        product_name: 'Custom Tote Bag',
        product_description: 'A stylish tote bag with your design.',
        product_img: '/assets/bag.png',
        product_price: '₹1100',
        product_category: 'Bags'
    },
    {
        product_name: 'Custom Cap',
        product_description: 'A comfortable cap with your custom design.',
        product_img: '/assets/cap.png',
        product_price: '₹700',
        product_category: 'Accessories'
    },
    {
        product_name: 'Custom Pillow',
        product_description: 'A soft pillow with your custom design.',
        product_img: '/assets/pillow.png',
        product_price: '₹2500',
        product_category: 'Home Decor'
    },
    {
        product_name: 'Custom Notebook',
        product_description: 'A notebook with your custom cover design.',
        product_img: '/assets/notebook.png',
        product_price: '₹500',
        product_category: 'Stationery'
    },
    {
        product_name: 'Custom T-Shirt',
        product_description: 'A high-quality T-shirt with your custom design.',
        product_img: '/assets/tshirt.png',
        product_price: '₹1500',
        product_category: 'Apparel'
    },
    {
        product_name: 'Custom Keychain',
        product_description: 'A personalized keychain with your design.',
        product_img: '/assets/keychain.png',
        product_price: '₹300',
        product_category: 'Accessories'
    },
    {
        product_name: 'Custom Water Bottle',
        product_description: 'A stainless steel water bottle with your custom design.',
        product_img: '/assets/waterBottle.png',
        product_price: '₹1200',
        product_category: 'Drinkware'
    },
    {
        product_name: 'Custom Laptop Sleeve',
        product_description: 'A protective laptop sleeve with your unique design.',
        product_img: '/assets/laptopSleeve.png',
        product_price: '₹1500',
        product_category: 'Accessories'
    },
    {
        product_name: 'Custom Calendar',
        product_description: 'A personalized calendar with your photos.',
        product_img: '/assets/calendar.png',
        product_price: '₹800',
        product_category: 'Stationery'
    },
    {
        product_name: 'Custom Pen',
        product_description: 'A pen with your custom design.',
        product_img: '/assets/pen.png',
        product_price: '₹200',
        product_category: 'Stationery'
    },
    {
        product_name: 'Custom Backpack',
        product_description: 'A backpack with your custom design.',
        product_img: '/assets/backpack.png',
        product_price: '₹2000',
        product_category: 'Bags'
    },
    {
        product_name: 'Custom Socks',
        product_description: 'A pair of socks with your custom design.',
        product_img: '/assets/socks.png',
        product_price: '₹500',
        product_category: 'Apparel'
    },
    {
        product_name: 'Custom Coasters',
        product_description: 'A set of coasters with your custom design.',
        product_img: '/assets/coasters.png',
        product_price: '₹600',
        product_category: 'Home Decor'
    },
    {
        product_name: 'Custom Apron',
        product_description: 'A kitchen apron with your custom design.',
        product_img: '/assets/apron.png',
        product_price: '₹800',
        product_category: 'Home Decor'
    },

];
//get all products
router.get('/', async (req, res) => {
    try {
        let products = await Product.find();
        if (products.length === 0) {
          await Product.insertMany(sampleProducts);
          products = await Product.find(); // Fetch again after inserting
          console.log('Inserted sample products.');
        }
        res.status(200).json({ success: true, message: 'All Products fetched', data: products });
    } catch (err) {
        console.log('Error fetching products', err);
        res.status(500).json({ success: false, message: 'Error fetching products', err });
    }
});
module.exports = router;
