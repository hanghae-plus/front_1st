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
    let animation;
    
    stateContext.current += 1;

    states[current] = states[current] ?? initState;

    const setState = (newState) => {
      
      // 이전에 등록된 이벤트가 있으면 취소한다. -> 연속으로 호출되면 마지막꺼만 실행
      cancelAnimationFrame(animation);

      if (newState === states[current]) return;
      
      // Animation 큐에 이벤트 등록 
      animation = requestAnimationFrame(() => {      
        states[current] = newState;
        callback();
      }); 
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
