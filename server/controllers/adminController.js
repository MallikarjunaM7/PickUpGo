const Restaurent = require('../models/restaurentModel');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

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
        const newRestaurant = new Restaurent({ restaurantName: restaurantName, ownerEmail: email, location: '', cuisineType: [], rating: 1 });
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
        return res.status(200).json({ message: 'Login successful', admin });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurent.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants', error });
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAllRestaurants,
};