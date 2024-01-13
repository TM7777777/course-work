import { createModal, loadModal } from "recoil-modals/dist/tools";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "TaxFormModal" */),
);

export const openTaxForm = (props: PureProps) => loadModal(modal, props);
