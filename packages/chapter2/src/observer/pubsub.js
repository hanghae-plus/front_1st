let currentCallback = null;
export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
  currentCallback = null;
};

export const 발행기관 = (obj) => {
  const state = {};

  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const 구독자들 = new Set();

    Object.defineProperty(state, key, {
      get() {
        currentCallback && 구독자들.add(currentCallback);
        return _value;
      },
      set(value) {
        _value = value;
        구독자들.forEach((fn) => fn());
      },
    });
  });

  return state;
};
