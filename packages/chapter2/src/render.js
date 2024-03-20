import {
  isNull,
  isSameTypeNode,
  setAttributes,
  isString,
} from "./render.utility";

export function jsx(type, props, ...children) {
  return {
    type,
    props,
    children,
  };
}

export function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.type);

  if (!isNull(node.props)) {
    setAttributes(node.props ?? {}, element);
  }

  node.children.forEach((child) => {
    element.appendChild(createElement(child));
  });

  return element;
}

function updateAttributes(target, newProps, oldProps) {
  // newProps들을 반복하여 각 속성과 값을 확인
  for (const [key, values] of Object.entries(newProps)) {
    //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
    if (oldProps[key] && oldProps[key] == values) {
      //     다음 속성으로 넘어감 (변경 불필요)
      continue;
    }
    //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
    //     target에 해당 속성을 새 값으로 설정
    target.setAttributes(key, values);
  }
  // oldProps을 반복하여 각 속성 확인
  for (const [key, _] of Object.entries(oldProps)) {
    //   만약 newProps들에 해당 속성이 존재한다면
    if (newProps[key]) {
      //     다음 속성으로 넘어감 (속성 유지 필요)
      continue;
    }
    //   만약 newProps들에 해당 속성이 존재하지 않는다면
    //     target에서 해당 속성을 제거
    target.removeAttribute(key);
  }
}

export function render(parent, newNode, oldNode, index = 0) {
  // 1. 만약 newNode가 없고 oldNode만 있다면
  //   parent에서 oldNode를 제거
  //   종료
  if (!newNode && oldNode) {
    parent.childNodes[index].remove();
    return;
  }

  // 2. 만약 newNode가 있고 oldNode가 없다면
  //   newNode를 생성하여 parent에 추가
  //   종료
  if (newNode && !oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (isString(newNode) && isString(oldNode)) {
    if (newNode !== oldNode) {
      parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    }
    return;
  }

  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (!isSameTypeNode(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    return;
  }

  // 5. newNode와 oldNode에 대해 updateAttributes 실행
  updateAttributes(
    parent.childNodes[index],
    newNode.props ?? {},
    oldNode.props ?? {}
  );

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  const length =
    newNode.children.length > oldNode.children.length
      ? newNode.children.length
      : oldNode.children.length;

  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  for (let i = 0; i < length; i++) {
    render(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i
    );
  }
}
