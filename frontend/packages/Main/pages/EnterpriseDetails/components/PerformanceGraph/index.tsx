import React, { memo } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useRecoilValue } from "recoil";

import { selectedEnterprise } from "../../../../state/selectedEnterprise";

const PerformanceGraph = () => {
  const { reports } = useRecoilValue(selectedEnterprise);

  const data = reports.map((rp) => ({ ...rp, income: Number(rp.income) }));

  return (
    <LineChart width={800} height={400} data={data}>
      <Line type="basis" dataKey="income" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="report_period" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default memo(PerformanceGraph);
