const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const connection = require("../models/db");

exports.register = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "INSERT INTO users(user_id, email, password, created_at, role) VALUES (?,?,?,?,?)",
    [
      crypto.randomUUID(),
      email,
      password,
      new Date().toISOString().slice(0, 19).replace("T", " "),
      "user",
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error while register user");
      } else {
        res.sendStatus(200);
      }
    },
  );
};

exports.login = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const email = req.body.email;
  const password = req.body.password;

  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (results.length === 0) {
      return res.status(401).send("Email not found");
    }

    const user = results[0];
    if (user.password === password) {
      const data = { user_id: user.user_id, role: user.role };
      const accessToken = jwt.sign(data, "secretAccessKey", { expiresIn: "15m" });
      const refreshToken = jwt.sign(data, "secretRefreshKey", { expiresIn: "30d" });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).send(
        JSON.stringify({
          email: user.email,
          role: user.role,
          accessToken,
          refreshToken,
        }),
      );
    } else {
      res.status(401).send("Incorrect password or email");
    }
  });
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.status(401).send("Unauthorized!");

  const userData = jwt.verify(refreshToken, "secretRefreshKey");

  if (!userData) return res.status(401).send("Unauthorized!");

  connection.query("SELECT * FROM users WHERE user_id = ?", [userData.user_id], (err, results) => {
    const user = results[0];
    const data = { user_id: user.user_id, role: user.role };
    const accessToken = jwt.sign(data, "secretAccessKey", { expiresIn: "20s" });
    const refreshToken = jwt.sign(data, "secretRefreshKey", { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).send(
      JSON.stringify({
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken,
      }),
    );
  });
};

exports.logout = (req, res) => {
  const { refreshToken } = req.cookies;
  res.clearCookie("refreshToken");
  return res.json(refreshToken);
};

exports.getUsers = (req, res) => {
  connection.query("SELECT * FROM users ORDER BY created_at DESC;", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error while fetching users");
    } else {
      res.json(
        data.map((user) => {
          const { password, ...restData } = user;

          return restData;
        }),
      );
    }
  });
};

exports.deleteUser = (req, res) => {
  const { deletedUserId } = req.params;

  connection.query("DELETE FROM users WHERE user_id = ?", [deletedUserId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error while deleting user");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User deleted successfully");
  });
};
