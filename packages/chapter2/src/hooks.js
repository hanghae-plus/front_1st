export function createHooks(callback) {

  // 첫 렌더링인지 판단하기 위해 외부변수가 필요하다.
  let states = [];
  let currentKey = 0;

  // useState : 값의 변화도 기억해야하고, 변화에 따라 렌더링도 해야한다. ( <-> useRef : 값의 변화는 기억하나, 변해도 렌더링은 하지 않는다.)
  const useState = (initState) => {
    
    const myKey = currentKey;

    if(states.length === myKey){
      states.push(initState);
    }

    function setState(newState){
      // myKey : setState 함수가 return되어 죽지 않는 변수가 된다
      // 1. Primitive types 거르기
      if(newState === states[myKey]) return;
      
      // 2. Reference type 거르기 (같은 자료구조라는 전제 하에..)
      if(typeof states[myKey] === 'object' && typeof newState === 'object'){
        // 키 값 기준 먼저 정렬하고 값 비교
        let new_sort = Object.keys(newState).sort().reduce((obj, key) => (obj[key] = one[key], obj), {});
        let curr_sort = Object.keys(states[myKey]).sort().reduce((obj, key) => (obj[key] = two[key], obj), {});
        if(Object.entries(new_sort).toString() === Object.entries(curr_sort).toString()) return;
      }

      states[myKey] = newState;
      //currentKey = 0; -> render에서 resetContext 호출되게 테스트 코드 바뀜
      callback();
    }

    currentKey +=1;

    return [states[myKey], setState];
  };

  // 메모 값 캐싱을 위해 외부변수로 선언
  let currMemo = undefined;
  let currRefs = undefined;

  const useMemo = (fn, refs) => {

    // 첫번째 렌더링
    if(currMemo === undefined){
      currMemo = fn();
      currRefs = [...refs];

      return currMemo;
    }
    
    // ref 값 비교
    if(!(JSON.stringify(currRefs) === JSON.stringify(refs))){
      // 값이 다르면 재계산 후 현재 ref로 업데이트
      currMemo = fn();
      currRefs = [...refs];
    }

    return currMemo;
  };

  const resetContext = () => {currentKey = 0;};

  return { useState, useMemo, resetContext };
}
