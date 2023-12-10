import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Indicator } from "work-types/performanceIndicator";

interface Props {
  indicator: Indicator;
}

const PerformanceIndicatorChart = ({ indicator }: Props) => {
  const lineStrokeWidth = indicator.importance > 5 ? 3 : 2;
  const lineColor = indicator.importance > 5 ? "#82ca9d" : "#8884d8";

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={indicator.values}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="report_period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={lineStrokeWidth}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceIndicatorChart;
