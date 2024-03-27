let currentCallback = null;

export const 구독 = (fn) => {
  // fn을 한번 실행하고 currentCallback에 임시 저장하도록 함
  currentCallback = fn;
  //구독하면 알람을 받게 처리한다.
  fn();
  currentCallback = null;
};

export const 발행기관 = (obj) => {
  const state = {};
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();
    Object.defineProperty(state, key, {
      get() {
        // get: 내 obj를 저장한다.
        // 내부의 변화가 생기는?
        if (currentCallback) {
          observers.add(currentCallback);
        }
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return state;
};
