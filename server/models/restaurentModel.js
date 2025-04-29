const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
    },
    cuisineType: {
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    ownerEmail: {
        type: String,
        required: true,
    },
});

const Restaurent = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurent