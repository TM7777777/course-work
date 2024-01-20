import React from "react";
import { Router, Route, Switch } from "wouter";

import AdminPanel from "work-adminpanel";
import Auth from "work-auth";
import Main from "work-main";
import wrapDynamicImport from "work-common/hocs/wrapDynamicImport";
import { Role } from "work-types";
import { useAuth } from "work-auth/authContext";

import NotFoundPage from "./components/NotFoundPage";

const panels = {
  [Role.USER]: (
    <>
      <Route path="/enterprises" component={() => wrapDynamicImport(Main.EnterprisesManager)} />
      <Route
        path="/enterprise/:enterpriseId"
        component={() => wrapDynamicImport(Main.EnterpriseDetails)}
      />
    </>
  ),
  [Role.ADMIN]: (
    <>
      <Route path="/users-panel" component={() => wrapDynamicImport(AdminPanel.UserPanel)} />
      <Route
        path="/edit-performance-indicators"
        component={() => wrapDynamicImport(AdminPanel.EditPerformanceIndicators)}
      />
    </>
  ),
};

const logPanel = (
  <>
    <Route path="/login" component={() => wrapDynamicImport(Auth.Login)} />
    <Route path="/register" component={() => wrapDynamicImport(Auth.SignUp)} />
  </>
);

const App: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Router>
      <Switch>
        {role ? panels[role] : logPanel}
        <Route path="/:rest*" component={() => <NotFoundPage role={role} />} />
      </Switch>
    </Router>
  );
};

export default App;
