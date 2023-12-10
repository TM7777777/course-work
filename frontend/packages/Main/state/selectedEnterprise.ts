import { atom } from "recoil";
import { ISelectedEnterprise } from "../../types/enterprise";

export const selectedEnterprise = atom<ISelectedEnterprise>({
  key: "selectedEnterprise",
  default: {} as ISelectedEnterprise,
});
