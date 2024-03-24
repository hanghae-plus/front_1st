export function createHooks(callback) {
    let hooksKey = 0;
    let hooks = [];
    let effects = [];

    const useState = (initState) => {
        const key = hooksKey;

        if (hooks[key] === undefined) {
            hooks[key] = initState;
        }

        const setState = (newState) => {
            if (hooks[key] === newState) return;

            hooks[key] = newState;

            cancelAnimationFrame();
            requestAnimationFrame(() => {
                callback();
            });
        };

        hooksKey += 1;

        return [hooks[key], setState];
    };

    const useEffect = (fn, refs) => {
        // TODO: useEffect 구현 해보기
        const key = hooksKey;

        if (hooks[key] === undefined) {
            hooks[key] = refs;
            effects.push(fn);
        } else {
            const oldDependencies = hooks[key];
            if (depIsChanged(oldDependencies, refs)) {
                hooks[key] = refs;
                effects.push(fn);
            }
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
            const oldDependencies = hooks[key].dependencies;

            if (depIsChanged(oldDependencies, refs)) {
                hooks[key] = {
                    value: fn(),
                    dependencies: refs,
                };
            }

        }

        hooksKey += 1;

        return hooks[key];
    };

    const executeAllEffects = () => {
        effects.forEach((effect) => effect());
    }

    const resetContext = () => {
        hooksKey = 0;
    };

    const initContext = () => {
        hooksKey = 0;
        hooks = [];
    };

    const depIsChanged = (old, refs) => {
        let hasChanged = false;

        refs.forEach((dep, index) => {
            const areTheSame = Object.is(dep, old[index]);
            if (!areTheSame) {
                hasChanged = true;
            }
        });
        return hasChanged
    }

    return {useState, useMemo, useEffect, executeAllEffects, resetContext, initContext};
}