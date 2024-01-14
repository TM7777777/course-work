import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";

import { useShowModal } from "recoil-modals/dist/tools";
import { openTaxForm } from "work-modals/TaxFormModal";
import { performanceIndicatorsState } from "work-common/state/performanceIndicators";

const PreviewTaxForm = () => {
  const showModal = useShowModal();
  const performanceIndicators = useRecoilValue(performanceIndicatorsState);

  const onClick = useCallback(() => {
    showModal(
      openTaxForm({
        onSubmit: () => Promise.resolve(),
        performanceIndicators,
      }),
    );
  }, [showModal, performanceIndicators]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Button variant="contained" onClick={onClick}>
        Preview Tax Form
      </Button>
    </div>
  );
};

export default PreviewTaxForm;
