export function createHooks(callback) {
  const stateContext = {
    current: 0,
    states: [],
  };

  const memoContext = {
    current: 0,
    memos: [],
  };

  function resetContext() {
    stateContext.current = 0;
    memoContext.current = 0;
  }

  const useState = (initState) => {
    const { current, states } = stateContext;
    stateContext.current += 1;
    let rafId = -1;

    states[current] = states[current] ?? initState;

    const setState = (newState) => {
      if (newState === states[current]) return; // 현재 상태와 동일한지 체크
      states[current] = newState; // 상태 업데이트
      cancelAnimationFrame(rafId); // 이전에 예약된 callback 취소
      rafId = requestAnimationFrame(callback); // 새로운 상태로 callback 호출 예약
    };

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

  return { useState, useMemo, resetContext };
}
