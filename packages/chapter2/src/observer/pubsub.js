let currentCallback = null;

export const 구독 = fn => {
  currentCallback = fn;
  fn();
  currentCallback = null;
}

export const 발행기관 = obj => {
  Object.keys(obj).forEach(key => {
    let val = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentCallback) observers.add(currentCallback);
        return val;
      },

      set(value) {
        val = value;
        observers.forEach(fn => fn());
      }
    })
  })
  return obj;
}