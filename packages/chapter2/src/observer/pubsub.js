export const 구독 = (fn) => {
  handler.message = fn;
  fn();
};

export const 발행기관 = (obj) => {
  return new Proxy(obj, handler);
};

const handler = {
  message: undefined,
  subscription: {},

  get(target, prop, receiver) {
    if (!this.subscription[prop]) {
      this.subscription[prop] = [];
    }
    const cb = this.message;
    if (!this.subscription[prop].includes(cb)) {
      this.subscription[prop].push(cb);
    }

    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    Reflect.set(...arguments);

    this.subscription[prop].forEach((fn) => fn());

    return receiver;
  },
};
