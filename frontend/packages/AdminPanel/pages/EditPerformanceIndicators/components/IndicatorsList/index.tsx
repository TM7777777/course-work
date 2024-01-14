import React, { useCallback, memo } from "react";
import { Virtuoso } from "react-virtuoso";

import { IPerformanceIndicator } from "work-types/performanceIndicator";
import { performanceIndicatorsState } from "work-common/state/performanceIndicators";
import { useImRecoilState } from "work-common/hooks/useImRecoilState";
import { useShowModal } from "recoil-modals/dist/tools";
import { openDeleteModal } from "work-modals/DeleteModal";
import service from "work-service";

import PerformanceIndicatorItem from "../PerformanceIndicatorItem";

const vitruosoStyle = { height: "80vh", width: "80vw" };

const IndicatorsList = () => {
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
    [showModal],
  );

  const renderItem = useCallback(
    (index: number, indicator = indicators[index]) => (
      <PerformanceIndicatorItem
        key={indicator.indicator_id}
        indicator={indicator}
        onDelete={onDelete}
      />
    ),
    [indicators, onDelete],
  );

  return <Virtuoso style={vitruosoStyle} totalCount={indicators.length} itemContent={renderItem} />;
};

export default memo(IndicatorsList);
