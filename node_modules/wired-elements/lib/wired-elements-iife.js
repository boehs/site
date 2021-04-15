var WiredElements=function(e){"use strict";const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${r}`);class o{constructor(e,t){this.parts=[],this.element=t;const i=[],r=[],o=document.createTreeWalker(t.content,133,null,!1);let d=0,c=-1,p=0;const{strings:u,values:{length:f}}=e;for(;p<f;){const e=o.nextNode();if(null!==e){if(c++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)a(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=u[p],i=h.exec(t)[2],s=i.toLowerCase()+"$lit$",r=e.getAttribute(s);e.removeAttribute(s);const o=r.split(n);this.parts.push({type:"attribute",index:c,name:i,strings:o}),p+=o.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,r=t.split(n),o=r.length-1;for(let t=0;t<o;t++){let i,n=r[t];if(""===n)i=l();else{const e=h.exec(n);null!==e&&a(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++c})}""===r[o]?(s.insertBefore(l(),e),i.push(e)):e.data=r[o],p+=o}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&c!==d||(c++,t.insertBefore(l(),e)),d=c,this.parts.push({type:"node",index:c}),null===e.nextSibling?e.data="":(i.push(e),c--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),p++}}else o.currentNode=r.pop()}for(const e of i)e.parentNode.removeChild(e)}}const a=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},d=e=>-1!==e.index,l=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(e,t){const{element:{content:i},parts:s}=e,r=document.createTreeWalker(i,133,null,!1);let n=u(s),o=s[n],a=-1,d=0;const l=[];let h=null;for(;r.nextNode();){a++;const e=r.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(l.push(e),null===h&&(h=e)),null!==h&&d++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-d,n=u(s,n),o=s[n]}l.forEach(e=>e.parentNode.removeChild(e))}const p=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},u=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(d(t))return i}return-1};const f=new WeakMap,g=e=>"function"==typeof e&&f.has(e),y={},b={};class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let n,o=0,a=0,l=r.nextNode();for(;o<s.length;)if(n=s[o],d(n)){for(;a<n.index;)a++,"TEMPLATE"===l.nodeName&&(i.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=i.pop(),l=r.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const m=` ${s} `;class w{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let n=0;n<e;n++){const e=this.strings[n],o=e.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===e.indexOf("--\x3e",o+1);const a=h.exec(e);t+=null===a?e+(i?m:r):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const x=e=>null===e||!("object"==typeof e||"function"==typeof e),k=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new R(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let s=0;s<t;s++){i+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(x(e)||!k(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class R{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===y||x(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=y,e(this)}this.value!==y&&this.committer.commit()}}class O{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}const e=this.__pendingValue;e!==y&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):k(e)?this.__commitIterable(e):e===b?(this.value=b,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const r of e)i=t[s],void 0===i&&(i=new O(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(r),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class C{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=y}}class z extends S{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends R{}let W=!1;(()=>{try{const e={get capture(){return W=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class P{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=M(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=y}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const M=e=>e&&(W?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function j(e){let t=I.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},I.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(s);return i=t.keyString.get(r),void 0===i&&(i=new o(e,e.getTemplateElement()),t.keyString.set(r,i)),t.stringsArray.set(e.strings,i),i}const I=new Map,$=new WeakMap;const N=new class{handleAttributeExpressions(e,t,i,s){const r=t[0];if("."===r){return new z(e,t.slice(1),i).parts}if("@"===r)return[new P(e,t.slice(1),s.eventContext)];if("?"===r)return[new C(e,t.slice(1),i)];return new S(e,t,i).parts}handleTextExpression(e){return new O(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const D=(e,...t)=>new w(e,t,"html",N),E=(e,t)=>`${e}--${t}`;let T=!0;void 0===window.ShadyCSS?T=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),T=!1);const A=e=>t=>{const i=E(t.type,e);let r=I.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},I.set(i,r));let n=r.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(s);if(n=r.keyString.get(a),void 0===n){const i=t.getTemplateElement();T&&window.ShadyCSS.prepareTemplateDom(i,e),n=new o(t,i),r.keyString.set(a,n)}return r.stringsArray.set(t.strings,n),n},L=["html","svg"],B=new Set,V=(e,t,i)=>{B.add(e);const s=i?i.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(s,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=r[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{L.forEach(t=>{const i=I.get(E(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),c(e,i)})})})(e);const a=s.content;i?function(e,t,i=null){const{element:{content:s},parts:r}=e;if(null==i)return void s.appendChild(t);const n=document.createTreeWalker(s,133,null,!1);let o=u(r),a=0,d=-1;for(;n.nextNode();){d++;for(n.currentNode===i&&(a=p(t),i.parentNode.insertBefore(t,i));-1!==o&&r[o].index===d;){if(a>0){for(;-1!==o;)r[o].index+=a,o=u(r,o);return}o=u(r,o)}}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const d=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),c(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const H={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},U=(e,t)=>t!==e&&(t==t||e==e),F={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:U};class q extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=F){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this._requestUpdate(e,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||F}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=U){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||H,r="function"==typeof s?s:s.fromAttribute;return r?r(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||H.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=F){const s=this.constructor,r=s._attributeNameForProperty(e,i);if(void 0!==r){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const s=this.constructor,r=s.getPropertyOptions(e);s._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}q.finalized=!0;const Y=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),G=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function J(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):G(e,t)}function K(e){return(t,i)=>{const s={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==i?X(s,t,i):Q(s,t)}}const X=(e,t,i)=>{Object.defineProperty(t,i,e)},Q=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),Z="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol();class te{constructor(e,t){if(t!==ee)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Z?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ie=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof te)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new te(i,ee)};(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const se={};class re extends q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=[e]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Z?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==se&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return se}}re.finalized=!0,re.render=(e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const r=s.scopeName,n=$.has(t),o=T&&11===t.nodeType&&!!t.host,a=o&&!B.has(r),d=a?document.createDocumentFragment():t;if(((e,t,s)=>{let r=$.get(t);void 0===r&&(i(t,t.firstChild),$.set(t,r=new O(Object.assign({templateFactory:j},s))),r.appendInto(t)),r.setValue(e),r.commit()})(e,d,Object.assign({templateFactory:A(r)},s)),a){const e=$.get(d);$.delete(d);const s=e.value instanceof v?e.value.template:void 0;V(r,d,s),i(t,t.firstChild),t.appendChild(d),$.set(t,e)}!n&&o&&window.ShadyCSS.styleElement(t.host)};var ne=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},oe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const ae=ie`
:host {
  opacity: 0;
}
:host(.wired-rendered) {
  opacity: 1;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  display: block;
}
path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
}
.hidden {
  display: none !important;
}
`;class de extends re{constructor(){super(...arguments),this.lastSize=[0,0],this.seed=Math.floor(Math.random()*2**31)}updated(e){this.wiredRender()}wiredRender(e=!1){if(this.svg){const t=this.canvasSize();if(!e&&t[0]===this.lastSize[0]&&t[1]===this.lastSize[1])return;for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);this.svg.setAttribute("width",""+t[0]),this.svg.setAttribute("height",""+t[1]),this.draw(this.svg,t),this.lastSize=t,this.classList.add("wired-rendered")}}}function le(e,t,i,s=!0,r=!0){if(t){const n={bubbles:"boolean"!=typeof s||s,composed:"boolean"!=typeof r||r};i&&(n.detail=i),e.dispatchEvent(new CustomEvent(t,n))}}function he(){return Math.floor(Math.random()*2**31)}function ce(e,t,i){if(e&&e.length){const[s,r]=t,n=Math.PI/180*i,o=Math.cos(n),a=Math.sin(n);e.forEach(e=>{const[t,i]=e;e[0]=(t-s)*o-(i-r)*a+s,e[1]=(t-s)*a+(i-r)*o+r})}}function pe(e){const t=e[0],i=e[1];return Math.sqrt(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2))}function ue(e,t,i,s){const r=t[1]-e[1],n=e[0]-t[0],o=r*e[0]+n*e[1],a=s[1]-i[1],d=i[0]-s[0],l=a*i[0]+d*i[1],h=r*d-a*n;return h?[(d*o-n*l)/h,(r*l-a*o)/h]:null}function fe(e,t,i){const s=e.length;if(s<3)return!1;const r=[Number.MAX_SAFE_INTEGER,i],n=[t,i];let o=0;for(let t=0;t<s;t++){const i=e[t],a=e[(t+1)%s];if(be(i,a,n,r)){if(0===ye(i,n,a))return ge(i,n,a);o++}}return o%2==1}function ge(e,t,i){return t[0]<=Math.max(e[0],i[0])&&t[0]>=Math.min(e[0],i[0])&&t[1]<=Math.max(e[1],i[1])&&t[1]>=Math.min(e[1],i[1])}function ye(e,t,i){const s=(t[1]-e[1])*(i[0]-t[0])-(t[0]-e[0])*(i[1]-t[1]);return 0===s?0:s>0?1:2}function be(e,t,i,s){const r=ye(e,t,i),n=ye(e,t,s),o=ye(i,s,e),a=ye(i,s,t);return r!==n&&o!==a||!(0!==r||!ge(e,i,t))||!(0!==n||!ge(e,s,t))||!(0!==o||!ge(i,e,s))||!(0!==a||!ge(i,t,s))}function ve(e,t){const i=[0,0],s=Math.round(t.hachureAngle+90);s&&ce(e,i,s);const r=function(e,t){const i=[...e];i[0].join(",")!==i[i.length-1].join(",")&&i.push([i[0][0],i[0][1]]);const s=[];if(i&&i.length>2){let e=t.hachureGap;e<0&&(e=4*t.strokeWidth),e=Math.max(e,.1);const r=[];for(let e=0;e<i.length-1;e++){const t=i[e],s=i[e+1];if(t[1]!==s[1]){const e=Math.min(t[1],s[1]);r.push({ymin:e,ymax:Math.max(t[1],s[1]),x:e===t[1]?t[0]:s[0],islope:(s[0]-t[0])/(s[1]-t[1])})}}if(r.sort((e,t)=>e.ymin<t.ymin?-1:e.ymin>t.ymin?1:e.x<t.x?-1:e.x>t.x?1:e.ymax===t.ymax?0:(e.ymax-t.ymax)/Math.abs(e.ymax-t.ymax)),!r.length)return s;let n=[],o=r[0].ymin;for(;n.length||r.length;){if(r.length){let e=-1;for(let t=0;t<r.length&&!(r[t].ymin>o);t++)e=t;r.splice(0,e+1).forEach(e=>{n.push({s:o,edge:e})})}if(n=n.filter(e=>!(e.edge.ymax<=o)),n.sort((e,t)=>e.edge.x===t.edge.x?0:(e.edge.x-t.edge.x)/Math.abs(e.edge.x-t.edge.x)),n.length>1)for(let e=0;e<n.length;e+=2){const t=e+1;if(t>=n.length)break;const i=n[e].edge,r=n[t].edge;s.push([[Math.round(i.x),o],[Math.round(r.x),o]])}o+=e,n.forEach(t=>{t.edge.x=t.edge.x+e*t.edge.islope})}}return s}(e,t);return s&&(ce(e,i,-s),function(e,t,i){const s=[];e.forEach(e=>s.push(...e)),ce(s,t,i)}(r,i,-s)),r}ne([K("svg"),oe("design:type",SVGSVGElement)],de.prototype,"svg",void 0);class me extends class{constructor(e){this.helper=e}fillPolygon(e,t){return this._fillPolygon(e,t)}_fillPolygon(e,t,i=!1){let s=ve(e,t);if(i){const t=this.connectingLines(e,s);s=s.concat(t)}return{type:"fillSketch",ops:this.renderLines(s,t)}}renderLines(e,t){const i=[];for(const s of e)i.push(...this.helper.doubleLineOps(s[0][0],s[0][1],s[1][0],s[1][1],t));return i}connectingLines(e,t){const i=[];if(t.length>1)for(let s=1;s<t.length;s++){const r=t[s-1];if(pe(r)<3)continue;const n=[t[s][0],r[1]];if(pe(n)>3){const t=this.splitOnIntersections(e,n);i.push(...t)}}return i}midPointInPolygon(e,t){return fe(e,(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2)}splitOnIntersections(e,t){const i=Math.max(5,.1*pe(t)),s=[];for(let r=0;r<e.length;r++){const n=e[r],o=e[(r+1)%e.length];if(be(n,o,...t)){const e=ue(n,o,t[0],t[1]);if(e){const r=pe([e,t[0]]),n=pe([e,t[1]]);r>i&&n>i&&s.push({point:e,distance:r})}}}if(s.length>1){const i=s.sort((e,t)=>e.distance-t.distance).map(e=>e.point);if(fe(e,...t[0])||i.shift(),fe(e,...t[1])||i.pop(),i.length<=1)return this.midPointInPolygon(e,t)?[t]:[];const r=[t[0],...i,t[1]],n=[];for(let t=0;t<r.length-1;t+=2){const i=[r[t],r[t+1]];this.midPointInPolygon(e,i)&&n.push(i)}return n}return this.midPointInPolygon(e,t)?[t]:[]}}{fillPolygon(e,t){return this._fillPolygon(e,t,!0)}}class we{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function xe(e,t,i,s,r){return{type:"path",ops:_e(e,t,i,s,r)}}function ke(e,t){return function(e,t,i){const s=(e||[]).length;if(s>2){const t=[];for(let r=0;r<s-1;r++)t.push(..._e(e[r][0],e[r][1],e[r+1][0],e[r+1][1],i));return t.push(..._e(e[s-1][0],e[s-1][1],e[0][0],e[0][1],i)),{type:"path",ops:t}}return 2===s?xe(e[0][0],e[0][1],e[1][0],e[1][1],i):{type:"path",ops:[]}}(e,0,t)}function Se(e,t,i,s,r){return function(e,t,i,s){const[r,n]=Me(s.increment,e,t,s.rx,s.ry,1,s.increment*Ce(.1,Ce(.4,1,i),i),i);let o=Pe(r,null,i);if(!i.disableMultiStroke){const[r]=Me(s.increment,e,t,s.rx,s.ry,1.5,0,i),n=Pe(r,null,i);o=o.concat(n)}return{estimatedPoints:n,opset:{type:"path",ops:o}}}(e,t,r,Re(i,s,r)).opset}function Re(e,t,i){const s=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(e/2,2)+Math.pow(t/2,2))/2)),r=Math.max(i.curveStepCount,i.curveStepCount/Math.sqrt(200)*s),n=2*Math.PI/r;let o=Math.abs(e/2),a=Math.abs(t/2);const d=1-i.curveFitting;return o+=ze(o*d,i),a+=ze(a*d,i),{increment:n,rx:o,ry:a}}function Oe(e){return e.randomizer||(e.randomizer=new we(e.seed||0)),e.randomizer.next()}function Ce(e,t,i,s=1){return i.roughness*s*(Oe(i)*(t-e)+e)}function ze(e,t,i=1){return Ce(-e,e,t,i)}function _e(e,t,i,s,r,n=!1){const o=n?r.disableMultiStrokeFill:r.disableMultiStroke,a=We(e,t,i,s,r,!0,!1);if(o)return a;const d=We(e,t,i,s,r,!0,!0);return a.concat(d)}function We(e,t,i,s,r,n,o){const a=Math.pow(e-i,2)+Math.pow(t-s,2),d=Math.sqrt(a);let l=1;l=d<200?1:d>500?.4:-.0016668*d+1.233334;let h=r.maxRandomnessOffset||0;h*h*100>a&&(h=d/10);const c=h/2,p=.2+.2*Oe(r);let u=r.bowing*r.maxRandomnessOffset*(s-t)/200,f=r.bowing*r.maxRandomnessOffset*(e-i)/200;u=ze(u,r,l),f=ze(f,r,l);const g=[],y=()=>ze(c,r,l),b=()=>ze(h,r,l);return n&&(o?g.push({op:"move",data:[e+y(),t+y()]}):g.push({op:"move",data:[e+ze(h,r,l),t+ze(h,r,l)]})),o?g.push({op:"bcurveTo",data:[u+e+(i-e)*p+y(),f+t+(s-t)*p+y(),u+e+2*(i-e)*p+y(),f+t+2*(s-t)*p+y(),i+y(),s+y()]}):g.push({op:"bcurveTo",data:[u+e+(i-e)*p+b(),f+t+(s-t)*p+b(),u+e+2*(i-e)*p+b(),f+t+2*(s-t)*p+b(),i+b(),s+b()]}),g}function Pe(e,t,i){const s=e.length,r=[];if(s>3){const n=[],o=1-i.curveTightness;r.push({op:"move",data:[e[1][0],e[1][1]]});for(let t=1;t+2<s;t++){const i=e[t];n[0]=[i[0],i[1]],n[1]=[i[0]+(o*e[t+1][0]-o*e[t-1][0])/6,i[1]+(o*e[t+1][1]-o*e[t-1][1])/6],n[2]=[e[t+1][0]+(o*e[t][0]-o*e[t+2][0])/6,e[t+1][1]+(o*e[t][1]-o*e[t+2][1])/6],n[3]=[e[t+1][0],e[t+1][1]],r.push({op:"bcurveTo",data:[n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]]})}if(t&&2===t.length){const e=i.maxRandomnessOffset;r.push({op:"lineTo",data:[t[0]+ze(e,i),t[1]+ze(e,i)]})}}else 3===s?(r.push({op:"move",data:[e[1][0],e[1][1]]}),r.push({op:"bcurveTo",data:[e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1]]})):2===s&&r.push(..._e(e[0][0],e[0][1],e[1][0],e[1][1],i));return r}function Me(e,t,i,s,r,n,o,a){const d=[],l=[],h=ze(.5,a)-Math.PI/2;l.push([ze(n,a)+t+.9*s*Math.cos(h-e),ze(n,a)+i+.9*r*Math.sin(h-e)]);for(let o=h;o<2*Math.PI+h-.01;o+=e){const e=[ze(n,a)+t+s*Math.cos(o),ze(n,a)+i+r*Math.sin(o)];d.push(e),l.push(e)}return l.push([ze(n,a)+t+s*Math.cos(h+2*Math.PI+.5*o),ze(n,a)+i+r*Math.sin(h+2*Math.PI+.5*o)]),l.push([ze(n,a)+t+.98*s*Math.cos(h+o),ze(n,a)+i+.98*r*Math.sin(h+o)]),l.push([ze(n,a)+t+.9*s*Math.cos(h+.5*o),ze(n,a)+i+.9*r*Math.sin(h+.5*o)]),[l,d]}const je={randOffset:(e,t)=>e,randOffsetWithRange:(e,t,i)=>(e+t)/2,ellipse:(e,t,i,s,r)=>Se(e,t,i,s,r),doubleLineOps:(e,t,i,s,r)=>function(e,t,i,s,r){return _e(e,t,i,s,r,!0)}(e,t,i,s,r)};function Ie(e){return{maxRandomnessOffset:2,roughness:1,bowing:.85,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:3.5,hachureAngle:-41,hachureGap:5,dashOffset:-1,dashGap:-1,zigzagOffset:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1,seed:e}}function $e(e,t){let i="";for(const s of e.ops){const e=s.data;switch(s.op){case"move":if(t&&i)break;i+=`M${e[0]} ${e[1]} `;break;case"bcurveTo":i+=`C${e[0]} ${e[1]}, ${e[2]} ${e[3]}, ${e[4]} ${e[5]} `;break;case"lineTo":i+=`L${e[0]} ${e[1]} `}}return i.trim()}function Ne(e,t){const i=document.createElementNS("http://www.w3.org/2000/svg",e);if(t)for(const e in t)i.setAttributeNS(null,e,t[e]);return i}function De(e,t,i=!1){const s=Ne("path",{d:$e(e,i)});return t&&t.appendChild(s),s}function Ee(e,t,i,s,r,n){return De(function(e,t,i,s,r){return ke([[e,t],[e+i,t],[e+i,t+s],[e,t+s]],r)}(t+2,i+2,s-4,r-4,Ie(n)),e)}function Te(e,t,i,s,r,n){return De(xe(t,i,s,r,Ie(n)),e)}function Ae(e,t,i,s,r,n){return De(Se(t,i,s=Math.max(s>10?s-4:s-1,1),r=Math.max(r>10?r-4:r-1,1),Ie(n)),e)}function Le(e,t){return De(new me(je).fillPolygon(e,Ie(t)),null)}function Be(e,t,i,s,r){const n=Re(i,s,Ie(r)),o=[];let a=0;for(;a<=2*Math.PI;)o.push([e+n.rx*Math.cos(a),t+n.ry*Math.sin(a)]),a+=n.increment;return Le(o,r)}var Ve=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},He=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredButton=class extends de{constructor(){super(),this.elevation=1,this.disabled=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender(!0)}))}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
      `]}render(){return D`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}focus(){this.button?this.button.focus():super.focus()}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0]-2*(i-1),height:t[1]-2*(i-1)};Ee(e,0,0,s.width,s.height,this.seed);for(let t=1;t<i;t++)Te(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Te(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100,Te(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Te(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.button&&this.resizeObserver&&this.resizeObserver.observe&&this.resizeObserver.observe(this.button)}detachResizeListener(){this.button&&this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this.button)}},Ve([J({type:Number}),He("design:type",Object)],e.WiredButton.prototype,"elevation",void 0),Ve([J({type:Boolean,reflect:!0}),He("design:type",Object)],e.WiredButton.prototype,"disabled",void 0),Ve([K("button"),He("design:type",HTMLButtonElement)],e.WiredButton.prototype,"button",void 0),e.WiredButton=Ve([Y("wired-button"),He("design:paramtypes",[])],e.WiredButton);var Ue=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Fe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredCalendar=class extends re{constructor(){super(...arguments),this.elevation=3,this.disabled=!1,this.initials=!1,this.format=e=>this.months_short[e.getMonth()]+" "+e.getDate()+", "+e.getFullYear(),this.weekdays_short=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],this.months=["January","February","March","April","May","June","July","August","September","October","November","December"],this.months_short=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],this.firstOfMonthDate=new Date,this.fDate=void 0,this.lDate=void 0,this.calendarRefSize={width:0,height:0},this.tblColWidth=0,this.tblRowHeight=0,this.tblHeadHeight=0,this.monthYear="",this.weeks=[[]],this.seed=he()}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.resized.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler,{passive:!0})),this.localizeCalendarHeaders(),this.setInitialConditions(),this.computeCalendar(),this.refreshSelection(),setTimeout(()=>this.updated())}disconnectedCallback(){super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}static get styles(){return ie`
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    svg {
      display: block;
    }

    .calendar path {
      stroke: var(--wired-calendar-color, black);
      stroke-width: 0.7;
      fill: transparent;
    }

    .selected path {
      stroke: var(--wired-calendar-selected-color, red);
      stroke-width: 2.5;
      fill: transparent;
      transition: transform 0.05s ease;
    }

    table {
      position: relative;
      background: var(--wired-calendar-bg, white);
      border-collapse: collapse;
      font-size: inherit;
      text-transform: capitalize;
      line-height: unset;
      cursor: default;
      overflow: hidden;
    }

    table:focus {
      outline: none !important;
    }

    td,
    th {
      border-radius: 4px;
      text-align: center;
    }

    td.disabled {
      color: var(--wired-calendar-disabled-color, lightgray);
      cursor: not-allowed;
    }

    td.dimmed {
      color: var(--wired-calendar-dimmed-color, gray);
    }

    td.selected {
      position: absolute;
    }

    td:not(.disabled):not(.selected):hover {
      background-color: #d0d0d0;
      cursor: pointer;
    }

    .pointer {
      cursor: pointer;
    }

    `}render(){return D`
    <table style="width:${this.calendarRefSize.width}px;height:${this.calendarRefSize.height}px;border:${8}px solid transparent"
            @mousedown="${this.onItemClick}"
            @touchstart="${this.onItemClick}">
      ${""}
      <tr class="top-header" style="height:${this.tblHeadHeight}px;">
        <th id="prevCal" class="pointer" @click="${this.onPrevClick}">&lt;&lt;</th>
        <th colSpan="5">${this.monthYear}</th>
        <th id="nextCal" class="pointer" @click="${this.onNextClick}">&gt;&gt;</th>
      </tr>
      ${""}
      <tr class="header" style="height:${this.tblHeadHeight}px;">
        ${this.weekdays_short.map(e=>D`<th style="width: ${this.tblColWidth};">${this.initials?e[0]:e}</th>
            `)}
      </tr>
      ${""}
      ${this.weeks.map(e=>D`<tr style="height:${this.tblRowHeight}px;">
              ${""}
              ${e.map(e=>D`${e.selected?D`
                            <td class="selected" value="${e.value}">
                            <div style="width: ${this.tblColWidth}px; line-height:${this.tblRowHeight}px;">${e.text}</div>
                            <div class="overlay">
                              <svg id="svgTD" class="selected"></svg>
                            </div></td>
                        `:D`
                            <td .className="${e.disabled?"disabled":e.dimmed?"dimmed":""}"
                                value="${e.disabled?"":e.value}">${e.text}</td>
                        `}
                    `)}${""}
            </tr>`)}${""}
    </table>
    <div class="overlay">
      <svg id="svg" class="calendar"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","dialog")}updated(e){e&&e instanceof Map&&(e.has("disabled")&&this.refreshDisabledState(),e.has("selected")&&this.refreshSelection());const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.getCalendarSize(),s=Math.min(Math.max(1,this.elevation),5),r=i.width+2*(s-1),n=i.height+2*(s-1);t.setAttribute("width",""+r),t.setAttribute("height",""+n),Ee(t,2,2,i.width-4,i.height-4,this.seed);for(let e=1;e<s;e++)Te(t,2*e,i.height-4+2*e,i.width-4+2*e,i.height-4+2*e,this.seed).style.opacity=""+(85-10*e)/100,Te(t,i.width-4+2*e,i.height-4+2*e,i.width-4+2*e,2*e,this.seed).style.opacity=""+(85-10*e)/100,Te(t,2*e,i.height-4+2*e,i.width-4+2*e,i.height-4+2*e,this.seed).style.opacity=""+(85-10*e)/100,Te(t,i.width-4+2*e,i.height-4+2*e,i.width-4+2*e,2*e,this.seed).style.opacity=""+(85-10*e)/100;const o=this.shadowRoot.getElementById("svgTD");if(o){for(;o.hasChildNodes();)o.removeChild(o.lastChild);const e=Math.max(1*this.tblColWidth,20),t=Math.max(.9*this.tblRowHeight,18),i=Ae(o,this.tblColWidth/2,this.tblRowHeight/2,e,t,this.seed);o.appendChild(i)}this.classList.add("wired-rendered")}setSelectedDate(e){if(this.selected=e,this.selected){const e=new Date(this.selected);this.firstOfMonthDate=new Date(e.getFullYear(),e.getMonth(),1),this.computeCalendar(),this.requestUpdate(),this.fireSelected()}}localizeCalendarHeaders(){if(!this.locale){const e=navigator;e.hasOwnProperty("systemLanguage")?this.locale=e.systemLanguage:e.hasOwnProperty("browserLanguage")?this.locale=e.browserLanguage:this.locale=(navigator.languages||["en"])[0]}const e=(this.locale||"").toLowerCase();if("en-us"!==e&&"en"!==e){const e=new Date,t=e.getUTCDay(),i=new Date(e.getTime()-864e5*t);for(let e=0;e<7;e++){const t=new Date(i);t.setDate(i.getDate()+e),this.weekdays_short[e]=t.toLocaleString(this.locale,{weekday:"short"})}e.setDate(1);for(let t=0;t<12;t++)e.setMonth(t),this.months[t]=e.toLocaleString(this.locale,{month:"long"})}}setInitialConditions(){let e;this.calendarRefSize=this.getCalendarSize(),this.selected?(e=new Date(this.selected),this.value={date:new Date(this.selected),text:this.selected}):e=new Date,this.firstOfMonthDate=new Date(e.getFullYear(),e.getMonth(),1),this.firstdate&&(this.fDate=new Date(this.firstdate)),this.lastdate&&(this.lDate=new Date(this.lastdate))}refreshSelection(){this.weeks.forEach(e=>e.forEach(e=>{e.selected=this.selected&&e.value===this.selected||!1})),this.requestUpdate()}resized(){this.calendarRefSize=this.getCalendarSize(),this.computeCalendar(),this.refreshSelection()}getCalendarSize(){const e=this.getBoundingClientRect();return{width:e.width>180?e.width:320,height:e.height>180?e.height:320}}computeCellsizes(e,t){this.tblColWidth=e.width/7-2,this.tblHeadHeight=.25*e.height/2-2,this.tblRowHeight=.75*e.height/t-2}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}onItemClick(e){e.stopPropagation();const t=e.target;t&&t.hasAttribute("value")&&""!==t.getAttribute("value")&&(this.selected=t.getAttribute("value")||void 0,this.refreshSelection(),this.fireSelected())}fireSelected(){this.selected&&(this.value={date:new Date(this.selected),text:this.selected},le(this,"selected",{selected:this.selected}))}computeCalendar(){this.monthYear=this.months[this.firstOfMonthDate.getMonth()]+" "+this.firstOfMonthDate.getFullYear();const e=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth(),1);let t=0-e.getDay();const i=Math.ceil((new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,0).getDate()-t)/7);this.weeks=[];for(let s=0;s<i;s++){this.weeks[s]=[];for(let i=0;i<7;i++){const r=new Date(e.getTime()+864e5*t),n=this.format(r);this.weeks[s][i]={value:n,text:r.getDate().toString(),selected:n===this.selected,dimmed:r.getMonth()!==e.getMonth(),disabled:this.isDateOutOfRange(r)},t++}}this.computeCellsizes(this.calendarRefSize,i)}onPrevClick(){void 0!==this.fDate&&new Date(this.fDate.getFullYear(),this.fDate.getMonth()-1,1).getMonth()===new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1),this.computeCalendar(),this.refreshSelection())}onNextClick(){void 0!==this.lDate&&new Date(this.lDate.getFullYear(),this.lDate.getMonth()+1,1).getMonth()===new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1),this.computeCalendar(),this.refreshSelection())}isDateOutOfRange(e){return this.fDate&&this.lDate?e<this.fDate||this.lDate<e:this.fDate?e<this.fDate:!!this.lDate&&this.lDate<e}debounce(e,t,i,s){let r=0;return()=>{const n=arguments,o=i&&!r;clearTimeout(r),r=window.setTimeout(()=>{r=0,i||e.apply(s,n)},t),o&&e.apply(s,n)}}},Ue([J({type:Number}),Fe("design:type",Object)],e.WiredCalendar.prototype,"elevation",void 0),Ue([J({type:String}),Fe("design:type",String)],e.WiredCalendar.prototype,"selected",void 0),Ue([J({type:String}),Fe("design:type",String)],e.WiredCalendar.prototype,"firstdate",void 0),Ue([J({type:String}),Fe("design:type",String)],e.WiredCalendar.prototype,"lastdate",void 0),Ue([J({type:String}),Fe("design:type",String)],e.WiredCalendar.prototype,"locale",void 0),Ue([J({type:Boolean,reflect:!0}),Fe("design:type",Object)],e.WiredCalendar.prototype,"disabled",void 0),Ue([J({type:Boolean,reflect:!0}),Fe("design:type",Object)],e.WiredCalendar.prototype,"initials",void 0),Ue([J({type:Object}),Fe("design:type",Object)],e.WiredCalendar.prototype,"value",void 0),Ue([J({type:Function}),Fe("design:type",Function)],e.WiredCalendar.prototype,"format",void 0),e.WiredCalendar=Ue([Y("wired-calendar")],e.WiredCalendar);var qe=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Ye=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredCard=class extends de{constructor(){super(),this.elevation=1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
        path.cardFill {
          stroke-width: 3.5;
          stroke: var(--wired-card-background-fill);
        }
        path {
          stroke: var(--wired-card-background-fill, currentColor);
        }
      `]}render(){return D`
    <div id="overlay"><svg></svg></div>
    <div style="position: relative;">
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    `}updated(e){const t=e.has("fill");this.wiredRender(t),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),r=t[1]-2*(i-1);if(this.fill&&this.fill.trim()){const t=Le([[2,2],[s-4,2],[s-2,r-4],[2,r-4]],this.seed);t.classList.add("cardFill"),e.style.setProperty("--wired-card-background-fill",this.fill.trim()),e.appendChild(t)}Ee(e,2,2,s-4,r-4,this.seed);for(let t=1;t<i;t++)Te(e,2*t,r-4+2*t,s-4+2*t,r-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Te(e,s-4+2*t,r-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Te(e,2*t,r-4+2*t,s-4+2*t,r-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Te(e,s-4+2*t,r-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}},qe([J({type:Number}),Ye("design:type",Object)],e.WiredCard.prototype,"elevation",void 0),qe([J({type:String}),Ye("design:type",String)],e.WiredCard.prototype,"fill",void 0),e.WiredCard=qe([Y("wired-card"),Ye("design:paramtypes",[])],e.WiredCard);var Ge=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Je=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredCheckbox=class extends de{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[ae,ie`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-checkbox-icon-color, currentColor);
        stroke-width: var(--wired-checkbox-default-swidth, 0.7);
      }
      g path {
        stroke-width: 2.5;
      }
      #container.focused {
        --wired-checkbox-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return D`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),le(this,"change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Ee(e,0,0,t[0],t[1],this.seed),this.svgCheck=Ne("g"),e.appendChild(this.svgCheck),Te(this.svgCheck,.3*t[0],.4*t[1],.5*t[0],.7*t[1],this.seed),Te(this.svgCheck,.5*t[0],.7*t[1],t[0]+5,-5,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}},Ge([J({type:Boolean}),Je("design:type",Object)],e.WiredCheckbox.prototype,"checked",void 0),Ge([J({type:Boolean,reflect:!0}),Je("design:type",Object)],e.WiredCheckbox.prototype,"disabled",void 0),Ge([J(),Je("design:type",Object)],e.WiredCheckbox.prototype,"focused",void 0),Ge([K("input"),Je("design:type",HTMLInputElement)],e.WiredCheckbox.prototype,"input",void 0),e.WiredCheckbox=Ge([Y("wired-checkbox")],e.WiredCheckbox);var Ke=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Xe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredCombo=class extends re{constructor(){super(...arguments),this.disabled=!1,this.seed=he(),this.cardShowing=!1,this.itemNodes=[]}static get styles(){return ie`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        outline: none;
        opacity: 0;
      }
    
      :host(.wired-disabled) {
        opacity: 0.5 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.02);
      }
      
      :host(.wired-rendered) {
        opacity: 1;
      }
  
      :host(:focus) path {
        stroke-width: 1.5;
      }
    
      #container {
        white-space: nowrap;
        position: relative;
      }
    
      .inline {
        display: inline-block;
        vertical-align: top
      }
    
      #textPanel {
        min-width: 90px;
        min-height: 18px;
        padding: 8px;
      }
    
      #dropPanel {
        width: 34px;
        cursor: pointer;
      }
    
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    
      svg {
        display: block;
      }
    
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
      }
    
      #card {
        display: block;
        position: absolute;
        background: var(--wired-combo-popup-bg, white);
        z-index: 1;
        box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
        padding: 8px;
      }
  
      ::slotted(wired-item) {
        display: block;
      }
    `}render(){return D`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value&&this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}" style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break;case 27:e.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:e.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:e.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.svg;for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();t.setAttribute("width",""+i.width),t.setAttribute("height",""+i.height);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",Ee(t,0,0,s.width,s.height,this.seed);const r=s.width-4;Ee(t,r,0,34,s.height,this.seed);const n=Math.max(0,Math.abs((s.height-24)/2)),o=function(e,t,i){return De(ke(t,Ie(i)),e,!0)}(t,[[r+8,5+n],[r+26,5+n],[r+17,n+Math.min(s.height,18)]],this.seed);if(o.style.fill="currentColor",o.style.pointerEvents=this.disabled?"none":"auto",o.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",""+this.cardShowing),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||s.getAttribute("value")||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}setCardShowing(e){this.card&&(this.cardShowing=e,this.card.style.display=e?"":"none",e&&setTimeout(()=>{this.shadowRoot.getElementById("slot").assignedNodes().filter(e=>e.nodeType===Node.ELEMENT_NODE).forEach(e=>{const t=e;t.requestUpdate&&t.requestUpdate()})},10),this.setAttribute("aria-expanded",""+this.cardShowing))}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){le(this,"selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(e){e.stopPropagation(),this.setCardShowing(!this.cardShowing)}},Ke([J({type:Object}),Xe("design:type",Object)],e.WiredCombo.prototype,"value",void 0),Ke([J({type:String,reflect:!0}),Xe("design:type",String)],e.WiredCombo.prototype,"selected",void 0),Ke([J({type:Boolean,reflect:!0}),Xe("design:type",Object)],e.WiredCombo.prototype,"disabled",void 0),Ke([K("svg"),Xe("design:type",SVGSVGElement)],e.WiredCombo.prototype,"svg",void 0),Ke([K("#card"),Xe("design:type",HTMLDivElement)],e.WiredCombo.prototype,"card",void 0),e.WiredCombo=Ke([Y("wired-combo")],e.WiredCombo);var Qe=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Ze=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredDialog=class extends re{constructor(){super(...arguments),this.elevation=5,this.open=!1}static get styles(){return ie`
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: var(--wired-dialog-z-index, 100);
      }
      #container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      #overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transform: translateY(150px);
        transition: transform 0.5s ease, opacity 0.5s ease;
      }
      .layout.vertical {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      }
      .flex {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
      wired-card {
        display: inline-block;
        background: white;
        text-align: left;
      }

      :host([open]) #container {
        pointer-events: auto;
      }
      :host([open]) #container::before {
        opacity: 1;
      }
      :host([open]) #overlay {
        opacity: 1;
        transform: none;
      }
    `}render(){return D`
    <div id="container">
      <div id="overlay" class="vertical layout">
        <div class="flex"></div>
        <div style="text-align: center; padding: 5px;">
          <wired-card .elevation="${this.elevation}"><slot></slot></wired-card>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    `}updated(){this.card&&this.card.wiredRender(!0)}},Qe([J({type:Number}),Ze("design:type",Object)],e.WiredDialog.prototype,"elevation",void 0),Qe([J({type:Boolean,reflect:!0}),Ze("design:type",Object)],e.WiredDialog.prototype,"open",void 0),Qe([K("wired-card"),Ze("design:type",e.WiredCard)],e.WiredDialog.prototype,"card",void 0),e.WiredDialog=Qe([Y("wired-dialog")],e.WiredDialog);var et=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},tt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredDivider=class extends de{constructor(){super(...arguments),this.elevation=1}static get styles(){return[ae,ie`
        :host {
          display: block;
          position: relative;
        }
      `]}render(){return D`<svg></svg>`}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,6*t]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5);for(let s=0;s<i;s++)Te(e,0,6*s+3,t[0],6*s+3,this.seed)}},et([J({type:Number}),tt("design:type",Object)],e.WiredDivider.prototype,"elevation",void 0),e.WiredDivider=et([Y("wired-divider")],e.WiredDivider);var it=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},st=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredFab=class extends de{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          font-size: 14px;
          color: #fff;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 16px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0.85;
        }
        path {
          stroke: var(--wired-fab-bg-color, #018786);
          stroke-width: 3;
          fill: transparent;
        }

        button:focus ::slotted(*) {
          opacity: 1;
        }
        button:active ::slotted(*) {
          opacity: 1;
          transform: scale(1.15);
        }
      `]}render(){return D`
    <button ?disabled="${this.disabled}">
      <div id="overlay">
        <svg></svg>
      </div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </button>
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]),s=Be(i/2,i/2,i,i,this.seed);e.appendChild(s)}},it([J({type:Boolean,reflect:!0}),st("design:type",Object)],e.WiredFab.prototype,"disabled",void 0),it([K("button"),st("design:type",HTMLButtonElement)],e.WiredFab.prototype,"button",void 0),e.WiredFab=it([Y("wired-fab")],e.WiredFab);var rt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},nt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredIconButton=class extends de{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
        }
      `]}render(){return D`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]);e.setAttribute("width",""+i),e.setAttribute("height",""+i),Ae(e,i/2,i/2,i,i,this.seed)}},rt([J({type:Boolean,reflect:!0}),nt("design:type",Object)],e.WiredIconButton.prototype,"disabled",void 0),rt([K("button"),nt("design:type",HTMLButtonElement)],e.WiredIconButton.prototype,"button",void 0),e.WiredIconButton=rt([Y("wired-icon-button")],e.WiredIconButton);var ot=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},at=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredImage=class extends de{constructor(){super(),this.elevation=1,this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px;
        }
        img {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
      `]}render(){return D`
    <img src="${this.src}">
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),r=t[1]-2*(i-1);Ee(e,2,2,s-4,r-4,this.seed);for(let t=1;t<i;t++)Te(e,2*t,r-4+2*t,s-4+2*t,r-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Te(e,s-4+2*t,r-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Te(e,2*t,r-4+2*t,s-4+2*t,r-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Te(e,s-4+2*t,r-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}},ot([J({type:Number}),at("design:type",Object)],e.WiredImage.prototype,"elevation",void 0),ot([J({type:String}),at("design:type",String)],e.WiredImage.prototype,"src",void 0),e.WiredImage=ot([Y("wired-image"),at("design:paramtypes",[])],e.WiredImage);var dt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},lt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredInput=class extends de{constructor(){super(),this.disabled=!1,this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.required=!1,this.autofocus=!1,this.readonly=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender(!0)}))}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
          padding: 5px;
          font-family: sans-serif;
          width: 150px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        input:focus + div path {
          stroke-width: 1.5;
        }
      `]}render(){return D`
    <input name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ee(e,2,2,t[0]-2,t[1]-2,this.seed)}refire(e){e.stopPropagation(),le(this,e.type,{sourceEvent:e})}focus(){this.textInput?this.textInput.focus():super.focus()}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.observe&&this.resizeObserver.observe(this.textInput)}detachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this.textInput)}},dt([J({type:Boolean,reflect:!0}),lt("design:type",Object)],e.WiredInput.prototype,"disabled",void 0),dt([J({type:String}),lt("design:type",Object)],e.WiredInput.prototype,"placeholder",void 0),dt([J({type:String}),lt("design:type",String)],e.WiredInput.prototype,"name",void 0),dt([J({type:String}),lt("design:type",String)],e.WiredInput.prototype,"min",void 0),dt([J({type:String}),lt("design:type",String)],e.WiredInput.prototype,"max",void 0),dt([J({type:String}),lt("design:type",String)],e.WiredInput.prototype,"step",void 0),dt([J({type:String}),lt("design:type",Object)],e.WiredInput.prototype,"type",void 0),dt([J({type:String}),lt("design:type",Object)],e.WiredInput.prototype,"autocomplete",void 0),dt([J({type:String}),lt("design:type",Object)],e.WiredInput.prototype,"autocapitalize",void 0),dt([J({type:String}),lt("design:type",Object)],e.WiredInput.prototype,"autocorrect",void 0),dt([J({type:Boolean}),lt("design:type",Object)],e.WiredInput.prototype,"required",void 0),dt([J({type:Boolean}),lt("design:type",Object)],e.WiredInput.prototype,"autofocus",void 0),dt([J({type:Boolean}),lt("design:type",Object)],e.WiredInput.prototype,"readonly",void 0),dt([J({type:Number}),lt("design:type",Number)],e.WiredInput.prototype,"minlength",void 0),dt([J({type:Number}),lt("design:type",Number)],e.WiredInput.prototype,"maxlength",void 0),dt([J({type:Number}),lt("design:type",Number)],e.WiredInput.prototype,"size",void 0),dt([K("input"),lt("design:type",HTMLInputElement)],e.WiredInput.prototype,"textInput",void 0),e.WiredInput=dt([Y("wired-input"),lt("design:paramtypes",[])],e.WiredInput);var ht=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},ct=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredItem=class extends de{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return[ae,ie`
      :host {
        display: inline-block;
        font-size: 14px;
        text-align: left;
      }
      button {
        cursor: pointer;
        outline: none;
        overflow: hidden;
        color: inherit;
        user-select: none;
        position: relative;
        font-family: inherit;
        text-align: inherit;
        font-size: inherit;
        letter-spacing: 1.25px;
        padding: 1px 10px;
        min-height: 36px;
        text-transform: inherit;
        background: none;
        border: none;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: 100%;
        box-sizing: border-box;
        white-space: nowrap;
      }
      button.selected {
        color: var(--wired-item-selected-color, #fff);
      }
      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: 0;
      }
      button span {
        display: inline-block;
        transition: transform 0.2s ease;
        position: relative;
      }
      button:active span {
        transform: scale(1.02);
      }
      #overlay {
        display: none;
      }
      button.selected #overlay {
        display: block;
      }
      svg path {
        stroke: var(--wired-item-selected-bg, #000);
        stroke-width: 2.75;
        fill: transparent;
        transition: transform 0.05s ease;
      }
      @media (hover: hover) {
        button:hover::before {
          opacity: 0.05;
        }
      }
      `]}render(){return D`
    <button class="${this.selected?"selected":""}">
      <div id="overlay"><svg></svg></div>
      <span><slot></slot></span>
    </button>`}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){const i=Le([[0,0],[t[0],0],[t[0],t[1]],[0,t[1]]],this.seed);e.appendChild(i)}},ht([J(),ct("design:type",Object)],e.WiredItem.prototype,"value",void 0),ht([J(),ct("design:type",Object)],e.WiredItem.prototype,"name",void 0),ht([J({type:Boolean}),ct("design:type",Object)],e.WiredItem.prototype,"selected",void 0),e.WiredItem=ht([Y("wired-item")],e.WiredItem);var pt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},ut=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredLink=class extends de{constructor(){super(...arguments),this.elevation=1}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
        }
        a, a:hover, a:visited {
          color: inherit;
          outline: none;
          display: inline-block;
          white-space: nowrap;
          text-decoration: none;
          border: none;
        }
        path {
          stroke: var(--wired-link-decoration-color, blue);
          stroke-opacity: 0.45;
        }
        a:focus path {
          stroke-opacity: 1;
        }
      `]}render(){return D`
    <a href="${this.href}" target="${this.target||""}">
      <slot></slot>
      <div id="overlay"><svg></svg></div>
    </a>
    `}focus(){this.anchor?this.anchor.focus():super.focus()}canvasSize(){if(this.anchor){const e=this.anchor.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0],height:t[1]-2*(i-1)};for(let t=0;t<i;t++)Te(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed),Te(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed)}},pt([J({type:Number}),ut("design:type",Object)],e.WiredLink.prototype,"elevation",void 0),pt([J({type:String}),ut("design:type",String)],e.WiredLink.prototype,"href",void 0),pt([J({type:String}),ut("design:type",String)],e.WiredLink.prototype,"target",void 0),pt([K("a"),ut("design:type",HTMLAnchorElement)],e.WiredLink.prototype,"anchor",void 0),e.WiredLink=pt([Y("wired-link")],e.WiredLink);var ft=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},gt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredListbox=class extends de{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return[ae,ie`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        padding: 5px;
        outline: none;
      }
      :host(:focus) path {
        stroke-width: 1.5;
      }
      ::slotted(wired-item) {
        display: block;
      }
      :host(.wired-horizontal) ::slotted(wired-item) {
        display: inline-block;
      }
      `]}render(){return D`
    <slot id="slot" @slotchange="${()=>this.requestUpdate()}"></slot>
    <div id="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){if(super.updated(),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}fireSelected(){le(this,"selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ee(e,0,0,t[0],t[1],this.seed)}},ft([J({type:Object}),gt("design:type",Object)],e.WiredListbox.prototype,"value",void 0),ft([J({type:String}),gt("design:type",String)],e.WiredListbox.prototype,"selected",void 0),ft([J({type:Boolean}),gt("design:type",Object)],e.WiredListbox.prototype,"horizontal",void 0),e.WiredListbox=ft([Y("wired-listbox")],e.WiredListbox);var yt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},bt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredProgress=class extends de{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return[ae,ie`
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        height: 42px;
        font-family: sans-serif;
      }
      .labelContainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progressLabel {
        color: var(--wired-progress-label-color, #000);
        font-size: var(--wired-progress-font-size, 14px);
        background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 1.25px;
      }
      path.progbox {
        stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
        stroke-width: 2.75;
        fill: none;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
      `]}render(){return D`
    <div id="overlay" class="overlay">
      <svg></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}wiredRender(e=!1){super.wiredRender(e),this.refreshProgressFill()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ee(e,2,2,t[0]-2,t[1]-2,this.seed)}refreshProgressFill(){if(this.progBox&&(this.progBox.parentElement&&this.progBox.parentElement.removeChild(this.progBox),this.progBox=void 0),this.svg){let e=0;const t=this.getBoundingClientRect();if(this.max>this.min){e=(this.value-this.min)/(this.max-this.min);const i=t.width*Math.max(0,Math.min(e,100));this.progBox=Le([[0,0],[i,0],[i,t.height],[0,t.height]],this.seed),this.svg.appendChild(this.progBox),this.progBox.classList.add("progbox")}}}},yt([J({type:Number}),bt("design:type",Object)],e.WiredProgress.prototype,"value",void 0),yt([J({type:Number}),bt("design:type",Object)],e.WiredProgress.prototype,"min",void 0),yt([J({type:Number}),bt("design:type",Object)],e.WiredProgress.prototype,"max",void 0),yt([J({type:Boolean}),bt("design:type",Object)],e.WiredProgress.prototype,"percentage",void 0),e.WiredProgress=yt([Y("wired-progress")],e.WiredProgress);var vt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},mt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredRadio=class extends de{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[ae,ie`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-radio-icon-color, currentColor);
        stroke-width: var(--wired-radio-default-swidth, 0.7);
      }
      g path {
        stroke-width: 0;
        fill: var(--wired-radio-icon-color, currentColor);
      }
      #container.focused {
        --wired-radio-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return D`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),le(this,"change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Ae(e,t[0]/2,t[1]/2,t[0],t[1],this.seed),this.svgCheck=Ne("g"),e.appendChild(this.svgCheck);const i=Math.max(.6*t[0],5),s=Math.max(.6*t[1],5);Ae(this.svgCheck,t[0]/2,t[1]/2,i,s,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}},vt([J({type:Boolean}),mt("design:type",Object)],e.WiredRadio.prototype,"checked",void 0),vt([J({type:Boolean,reflect:!0}),mt("design:type",Object)],e.WiredRadio.prototype,"disabled",void 0),vt([J({type:String}),mt("design:type",String)],e.WiredRadio.prototype,"name",void 0),vt([J(),mt("design:type",Object)],e.WiredRadio.prototype,"focused",void 0),vt([K("input"),mt("design:type",HTMLInputElement)],e.WiredRadio.prototype,"input",void 0),e.WiredRadio=vt([Y("wired-radio")],e.WiredRadio);var wt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},xt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredRadioGroup=class extends re{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return ie`
      :host {
        display: inline-block;
        font-family: inherit;
        outline: none;
      }
      :host ::slotted(*) {
        padding: var(--wired-radio-group-item-padding, 5px);
      }
    `}render(){return D`<slot id="slot" @slotchange="${this.slotChange}"></slot>`}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",this.checkListener)}handleChecked(e){const t=e.detail.checked,i=e.target,s=i.name||"";t?(this.selected=t&&s||"",this.fireSelected()):i.checked=!0}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){const e=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const e=i.name||"";this.selected&&e===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(i--,i<0&&(i=e.length-1),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}selectNext(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(i++,i>=e.length&&(i=0),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}fireSelected(){le(this,"selected",{selected:this.selected})}},wt([J({type:String}),xt("design:type",String)],e.WiredRadioGroup.prototype,"selected",void 0),e.WiredRadioGroup=wt([Y("wired-radio-group")],e.WiredRadioGroup);var kt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},St=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredSearchInput=class extends de{constructor(){super(...arguments),this.disabled=!1,this.placeholder="",this.autocomplete="",this.autocorrect="",this.autofocus=!1}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px 40px 10px 5px;
          font-family: sans-serif;
          width: 180px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        
        input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
        input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }

        .thicker path {
          stroke-width: 1.5;
        }

        button {
          position: absolute;
          top: 0;
          right: 2px;
          width: 32px;
          height: 100%;
          box-sizing: border-box;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          opacity: 0;
        }
      `]}render(){return D`
    <input type="search" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" 
      autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    <button @click="${()=>this.value=""}"></button>
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;t&&(t.value=e),this.refreshIconState()}else this.pendingValue=e}wiredRender(e=!1){super.wiredRender(e),this.refreshIconState()}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ee(e,2,2,t[0]-2,t[1]-2,this.seed),this.searchIcon=Ne("g"),this.searchIcon.classList.add("thicker"),e.appendChild(this.searchIcon),Ae(this.searchIcon,t[0]-30,(t[1]-30)/2+10,20,20,this.seed),Te(this.searchIcon,t[0]-10,(t[1]-30)/2+30,t[0]-25,(t[1]-30)/2+15,this.seed),this.closeIcon=Ne("g"),this.closeIcon.classList.add("thicker"),e.appendChild(this.closeIcon),Te(this.closeIcon,t[0]-33,(t[1]-30)/2+2,t[0]-7,(t[1]-30)/2+28,this.seed),Te(this.closeIcon,t[0]-7,(t[1]-30)/2+2,t[0]-33,(t[1]-30)/2+28,this.seed)}refreshIconState(){this.searchIcon&&this.closeIcon&&(this.searchIcon.style.display=this.value.trim()?"none":"",this.closeIcon.style.display=this.value.trim()?"":"none")}refire(e){this.refreshIconState(),e.stopPropagation(),le(this,e.type,{sourceEvent:e})}},kt([J({type:Boolean,reflect:!0}),St("design:type",Object)],e.WiredSearchInput.prototype,"disabled",void 0),kt([J({type:String}),St("design:type",Object)],e.WiredSearchInput.prototype,"placeholder",void 0),kt([J({type:String}),St("design:type",Object)],e.WiredSearchInput.prototype,"autocomplete",void 0),kt([J({type:String}),St("design:type",Object)],e.WiredSearchInput.prototype,"autocorrect",void 0),kt([J({type:Boolean}),St("design:type",Object)],e.WiredSearchInput.prototype,"autofocus",void 0),kt([K("input"),St("design:type",HTMLInputElement)],e.WiredSearchInput.prototype,"textInput",void 0),e.WiredSearchInput=kt([Y("wired-search-input")],e.WiredSearchInput);var Rt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Ot=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredSlider=class extends de{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.disabled=!1,this.canvasWidth=300}static get styles(){return[ae,ie`
      :host {
        display: inline-block;
        position: relative;
        width: 300px;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.45 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.07);
        border-radius: 5px;
      }
      input[type=range] {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        margin: 0;
        height: 20px;
        width: 20px;
        line-height: 1;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        height: 20px;
        width: 20px;
        margin: 0;
        line-height: 1;
      }
      .knob{
        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
      }
      .bar {
        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
      }
      input:focus + div svg .knob {
        stroke: var(--wired-slider-knob-outline-color, #000);
        fill-opacity: 0.8;
      }
      `]}get value(){return this.input?+this.input.value:this.min}set value(e){this.input?this.input.value=""+e:this.pendingValue=e,this.updateThumbPosition()}firstUpdated(){this.value=this.pendingValue||+(this.getAttribute("value")||this.value||this.min),delete this.pendingValue}render(){return D`
    <div id="container">
      <input type="range" 
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        @input="${this.onInput}">
      <div id="overlay">
        <svg></svg>
      </div>
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}onInput(e){e.stopPropagation(),this.updateThumbPosition(),this.input&&le(this,"change",{value:+this.input.value})}wiredRender(e=!1){super.wiredRender(e),this.updateThumbPosition()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){this.canvasWidth=t[0];const i=Math.round(t[1]/2);Te(e,0,i,t[0],i,this.seed).classList.add("bar"),this.knob=Ae(e,10,i,20,20,this.seed),this.knob.classList.add("knob")}updateThumbPosition(){if(this.input){const e=+this.input.value,t=Math.max(this.step,this.max-this.min),i=(e-this.min)/t;this.knob&&(this.knob.style.transform=`translateX(${i*(this.canvasWidth-20)}px)`)}}},Rt([J({type:Number}),Ot("design:type",Object)],e.WiredSlider.prototype,"min",void 0),Rt([J({type:Number}),Ot("design:type",Object)],e.WiredSlider.prototype,"max",void 0),Rt([J({type:Number}),Ot("design:type",Object)],e.WiredSlider.prototype,"step",void 0),Rt([J({type:Boolean,reflect:!0}),Ot("design:type",Object)],e.WiredSlider.prototype,"disabled",void 0),Rt([K("input"),Ot("design:type",HTMLInputElement)],e.WiredSlider.prototype,"input",void 0),e.WiredSlider=Rt([Y("wired-slider")],e.WiredSlider);var Ct=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},zt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredSpinner=class extends de{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
        }
        path {
          stroke: currentColor;
          stroke-opacity: 0.65;
          stroke-width: 1.5;
          fill: none;
        }
        .knob {
          stroke-width: 2.8 !important;
          stroke-opacity: 1;
        }
      `]}render(){return D`<svg></svg>`}canvasSize(){return[76,76]}draw(e,t){Ae(e,t[0]/2,t[1]/2,Math.floor(.8*t[0]),Math.floor(.8*t[1]),this.seed),this.knob=Be(0,0,20,20,this.seed),this.knob.classList.add("knob"),e.appendChild(this.knob),this.updateCursor()}updateCursor(){if(this.knob){const e=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${e[0]}px, ${e[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}updated(){super.updated(),this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(e=>this.tick(e))}tick(e){this.spinning?(this.timerstart||(this.timerstart=e),this.value=Math.min(1,(e-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}},Ct([J({type:Boolean}),zt("design:type",Object)],e.WiredSpinner.prototype,"spinning",void 0),Ct([J({type:Number}),zt("design:type",Object)],e.WiredSpinner.prototype,"duration",void 0),e.WiredSpinner=Ct([Y("wired-spinner")],e.WiredSpinner);var _t=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Wt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredTab=class extends de{constructor(){super(),this.name="",this.label="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
      `]}render(){return D`
    <div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ee(e,2,2,t[0]-4,t[1]-4,this.seed)}},_t([J({type:String}),Wt("design:type",Object)],e.WiredTab.prototype,"name",void 0),_t([J({type:String}),Wt("design:type",Object)],e.WiredTab.prototype,"label",void 0),e.WiredTab=_t([Y("wired-tab"),Wt("design:paramtypes",[])],e.WiredTab);var Pt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Mt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredTabs=class extends re{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return[ae,ie`
        :host {
          display: block;
          opacity: 1;
        }
        ::slotted(.hidden) {
          display: none !important;
        }
    
        :host ::slotted(.hidden) {
          display: none !important;
        }
        #bar {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }
      `]}render(){return D`
    <div id="bar">
      ${this.pages.map(e=>D`
      <wired-item role="tab" .value="${e.name}" .selected="${e.name===this.selected}" ?aria-selected="${e.name===this.selected}"
        @click="${()=>this.selected=e.name}">${e.label||e.name}</wired-item>
      `)}
    </div>
    <div>
      <slot @slotchange="${this.mapPages}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const e=this.slotElement.assignedNodes();if(e&&e.length){for(let t=0;t<e.length;t++){const i=e[t];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const e=i;this.pages.push(e);const t=e.getAttribute("name")||"";t&&t.trim().split(" ").forEach(t=>{t&&this.pageMap.set(t,e)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){const e=this.getElement();for(let t=0;t<this.pages.length;t++){const i=this.pages[t];i===e?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=e||void 0,this.current&&this.current.wiredRender&&requestAnimationFrame(()=>requestAnimationFrame(()=>this.current.wiredRender()))}getElement(){let e=void 0;return this.selected&&(e=this.pageMap.get(this.selected)),e||(e=this.pages[0]),e||null}selectPrevious(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].name||""}}selectNext(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].name||""}}},Pt([J({type:String}),Mt("design:type",String)],e.WiredTabs.prototype,"selected",void 0),Pt([K("slot"),Mt("design:type",HTMLSlotElement)],e.WiredTabs.prototype,"slotElement",void 0),e.WiredTabs=Pt([Y("wired-tabs")],e.WiredTabs);var jt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},It=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredTextarea=class extends de{constructor(){super(...arguments),this.disabled=!1,this.rows=2,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
          font-family: sans-serif;
          width: 400px;
          outline: none;
          padding: 4px;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        textarea {
          position: relative;
          outline: none;
          border: none;
          resize: none;
          background: inherit;
          color: inherit;
          width: 100%;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
          text-align: inherit;
          padding: 10px;
          box-sizing: border-box;
        }
      `]}render(){return D`
    <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
      placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
      rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}"
      @change="${this.refire}" @input="${this.refire}"></textarea>
    <div id="overlay">
      <svg></svg>
    </div>
    `}get textarea(){return this.textareaInput}get value(){const e=this.textarea;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.textarea;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ee(e,4,4,t[0]-4,t[1]-4,this.seed)}refire(e){e.stopPropagation(),le(this,e.type,{sourceEvent:e})}},jt([J({type:Boolean,reflect:!0}),It("design:type",Object)],e.WiredTextarea.prototype,"disabled",void 0),jt([J({type:Number}),It("design:type",Object)],e.WiredTextarea.prototype,"rows",void 0),jt([J({type:Number}),It("design:type",Object)],e.WiredTextarea.prototype,"maxrows",void 0),jt([J({type:String}),It("design:type",Object)],e.WiredTextarea.prototype,"autocomplete",void 0),jt([J({type:Boolean}),It("design:type",Object)],e.WiredTextarea.prototype,"autofocus",void 0),jt([J({type:String}),It("design:type",Object)],e.WiredTextarea.prototype,"inputmode",void 0),jt([J({type:String}),It("design:type",Object)],e.WiredTextarea.prototype,"placeholder",void 0),jt([J({type:Boolean}),It("design:type",Object)],e.WiredTextarea.prototype,"required",void 0),jt([J({type:Boolean}),It("design:type",Object)],e.WiredTextarea.prototype,"readonly",void 0),jt([J({type:Number}),It("design:type",Number)],e.WiredTextarea.prototype,"minlength",void 0),jt([J({type:Number}),It("design:type",Number)],e.WiredTextarea.prototype,"maxlength",void 0),jt([K("textarea"),It("design:type",HTMLTextAreaElement)],e.WiredTextarea.prototype,"textareaInput",void 0),e.WiredTextarea=jt([Y("wired-textarea")],e.WiredTextarea);var $t=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Nt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredToggle=class extends de{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return[ae,ie`
      :host {
        display: inline-block;
        cursor: pointer;
        position: relative;
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.4 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        opacity: 0;
      }
      .knob {
        transition: transform 0.3s ease;
      }
      .knob path {
        stroke-width: 0.7;
      }
      .knob.checked {
        transform: translateX(48px);
      }
      path.knobfill {
        stroke-width: 3 !important;
        fill: transparent;
      }
      .knob.unchecked path.knobfill {
        stroke: var(--wired-toggle-off-color, gray);
      }
      .knob.checked path.knobfill {
        stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
      }
      `]}render(){return D`
    <div style="position: relative;">
      <svg></svg>
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}"  @change="${this.onChange}">
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshKnob()}onChange(){this.checked=this.input.checked,this.refreshKnob(),le(this,"change",{checked:this.checked})}canvasSize(){return[80,34]}draw(e,t){Ee(e,16,8,t[0]-32,18,this.seed).classList.add("toggle-bar"),this.knob=Ne("g"),this.knob.classList.add("knob"),e.appendChild(this.knob);const i=Be(16,16,32,32,this.seed);i.classList.add("knobfill"),this.knob.appendChild(i),Ae(this.knob,16,16,32,32,this.seed)}refreshKnob(){if(this.knob){const e=this.knob.classList;this.checked?(e.remove("unchecked"),e.add("checked")):(e.remove("checked"),e.add("unchecked"))}}},$t([J({type:Boolean}),Nt("design:type",Object)],e.WiredToggle.prototype,"checked",void 0),$t([J({type:Boolean,reflect:!0}),Nt("design:type",Object)],e.WiredToggle.prototype,"disabled",void 0),$t([K("input"),Nt("design:type",HTMLInputElement)],e.WiredToggle.prototype,"input",void 0),e.WiredToggle=$t([Y("wired-toggle")],e.WiredToggle);var Dt=function(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},Et=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};return e.WiredVideo=class extends de{constructor(){super(),this.src="",this.autoplay=!1,this.loop=!1,this.muted=!1,this.playsinline=!1,this.playing=!1,this.timeDisplay="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[ae,ie`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px 3px 68px;
          --wired-progress-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
          --wired-slider-knob-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
        }
        video {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
        #controls {
          position: absolute;
          pointer-events: auto;
          left: 0;
          bottom: 0;
          width: 100%;
          box-sizing: border-box;
          height: 70px;
        }
        .layout.horizontal {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          padding: 5px 10px;
        }
        .flex {
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }
        wired-progress {
          display: block;
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          --wired-progress-label-color: transparent;
          --wired-progress-label-background: transparent;
        }
        wired-icon-button span {
          font-size: 16px;
          line-height: 16px;
          width: 16px;
          height: 16px;
          padding: 0px;
          font-family: sans-serif;
          display: inline-block;
        }
        #timeDisplay {
          padding: 0 20px 0 8px;
          font-size: 13px;
        }
        wired-slider {
          display: block;
          max-width: 200px;
          margin: 0 6px 0 auto;
        }
      `]}render(){return D`
    <video 
      .autoplay="${this.autoplay}"
      .loop="${this.loop}"
      .muted="${this.muted}"
      .playsinline="${this.playsinline}"
      src="${this.src}"
      @play="${()=>this.playing=!0}"
      @pause="${()=>this.playing=!1}"
      @canplay="${this.canPlay}"
      @timeupdate="${this.updateTime}">
    </video>
    <div id="overlay">
      <svg></svg>
    </div>
    <div id="controls">
      <wired-progress></wired-progress>
      <div class="horizontal layout center">
        <wired-icon-button @click="${this.togglePause}">
          <span>${this.playing?"||":"▶"}</span>
        </wired-icon-button>
        <div id="timeDisplay">${this.timeDisplay}</div>
        <div class="flex">
          <wired-slider @change="${this.volumeChange}"></wired-slider>
        </div>
        <div style="width: 24px; height: 24px;">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path style="stroke: none; fill: currentColor;" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>
        </div>
      </div>
    </div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}wiredRender(){super.wiredRender(),this.progressBar&&this.progressBar.wiredRender(!0)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ee(e,2,2,t[0]-4,t[1]-4,this.seed)}updateTime(){this.video&&this.progressBar&&(this.progressBar.value=this.video.duration?Math.round(this.video.currentTime/this.video.duration*100):0,this.timeDisplay=`${this.getTimeDisplay(this.video.currentTime)} / ${this.getTimeDisplay(this.video.duration)}`)}getTimeDisplay(e){const t=Math.floor(e/60);return`${t}:${Math.round(e-60*t)}`}togglePause(){this.video&&(this.playing?this.video.pause():this.video.play())}volumeChange(){this.video&&this.slider&&(this.video.volume=this.slider.value/100)}canPlay(){this.slider&&this.video&&(this.slider.value=100*this.video.volume)}},Dt([J({type:String}),Et("design:type",Object)],e.WiredVideo.prototype,"src",void 0),Dt([J({type:Boolean}),Et("design:type",Object)],e.WiredVideo.prototype,"autoplay",void 0),Dt([J({type:Boolean}),Et("design:type",Object)],e.WiredVideo.prototype,"loop",void 0),Dt([J({type:Boolean}),Et("design:type",Object)],e.WiredVideo.prototype,"muted",void 0),Dt([J({type:Boolean}),Et("design:type",Object)],e.WiredVideo.prototype,"playsinline",void 0),Dt([J(),Et("design:type",Object)],e.WiredVideo.prototype,"playing",void 0),Dt([J(),Et("design:type",Object)],e.WiredVideo.prototype,"timeDisplay",void 0),Dt([K("wired-progress"),Et("design:type",e.WiredProgress)],e.WiredVideo.prototype,"progressBar",void 0),Dt([K("wired-slider"),Et("design:type",e.WiredSlider)],e.WiredVideo.prototype,"slider",void 0),Dt([K("video"),Et("design:type",HTMLVideoElement)],e.WiredVideo.prototype,"video",void 0),e.WiredVideo=Dt([Y("wired-video"),Et("design:paramtypes",[])],e.WiredVideo),e}({});
