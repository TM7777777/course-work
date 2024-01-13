const app = require("./app");
const connectToDatabase = require("./utils/connectToDatabase");
const initializeDatabase = require("./utils/databaseInitialization");
const handleShutdown = require("./utils/shutdownHandlers");

const port = process.env.PORT || 4500;

connectToDatabase().then(() => {
  initializeDatabase();
  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
});

process.on("SIGINT", handleShutdown);
