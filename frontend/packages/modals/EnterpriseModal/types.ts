import { ExtendModalProps } from "recoil-modals/dist/types";
import { IEnterprise } from "work-types/enterprise";

export type PureProps = {
  onSubmit(enterprise: Omit<IEnterprise, "enterprise_id">): Promise<void>;
  title: string;
  initialValues?: {
    name: string;
    details: string;
    phone: string;
    contact_person: string;
  };
};

export type Props = ExtendModalProps<PureProps>;
