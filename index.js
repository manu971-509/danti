require("dotenv").config(); //lien vers notre dotenv
// faisons appel à la librairie express
const express = require("express");
const router = require("./Route/router.js"); //lien vers notre route
const app = express();
app.set('view engine' , 'ejs');//utilisation du template ejs
app.set('views' , __dirname + '/app/views');//chemin vers le dossier des vues
//body parser 
app.use(express.json());
app.set('views' , __dirname + '/app/views' );


app.use(express.static(__dirname + "/public"));

// ajouter un body parser , pour accéder au request .body du controller 
app.use(express.urlencoded({ extended : true}))

app.use(router);

//On defini un port à écouter (en majuscule)
const PORT = process.env.PORT || 3000;

//On met notre server sur écoute
app.listen(PORT, () =>{
    //une fois que le port est sur écoute cette fonction 
    //est exécuté
    console.log(`App running at http://localhost:${PORT}`)
});