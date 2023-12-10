import { atom } from "recoil";
import { IEnterprise } from "work-types/enterprise";

export const enterprisesState = atom<IEnterprise[]>({
  key: "enterprisesState",
  default: [],
});
