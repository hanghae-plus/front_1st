export function createHooks(callback) {
  let hooks = [];
  let index = 0;

  let memoArr = [];

  function useState(initialState) {
    const localIdx = index;
    hooks[index] = hooks[index] || initialState;

    const setState = (val) => {
      if (val !== hooks[localIdx]) {
        hooks[localIdx] = val;
        callback();
      }
    };

    index++;
    return [hooks[localIdx], setState];
  }

  const resetContext = () => {
    index = 0;
  };

  const useMemo = (fn, dependencies) => {
    const key = dependencies.join("|");
    if (!memoArr[key]) {
      memoArr[key] = {
        value: fn(),
        dependencies: dependencies.slice(),
      };
    }
    return memoArr[key].value;
  };

  return { useState, useMemo, resetContext };
}
