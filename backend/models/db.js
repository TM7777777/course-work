const mysql = require("mysql2");
const dbConfig = require("../config/dbConfig");

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => (err ? console.error(err.message) : console.log("Connected to MySQL")));

module.exports = connection;
