import { createHooks } from "./hooks";
import { render as updateElement } from "./render";

function MyReact() {
  
  const attrs = {
    root: undefined,
    rootComponent: undefined,
    oldNode : undefined,
    currNode: undefined
  }
  const _render = () => {

    // state currentKey 초기화 후 렌더링 (Component에서 hook 호출 전에 초기화가 필요함)
    resetContext();

    // 현재 상태에 맞춰 렌더링 될 가상 dom을 return 받는다
    attrs.currNode = attrs.rootComponent();

    // 기존에 root에 달렸던 가상 dom (oldNode) 를 함께 보내줘야 비교 가능
    updateElement(attrs.root, attrs.currNode, attrs.oldNode);
    
    // 업데이트가 되었으니 이전 노드로 설정해준다.
    // 이전 jsx 객체를 기억해야한다. 그래야 render 시 비교하며 diff 알고리즘 적용 가능.
    attrs.oldNode = attrs.currNode;
  };
  function render($root, rootComponent) {
    // 이전 루트와 다른 루트일 경우, 초기화 해줘야함.
    if(attrs.root != $root){
      attrs.root = undefined;
      attrs.rootComponent = undefined;
      attrs.oldNode = undefined;
    }

    // 내 루트 저장
    attrs.root = $root;

    // 현재 렌더링 할 component 기억
    attrs.rootComponent = rootComponent;
    
    _render();
  }

  const { useState, useMemo, resetContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();