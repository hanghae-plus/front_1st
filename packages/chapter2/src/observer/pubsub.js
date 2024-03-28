let callback = undefined;

export const 구독 = (fn) => {
  callback = fn;

  fn();

  callback = undefined;
};

export const 발행기관 = (obj) => {
  Object.entries(obj).forEach(([key, _value]) => {
    let value = _value;
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (callback) {
          observers.add(callback);
        }

        return value;
      },

      set(_value) {
        value = _value;
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};
