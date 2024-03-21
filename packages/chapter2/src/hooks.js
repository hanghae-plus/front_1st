import {render} from "./render.js";


export function createHooks(callback) {
  let states = [];
  let currentIndex = 0;
  const useState = (initState) => {
    const key = currentIndex;
    if (states.length === key) states.push(initState);
    const state = states[key];

    const setState = (newState) => {
      if (!Object.is(state, newState)) {
        states[key] = newState;
        render()
      }
    };



    currentIndex++;
    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    const key = currentIndex;
    const [prevDeps, prevValue] = states[key] || [];

    let hasChanged = true;
    let value = prevValue;

    if (prevDeps) {
      hasChanged = refs.some((ref, i) => !Object.is(ref, prevDeps[i]));
    }

    if (hasChanged) {
      value = fn();
      states[key] = [refs, value];
    }

    currentIndex++;

    return value;
  };

  const resetContext = () => {
    states = [];
    currentIndex = 0;
  }

  return { useState, useMemo, resetContext };
}