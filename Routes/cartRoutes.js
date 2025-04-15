const express = require('express');
const cartItem = require('../Models/CartItem');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Load cloudinary configurations
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up the multer storage with cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cartImages',
        format: async (req, res) => 'png',
        public_id: (req, file) => Date.now() + '-' + file.originalname
    }
});
const upload = multer({ storage });
// Add item to cart
router.post('/', upload.single('file'), async (req, res) => {
    try {
        console.log('Add to cart req.body', req.body);

        const { product_name, product_price, product_category, product_description, product_img, quantity } = req.body;
        const imageUrl = req.file.path;
        // console.log("Image Url: ", imageUrl);

        const newItem = new cartItem({ product_name, product_price, file: imageUrl, product_category, product_description, product_img, quantity });
        await newItem.save();
        console.log('Item added to cart', newItem);
        res.status(201).json({ success: true, message: 'Item added to cart', data: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding item', error });
    }

});

// get all cart items
router.get('/', async (req, res) => {
    console.log('Fetching cart items');
    const items = await cartItem.find();
    res.json({ success: true, message: "Cart Items fetched", data: items });

});

// remove items form the cart
router.post('/remove', async (req, res) => {
    // const id = req.query.id;

    const { id } = req.body;
    console.log("Id from frontend->", id);
    // validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error('Invalid ObjectId:', id);
        return res.status(400).json({ success: false, message: "Invalid ID Format" });

    }
    try {
        console.log('Remove item from the cart', id);
        await cartItem.findByIdAndDelete(id);
        res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }


})
module.exports = router;