import { RecoilState, useRecoilState } from "recoil";
import { produce } from "immer";
import isFunction from "lodash/isFunction";
import ifElse from "ramda/src/ifElse";
import { DraftProp, StateProp } from "work-types/recoil";

/**
 * Hook that allows you to mutate the previous state because of immer
 * and returns current value
 * This hook is the same as the useRecoilState, but it uses a mutated approach
 * @param recoilState - it is an initial state
 * @returns {[state, setState]} Returns a tuple where the first element is
 * the value of the recoil state and the second is a setter to update that state
 */
export const useImRecoilState = <T>(recoilState: RecoilState<T>): [T, StateProp<T>] => {
  const [state, setInitState] = useRecoilState(recoilState);

  const setState: StateProp<T> = ifElse(
    isFunction,
    (draft: DraftProp<T>) => setInitState((state) => produce(state, draft)),
    setInitState,
  );

  return [state, setState];
};
