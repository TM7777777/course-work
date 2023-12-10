import { atom } from "recoil";
import { ISelectedEnterprise } from "work-types/enterprise";

export const selectedEnterprise = atom<ISelectedEnterprise>({
  key: "selectedEnterprise",
  default: {} as ISelectedEnterprise,
});
