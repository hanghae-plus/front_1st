let currentCallback = null;
let callbackStack = {};

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
};

export const 발행기관 = (obj) => {
  const state = {};
  for (const key of Object.keys(obj)) {
    Object.defineProperty(state, key, {
      get() {
        callbackStack[key] = callbackStack[key] || new Set();
        callbackStack[key].add(currentCallback);

        return obj[key];
      },
      set(newVal) {
        obj[key] = newVal;
        console.log(callbackStack[key]);
        callbackStack[key].forEach((cb) => {
          cb();
        });
      },
    });
  }
  return state;
};
