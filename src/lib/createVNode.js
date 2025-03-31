const isNotFalsy = (el) => el !== false && el !== null && el !== undefined;

export function createVNode(type, props, ...children) {
  console.log("type in createVNode", type);
  console.log("props in createVNode", props);
  console.log("children in createVNode", children);
  return {
    type,
    props,
    children: children.flat(Infinity).filter(isNotFalsy),
  };
}
