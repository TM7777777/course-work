import { createModal, loadModal } from "../index";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "TaxFormModal" */),
);

export const openTaxForm = (props: PureProps) => loadModal(modal, props);
