import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { IPerformanceIndicator } from "work-types/performanceIndicator";

interface Props {
  indicator: IPerformanceIndicator;
  onDelete(id: IPerformanceIndicator["indicator_id"]): void;
}

const PerformanceIndicatorItem = ({ indicator, onDelete }: Props) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{indicator.name}</Typography>
        <Typography color="textSecondary">{indicator.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={() => onDelete(indicator.indicator_id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PerformanceIndicatorItem;
