const express = require("express");
const homeController = require("../app/controllers/homeController");
const productController = require("../app/controllers/productController")





const router =express.Router();

router.get('/', homeController.getHomePage);
router.get('/product', productController.getProduct);
router.get('/product/:id/productdetails', productController.getProductDetails);






module.exports = router;