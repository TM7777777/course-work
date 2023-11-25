import { ExtendModalProps } from "..";

export type PureProps = {
  onDelete(): void;
};

export type Props = ExtendModalProps<PureProps>;
