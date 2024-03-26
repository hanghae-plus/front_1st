let subscribeFn;
const subscriber = {};

export const 구독 = (fn) => {
  subscribeFn = fn;
  fn();
};

export const 발행기관 = (obj) => {
  const proxyObj = new Proxy(obj, {
    get(target, prop) {
      if (!(prop in target)) throw new Error("존재하지 않는 프로퍼티 입니다.");

      if (subscribeFn) subscriber[prop] = new Set([...(subscriber[prop] ?? []), subscribeFn]);
      return target[prop];
    },
    set(target, prop, value) {
      if (!(prop in target)) return false;

      target[prop] = value;
      subscriber[prop].forEach((fn) => fn());
      return true;
    },
  });
  return proxyObj;
};
