import { createModal, loadModal } from "../index";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "CreatePerformanceIndicatorModal" */),
);

export const openCreatePerformanceIndicator = (props: PureProps) => loadModal(modal, props);
