const Booking = require('../models/booking-model');
const Product = require('../models/product-model');

const createBooking = async (req, res, next) => {
  try {
    const { userId, productId, startDate, endDate } = req.body;
    // const { productId, startDate, endDate } = req.body;

    const product = await Product.findById(productId);

    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMilliseconds = end - start;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    const cost = differenceInDays * product.cost;

    const booking = await Booking.create({ userId, productId, cost: cost, startDate, endDate });

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { isBooked: true, bookingId: booking._id },
      { new: true }
    );

    if (booking && updatedProduct) {
      res.status(200).json({ message: "Product Booked Successfully", status: "success", booking });
    }
    
    if (!booking || !updatedProduct) {
      res.status(400).json({ message: "Something went wrong while Booking", status: "failed" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
};
