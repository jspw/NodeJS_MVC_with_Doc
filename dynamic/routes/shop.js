const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/cart', shopController.getCart);
router.get('/products/:productId', shopController.getProduct);
router.get('/products', shopController.getProducts);
router.get('/checkout', shopController.getCheckout);


module.exports = router;
