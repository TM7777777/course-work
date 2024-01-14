import React from "react";
import { Container, Typography } from "@mui/material";

import CreatePerformanceIndicator from "./components/CreatePerformanceIndicator";
import PreviewTaxForm from "./components/PreviewTaxForm";
import IndicatorsList from "./components/IndicatorsList";
import { withLoadInitData } from "./withLoadInitData";

const EditPerformanceIndicators = () => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Edit Performance Indicators
    </Typography>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <CreatePerformanceIndicator />
      <PreviewTaxForm />
    </div>
    <IndicatorsList />
  </Container>
);

export default withLoadInitData(EditPerformanceIndicators);
