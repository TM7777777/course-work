import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ModalProvider } from "recoil-modals/dist/provider";
import { AuthProvider } from "work-auth/authContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </RecoilRoot>,
);
