import { createModal, loadModal } from "../index";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "EnterpriseModal" */),
);

export const openEnterpriseModal = (props: PureProps) => loadModal(modal, props);
