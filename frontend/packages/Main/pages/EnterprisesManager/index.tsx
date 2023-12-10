import React from "react";

import Logout from "work-common/components/Logout";

import EnterpriseCreateButton from "./components/EnterpriseCreateButton";
import EnterprisesList from "./components/EnterprisesList";

import { withLoadInitData } from "./withLoadInitData";

const EnterprisesManager = () => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        paddingRight: "20px",
      }}>
      <Logout />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}>
      <EnterpriseCreateButton />
      <EnterprisesList />
    </div>
  </div>
);

export default withLoadInitData(EnterprisesManager);
