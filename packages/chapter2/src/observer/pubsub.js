export const 구독 = fn => {
  fn();
}

export const 발행기관 = obj => {
  Object.defineProperties({ a: null, b: null }, {
    a: {
      get(){
        return a;
      }
    },
    b: {
      get(){
        return b;
      }
    }
  });
  return obj;
}
