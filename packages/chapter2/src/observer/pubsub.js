let currentCallback = null;

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
  currentCallback = null;
};

export const 발행기관 = (obj) => {
  const state = {};

  Object.entries(obj).forEach(([key, value]) => {
    const observers = new Set();
    let _value = value;

    Object.defineProperty(state, key, {
      get() {
        if (currentCallback) {
          observers.add(currentCallback);
        }
        return _value;
      },

      set(value) {
        console.log(observers);
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });

  return state;
};
