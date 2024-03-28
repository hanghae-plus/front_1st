let currentObserver = null;

export const 구독 = (fn) => {
  currentObserver = fn;
  fn();
};

export const 발행기관 = (obj) => {
  const observers = new Map();
  const handler = {
    get(obj, prop) {
      if (currentObserver) {
        // 현재 구독자가 존재하면 구독자를 해당 속성에 매핑
        if (!observers.has(prop)) {
          observers.set(prop, new Set()); // 새로운 속성을 위한 Set 생성
        }
        observers.get(prop).add(currentObserver); // 구독자 추가
      }
      console.log(observers);
      return obj[prop];
    },
    set(obj, prop, value) {
      obj[prop] = value;
      if (observers.has(prop)) {
        observers.get(prop).forEach((fn) => fn()); // 해당 속성에 대한 구독자 호출
      }
      return true;
    },
  };

  return new Proxy(obj, handler);
};
