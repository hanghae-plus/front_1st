let currentCallback = null;
const observer = {};

export const 구독 = fn => {
  currentCallback = fn;
  fn();
  currentCallback = null;
}

export const 발행기관 = obj => 
  new Proxy(obj, {
    get (target, name) {
      observer[name] = observer[name] || new Set();
      if (currentCallback) observer[name].add(currentCallback)
      return target[name];
    },
    set (target, name, value) {
      if (target[name] === value) return true;
      if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;
      target[name] = value;
      observer[name].forEach(fn => fn());
      return true;
    },
  });