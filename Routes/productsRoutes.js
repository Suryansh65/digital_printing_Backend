const express = require('express');
const Product = require('../Models/Products');
const router = express.Router();

//get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, message: 'All Products fetched', data: products });
    } catch (err) {
        console.log('Error fetching products', err);
        res.status(500).json({ success: false, message: 'Error fetching products', err });
    }
});
module.exports = router;