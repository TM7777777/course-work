const connection = require("../models/db");

module.exports = () => {
  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      if (error) {
        console.error("Error initializing the database:", error);
        reject(error);
        return;
      }
      console.log("Database initialized successfully.");
      resolve();
    });
  });
};
