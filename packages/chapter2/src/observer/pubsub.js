export const 구독 = (fn) => {
  등록중 = fn;
  구독자들.set(fn, new Set());
  fn();
  등록중 = undefined;
};
let 등록중;
const 구독자들 = new Map();

export const 발행기관 = (obj) => {
  const proxy = new Proxy(obj, {
    get: function (target, property) {
      if (typeof property === "symbol") {
        return undefined;
      }
      if (등록중) {
        구독자들.get(등록중).add(property);
      }
      return target[property];
    },
    set: function (target, property, value) {
      if (typeof property === "symbol") {
        return false;
      }
      target[property] = value;
      구독자들.forEach((바라보는프로퍼티셋, 구독자) => {
        if (바라보는프로퍼티셋.has(property)) {
          구독자();
        }
      });
      return true;
    },
  });
  return proxy;
};
