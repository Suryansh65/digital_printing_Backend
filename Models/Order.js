const mongoose = require('mongoose');
// orderId: String,
// userId: String,
// products: Array,
// totalAmount: Number,
// status: String,
// createdAt: Date
const orderSchema = new mongoose.Schema({
    orderId: String,
    // userId: String,
    cartItems: Array,
    totalAmount: Number,
    // status: String,
    shippingDetails: Object,
    createdAt: Date
    // items: [
    //     {
    //         name: String,
    //         price: Number,
    //         quantity: Number,
    //     },
    // ],
    // customerName: String,
    // email: String,
    // address: String,
    // totalPrice: Number,
    // status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);