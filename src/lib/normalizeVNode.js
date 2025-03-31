// 1. vNode가 null, undefined 또는 boolean 타입일 경우 빈 문자열을 반환합니다.
// 2. vNode가 문자열 또는 숫자일 경우 문자열로 변환하여 반환합니다.
// 3. vNode의 타입이 함수일 경우 해당 함수를 호출하여 반환된 결과를 재귀적으로 표준화합니다.
// 4. 그 외의 경우, vNode의 자식 요소들을 재귀적으로 표준화하고, null 또는 undefined 값을 필터링하여 반환합니다.
export function normalizeVNode(vNode) {
  console.log("normalizeVNode가 실행된건 맞아?");
  console.log("vNode in normalizeVNode", vNode);
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return "";
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode !== "object") {
    return vNode;
  }

  if (typeof vNode.type === "function") {
    const Component = vNode.type;
    const props = { ...(vNode.props || {}) };

    if (!props.children && vNode.children && vNode.children.length > 0) {
      props.children = vNode.children;
    }

    return normalizeVNode(Component(props));
  }

  let normalizedChildren = [];

  if (Array.isArray(vNode.children)) {
    normalizedChildren = vNode.children
      .map(normalizeVNode)
      .filter((child) => child !== "");
  } else if (vNode.children) {
    const normalizedChild = normalizeVNode(vNode.children);
    if (normalizedChild !== "") {
      normalizedChildren = [normalizedChild];
    }
  }

  if (vNode.props && vNode.props.children) {
    let propsChildren;
    if (Array.isArray(vNode.props.children)) {
      propsChildren = vNode.props.children
        .map(normalizeVNode)
        .filter((child) => child !== "");
    } else {
      const normalizedChild = normalizeVNode(vNode.props.children);
      propsChildren = normalizedChild !== "" ? [normalizedChild] : [];
    }

    if (normalizedChildren.length === 0) {
      normalizedChildren = propsChildren;
    }
  }

  return {
    type: vNode.type,
    props: vNode.props,
    children: normalizedChildren,
  };
}
