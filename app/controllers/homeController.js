const homeController ={
    getHomePage:(request, response) =>{
        response.render('home.ejs');
    }
}


module.exports = homeController