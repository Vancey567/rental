const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

router.get('/categories', productController.getCategories);
router.get('/category', productController.getProductsByCategory);
router.post('/', productController.createProduct);

module.exports = router;
