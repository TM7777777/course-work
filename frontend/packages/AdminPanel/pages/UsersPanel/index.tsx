import React from "react";
import Logout from "work-common/components/Logout";
import service from "work-service";
import UsersList from "./components/UserList";
import EditPerformanceIndicatorsButton from "./components/EditPerformanceIndicatorsButton";

import { withLoadInitData } from "./withLoadInitData";

const UsersPanel = () => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        paddingRight: "20px",
        marginTop: "20px",
      }}>
      <EditPerformanceIndicatorsButton />
      <Logout logout={() => service.logout()} />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}>
      <UsersList />
    </div>
  </div>
);

export default withLoadInitData(UsersPanel);
