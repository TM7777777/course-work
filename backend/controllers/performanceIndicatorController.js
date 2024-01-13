const crypto = require("crypto");
const connection = require("../models/db");

exports.getPerformanceIndicators = (req, res) => {
  connection.query("SELECT * FROM performance_indicators", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error while fetching perfomance indicators");
    } else {
      res.json(data);
    }
  });
};

exports.createPerformanceIndicator = (req, res) => {
  const indicatorId = crypto.randomUUID();
  const name = req.body.name;
  const description = req.body.description;
  const unitOfMeasurement = req.body.unit_of_measurement;
  const importance = req.body.importance;

  connection.query(
    "INSERT INTO performance_indicators (indicator_id, name, description, unit_of_measurement, importance) VALUES (?,?,?,?,?)",
    [indicatorId, name, description, unitOfMeasurement, importance],
    (err) => {
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
        });
      }
    },
  );
};

exports.deletePerformanceIndicator = (req, res) => {
  const { indicatorId } = req.params;

  connection.query(
    "DELETE FROM performance_indicators WHERE indicator_id = ?",
    [indicatorId],
    (err, result) => {
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
};
