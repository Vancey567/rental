const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking-controller');
const { validateBooking } = require('../middlewares/validation');

router.post('/', validateBooking, bookingController.createBooking);

module.exports = router;
