import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

// newProps와 oldProps의 속성을 비교하여 변경된 부분만 반영
function updateAttributes(target, newProps = {}, oldProps = {}) {
  // oldProps가 null이나 undefined인 경우 빈 객체로 처리
  oldProps = oldProps || {};
  newProps = newProps || {};
  console.log("oldProps", oldProps);
  console.log("newProps", newProps);
  // 이전 속성 처리
  for (const [key, value] of Object.entries(oldProps)) {
    // 이벤트 처리 (on으로 시작하는 속성)
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.toLowerCase().substring(2); // 'onClick' -> 'click'
      if (!newProps[key]) {
        // 새 속성에 없는 이벤트는 제거
        removeEvent(target, eventType, value);
      }
      continue;
    }

    // 일반 속성 처리: 새 속성에 없는 속성은 제거
    if (newProps[key] === undefined) {
      target.removeAttribute(key);
    }
  }

  // 새 속성 처리
  for (const [key, value] of Object.entries(newProps)) {
    // 이벤트 처리 (on으로 시작하는 속성)
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.toLowerCase().substring(2); // 'onClick' -> 'click'
      // 이벤트 리스너 추가 (이전 리스너와 다른 경우)
      if (value !== oldProps[key]) {
        if (oldProps[key]) {
          removeEvent(target, eventType, oldProps[key]);
        }
        addEvent(target, eventType, value);
      }
      continue;
    }

    // 일반 속성 처리: 이전 속성과 다른 경우에만 업데이트
    if (value !== oldProps[key]) {
      // 특수 속성 처리 (className, htmlFor 등)
      if (key === "className") {
        target.className = value;
      } else if (key === "value") {
        target.value = value;
      } else if (key === "checked") {
        target.checked = value;
      } else if (key === "style" && typeof value === "object") {
        // 스타일 객체 처리
        Object.assign(target.style, value);
      } else {
        // 일반 속성 설정
        target.setAttribute(key, value);
      }
    }
  }
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  // old 노드만 있는 경우
  if (!newNode && oldNode) {
    return parentElement.removeChild(parentElement.childNodes[index]);
  }

  // new 노드만 있는 경우
  if (newNode && !oldNode) {
    return parentElement.appendChild(createElement(newNode));
  }

  // old 노드와 new 노드 모두 text 타입일 경우
  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode === oldNode) return;
    return parentElement.replaceChild(
      document.createTextNode(newNode),
      parentElement.childNodes[index],
    );
  }

  // old 노드와 new 노드의 태그이름이 다를경우
  if (oldNode.type !== newNode.type) {
    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index],
    );
  }

  // old 노드와 new 노드의 태그이름이 같을 경우
  updateAttributes(
    parentElement.childNodes[index],
    newNode.props,
    oldNode.props,
  );

  // new노드와 old노드의 모든 자식 태그를 순회하며 1~5 내용반복
  const maxLength = Math.max(
    newNode.children?.length || 0,
    oldNode.children?.length || 0,
  );

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.childNodes[index],
      newNode.children?.[i],
      oldNode.children?.[i],
      i,
    );
  }
}
