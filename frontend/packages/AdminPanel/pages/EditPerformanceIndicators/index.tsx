import React, { useCallback } from "react";
import { Container, Typography } from "@mui/material";

import { performanceIndicatorsState } from "../../../common/state/performanceIndicators";
import { useImRecoilState } from "../../../common/hooks/useImRecoilState";
import { IPerformanceIndicator } from "../../../types/performanceIndicator";

import { useShowModal } from "../../../modals";
import { openDeleteModal } from "../../../modals/DeleteModal";

import service from "../../../service";

import CreatePerformanceIndicator from "./components/CreatePerformanceIndicator";
import PreviewTaxForm from "./components/PreviewTaxForm";
import PerformanceIndicatorItem from "./components/PerformanceIndicatorItem";
import { withLoadInitData } from "./withLoadInitData";

const EditPerformanceIndicators = () => {
  const [indicators, setIndicators] = useImRecoilState(performanceIndicatorsState);

  const showModal = useShowModal();

  const onDelete = useCallback(
    (indicatorId: IPerformanceIndicator["indicator_id"]) =>
      showModal(
        openDeleteModal({
          onDelete: () =>
            service
              .deletePerformanceIndicator(indicatorId)
              .then(() =>
                setIndicators((indicators) =>
                  indicators.filter((ind) => ind.indicator_id !== indicatorId),
                ),
              ),
          entity: "performance indicator",
        }),
      ),
    [],
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Performance Indicators
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CreatePerformanceIndicator />
        <PreviewTaxForm />
      </div>
      {indicators.map((indicator) => (
        <PerformanceIndicatorItem
          key={indicator.indicator_id}
          indicator={indicator}
          onDelete={onDelete}
        />
      ))}
    </Container>
  );
};

export default withLoadInitData(EditPerformanceIndicators);
