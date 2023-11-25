import { loadModal } from "../index";
import { PureProps } from "./types";

const modal = {
  id: "test-modal",
  dynamicImport: () => import("./modal" /* webpackChunkName: "TestModal" */),
};

export const openDeleteEnterprise = (props: PureProps) => loadModal<PureProps>(modal, props);
