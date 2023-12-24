import React, { memo } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useRecoilValue } from "recoil";
import { IReport } from "work-types/report";

import { selectedEnterprise } from "../../../../state/selectedEnterprise";
import { formatter } from "../../utils/formatter";

const prepareData = (arr: IReport[]) =>
  arr
    .map((rp) => ({ ...rp, income: Number(rp.income) }))
    .sort((a, b) => {
      const [yearA, quarterA] = a.report_period.split("_");
      const [yearB, quarterB] = b.report_period.split("_");

      if (yearA === yearB) {
        return quarterA.localeCompare(quarterB);
      }

      return yearA.localeCompare(yearB);
    });

const PerformanceGraph = () => {
  const { reports } = useRecoilValue(selectedEnterprise);

  return (
    <LineChart width={800} height={400} data={prepareData(reports)}>
      <Line type="basis" dataKey="income" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="report_period" />
      <YAxis tickFormatter={formatter.format} />
      <Tooltip />
    </LineChart>
  );
};

export default memo(PerformanceGraph);
