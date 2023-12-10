import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { useShowModal } from "../../../../modals";
import { useImSetRecoilState } from "../../../../common/hooks/useImSetRecoilState";
import { performanceIndicatorsState } from "../../../../common/state/performanceIndicators";
import { openCreatePerformanceIndicator } from "../../../../modals/CreatePerformanceIndicatorModal";

import service from "../../../../service";
import { IPerformanceIndicator } from "../../../../types/performanceIndicator";

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
