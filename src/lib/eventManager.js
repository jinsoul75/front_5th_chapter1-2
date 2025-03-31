// 1. addEvent와 removeEvent를 통해 element에 대한 이벤트 함수를 어딘가에 저장하거나 삭제합니다.
// 2. setupEventListeners를 이용해서 이벤트 함수를 가져와서 한 번에 root에 이벤트를 등록합니다.

// TODO: 클릭이벤트만 연결하는건가?
export function setupEventListeners(root) {
  const $root = document.querySelector(root);
  $root.addEventListener("click", (e) => {
    e.target.dispatchEvent(new CustomEvent("click"));
  });
}

export function addEvent(element, eventType, handler) {
  element.addEventListener(eventType, handler);
}

export function removeEvent(element, eventType, handler) {
  element.removeEventListener(eventType, handler);
}
