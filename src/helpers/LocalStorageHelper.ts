export const saveState = (state: any, lsKey: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(lsKey, serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const loadState = (lsKey: string): any => {
  try {
    const serializedState = localStorage.getItem(lsKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
