const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const app = express();

app.set("view engine", "hbs");

const corsOptions = {
  origin: "http://localhost:5000",
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
  allowedHeaders: "X-PINGOTHER, Content-Type",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7720",
  database: "course_work",
  multipleStatements: true,
});

function removeTrigger(triggerName) {
  connection.query(`DROP TRIGGER IF EXISTS ${triggerName};`, function (error, results, fields) {
    if (error) {
      console.error(`An error occurred while removing the ${triggerName} trigger:`, error);
    } else {
      console.log(`${triggerName} trigger removed successfully`);
    }
  });
}

function removeEnterpriseTotalIncomeView() {
  connection.query(
    "DROP VIEW IF EXISTS enterprise_total_income;",
    function (error, results, fields) {
      if (error) {
        console.error("An error occurred while removing the enterprise_total_income view:", error);
      } else {
        console.log("enterprise_total_income view removed successfully");
      }
    },
  );
}

function removeGetEnterpriseAndReportsProcedure(callback) {
  connection.query(
    "DROP PROCEDURE IF EXISTS get_enterprise_and_reports;",
    function (error, results, fields) {
      if (error) {
        console.error("An error occurred while removing the procedure:", error);
      } else {
        console.log("get_enterprise_and_reports procedure removed successfully");
      }
      callback(error);
    },
  );
}

process.on("SIGINT", function () {
  removeTrigger("after_user_delete");
  removeTrigger("after_enterprise_delete");
  removeEnterpriseTotalIncomeView();
  removeGetEnterpriseAndReportsProcedure(function (error) {
    process.exit(error ? 1 : 0);
  });
});

const createEnterpriseTotalIncomeView = `
CREATE VIEW enterprise_total_income AS
SELECT 
    e.enterprise_id,
    e.name,
    SUM(fr.income) AS total_income
FROM 
    enterprises e
LEFT JOIN 
    financial_reports fr ON e.enterprise_id = fr.enterprise_id
GROUP BY 
    e.enterprise_id;
`;

connection.query(createEnterpriseTotalIncomeView, (error, results, fields) => {
  if (error) {
    return console.error(
      "An error occurred while creating the enterprise_total_income view:",
      error,
    );
  }
  console.log("enterprise_total_income view created successfully");
});

const createAfterUserDeleteTrigger = `
CREATE TRIGGER after_user_delete
AFTER DELETE ON users FOR EACH ROW
BEGIN
    DELETE FROM enterprises WHERE user_id = OLD.user_id;
END;
`;

connection.query(createAfterUserDeleteTrigger, (error, results, fields) => {
  if (error) {
    return console.error("An error occurred while creating the after_user_delete trigger:", error);
  }
  console.log("after_user_delete trigger created successfully");
});

const createAfterEnterpriseDeleteTrigger = `
CREATE TRIGGER after_enterprise_delete
AFTER DELETE ON enterprises FOR EACH ROW
BEGIN
    DELETE FROM financial_reports WHERE enterprise_id = OLD.enterprise_id;
END;
`;

connection.query(createAfterEnterpriseDeleteTrigger, (error, results, fields) => {
  if (error) {
    return console.error(
      "An error occurred while creating the after_enterprise_delete trigger:",
      error,
    );
  }
  console.log("after_enterprise_delete trigger created successfully");
});

const createGetEnterpriseAndReportsProcedure = `
CREATE PROCEDURE get_enterprise_and_reports(IN entId CHAR(36))
BEGIN
    SELECT * FROM enterprises WHERE enterprise_id = entId;
    SELECT * FROM financial_reports WHERE enterprise_id = entId;
END
`;

connection.query(createGetEnterpriseAndReportsProcedure, (error, results, fields) => {
  if (error) {
    return console.error("An error occurred while creating the procedure:", error);
  }
  console.log("Procedure created successfully");
});

connection.connect(function (err) {
  if (err) {
    return console.error(err.message);
  } else {
    console.log("Connected to MySQL");
  }
});

// user
app.post("/register", function (req, res) {
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
    function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).send("Error while register user");
      } else {
        res.sendStatus(200);
      }
    },
  );
});

app.post("/login", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const email = req.body.email;
  const password = req.body.password;

  connection.query("SELECT * FROM users WHERE email = ?", [email], function (err, results) {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (results.length === 0) {
      return res.status(401).send("Email not found");
    }

    // Перевірка пароля
    const user = results[0];
    if (user.password === password) {
      res.status(200).send(JSON.stringify({ user_id: user.user_id, role: user.role }));
    } else {
      res.status(401).send("Incorrect password or email");
    }
  });
});

