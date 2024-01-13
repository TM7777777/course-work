const crypto = require("crypto");
const connection = require("../models/db");

exports.createReport = (req, res) => {
  const reportId = crypto.randomUUID();
  const enterpriseId = req.body.enterprise_id;
  const reportPeriod = `${req.body.year}_Q${req.body.quarter}`;
  const income = req.body.income;
  const payer = req.body.payer;
  const finValues = req.body.fin_values;

  connection.query(
    "INSERT INTO financial_reports (report_id, enterprise_id, report_period, income, payer, fin_values) VALUES (?,?,?,?,?,?)",
    [reportId, enterpriseId, reportPeriod, income, payer, finValues],
    (err) => {
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
};
