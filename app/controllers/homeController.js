const homeController ={
    getHomePage:(request, response) =>{
        response.render('projet.ejs');
    }
}


module.exports = homeController