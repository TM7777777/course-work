import { ExtendModalProps } from "../index";

export type PureProps = {
  onDelete(): void;
  entity: string;
};

export type Props = ExtendModalProps<PureProps>;
