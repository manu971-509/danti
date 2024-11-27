const client = require('./database.js');


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
    }
    
    // getProductDetailsRequest : async(productById) => {
    //     const SQLquery = `SELECT * FROM product  WHERE id = ${productById} `;

    //     console.log(SQLquery);
    //     const result = await client.query(SQLquery);
        
    //     return productdetails = result.rows[0];

    // },
}

module.exports = dataMapper;