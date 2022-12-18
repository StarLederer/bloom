(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const C={};function Oe(e){C.context=e}const De=(e,t)=>e===t,z={equals:De};let ye=Ce;const x=1,G=2,we={owned:null,cleanups:null,context:null,owner:null};var _=null;let j=null,m=null,$=null,A=null,se=0;function _e(e,t){const n=m,s=_,i=e.length===0,l=i?we:{owned:null,cleanups:null,context:null,owner:t||s},o=i?e:()=>e(()=>W(()=>le(l)));_=l,m=null;try{return D(o,!0)}finally{m=n,_=s}}function w(e,t){t=t?Object.assign({},z,t):z;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),Se(n,i));return[pe.bind(n),s]}function E(e,t,n){const s=ie(e,t,!1,x);O(s)}function Q(e,t,n){ye=Fe;const s=ie(e,t,!1,x);s.user=!0,A?A.push(s):O(s)}function ue(e,t,n){n=n?Object.assign({},z,n):z;const s=ie(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,O(s),pe.bind(s)}function W(e){const t=m;m=null;try{return e()}finally{m=t}}function pe(){const e=j;if(this.sources&&(this.state||e))if(this.state===x||e)O(this);else{const t=$;$=null,D(()=>V(this),!1),$=t}if(m){const t=this.observers?this.observers.length:0;m.sources?(m.sources.push(this),m.sourceSlots.push(t)):(m.sources=[this],m.sourceSlots=[t]),this.observers?(this.observers.push(m),this.observerSlots.push(m.sources.length-1)):(this.observers=[m],this.observerSlots=[m.sources.length-1])}return this.value}function Se(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&D(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=j&&j.running;o&&j.disposed.has(l),(o&&!l.tState||!o&&!l.state)&&(l.pure?$.push(l):A.push(l),l.observers&&ke(l)),o||(l.state=x)}if($.length>1e6)throw $=[],new Error},!1)),t}function O(e){if(!e.fn)return;le(e);const t=_,n=m,s=se;m=_=e,Be(e,e.value,s),m=n,_=t}function Be(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=x),Ee(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Se(e,s):e.value=s,e.updatedAt=n)}function ie(e,t,n,s=x,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:_,context:null,pure:n};return _===null||_!==we&&(_.owned?_.owned.push(l):_.owned=[l]),l}function U(e){const t=j;if(e.state===0||t)return;if(e.state===G||t)return V(e);if(e.suspense&&W(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<se);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===x||t)O(e);else if(e.state===G||t){const i=$;$=null,D(()=>V(e,n[0]),!1),$=i}}function D(e,t){if($)return e();let n=!1;t||($=[]),A?n=!0:A=[],se++;try{const s=e();return He(n),s}catch(s){$||(A=null),Ee(s)}}function He(e){if($&&(Ce($),$=null),e)return;const t=A;A=null,t.length&&D(()=>ye(t),!1)}function Ce(e){for(let t=0;t<e.length;t++)U(e[t])}function Fe(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:U(s)}for(C.context&&Oe(),t=0;t<n;t++)U(e[t])}function V(e,t){const n=j;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===x||n?i!==t&&U(i):(i.state===G||n)&&V(i,t))}}function ke(e){const t=j;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=G,s.pure?$.push(s):A.push(s),s.observers&&ke(s))}}function le(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),o=n.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,n.observerSlots[s]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)le(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function ze(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Ee(e){throw e=ze(e),e}function v(e,t){return W(()=>e(t||{}))}function Ge(e,t,n){let s=n.length,i=t.length,l=s,o=0,r=0,a=t[i-1].nextSibling,c=null;for(;o<i||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===o){const f=l<s?r?n[r-1].nextSibling:n[l-r]:a;for(;r<l;)e.insertBefore(n[r++],f)}else if(l===r)for(;o<i;)(!c||!c.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],f),t[i]=n[l]}else{if(!c){c=new Map;let d=r;for(;d<l;)c.set(n[d],d++)}const f=c.get(t[o]);if(f!=null)if(r<f&&f<l){let d=o,u=1,h;for(;++d<i&&d<l&&!((h=c.get(t[d]))==null||h!==f+u);)u++;if(u>f-r){const b=t[o];for(;r<f;)e.insertBefore(n[r++],b)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const he="_$DX_DELEGATE";function Ue(e,t,n,s={}){let i;return _e(l=>{i=l,t===document?e():g(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function p(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Me(e,t=window.document){const n=t[he]||(t[he]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,qe))}}function I(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function k(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ve(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n)}function oe(e,t,n){if(!t)return n?I(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function de(e,t,n){return W(()=>e(t,n))}function g(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return q(e,t,s,n);E(i=>q(e,t(),i,n),s)}function qe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),C.registry&&!C.done&&(C.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function q(e,t,n,s,i){for(C.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(C.context)return n;if(l==="number"&&(t=t.toString()),o){let r=n[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),n=P(e,n,s,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(C.context)return n;n=P(e,n,s)}else{if(l==="function")return E(()=>{let r=t();for(;typeof r=="function";)r=r();n=q(e,r,n,s)}),()=>n;if(Array.isArray(t)){const r=[],a=n&&Array.isArray(n);if(Y(r,t,n,i))return E(()=>n=q(e,r,n,s,!0)),()=>n;if(C.context){if(!r.length)return n;for(let c=0;c<r.length;c++)if(r[c].parentNode)return n=r}if(r.length===0){if(n=P(e,n,s),o)return n}else a?n.length===0?ge(e,r,s):Ge(e,n,r):(n&&P(e),ge(e,r));n=r}else if(t instanceof Node){if(C.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=P(e,n,s,t);P(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Y(e,t,n,s){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],a=n&&n[l];if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))i=Y(e,r,a)||i;else if(typeof r=="function")if(s){for(;typeof r=="function";)r=r();i=Y(e,Array.isArray(r)?r:[r],Array.isArray(a)?a:[a])||i}else e.push(r),i=!0;else{const c=String(r);a&&a.nodeType===3&&a.data===c?e.push(a):e.push(document.createTextNode(c))}}return i}function ge(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function P(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const a=r.parentNode===e;!l&&!o?a?e.replaceChild(i,r):e.insertBefore(i,n):a&&r.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}const We=p("<section></section>"),Xe=e=>{var d;const{route:t}=Te,n=(d=e.class)!=null?d:"absolute inset-0 flex flex-col items-stretch",s=()=>n+(l()?" animate-in":"")+(o()?" animate-out":""),i=()=>e.path.split("/").pop(),l=()=>t().firstDifferent[1]===i(),o=()=>t().firstDifferent[0]===i();let r=setTimeout(()=>{},0);const a=()=>{var h,b;let u=!1;return e.strict?u=t().current===e.path:u=t().current.startsWith(e.path),u?(h=e.onOpen)==null||h.call(e):(b=e.onClose)==null||b.call(e),u},[c,f]=w(!1);return Q(()=>{a()?(f(!0),clearTimeout(r)):r=setTimeout(()=>{f(!1)},500)}),ue((()=>{const u=ue(()=>!!c());return()=>u()&&(()=>{const h=We.cloneNode(!0);return g(h,()=>e.children),E(()=>k(h,s())),h})()})())},Ke=e=>{let t=[];return e.split("/").forEach(n=>{n===".."?t.pop():t.push(n)}),`${t.join("/")}`},Qe=(e,t)=>{const n=e.split("/"),s=t.split("/"),i=Math.max(n.length,s.length);for(let l=0;l<i;++l)if(n[l]!=s[l])return[n[l],s[l]];return[void 0,void 0]},Ye=()=>{const[e,t]=w({previous:"/",current:"/",firstDifferent:[void 0,void 0]});return{route:e,navigate:s=>{const i=e().current,l=Ke(s);t({previous:i,current:l,firstDifferent:Qe(i,l)})}}},Te=_e(Ye),Je="_button_rpt0d_1",Ze="_isGhost_rpt0d_29",et="_isHalf_rpt0d_38",tt="_isSecondary_rpt0d_42",nt="_isSolid_rpt0d_46",R={button:Je,isGhost:Ze,isHalf:et,isSecondary:tt,isSolid:nt},st=p('<button><div class="flex items-center justify-center flex-1 gap-m0"></div></button>'),J=e=>(()=>{const t=st.cloneNode(!0),n=t.firstChild;return Ve(t,"click",e.onClick,!0),g(n,()=>e.children),E(s=>{var a,c;const i=[(a=e.class)!=null?a:"round-m0 pd-m0",R.button,(()=>e.style==="solid"?R.isSolid:e.style==="secondary"?R.isSecondary:e.style==="half"?R.isHalf:R.isGhost)()].join(" "),l=(c=e.type)!=null?c:"button",o=e.disabled,r=`${e.hue!=null?`--hue: ${e.hue};`:""}`;return i!==s._v$&&k(t,s._v$=i),l!==s._v$2&&I(t,"type",s._v$2=l),o!==s._v$3&&(t.disabled=s._v$3=o),s._v$4=oe(t,r,s._v$4),s},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),t})();Me(["click"]);const it=p("<div><canvas></canvas></div>"),Z=e=>{const[t,n]=w(0);let s,i;return setTimeout(()=>{var o;n((o=s==null?void 0:s.offsetWidth)!=null?o:0)},0),Q(()=>{if(!i)return;i.width=t(),i.height=t();const o=i.getContext("2d");!o||e.render(o)}),Q(()=>{var r;const o=(r=e.eventListeners)!=null?r:{};Object.keys(o).forEach(a=>{i==null||i.addEventListener(a,o[a])})}),(()=>{const o=it.cloneNode(!0),r=o.firstChild,a=s;typeof a=="function"?de(a,o):s=o;const c=i;return typeof c=="function"?de(c,r):i=r,E(()=>k(o,e.class)),o})()},lt="_bg_3nc5v_1",ot="_fill_3nc5v_23",rt="_slider_3nc5v_32",X={bg:lt,fill:ot,slider:rt},at=p('<div><div></div><input type="range"></div>'),H=e=>(()=>{const t=at.cloneNode(!0),n=t.firstChild,s=n.nextSibling;return s.$$input=i=>{e.signal[1](Number(i.target.value))},E(i=>{var u,h,b;const l=X.bg,o=X.fill,r=`width: calc(${e.signal[0]()*100}%`,a=X.slider,c=(u=e.min)!=null?u:0,f=(h=e.max)!=null?h:1,d=(b=e.step)!=null?b:1;return l!==i._v$&&k(t,i._v$=l),o!==i._v$2&&k(n,i._v$2=o),i._v$3=oe(n,r,i._v$3),a!==i._v$4&&k(s,i._v$4=a),c!==i._v$5&&I(s,"min",i._v$5=c),f!==i._v$6&&I(s,"max",i._v$6=f),d!==i._v$7&&I(s,"step",i._v$7=d),i},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0}),E(()=>s.value=e.signal[0]()),t})();Me(["input"]);const ct="_label_1lalj_1",F={label:ct},ft=p('<div class="flex flex-col gap-s+"><label><span>Bump angle&nbsp;<span class="text-fg-3">deg (<!>)</span></span></label><label><span>Top intensity&nbsp;<span class="text-fg-3"></span></span></label><label><span>Near contribution&nbsp;<span class="text-fg-3"></span></span></label><label><span>Far contribution&nbsp;<span class="text-fg-3"></span></span></label></div>'),ut=e=>(()=>{const t=ft.cloneNode(!0),n=t.firstChild,s=n.firstChild,i=s.firstChild,l=i.nextSibling,o=l.firstChild,r=o.nextSibling;r.nextSibling;const a=n.nextSibling,c=a.firstChild,f=c.firstChild,d=f.nextSibling,u=a.nextSibling,h=u.firstChild,b=h.firstChild,N=b.nextSibling,M=u.nextSibling,B=M.firstChild,Le=B.firstChild,Ie=Le.nextSibling;return g(l,()=>Math.round(e.i[0]()*45),o),g(l,()=>e.i[0](),r),g(n,v(H,{step:.01,get signal(){return e.i}}),null),g(d,()=>e.h[0]()),g(a,v(H,{step:.01,get signal(){return e.h}}),null),g(N,()=>e.a[0]()),g(u,v(H,{step:.01,get signal(){return e.a}}),null),g(Ie,()=>e.b[0]()),g(M,v(H,{step:.01,get signal(){return e.b}}),null),E(T=>{const re=F.label,ae=F.label,ce=F.label,fe=F.label;return re!==T._v$&&k(n,T._v$=re),ae!==T._v$2&&k(a,T._v$2=ae),ce!==T._v$3&&k(u,T._v$3=ce),fe!==T._v$4&&k(M,T._v$4=fe),T},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),t})(),ht=(e,t)=>{var l,o,r,a,c,f,d;let n=t.dark.s,s=t.dark.l,i=(l=t.dark.a)!=null?l:100;return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches&&(n=(r=(o=t.light)==null?void 0:o.s)!=null?r:n,s=(c=(a=t.light)==null?void 0:a.l)!=null?c:s,i=(d=(f=t.light)==null?void 0:f.a)!=null?d:i),`hsla(${e}, ${n}%, ${s}%, ${i}%)`},Ae={wrapp:{colors:{static:{abs:{base:{dark:{s:0,l:0}},on:[{dark:{s:10,l:100}}]},def:{base:{dark:{s:10,l:5}},on:[{dark:{s:10,l:90}},{dark:{s:20,l:80}},{dark:{s:20,l:60}},{dark:{s:20,l:40}},{dark:{s:10,l:10}}]},srf:{base:{dark:{s:40,l:20,a:10}},on:[{dark:{s:100,l:80}},{dark:{s:40,l:60}}]},srf2:{base:{dark:{s:40,l:40,a:20}},on:[{dark:{s:20,l:80}}]}},interactive:{int:{base:{dark:{s:100,l:60},light:{l:60}},on:[{dark:{s:100,l:10},light:{l:10}},{dark:{s:100,l:20},light:{l:10}},{dark:{s:100,l:40},light:{l:10}}]},int2:{base:{dark:{s:80,l:40,a:40},light:{s:90}},on:[{dark:{s:100,l:80}},{dark:{s:100,l:60}}]},int3:{base:{dark:{s:60,l:60,a:10}},on:[{dark:{s:10,l:80}}]},int4:{base:{dark:{s:20,l:20,a:20}},on:[{dark:{s:10,l:80}}]}}},sizes:{min:"1px",0:"0rem","s--":"0.2rem","s-":"0.4rem",s:"0.5rem","s+":"0.6rem","s++":"0.8rem",m0:"1rem","m--":"2rem","m-":"4rem",m:"5rem","m+":"6rem","m++":"8rem",l0:"10rem","l--":"20rem","l-":"40rem",l:"50rem","l+":"60rem","l++":"80rem",xl0:"100rem"}}},y=e=>e.filter(Boolean).join("-"),ee=(e,t,n,s,i)=>[i(y([e,t]),y([n,s])),i(y([e,"b",t]),y([n,"block",s])),i(y([e,"bs",t]),y([n,"block-start",s])),i(y([e,"be",t]),y([n,"block-end",s])),i(y([e,"i",t]),y([n,"inline",s])),i(y([e,"is",t]),y([n,"inline-start",s])),i(y([e,"ie",t]),y([n,"inline-end",s]))],te=e=>`hsla(var(--hue), var(--col-${e}-s), var(--col-${e}-l), var(--col-${e}-a));`,ne=e=>`hsl(var(--hue), var(--col-${e}-s), calc(var(--col-${e}-l) + var(--highlight)), var(--col-${e}-a));`,be=(e,t)=>[new RegExp(`^(${e})-(.+)$`),(n,{theme:s})=>{const i={};return s.wrapp.colors.static[n[2]]!==void 0&&(i[t]=te(n[2])),s.wrapp.colors.interactive[n[2]]!==void 0&&(i[t]=ne(n[2])),i}],dt=e=>[new RegExp(`^(${e})-(.+)$`),(t,{theme:n})=>{const s={},i=n.wrapp.colors.static[t[2]];i!==void 0&&(s.background=te(t[2]),i.on.forEach((o,r)=>{s[`--fg${r}`]=te(`on-${t[2]}-${r}`)}));const l=n.wrapp.colors.interactive[t[2]];return l!==void 0&&(s.background=ne(t[2]),l.on.forEach((o,r)=>{s[`--fg${r}`]=ne(`on-${t[2]}-${r}`)})),s.color="var(--fg0)",s}],me=(e,t)=>[new RegExp(`^(${e})-(.+)$`),(n,{theme:s})=>{const i={};return i[t]=`var(--fg${n[2]})`,i}],S=(e,t)=>[new RegExp(`^(${e})-(.+)$`),(n,{theme:s})=>{const i={};return i[t]=s.wrapp.sizes[n[2]],i}],K=(e,t,n,s)=>ee(e,t,n,s,S);[new RegExp("^(hue)-(.+)$"),dt("bg"),...ee("border","color","border","color",be),...ee("border","color-fg","border","color",me),be("text","color"),me("text-fg","color"),S("text","font-size"),S("width","width"),S("height","height"),S("min-width","min-width"),S("min-height","min-height"),...K("inset","","inset",""),...K("pd","","padding",""),...K("mg","","margin",""),S("round","border-radius"),S("gap","gap"),S("gap-col","column-gap"),S("gap-row","row-gap")];const gt=e=>Number(e.slice(0,-3))*parseFloat(getComputedStyle(document.documentElement).fontSize),xe=(e,t,n)=>e+(t-e)*n,Ne=e=>{let t=0;return e.map(n=>{const s=[n[0]-t,n[1]];return t+=s[0],s})},bt=(e,t)=>{let n=e[0][0];for(let s=0;s<e.length-1;++s)if(n+=e[s+1][0],t<n)return[e[s],e[s+1],n];return[e[e.length-2],e[e.length-1],n]},je=(e,t)=>{let[n,s,i]=bt(e,t),l=i-s[0],o=(t-l)/s[0];return xe(n[1],s[1],o)},mt=(e,t)=>{const n=Array(t).fill(1);for(let s=n.length-1;s>=1;--s){let i=je(e,(s-1)/(n.length-1));for(let l=s;l<n.length;++l)n[l]*=i;n[s-1]*=1-i}return n},Pe=(e,t,n)=>{const s=e.canvas.width,i=e.canvas.height;e.strokeStyle=n;const l=Ne(t);{e.beginPath();for(let o=0;o<s;++o){const r=je(l,o/s);e.lineTo(o,r*i)}e.stroke()}},vt=(e,t,n)=>{const i=Ne(t),l=mt(i,8),o=e.canvas.width,r=e.canvas.height;e.strokeStyle=n;for(let a=0;a<l.length-1;++a){const c=o/2,f=l[a],d=a/(l.length-1),u=Math.sin(d*Math.PI/2)*c*f,h=-Math.cos(d*Math.PI/2)*c*f,b=l[a+1],N=(a+1)/(l.length-1),M=Math.sin(N*Math.PI/2)*c*b,B=-Math.cos(N*Math.PI/2)*c*b;e.beginPath(),e.moveTo(o/2+u,r+h),e.lineTo(o/2+M,r+B),e.moveTo(o/2-u,r+h),e.lineTo(o/2-M,r+B),e.stroke()}},Re=e=>45+15*(1-e%3),L=e=>ht(Re(e),Ae.wrapp.colors.interactive.int.base),$t=p('<p style="user-select: all"></p>'),yt=p("<div>[<!>,<!>]</div>"),wt=e=>{const t=()=>s=>{s.clearRect(0,0,s.canvas.width,s.canvas.height);const i=s.canvas.width,l=s.canvas.height;s.fillStyle="#fff2",s.fillRect(0,0,i,1),s.fillRect(0,0,1,l);const[o,r]=e.shape;Pe(s,o(),L(e.colorI)),s.fillStyle="#fff";const a=gt(Ae.wrapp.sizes["s--"]);o().forEach(c=>{s==null||s.beginPath(),s==null||s.arc(c[0]*i,c[1]*l,a,0,Math.PI*2),s==null||s.fill()})},n=()=>({contextmenu:s=>{s.preventDefault()},mousedown:s=>{const i=s.target;if(!i)return;const[l,o]=e.shape;s.cancelBubble=!0,s.stopPropagation(),s.preventDefault();var r=s.target.getBoundingClientRect(),a=s.clientX-r.left,c=s.clientY-r.top;const f=[a/i.width,c/i.height];let d=!0;l().forEach((u,h)=>{if(Math.sqrt(Math.pow(u[0]-f[0],2)+Math.pow(u[1]-f[1],2))<.1){switch(s.button){case 0:h===0?f[0]=0:h===l().length-1&&(f[0]=1),o(b=>(b[h]=f,[...b]));break;case 2:h>0&&h<l().length-1&&o(b=>(b.splice(h,1),[...b]));break}d=!1}}),d&&s.button===0&&o(u=>[...u,f].sort((h,b)=>h[0]-b[0]))}});return[v(Z,{get render(){return t()},get eventListeners(){return n()}}),(()=>{const s=$t.cloneNode(!0);return g(s,()=>e.shape[0]().map(i=>(()=>{const l=yt.cloneNode(!0),o=l.firstChild,r=o.nextSibling,a=r.nextSibling,c=a.nextSibling;return c.nextSibling,g(l,()=>Math.round((i[0]+Number.EPSILON)*100)/100,r),g(l,()=>Math.round((i[1]+Number.EPSILON)*100)/100,c),l})())),s})()]},ve=(e,t,n,s,i)=>{const l=Math.pow(2*Math.pow(e,t)-1,2),r=(1+((c,f)=>(c-f*c)/(f-2*f*Math.abs(c)+1))(Math.pow(.5,1/t)-e,-1))/2,a=xe(i,s,r);return(1-l*(1-a))*n},_t=(e,t,n,s)=>{const i=e.canvas.width,l=e.canvas.height;e.strokeStyle=s,e.beginPath(),e.lineTo(0,t(0)*l);for(let o=1;o<n;++o){const r=o/(n-1),a=t(r);e.lineTo(r*i,a*l)}e.stroke()},pt=(e,t)=>{const n=Array(t).fill(1);for(let s=n.length-1;s>=1;--s){let i=e((s-1)/(n.length-1));for(let l=s;l<n.length;++l)n[l]*=i;n[s-1]*=1-i}return n},St=(e,t,n,s)=>{const i=e.canvas.width,l=e.canvas.height,o=pt(t,n);e.strokeStyle=s;for(let r=0;r<o.length-1;++r){const a=i/2,c=o[r],f=r/(o.length-1),d=Math.sin(f*Math.PI/2)*a*c,u=-Math.cos(f*Math.PI/2)*a*c,h=o[r+1],b=(r+1)/(o.length-1),N=Math.sin(b*Math.PI/2)*a*h,M=-Math.cos(b*Math.PI/2)*a*h;e.beginPath(),e.moveTo(i/2+d,l+u),e.lineTo(i/2+N,l+M),e.moveTo(i/2-d,l+u),e.lineTo(i/2-N,l+M),e.stroke()}},Ct=e=>{const t=e.canvas.width,n=e.canvas.height;e.fillStyle="#fff2",e.fillRect(0,0,t,1),e.fillRect(0,0,1,n)},kt=(e,t)=>{const n=e.canvas.width,s=e.canvas.height;e.strokeStyle="#fff2";for(let i=0;i<t;++i){const l=i/(t-1),o=n/2,r=Math.sin(l*Math.PI/2)*o,a=-Math.cos(l*Math.PI/2)*o;e.beginPath(),e.moveTo(n/2,s),e.lineTo(n/2+r,s+a),i>0&&(e.moveTo(n/2,s),e.lineTo(n/2-r,s+a)),e.stroke()}},Et="_canvasCard_12ikt_1",$e={canvasCard:Et},Mt=p('<div class="i-mdi-remove"></div>'),Tt=p('<div class="flex flex-col gap-s++ bg-srf pd-m0 round-m0 text-fg-1"><h3 class="text-fg-0 font-bold"></h3><div class="flex gap-s-"></div></div>'),At=p('<section class="flex flex-col items-stretch pd-m0 gap-s" style="overflow: scroll"></section>'),xt=p('<section class="bg-def text-fg-2 pd-m0" style="overflow: scroll"></section>'),Nt=e=>(()=>{const t=Tt.cloneNode(!0),n=t.firstChild,s=n.nextSibling;return g(n,()=>e.name),g(t,()=>e.children,s),g(s,v(J,{get onClick(){return e.onRemove},hue:0,class:"flex-1 round-m0 pd-m0",get children(){return Mt.cloneNode(!0)}})),E(i=>oe(t,`--hue: ${e.hue}`,i)),t})(),jt=e=>{const[t,n]=w([{type:"point-based",shape:w([[0,.6],[.2,.6],[.4,.6],[.6,.6],[.8,.6],[1,.6]])},{type:"point-based",shape:w([[0,.3],[.1,.8],[.2,.8],[.3,.8],[.4,.8],[.5,.8],[.6,.8],[.7,.8],[.8,.8],[.9,.8],[1,.8]])},{type:"point-based",shape:w([[0,.3],[.1,.8],[.5,.83],[.9,.8],[1,.7]])}]),s=()=>l=>{l.clearRect(0,0,l.canvas.width,l.canvas.height),Ct(l),t().forEach((o,r)=>{switch(o.type){case"mathematical":_t(l,a=>ve(a,o.i[0](),o.h[0](),o.a[0](),o.b[0]()),32,L(r));break;case"point-based":Pe(l,o.shape[0](),L(r));break}})},i=()=>l=>{l.clearRect(0,0,l.canvas.width,l.canvas.height),kt(l,8),t().forEach((o,r)=>{switch(o.type){case"mathematical":St(l,a=>ve(a,o.i[0](),o.h[0](),o.a[0](),o.b[0]()),8,L(r));break;case"point-based":vt(l,o.shape[0](),L(r));break}})};return v(Xe,{get path(){return e.path},class:"height-full flex items-stretch justify-center",get children(){return[(()=>{const l=At.cloneNode(!0);return g(l,()=>t().map((o,r)=>v(Nt,{get hue(){return Re(r)},get name(){return o.type},onRemove:()=>{n(a=>(a.splice(r,1),[...a]))},get children(){return(()=>{switch(o.type){case"mathematical":return v(ut,{get i(){return o.i},get h(){return o.h},get a(){return o.a},get b(){return o.b}});case"point-based":return v(wt,{get shape(){return o.shape},colorI:r})}})()}})),null),g(l,v(J,{onClick:()=>{n(o=>[...o,{type:"mathematical",i:w(.5),h:w(.9),a:w(.3),b:w(.8)}])},children:"Add mathematical"}),null),g(l,v(J,{onClick:()=>{n(o=>[...o,{type:"point-based",shape:w([[0,.5],[1,.5]])}])},children:"Add point-based"}),null),l})(),(()=>{const l=xt.cloneNode(!0);return g(l,v(Z,{get class(){return $e.canvasCard},get render(){return s()}}),null),g(l,v(Z,{get class(){return $e.canvasCard},get render(){return i()}}),null),l})()]}})},Pt=p('<main class="relative height-full" style="overflow: hidden"></main>'),Rt=()=>(Te.navigate("/visualizer"),(()=>{const e=Pt.cloneNode(!0);return g(e,v(jt,{path:"/visualizer"})),e})());Ue(()=>v(Rt,{}),document.body);