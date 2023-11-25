import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const PerformanceGraph = () => {
  const [data, setData] = useState([
    { report_period: "2021-Q1", value: 10000 },
    { report_period: "2021-Q2", value: 12000 },
    { report_period: "2021-Q3", value: 15000 },
    { report_period: "2021-Q4", value: 11000 },
    { report_period: "2022-Q1", value: 13000 },
    { report_period: "2022-Q2", value: 16000 },
  ]);

  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="report_period" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default PerformanceGraph;
