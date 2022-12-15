(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const w={};function Ae(e){w.context=e}const Ee=(e,t)=>e===t,U={equals:Ee};let fe=de;const E=1,F=2,ce={owned:null,cleanups:null,context:null,owner:null};var y=null;let P=null,v=null,$=null,C=null,Q=0;function ue(e,t){const n=v,s=y,i=e.length===0,l=i?ce:{owned:null,cleanups:null,context:null,owner:t||s},r=i?e:()=>e(()=>k(()=>J(l)));y=l,v=null;try{return I(r,!0)}finally{v=n,y=s}}function N(e,t){t=t?Object.assign({},U,t):U;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),he(n,i));return[ae.bind(n),s]}function x(e,t,n){const s=Y(e,t,!1,E);D(s)}function X(e,t,n){fe=Le;const s=Y(e,t,!1,E);s.user=!0,C?C.push(s):D(s)}function ie(e,t,n){n=n?Object.assign({},U,n):U;const s=Y(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,D(s),ae.bind(s)}function k(e){const t=v;v=null;try{return e()}finally{v=t}}function ae(){const e=P;if(this.sources&&(this.state||e))if(this.state===E||e)D(this);else{const t=$;$=null,I(()=>V(this),!1),$=t}if(v){const t=this.observers?this.observers.length:0;v.sources?(v.sources.push(this),v.sourceSlots.push(t)):(v.sources=[this],v.sourceSlots=[t]),this.observers?(this.observers.push(v),this.observerSlots.push(v.sources.length-1)):(this.observers=[v],this.observerSlots=[v.sources.length-1])}return this.value}function he(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&I(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],r=P&&P.running;r&&P.disposed.has(l),(r&&!l.tState||!r&&!l.state)&&(l.pure?$.push(l):C.push(l),l.observers&&ge(l)),r||(l.state=E)}if($.length>1e6)throw $=[],new Error},!1)),t}function D(e){if(!e.fn)return;J(e);const t=y,n=v,s=Q;v=y=e,Ne(e,e.value,s),v=n,y=t}function Ne(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=E),ve(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?he(e,s):e.value=s,e.updatedAt=n)}function Y(e,t,n,s=E,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:y,context:null,pure:n};return y===null||y!==ce&&(y.owned?y.owned.push(l):y.owned=[l]),l}function H(e){const t=P;if(e.state===0||t)return;if(e.state===F||t)return V(e);if(e.suspense&&k(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Q);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===E||t)D(e);else if(e.state===F||t){const i=$;$=null,I(()=>V(e,n[0]),!1),$=i}}function I(e,t){if($)return e();let n=!1;t||($=[]),C?n=!0:C=[],Q++;try{const s=e();return Pe(n),s}catch(s){$||(C=null),ve(s)}}function Pe(e){if($&&(de($),$=null),e)return;const t=C;C=null,t.length&&I(()=>fe(t),!1)}function de(e){for(let t=0;t<e.length;t++)H(e[t])}function Le(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:H(s)}for(w.context&&Ae(),t=0;t<n;t++)H(e[t])}function V(e,t){const n=P;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===E||n?i!==t&&H(i):(i.state===F||n)&&V(i,t))}}function ge(e){const t=P;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=F,s.pure?$.push(s):C.push(s),s.observers&&ge(s))}}function J(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),r=n.observerSlots.pop();s<i.length&&(l.sourceSlots[r]=s,i[s]=l,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)J(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Oe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function ve(e){throw e=Oe(e),e}function b(e,t){return k(()=>e(t||{}))}function De(e,t,n){let s=n.length,i=t.length,l=s,r=0,o=0,c=t[i-1].nextSibling,u=null;for(;r<i||o<l;){if(t[r]===n[o]){r++,o++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===r){const f=l<s?o?n[o-1].nextSibling:n[l-o]:c;for(;o<l;)e.insertBefore(n[o++],f)}else if(l===o)for(;r<i;)(!u||!u.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[l-1]&&n[o]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--l],f),t[i]=n[l]}else{if(!u){u=new Map;let a=o;for(;a<l;)u.set(n[a],a++)}const f=u.get(t[r]);if(f!=null)if(o<f&&f<l){let a=r,d=1,h;for(;++a<i&&a<l&&!((h=u.get(t[a]))==null||h!==f+d);)d++;if(d>f-o){const g=t[r];for(;o<f;)e.insertBefore(n[o++],g)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const le="_$DX_DELEGATE";function Ie(e,t,n,s={}){let i;return ue(l=>{i=l,t===document?e():_(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function T(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function je(e,t=window.document){const n=t[le]||(t[le]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,Re))}}function O(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function m(e,t){t==null?e.removeAttribute("class"):e.className=t}function Be(e,t,n){if(!t)return n?O(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function Z(e,t,n){return k(()=>e(t,n))}function _(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return W(e,t,s,n);x(i=>W(e,t(),i,n),s)}function Re(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),w.registry&&!w.done&&(w.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function W(e,t,n,s,i){for(w.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(w.context)return n;if(l==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=L(e,n,s,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(w.context)return n;n=L(e,n,s)}else{if(l==="function")return x(()=>{let o=t();for(;typeof o=="function";)o=o();n=W(e,o,n,s)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(K(o,t,n,i))return x(()=>n=W(e,o,n,s,!0)),()=>n;if(w.context){if(!o.length)return n;for(let u=0;u<o.length;u++)if(o[u].parentNode)return n=o}if(o.length===0){if(n=L(e,n,s),r)return n}else c?n.length===0?oe(e,o,s):De(e,n,o):(n&&L(e),oe(e,o));n=o}else if(t instanceof Node){if(w.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=L(e,n,s,t);L(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function K(e,t,n,s){let i=!1;for(let l=0,r=t.length;l<r;l++){let o=t[l],c=n&&n[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))i=K(e,o,c)||i;else if(typeof o=="function")if(s){for(;typeof o=="function";)o=o();i=K(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||i}else e.push(o),i=!0;else{const u=String(o);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return i}function oe(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function L(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(i!==o){const c=o.parentNode===e;!l&&!r?c?e.replaceChild(i,o):e.insertBefore(i,n):c&&o.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}const Ue=T("<section></section>"),_e=e=>{var a;const{route:t}=$e,n=(a=e.class)!=null?a:"absolute inset-0 flex flex-col items-stretch",s=()=>n+(l()?" animate-in":"")+(r()?" animate-out":""),i=()=>e.path.split("/").pop(),l=()=>t().firstDifferent[1]===i(),r=()=>t().firstDifferent[0]===i();let o=setTimeout(()=>{},0);const c=()=>{var h,g;let d=!1;return e.strict?d=t().current===e.path:d=t().current.startsWith(e.path),d?(h=e.onOpen)==null||h.call(e):(g=e.onClose)==null||g.call(e),d},[u,f]=N(!1);return X(()=>{c()?(f(!0),clearTimeout(o)):o=setTimeout(()=>{f(!1)},500)}),ie((()=>{const d=ie(()=>!!u());return()=>d()&&(()=>{const h=Ue.cloneNode(!0);return _(h,()=>e.children),x(()=>m(h,s())),h})()})())},Fe=e=>{let t=[];return e.split("/").forEach(n=>{n===".."?t.pop():t.push(n)}),`${t.join("/")}`},He=(e,t)=>{const n=e.split("/"),s=t.split("/"),i=Math.max(n.length,s.length);for(let l=0;l<i;++l)if(n[l]!=s[l])return[n[l],s[l]];return[void 0,void 0]},Ve=()=>{const[e,t]=N({previous:"/",current:"/",firstDifferent:[void 0,void 0]});return{route:e,navigate:s=>{const i=e().current,l=Fe(s);t({previous:i,current:l,firstDifferent:He(i,l)})}}},$e=ue(Ve),We="_bg_3nc5v_1",ke="_fill_3nc5v_23",qe="_slider_3nc5v_32",G={bg:We,fill:ke,slider:qe},Ge=T('<div><div></div><input type="range"></div>'),R=e=>(()=>{const t=Ge.cloneNode(!0),n=t.firstChild,s=n.nextSibling;return s.$$input=i=>{e.signal[1](Number(i.target.value))},x(i=>{var d,h,g;const l=G.bg,r=G.fill,o=`width: calc(${e.signal[0]()*100}%`,c=G.slider,u=(d=e.min)!=null?d:0,f=(h=e.max)!=null?h:1,a=(g=e.step)!=null?g:1;return l!==i._v$&&m(t,i._v$=l),r!==i._v$2&&m(n,i._v$2=r),i._v$3=Be(n,o,i._v$3),c!==i._v$4&&m(s,i._v$4=c),u!==i._v$5&&O(s,"min",i._v$5=u),f!==i._v$6&&O(s,"max",i._v$6=f),a!==i._v$7&&O(s,"step",i._v$7=a),i},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0}),x(()=>s.value=e.signal[0]()),t})();je(["input"]);const Ke=T("<div></div>"),re=e=>{const[t,n]=N(0);let s;return setTimeout(()=>{var l;n((l=s==null?void 0:s.offsetWidth)!=null?l:0)},1e3),(()=>{const l=Ke.cloneNode(!0),r=s;return typeof r=="function"?Z(r,l):s=l,_(l,()=>e.getChildren(t(),t())),x(()=>m(l,e.class)),l})()},Qe=T('<canvas style="transform: scaleY(-1)"></canvas>'),Xe=e=>{let t;return X(()=>{if(!t)return;let n=t.getContext("2d");if(!n)return;const s=e.width,i=e.height;t.width=s,t.height=i,n.clearRect(0,0,s,i),n.fillStyle="#fff2",n.fillRect(0,0,s,1),n.fillRect(0,1,1,i),n.strokeStyle="#fff",n.beginPath(),n.lineTo(0,e.shape(0)*i);for(let l=1;l<e.resolution;++l){const r=l/(e.resolution-1),o=e.shape(r);n.lineTo(r*s,o*i)}n.stroke()}),(()=>{const n=Qe.cloneNode(!0),s=t;return typeof s=="function"?Z(s,n):t=n,n})()},Ye=T("<canvas></canvas>"),Je=e=>{let t;const n=()=>{const s=Array(e.resolution).fill(1);for(let i=s.length-1;i>=1;--i){let l=e.shape((i-1)/(s.length-1));for(let r=i;r<s.length;++r)s[r]*=l;s[i-1]*=1-l}return s};return X(()=>{if(!t)return;let s=t.getContext("2d");if(!s)return;const i=e.width,l=e.height;t.width=i,t.height=l;const r=n();s.clearRect(0,0,i,l),s.strokeStyle="#fff2";for(let o=0;o<e.resolution;++o){const c=o/(e.resolution-1),u=i/2,f=Math.sin(c*Math.PI/2)*u,a=-Math.cos(c*Math.PI/2)*u;s.beginPath(),s.moveTo(i/2,l),s.lineTo(i/2+f,l+a),o>0&&(s.moveTo(i/2,l),s.lineTo(i/2-f,l+a)),s.stroke()}s.strokeStyle="#fff4",r.forEach((o,c)=>{if(!s)return;const u=c/(r.length-1),f=i/2,a=Math.sin(u*Math.PI/2)*f*o,d=-Math.cos(u*Math.PI/2)*f*o;s.beginPath(),s.moveTo(i/2,l),s.lineTo(i/2+a,l+d),c>0&&(s.moveTo(i/2,l),s.lineTo(i/2-a,l+d)),s.stroke()}),s.strokeStyle="#fff";for(let o=0;o<r.length-1;++o){const c=i/2,u=r[o],f=o/(r.length-1),a=Math.sin(f*Math.PI/2)*c*u,d=-Math.cos(f*Math.PI/2)*c*u,h=r[o+1],g=(o+1)/(r.length-1),M=Math.sin(g*Math.PI/2)*c*h,A=-Math.cos(g*Math.PI/2)*c*h;s.beginPath(),s.moveTo(i/2+a,l+d),s.lineTo(i/2+M,l+A),s.moveTo(i/2-a,l+d),s.lineTo(i/2-M,l+A),s.stroke()}}),(()=>{const s=Ye.cloneNode(!0),i=t;return typeof i=="function"?Z(i,s):t=s,x(l=>{const r=e.width,o=e.height;return r!==l._v$&&O(s,"width",l._v$=r),o!==l._v$2&&O(s,"height",l._v$2=o),l},{_v$:void 0,_v$2:void 0}),s})()},Ze=(e,t,n)=>e+(t-e)*n,ze="_grid_w0j2t_1",et="_panel_w0j2t_14",tt="_grid2_w0j2t_23",nt="_card_w0j2t_31",st="_label_w0j2t_49",S={grid:ze,panel:et,grid2:tt,card:nt,label:st},it=T('<div><label><span>Bump angle&nbsp;<span class="text-fg-3">deg (<!>)</span></span><span></span></label><label><span>Top intensity&nbsp;<span class="text-fg-3"></span></span></label><label><span>Near contribution&nbsp;<span class="text-fg-3"></span></span></label><label><span>Far contribution&nbsp;<span class="text-fg-3"></span></span></label></div>'),lt=T("<div><div><span>Curve</span></div><div><span>Scattering profile</span></div></div>"),ot=(e,t,n,s,i)=>{const l=Math.pow(2*Math.pow(e,t)-1,2),o=(1+((u,f)=>(u-f*u)/(f-2*f*Math.abs(u)+1))(Math.pow(.5,1/t)-e,-1))/2,c=Ze(i,s,o);return(1-l*(1-c))*n},rt=e=>{const[t,n]=N(.5),[s,i]=N(.9),[l,r]=N(.3),[o,c]=N(.8),u=()=>f=>ot(f,t(),s(),l(),o());return b(_e,{get path(){return e.path},get class(){return S.grid},get children(){return[(()=>{const f=it.cloneNode(!0),a=f.firstChild,d=a.firstChild,h=d.firstChild,g=h.nextSibling,M=g.firstChild,A=M.nextSibling;A.nextSibling;const be=d.nextSibling,j=a.nextSibling,me=j.firstChild,ye=me.firstChild,pe=ye.nextSibling,B=j.nextSibling,we=B.firstChild,xe=we.firstChild,Se=xe.nextSibling,q=B.nextSibling,Ce=q.firstChild,Te=Ce.firstChild,Me=Te.nextSibling;return _(g,()=>Math.round(t()*45),M),_(g,t,A),_(a,b(R,{step:.01,signal:[t,n]}),be),_(pe,s),_(j,b(R,{step:.01,signal:[s,i]}),null),_(Se,l),_(B,b(R,{step:.01,signal:[l,r]}),null),_(Me,o),_(q,b(R,{step:.01,signal:[o,c]}),null),x(p=>{const z=S.panel,ee=S.label,te=S.label,ne=S.label,se=S.label;return z!==p._v$&&m(f,p._v$=z),ee!==p._v$2&&m(a,p._v$2=ee),te!==p._v$3&&m(j,p._v$3=te),ne!==p._v$4&&m(B,p._v$4=ne),se!==p._v$5&&m(q,p._v$5=se),p},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),f})(),(()=>{const f=lt.cloneNode(!0),a=f.firstChild;a.firstChild;const d=a.nextSibling;return d.firstChild,_(a,b(re,{getChildren:(h,g)=>b(Xe,{width:h,height:g,get shape(){return u()},resolution:32})}),null),_(d,b(re,{getChildren:(h,g)=>b(Je,{width:h,height:g,get shape(){return u()},resolution:8})}),null),x(h=>{const g=S.grid2,M=S.card,A=S.card;return g!==h._v$6&&m(f,h._v$6=g),M!==h._v$7&&m(a,h._v$7=M),A!==h._v$8&&m(d,h._v$8=A),h},{_v$6:void 0,_v$7:void 0,_v$8:void 0}),f})()]}})},ft=T('<div class="flex items-center flex-col gap-m0">Coming soon...</div>'),ct=e=>b(_e,{get path(){return e.path},get children(){return ft.cloneNode(!0)}}),ut=T('<main class="relative height-full" style="overflow: hidden"></main>'),at=()=>($e.navigate("/mathematical"),(()=>{const e=ut.cloneNode(!0);return _(e,b(rt,{path:"/mathematical"}),null),_(e,b(ct,{path:"/curve-based"}),null),e})());Ie(()=>b(at,{}),document.body);