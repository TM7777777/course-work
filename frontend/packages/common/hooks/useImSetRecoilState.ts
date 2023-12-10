import { RecoilState, useSetRecoilState } from "recoil";
import { produce } from "immer";
import isFunction from "lodash/isFunction";
import ifElse from "ramda/src/ifElse";
import { DraftProp, StateProp } from "../../types/recoil";

/**
 * Hook that allows you to mutate the previous state because of immer
 * This hook is the same as the useSetRecoilState, but it uses a mutated approach
 * @param recoilState - it is an initial state
 * @returns {setState} Returns a is a setter to update that state
 */

export const useImSetRecoilState = <T>(recoilState: RecoilState<T>) => {
  const setInitState = useSetRecoilState(recoilState);

  const setState: StateProp<T> = ifElse(
    isFunction,
    (draft: DraftProp<T>) => setInitState((state) => produce(state, draft)),
    setInitState,
  );

  return setState;
};
