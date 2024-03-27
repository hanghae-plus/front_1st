export const 구독 = (fn) => {
  subscriber = fn;
  fn();
};

export const 발행기관 = (obj) => {
  const observers = new Map();

  const state = new Proxy(obj, {
    set(target, key, value) {
      target[key] = value;
      notifyStateChanged(key);
      return true;
    },
    get(target, key) {
      if (!observers.has(key)) {
        observers.set(key, new Set());
      }
      if (subscriber !== null && !observers.get(key).has(subscriber)) {
        observers.get(key).add(subscriber);
      }
      return target[key];
    },
  });

  const notifyStateChanged = (key) => {
    observers.get(key).forEach((fn) => fn());
  };
  return state;
};

let subscriber = null;
