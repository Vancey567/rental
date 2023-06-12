const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/product-route');
const bookingRoutes = require('./routes/booking-route');

// const connectDB = require('./database');

const PORT = process.env.PORT || 8000;
const uri = "mongodb+srv://jay:1234@rental.xqqe09h.mongodb.net/?retryWrites=true&w=majority";
// const uri = 'mongodb://localhost/rental-app';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB Connected...');
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
  process.exit(1);
});

// connectDB;

// Middleware
app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/bookings', bookingRoutes);


// Error handling middleware
app.use(require('./middlewares/error-handler'));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
