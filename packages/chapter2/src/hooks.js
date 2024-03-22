export function createHooks(callback) {
  let hooksKey = 0;
  let hooks = [];

  const useState = (initState) => {
    const key = hooksKey;

    if (hooks[key] === undefined) {
      hooks[key] = initState;
    }

    const setState = (newState) => {
      if (hooks[key] === newState) {
        return;
      }

      hooks[key] = newState;

      callback();
    };

    hooksKey += 1;

    return [hooks[key], setState];
  };

  const useEffect = (fn, refs) => {
    // TODO: useEffect 구현 해보기
    const key = hooksKey;

    if (hooks[key] === undefined) {
      hooks[key] = refs;
      fn();
    } else {
      let hasChanged = false;
    }
  };

  const useMemo = (fn, refs) => {
    const key = hooksKey;

    if (hooks[key] === undefined) {
      hooks[key] = {
        value: fn(),
        dependencies: refs,
      };
    } else {
      let hasChanged = false;
      const oldDependencies = hooks[key].dependencies;

      refs.forEach((dep, index) => {
        const areTheSame = Object.is(dep, oldDependencies[index]);
        if (!areTheSame) {
          hasChanged = true;
        }
      });

      if (hasChanged) {
        hooks[key] = {
          value: fn(),
          dependencies: refs,
        };
      }
    }

    hooksKey += 1;

    return hooks[key];
  };

  const resetContext = () => {
    hooksKey = 0;
  };

  const initContext = () => {
    hooksKey = 0;
    hooks = [];
  };

  return { useState, useMemo, resetContext, initContext };
}
