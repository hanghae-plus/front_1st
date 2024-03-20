export function createHooks(callback) {
  let curStateKey = 0;
  let states = [];

  const useState = (initState) => {
    const key = curStateKey;

    if (curStateKey === states.length) {
      states.push(initState);
    }

    let state = states[key];

    const setState = (newState) => {
      if (state === newState) {
        return;
      }

      states[key] = newState;
      state = states[key];

      callback();
    };

    curStateKey += 1;

    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    if (curStateKey >= states.length) {
      curStateKey -= states.length;
    }
  };

  return { useState, useMemo, resetContext };
}
