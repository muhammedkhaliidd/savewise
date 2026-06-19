import{f as U}from"./chunk-LI7CRY56.js";import{a as G,d as ut,e as ct,f as gt}from"./chunk-WE2CH6JG.js";import{i as dt}from"./chunk-2POUYM57.js";import{$a as E,Ab as at,Hb as V,Ia as M,Ja as J,Jb as W,Kb as rt,Kd as j,Ld as C,Ma as D,N as O,Na as N,O as S,Oa as y,P as Y,Pd as H,Qb as st,R as I,T as c,Ua as x,Ud as K,Va as _,Wa as v,Wd as u,Xa as et,Xb as w,Xd as Q,Y as Z,Ya as nt,Z as tt,Za as s,_a as k,ab as ot,ac as d,bc as $,da as T,gb as B,hb as it,jb as F,kb as r,la as h,nb as A,nc as z,pb as p,qb as b,qc as R,td as P,ud as L,xa as g,yb as f,zb as lt}from"./chunk-B3GOI3CQ.js";var pt=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`;var kt=["icon"],Et=["content"],mt=e=>({$implicit:e});function Bt(e,a){e&1&&B(0)}function wt(e,a){if(e&1&&ot(0,"span",0),e&2){let t=r(3);f(t.cn(t.cx("icon"),t.checked?t.onIcon:t.offIcon,t.iconPos==="left"?t.cx("iconLeft"):t.cx("iconRight"))),s("pBind",t.ptm("icon"))}}function Lt(e,a){if(e&1&&_(0,wt,1,3,"span",2),e&2){let t=r(2);v(t.onIcon||t.offIcon?0:-1)}}function Ot(e,a){e&1&&B(0)}function St(e,a){if(e&1&&y(0,Ot,1,0,"ng-container",1),e&2){let t=r(2);s("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",W(2,mt,t.checked))}}function It(e,a){if(e&1&&(_(0,Lt,1,1)(1,St,1,4,"ng-container"),k(2,"span",0),lt(3),E()),e&2){let t=r();v(t.iconTemplate?1:0),g(2),f(t.cx("label")),s("pBind",t.ptm("label")),g(),at(t.checked?t.hasOnLabel?t.onLabel:"\xA0":t.hasOffLabel?t.offLabel:"\xA0")}}var Mt=`
    ${pt}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }

    .p-togglebutton.ng-invalid.ng-dirty {
        border-color: dt('togglebutton.invalid.border.color');
    }
