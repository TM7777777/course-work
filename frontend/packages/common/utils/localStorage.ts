export const save = <T>(name: string, value: T) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(name, serializedState);
  } catch (error) {
    // ignore write errors
  }
};

export const load = (item: string) => {
  try {
    const serializedState = localStorage.getItem(item);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
