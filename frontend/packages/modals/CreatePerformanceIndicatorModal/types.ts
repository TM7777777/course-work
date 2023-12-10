import { ExtendModalProps } from "../index";
import { IPerformanceIndicator } from "../../types/performanceIndicator";

export type PureProps = {
  onSubmit(performanceIndicator: Omit<IPerformanceIndicator, "indicator_id">): Promise<void>;
};

export type Props = ExtendModalProps<PureProps>;
