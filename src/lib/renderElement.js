import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
//import { normalizeVNode } from "./normalizeVNode";
//import { updateElement } from "./updateElement";

// renderElement는 앞에서 작성된 함수들을 조합하여 vNode를 container에 렌더링하는 작업을 수행합니다.

export function renderElement(vNode, container) {
  console.log("vNode in renderElement", vNode);
  console.log("container in renderElement", container);
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.
  const $container = document.querySelector(container);
  const $el = createElement(vNode);
  $container.appendChild($el);
  setupEventListeners(container);
  return $el;
}
