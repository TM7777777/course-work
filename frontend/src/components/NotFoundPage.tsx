import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { Role } from "work-types";

const mainPages = {
  [Role.USER]: "/enterprises",
  [Role.ADMIN]: "/users-panel",
};

interface Props {
  role?: Role | null;
}

const NotFoundPage = ({ role }: Props) => {
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (role !== null) {
      navigate(role ? mainPages[role] : "/login");
    }
  }, [role, location]);

  return <></>;
};

export default NotFoundPage;
