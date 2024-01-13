import { ExtendModalProps } from "recoil-modals/dist/types";
import { IPerformanceIndicator } from "work-types/performanceIndicator";

export type PureProps = {
  onSubmit(performanceIndicator: Omit<IPerformanceIndicator, "indicator_id">): Promise<void>;
};

export type Props = ExtendModalProps<PureProps>;
