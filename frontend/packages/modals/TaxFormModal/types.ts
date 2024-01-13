import { ExtendModalProps } from "recoil-modals/dist/types";
import { IPerformanceIndicator, IReportDTO } from "work-types";

export type PureProps = {
  onSubmit(report: Omit<IReportDTO, "enterprise_id">): Promise<void>;
  performanceIndicators: IPerformanceIndicator[];
};

export type Props = ExtendModalProps<PureProps>;
