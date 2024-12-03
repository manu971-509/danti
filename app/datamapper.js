const client = require("./database.js");

const dataMapper = {
  getProductRequest: async () => {
    //getting product
    const SQLquery = "SELECT * FROM product";
    const result = await client.query(SQLquery);
    return result.rows;
  },

  getProductDetailsRequest: async (productById) => {
    const SQLquery = `SELECT * FROM product WHERE id = $1`;

    try {
      const result = await client.query(SQLquery, [productById]);
      return result.rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },

  // Trouver un utilisateur par e-mail
  findUserByEmail: async (email) => {
    const query = "SELECT * FROM userinfo WHERE email = $1";
    const result = await client.query(query, [email]);
    return result.rows[0]; // Retourne l'utilisateur s'il existe
  },
};

module.exports = dataMapper;
