import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useLocation } from "wouter";

import { IUser } from "work-types/user";

export const useIsLogged = () => {
  const [role, setRole] = useState<IUser["role"] | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const cookieRole = cookies.get("role") as IUser["role"];

    setRole(cookieRole);
  }, [location]);

  return role;
};
