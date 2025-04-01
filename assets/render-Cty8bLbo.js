var $=Object.defineProperty;var F=(e,t,r)=>t in e?$(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var y=(e,t,r)=>F(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();const q=()=>{const e=new Set;return{subscribe:n=>e.add(n),notify:()=>e.forEach(n=>n())}},V=(e,t)=>{const{subscribe:r,notify:n}=q();let a={...e};const o=i=>{a={...a,...i},n()},l=()=>({...a}),m=Object.fromEntries(Object.entries(t).map(([i,c])=>[i,(...U)=>o(c(l(),...U))]));return{getState:l,setState:o,subscribe:r,actions:m}},G=(e,t=window.localStorage)=>({get:()=>JSON.parse(t.getItem(e)),set:o=>t.setItem(e,JSON.stringify(o)),reset:()=>t.removeItem(e)}),W=e=>e!==!1&&e!==null&&e!==void 0;function s(e,t,...r){return{type:e,props:t,children:r.flat(1/0).filter(W)}}const p=new Map,w=new WeakMap;function A(e,t,r){p.has(t)||p.set(t,new Map),p.get(t).set(e,r)}function H(e){w.has(e)||w.set(e,new Set);const t=w.get(e);console.log("events",t),p.forEach((r,n)=>{console.log("events",t),!t.has(n)&&(e.addEventListener(n,a=>{console.log("eventType",n);for(const[o,l]of r)o.contains(a.target)&&l.call(o,a)}),t.add(n))})}function B(e,t,r){console.log("element in removeEvent",e);const n=p.get(t);n.has(e)&&n.get(e)===r&&n.delete(e)}function f(e){if(e==null||typeof e=="boolean")return document.createTextNode("");if(typeof e=="string"||typeof e=="number")return document.createTextNode(e);if(Array.isArray(e)){const r=document.createDocumentFragment();return e.forEach(n=>{r.appendChild(f(n))}),r}const t=document.createElement(e.type);return J(t,e.props),e.children.forEach(r=>{t.appendChild(f(r))}),t}function J(e,t){Object.entries(t||{}).filter(([,r])=>r).forEach(([r,n])=>{if(r==="className")e.className=n;else if(r.startsWith("on")&&typeof n=="function"){const a=r.toLowerCase().substring(2);A(e,a,n)}else e.setAttribute(r,n)})}function v(e){if(e==null||typeof e=="boolean")return"";if(typeof e=="string"||typeof e=="number")return String(e);if(typeof e.type=="function"){const t=e.type,r={...e.props||{}};return!r.children&&e.children&&e.children.length>0&&(r.children=e.children),v(t(r))}return{type:e.type,props:e.props,children:e.children.map(v).filter(t=>t!=="")}}function T(e,t={},r={}){Object.entries(t).map(([n,a])=>{if(r[n]!==a){if(n==="className"&&(n="class"),n.startsWith("on"))return A(e,n.replace("on","").toLowerCase(),a);e.setAttribute(n,a)}}),Object.keys(r).map(n=>{t[n]===void 0&&(n.startsWith("on")&&B(e,n.replace("on","").toLowerCase(),r[n]),e.removeAttribute(n))})}function M(e,t,r,n=0){var o,l,m,i;if(!t&&r)return e.removeChild(e.childNodes[n]);if(t&&!r)return e.appendChild(f(t));if(typeof t=="string"&&typeof r=="string")return t===r?void 0:e.replaceChild(f(t),e.childNodes[n]);if(r.type!==t.type)return e.replaceChild(f(t),e.childNodes[n]);T(e.childNodes[n],t.props??{},r.props??{});const a=Math.max(((o=t.children)==null?void 0:o.length)||0,((l=r.children)==null?void 0:l.length)||0);for(let c=0;c<a;c++)M(e.childNodes[n],(m=t.children)==null?void 0:m[c],(i=r.children)==null?void 0:i[c],c)}const P=new Map;function z(e,t){const r=v(e),n=P.get(t);if(n)M(t,r,n);else{const a=f(r);t.appendChild(a)}P.set(t,r),H(t)}const K=1e3,E=K*60,L=E*60,Y=L*24,k=e=>{const t=Date.now()-e;return t<E?"방금 전":t<L?`${Math.floor(t/E)}분 전`:t<Y?`${Math.floor(t/L)}시간 전`:new Date(e).toLocaleString()},Q=({author:e,time:t,content:r,likeUsers:n,activationLike:a=!1})=>s("div",{className:"bg-white rounded-lg shadow p-4 mb-4"},s("div",{className:"flex items-center mb-2"},s("div",null,s("div",{className:"font-bold"},e),s("div",{className:"text-gray-500 text-sm"},k(t)))),s("p",null,r),s("div",{className:"mt-2 flex justify-between text-gray-500"},s("span",{className:`like-button cursor-pointer${a?" text-blue-500":""}`},"좋아요 ",n.length),s("span",null,"댓글"),s("span",null,"공유"))),R=()=>s("div",{className:"mb-4 bg-white rounded-lg shadow p-4"},s("textarea",{id:"post-content",placeholder:"무슨 생각을 하고 계신가요?",className:"w-full p-2 border rounded"}),s("button",{id:"post-submit",className:"mt-2 bg-blue-600 text-white px-4 py-2 rounded"},"게시")),j=()=>s("header",{className:"bg-blue-600 text-white p-4 sticky top-0"},s("h1",{className:"text-2xl font-bold"},"항해플러스")),C=()=>s("footer",{className:"bg-gray-200 p-4 text-center"},s("p",null,"© $",new Date().getFullYear()," 항해플러스. All rights reserved.")),b={value:null,get(){return this.value},set(e){this.value=e}},g=G("user"),X=1e3,d=X*60,Z=d*60,u=V({currentUser:g.get(),loggedIn:!!g.get(),posts:[{id:1,author:"홍길동",time:Date.now()-5*d,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",likeUsers:[]},{id:2,author:"김철수",time:Date.now()-15*d,content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",likeUsers:[]},{id:3,author:"이영희",time:Date.now()-30*d,content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",likeUsers:[]},{id:4,author:"박민수",time:Date.now()-30*d,content:"주말에 등산 가실 분 계신가요? 함께 가요!",likeUsers:[]},{id:5,author:"정수연",time:Date.now()-2*Z,content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",likeUsers:[]}],error:null},{logout(e){return g.reset(),{...e,currentUser:null,loggedIn:!1}}}),N=e=>window.location.pathname===e?"text-blue-600 font-bold":"text-gray-600";function S({onClick:e,children:t,...r}){return s("a",{onClick:a=>{a.preventDefault(),e==null||e(),b.get().push(a.target.href.replace(window.location.origin,""))},...r},t)}const I=()=>{const{loggedIn:e}=u.getState(),{logout:t}=u.actions;return s("nav",{className:"bg-white shadow-md p-2 sticky top-14"},s("ul",{className:"flex justify-around"},s("li",null,s(S,{href:"/",className:N("/")},"홈")),!e&&s("li",null,s(S,{href:"/login",className:N("/login")},"로그인")),e&&s("li",null,s(S,{href:"/profile",className:N("/profile")},"프로필")),e&&s("li",null,s("a",{href:"#",id:"logout",className:"text-gray-600",onClick:r=>{r.preventDefault(),t()}},"로그아웃"))))},re=()=>{const{posts:e}=u.getState();return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(j,null),s(I,null),s("main",{className:"p-4"},s(R,null),s("div",{id:"posts-container",className:"space-y-4"},[...e].sort((t,r)=>r.time-t.time).map(t=>s(Q,{...t,activationLike:!1})))),s(C,null)))};function _(e){const t={username:e,email:"",bio:""};u.setState({currentUser:t,loggedIn:!0}),g.set(t)}const ne=()=>s("div",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},s("h1",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"항해플러스"),s("form",{id:"login-form",onSubmit:t=>{t.preventDefault();const r=document.getElementById("username").value;_(r)}},s("input",{type:"text",id:"username",placeholder:"사용자 이름",className:"w-full p-2 mb-4 border rounded",required:!0}),s("input",{type:"password",placeholder:"비밀번호",className:"w-full p-2 mb-6 border rounded",required:!0}),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded"},"로그인")),s("div",{className:"mt-4 text-center"},s("a",{href:"#",className:"text-blue-600 text-sm"},"비밀번호를 잊으셨나요?")),s("hr",{className:"my-6"}),s("div",{className:"text-center"},s("button",{className:"bg-green-500 text-white px-4 py-2 rounded"},"새 계정 만들기")))),ee=()=>s("main",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full text-center",style:"max-width: 480px"},s("h1",{className:"text-2xl font-bold text-blue-600 mb-4"},"항해플러스"),s("p",{className:"text-4xl font-bold text-gray-800 mb-4"},"404"),s("p",{className:"text-xl text-gray-600 mb-8"},"페이지를 찾을 수 없습니다"),s("p",{className:"text-gray-600 mb-8"},"요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."),s("a",{href:"/","data-link":"",className:"bg-blue-600 text-white px-4 py-2 rounded font-bold"},"홈으로 돌아가기")));function te(e){const t={...u.getState().currentUser,...e};u.setState({currentUser:t}),g.set(t),alert("프로필이 업데이트되었습니다.")}const ae=()=>{const{loggedIn:e,currentUser:t}=u.getState(),{username:r="",email:n="",bio:a=""}=t??{};return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(j,null),s(I,{loggedIn:e}),s("main",{className:"p-4"},s("div",{className:"bg-white p-8 rounded-lg shadow-md"},s("h2",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"내 프로필"),s("form",{id:"profile-form",onSubmit:l=>{l.preventDefault();const m=new FormData(l.target),i=Object.fromEntries(m);te(i)}},s("div",{className:"mb-4"},s("label",{for:"username",className:"block text-gray-700 text-sm font-bold mb-2"},"사용자 이름"),s("input",{type:"text",id:"username",name:"username",className:"w-full p-2 border rounded",value:r,required:!0})),s("div",{className:"mb-4"},s("label",{for:"email",className:"block text-gray-700 text-sm font-bold mb-2"},"이메일"),s("input",{type:"email",id:"email",name:"email",className:"w-full p-2 border rounded",value:n,required:!0})),s("div",{className:"mb-6"},s("label",{for:"bio",className:"block text-gray-700 text-sm font-bold mb-2"},"자기소개"),s("textarea",{id:"bio",name:"bio",rows:"4",className:"w-full p-2 border rounded"},a)),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded font-bold"},"프로필 업데이트")))),s(C,null)))},h=class h extends Error{constructor(){super(h.MESSAGE)}};y(h,"MESSAGE","ForbiddenError");let D=h;const x=class x extends Error{constructor(){super(x.MESSAGE)}};y(x,"MESSAGE","UnauthorizedError");let O=x;function oe(){const e=b.get().getTarget()??ee,t=document.querySelector("#root");try{z(s(e,null),t)}catch(r){if(r instanceof D){b.get().push("/");return}if(r instanceof O){b.get().push("/login");return}console.error(r)}}export{D as F,re as H,ne as L,ae as P,O as U,oe as a,s as b,q as c,u as g,b as r};
