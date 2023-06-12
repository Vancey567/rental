const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: false,
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        default: null
    },
    // bookedDates: [{
    //     type: Date,
    //     required: true,
    //     default: null
    // }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
