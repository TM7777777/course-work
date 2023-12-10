import { atom } from "recoil";
import { IEnterpriseTotalIncome } from "work-types/enterprise";

export const enterprisesTotalIncomeState = atom<IEnterpriseTotalIncome[]>({
  key: "enterprisesTotalIncomeState",
  default: [],
});
