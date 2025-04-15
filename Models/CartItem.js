const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product_name: String,
    product_price: String,
    file: String,
    product_description: String,
    product_category: String,
    product_img: String,
    quantity: { type: Number, default: 1 },
});

// file "Screenshot 2025-01-06 212559.png"
// product_category

// "Accessories"
// product_description
// : 
// "A durable phone case with your unique design."
// product_img
// : 
// "/assets/phonecase.png"
// product_name
// : 
// "Custom Phone Case"
// product_price
// : 
// "₹1100"
// quantity
// : 
// 1
module.exports = mongoose.model('CartItem', cartItemSchema);