const express = require("express");
const homeController = require("../app/controllers/homeController");
const productController = require("../app/controllers/productController");
const authController = require("../app/controllers/authController");
const adminController = require("../app/controllers/adminController");

const router = express.Router();

router.get("/", homeController.getHomePage);
router.get("/product", productController.getProduct);
router.get("/product/:id/productdetails", productController.getProductDetails);
router.get("/signup", authController.getSignupPage);
router.post("/signup", authController.signupUser);

// se connecter après être inscrit
router.get("/login", authController.getLoginPage);
router.post("/login", authController.loginUser);
router.get("/logout", authController.getLogoutPage);

// Routes pour l'administration
router.get("/admin", adminController.getAdminPage);
router.get("/admin/createProductPage", adminController.getCreateProductPage);
router.post("/admin/product/add", adminController.addProduct);
router.get("/admin/product/:id/edit", adminController.getEditProductPage);
router.post("/admin/product/:id/delete", adminController.deleteProduct);
router.get("/admin/products", adminController.getProducts);
router.get("/admin/users", adminController.getUsers);
router.get("/admin/orders", adminController.getOrders);
router.post("/admin/product/add", adminController.addProduct);
router.post("/admin/products/edit", adminController.editProduct);

module.exports = router;
