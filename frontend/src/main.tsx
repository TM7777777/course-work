import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ModalProvider } from "recoil-modals/dist/provider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ModalProvider>
        <App />
      </ModalProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
