interface CommonReport {
  enterprise_id: string;
  payer: string;
  income: number;
}

export interface IReportDTO extends CommonReport {
  year: number;
  quarter: number;
  fin_values: string;
}

export interface IReport extends CommonReport {
  report_id: string;
  report_period: string;
  fin_values: Record<string, number>;
}
