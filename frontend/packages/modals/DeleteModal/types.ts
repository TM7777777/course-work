import { ExtendModalProps } from "recoil-modals/dist/types";

export type PureProps = {
  onDelete(): void;
  entity: string;
};

export type Props = ExtendModalProps<PureProps>;
