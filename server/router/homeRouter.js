const express = require('express');
const router = express.Router();
const {showAllRestaurants, showRestaurantById} = require('../controllers/homeController');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/showAllRestaurants').get(authMiddleware, showAllRestaurants);
router.route('/showRestaurantById/:id').get(authMiddleware, showRestaurantById);

module.exports = router;