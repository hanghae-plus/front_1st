const observers = {};
let currentCallback = null;
export const 구독 = fn => {
  currentCallback = fn;
  fn();
  currentCallback = null;
}

export const 발행기관 = obj => {
  const state = obj;
  const handler = {
    get(target, prop, receiver) {
      if (currentCallback !== null) {
        if(Array.isArray(observers[prop])) observers[prop].push(currentCallback);
        else observers[prop] = [currentCallback];
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, val, receiver) {
      const res = Reflect.set(target, prop, val, receiver);
      if (Array.isArray(observers[prop])) observers[prop].forEach((fn) => fn());
      return res;
    }
  }
  return new Proxy(state, handler);
}
