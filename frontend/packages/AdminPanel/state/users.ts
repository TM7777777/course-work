import { atom } from "recoil";
import { IUser } from "../../types/user";

export const usersState = atom<IUser[]>({
  key: "usersState",
  default: [],
});
