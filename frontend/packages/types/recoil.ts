export type DraftProp<T> = (draft: T) => void;
export type StateProp<T> = (valOrUpdater: DraftProp<T>) => void;
