import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import Loader from "work-common/components/Loader";
import service from "work-service";

import { enterprisesState } from "../../state/enterprises";
import { enterprisesTotalIncomeState } from "../../state/enterprisesTotalIncome";

export const withLoadInitData =
  (Component: React.FC): React.FC =>
  () => {
    const [isReady, setIsReady] = useState(false);
    const setEnterprises = useSetRecoilState(enterprisesState);
    const setEnterprisesTotalIncome = useSetRecoilState(enterprisesTotalIncomeState);

    useEffect(() => {
      Promise.all([
        service.getEnterprises().then(setEnterprises),
        service.getEnterpriseTotalIncome().then(setEnterprisesTotalIncome),
      ]).then(() => setIsReady(true));

      return () => {
        setIsReady(false);
      };
    }, []);

    return isReady ? <Component /> : <Loader />;
  };
