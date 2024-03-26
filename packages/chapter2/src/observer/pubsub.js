let currentCallback = null;

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
  currentCallback = null;
};

export const 발행기관 = (obj) => {
  let newState = {};

  // Object.defineProperty(state, "name", {
  //   set(value) {
  //     newState = { a: value };
  //   },
  //   get() {
  //     return newState;
  //   },
  // });
  // console.log(obj);
  // Object.defineProperties(newState, {
  //   a: { value: obj.a, enumerable: true, configurable: true, writable: true },
  //   b: { value: obj.b, enumerable: true, configurable: true, writable: true },
  // });
  // let clone = Object.getOwnPropertyDescriptors(newState);
  // const clone2 = {};
  // for (let key in newState) {
  //   clone2[key] = newState[key];
  // }
  // console.log(clone);
  // console.log(clone2);
  // console.log(newState.a);
  // console.log(newState.b);
  // return clone2;
};
