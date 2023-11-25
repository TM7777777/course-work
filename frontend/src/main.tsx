import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ModalProvider } from "../packages/modals";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <>
        <ModalProvider />
        <App />
      </>
    </RecoilRoot>
  </React.StrictMode>,
);
