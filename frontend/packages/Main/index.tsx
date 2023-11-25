import React from "react";
import EnterpriseCreateButton from "./components/EnterpriseCreateButton";
import EnterprisesList from "./components/EnterprisesList";

const EnterprisesManager = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <EnterpriseCreateButton />
      <EnterprisesList />
    </div>
  );
};

export default EnterprisesManager;
