require("dotenv").config(); //lien vers notre dotenv
// faisons appel à la librairie express
const express = require("express");
const rooter = require("./Route/route.js"); //lien vers notre route
const app = express();
app.set('view engine' , 'ejs');//utilisation du template ejs
app.set('views' , __dirname + '/app/views');//chemin vers le dossier des vues
//body parser 
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(router);


const PORT =  process.env.PORT || 3000;

app.listen (PORT , () => {
    console.log(`app running at http://localhost:${PORT}`);

})