import React from "react";
import Button from "@mui/material/Button";
import { useLocation } from "wouter";
import Cookies from "js-cookie";

const Logout = () => {
  const [_, navigate] = useLocation();

  const handleLogout = () => {
    Cookies.remove("user_id");
    Cookies.remove("role");

    navigate("/login");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
