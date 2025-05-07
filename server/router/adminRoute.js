const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, addItem, addCuisenes } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);
router.route('/addItem').post(adminMiddleware, addItem);
router.route('/addCuisenes').post(adminMiddleware, addCuisenes);

module.exports = router;