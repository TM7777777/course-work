import React, { useCallback } from "react";
import { useParams } from "wouter";
import { useRecoilValue } from "recoil";
import { Button } from "@mui/material";

import { useShowModal } from "work-modals";
import { openTaxForm } from "work-modals/TaxFormModal";
import { useImSetRecoilState } from "work-common/hooks/useImSetRecoilState";
import { performanceIndicatorsState } from "work-common/state/performanceIndicators";
import service from "work-service";

import { selectedEnterprise } from "../../../../state/selectedEnterprise";

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
