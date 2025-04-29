const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllRestaurants } = require('../controllers/adminController');

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);

module.exports = router;