const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    restaurantName: {
        type: String,
        required: true,
        unique: true,
    },
});

// Check if model already exists
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

module.exports = Admin;
