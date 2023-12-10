import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import Loader from "work-common/components/Loader";
import { performanceIndicatorsState } from "work-common/state/performanceIndicators";
import service from "work-service";

export const withLoadInitData =
  (Component: React.FC): React.FC =>
  () => {
    const [isReady, setIsReady] = useState(false);
    const setPerformanceIndicators = useSetRecoilState(performanceIndicatorsState);

    useEffect(() => {
      service
        .getPerformanceIndicators()
        .then(setPerformanceIndicators)
        .then(() => setIsReady(true));

      return () => {
        setIsReady(false);
      };
    }, []);

    return isReady ? <Component /> : <Loader />;
  };
