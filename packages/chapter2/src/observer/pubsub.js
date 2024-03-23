const _propsObservers = {};
let _currentCallback;

export const 구독 = (fn) => {
  _currentCallback = fn;
  fn();
  _currentCallback = null;
};

export const 발행기관 = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      if (_currentCallback) {
        _propsObservers[prop] ??= [];
        _propsObservers[prop].push(_currentCallback);
      }
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      _propsObservers[prop].forEach((fn) => fn());
      return true;
    },
  });
};
