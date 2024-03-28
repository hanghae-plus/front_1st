let subscriber = null
let 구독자들 = new Set()
export const 구독 = fn => {
  subscriber = fn
  fn();
}


export const 발행기관 = obj => {
  const state = {}
  Object.keys(obj).forEach(key =>   Object.defineProperty(state, key, {
    get:() =>{
      구독자들[key] = 구독자들[key] || new Set()
      구독자들[key].add(subscriber)

      return obj[key]
    },
    set: (val) => {
      obj[key] = val
      구독자들[key].forEach(x => x())
    }
  }))

  return state;
}
