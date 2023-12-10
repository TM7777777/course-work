import { atom } from "recoil";
import { IUser } from "work-types/user";

export const usersState = atom<IUser[]>({
  key: "usersState",
  default: [],
});
