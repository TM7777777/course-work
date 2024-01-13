exports.isAuthenticated = (req, res, next) => {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  const role = req.cookies.role;

  if (role !== "admin") {
    return res.status(401).send("Permission denied");
  }

  next();
};
