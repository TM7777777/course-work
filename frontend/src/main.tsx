import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ModalProvider } from "recoil-modals/dist/provider";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <ModalProvider>
      <App />
    </ModalProvider>
  </RecoilRoot>,
);
