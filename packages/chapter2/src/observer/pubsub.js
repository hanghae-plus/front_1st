export const 구독 = (fn) => {
  fn();
};

export const 발행기관 = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      _propsObservers[prop] ??= [];
      if (
        _currentCallback &&
        !_propsObservers[prop].includes(_currentCallback)
      ) {
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
