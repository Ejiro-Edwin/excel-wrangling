const dotenv = require("dotenv");
const mysql = require("sync-mysql");

dotenv.config();

const connection = new mysql({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_pass,
  database: process.env.db_name
});

class Variables {

  static getAllVariables(req, res) {
    try {
      const query = `SELECT * FROM variable order by id ASC `;
      const result = connection.query(query);
      console.log(result)
      if (result.length <= 0) {
        throw error
      } else {
       return result
      }
    } catch (err) {
      console.log(err);
    }
  }
  static getAllCompanies(req, res) {
    try {
      const query = `SELECT * FROM companies order by symbol ASC `;
      const result = connection.query(query);
      if (result.length <= 0) {
        throw error
      } else {
        res.status(200).json({
          status: 200,
          message: "Exempt Ip Data Returned Successfully",
          data: result
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  }


module.exports = Variables;
