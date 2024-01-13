const connection = require("../models/db");

const removeTrigger = (triggerName) =>
  connection.query(`DROP TRIGGER IF EXISTS ${triggerName};`, (error) => {
    if (error) {
      console.error(`An error occurred while removing the ${triggerName} trigger:`, error);
    } else {
      console.log(`${triggerName} trigger removed successfully`);
    }
  });

const removeEnterpriseTotalIncomeView = () =>
  connection.query("DROP VIEW IF EXISTS enterprise_total_income;", (error) => {
    if (error) {
      console.error("An error occurred while removing the enterprise_total_income view:", error);
    } else {
      console.log("enterprise_total_income view removed successfully");
    }
  });

const removeGetEnterpriseAndReportsProcedure = (callback) =>
  connection.query("DROP PROCEDURE IF EXISTS get_enterprise_and_reports;", (error) => {
    if (error) {
      console.error("An error occurred while removing the procedure:", error);
    } else {
      console.log("get_enterprise_and_reports procedure removed successfully");
    }
    callback(error);
  });

module.exports = () => (
  removeTrigger("after_user_delete"),
  removeTrigger("after_enterprise_delete"),
  removeEnterpriseTotalIncomeView(),
  removeGetEnterpriseAndReportsProcedure((error) => process.exit(error ? 1 : 0))
);
