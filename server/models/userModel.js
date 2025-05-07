const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

    cart: [
        {
            restarentName: {
                type: String,
                required: true,
            },
            itemName: {
                type: String,
                required: true,
            },
            itemQuantity: {
                type: Number,
                required: true,
            },
        },
    ],

    });

const User = mongoose.model('User', userSchema);

module.exports = User;