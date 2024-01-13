import React, { useCallback } from "react";
import { Button } from "@mui/material";

import { useShowModal } from "recoil-modals/dist/tools";
import { useImSetRecoilState } from "work-common/hooks/useImSetRecoilState";
import { performanceIndicatorsState } from "work-common/state/performanceIndicators";
import { openCreatePerformanceIndicator } from "work-modals/CreatePerformanceIndicatorModal";
import { IPerformanceIndicator } from "work-types/performanceIndicator";
import service from "work-service";

const CreatePerformanceIndicator = () => {
  const showModal = useShowModal();

  const setPerformanceIndicators = useImSetRecoilState(performanceIndicatorsState);

  const onSubmit = useCallback(
    (indicator: Omit<IPerformanceIndicator, "indicator_id">) =>
      service.createPerformanceIndicator(indicator).then((ind) =>
        setPerformanceIndicators((previousArray) => {
          previousArray.unshift(ind);
        }),
      ),
    [],
  );

  const onClick = useCallback(() => {
    showModal(openCreatePerformanceIndicator({ onSubmit }));
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Button variant="contained" onClick={onClick}>
        Create Performance Indicator
      </Button>
    </div>
  );
};

export default CreatePerformanceIndicator;
