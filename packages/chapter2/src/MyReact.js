import { createHooks } from "./hooks";
import { render as updateElement } from "./render";

function MyReact() {
  let _root;
  let _renderFunction;
  let _currentElement;

  const _render = () => {
    resetHookContext();
    const newElement = _renderFunction();
    updateElement(_root, newElement, _currentElement);
    _currentElement = newElement;
  };

  function render($root, rootComponent) {
    resetHookContext();
    const newElement = rootComponent();
    updateElement($root, newElement);
    _root = $root;
    _renderFunction = rootComponent;
    _currentElement = newElement;
  }

  const {
    useState,
    useMemo,
    resetContext: resetHookContext,
  } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
