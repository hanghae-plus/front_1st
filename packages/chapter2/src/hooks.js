export function createHooks(callback) {
  const stateContext = {
    current: 0,
    states: [],
  };

  const memoContext = {
    current: 0,
    memos: [],
  };

  const useState = (initState) => {
    const { current, states } = stateContext;

    states[current] = states[current] ?? initState;

    const setState = (newValue) => {
      if (newValue === states[current]) return;
      states[current] = newValue;
      callback();
    };

    stateContext.current += 1;
    return [states[current], setState];
  };

  const useMemo = (fn, refs) => {
    const { current, memos } = memoContext;
    memoContext.current += 1;

    const memo = memos[current];

    const resetAndReturn = () => {
      const value = fn();

      memos[current] = {
        value,
        refs,
      };
      return value;
    };

    if (!memo) {
      return resetAndReturn();
    }

    if (refs.length > 0 && memo.refs.find((v, k) => v !== refs[k])) {
      return resetAndReturn();
    }

    return memo.value;
  };

  const resetContext = () => {
    stateContext.current = 0;
    memoContext.current = 0;
  };

  return { useState, useMemo, resetContext };
}
