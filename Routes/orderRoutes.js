const express = require('express');
const Order = require('../Models/Order');
const router = express.Router();
const crypto = require('crypto');
// place an order
router.post('/', async (req, res) => {
    // console.log("req.body: ", req.body);
    // const { amount, currency, receipt } = req.body;
    const { shippingDetails, amount, currency, cartItems } = req.body;
    // const options = {
    //     shippingDetails: shippingDetails,
    //     amount: amount * 100,
    //     currency,
    //     cartItems,
    // };
    const rajorpayApikey = {
        amount: amount * 100,
        currency: currency,
        receipt: 'receipt#1',

    }


    try {

        // Store orderDetail in out Database first
        // razorpay create order API
        const order = await req.razorpay.orders.create(rajorpayApikey);
        // const { items, customerName, email, address, totalPrice } = req.body;
        // const newOrder = new Order({ items, customerName, email, address, totalPrice });
        const newOrder = new Order({
            orderId: order.id,
            totalAmount: amount,
            cartItems: cartItems,
            shippingDetails: shippingDetails,
            createdAt: new Date(),
        });
        await newOrder.save();
        console.log('order placed', newOrder);

        res.status(201).json({ success: true, message: "Order placed successfully", data: newOrder });
    } catch (error) {
        res.status(500).send(error.message);
    }

});

// endpoint for verify payment
router.post('/verifyPayment', (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    const expectedSignature = shasum.digest('hex');
    console.log('expextedSignature:', expectedSignature);
    console.log('razorpay signature:', razorpay_signature);
    // compare signature
    if (expectedSignature == razorpay_signature) {
        razorpay.payments.capture(razorpay_payment_id, amount)
            .then((data) => {
                res.status(200).json({ message: 'Payment verified and captured successfully.' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Error in capturing payment', error });
            })
    } else {
        res.status(400).json({ message: 'Invalid signature.' });
    }
})
// get a particular orders
router.get('/:orderId', async (req, res) => {
    try {
        const order = await req.razorpay.orders.fetch(req.params.orderId);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching orders', error: error.message });
    }

});
module.exports = router;
