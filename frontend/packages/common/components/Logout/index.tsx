import React from "react";
import Button from "@mui/material/Button";
import { useLocation } from "wouter";

interface Props {
  logout: () => Promise<void>;
}

const Logout = ({ logout }: Props) => {
  const [_, navigate] = useLocation();

  const handleLogout = () =>
    logout().then(
      () => (
        localStorage.removeItem("accessToken"), localStorage.removeItem("user"), navigate("/login")
      ),
    );

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
