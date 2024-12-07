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

  addProductRequest: async (product) => {
    const { name, description, price, tva, illustration_binary, user_id } =
      product;

    const SQLquery = {
      text: `
        INSERT INTO product
        (name, description, price, tva, illustration_binary, user_id)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `,
      values: [name, description, price, tva, illustration_binary, user_id],
    };

    try {
      const result = await client.query(SQLquery);
      return result.rows[0]; // Retourne le produit ajouté
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      throw error; // Rejette l'erreur pour être gérée ailleurs
    }
  },

  updateProductRequest: async (id, updatedData) => {
    const { name, description, price, tva, illustration_binary } = updatedData;
    const SQLquery = `
      UPDATE product
      SET name = $1, description = $2, price = $3, tva = $4, illustration_binary = $5
      WHERE id = $6 RETURNING *;
    `;
    const values = [name, description, price, tva, illustration_binary, id];
    const result = await client.query(SQLquery, values);
    console.log(result);
    return result.rows[0]; // Retourne le produit mis à jour
  },
};

module.exports = dataMapper;
