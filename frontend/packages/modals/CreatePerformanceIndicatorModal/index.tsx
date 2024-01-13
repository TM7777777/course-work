import { createModal, loadModal } from "recoil-modals/dist/tools";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "CreatePerformanceIndicatorModal" */),
);

export const openCreatePerformanceIndicator = (props: PureProps) => loadModal(modal, props);
