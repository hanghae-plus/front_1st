let observe = null;

export const 구독 = (fn) => {
  observe = fn;
  fn();
  observe = null;
};

export const 발행기관 = (obj) => {
  Object.keys(obj).forEach((key) => {
    let values = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (observe) observers.add(observe);
        return values;
      },

      set(value) {
        values = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};
