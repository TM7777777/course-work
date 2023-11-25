import React from "react";

const Auth = {
  Login: React.lazy(() => import("./pages/Login")),
  SignUp: React.lazy(() => import("./pages/SignUp")),
};

export default Auth;
