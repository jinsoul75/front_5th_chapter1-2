import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

// newProps와 oldProps의 속성을 비교하여 변경된 부분만 반영
function updateAttributes(target, newProps = {}, oldProps = {}) {
  // 다른 돔 갈아끼우기 새 돔 추가
  for (const [key, value] of Object.entries(newProps)) {
    // 이벤트 처리 (on으로 시작하는 속성)
    if (oldProps[key] === value) return;

    if (key.startsWith("on")) {
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
  }

  // 없어진 돔 처리
  for (const [key, value] of Object.entries(oldProps)) {
    // 이벤트 처리 (on으로 시작하는 속성)
    if (key.startsWith("on")) {
      const eventType = key.toLowerCase().substring(2); // 'onClick' -> 'click'

      if (!newProps[key]) {
        // 새 속성에 없는 이벤트는 제거
        removeEvent(target, eventType, value);
      } else {
        const attributeName = key === "className" ? "class" : key;

        if (newProps[key] !== value) {
          target.setAttribute(attributeName, newProps[key]);
        }
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
      createElement(newNode),
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
    newNode.props ?? {},
    oldNode.props ?? {},
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