app.get("/users", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const role = req.cookies.role;

  if (role !== "admin") {
    return res.status(401).send("Permission denied");
  }

  connection.query("SELECT * FROM users", function (err, data) {
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
});

app.delete("/users/:deletedUserId", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const role = req.cookies.role;

  if (role !== "admin") {
    return res.status(401).send("Permission denied");
  }

  const { deletedUserId } = req.params;

  connection.query("DELETE FROM users WHERE user_id = ?", [deletedUserId], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error while deleting user");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User deleted successfully");
  });
});

// enterprises
app.get("/enterprises", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  connection.query("SELECT * FROM enterprises WHERE user_id = ?", [userId], function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error while fetching enterprises");
    } else {
      res.json(data);
    }
  });
});

app.post("/enterprise", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const name = req.body.name;
  const details = req.body.details;
  const phone = req.body.phone;
  const enterpriseId = crypto.randomUUID();
  const contactPerson = req.body.contact_person;

  connection.query(
    "INSERT INTO enterprises (name, details, contact_person, enterprise_id, phone, user_id) VALUES (?,?,?,?,?,?)",
    [name, details, contactPerson, enterpriseId, phone, userId],
    function (err, data) {
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
});

app.put("/enterprise/:enterpriseId", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const { enterpriseId } = req.params;
  const { name, details, phone, contact_person } = req.body;

  connection.query(
    "SELECT * FROM enterprises WHERE enterprise_id = ?",
    [enterpriseId],
    function (err, results) {
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
        function (err, result) {
          if (err) {
            console.error(err);
            return res.status(500).send("Error updating enterprise");
          }

          res.status(200).send("Enterprise updated successfully");
        },
      );
    },
  );
});

app.get("/enterprise/:enterpriseId", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const { enterpriseId } = req.params;

  connection.query("CALL get_enterprise_and_reports(?)", [enterpriseId], function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error while retrieving data");
    }

    res.json({
      enterprise: results[0][0],
      reports: results[1],
    });
  });
});

app.delete("/enterprise/:enterpriseId", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const { enterpriseId } = req.params;

  connection.query(
    "DELETE FROM enterprises WHERE enterprise_id = ?",
    [enterpriseId],
    function (err, result) {
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
});

app.get("/enterprise-total-income", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  connection.query("SELECT * FROM enterprise_total_income", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Error while fetching total income of enterprises");
    } else {
      res.json(data);
    }
  });
});

// reports
app.post("/financial_report", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const reportId = crypto.randomUUID();
  const enterpriseId = req.body.enterprise_id;
  const reportPeriod = `${req.body.year}_Q${req.body.quarter}`;
  const income = req.body.income;
  const payer = req.body.payer;
  const finValues = req.body.fin_values;

  connection.query(
    "INSERT INTO financial_reports (report_id, enterprise_id, report_period, income, payer, fin_values) VALUES (?,?,?,?,?,?)",
    [reportId, enterpriseId, reportPeriod, income, payer, finValues],
    function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).send("Error while creating financial report");
      } else {
        res.status(200).json({
          report_id: reportId,
          enterprise_id: enterpriseId,
          report_period: reportPeriod,
          fin_values: JSON.parse(finValues),
          income,
          payer,
        });
      }
    },
  );
});

// performance_indicators
app.get("/performance_indicators", function (req, res) {
  connection.query("SELECT * FROM performance_indicators", function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error while fetching perfomance indicators");
    } else {
      res.json(data);
    }
  });
});

app.post("/performance_indicator", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const role = req.cookies.role;

  if (role !== "admin") {
    return res.status(401).send("Permission denied");
  }

  const indicatorId = crypto.randomUUID();
  const name = req.body.name;
  const description = req.body.description;
  const unitOfMeasurement = req.body.unit_of_measurement;
  const importance = req.body.importance;
  const indicator = req.body.indicator;

  connection.query(
    "INSERT INTO performance_indicators (indicator_id, name, description, unit_of_measurement, importance, indicator) VALUES (?,?,?,?,?,?)",
    [indicatorId, name, description, unitOfMeasurement, importance, indicator],
    function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).send("Error while creating performance indicator");
      } else {
        res.status(200).json({
          indicator_id: indicatorId,
          name,
          description,
          unit_of_measurement: unitOfMeasurement,
          importance,
          indicator,
        });
      }
    },
  );
});

app.delete("/performance_indicator/:indicatorId", function (req, res) {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const role = req.cookies.role;

  if (role !== "admin") {
    return res.status(401).send("Permission denied");
  }

  const { indicatorId } = req.params;

  connection.query(
    "DELETE FROM performance_indicators WHERE indicator_id = ?",
    [indicatorId],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error while deleting performance indicator");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Performance indicator not found");
      }

      res.status(200).send("Performance indicator deleted successfully");
    },
  );
});

const port = 4500;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
