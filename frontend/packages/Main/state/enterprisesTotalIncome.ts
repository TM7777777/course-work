import { atom } from "recoil";
import { IEnterpriseTotalIncome } from "../../types/enterprise";

export const enterprisesTotalIncomeState = atom<IEnterpriseTotalIncome[]>({
  key: "enterprisesTotalIncomeState",
  default: [],
});
