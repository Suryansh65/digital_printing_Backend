const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productsRoutes');
const Product = require('./Models/Products');
const Razorpay = require('razorpay');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});
// console.log(razorpay);
app.use((req, res, next) => {
    req.razorpay = razorpay;
    next();
})

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

// mongodb connection
const uri = process.env.MONGO_URI;
// console.log(uri);

// setting up the routes
app.use('/api/cart', cartRoutes);
app.use('/api/cart/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // return Product.insertMany(sampleProducts);
    })
    .catch(err => console.error('Mongodb connection error:', err));

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));