const observers = [];
let currentCallback = null;
export const 구독 = fn => {
  currentCallback = fn;
  fn();
}

export const 발행기관 = obj => {
  const state = obj;
  const handler = {
    get(target, prop, receiver) {
      let observerData = observers.filter((observer) => observer.fn === currentCallback)[0];
      if (observerData === undefined) {
        observerData = {fn : currentCallback, sub : new Set()};
        observers.push(observerData);
      }
      observerData.sub.add(prop);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, val, receiver) {
      const res = Reflect.set(target, prop, val, receiver);
      observers.forEach((observer) => {
        if (observer.sub.has(prop)) observer.fn();
      });
      return res;
    }
  }
  return new Proxy(state, handler);
}
