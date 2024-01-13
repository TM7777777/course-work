const connection = require("../models/db");

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

const createAfterUserDeleteTrigger = `
CREATE TRIGGER after_user_delete
AFTER DELETE ON users FOR EACH ROW
BEGIN
    DELETE FROM enterprises WHERE user_id = OLD.user_id;
END;
`;

const createAfterEnterpriseDeleteTrigger = `
CREATE TRIGGER after_enterprise_delete
AFTER DELETE ON enterprises FOR EACH ROW
BEGIN
    DELETE FROM financial_reports WHERE enterprise_id = OLD.enterprise_id;
END;
`;

const createGetEnterpriseAndReportsProcedure = `
CREATE PROCEDURE get_enterprise_and_reports(IN entId CHAR(36))
BEGIN
    SELECT e.*, fr.*
    FROM enterprises e
    LEFT JOIN financial_reports fr ON e.enterprise_id = fr.enterprise_id
    WHERE e.enterprise_id = entId;
END
`;

module.exports = () => (
  connection.query(createEnterpriseTotalIncomeView, (error) => {
    if (error) {
      return console.error(
        "An error occurred while creating the enterprise_total_income view:",
        error,
      );
    }
    console.log("enterprise_total_income view created successfully");
  }),
  connection.query(createAfterUserDeleteTrigger, (error) => {
    if (error) {
      return console.error(
        "An error occurred while creating the after_user_delete trigger:",
        error,
      );
    }
    console.log("after_user_delete trigger created successfully");
  }),
  connection.query(createAfterEnterpriseDeleteTrigger, (error) => {
    if (error) {
      return console.error(
        "An error occurred while creating the after_enterprise_delete trigger:",
        error,
      );
    }
    console.log("after_enterprise_delete trigger created successfully");
  }),
  connection.query(createGetEnterpriseAndReportsProcedure, (error) => {
    if (error) {
      return console.error("An error occurred while creating the procedure:", error);
    }
    console.log("Procedure created successfully");
  })
);
