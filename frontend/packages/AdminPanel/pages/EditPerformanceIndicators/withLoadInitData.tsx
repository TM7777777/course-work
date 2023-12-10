import React from "react";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import Loader from "../../../common/components/Loader";
import { performanceIndicatorsState } from "../../../common/state/performanceIndicators";

import service from "../../../service";

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
