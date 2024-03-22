export function createHooks(callback) {
  let hooks = [];
  let index = 0;

  function useState(initialState) {
    const state = hooks[index] || initialState;
    const localIdx = index;

    const setState = (val) => {
      if (val !== hooks[localIdx]) {
        hooks[localIdx] = val;
        resetContext();
      }
    };

    index++;
    return [state, setState];
  }

  const resetContext = () => {
    index = 0;
    callback();
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  return { useState, useMemo, resetContext };
}
