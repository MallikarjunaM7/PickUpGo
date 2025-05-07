const Restaurent = require('../models/restaurentModel');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const bcryptjs = require('bcryptjs');


const registerAdmin = async (req, res) => {
    const { username, password, email, restaurantName } = req.body;
    console.log(req.body);
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        console.log('Admin does not exist, proceeding with registration.');
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword, email, restaurantName });

        await newAdmin.save();
        console.log(newAdmin);

        // Create a new restaurant entry for the admin
        const newRestaurant = new Restaurent({ restaurantName: restaurantName, ownerEmail: email, location: '', cuisineType: [], rating: 1, items: [] });
        await newRestaurant.save();
        console.log('New restaurant created:', newRestaurant);

        res.status(201).json({ message: 'Admin registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
    }
}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email});
        console.log('Admin found:', admin);
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (!bcryptjs.compareSync(password, admin.password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ id: admin._id, email: admin.email, restaurantName: admin.restaurantName }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        return res.status(200).json({ message: 'Login successful', token});
        }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

const addItem = async (req, res) => {
    const {itemName, itemPrice } = req.body;
    const restaurantName = req.restaurantName;
    console.log(restaurantName) // Assuming the restaurant name is passed in the request body

    try {
        const restaurant = await Restaurent.findOne({restaurantName});
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        restaurant.items.push({ name: itemName, price: itemPrice });
        await restaurant.save();
        return res.status(200).json({ message: 'Item added successfully', restaurant });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
}

const addCuisenes = async (req, res) => {
    const { cuisineType } = req.body;
    const restaurantName = req.restaurantName; // Assuming the restaurant name is passed in the request body
    console.log(cuisineType) // Assuming the restaurant name is passed in the request body
    try {
        const restaurant = await Restaurent.findOne({restaurantName});
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        restaurant.cuisineType.push(...cuisineType);
        await restaurant.save();
        return res.status(200).json({ message: 'Cuisine type added successfully', restaurant });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding cuisine type', error });
    }
}
module.exports = {
    registerAdmin,
    loginAdmin,
    addItem,
    addCuisenes
};