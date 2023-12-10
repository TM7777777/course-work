import React, { useCallback } from "react";
import { Button } from "@mui/material";

import { IEnterprise } from "../../../../../types/enterprise";
import service from "../../../../../service";

import { useShowModal } from "../../../../../modals";
import { openEnterpriseModal } from "../../../../../modals/EnterpriseModal";
import { useImSetRecoilState } from "../../../../../common/hooks/useImSetRecoilState";

import { enterprisesState } from "../../../../state/enterprises";

const EnterpriseCreateButton = () => {
  const showModal = useShowModal();

  const setEnterprises = useImSetRecoilState(enterprisesState);

  const onSubmit = useCallback(
    (enterprise: Omit<IEnterprise, "enterprise_id">) =>
      service.createEnterprise(enterprise).then((enterprise) =>
        setEnterprises((previousArray) => {
          previousArray.unshift(enterprise);
        }),
      ),
    [],
  );

  const onClick = useCallback(() => {
    showModal(openEnterpriseModal({ onSubmit, title: "New Enterprise" }));
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={onClick}>
        Create Enterprise
      </Button>
    </div>
  );
};

export default EnterpriseCreateButton;
