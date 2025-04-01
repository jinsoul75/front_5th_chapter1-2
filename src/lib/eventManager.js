// 1. addEvent와 removeEvent를 통해 element에 대한 이벤트 함수를 어딘가에 저장하거나 삭제합니다.
// 2. setupEventListeners를 이용해서 이벤트 함수를 가져와서 한 번에 root에 이벤트를 등록합니다.

// 이벤트 저장소
const eventStore = new Map();

// 이벤트 등록 함수
export function addEvent(element, eventType, handler) {
  // 요소별 이벤트 저장
  if (!eventStore.has(element)) {
    eventStore.set(element, new Map());
  }

  const elementEvents = eventStore.get(element);
  if (!elementEvents.has(eventType)) {
    elementEvents.set(eventType, new Set());
  }

  elementEvents.get(eventType).add(handler);
}

// 지원할 이벤트 유형들
const supportedEvents = [
  "click",
  "mouseover",
  "mouseout",
  "focus",
  "blur",
  "keydown",
  "keyup",
  "keypress",
  "input",
  "change",
];

const containerEventTypes = new WeakMap();

export function setupEventListeners(root) {
  // root가 DOM 요소인지 확인
  const $root = typeof root === "string" ? document.querySelector(root) : root;

  if (!$root || !($root instanceof Element)) {
    console.error("Invalid root element:", $root);
    return;
  }

  // 이미 설정된 이벤트 타입 확인
  let handledEvents = new Set();
  if (containerEventTypes.has($root)) {
    handledEvents = containerEventTypes.get($root);
  } else {
    containerEventTypes.set($root, handledEvents);
  }

  // 모든 지원 이벤트에 대해 리스너 설정 (아직 설정되지 않은 것만)
  supportedEvents.forEach((eventType) => {
    if (!handledEvents.has(eventType)) {
      $root.addEventListener(eventType, (event) =>
        handleEvent(event, eventType),
      );
      handledEvents.add(eventType);
    }
  });
}
// 통합 이벤트 핸들러
function handleEvent(e, eventType) {
  // 이벤트가 발생한 요소부터 시작해서 해당 요소에 등록된 이벤트 핸들러 실행
  let target = e.target;

  // 이벤트 전파가 중단되었는지 확인
  if (e.isPropagationStopped) return;

  // 이벤트가 발생한 요소에 등록된 핸들러 실행
  if (eventStore.has(target)) {
    const elementEvents = eventStore.get(target);
    if (elementEvents.has(eventType)) {
      const handlers = elementEvents.get(eventType);
      handlers.forEach((handler) => handler(e));
    }
  }
}

// 이벤트 제거 함수
export function removeEvent(element, eventType, handler) {
  if (eventStore.has(element)) {
    const elementEvents = eventStore.get(element);
    if (elementEvents.has(eventType)) {
      elementEvents.get(eventType).delete(handler);
    }
  }
}
