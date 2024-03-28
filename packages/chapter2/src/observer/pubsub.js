const fnArr = [];

export const 구독 = (fn) => {
  //fn();
  fnArr.push(fn);
  //console.log('구독!');
  return fn();
};

export const 발행기관 = (obj) => {
  //proxy = '대리' 라는 뜻
  //let proxykey = 0;
  const proxy = new Proxy(obj, {
    get(target, p) {
      return target[p];
    },
    set(target, p, newVal) {
      // console.log(p, newVal);
      if (p === 'a') {
        const count = [0, 2, 3, 4];
        for (const i in count) {
          const idx = count[i];
          target[p] = newVal;
          구독(fnArr[idx]);
        }
      }
      if (p === 'b') {
        const count = [1, 2, 3, 4];
        for (const i in count) {
          const idx = count[i];
          target[p] = newVal;
          구독(fnArr[idx]);
        }
      }
      return newVal;
    },
  });

  return proxy;
};
