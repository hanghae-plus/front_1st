let currentCallback = null;

export const 구독 = (fn) => {
  currentCallback = fn;

  fn();

  currentCallback = null;
};

export const 발행기관 = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (currentCallback) {
          observers.add(currentCallback);
        }

        return value;
      },

      set(newValue) {
        value = newValue;
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};
