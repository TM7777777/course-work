import React from "react";
import { Button } from "@mui/material";
import { useLocation } from "wouter";

const EditPerformanceIndicatorsButton = () => {
  const [, navigate] = useLocation();

  const onClick = () => navigate("/edit-performance-indicators");

  return (
    <div>
      <Button variant="contained" onClick={onClick}>
        Edit Performance Indicators
      </Button>
    </div>
  );
};

export default EditPerformanceIndicatorsButton;
