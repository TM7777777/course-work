import { IReport } from "./report";

export interface IEnterprise {
  enterprise_id: string;
  name: string;
  details: string;
  phone: string;
  contact_person: string;
}

export interface ISelectedEnterprise {
  enterprise: IEnterprise;
  reports: IReport[];
}

export interface IEnterpriseTotalIncome {
  enterprise_id: IEnterprise["enterprise_id"];
  name: IEnterprise["name"];
  total_income: number | null;
}
