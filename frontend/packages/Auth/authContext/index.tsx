import React, { createContext, useContext, useMemo, useState } from "react";
import { load } from "work-common/utils/localStorage";
import { IUser } from "work-types";

type UserData = Pick<IUser, "role" | "email">;

type Context = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const AuthContext = createContext<Context | null>(null);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>(() => load("user"));

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth used outside the AuthContext Provider");

  return context;
};

export { AuthProvider, useAuth };
