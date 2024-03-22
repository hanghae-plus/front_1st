export function createHooks(callback) {
  const states = [];
  let statesIndex = 0;

  const memos = [];
  let memosIndex = 0;

  const useState = (initState) => {
    const currentIndex = statesIndex;

    if (states[currentIndex] === undefined) {
      states[currentIndex] = initState;
    }

    const setState = (newState) => {
      if (states[currentIndex] === newState) return;

      states[currentIndex] = newState;
      resetContext();

      return callback();
    };

    statesIndex += 1;

    return [states[currentIndex], setState];
  };

  const useMemo = (fn, deps) => {
    const currentIndex = memosIndex;
    const hasChanged =
      memos[currentIndex] === undefined ||
      !isEqualTwoArrays(memos[currentIndex].deps, deps);

    if (hasChanged) {
      const newValue = fn();
      memos[currentIndex] = { deps, value: newValue };
      memosIndex += 1;

      return newValue;
    } else {
      memosIndex += 1;

      return memos[currentIndex].value;
    }
  };

  const resetContext = () => {
    statesIndex = 0;
    memosIndex = 0;
  };

  const isEqualTwoArrays = (arr1, arr2) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  };

  return { useState, useMemo, resetContext };
}
