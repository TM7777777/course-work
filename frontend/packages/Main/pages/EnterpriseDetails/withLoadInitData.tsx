import React, { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useSetRecoilState } from "recoil";

import Loader from "../../../common/components/Loader";
import service from "../../../service";
import { selectedEnterprise } from "../../state/selectedEnterprise";
import { performanceIndicatorsState } from "../../../common/state/performanceIndicators";

export const withLoadInitData =
  (Component: React.FC): React.FC =>
  () => {
    const { enterpriseId } = useParams();
    const setSelectedEnterprise = useSetRecoilState(selectedEnterprise);
    const setPerformanceIndicators = useSetRecoilState(performanceIndicatorsState);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      if (enterpriseId) {
        Promise.all([
          service.getSelectedEnterprise(enterpriseId).then(setSelectedEnterprise),
          service.getPerformanceIndicators().then(setPerformanceIndicators),
        ]).then(() => setIsReady(true));
      }

      return () => {
        setIsReady(false);
      };
    }, [enterpriseId]);

    return isReady ? <Component /> : <Loader />;
  };
