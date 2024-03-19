export function isNull(value) {
  return value === null;
}

export function setAttributes(props, node) {
  for (const [key, value] of Object.entries(props)) {
    node.setAttribute(key, value);
  }
}

export function isTextNode(node) {
  return node instanceof Text;
}

export function appendChildToParent(parent, child) {
  if (isString(child)) {
    appendAsTextNode(parent, child);
  } else {
    parent.appendChild(child);
  }
}

export function isString(value) {
  return typeof value === "string";
}

export function appendAsTextNode(parent, child) {
  const textNode = document.createTextNode(child);
  parent.appendChild(textNode);
}

export function isSameTypeNode(newNode, oldNode) {
  if (typeof newNode === "string" && typeof oldNode === "string") {
    return true;
  }

  if (typeof newNode === "object" && typeof oldNode === "object") {
    if (newNode.type === oldNode.type) {
      return true;
    }
  }

  return false;
}
