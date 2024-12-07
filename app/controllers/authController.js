// app/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../database.js");
const dataMapper = require("../dataMapper.js");

const authController = {
  getSignupPage: (req, res) => {
    res.render("signup");
  },

  // Enregistrer les données du formulaire dans la base de donnée
  signupUser: async (req, res) => {
    const { lastname, firstname, email, password } = req.body;
    try {
      //  vérifies si un utilisateur avec le même email existe déjà :

      const existingUser = await client.query(
        "SELECT * FROM userinfo WHERE email = $1",
        [email]
      );
      if (existingUser.rows.length > 0) {
        return res.status(400).send("Email déjà utilisé");
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertion dans la base
      await client.query(
        `INSERT INTO userinfo (lastname, firstname, email, password, roles)
         VALUES ($1, $2, $3, $4, 'customer')`,
        [lastname, firstname, email, hashedPassword]
      );

      // si le user est inscrit on le redirige  vers la page de connexion
      res.redirect("/login");
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      res.status(500).send("Erreur serveur");
    }
  },
  getLoginPage: (req, res) => {
    res.render("login");
  },
  // se connecter

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Récupérer l'utilisateur depuis la base de données
      const user = await dataMapper.findUserByEmail(email);

      if (!user) {
        return res.status(400).send("Email ou mot de passe incorrect");
      }

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).send("Mot de passe incorrect");
      }

      // Générer un token JWT
      const token = jwt.sign(
        {
          userId: user.userid,
          firstname: user.firstname,
          roles: user.user_roles,
        },
        "your_secret_key",
        { expiresIn: "1h" }
      );

      // Sauvegarder le token dans les cookies
      res.cookie("token", token, { httpOnly: true });

      // Redirection basée sur le rôle
      if (user.roles === "admin") {
        return res.redirect("/admin"); // Redirige vers la page d'administration
      } else if (user.roles === "customer") {
        return res.redirect("/"); // Redirige vers le tableau de bord utilisateur
      } else {
        return res.redirect("/"); // Redirige vers la page d'accueil par défaut
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      res.status(500).send("Erreur serveur");
    }
  },
  // Déconnexion
  getLogoutPage: (req, res) => {
    res.clearCookie("token"); // Supprime le cookie JWT
    res.redirect("/");
  },

  postLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Vérifiez si l'utilisateur existe
      const query = `SELECT * FROM userinfo WHERE email = $1`;
      const result = await client.query(query, [email]);

      if (result.rows.length === 0) {
        return res.status(400).send("Email ou mot de passe incorrect");
      }

      const user = result.rows[0];

      // Comparez les mots de passe
      const isMatch = await bcrypt.compare(password, user.userpassword);

      if (!isMatch) {
        return res.status(400).send("Email ou mot de passe incorrect");
      }

      // Stockez les informations utilisateur dans la session
      req.session.isAuthenticated = true;
      req.session.user = {
        id: user.userid,
        email: user.email,
        firstname: user.firstname,
      };

      // Redirigez vers la page d'accueil
      res.redirect("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).send("Erreur serveur");
    }
  },

  logout: (req, res) => {
    res.clearCookie("token"); // Supprime le cookie contenant le token JWT
    res.redirect("/"); // Redirige vers la page de connexion
  },
};

module.exports = authController;
