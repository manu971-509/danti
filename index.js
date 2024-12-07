require("dotenv").config(); //lien vers notre dotenv
// faisons appel à la librairie express
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Importer jsonwebtoken
const cookieParser = require("cookie-parser");
const router = require("./Route/router.js"); //lien vers notre route
const app = express();
app.set("view engine", "ejs"); //utilisation du template ejs
app.set("views", __dirname + "/app/views"); //chemin vers le dossier des vues
//body parser
app.use(express.json());
app.set("views", __dirname + "/app/views");

app.use(express.static(__dirname + "/public"));

// ajouter un body parser , pour accéder au request .body du controller
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware pour analyser les cookies

// Middleware pour vérifier l'état d'authentification
app.use((req, res, next) => {
  const token = req.cookies.token; // Lire le token depuis les cookies

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_secret_key"
      );
      res.locals.isAuthenticated = true; // L'utilisateur est connecté
      res.locals.user = decoded; // Ajouter les données de l'utilisateur
      res.locals.tokenExpired = false; // Le token est valide
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        console.warn("Le token a expiré :", err.expiredAt); // Afficher la date d'expiration
        res.locals.isAuthenticated = false;
        res.locals.user = null;
        res.locals.tokenExpired = true; // Marquer le token comme expiré
      } else {
        console.error("Erreur lors de la vérification du token :", err);
        res.locals.isAuthenticated = false;
        res.locals.user = null;
        res.locals.tokenExpired = false; // Autre erreur, non liée à l'expiration
      }
    }
  } else {
    res.locals.isAuthenticated = false; // L'utilisateur n'est pas connecté
    res.locals.user = null;
    res.locals.tokenExpired = false; // Pas de token fourni
  }

  next(); // Passer au middleware suivant
});

app.use(router);

//On defini un port à écouter (en majuscule)
const PORT = process.env.PORT || 3000;

//On met notre server sur écoute
app.listen(PORT, () => {
  //une fois que le port est sur écoute cette fonction
  //est exécutée
  console.log(`App running at http://localhost:${PORT}`);
});
