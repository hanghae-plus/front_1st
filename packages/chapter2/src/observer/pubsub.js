let listener = {};
let currentCallback;
let store = new WeakMap();

export const 구독 = (fn) => {
  currentCallback = fn;
  return fn();
};

export const 발행기관 = (obj) => {
  const newObject = new Proxy(obj, {
    set: function (target, p, value, receiver) {
      target[p] = value;
      listener[p]?.forEach((cb) => {
        cb();
      });
      return true;
    },

    get: function (target, p, receiver) {
      if (typeof currentCallback === "function") {
        listener[p] =
          listener[p] === undefined
            ? [currentCallback]
            : new Set([...listener[p], currentCallback]);
      }
      return target[p];
    },
  });

  store.set(obj, newObject);

  return newObject;
};
