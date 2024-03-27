const pubSubBroker = {
  currentSub: null,
  subscribers: {},
  addSubscriber: (key) => {
    if (!pubSubBroker.subscribers[key]) pubSubBroker.subscribers[key] = new Set();
    pubSubBroker.subscribers[key].add(pubSubBroker.currentSub);
  },
  notifySubscribers: (key) => {
    pubSubBroker.subscribers[key].forEach((fn) => fn());
  },
};

export const 구독 = (fn) => {
  pubSubBroker.currentSub = fn;
  fn();
  pubSubBroker.currentSub = null;
};

export const 발행기관 = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const subKey = key;

    Object.defineProperty(obj, key, {
      get() {
        if (pubSubBroker.currentSub) {
          pubSubBroker.addSubscriber(subKey);
        }
        return _value;
      },
      set(value) {
        _value = value;
        pubSubBroker.notifySubscribers(subKey);
      },
    });
  });
  return obj;
};
