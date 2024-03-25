
export function createHooks(callback) {
  const stateContext = {
    current: 0,
    states: [],
    nextRender: null, // 다음 렌더링 요청을 저장할 변수 추가
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

    states[current] = states[current] ?? initState;

    const setState = (newState) => {
      if (newState === states[current]) return;
      states[current] = newState;

      // 이전 요청이 있으면 취소
      cancelAnimationFrame(stateContext.nextRender);

      // requestAnimationFrame(callback);
           // 다음 프레임에서 렌더링 요청
           stateContext.nextRender = requestAnimationFrame(() => {
            callback();
            stateContext.nextRender = null; // 다음 렌더링 요청 초기화
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
