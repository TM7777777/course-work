import { atom } from "recoil";
import { IPerformanceIndicator } from "../../types/performanceIndicator";

export const performanceIndicatorsState = atom<IPerformanceIndicator[]>({
  key: "performanceIndicatorsState",
  default: [],
});
