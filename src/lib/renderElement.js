import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

// TODOL 컨테이너별 관리
// 이전 가상 DOM 트리를 저장할 Map (컨테이너별로 관리)
const previousVNodeMap = new Map();

/**
 * vNode를 container에 렌더링합니다.
 * @param {Object} vNode - 가상 DOM 노드
 * @param {Element|string} container - 렌더링할 컨테이너 요소 또는 선택자
 * @returns {Element} 렌더링된 컨테이너 요소
 */
export function renderElement(vNode, container) {
  console.log("vNode in renderElement", vNode);
  console.log("container in renderElement", typeof container, container);

  // 1. vNode 정규화
  const normalizedVNode = normalizeVNode(vNode);

  // 2. 이전 가상 DOM 가져오기
  const previousVNode = previousVNodeMap.get(container);

  // 3. DOM 업데이트 또는 생성
  if (previousVNode) {
    // 이전 가상 DOM이 있으면 업데이트
    updateElement(container, normalizedVNode, previousVNode);
  } else {
    // 첫 렌더링: 새 DOM 요소 생성 및 추가
    const $el = createElement(normalizedVNode);
    container.innerHTML = ""; // 컨테이너 내용 초기화 (선택적)
    container.appendChild($el);
  }

  // 4. 현재 가상 DOM 저장
  previousVNodeMap.set(container, normalizedVNode);

  // 5. 이벤트 리스너 설정 - 선택자 문자열 사용
  setupEventListeners(container);

  // 6. 렌더링된 컨테이너 반환
  console.log("container in renderElement", container);
  return container;
}
