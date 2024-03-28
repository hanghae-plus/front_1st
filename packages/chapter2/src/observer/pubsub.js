let currentCallback = null;

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
};

export const 발행기관 = (obj) => {
  const state = {};
  Object.keys(obj).forEach((key) => {
    let currentValue = obj[key];
    const observers = new Set();
    Object.defineProperty(state, key, {
      get() {
        if (currentCallback) {
          observers.add(currentCallback);
        }
        return currentValue;
      },
      set(value) {
        if (currentValue !== value) {
          currentValue = value;
          observers.forEach((fn) => fn());
        }
      },
    });
  });
  return state;
};
