let currentCallback = null;

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
  currentCallback = null;
};

export const 발행기관 = (obj) => {
  Object.defineProperties(
    obj,
    Object.keys(obj).reduce((acc, key) => {
      let value = obj[key];
      const observers = new Set();

      acc[key] = {
        get() {
          if (currentCallback) {
            observers.add(currentCallback);
          }
          return value;
        },
        set(val) {
          value = val;
          observers.forEach((fn) => fn());
        },
      };

      return acc;
    }, {})
  );

  return obj;
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
