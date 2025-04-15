const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'india#321';
// signup
router.post('/signup', async (req, res) => {
    console.log('signup req body', req.body);

    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User signup up successfully', data: newUser });
    } catch (err) {
        console.error("Error during signup", err);
        res.status(500).json({ success: false, message: 'Error signing up user', err });
    }

});
// Login route
router.post('/login', async (req, res) => {
    console.log('Login request body', req.body);

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            console.log('User logged in', user);
            const token = jwt.sign({ email: 'user.email' }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ success: true, message: "Login Successful", data: { user, token } });

        } else {
            console.log('Invalid credentials');
            res.status(401).json({ success: false, message: 'Invalid credentials' });

        }
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).json({ success: false, message: 'Error during login', data: err });
    }


});
// getting details of all the users
router.get('/', async (req, res) => {
    console.log('Fetching all the users');
    const users = await User.find();
    res.status(201).json({ success: true, message: 'All Users Fetched', data: users });
});

// delete a user
router.delete('/', async (req, res) => {
    console.log('User deleted');
    const id = req.query.id;
    await User.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: 'User deleted Successful' });

})
module.exports = router;