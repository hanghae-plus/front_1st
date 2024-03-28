let currentAccessedProperties = new Set();
let subscribers = {};

export const 구독 = (fn) => {
  // 현재 접근하는 프로퍼티를 초기화
  currentAccessedProperties = new Set();
  // 함수 실행하여 어떤 프로퍼티에 접근하는지 감지
  fn();
  // 감지된 프로퍼티별로 구독자 추가
  currentAccessedProperties.forEach(prop => {
    if (!subscribers[prop]) subscribers[prop] = [];
    subscribers[prop].push(fn);
  });
};

export const 발행기관 = (obj) => {
    get(target, property, receiver) {
      // 프로퍼티 접근 감지
      if (typeof target[property] !== 'function') {
        currentAccessedProperties.add(property);
      }
      return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
      const result = Reflect.set(...arguments);
      // 해당 프로퍼티의 구독자에게 변경 사실 알림
      if (subscribers[property]) {
        subscribers[property].forEach(fn => fn());
      }
      return result;
    }
  });
  return proxy;
};