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

  return { useState, useMemo, resetContext };
}
