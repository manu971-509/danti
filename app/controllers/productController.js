const { request } = require('express');
const client = require('../database.js');
const dataMapper = require('../dataMapper.js');


const productController = {
    getProduct: async (request, response) => {
        try {
            const productList = await dataMapper.getProductRequest()
            response.render("product.ejs", { productList })
        } catch (error) {
            console.log(error);
            response.render("404.ejs")
        }
    },
    //getProductDetails: async (request, response) => {
        // Récupération de l'Id dans l'Url:
        getProductDetails: async (request, response) => {
            const productById = Number(request.params.id);
        console.log(productById)
            // Vérifiez si l'ID est un nombre valide
            if (isNaN(productById) || productById <= 0) {
                console.error("Invalid product ID:", productById);
                return response.render("404.ejs");
            }
        
            try {
                const productDetails = await dataMapper.getProductDetailsRequest(productById);
                response.render("productdetails.ejs", { productDetails });
            } catch (error) {
                console.log(error);
                response.render("404.ejs");
            }
        
        }
        
        // const productById = Number(request.params.productid);
        // try {

        //     // Récupération du détail d'un produit dans la BDD.

        //     const productDetails = await dataMapper.getProductDetailsRequest(productById);

        //     response.render("productdetails.ejs", { productDetails }); 
            
        // } catch (error) {
        //     console.log(error);
        //     response.render("404.ejs")
        // }
    //},
};


module.exports = productController;