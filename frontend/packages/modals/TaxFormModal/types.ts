import { IPerformanceIndicator } from "../../types/performanceIndicator";
import { IReportDTO } from "../../types/report";
import { ExtendModalProps } from "../index";

export type PureProps = {
  onSubmit(report: Omit<IReportDTO, "enterprise_id">): Promise<void>;
  performanceIndicators: IPerformanceIndicator[];
};

export type Props = ExtendModalProps<PureProps>;
