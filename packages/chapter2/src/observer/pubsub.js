let 현재구독자 = null

export const 구독 = fn => {
  현재구독자 = fn
  fn();
  현재구독자 = null
}

export const 발행기관 = obj => {
  Object.keys(obj).forEach(key => {
    let _상태값 = obj[key];
    const 구독자목록 = new Set()
  
    Object.defineProperty(obj, key, {
      get(){
        if(현재구독자) 구독자목록.add(현재구독자);

        return _상태값
      },
      set(value){
        _상태값 = value;
        구독자목록.forEach(fn => fn())
      }
    })
  }) 
  
  
  return obj;
}
