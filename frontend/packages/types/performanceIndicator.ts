import { IReport } from "./report";

export interface IPerformanceIndicator {
  indicator_id: string;
  name: string;
  description: string;
  unit_of_measurement: string;
  importance: number;
  indicator: string;
}

export interface Indicator {
  indicator_id: IPerformanceIndicator["indicator_id"];
  name: IPerformanceIndicator["name"];
  importance: IPerformanceIndicator["importance"];
  values: { report_period: IReport["report_period"]; value: number }[];
}
