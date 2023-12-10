import { Role } from "./role";

export interface IUser {
  user_id: string;
  email: string;
  role: Role;
  created_at: Date;
}
