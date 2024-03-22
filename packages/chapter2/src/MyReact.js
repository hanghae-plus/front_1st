import { createHooks } from './hooks';
import { render as updateElement } from './render';

function MyReact() {
  const render = ($root, rootComponent) => {
    while ($root.firstChild) {
      $root.removeChild($root.firstChild);
    }

    const component = () => updateElement($root, rootComponent());
    resetHookContext();
    component();
    _render.current = component;
  };

  const _render = {
    current: null,
  };

  const {
    useState,
    useMemo,
    resetContext: resetHookContext,
  } = createHooks(() => {
    if (_render.current) {
      resetHookContext();
      _render.current();
    }
  });

  return { render, useState, useMemo };
}

export default MyReact();
