let arrCallback = {};
let currentCallback = null;

export const 구독 = fn => {
  
  // fn을 한번 실행하게될테니, 그때 getter에서 어떤 값에 참조를 하는지 저장하기 위해 currentCallback에 임시 저장한다.
  currentCallback = fn;

  //구독하면 일단 알림을 받음
  fn();
}

export const 발행기관 = obj => {
  const state = {};

  // 1. obj에 초기 상태의 값을 가진 객체를 받을 것이다. 각 키 값에 맞는 setter, getter를 만들어주자.
  Object.keys(obj).forEach((key) => {
    Object.defineProperty(state, key, {
      get(){

        // 내 키값을 참조하는 것들 저장 (중복 저장 막기 위해 set 사용)
        arrCallback[key] = arrCallback[key] || new Set();
        arrCallback[key].add(currentCallback);

        // 현재 상태 return
        return obj[key];
      },
      set(value) {
        // 상태가 새로 설정되는 것 = 구독자들에게 알림을 전송한다.
        obj[key] = value;
        // 알림 전송
        arrCallback[key].forEach(x=>x());
      }
    });
  });
  return state;
}