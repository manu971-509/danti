const { request, response } = require("express");
const client = require("../database.js");
const dataMapper = require("../dataMapper.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminController = {
  // Afficher la page admin
  getAdminPage: async (req, res) => {
    try {
      const productList = await dataMapper.getProductRequest();
      res.render("admin", { productList });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      res.status(500).send("Erreur serveur");
    }
  },
  getCreateProductPage: (req, res) => {
    try {
      res.render("createProductPage");
    } catch (error) {
      console.error("Erreur lors de la récupération de la page :", error);
      res.status(500).send("Erreur serveur");
    }
  },
  // Ajouter un produit

  addProduct: async (req, res) => {
    try {
      await dataMapper.addProductRequest(req.body);

      res.redirect("/admin");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Page pour modifier un produit
  getEditProductPage: async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await dataMapper.getProductDetailsRequest(productId);
      if (!product) {
        return res.status(404).send("Produit introuvable");
      }
      res.render("editProduct", { product });
    } catch (error) {
      console.error("Erreur lors de la récupération du produit :", error);
      res.status(500).send("Erreur serveur");
    }
  },

  editProduct: async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    await dataMapper.updateProductRequest(id, updatedData);
    res.redirect("/admin");
  },

  // Supprimer un produit
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      await dataMapper.deleteProductRequest(productId);
      res.redirect("/admin");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      res.status(500).send("Erreur serveur");
    }
  },

  getProducts: async (req, res) => {
    try {
      const products = await dataMapper.getProductRequest();
      res.render("adminProducts", { products });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      res.status(500).send("Erreur serveur");
    }
  },
  getUsers: async (req, res) => {
    // Ajoutez la logique pour gérer les utilisateurs
  },
  getOrders: async (req, res) => {
    // Ajoutez la logique pour gérer les commandes
  },
};

module.exports = adminController;
