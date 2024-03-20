export function jsx(type, props, ...children) {
  const element = {
    type,
    props: { ...props },
    children: [...children],
  };
  return element;
}

export function createElement(node) {
  // jsx를 dom으로 변환
  const { type, props, children } = node;

  const rtnNode = document.createElement(type);

  // 속성이 있다면 현재 내 태그에 속성 넣기
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      rtnNode.setAttribute(key, value);
    }
  }

  // 자식 처리 (자식이 null이나 undefined이면 넘어가야한다)
  children
    .filter((x) => x != null && x != undefined)
    .map((item) => {
      if (typeof item === "string") {
        rtnNode.append(item); //append는 노드 뿐만 아니라 텍스트도 추가 가능
      } else {
        // jsx 객체인 경우 재귀로 돌린다.
        rtnNode.append(createElement(item));
      }
    });

  return rtnNode;
}

function updateAttributes(target, newProps = {}, oldProps = {}) {

  if(!target) return;

  const newSet = new Set(Object.keys(newProps));
  const oldSet = new Set(Object.keys(oldProps));

  // newProps들을 반복하여 각 속성과 값을 확인
  //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
  //     다음 속성으로 넘어감 (변경 불필요)
  //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
  //     target에 해당 속성을 새 값으로 설정
  for (const [key, value] of Object.entries(newProps)) {
    if (oldSet.has(key) && oldProps[key] === value) {
      continue;
    } else {
      target.setAttribute(key, value);
    }
  }

  // oldProps을 반복하여 각 속성 확인
  //   만약 newProps들에 해당 속성이 존재한다면
  //     다음 속성으로 넘어감 (속성 유지 필요)
  //   만약 newProps들에 해당 속성이 존재하지 않는다면
  //     target에서 해당 속성을 제거
  for (const [key, value] of Object.entries(oldProps)) {
    if(newSet.has(key)){
      continue;
    }else{
      target.removeAttribute(key);
    }
  }
}

export function render(parent, newNode, oldNode, index = 0) {
  // 1. 만약 newNode가 없고 oldNode만 있다면
  //   parent에서 oldNode를 제거
  if (!newNode && oldNode) {
    parent.innerHTML = "";
    return;
  }
  //   종료

  // 2. 만약 newNode가 있고 oldNode가 없다면
  //   newNode를 생성하여 parent에 추가
  if (newNode && !oldNode) {
    const appendNode = createElement(newNode);
    parent.append(appendNode);
    return;
  }
  //   종료

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode !== oldNode) {
      //parent.innerHTML = newNode;
      oldNode = newNode;
      return;
    }
  }

  //   종료

  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  if (typeof newNode !== typeof oldNode) {
    oldNode = newNode;
    return;
  }
  //   종료

  // 5. newNode와 oldNode에 대해 updateAttributes 실행
  updateAttributes(parent.children[index], newNode.props, oldNode.props);

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  // newNode와 oldNode는 jsx 객체임을 잊지말자
  let newChildLength = (typeof newNode !== 'string') ? newNode.children.length : -1;
  let oldChildLength = (typeof oldNode !== 'string') ? oldNode.children.length : -1;
  const maxDepth = Math.max(newChildLength,oldChildLength);
  for(let i = maxDepth - 1; i >= 0; i--){
    render(parent.children[index], newNode.children[i],oldNode.children[i],index + 1);
  }
}