import React, { useCallback } from "react";
import { Button } from "@mui/material";

import { IEnterprise } from "work-types/enterprise";
import { useShowModal } from "recoil-modals/dist/tools";
import { openEnterpriseModal } from "work-modals/EnterpriseModal";
import { useImSetRecoilState } from "work-common/hooks/useImSetRecoilState";
import service from "work-service";

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
