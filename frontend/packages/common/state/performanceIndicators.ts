import { atom } from "recoil";
import { IPerformanceIndicator } from "work-types/performanceIndicator";

export const performanceIndicatorsState = atom<IPerformanceIndicator[]>({
  key: "performanceIndicatorsState",
  default: [],
});
