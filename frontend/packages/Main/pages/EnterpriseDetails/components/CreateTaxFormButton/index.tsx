import React, { useCallback } from "react";
import { useParams } from "wouter";
import { useRecoilValue } from "recoil";
import { Button } from "@mui/material";

import service from "../../../../../service";

import { openTaxForm } from "../../../../../modals/TaxFormModal";
import { useShowModal } from "../../../../../modals";
import { selectedEnterprise } from "../../../../state/selectedEnterprise";
import { useImSetRecoilState } from "../../../../../common/hooks/useImSetRecoilState";

import { performanceIndicatorsState } from "../../../../../common/state/performanceIndicators";

const TaxFormCreateButton = () => {
  const { enterpriseId } = useParams();
  const showModal = useShowModal();
  const setSelectedEnterprise = useImSetRecoilState(selectedEnterprise);
  const performanceIndicators = useRecoilValue(performanceIndicatorsState);

  const openTaxFormModal = useCallback(
    () =>
      showModal(
        openTaxForm({
          onSubmit: (values) => {
            if (enterpriseId) {
              return service
                .createReport({ ...values, enterprise_id: enterpriseId })
                .then((report) =>
                  setSelectedEnterprise((enterprise) => {
                    enterprise.reports.unshift(report);
                  }),
                );
            }

            return Promise.resolve();
          },
          performanceIndicators,
        }),
      ),
    [performanceIndicators, setSelectedEnterprise],
  );

  return (
    <div>
      <Button variant="contained" onClick={openTaxFormModal}>
        Create Tax Form
      </Button>
    </div>
  );
};

export default TaxFormCreateButton;
