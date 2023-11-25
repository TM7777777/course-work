import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Divider, Grid } from "@mui/material";
import PerformanceGraph from "../PerformanceGraph";
import PerformanceIndicatorChart from "../PerformanceIndicatorChart";
import ReportForm from "../ReportForm";

const EnterpriseDetails = () => {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState({
    id: "2",
    name: "name",
    details: "details",
    phone: "phone",
    contact_person: "contact_person",
  });

  if (!enterprise) {
    return <div>Loading...</div>;
  }

  const indicators = [
    {
      indicator_id: 1,
      name: "Чистий дохід",
      values: [
        { report_period: "2021-Q1", value: 10000 },
        { report_period: "2021-Q2", value: 12000 },
        // ... інші записи
      ],
    },
    {
      indicator_id: 2,
      name: "EBITDA",
      values: [
        { report_period: "2021-Q1", value: 5000 },
        { report_period: "2021-Q2", value: 7000 },
        // ... інші записи
      ],
    },
    // ... інші показники
  ];

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">{enterprise.name}</Typography>
      <Typography variant="body1">{enterprise.details}</Typography>
      <Divider style={{ margin: "20px 0" }} />
      <ReportForm />
      <Divider style={{ margin: "20px 0" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2">Phone: {enterprise.phone}</Typography>
          <Typography variant="body2">Contact Person: {enterprise.contact_person}</Typography>
        </Grid>
      </Grid>
      <PerformanceGraph />
      {indicators.map((indicator) => (
        <div key={indicator.indicator_id}>
          <h3>{indicator.name}</h3>
          <PerformanceIndicatorChart data={indicator} />
        </div>
      ))}
    </Paper>
  );
};

export default EnterpriseDetails;
