import React from "react";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import Loader from "work-common/components/Loader";
import service from "work-service";

import { usersState } from "../../state/users";

export const withLoadInitData =
  (Component: React.FC): React.FC =>
  () => {
    const [isReady, setIsReady] = useState(false);
    const setUsers = useSetRecoilState(usersState);

    useEffect(() => {
      service.getUsers().then((users) => (setUsers(users), setIsReady(true)));

      return () => {
        setIsReady(false);
      };
    }, []);

    return isReady ? <Component /> : <Loader />;
  };
