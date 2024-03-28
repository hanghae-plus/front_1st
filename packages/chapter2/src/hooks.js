export function createHooks(callback) {
<<<<<<< HEAD
  let states = [];
  let memoizedStates = []; // 메모이제이션된 상태를 별도로 관리
  let currentIdx = 0; // 다음 상태를 추가할 위치(index)

  const useState = (initState) => {
    const state = states[currentIdx] !== undefined ? states[currentIdx] : initState;
    const _idx = currentIdx;

    const setState = (newValue) => {
      if (states[_idx] !== newValue) {
        states[_idx] = newValue;
        resetContext(); // 상태 변경 전에 currentIdx를 초기화
        callback(); // 이 부분에서 컴포넌트를 다시 렌더링
      }
    }
    
    currentIdx++;
    return [state, setState];
  };

  const useMemo = (fn, deps) => {
    const memo = memoizedStates[currentIdx];
    
    if (memo && deps.every((dep, index) => dep === memo.deps[index])) {
      currentIdx++;
      return memo.value;
    }

    const newValue = fn();
    memoizedStates[currentIdx] = { value: newValue, deps };
    
    currentIdx++;

    return newValue;
  };

  const resetContext = () => {
    currentIdx = 0;
  }

=======
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

    states[current] = states[current] ?? initState;

    const setState = (newState) => {
      if (newState === states[current]) return;
      states[current] = newState;
      callback();
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

>>>>>>> be31ebdebbd8b227126c3f96997b03ea174ce2fb
  return { useState, useMemo, resetContext };
}
