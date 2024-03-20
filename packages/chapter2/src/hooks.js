export function createHooks(callback) {
  let hooksKey = 0;
  let hooks = [];

  const useState = (initState) => {
    const key = hooksKey;
    console.log("useState is call and key is", key);

    if (hooks[key] === undefined) {
      hooks[key] = initState;
    }

    const setState = (newState) => {
      if (hooks[key] === newState) {
        return;
      }

      console.log("setState is called and key is: ", key);

      hooks[key] = newState;

      console.log("state is changed and value is: ", hooks[key]);

      callback();
    };

    hooksKey += 1;

    console.log("value returned from useState is: ", hooks[key]);

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
