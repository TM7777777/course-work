const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = require("./config/corsOptions");

const userRoutes = require("./routes/userRoutes");
const enterpriseRoutes = require("./routes/enterpriseRoutes");
const reportRoutes = require("./routes/reportRoutes");
const performanceIndicatorRoutes = require("./routes/performanceIndicatorRoutes");

const app = express();

app.set("view engine", "hbs");
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use(userRoutes);
app.use(enterpriseRoutes);
app.use(reportRoutes);
app.use(performanceIndicatorRoutes);

module.exports = app;
