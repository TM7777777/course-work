import { createModal, loadModal } from "../index";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "DeleteeModal" */),
);

export const openDeleteModal = (props: PureProps) => loadModal(modal, props);