`,Dt={root:({instance:e})=>["p-togglebutton p-component",{"p-togglebutton-checked":e.checked,"p-invalid":e.invalid(),"p-disabled":e.$disabled(),"p-togglebutton-sm p-inputfield-sm":e.size==="small","p-togglebutton-lg p-inputfield-lg":e.size==="large","p-togglebutton-fluid":e.fluid()}],content:"p-togglebutton-content",icon:"p-togglebutton-icon",iconLeft:"p-togglebutton-icon-left",iconRight:"p-togglebutton-icon-right",label:"p-togglebutton-label"},bt=(()=>{class e extends H{name="togglebutton";style=Mt;classes=Dt;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=S({token:e,factory:e.\u0275fac})}return e})();var ft=new I("TOGGLEBUTTON_INSTANCE"),Nt={provide:G,useExisting:O(()=>X),multi:!0},X=(()=>{class e extends U{componentName="ToggleButton";$pcToggleButton=c(ft,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=c(u,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onKeyDown(t){switch(t.code){case"Enter":this.toggle(t),t.preventDefault();break;case"Space":this.toggle(t),t.preventDefault();break}}toggle(t){!this.$disabled()&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.writeModelValue(this.checked),this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:t,checked:this.checked}),this.cd.markForCheck())}onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;styleClass;inputId;tabindex=0;iconPos="left";autofocus;size;allowEmpty;fluid=w(void 0,{transform:d});onChange=new T;iconTemplate;contentTemplate;templates;checked=!1;onInit(){(this.checked===null||this.checked===void 0)&&(this.checked=!1)}_componentStyle=c(bt);onBlur(){this.onModelTouched()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.offLabel&&this.offLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;onAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"icon":this._iconTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}writeControlValue(t,n){this.checked=t,n(t),this.cd.markForCheck()}get dataP(){return this.cn({checked:this.active,invalid:this.invalid(),[this.size]:this.size})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(n,o,i){if(n&1&&A(i,kt,4)(i,Et,4)(i,j,4),n&2){let l;p(l=b())&&(o.iconTemplate=l.first),p(l=b())&&(o.contentTemplate=l.first),p(l=b())&&(o.templates=l)}},hostVars:11,hostBindings:function(n,o){n&1&&F("keydown",function(l){return o.onKeyDown(l)})("click",function(l){return o.toggle(l)}),n&2&&(x("aria-labelledby",o.ariaLabelledBy)("aria-label",o.ariaLabel)("aria-pressed",o.checked?"true":"false")("role","button")("tabindex",o.tabindex!==void 0?o.tabindex:o.$disabled()?-1:0)("data-pc-name","togglebutton")("data-p-checked",o.active)("data-p-disabled",o.$disabled())("data-p",o.dataP),f(o.cn(o.cx("root"),o.styleClass)))},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",$],iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",d],size:"size",allowEmpty:"allowEmpty",fluid:[1,"fluid"]},outputs:{onChange:"onChange"},features:[V([Nt,bt,{provide:ft,useExisting:e},{provide:K,useExisting:e}]),D([dt,u]),N],decls:3,vars:9,consts:[[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","pBind"]],template:function(n,o){n&1&&(k(0,"span",0),y(1,Bt,1,0,"ng-container",1),_(2,It,4,5),E()),n&2&&(f(o.cx("content")),s("pBind",o.ptm("content")),x("data-p",o.dataP),g(),s("ngTemplateOutlet",o.contentTemplate||o._contentTemplate)("ngTemplateOutletContext",W(7,mt,o.checked)),g(),v(o.contentTemplate?-1:2))},dependencies:[R,z,C,Q,u],encapsulation:2,changeDetection:0})}return e})();var ht=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`;var Ft=["item"],At=(e,a)=>({$implicit:e,index:a});function Vt(e,a){return this.getOptionLabel(a)}function $t(e,a){e&1&&B(0)}function zt(e,a){if(e&1&&y(0,$t,1,0,"ng-container",3),e&2){let t=r(2),n=t.$implicit,o=t.$index,i=r();s("ngTemplateOutlet",i.itemTemplate||i._itemTemplate)("ngTemplateOutletContext",rt(2,At,n,o))}}function Rt(e,a){e&1&&y(0,zt,1,5,"ng-template",null,0,st)}function Pt(e,a){if(e&1){let t=it();k(0,"p-togglebutton",2),F("onChange",function(o){let i=Z(t),l=i.$implicit,m=i.$index,q=r();return tt(q.onOptionSelect(o,l,m))}),_(1,Rt,2,0),E()}if(e&2){let t=a.$implicit,n=r();s("autofocus",n.autofocus)("styleClass",n.styleClass)("ngModel",n.isSelected(t))("onLabel",n.getOptionLabel(t))("offLabel",n.getOptionLabel(t))("disabled",n.$disabled()||n.isOptionDisabled(t))("allowEmpty",n.getAllowEmpty())("size",n.size())("fluid",n.fluid())("pt",n.ptm("pcToggleButton"))("unstyled",n.unstyled()),g(),v(n.itemTemplate||n._itemTemplate?1:-1)}}var jt=`
    ${ht}

    /* For PrimeNG */
    .p-selectbutton.ng-invalid.ng-dirty {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }
`,Ht={root:({instance:e})=>["p-selectbutton p-component",{"p-invalid":e.invalid(),"p-selectbutton-fluid":e.fluid()}]},yt=(()=>{class e extends H{name="selectbutton";style=jt;classes=Ht;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=S({token:e,factory:e.\u0275fac})}return e})();var _t=new I("SELECTBUTTON_INSTANCE"),Kt={provide:G,useExisting:O(()=>vt),multi:!0},vt=(()=>{class e extends U{componentName="SelectButton";options;optionLabel;optionValue;optionDisabled;get unselectable(){return this._unselectable}_unselectable=!1;set unselectable(t){this._unselectable=t,this.allowEmpty=!t}tabindex=0;multiple;allowEmpty=!0;styleClass;ariaLabelledBy;dataKey;autofocus;size=w();fluid=w(void 0,{transform:d});onOptionClick=new T;onChange=new T;itemTemplate;_itemTemplate;get equalityKey(){return this.optionValue?null:this.dataKey}value;focusedIndex=0;_componentStyle=c(yt);$pcSelectButton=c(_t,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=c(u,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}getAllowEmpty(){return this.multiple?this.allowEmpty||this.value?.length!==1:this.allowEmpty}getOptionLabel(t){return this.optionLabel?P(t,this.optionLabel):t.label!=null?t.label:t}getOptionValue(t){return this.optionValue?P(t,this.optionValue):this.optionLabel||t.value===void 0?t:t.value}isOptionDisabled(t){return this.optionDisabled?P(t,this.optionDisabled):t.disabled!==void 0?t.disabled:!1}onOptionSelect(t,n,o){if(this.$disabled()||this.isOptionDisabled(n))return;let i=this.isSelected(n);if(i&&this.unselectable)return;let l=this.getOptionValue(n),m;if(this.multiple)i?m=this.value.filter(q=>!L(q,l,this.equalityKey||void 0)):m=this.value?[...this.value,l]:[l];else{if(i&&!this.allowEmpty)return;m=i?null:l}this.focusedIndex=o,this.value=m,this.writeModelValue(this.value),this.onModelChange(this.value),this.onChange.emit({originalEvent:t,value:this.value}),this.onOptionClick.emit({originalEvent:t,option:n,index:o})}changeTabIndexes(t,n){let o,i;for(let l=0;l<=this.el.nativeElement.children.length-1;l++)this.el.nativeElement.children[l].getAttribute("tabindex")==="0"&&(o={elem:this.el.nativeElement.children[l],index:l});n==="prev"?o.index===0?i=this.el.nativeElement.children.length-1:i=o.index-1:o.index===this.el.nativeElement.children.length-1?i=0:i=o.index+1,this.focusedIndex=i,this.el.nativeElement.children[i].focus()}onFocus(t,n){this.focusedIndex=n}onBlur(){this.onModelTouched()}removeOption(t){this.value=this.value.filter(n=>!L(n,this.getOptionValue(t),this.dataKey))}isSelected(t){let n=!1,o=this.getOptionValue(t);if(this.multiple){if(this.value&&Array.isArray(this.value)){for(let i of this.value)if(L(i,o,this.dataKey)){n=!0;break}}}else n=L(this.getOptionValue(t),this.value,this.equalityKey||void 0);return n}templates;onAfterContentInit(){this.templates.forEach(t=>{t.getType()==="item"&&(this._itemTemplate=t.template)})}writeControlValue(t,n){this.value=t,n(this.value),this.cd.markForCheck()}get dataP(){return this.cn({invalid:this.invalid()})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["p-selectButton"],["p-selectbutton"],["p-select-button"]],contentQueries:function(n,o,i){if(n&1&&A(i,Ft,4)(i,j,4),n&2){let l;p(l=b())&&(o.itemTemplate=l.first),p(l=b())&&(o.templates=l)}},hostVars:5,hostBindings:function(n,o){n&2&&(x("role","group")("aria-labelledby",o.ariaLabelledBy)("data-p",o.dataP),f(o.cx("root")))},inputs:{options:"options",optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",unselectable:[2,"unselectable","unselectable",d],tabindex:[2,"tabindex","tabindex",$],multiple:[2,"multiple","multiple",d],allowEmpty:[2,"allowEmpty","allowEmpty",d],styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy",dataKey:"dataKey",autofocus:[2,"autofocus","autofocus",d],size:[1,"size"],fluid:[1,"fluid"]},outputs:{onOptionClick:"onOptionClick",onChange:"onChange"},features:[V([Kt,yt,{provide:_t,useExisting:e},{provide:K,useExisting:e}]),D([u]),N],decls:2,vars:0,consts:[["content",""],[3,"autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid","pt","unstyled"],[3,"onChange","autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid","pt","unstyled"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,o){n&1&&et(0,Pt,2,12,"p-togglebutton",1,Vt,!0),n&2&&nt(o.options)},dependencies:[X,gt,ut,ct,R,z,C,Q],encapsulation:2,changeDetection:0})}return e})(),Fe=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=J({type:e});static \u0275inj=Y({imports:[vt,C,C]})}return e})();export{vt as a,Fe as b};
