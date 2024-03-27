import { Store } from './store';

let currentFunc = null;

export const 구독 = (fn) => {
  currentFunc = fn;
  fn();
  currentFunc = null;
};
//
export const 발행기관 = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    const setFunc = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (currentFunc) setFunc.add(currentFunc);
        return value;
      },
      set(val) {
        value = val;
        setFunc.forEach((fn) => 구독(fn));
      },
    });
  });
  return obj;
};
