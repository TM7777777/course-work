const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized!");
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "secretAccessKey", (err, user) => {
    if (err) {
      return res.status(403).json("Token is invalid!");
    }

    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Permission denied!");
  }

  next();
};
