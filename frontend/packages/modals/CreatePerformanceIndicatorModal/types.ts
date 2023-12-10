import { IPerformanceIndicator } from "work-types/performanceIndicator";
import { ExtendModalProps } from "../index";

export type PureProps = {
  onSubmit(performanceIndicator: Omit<IPerformanceIndicator, "indicator_id">): Promise<void>;
};

export type Props = ExtendModalProps<PureProps>;
