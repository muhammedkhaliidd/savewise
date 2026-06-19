import{$a as pt,$c as vt,Ab as at,Cd as xt,Dc as Vt,Fc as tt,Gc as jt,Gd as Yt,Hb as C,Hc as G,Ia as T,Ic as Rt,Ja as W,Jc as Ut,Ka as N,Kb as ft,Kd as Jt,Ld as L,Ma as M,Na as m,O as k,Oa as V,Od as Ct,P as H,Pd as _,Qc as qt,R as F,T as d,Tb as mt,Ua as D,Uc as ut,Ud as A,Vd as w,Wd as g,Xb as b,Xc as Z,Xd as Kt,Za as c,Zb as yt,_ as ot,_a as ct,aa as Bt,ab as Y,ac as u,bb as bt,bc as Ot,cb as gt,cd as Qt,da as it,db as ht,dd as Gt,ea as Pt,eb as rt,fb as st,fd as wt,gb as _t,ib as Ft,ja as B,jb as Nt,kb as P,kd as Zt,la as h,lb as U,lc as $t,mb as q,mc as Ht,na as Tt,nb as Mt,nc as Wt,pb as J,pd as et,qb as K,qc as j,ra as Dt,rb as At,sd as Xt,tb as zt,uc as Q,vb as Lt,wb as lt,xa as v,yb as S,zb as dt}from"./chunk-B3GOI3CQ.js";var kt=(()=>{class o{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(t,e){t&&e&&(t.classList?t.classList.add(e):t.className+=" "+e)}static addMultipleClasses(t,e){if(t&&e)if(t.classList){let n=e.trim().split(" ");for(let i=0;i<n.length;i++)t.classList.add(n[i])}else{let n=e.split(" ");for(let i=0;i<n.length;i++)t.className+=" "+n[i]}}static removeClass(t,e){t&&e&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(t,e){t&&e&&[e].flat().filter(Boolean).forEach(n=>n.split(" ").forEach(i=>this.removeClass(t,i)))}static hasClass(t,e){return t&&e?t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className):!1}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(e){return e!==t})}static find(t,e){return Array.from(t.querySelectorAll(e))}static findSingle(t,e){return this.isElement(t)?t.querySelector(e):null}static index(t){let e=t.parentNode.childNodes,n=0;for(var i=0;i<e.length;i++){if(e[i]==t)return n;e[i].nodeType==1&&n++}return-1}static indexWithinGroup(t,e){let n=t.parentNode?t.parentNode.childNodes:[],i=0;for(var r=0;r<n.length;r++){if(n[r]==t)return i;n[r].attributes&&n[r].attributes[e]&&n[r].nodeType==1&&i++}return-1}static appendOverlay(t,e,n="self"){n!=="self"&&t&&e&&this.appendChild(t,e)}static alignOverlay(t,e,n="self",i=!0){t&&e&&(i&&(t.style.minWidth=`${o.getOuterWidth(e)}px`),n==="self"?this.relativePosition(t,e):this.absolutePosition(t,e))}static relativePosition(t,e,n=!0){let i=$=>{if($)return getComputedStyle($).getPropertyValue("position")==="relative"?$:i($.parentElement)},r=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),l=e.offsetHeight,a=e.getBoundingClientRect(),x=this.getWindowScrollTop(),p=this.getWindowScrollLeft(),f=this.getViewport(),y=i(t)?.getBoundingClientRect()||{top:-1*x,left:-1*p},E,z,nt="top";a.top+l+r.height>f.height?(E=a.top-y.top-r.height,nt="bottom",a.top+E<0&&(E=-1*a.top)):(E=l+a.top-y.top,nt="top");let Et=a.left+r.width-f.width,Se=a.left-y.left;if(r.width>f.width?z=(a.left-y.left)*-1:Et>0?z=Se-Et:z=a.left-y.left,t.style.top=E+"px",t.style.left=z+"px",t.style.transformOrigin=nt,n){let $=Ut(/-anchor-gutter$/)?.value;t.style.marginTop=nt==="bottom"?`calc(${$??"2px"} * -1)`:$??""}}static absolutePosition(t,e,n=!0){let i=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),r=i.height,l=i.width,a=e.offsetHeight,x=e.offsetWidth,p=e.getBoundingClientRect(),f=this.getWindowScrollTop(),I=this.getWindowScrollLeft(),y=this.getViewport(),E,z;p.top+a+r>y.height?(E=p.top+f-r,t.style.transformOrigin="bottom",E<0&&(E=f)):(E=a+p.top+f,t.style.transformOrigin="top"),p.left+l>y.width?z=Math.max(0,p.left+I+x-l):z=p.left+I,t.style.top=E+"px",t.style.left=z+"px",n&&(t.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(t,e=[]){return t.parentNode===null?e:this.getParents(t.parentNode,e.concat([t.parentNode]))}static getScrollableParents(t){let e=[];if(t){let n=this.getParents(t),i=/(auto|scroll)/,r=l=>{let a=window.getComputedStyle(l,null);return i.test(a.getPropertyValue("overflow"))||i.test(a.getPropertyValue("overflowX"))||i.test(a.getPropertyValue("overflowY"))};for(let l of n){let a=l.nodeType===1&&l.dataset.scrollselectors;if(a){let x=a.split(",");for(let p of x){let f=this.findSingle(l,p);f&&r(f)&&e.push(f)}}l.nodeType!==9&&r(l)&&e.push(l)}}return e}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementDimensions(t){let e={};return t.style.visibility="hidden",t.style.display="block",e.width=t.offsetWidth,e.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",e}static scrollInView(t,e){let n=getComputedStyle(t).getPropertyValue("borderTopWidth"),i=n?parseFloat(n):0,r=getComputedStyle(t).getPropertyValue("paddingTop"),l=r?parseFloat(r):0,a=t.getBoundingClientRect(),p=e.getBoundingClientRect().top+document.body.scrollTop-(a.top+document.body.scrollTop)-i-l,f=t.scrollTop,I=t.clientHeight,y=this.getOuterHeight(e);p<0?t.scrollTop=f+p:p+y>I&&(t.scrollTop=f+p-I+y)}static fadeIn(t,e){t.style.opacity=0;let n=+new Date,i=0,r=function(){i=+t.style.opacity.replace(",",".")+(new Date().getTime()-n)/e,t.style.opacity=i,n=+new Date,+i<1&&(window.requestAnimationFrame?window.requestAnimationFrame(r):setTimeout(r,16))};r()}static fadeOut(t,e){var n=1,i=50,r=e,l=i/r;let a=setInterval(()=>{n=n-l,n<=0&&(n=0,clearInterval(a)),t.style.opacity=n},i)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,e){var n=Element.prototype,i=n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||function(r){return[].indexOf.call(document.querySelectorAll(r),this)!==-1};return i.call(t,e)}static getOuterWidth(t,e){let n=t.offsetWidth;if(e){let i=getComputedStyle(t);n+=parseFloat(i.marginLeft)+parseFloat(i.marginRight)}return n}static getHorizontalPadding(t){let e=getComputedStyle(t);return parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)}static getHorizontalMargin(t){let e=getComputedStyle(t);return parseFloat(e.marginLeft)+parseFloat(e.marginRight)}static innerWidth(t){let e=t.offsetWidth,n=getComputedStyle(t);return e+=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),e}static width(t){let e=t.offsetWidth,n=getComputedStyle(t);return e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),e}static getInnerHeight(t){let e=t.offsetHeight,n=getComputedStyle(t);return e+=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom),e}static getOuterHeight(t,e){let n=t.offsetHeight;if(e){let i=getComputedStyle(t);n+=parseFloat(i.marginTop)+parseFloat(i.marginBottom)}return n}static getHeight(t){let e=t.offsetHeight,n=getComputedStyle(t);return e-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),e}static getWidth(t){let e=t.offsetWidth,n=getComputedStyle(t);return e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)+parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),e}static getViewport(){let t=window,e=document,n=e.documentElement,i=e.getElementsByTagName("body")[0],r=t.innerWidth||n.clientWidth||i.clientWidth,l=t.innerHeight||n.clientHeight||i.clientHeight;return{width:r,height:l}}static getOffset(t){var e=t.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:e.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,e){let n=t.parentNode;if(!n)throw"Can't replace element";return n.replaceChild(e,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return!0;var n=t.indexOf("Trident/");if(n>0){var i=t.indexOf("rv:");return!0}var r=t.indexOf("Edge/");return r>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,e){if(this.isElement(e))e.appendChild(t);else if(e&&e.el&&e.el.nativeElement)e.el.nativeElement.appendChild(t);else throw"Cannot append "+e+" to "+t}static removeChild(t,e){if(this.isElement(e))e.removeChild(t);else if(e.el&&e.el.nativeElement)e.el.nativeElement.removeChild(t);else throw"Cannot remove "+t+" from "+e}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode?.removeChild(t)}static isElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}static calculateScrollbarWidth(t){if(t){let e=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(e.borderLeftWidth)-parseFloat(e.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let n=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),this.calculatedScrollbarWidth=n,n}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let e=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=e,e}static invokeElementMethod(t,e,n){t[e].apply(t,n)}static clearSelection(){if(window.getSelection&&window.getSelection())window.getSelection()?.empty?window.getSelection()?.empty():window.getSelection()?.removeAllRanges&&(window.getSelection()?.rangeCount||0)>0&&(window.getSelection()?.getRangeAt(0)?.getClientRects()?.length||0)>0&&window.getSelection()?.removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),e=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):typeof t=="number"&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||t.offsetParent===null}static isVisible(t){return t&&t.offsetParent!=null}static isExist(t){return t!==null&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,e){t&&document.activeElement!==t&&t.focus(e)}static getFocusableSelectorString(t=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`}static getFocusableElements(t,e=""){let n=this.find(t,this.getFocusableSelectorString(e)),i=[];for(let r of n){let l=getComputedStyle(r);this.isVisible(r)&&l.display!="none"&&l.visibility!="hidden"&&i.push(r)}return i}static getFocusableElement(t,e=""){let n=this.findSingle(t,this.getFocusableSelectorString(e));if(n){let i=getComputedStyle(n);if(this.isVisible(n)&&i.display!="none"&&i.visibility!="hidden")return n}return null}static getFirstFocusableElement(t,e=""){let n=this.getFocusableElements(t,e);return n.length>0?n[0]:null}static getLastFocusableElement(t,e){let n=this.getFocusableElements(t,e);return n.length>0?n[n.length-1]:null}static getNextFocusableElement(t,e=!1){let n=o.getFocusableElements(t),i=0;if(n&&n.length>0){let r=n.indexOf(n[0].ownerDocument.activeElement);e?r==-1||r===0?i=n.length-1:i=r-1:r!=-1&&r!==n.length-1&&(i=r+1)}return n[i]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection()?.toString():document.getSelection?document.getSelection()?.toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,e){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return e?.nextElementSibling;case"@prev":return e?.previousElementSibling;case"@parent":return e?.parentElement;case"@grandparent":return e?.parentElement?.parentElement;default:let n=typeof t;if(n==="string")return document.querySelector(t);if(n==="object"&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;let r=(l=>!!(l&&l.constructor&&l.call&&l.apply))(t)?t():t;return r&&r.nodeType===9||this.isExist(r)?r:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(t,e){if(t){let n=t.getAttribute(e);return isNaN(n)?n==="true"||n==="false"?n==="true":n:+n}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(t="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,t)}static unblockBodyScroll(t="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,t)}static createElement(t,e={},...n){if(t){let i=document.createElement(t);return this.setAttributes(i,e),i.append(...n),i}}static setAttribute(t,e="",n){this.isElement(t)&&n!==null&&n!==void 0&&t.setAttribute(e,n)}static setAttributes(t,e={}){if(this.isElement(t)){let n=(i,r)=>{let l=t?.$attrs?.[i]?[t?.$attrs?.[i]]:[];return[r].flat().reduce((a,x)=>{if(x!=null){let p=typeof x;if(p==="string"||p==="number")a.push(x);else if(p==="object"){let f=Array.isArray(x)?n(i,x):Object.entries(x).map(([I,y])=>i==="style"&&(y||y===0)?`${I.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${y}`:y?I:void 0);a=f.length?a.concat(f.filter(I=>!!I)):a}}return a},l)};Object.entries(e).forEach(([i,r])=>{if(r!=null){let l=i.match(/^on(.+)/);l?t.addEventListener(l[1].toLowerCase(),r):i==="pBind"?this.setAttributes(t,r):(r=i==="class"?[...new Set(n("class",r))].join(" ").trim():i==="style"?n("style",r).join(";").trim():r,(t.$attrs=t.$attrs||{})&&(t.$attrs[i]=r),t.setAttribute(i,r))}})}}static isFocusableElement(t,e=""){return this.isElement(t)?t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`):!1}}return o})();function on(){jt({variableName:Ct("scrollbar.width").name})}function rn(){Rt({variableName:Ct("scrollbar.width").name})}var te=class{element;listener;scrollableParents;constructor(s,t=()=>{}){this.element=s,this.listener=t}bindScrollListener(){this.scrollableParents=kt.getScrollableParents(this.element);for(let s=0;s<this.scrollableParents.length;s++)this.scrollableParents[s].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let s=0;s<this.scrollableParents.length;s++)this.scrollableParents[s].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var ee=(()=>{class o extends w{autofocus=!1;focused=!1;platformId=d(Dt);document=d(Bt);host=d(Tt);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){Q(this.platformId)&&this.autofocus&&setTimeout(()=>{let t=kt.getFocusableElements(this.host?.nativeElement);t.length===0&&this.host.nativeElement.focus(),t.length>0&&t[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275dir=N({type:o,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[m]})}return o})();var ne=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var Ie=`
    ${ne}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,Ee={root:({instance:o})=>{let s=typeof o.value=="function"?o.value():o.value,t=typeof o.size=="function"?o.size():o.size,e=typeof o.badgeSize=="function"?o.badgeSize():o.badgeSize,n=typeof o.severity=="function"?o.severity():o.severity;return["p-badge p-component",{"p-badge-circle":Xt(s)&&String(s).length===1,"p-badge-dot":et(s),"p-badge-sm":t==="small"||e==="small","p-badge-lg":t==="large"||e==="large","p-badge-xl":t==="xlarge"||e==="xlarge","p-badge-info":n==="info","p-badge-success":n==="success","p-badge-warn":n==="warn","p-badge-danger":n==="danger","p-badge-secondary":n==="secondary","p-badge-contrast":n==="contrast"}]}},oe=(()=>{class o extends _{name="badge";style=Ie;classes=Ee;static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275prov=k({token:o,factory:o.\u0275fac})}return o})();var ie=new F("BADGE_INSTANCE");var St=(()=>{class o extends w{componentName="Badge";$pcBadge=d(ie,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=b();badgeSize=b();size=b();severity=b();value=b();badgeDisabled=b(!1,{transform:u});_componentStyle=d(oe);get dataP(){return this.cn({circle:this.value()!=null&&String(this.value()).length===1,empty:this.value()==null,disabled:this.badgeDisabled(),[this.severity()]:this.severity(),[this.size()]:this.size()})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275cmp=T({type:o,selectors:[["p-badge"]],hostVars:5,hostBindings:function(e,n){e&2&&(D("data-p",n.dataP),S(n.cn(n.cx("root"),n.styleClass())),Lt("display",n.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[C([oe,{provide:ie,useExisting:o},{provide:A,useExisting:o}]),M([g]),m],decls:1,vars:1,template:function(e,n){e&1&&dt(0),e&2&&at(n.value())},dependencies:[j,L,Kt],encapsulation:2,changeDetection:0})}return o})(),se=(()=>{class o{static \u0275fac=function(e){return new(e||o)};static \u0275mod=W({type:o});static \u0275inj=H({imports:[St,L,L]})}return o})();var Pe=["*"],Te={root:"p-fluid"},le=(()=>{class o extends _{name="fluid";classes=Te;static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275prov=k({token:o,factory:o.\u0275fac})}return o})();var de=new F("FLUID_INSTANCE"),It=(()=>{class o extends w{componentName="Fluid";$pcFluid=d(de,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=d(le);static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275cmp=T({type:o,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(e,n){e&2&&S(n.cx("root"))},features:[C([le,{provide:de,useExisting:o},{provide:A,useExisting:o}]),M([g]),m],ngContentSelectors:Pe,decls:1,vars:0,template:function(e,n){e&1&&(U(),q(0))},dependencies:[j],encapsulation:2,changeDetection:0})}return o})();var De=["*"],_e=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,ae=(()=>{class o extends _{name="baseicon";css=_e;static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275prov=k({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var ue=(()=>{class o extends w{spin=!1;_componentStyle=d(ae);getClassNames(){return Vt("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275cmp=T({type:o,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(e,n){e&2&&S(n.getClassNames())},inputs:{spin:[2,"spin","spin",u]},features:[C([ae]),m],ngContentSelectors:De,decls:1,vars:0,template:function(e,n){e&1&&(U(),q(0))},encapsulation:2,changeDetection:0})}return o})();var Fe=["data-p-icon","spinner"],ce=(()=>{class o extends ue{pathId;onInit(){this.pathId="url(#"+xt()+")"}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275cmp=T({type:o,selectors:[["","data-p-icon","spinner"]],features:[m],attrs:Fe,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(e,n){e&1&&(ot(),bt(0,"g"),ht(1,"path",0),gt(),bt(2,"defs")(3,"clipPath",1),ht(4,"rect",2),gt()()),e&2&&(D("clip-path",n.pathId),v(3),Ft("id",n.pathId))},encapsulation:2})}return o})();var pe=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var Ne=`
    ${pe}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,Me={root:"p-ink"},be=(()=>{class o extends _{name="ripple";style=Ne;classes=Me;static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275prov=k({token:o,factory:o.\u0275fac})}return o})();var ge=(()=>{class o extends w{componentName="Ripple";zone=d(Pt);_componentStyle=d(be);animationListener;mouseDownListener;timeout;constructor(){super(),B(()=>{Q(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(t){let e=this.getInk();if(!e||this.document.defaultView?.getComputedStyle(e,null).display==="none")return;if(!this.$unstyled()&&G(e,"p-ink-active"),e.setAttribute("data-p-ink-active","false"),!vt(e)&&!wt(e)){let l=Math.max(qt(this.el.nativeElement),Gt(this.el.nativeElement));e.style.height=l+"px",e.style.width=l+"px"}let n=Qt(this.el.nativeElement),i=t.pageX-n.left+this.document.body.scrollTop-wt(e)/2,r=t.pageY-n.top+this.document.body.scrollLeft-vt(e)/2;this.renderer.setStyle(e,"top",r+"px"),this.renderer.setStyle(e,"left",i+"px"),!this.$unstyled()&&tt(e,"p-ink-active"),e.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let l=this.getInk();l&&(!this.$unstyled()&&G(l,"p-ink-active"),l.setAttribute("data-p-ink-active","false"))},401)}getInk(){let t=this.el.nativeElement.children;for(let e=0;e<t.length;e++)if(typeof t[e].className=="string"&&t[e].className.indexOf("p-ink")!==-1)return t[e];return null}resetInk(){let t=this.getInk();t&&(!this.$unstyled()&&G(t,"p-ink-active"),t.setAttribute("data-p-ink-active","false"))}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&G(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"data-p-ink","true"),this.renderer.setAttribute(t,"data-p-ink-active","false"),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,Zt(t))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(e){return new(e||o)};static \u0275dir=N({type:o,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[C([be]),m]})}return o})();var he=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\xA0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var Ae=["content"],ze=["loadingicon"],Le=["icon"],Oe=["*"],Ce=(o,s)=>({class:o,pt:s});function $e(o,s){o&1&&_t(0)}function He(o,s){if(o&1&&Y(0,"span",7),o&2){let t=P(3);S(t.cn(t.cx("loadingIcon"),"pi-spin",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon))),c("pBind",t.ptm("loadingIcon")),D("aria-hidden",!0)}}function We(o,s){if(o&1&&(ot(),Y(0,"svg",8)),o&2){let t=P(3);S(t.cn(t.cx("loadingIcon"),t.cx("spinnerIcon"))),c("pBind",t.ptm("loadingIcon"))("spin",!0),D("aria-hidden",!0)}}function Ve(o,s){if(o&1&&(rt(0),V(1,He,1,4,"span",3)(2,We,1,5,"svg",6),st()),o&2){let t=P(2);v(),c("ngIf",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon)),v(),c("ngIf",!(t.loadingIcon||t.buttonProps!=null&&t.buttonProps.loadingIcon))}}function je(o,s){}function Re(o,s){if(o&1&&V(0,je,0,0,"ng-template",9),o&2){let t=P(2);c("ngIf",t.loadingIconTemplate||t._loadingIconTemplate)}}function Ue(o,s){if(o&1&&(rt(0),V(1,Ve,3,2,"ng-container",2)(2,Re,1,1,null,5),st()),o&2){let t=P();v(),c("ngIf",!t.loadingIconTemplate&&!t._loadingIconTemplate),v(),c("ngTemplateOutlet",t.loadingIconTemplate||t._loadingIconTemplate)("ngTemplateOutletContext",ft(3,Ce,t.cx("loadingIcon"),t.ptm("loadingIcon")))}}function qe(o,s){if(o&1&&Y(0,"span",7),o&2){let t=P(2);S(t.cn(t.cx("icon"),t.icon||(t.buttonProps==null?null:t.buttonProps.icon))),c("pBind",t.ptm("icon")),D("data-p",t.dataIconP)}}function Qe(o,s){}function Ge(o,s){if(o&1&&V(0,Qe,0,0,"ng-template",9),o&2){let t=P(2);c("ngIf",!t.icon&&(t.iconTemplate||t._iconTemplate))}}function Ze(o,s){if(o&1&&(rt(0),V(1,qe,1,4,"span",3)(2,Ge,1,1,null,5),st()),o&2){let t=P();v(),c("ngIf",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!t.iconTemplate&&!t._iconTemplate),v(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",ft(3,Ce,t.cx("icon"),t.ptm("icon")))}}function Xe(o,s){if(o&1&&(ct(0,"span",7),dt(1),pt()),o&2){let t=P();S(t.cx("label")),c("pBind",t.ptm("label")),D("aria-hidden",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!(t.label||t.buttonProps!=null&&t.buttonProps.label))("data-p",t.dataLabelP),v(),at(t.label||(t.buttonProps==null?null:t.buttonProps.label))}}function Ye(o,s){if(o&1&&Y(0,"p-badge",10),o&2){let t=P();c("value",t.badge||(t.buttonProps==null?null:t.buttonProps.badge))("severity",t.badgeSeverity||(t.buttonProps==null?null:t.buttonProps.badgeSeverity))("pt",t.ptm("pcBadge"))("unstyled",t.unstyled())}}var Je={root:({instance:o})=>["p-button p-component",{"p-button-icon-only":o.hasIcon&&!o.label&&!o.buttonProps?.label&&!o.badge,"p-button-vertical":(o.iconPos==="top"||o.iconPos==="bottom")&&o.label,"p-button-loading":o.loading||o.buttonProps?.loading,"p-button-link":o.link||o.buttonProps?.link,[`p-button-${o.severity||o.buttonProps?.severity}`]:o.severity||o.buttonProps?.severity,"p-button-raised":o.raised||o.buttonProps?.raised,"p-button-rounded":o.rounded||o.buttonProps?.rounded,"p-button-text":o.text||o.variant==="text"||o.buttonProps?.text||o.buttonProps?.variant==="text","p-button-outlined":o.outlined||o.variant==="outlined"||o.buttonProps?.outlined||o.buttonProps?.variant==="outlined","p-button-sm":o.size==="small"||o.buttonProps?.size==="small","p-button-lg":o.size==="large"||o.buttonProps?.size==="large","p-button-plain":o.plain||o.buttonProps?.plain,"p-button-fluid":o.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:o})=>["p-button-icon",{[`p-button-icon-${o.iconPos||o.buttonProps?.iconPos}`]:o.label||o.buttonProps?.label,"p-button-icon-left":(o.iconPos==="left"||o.buttonProps?.iconPos==="left")&&o.label||o.buttonProps?.label,"p-button-icon-right":(o.iconPos==="right"||o.buttonProps?.iconPos==="right")&&o.label||o.buttonProps?.label,"p-button-icon-top":(o.iconPos==="top"||o.buttonProps?.iconPos==="top")&&o.label||o.buttonProps?.label,"p-button-icon-bottom":(o.iconPos==="bottom"||o.buttonProps?.iconPos==="bottom")&&o.label||o.buttonProps?.label},o.icon,o.buttonProps?.icon],spinnerIcon:({instance:o})=>Object.entries(o.cx("icon")).filter(([,s])=>!!s).reduce((s,[t])=>s+` ${t}`,"p-button-loading-icon"),label:"p-button-label"},X=(()=>{class o extends _{name="button";style=he;classes=Je;static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275prov=k({token:o,factory:o.\u0275fac})}return o})();var fe=new F("BUTTON_INSTANCE"),me=new F("BUTTON_DIRECTIVE_INSTANCE"),ye=new F("BUTTON_LABEL_INSTANCE"),ve=new F("BUTTON_ICON_INSTANCE"),O={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},we=(()=>{class o extends w{componentName="ButtonLabel";ptButtonLabel=b();pButtonLabelPT=b();pButtonLabelUnstyled=b();$pcButtonLabel=d(ye,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(g,{self:!0});constructor(){super(),B(()=>{let t=this.ptButtonLabel()||this.pButtonLabelPT();t&&this.directivePT.set(t)}),B(()=>{this.pButtonLabelUnstyled()&&this.directiveUnstyled.set(this.pButtonLabelUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(e){return new(e||o)};static \u0275dir=N({type:o,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(e,n){e&2&&lt("p-button-label",!n.$unstyled()&&!0)},inputs:{ptButtonLabel:[1,"ptButtonLabel"],pButtonLabelPT:[1,"pButtonLabelPT"],pButtonLabelUnstyled:[1,"pButtonLabelUnstyled"]},features:[C([X,{provide:ye,useExisting:o},{provide:A,useExisting:o}]),M([g]),m]})}return o})(),xe=(()=>{class o extends w{componentName="ButtonIcon";ptButtonIcon=b();pButtonIconPT=b();pButtonUnstyled=b();$pcButtonIcon=d(ve,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(g,{self:!0});constructor(){super(),B(()=>{let t=this.ptButtonIcon()||this.pButtonIconPT();t&&this.directivePT.set(t)}),B(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(e){return new(e||o)};static \u0275dir=N({type:o,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(e,n){e&2&&lt("p-button-icon",!n.$unstyled()&&!0)},inputs:{ptButtonIcon:[1,"ptButtonIcon"],pButtonIconPT:[1,"pButtonIconPT"],pButtonUnstyled:[1,"pButtonUnstyled"]},features:[C([X,{provide:ve,useExisting:o},{provide:A,useExisting:o}]),M([g]),m]})}return o})(),Ho=(()=>{class o extends w{componentName="Button";$pcButtonDirective=d(me,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(g,{self:!0});_componentStyle=d(X);ptButtonDirective=b();pButtonPT=b();pButtonUnstyled=b();hostName="";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}constructor(){super(),B(()=>{let t=this.ptButtonDirective()||this.pButtonPT();t&&this.directivePT.set(t)}),B(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())}),B(()=>{let t=this.$unstyled();this.initialized&&t&&this.setStyleClass()})}text=!1;plain=!1;raised=!1;size;outlined=!1;rounded=!1;iconPos="left";loadingIcon;fluid=b(void 0,{transform:u});iconSignal=yt(xe);labelSignal=yt(we);isIconOnly=mt(()=>!!(!this.labelSignal()&&this.iconSignal()));_label;_icon;_loading=!1;_severity;_buttonProps;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(O);pcFluid=d(It,{optional:!0,host:!0,skipSelf:!0});isTextButton=mt(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}set label(t){this._label=t,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}get icon(){return this._icon}set icon(t){this._icon=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(t){this._loading=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get buttonProps(){return this._buttonProps}set buttonProps(t){this._buttonProps=t,t&&typeof t=="object"&&Object.entries(t).forEach(([e,n])=>this[`_${e}`]!==n&&(this[`_${e}`]=n))}get severity(){return this._severity}set severity(t){this._severity=t,this.initialized&&this.setStyleClass()}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;onAfterViewInit(){!this.$unstyled()&&tt(this.htmlElement,this.getStyleClass().join(" ")),Q(this.platformId)&&(this.createIcon(),this.createLabel(),this.initialized=!0)}getStyleClass(){let t=[O.button,O.component];return this.icon&&!this.label&&et(this.htmlElement.textContent)&&t.push(O.iconOnly),this.loading&&(t.push(O.disabled,O.loading),!this.icon&&this.label&&t.push(O.labelOnly),this.icon&&!this.label&&!et(this.htmlElement.textContent)&&t.push(O.iconOnly)),this.text&&t.push("p-button-text"),this.severity&&t.push(`p-button-${this.severity}`),this.plain&&t.push("p-button-plain"),this.raised&&t.push("p-button-raised"),this.size&&t.push(`p-button-${this.size}`),this.outlined&&t.push("p-button-outlined"),this.rounded&&t.push("p-button-rounded"),this.size==="small"&&t.push("p-button-sm"),this.size==="large"&&t.push("p-button-lg"),this.hasFluid&&t.push("p-button-fluid"),this.$unstyled()?[]:t}get hasFluid(){return this.fluid()??!!this.pcFluid}setStyleClass(){let t=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...t)}removeExistingSeverityClass(){let t=["success","info","warn","danger","help","primary","secondary","contrast"],e=this.htmlElement.classList.value.split(" ").find(n=>t.some(i=>n===`p-button-${i}`));e&&this.htmlElement.classList.remove(e)}createLabel(){if(!Z(this.htmlElement,'[data-pc-section="buttonlabel"]')&&this.label){let e=ut("span",{class:this.cx("label"),"p-bind":this.ptm("buttonlabel"),"aria-hidden":this.icon&&!this.label?"true":null});e.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(e)}}createIcon(){if(!Z(this.htmlElement,'[data-pc-section="buttonicon"]')&&(this.icon||this.loading)){let e=this.label&&!this.$unstyled()?"p-button-icon-"+this.iconPos:null,n=!this.$unstyled()&&this.getIconClass(),i=ut("span",{class:this.cn(this.cx("icon"),e,n),"aria-hidden":"true","p-bind":this.ptm("buttonicon")});!this.loadingIcon&&this.loading&&(i.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(i,this.htmlElement.firstChild)}}updateLabel(){let t=Z(this.htmlElement,'[data-pc-section="buttonlabel"]');if(!this.label){t&&this.htmlElement.removeChild(t);return}t?t.textContent=this.label:this.createLabel()}updateIcon(){let t=Z(this.htmlElement,'[data-pc-section="buttonicon"]'),e=Z(this.htmlElement,'[data-pc-section="buttonlabel"]');this.loading&&!this.loadingIcon&&t?t.innerHTML=this.spinnerIcon:t?.innerHTML&&(t.innerHTML=""),t&&!this.$unstyled()?this.iconPos?t.className="p-button-icon "+(e?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():t.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}onDestroy(){this.initialized=!1}static \u0275fac=function(e){return new(e||o)};static \u0275dir=N({type:o,selectors:[["","pButton",""]],contentQueries:function(e,n,i){e&1&&At(i,n.iconSignal,xe,5)(i,n.labelSignal,we,5),e&2&&zt(2)},hostVars:4,hostBindings:function(e,n){e&2&&lt("p-button-icon-only",!n.$unstyled()&&n.isIconOnly())("p-button-text",!n.$unstyled()&&n.isTextButton())},inputs:{ptButtonDirective:[1,"ptButtonDirective"],pButtonPT:[1,"pButtonPT"],pButtonUnstyled:[1,"pButtonUnstyled"],hostName:"hostName",text:[2,"text","text",u],plain:[2,"plain","plain",u],raised:[2,"raised","raised",u],size:"size",outlined:[2,"outlined","outlined",u],rounded:[2,"rounded","rounded",u],iconPos:"iconPos",loadingIcon:"loadingIcon",fluid:[1,"fluid"],label:"label",icon:"icon",loading:"loading",buttonProps:"buttonProps",severity:"severity"},features:[C([X,{provide:me,useExisting:o},{provide:A,useExisting:o}]),M([g]),m]})}return o})(),Ke=(()=>{class o extends w{componentName="Button";hostName="";$pcButton=d(fe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(g,{self:!0});_componentStyle=d(X);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=b(void 0,{transform:u});onClick=new it;onFocus=new it;onBlur=new it;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=d(It,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}get hasIcon(){return this.icon||this.buttonProps?.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"icon":this._iconTemplate=t.template;break;case"loadingicon":this._loadingIconTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}get dataP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge,loading:this.loading,fluid:this.hasFluid,rounded:this.rounded,raised:this.raised,outlined:this.outlined||this.variant==="outlined",text:this.text||this.variant==="text",link:this.link,vertical:(this.iconPos==="top"||this.iconPos==="bottom")&&this.label})}get dataIconP(){return this.cn({[this.iconPos]:this.iconPos,[this.size]:this.size})}get dataLabelP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(o)))(n||o)}})();static \u0275cmp=T({type:o,selectors:[["p-button"]],contentQueries:function(e,n,i){if(e&1&&Mt(i,Ae,5)(i,ze,5)(i,Le,5)(i,Jt,4),e&2){let r;J(r=K())&&(n.contentTemplate=r.first),J(r=K())&&(n.loadingIconTemplate=r.first),J(r=K())&&(n.iconTemplate=r.first),J(r=K())&&(n.templates=r)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",u],raised:[2,"raised","raised",u],rounded:[2,"rounded","rounded",u],text:[2,"text","text",u],plain:[2,"plain","plain",u],outlined:[2,"outlined","outlined",u],link:[2,"link","link",u],tabindex:[2,"tabindex","tabindex",Ot],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",u],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",u],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[C([X,{provide:fe,useExisting:o},{provide:A,useExisting:o}]),M([g]),m],ngContentSelectors:Oe,decls:7,vars:17,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt","unstyled",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt","unstyled"]],template:function(e,n){e&1&&(U(),ct(0,"button",0),Nt("click",function(r){return n.onClick.emit(r)})("focus",function(r){return n.onFocus.emit(r)})("blur",function(r){return n.onBlur.emit(r)}),q(1),V(2,$e,1,0,"ng-container",1)(3,Ue,3,6,"ng-container",2)(4,Ze,3,6,"ng-container",2)(5,Xe,2,6,"span",3)(6,Ye,1,4,"p-badge",4),pt()),e&2&&(S(n.cn(n.cx("root"),n.styleClass,n.buttonProps==null?null:n.buttonProps.styleClass)),c("ngStyle",n.style||(n.buttonProps==null?null:n.buttonProps.style))("disabled",n.disabled||n.loading||(n.buttonProps==null?null:n.buttonProps.disabled))("pAutoFocus",n.autofocus||(n.buttonProps==null?null:n.buttonProps.autofocus))("pBind",n.ptm("root")),D("type",n.type||(n.buttonProps==null?null:n.buttonProps.type))("aria-label",n.ariaLabel||(n.buttonProps==null?null:n.buttonProps.ariaLabel))("tabindex",n.tabindex||(n.buttonProps==null?null:n.buttonProps.tabindex))("data-p",n.dataP)("data-p-disabled",n.disabled||n.loading||(n.buttonProps==null?null:n.buttonProps.disabled))("data-p-severity",n.severity||(n.buttonProps==null?null:n.buttonProps.severity)),v(2),c("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),v(),c("ngIf",n.loading||(n.buttonProps==null?null:n.buttonProps.loading)),v(),c("ngIf",!(n.loading||n.buttonProps!=null&&n.buttonProps.loading)),v(),c("ngIf",!n.contentTemplate&&!n._contentTemplate&&(n.label||(n.buttonProps==null?null:n.buttonProps.label))),v(),c("ngIf",!n.contentTemplate&&!n._contentTemplate&&(n.badge||(n.buttonProps==null?null:n.buttonProps.badge))))},dependencies:[j,$t,Wt,Ht,ge,ee,ce,se,St,L,g],encapsulation:2,changeDetection:0})}return o})(),Wo=(()=>{class o{static \u0275fac=function(e){return new(e||o)};static \u0275mod=W({type:o});static \u0275inj=H({imports:[j,Ke,L,L]})}return o})();var ke=class o{messageService=d(Yt);emit(s,t,e,n){this.messageService.add({severity:s,summary:t,detail:e,life:n})}show(s,t,e=4e3){this.emit("info",s,t,e)}success(s,t,e=4e3){this.emit("success",s,t,e)}error(s,t,e=4e3){this.emit("error",s,t,e)}warn(s,t,e=4e3){this.emit("warn",s,t,e)}info(s,t,e=4e3){this.emit("info",s,t,e)}static \u0275fac=function(t){return new(t||o)};static \u0275prov=k({token:o,factory:o.\u0275fac,providedIn:"root"})};export{kt as a,on as b,rn as c,te as d,ee as e,It as f,ue as g,ce as h,ge as i,xe as j,Ho as k,Ke as l,Wo as m,ke as n};
