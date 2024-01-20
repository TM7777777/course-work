const crypto = require("crypto");
const connection = require("../models/db");

exports.getEnterprises = (req, res) =>
  connection.query(
    "SELECT * FROM enterprises WHERE user_id = ?",
    [req.user.user_id],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error while fetching enterprises");
      } else {
        res.json(data);
      }
    },
  );

exports.createEnterprise = (req, res) => {
  const userId = req.user.user_id;
  const name = req.body.name;
  const details = req.body.details;
  const phone = req.body.phone;
  const enterpriseId = crypto.randomUUID();
  const contactPerson = req.body.contact_person;

  connection.query(
    "INSERT INTO enterprises (name, details, contact_person, enterprise_id, phone, user_id) VALUES (?,?,?,?,?,?)",
    [name, details, contactPerson, enterpriseId, phone, userId],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error while creating enterprise");
      } else {
        res.status(200).json({
          enterprise_id: enterpriseId,
          name,
          details,
          contact_person: contactPerson,
          phone,
        });
      }
    },
  );
};

exports.updateEnterprise = (req, res) => {
  const { enterpriseId } = req.params;
  const { name, details, phone, contact_person } = req.body;

  connection.query(
    "SELECT * FROM enterprises WHERE enterprise_id = ?",
    [enterpriseId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error checking for enterprise existence");
      }

      if (results.length === 0) {
        return res.status(404).send("Enterprise not found");
      }

      connection.query(
        "UPDATE enterprises SET name = ?, details = ?, phone = ?, contact_person = ? WHERE enterprise_id = ?",
        [name, details, phone, contact_person, enterpriseId],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error updating enterprise");
          }

          res.status(200).send("Enterprise updated successfully");
        },
      );
    },
  );
};

exports.getEnterprise = (req, res) => {
  const { enterpriseId } = req.params;

  connection.query("CALL get_enterprise_and_reports(?)", [enterpriseId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error while retrieving data");
    }

    if (results[0].length === 0) {
      return res.status(404).send("Enterprise not found");
    }

    const enterpriseData = results[0][0];
    const reports = results[0].map((row) => {
      const { enterprise_id, name, details, contact_person, phone, ...reportData } = row;
      return Object.entries(reportData).reduce(
        (acc, [key, value]) => Object.assign(acc, { [key]: value || "" }),
        {},
      );
    });

    res.json({
      enterprise: {
        enterprise_id: enterpriseId,
        name: enterpriseData.name || "",
        details: enterpriseData.details || "",
        contact_person: enterpriseData.contact_person || "",
        phone: enterpriseData.phone || "",
      },
      reports: reports,
    });
  });
};

exports.deleteEnterprise = (req, res) => {
  const { enterpriseId } = req.params;

  connection.query(
    "DELETE FROM enterprises WHERE enterprise_id = ?",
    [enterpriseId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error while deleting enterprise");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Enterprise not found");
      }

      res.status(200).send("Enterprise deleted successfully");
    },
  );
};

exports.getEnterpriseTotalIncome = (req, res) =>
  connection.query("SELECT * FROM enterprise_total_income", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error while fetching total income of enterprises");
    } else {
      res.json(data);
    }
  });
