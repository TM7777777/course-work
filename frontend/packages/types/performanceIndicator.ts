import { IReport } from "./report";

export enum UnitOfMeasurement {
  EUR = "EUR",
  USD = "USD",
  UAH = "UAH",
}
export interface IPerformanceIndicator {
  indicator_id: string;
  name: string;
  description: string;
  unit_of_measurement: UnitOfMeasurement;
  importance: number;
}

export interface Indicator {
  indicator_id: IPerformanceIndicator["indicator_id"];
  name: IPerformanceIndicator["name"];
  importance: IPerformanceIndicator["importance"];
  values: { report_period: IReport["report_period"]; value: number }[];
}
