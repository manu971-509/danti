const express = require("express");
const homeController = require("../app/controllers/homeController");
const productController = require("../app/controllers/productController");
const authController = require("../app/controllers/authController");

const router = express.Router();

router.get("/", homeController.getHomePage);
router.get("/product", productController.getProduct);
router.get("/product/:id/productdetails", productController.getProductDetails);
router.get("/signup", authController.getSignupPage);
router.post("/signup", authController.signupUser);

// se connecter après être inscrit
router.get("/login", authController.getLoginPage);
router.post("/login", authController.loginUser);

module.exports = router;
