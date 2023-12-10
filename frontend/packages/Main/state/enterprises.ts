import { atom } from "recoil";
import { IEnterprise } from "../../types/enterprise";

export const enterprisesState = atom<IEnterprise[]>({
  key: "enterprisesState",
  default: [],
});
