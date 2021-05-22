const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${i}--\x3e`,n=new RegExp(`${i}|${s}`);class o{constructor(e,t){this.parts=[],this.element=t;const s=[],o=[],a=document.createTreeWalker(t.content,133,null,!1);let h=0,c=-1,p=0;const{strings:u,values:{length:f}}=e;for(;p<f;){const e=a.nextNode();if(null!==e){if(c++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)r(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=u[p],i=d.exec(t)[2],s=i.toLowerCase()+"$lit$",o=e.getAttribute(s);e.removeAttribute(s);const r=o.split(n);this.parts.push({type:"attribute",index:c,name:i,strings:r}),p+=r.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,o=t.split(n),a=o.length-1;for(let t=0;t<a;t++){let s,n=o[t];if(""===n)s=l();else{const e=d.exec(n);null!==e&&r(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(n)}i.insertBefore(s,e),this.parts.push({type:"node",index:++c})}""===o[a]?(i.insertBefore(l(),e),s.push(e)):e.data=o[a],p+=a}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&c!==h||(c++,t.insertBefore(l(),e)),h=c,this.parts.push({type:"node",index:c}),null===e.nextSibling?e.data="":(s.push(e),c--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),p++}}else a.currentNode=o.pop()}for(const e of s)e.parentNode.removeChild(e)}}const r=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},a=e=>-1!==e.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:i},parts:s}=e,n=document.createTreeWalker(i,133,null,!1);let o=p(s),r=s[o],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(d.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-l,o=p(s,o),r=s[o]}d.forEach(e=>e.parentNode.removeChild(e))}const c=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},p=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(a(t))return i}return-1};const u=new WeakMap,f=e=>"function"==typeof e&&u.has(e),g={},y={};class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let o,r=0,l=0,d=n.nextNode();for(;r<s.length;)if(o=s[r],a(o)){for(;l<o.index;)l++,"TEMPLATE"===d.nodeName&&(i.push(d),n.currentNode=d.content),null===(d=n.nextNode())&&(n.currentNode=i.pop(),d=n.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const b=` ${i} `;class m{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let o=0;o<e;o++){const e=this.strings[o],r=e.lastIndexOf("\x3c!--");n=(r>-1||n)&&-1===e.indexOf("--\x3e",r+1);const a=d.exec(e);t+=null===a?e+(n?b:s):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const w=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class k{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let s=0;s<t;s++){i+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(w(e)||!x(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||w(e)&&e===this.value||(this.value=e,f(e)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class R{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof m?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===y?(this.value=y,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const n of e)i=t[s],void 0===i&&(i=new R(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(n),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class z extends k{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends S{}let C=!1;(()=>{try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class M{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=P(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const P=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function j(e){let t=$.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},$.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(i);return s=t.keyString.get(n),void 0===s&&(s=new o(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const $=new Map,N=new WeakMap;const E=new class{handleAttributeExpressions(e,t,i,s){const n=t[0];if("."===n){return new z(e,t.slice(1),i).parts}if("@"===n)return[new M(e,t.slice(1),s.eventContext)];if("?"===n)return[new O(e,t.slice(1),i)];return new k(e,t,i).parts}handleTextExpression(e){return new R(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const D=(e,...t)=>new m(e,t,"html",E),A=(e,t)=>`${e}--${t}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const L=e=>t=>{const s=A(t.type,e);let n=$.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},$.set(s,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const a=t.strings.join(i);if(r=n.keyString.get(a),void 0===r){const i=t.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(i,e),r=new o(t,i),n.keyString.set(a,r)}return n.stringsArray.set(t.strings,r),r},T=["html","svg"],B=new Set,H=(e,t,i)=>{B.add(e);const s=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{T.forEach(t=>{const i=$.get(A(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),h(e,i)})})})(e);const a=s.content;i?function(e,t,i=null){const{element:{content:s},parts:n}=e;if(null==i)return void s.appendChild(t);const o=document.createTreeWalker(s,133,null,!1);let r=p(n),a=0,l=-1;for(;o.nextNode();){l++;for(o.currentNode===i&&(a=c(t),i.parentNode.insertBefore(t,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=p(n,r);return}r=p(n,r)}}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),h(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const V={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},U=(e,t)=>t!==e&&(t==t||e==e),F={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:U};class q extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=F){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this._requestUpdate(e,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||F}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=U){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||V,n="function"==typeof s?s:s.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||V.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=F){const s=this.constructor,n=s._attributeNameForProperty(e,i);if(void 0!==n){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const s=this.constructor,n=s.getPropertyOptions(e);s._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}q.finalized=!0;const W=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),Y=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function J(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Y(e,t)}function G(e){return(t,i)=>{const s={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==i?K(s,t,i):X(s,t)}}const K=(e,t,i)=>{Object.defineProperty(t,i,e)},X=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),Q="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol();class ee{constructor(e,t){if(t!==Z)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new ee(i,Z)};(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const ie={};class se extends q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=[e]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ie&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ie}}se.finalized=!0,se.render=(e,i,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,o=N.has(i),r=I&&11===i.nodeType&&!!i.host,a=r&&!B.has(n),l=a?document.createDocumentFragment():i;if(((e,i,s)=>{let n=N.get(i);void 0===n&&(t(i,i.firstChild),N.set(i,n=new R(Object.assign({templateFactory:j},s))),n.appendInto(i)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:L(n)},s)),a){const e=N.get(l);N.delete(l);const s=e.value instanceof v?e.value.template:void 0;H(n,l,s),t(i,i.firstChild),i.appendChild(l),N.set(i,e)}!o&&r&&window.ShadyCSS.styleElement(i.host)};var ne=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},oe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const re=te`
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
`;class ae extends se{constructor(){super(...arguments),this.lastSize=[0,0],this.seed=Math.floor(Math.random()*2**31)}updated(e){this.wiredRender()}wiredRender(e=!1){if(this.svg){const t=this.canvasSize();if(!e&&t[0]===this.lastSize[0]&&t[1]===this.lastSize[1])return;for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);this.svg.setAttribute("width",""+t[0]),this.svg.setAttribute("height",""+t[1]),this.draw(this.svg,t),this.lastSize=t,this.classList.add("wired-rendered")}}}function le(e,t,i,s=!0,n=!0){if(t){const o={bubbles:"boolean"!=typeof s||s,composed:"boolean"!=typeof n||n};i&&(o.detail=i),e.dispatchEvent(new CustomEvent(t,o))}}function de(){return Math.floor(Math.random()*2**31)}function he(e,t,i){if(e&&e.length){const[s,n]=t,o=Math.PI/180*i,r=Math.cos(o),a=Math.sin(o);e.forEach(e=>{const[t,i]=e;e[0]=(t-s)*r-(i-n)*a+s,e[1]=(t-s)*a+(i-n)*r+n})}}function ce(e){const t=e[0],i=e[1];return Math.sqrt(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2))}function pe(e,t,i,s){const n=t[1]-e[1],o=e[0]-t[0],r=n*e[0]+o*e[1],a=s[1]-i[1],l=i[0]-s[0],d=a*i[0]+l*i[1],h=n*l-a*o;return h?[(l*r-o*d)/h,(n*d-a*r)/h]:null}function ue(e,t,i){const s=e.length;if(s<3)return!1;const n=[Number.MAX_SAFE_INTEGER,i],o=[t,i];let r=0;for(let t=0;t<s;t++){const i=e[t],a=e[(t+1)%s];if(ye(i,a,o,n)){if(0===ge(i,o,a))return fe(i,o,a);r++}}return r%2==1}function fe(e,t,i){return t[0]<=Math.max(e[0],i[0])&&t[0]>=Math.min(e[0],i[0])&&t[1]<=Math.max(e[1],i[1])&&t[1]>=Math.min(e[1],i[1])}function ge(e,t,i){const s=(t[1]-e[1])*(i[0]-t[0])-(t[0]-e[0])*(i[1]-t[1]);return 0===s?0:s>0?1:2}function ye(e,t,i,s){const n=ge(e,t,i),o=ge(e,t,s),r=ge(i,s,e),a=ge(i,s,t);return n!==o&&r!==a||!(0!==n||!fe(e,i,t))||!(0!==o||!fe(e,s,t))||!(0!==r||!fe(i,e,s))||!(0!==a||!fe(i,t,s))}function ve(e,t){const i=[0,0],s=Math.round(t.hachureAngle+90);s&&he(e,i,s);const n=function(e,t){const i=[...e];i[0].join(",")!==i[i.length-1].join(",")&&i.push([i[0][0],i[0][1]]);const s=[];if(i&&i.length>2){let e=t.hachureGap;e<0&&(e=4*t.strokeWidth),e=Math.max(e,.1);const n=[];for(let e=0;e<i.length-1;e++){const t=i[e],s=i[e+1];if(t[1]!==s[1]){const e=Math.min(t[1],s[1]);n.push({ymin:e,ymax:Math.max(t[1],s[1]),x:e===t[1]?t[0]:s[0],islope:(s[0]-t[0])/(s[1]-t[1])})}}if(n.sort((e,t)=>e.ymin<t.ymin?-1:e.ymin>t.ymin?1:e.x<t.x?-1:e.x>t.x?1:e.ymax===t.ymax?0:(e.ymax-t.ymax)/Math.abs(e.ymax-t.ymax)),!n.length)return s;let o=[],r=n[0].ymin;for(;o.length||n.length;){if(n.length){let e=-1;for(let t=0;t<n.length&&!(n[t].ymin>r);t++)e=t;n.splice(0,e+1).forEach(e=>{o.push({s:r,edge:e})})}if(o=o.filter(e=>!(e.edge.ymax<=r)),o.sort((e,t)=>e.edge.x===t.edge.x?0:(e.edge.x-t.edge.x)/Math.abs(e.edge.x-t.edge.x)),o.length>1)for(let e=0;e<o.length;e+=2){const t=e+1;if(t>=o.length)break;const i=o[e].edge,n=o[t].edge;s.push([[Math.round(i.x),r],[Math.round(n.x),r]])}r+=e,o.forEach(t=>{t.edge.x=t.edge.x+e*t.edge.islope})}}return s}(e,t);return s&&(he(e,i,-s),function(e,t,i){const s=[];e.forEach(e=>s.push(...e)),he(s,t,i)}(n,i,-s)),n}ne([G("svg"),oe("design:type",SVGSVGElement)],ae.prototype,"svg",void 0);class be extends class{constructor(e){this.helper=e}fillPolygon(e,t){return this._fillPolygon(e,t)}_fillPolygon(e,t,i=!1){let s=ve(e,t);if(i){const t=this.connectingLines(e,s);s=s.concat(t)}return{type:"fillSketch",ops:this.renderLines(s,t)}}renderLines(e,t){const i=[];for(const s of e)i.push(...this.helper.doubleLineOps(s[0][0],s[0][1],s[1][0],s[1][1],t));return i}connectingLines(e,t){const i=[];if(t.length>1)for(let s=1;s<t.length;s++){const n=t[s-1];if(ce(n)<3)continue;const o=[t[s][0],n[1]];if(ce(o)>3){const t=this.splitOnIntersections(e,o);i.push(...t)}}return i}midPointInPolygon(e,t){return ue(e,(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2)}splitOnIntersections(e,t){const i=Math.max(5,.1*ce(t)),s=[];for(let n=0;n<e.length;n++){const o=e[n],r=e[(n+1)%e.length];if(ye(o,r,...t)){const e=pe(o,r,t[0],t[1]);if(e){const n=ce([e,t[0]]),o=ce([e,t[1]]);n>i&&o>i&&s.push({point:e,distance:n})}}}if(s.length>1){const i=s.sort((e,t)=>e.distance-t.distance).map(e=>e.point);if(ue(e,...t[0])||i.shift(),ue(e,...t[1])||i.pop(),i.length<=1)return this.midPointInPolygon(e,t)?[t]:[];const n=[t[0],...i,t[1]],o=[];for(let t=0;t<n.length-1;t+=2){const i=[n[t],n[t+1]];this.midPointInPolygon(e,i)&&o.push(i)}return o}return this.midPointInPolygon(e,t)?[t]:[]}}{fillPolygon(e,t){return this._fillPolygon(e,t,!0)}}class me{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function we(e,t,i,s,n){return{type:"path",ops:_e(e,t,i,s,n)}}function xe(e,t){return function(e,t,i){const s=(e||[]).length;if(s>2){const t=[];for(let n=0;n<s-1;n++)t.push(..._e(e[n][0],e[n][1],e[n+1][0],e[n+1][1],i));return t.push(..._e(e[s-1][0],e[s-1][1],e[0][0],e[0][1],i)),{type:"path",ops:t}}return 2===s?we(e[0][0],e[0][1],e[1][0],e[1][1],i):{type:"path",ops:[]}}(e,0,t)}function ke(e,t,i,s,n){return function(e,t,i,s){const[n,o]=Pe(s.increment,e,t,s.rx,s.ry,1,s.increment*Oe(.1,Oe(.4,1,i),i),i);let r=Me(n,null,i);if(!i.disableMultiStroke){const[n]=Pe(s.increment,e,t,s.rx,s.ry,1.5,0,i),o=Me(n,null,i);r=r.concat(o)}return{estimatedPoints:o,opset:{type:"path",ops:r}}}(e,t,n,Se(i,s,n)).opset}function Se(e,t,i){const s=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(e/2,2)+Math.pow(t/2,2))/2)),n=Math.max(i.curveStepCount,i.curveStepCount/Math.sqrt(200)*s),o=2*Math.PI/n;let r=Math.abs(e/2),a=Math.abs(t/2);const l=1-i.curveFitting;return r+=ze(r*l,i),a+=ze(a*l,i),{increment:o,rx:r,ry:a}}function Re(e){return e.randomizer||(e.randomizer=new me(e.seed||0)),e.randomizer.next()}function Oe(e,t,i,s=1){return i.roughness*s*(Re(i)*(t-e)+e)}function ze(e,t,i=1){return Oe(-e,e,t,i)}function _e(e,t,i,s,n,o=!1){const r=o?n.disableMultiStrokeFill:n.disableMultiStroke,a=Ce(e,t,i,s,n,!0,!1);if(r)return a;const l=Ce(e,t,i,s,n,!0,!0);return a.concat(l)}function Ce(e,t,i,s,n,o,r){const a=Math.pow(e-i,2)+Math.pow(t-s,2),l=Math.sqrt(a);let d=1;d=l<200?1:l>500?.4:-.0016668*l+1.233334;let h=n.maxRandomnessOffset||0;h*h*100>a&&(h=l/10);const c=h/2,p=.2+.2*Re(n);let u=n.bowing*n.maxRandomnessOffset*(s-t)/200,f=n.bowing*n.maxRandomnessOffset*(e-i)/200;u=ze(u,n,d),f=ze(f,n,d);const g=[],y=()=>ze(c,n,d),v=()=>ze(h,n,d);return o&&(r?g.push({op:"move",data:[e+y(),t+y()]}):g.push({op:"move",data:[e+ze(h,n,d),t+ze(h,n,d)]})),r?g.push({op:"bcurveTo",data:[u+e+(i-e)*p+y(),f+t+(s-t)*p+y(),u+e+2*(i-e)*p+y(),f+t+2*(s-t)*p+y(),i+y(),s+y()]}):g.push({op:"bcurveTo",data:[u+e+(i-e)*p+v(),f+t+(s-t)*p+v(),u+e+2*(i-e)*p+v(),f+t+2*(s-t)*p+v(),i+v(),s+v()]}),g}function Me(e,t,i){const s=e.length,n=[];if(s>3){const o=[],r=1-i.curveTightness;n.push({op:"move",data:[e[1][0],e[1][1]]});for(let t=1;t+2<s;t++){const i=e[t];o[0]=[i[0],i[1]],o[1]=[i[0]+(r*e[t+1][0]-r*e[t-1][0])/6,i[1]+(r*e[t+1][1]-r*e[t-1][1])/6],o[2]=[e[t+1][0]+(r*e[t][0]-r*e[t+2][0])/6,e[t+1][1]+(r*e[t][1]-r*e[t+2][1])/6],o[3]=[e[t+1][0],e[t+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]})}if(t&&2===t.length){const e=i.maxRandomnessOffset;n.push({op:"lineTo",data:[t[0]+ze(e,i),t[1]+ze(e,i)]})}}else 3===s?(n.push({op:"move",data:[e[1][0],e[1][1]]}),n.push({op:"bcurveTo",data:[e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1]]})):2===s&&n.push(..._e(e[0][0],e[0][1],e[1][0],e[1][1],i));return n}function Pe(e,t,i,s,n,o,r,a){const l=[],d=[],h=ze(.5,a)-Math.PI/2;d.push([ze(o,a)+t+.9*s*Math.cos(h-e),ze(o,a)+i+.9*n*Math.sin(h-e)]);for(let r=h;r<2*Math.PI+h-.01;r+=e){const e=[ze(o,a)+t+s*Math.cos(r),ze(o,a)+i+n*Math.sin(r)];l.push(e),d.push(e)}return d.push([ze(o,a)+t+s*Math.cos(h+2*Math.PI+.5*r),ze(o,a)+i+n*Math.sin(h+2*Math.PI+.5*r)]),d.push([ze(o,a)+t+.98*s*Math.cos(h+r),ze(o,a)+i+.98*n*Math.sin(h+r)]),d.push([ze(o,a)+t+.9*s*Math.cos(h+.5*r),ze(o,a)+i+.9*n*Math.sin(h+.5*r)]),[d,l]}const je={randOffset:(e,t)=>e,randOffsetWithRange:(e,t,i)=>(e+t)/2,ellipse:(e,t,i,s,n)=>ke(e,t,i,s,n),doubleLineOps:(e,t,i,s,n)=>function(e,t,i,s,n){return _e(e,t,i,s,n,!0)}(e,t,i,s,n)};function $e(e){return{maxRandomnessOffset:2,roughness:1,bowing:.85,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:3.5,hachureAngle:-41,hachureGap:5,dashOffset:-1,dashGap:-1,zigzagOffset:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1,seed:e}}function Ne(e,t){let i="";for(const s of e.ops){const e=s.data;switch(s.op){case"move":if(t&&i)break;i+=`M${e[0]} ${e[1]} `;break;case"bcurveTo":i+=`C${e[0]} ${e[1]}, ${e[2]} ${e[3]}, ${e[4]} ${e[5]} `;break;case"lineTo":i+=`L${e[0]} ${e[1]} `}}return i.trim()}function Ee(e,t){const i=document.createElementNS("http://www.w3.org/2000/svg",e);if(t)for(const e in t)i.setAttributeNS(null,e,t[e]);return i}function De(e,t,i=!1){const s=Ee("path",{d:Ne(e,i)});return t&&t.appendChild(s),s}function Ae(e,t,i,s,n,o){return De(function(e,t,i,s,n){return xe([[e,t],[e+i,t],[e+i,t+s],[e,t+s]],n)}(t+2,i+2,s-4,n-4,$e(o)),e)}function Ie(e,t,i,s,n,o){return De(we(t,i,s,n,$e(o)),e)}function Le(e,t,i,s,n,o){return De(ke(t,i,s=Math.max(s>10?s-4:s-1,1),n=Math.max(n>10?n-4:n-1,1),$e(o)),e)}function Te(e,t){return De(new be(je).fillPolygon(e,$e(t)),null)}function Be(e,t,i,s,n){const o=Se(i,s,$e(n)),r=[];let a=0;for(;a<=2*Math.PI;)r.push([e+o.rx*Math.cos(a),t+o.ry*Math.sin(a)]),a+=o.increment;return Te(r,n)}var He=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Ve=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ue=class extends ae{constructor(){super(),this.elevation=1,this.disabled=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender(!0)}))}static get styles(){return[re,te`
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
    `}focus(){this.button?this.button.focus():super.focus()}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0]-2*(i-1),height:t[1]-2*(i-1)};Ae(e,0,0,s.width,s.height,this.seed);for(let t=1;t<i;t++)Ie(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Ie(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100,Ie(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Ie(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.button&&this.resizeObserver&&this.resizeObserver.observe&&this.resizeObserver.observe(this.button)}detachResizeListener(){this.button&&this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this.button)}};He([J({type:Number}),Ve("design:type",Object)],Ue.prototype,"elevation",void 0),He([J({type:Boolean,reflect:!0}),Ve("design:type",Object)],Ue.prototype,"disabled",void 0),He([G("button"),Ve("design:type",HTMLButtonElement)],Ue.prototype,"button",void 0),Ue=He([W("wired-button"),Ve("design:paramtypes",[])],Ue);var Fe=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},qe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let We=class extends se{constructor(){super(...arguments),this.elevation=3,this.disabled=!1,this.initials=!1,this.format=e=>this.months_short[e.getMonth()]+" "+e.getDate()+", "+e.getFullYear(),this.weekdays_short=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],this.months=["January","February","March","April","May","June","July","August","September","October","November","December"],this.months_short=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],this.firstOfMonthDate=new Date,this.fDate=void 0,this.lDate=void 0,this.calendarRefSize={width:0,height:0},this.tblColWidth=0,this.tblRowHeight=0,this.tblHeadHeight=0,this.monthYear="",this.weeks=[[]],this.seed=de()}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.resized.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler,{passive:!0})),this.localizeCalendarHeaders(),this.setInitialConditions(),this.computeCalendar(),this.refreshSelection(),setTimeout(()=>this.updated())}disconnectedCallback(){super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}static get styles(){return te`
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
    `}firstUpdated(){this.setAttribute("role","dialog")}updated(e){e&&e instanceof Map&&(e.has("disabled")&&this.refreshDisabledState(),e.has("selected")&&this.refreshSelection());const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.getCalendarSize(),s=Math.min(Math.max(1,this.elevation),5),n=i.width+2*(s-1),o=i.height+2*(s-1);t.setAttribute("width",""+n),t.setAttribute("height",""+o),Ae(t,2,2,i.width-4,i.height-4,this.seed);for(let e=1;e<s;e++)Ie(t,2*e,i.height-4+2*e,i.width-4+2*e,i.height-4+2*e,this.seed).style.opacity=""+(85-10*e)/100,Ie(t,i.width-4+2*e,i.height-4+2*e,i.width-4+2*e,2*e,this.seed).style.opacity=""+(85-10*e)/100,Ie(t,2*e,i.height-4+2*e,i.width-4+2*e,i.height-4+2*e,this.seed).style.opacity=""+(85-10*e)/100,Ie(t,i.width-4+2*e,i.height-4+2*e,i.width-4+2*e,2*e,this.seed).style.opacity=""+(85-10*e)/100;const r=this.shadowRoot.getElementById("svgTD");if(r){for(;r.hasChildNodes();)r.removeChild(r.lastChild);const e=Math.max(1*this.tblColWidth,20),t=Math.max(.9*this.tblRowHeight,18),i=Le(r,this.tblColWidth/2,this.tblRowHeight/2,e,t,this.seed);r.appendChild(i)}this.classList.add("wired-rendered")}setSelectedDate(e){if(this.selected=e,this.selected){const e=new Date(this.selected);this.firstOfMonthDate=new Date(e.getFullYear(),e.getMonth(),1),this.computeCalendar(),this.requestUpdate(),this.fireSelected()}}localizeCalendarHeaders(){if(!this.locale){const e=navigator;e.hasOwnProperty("systemLanguage")?this.locale=e.systemLanguage:e.hasOwnProperty("browserLanguage")?this.locale=e.browserLanguage:this.locale=(navigator.languages||["en"])[0]}const e=(this.locale||"").toLowerCase();if("en-us"!==e&&"en"!==e){const e=new Date,t=e.getUTCDay(),i=new Date(e.getTime()-864e5*t);for(let e=0;e<7;e++){const t=new Date(i);t.setDate(i.getDate()+e),this.weekdays_short[e]=t.toLocaleString(this.locale,{weekday:"short"})}e.setDate(1);for(let t=0;t<12;t++)e.setMonth(t),this.months[t]=e.toLocaleString(this.locale,{month:"long"})}}setInitialConditions(){let e;this.calendarRefSize=this.getCalendarSize(),this.selected?(e=new Date(this.selected),this.value={date:new Date(this.selected),text:this.selected}):e=new Date,this.firstOfMonthDate=new Date(e.getFullYear(),e.getMonth(),1),this.firstdate&&(this.fDate=new Date(this.firstdate)),this.lastdate&&(this.lDate=new Date(this.lastdate))}refreshSelection(){this.weeks.forEach(e=>e.forEach(e=>{e.selected=this.selected&&e.value===this.selected||!1})),this.requestUpdate()}resized(){this.calendarRefSize=this.getCalendarSize(),this.computeCalendar(),this.refreshSelection()}getCalendarSize(){const e=this.getBoundingClientRect();return{width:e.width>180?e.width:320,height:e.height>180?e.height:320}}computeCellsizes(e,t){this.tblColWidth=e.width/7-2,this.tblHeadHeight=.25*e.height/2-2,this.tblRowHeight=.75*e.height/t-2}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}onItemClick(e){e.stopPropagation();const t=e.target;t&&t.hasAttribute("value")&&""!==t.getAttribute("value")&&(this.selected=t.getAttribute("value")||void 0,this.refreshSelection(),this.fireSelected())}fireSelected(){this.selected&&(this.value={date:new Date(this.selected),text:this.selected},le(this,"selected",{selected:this.selected}))}computeCalendar(){this.monthYear=this.months[this.firstOfMonthDate.getMonth()]+" "+this.firstOfMonthDate.getFullYear();const e=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth(),1);let t=0-e.getDay();const i=Math.ceil((new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,0).getDate()-t)/7);this.weeks=[];for(let s=0;s<i;s++){this.weeks[s]=[];for(let i=0;i<7;i++){const n=new Date(e.getTime()+864e5*t),o=this.format(n);this.weeks[s][i]={value:o,text:n.getDate().toString(),selected:o===this.selected,dimmed:n.getMonth()!==e.getMonth(),disabled:this.isDateOutOfRange(n)},t++}}this.computeCellsizes(this.calendarRefSize,i)}onPrevClick(){void 0!==this.fDate&&new Date(this.fDate.getFullYear(),this.fDate.getMonth()-1,1).getMonth()===new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1),this.computeCalendar(),this.refreshSelection())}onNextClick(){void 0!==this.lDate&&new Date(this.lDate.getFullYear(),this.lDate.getMonth()+1,1).getMonth()===new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1),this.computeCalendar(),this.refreshSelection())}isDateOutOfRange(e){return this.fDate&&this.lDate?e<this.fDate||this.lDate<e:this.fDate?e<this.fDate:!!this.lDate&&this.lDate<e}debounce(e,t,i,s){let n=0;return()=>{const o=arguments,r=i&&!n;clearTimeout(n),n=window.setTimeout(()=>{n=0,i||e.apply(s,o)},t),r&&e.apply(s,o)}}};Fe([J({type:Number}),qe("design:type",Object)],We.prototype,"elevation",void 0),Fe([J({type:String}),qe("design:type",String)],We.prototype,"selected",void 0),Fe([J({type:String}),qe("design:type",String)],We.prototype,"firstdate",void 0),Fe([J({type:String}),qe("design:type",String)],We.prototype,"lastdate",void 0),Fe([J({type:String}),qe("design:type",String)],We.prototype,"locale",void 0),Fe([J({type:Boolean,reflect:!0}),qe("design:type",Object)],We.prototype,"disabled",void 0),Fe([J({type:Boolean,reflect:!0}),qe("design:type",Object)],We.prototype,"initials",void 0),Fe([J({type:Object}),qe("design:type",Object)],We.prototype,"value",void 0),Fe([J({type:Function}),qe("design:type",Function)],We.prototype,"format",void 0),We=Fe([W("wired-calendar")],We);var Ye=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Je=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ge=class extends ae{constructor(){super(),this.elevation=1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[re,te`
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
    `}updated(e){const t=e.has("fill");this.wiredRender(t),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),n=t[1]-2*(i-1);if(this.fill&&this.fill.trim()){const t=Te([[2,2],[s-4,2],[s-2,n-4],[2,n-4]],this.seed);t.classList.add("cardFill"),e.style.setProperty("--wired-card-background-fill",this.fill.trim()),e.appendChild(t)}Ae(e,2,2,s-4,n-4,this.seed);for(let t=1;t<i;t++)Ie(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ie(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Ie(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ie(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}};Ye([J({type:Number}),Je("design:type",Object)],Ge.prototype,"elevation",void 0),Ye([J({type:String}),Je("design:type",String)],Ge.prototype,"fill",void 0),Ge=Ye([W("wired-card"),Je("design:paramtypes",[])],Ge);var Ke=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Xe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Qe=class extends ae{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[re,te`
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
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),le(this,"change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Ae(e,0,0,t[0],t[1],this.seed),this.svgCheck=Ee("g"),e.appendChild(this.svgCheck),Ie(this.svgCheck,.3*t[0],.4*t[1],.5*t[0],.7*t[1],this.seed),Ie(this.svgCheck,.5*t[0],.7*t[1],t[0]+5,-5,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};Ke([J({type:Boolean}),Xe("design:type",Object)],Qe.prototype,"checked",void 0),Ke([J({type:Boolean,reflect:!0}),Xe("design:type",Object)],Qe.prototype,"disabled",void 0),Ke([J(),Xe("design:type",Object)],Qe.prototype,"focused",void 0),Ke([G("input"),Xe("design:type",HTMLInputElement)],Qe.prototype,"input",void 0),Qe=Ke([W("wired-checkbox")],Qe);var Ze=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},et=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let tt=class extends se{constructor(){super(...arguments),this.disabled=!1,this.seed=de(),this.cardShowing=!1,this.itemNodes=[]}static get styles(){return te`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break;case 27:e.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:e.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:e.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.svg;for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();t.setAttribute("width",""+i.width),t.setAttribute("height",""+i.height);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",Ae(t,0,0,s.width,s.height,this.seed);const n=s.width-4;Ae(t,n,0,34,s.height,this.seed);const o=Math.max(0,Math.abs((s.height-24)/2)),r=function(e,t,i){return De(xe(t,$e(i)),e,!0)}(t,[[n+8,5+o],[n+26,5+o],[n+17,o+Math.min(s.height,18)]],this.seed);if(r.style.fill="currentColor",r.style.pointerEvents=this.disabled?"none":"auto",r.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",""+this.cardShowing),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||s.getAttribute("value")||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}setCardShowing(e){this.card&&(this.cardShowing=e,this.card.style.display=e?"":"none",e&&setTimeout(()=>{this.shadowRoot.getElementById("slot").assignedNodes().filter(e=>e.nodeType===Node.ELEMENT_NODE).forEach(e=>{const t=e;t.requestUpdate&&t.requestUpdate()})},10),this.setAttribute("aria-expanded",""+this.cardShowing))}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){le(this,"selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(e){e.stopPropagation(),this.setCardShowing(!this.cardShowing)}};Ze([J({type:Object}),et("design:type",Object)],tt.prototype,"value",void 0),Ze([J({type:String,reflect:!0}),et("design:type",String)],tt.prototype,"selected",void 0),Ze([J({type:Boolean,reflect:!0}),et("design:type",Object)],tt.prototype,"disabled",void 0),Ze([G("svg"),et("design:type",SVGSVGElement)],tt.prototype,"svg",void 0),Ze([G("#card"),et("design:type",HTMLDivElement)],tt.prototype,"card",void 0),tt=Ze([W("wired-combo")],tt);var it=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},st=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let nt=class extends se{constructor(){super(...arguments),this.elevation=5,this.open=!1}static get styles(){return te`
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
    `}updated(){this.card&&this.card.wiredRender(!0)}};it([J({type:Number}),st("design:type",Object)],nt.prototype,"elevation",void 0),it([J({type:Boolean,reflect:!0}),st("design:type",Object)],nt.prototype,"open",void 0),it([G("wired-card"),st("design:type",Ge)],nt.prototype,"card",void 0),nt=it([W("wired-dialog")],nt);var ot=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},rt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let at=class extends ae{constructor(){super(...arguments),this.elevation=1}static get styles(){return[re,te`
        :host {
          display: block;
          position: relative;
        }
      `]}render(){return D`<svg></svg>`}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,6*t]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5);for(let s=0;s<i;s++)Ie(e,0,6*s+3,t[0],6*s+3,this.seed)}};ot([J({type:Number}),rt("design:type",Object)],at.prototype,"elevation",void 0),at=ot([W("wired-divider")],at);var lt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},dt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ht=class extends ae{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[re,te`
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
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]),s=Be(i/2,i/2,i,i,this.seed);e.appendChild(s)}};lt([J({type:Boolean,reflect:!0}),dt("design:type",Object)],ht.prototype,"disabled",void 0),lt([G("button"),dt("design:type",HTMLButtonElement)],ht.prototype,"button",void 0),ht=lt([W("wired-fab")],ht);var ct=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},pt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ut=class extends ae{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[re,te`
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
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]);e.setAttribute("width",""+i),e.setAttribute("height",""+i),Le(e,i/2,i/2,i,i,this.seed)}};ct([J({type:Boolean,reflect:!0}),pt("design:type",Object)],ut.prototype,"disabled",void 0),ct([G("button"),pt("design:type",HTMLButtonElement)],ut.prototype,"button",void 0),ut=ct([W("wired-icon-button")],ut);var ft=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},gt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let yt=class extends ae{constructor(){super(),this.elevation=1,this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[re,te`
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
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),n=t[1]-2*(i-1);Ae(e,2,2,s-4,n-4,this.seed);for(let t=1;t<i;t++)Ie(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ie(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Ie(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ie(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}};ft([J({type:Number}),gt("design:type",Object)],yt.prototype,"elevation",void 0),ft([J({type:String}),gt("design:type",String)],yt.prototype,"src",void 0),yt=ft([W("wired-image"),gt("design:paramtypes",[])],yt);var vt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},bt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let mt=class extends ae{constructor(){super(),this.disabled=!1,this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.required=!1,this.autofocus=!1,this.readonly=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender(!0)}))}static get styles(){return[re,te`
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
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ae(e,2,2,t[0]-2,t[1]-2,this.seed)}refire(e){e.stopPropagation(),le(this,e.type,{sourceEvent:e})}focus(){this.textInput?this.textInput.focus():super.focus()}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.observe&&this.resizeObserver.observe(this.textInput)}detachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this.textInput)}};vt([J({type:Boolean,reflect:!0}),bt("design:type",Object)],mt.prototype,"disabled",void 0),vt([J({type:String}),bt("design:type",Object)],mt.prototype,"placeholder",void 0),vt([J({type:String}),bt("design:type",String)],mt.prototype,"name",void 0),vt([J({type:String}),bt("design:type",String)],mt.prototype,"min",void 0),vt([J({type:String}),bt("design:type",String)],mt.prototype,"max",void 0),vt([J({type:String}),bt("design:type",String)],mt.prototype,"step",void 0),vt([J({type:String}),bt("design:type",Object)],mt.prototype,"type",void 0),vt([J({type:String}),bt("design:type",Object)],mt.prototype,"autocomplete",void 0),vt([J({type:String}),bt("design:type",Object)],mt.prototype,"autocapitalize",void 0),vt([J({type:String}),bt("design:type",Object)],mt.prototype,"autocorrect",void 0),vt([J({type:Boolean}),bt("design:type",Object)],mt.prototype,"required",void 0),vt([J({type:Boolean}),bt("design:type",Object)],mt.prototype,"autofocus",void 0),vt([J({type:Boolean}),bt("design:type",Object)],mt.prototype,"readonly",void 0),vt([J({type:Number}),bt("design:type",Number)],mt.prototype,"minlength",void 0),vt([J({type:Number}),bt("design:type",Number)],mt.prototype,"maxlength",void 0),vt([J({type:Number}),bt("design:type",Number)],mt.prototype,"size",void 0),vt([G("input"),bt("design:type",HTMLInputElement)],mt.prototype,"textInput",void 0),mt=vt([W("wired-input"),bt("design:paramtypes",[])],mt);var wt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},xt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let kt=class extends ae{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return[re,te`
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
    </button>`}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){const i=Te([[0,0],[t[0],0],[t[0],t[1]],[0,t[1]]],this.seed);e.appendChild(i)}};wt([J(),xt("design:type",Object)],kt.prototype,"value",void 0),wt([J(),xt("design:type",Object)],kt.prototype,"name",void 0),wt([J({type:Boolean}),xt("design:type",Object)],kt.prototype,"selected",void 0),kt=wt([W("wired-item")],kt);var St=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Rt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ot=class extends ae{constructor(){super(...arguments),this.elevation=1}static get styles(){return[re,te`
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
    `}focus(){this.anchor?this.anchor.focus():super.focus()}canvasSize(){if(this.anchor){const e=this.anchor.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0],height:t[1]-2*(i-1)};for(let t=0;t<i;t++)Ie(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed),Ie(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed)}};St([J({type:Number}),Rt("design:type",Object)],Ot.prototype,"elevation",void 0),St([J({type:String}),Rt("design:type",String)],Ot.prototype,"href",void 0),St([J({type:String}),Rt("design:type",String)],Ot.prototype,"target",void 0),St([G("a"),Rt("design:type",HTMLAnchorElement)],Ot.prototype,"anchor",void 0),Ot=St([W("wired-link")],Ot);var zt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},_t=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ct=class extends ae{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return[re,te`
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
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){if(super.updated(),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}fireSelected(){le(this,"selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ae(e,0,0,t[0],t[1],this.seed)}};zt([J({type:Object}),_t("design:type",Object)],Ct.prototype,"value",void 0),zt([J({type:String}),_t("design:type",String)],Ct.prototype,"selected",void 0),zt([J({type:Boolean}),_t("design:type",Object)],Ct.prototype,"horizontal",void 0),Ct=zt([W("wired-listbox")],Ct);var Mt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Pt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let jt=class extends ae{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return[re,te`
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
    `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}wiredRender(e=!1){super.wiredRender(e),this.refreshProgressFill()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ae(e,2,2,t[0]-2,t[1]-2,this.seed)}refreshProgressFill(){if(this.progBox&&(this.progBox.parentElement&&this.progBox.parentElement.removeChild(this.progBox),this.progBox=void 0),this.svg){let e=0;const t=this.getBoundingClientRect();if(this.max>this.min){e=(this.value-this.min)/(this.max-this.min);const i=t.width*Math.max(0,Math.min(e,100));this.progBox=Te([[0,0],[i,0],[i,t.height],[0,t.height]],this.seed),this.svg.appendChild(this.progBox),this.progBox.classList.add("progbox")}}}};Mt([J({type:Number}),Pt("design:type",Object)],jt.prototype,"value",void 0),Mt([J({type:Number}),Pt("design:type",Object)],jt.prototype,"min",void 0),Mt([J({type:Number}),Pt("design:type",Object)],jt.prototype,"max",void 0),Mt([J({type:Boolean}),Pt("design:type",Object)],jt.prototype,"percentage",void 0),jt=Mt([W("wired-progress")],jt);var $t=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Nt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Et=class extends ae{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[re,te`
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
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),le(this,"change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Le(e,t[0]/2,t[1]/2,t[0],t[1],this.seed),this.svgCheck=Ee("g"),e.appendChild(this.svgCheck);const i=Math.max(.6*t[0],5),s=Math.max(.6*t[1],5);Le(this.svgCheck,t[0]/2,t[1]/2,i,s,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};$t([J({type:Boolean}),Nt("design:type",Object)],Et.prototype,"checked",void 0),$t([J({type:Boolean,reflect:!0}),Nt("design:type",Object)],Et.prototype,"disabled",void 0),$t([J({type:String}),Nt("design:type",String)],Et.prototype,"name",void 0),$t([J(),Nt("design:type",Object)],Et.prototype,"focused",void 0),$t([G("input"),Nt("design:type",HTMLInputElement)],Et.prototype,"input",void 0),Et=$t([W("wired-radio")],Et);var Dt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},At=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let It=class extends se{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return te`
      :host {
        display: inline-block;
        font-family: inherit;
        outline: none;
      }
      :host ::slotted(*) {
        padding: var(--wired-radio-group-item-padding, 5px);
      }
    `}render(){return D`<slot id="slot" @slotchange="${this.slotChange}"></slot>`}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",this.checkListener)}handleChecked(e){const t=e.detail.checked,i=e.target,s=i.name||"";t?(this.selected=t&&s||"",this.fireSelected()):i.checked=!0}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){const e=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const e=i.name||"";this.selected&&e===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(i--,i<0&&(i=e.length-1),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}selectNext(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(i++,i>=e.length&&(i=0),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}fireSelected(){le(this,"selected",{selected:this.selected})}};Dt([J({type:String}),At("design:type",String)],It.prototype,"selected",void 0),It=Dt([W("wired-radio-group")],It);var Lt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Tt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Bt=class extends ae{constructor(){super(...arguments),this.disabled=!1,this.placeholder="",this.autocomplete="",this.autocorrect="",this.autofocus=!1}static get styles(){return[re,te`
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
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;t&&(t.value=e),this.refreshIconState()}else this.pendingValue=e}wiredRender(e=!1){super.wiredRender(e),this.refreshIconState()}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ae(e,2,2,t[0]-2,t[1]-2,this.seed),this.searchIcon=Ee("g"),this.searchIcon.classList.add("thicker"),e.appendChild(this.searchIcon),Le(this.searchIcon,t[0]-30,(t[1]-30)/2+10,20,20,this.seed),Ie(this.searchIcon,t[0]-10,(t[1]-30)/2+30,t[0]-25,(t[1]-30)/2+15,this.seed),this.closeIcon=Ee("g"),this.closeIcon.classList.add("thicker"),e.appendChild(this.closeIcon),Ie(this.closeIcon,t[0]-33,(t[1]-30)/2+2,t[0]-7,(t[1]-30)/2+28,this.seed),Ie(this.closeIcon,t[0]-7,(t[1]-30)/2+2,t[0]-33,(t[1]-30)/2+28,this.seed)}refreshIconState(){this.searchIcon&&this.closeIcon&&(this.searchIcon.style.display=this.value.trim()?"none":"",this.closeIcon.style.display=this.value.trim()?"":"none")}refire(e){this.refreshIconState(),e.stopPropagation(),le(this,e.type,{sourceEvent:e})}};Lt([J({type:Boolean,reflect:!0}),Tt("design:type",Object)],Bt.prototype,"disabled",void 0),Lt([J({type:String}),Tt("design:type",Object)],Bt.prototype,"placeholder",void 0),Lt([J({type:String}),Tt("design:type",Object)],Bt.prototype,"autocomplete",void 0),Lt([J({type:String}),Tt("design:type",Object)],Bt.prototype,"autocorrect",void 0),Lt([J({type:Boolean}),Tt("design:type",Object)],Bt.prototype,"autofocus",void 0),Lt([G("input"),Tt("design:type",HTMLInputElement)],Bt.prototype,"textInput",void 0),Bt=Lt([W("wired-search-input")],Bt);var Ht=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Vt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ut=class extends ae{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.disabled=!1,this.canvasWidth=300}static get styles(){return[re,te`
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
    `}focus(){this.input?this.input.focus():super.focus()}onInput(e){e.stopPropagation(),this.updateThumbPosition(),this.input&&le(this,"change",{value:+this.input.value})}wiredRender(e=!1){super.wiredRender(e),this.updateThumbPosition()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){this.canvasWidth=t[0];const i=Math.round(t[1]/2);Ie(e,0,i,t[0],i,this.seed).classList.add("bar"),this.knob=Le(e,10,i,20,20,this.seed),this.knob.classList.add("knob")}updateThumbPosition(){if(this.input){const e=+this.input.value,t=Math.max(this.step,this.max-this.min),i=(e-this.min)/t;this.knob&&(this.knob.style.transform=`translateX(${i*(this.canvasWidth-20)}px)`)}}};Ht([J({type:Number}),Vt("design:type",Object)],Ut.prototype,"min",void 0),Ht([J({type:Number}),Vt("design:type",Object)],Ut.prototype,"max",void 0),Ht([J({type:Number}),Vt("design:type",Object)],Ut.prototype,"step",void 0),Ht([J({type:Boolean,reflect:!0}),Vt("design:type",Object)],Ut.prototype,"disabled",void 0),Ht([G("input"),Vt("design:type",HTMLInputElement)],Ut.prototype,"input",void 0),Ut=Ht([W("wired-slider")],Ut);var Ft=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},qt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Wt=class extends ae{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return[re,te`
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
      `]}render(){return D`<svg></svg>`}canvasSize(){return[76,76]}draw(e,t){Le(e,t[0]/2,t[1]/2,Math.floor(.8*t[0]),Math.floor(.8*t[1]),this.seed),this.knob=Be(0,0,20,20,this.seed),this.knob.classList.add("knob"),e.appendChild(this.knob),this.updateCursor()}updateCursor(){if(this.knob){const e=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${e[0]}px, ${e[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}updated(){super.updated(),this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(e=>this.tick(e))}tick(e){this.spinning?(this.timerstart||(this.timerstart=e),this.value=Math.min(1,(e-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}};Ft([J({type:Boolean}),qt("design:type",Object)],Wt.prototype,"spinning",void 0),Ft([J({type:Number}),qt("design:type",Object)],Wt.prototype,"duration",void 0),Wt=Ft([W("wired-spinner")],Wt);var Yt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Gt=class extends ae{constructor(){super(),this.name="",this.label="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[re,te`
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
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ae(e,2,2,t[0]-4,t[1]-4,this.seed)}};Yt([J({type:String}),Jt("design:type",Object)],Gt.prototype,"name",void 0),Yt([J({type:String}),Jt("design:type",Object)],Gt.prototype,"label",void 0),Gt=Yt([W("wired-tab"),Jt("design:paramtypes",[])],Gt);var Kt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Xt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Qt=class extends se{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return[re,te`
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
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const e=this.slotElement.assignedNodes();if(e&&e.length){for(let t=0;t<e.length;t++){const i=e[t];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const e=i;this.pages.push(e);const t=e.getAttribute("name")||"";t&&t.trim().split(" ").forEach(t=>{t&&this.pageMap.set(t,e)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){const e=this.getElement();for(let t=0;t<this.pages.length;t++){const i=this.pages[t];i===e?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=e||void 0,this.current&&this.current.wiredRender&&requestAnimationFrame(()=>requestAnimationFrame(()=>this.current.wiredRender()))}getElement(){let e=void 0;return this.selected&&(e=this.pageMap.get(this.selected)),e||(e=this.pages[0]),e||null}selectPrevious(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].name||""}}selectNext(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].name||""}}};Kt([J({type:String}),Xt("design:type",String)],Qt.prototype,"selected",void 0),Kt([G("slot"),Xt("design:type",HTMLSlotElement)],Qt.prototype,"slotElement",void 0),Qt=Kt([W("wired-tabs")],Qt);var Zt=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},ei=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ti=class extends ae{constructor(){super(...arguments),this.disabled=!1,this.rows=2,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1}static get styles(){return[re,te`
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
    `}get textarea(){return this.textareaInput}get value(){const e=this.textarea;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.textarea;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ae(e,4,4,t[0]-4,t[1]-4,this.seed)}refire(e){e.stopPropagation(),le(this,e.type,{sourceEvent:e})}};Zt([J({type:Boolean,reflect:!0}),ei("design:type",Object)],ti.prototype,"disabled",void 0),Zt([J({type:Number}),ei("design:type",Object)],ti.prototype,"rows",void 0),Zt([J({type:Number}),ei("design:type",Object)],ti.prototype,"maxrows",void 0),Zt([J({type:String}),ei("design:type",Object)],ti.prototype,"autocomplete",void 0),Zt([J({type:Boolean}),ei("design:type",Object)],ti.prototype,"autofocus",void 0),Zt([J({type:String}),ei("design:type",Object)],ti.prototype,"inputmode",void 0),Zt([J({type:String}),ei("design:type",Object)],ti.prototype,"placeholder",void 0),Zt([J({type:Boolean}),ei("design:type",Object)],ti.prototype,"required",void 0),Zt([J({type:Boolean}),ei("design:type",Object)],ti.prototype,"readonly",void 0),Zt([J({type:Number}),ei("design:type",Number)],ti.prototype,"minlength",void 0),Zt([J({type:Number}),ei("design:type",Number)],ti.prototype,"maxlength",void 0),Zt([G("textarea"),ei("design:type",HTMLTextAreaElement)],ti.prototype,"textareaInput",void 0),ti=Zt([W("wired-textarea")],ti);var ii=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},si=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ni=class extends ae{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return[re,te`
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
    `}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshKnob()}onChange(){this.checked=this.input.checked,this.refreshKnob(),le(this,"change",{checked:this.checked})}canvasSize(){return[80,34]}draw(e,t){Ae(e,16,8,t[0]-32,18,this.seed).classList.add("toggle-bar"),this.knob=Ee("g"),this.knob.classList.add("knob"),e.appendChild(this.knob);const i=Be(16,16,32,32,this.seed);i.classList.add("knobfill"),this.knob.appendChild(i),Le(this.knob,16,16,32,32,this.seed)}refreshKnob(){if(this.knob){const e=this.knob.classList;this.checked?(e.remove("unchecked"),e.add("checked")):(e.remove("checked"),e.add("unchecked"))}}};ii([J({type:Boolean}),si("design:type",Object)],ni.prototype,"checked",void 0),ii([J({type:Boolean,reflect:!0}),si("design:type",Object)],ni.prototype,"disabled",void 0),ii([G("input"),si("design:type",HTMLInputElement)],ni.prototype,"input",void 0),ni=ii([W("wired-toggle")],ni);var oi=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},ri=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ai=class extends ae{constructor(){super(),this.src="",this.autoplay=!1,this.loop=!1,this.muted=!1,this.playsinline=!1,this.playing=!1,this.timeDisplay="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[re,te`
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
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}wiredRender(){super.wiredRender(),this.progressBar&&this.progressBar.wiredRender(!0)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Ae(e,2,2,t[0]-4,t[1]-4,this.seed)}updateTime(){this.video&&this.progressBar&&(this.progressBar.value=this.video.duration?Math.round(this.video.currentTime/this.video.duration*100):0,this.timeDisplay=`${this.getTimeDisplay(this.video.currentTime)} / ${this.getTimeDisplay(this.video.duration)}`)}getTimeDisplay(e){const t=Math.floor(e/60);return`${t}:${Math.round(e-60*t)}`}togglePause(){this.video&&(this.playing?this.video.pause():this.video.play())}volumeChange(){this.video&&this.slider&&(this.video.volume=this.slider.value/100)}canPlay(){this.slider&&this.video&&(this.slider.value=100*this.video.volume)}};oi([J({type:String}),ri("design:type",Object)],ai.prototype,"src",void 0),oi([J({type:Boolean}),ri("design:type",Object)],ai.prototype,"autoplay",void 0),oi([J({type:Boolean}),ri("design:type",Object)],ai.prototype,"loop",void 0),oi([J({type:Boolean}),ri("design:type",Object)],ai.prototype,"muted",void 0),oi([J({type:Boolean}),ri("design:type",Object)],ai.prototype,"playsinline",void 0),oi([J(),ri("design:type",Object)],ai.prototype,"playing",void 0),oi([J(),ri("design:type",Object)],ai.prototype,"timeDisplay",void 0),oi([G("wired-progress"),ri("design:type",jt)],ai.prototype,"progressBar",void 0),oi([G("wired-slider"),ri("design:type",Ut)],ai.prototype,"slider",void 0),oi([G("video"),ri("design:type",HTMLVideoElement)],ai.prototype,"video",void 0),ai=oi([W("wired-video"),ri("design:paramtypes",[])],ai);export{Ue as WiredButton,We as WiredCalendar,Ge as WiredCard,Qe as WiredCheckbox,tt as WiredCombo,nt as WiredDialog,at as WiredDivider,ht as WiredFab,ut as WiredIconButton,yt as WiredImage,mt as WiredInput,kt as WiredItem,Ot as WiredLink,Ct as WiredListbox,jt as WiredProgress,Et as WiredRadio,It as WiredRadioGroup,Bt as WiredSearchInput,Ut as WiredSlider,Wt as WiredSpinner,Gt as WiredTab,Qt as WiredTabs,ti as WiredTextarea,ni as WiredToggle,ai as WiredVideo};
