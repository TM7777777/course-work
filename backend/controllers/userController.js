const crypto = require("crypto");
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
      res.status(200).send(JSON.stringify({ user_id: user.user_id, role: user.role }));
    } else {
      res.status(401).send("Incorrect password or email");
    }
  });
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
