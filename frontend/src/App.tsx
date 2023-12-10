import React from "react";
import { Router, Route, Switch } from "wouter";

import AdminPanel from "../packages/AdminPanel";
import Auth from "../packages/Auth";
import Main from "../packages/Main";

import wrapDynamicImport from "../packages/common/hocs/wrapDynamicImport";
import { Role } from "../packages/types/role";

import NotFoundPage from "./components/NotFoundPage";

import { useIsLogged } from "./useIsLogged";

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
  const role = useIsLogged();

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
