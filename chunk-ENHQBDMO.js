import{c as pe,e as xe}from"./chunk-B5YOLJOS.js";import{e as be,h as B,i as D,j as N,k as we,n as ye,o as Se,u as F,v as L,w as Ce}from"./chunk-GJ2544AC.js";import{$a as r,Ab as z,Cb as re,Db as R,Eb as j,Fb as G,Gb as le,Hb as se,Hd as I,Ib as de,Id as E,Ka as f,La as K,Na as X,Oa as Y,Pa as S,Q as U,R as W,Rb as w,S as q,U as $,Ua as b,Ub as ce,Ud as _e,Va as Z,Vb as x,Vd as ke,W as g,Wa as ee,Za as c,Zb as Q,_a as o,_b as ge,ab as p,ga as J,gb as te,jb as u,jc as ue,kb as ne,kd as M,la as P,ld as T,ma as H,mc as v,nb as ie,oa as O,ob as oe,od as he,pb as C,qb as _,qd as me,wb as k,wd as fe,xb as h,xd as y,yb as d,yd as ve,za as s,zb as ae}from"./chunk-CFQYNAXY.js";var Me=`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`;var Ne=["handle"],Fe=["input"],Le=i=>({checked:i});function Ae(i,a){i&1&&te(0)}function Ve(i,a){if(i&1&&S(0,Ae,1,0,"ng-container",3),i&2){let n=ne();c("ngTemplateOutlet",n.handleTemplate||n._handleTemplate)("ngTemplateOutletContext",de(2,Le,n.checked()))}}var Pe=`
    ${Me}

    p-toggleswitch.ng-invalid.ng-dirty > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }
`,He={root:{position:"relative"}},Oe={root:({instance:i})=>["p-toggleswitch p-component",{"p-toggleswitch p-component":!0,"p-toggleswitch-checked":i.checked(),"p-disabled":i.$disabled(),"p-invalid":i.invalid()}],input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},Te=(()=>{class i extends he{name="toggleswitch";style=Pe;classes=Oe;inlineStyles=He;static \u0275fac=(()=>{let n;return function(t){return(n||(n=O(i)))(t||i)}})();static \u0275prov=W({token:i,factory:i.\u0275fac})}return i})();var Ie=new $("TOGGLESWITCH_INSTANCE"),ze={provide:be,useExisting:U(()=>A),multi:!0},A=(()=>{class i extends we{componentName="ToggleSwitch";$pcToggleSwitch=g(Ie,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(y,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;tabindex;inputId;readonly;trueValue=!0;falseValue=!1;ariaLabel;size=x();ariaLabelledBy;autofocus;onChange=new J;input;handleTemplate;_handleTemplate;focused=!1;_componentStyle=g(Te);templates;onHostClick(n){this.onClick(n)}onAfterContentInit(){this.templates.forEach(n=>{n.getType()==="handle"?this._handleTemplate=n.template:this._handleTemplate=n.template})}onClick(n){!this.$disabled()&&!this.readonly&&(this.writeModelValue(this.checked()?this.falseValue:this.trueValue),this.onModelChange(this.modelValue()),this.onChange.emit({originalEvent:n,checked:this.modelValue()}),this.input.nativeElement.focus())}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}checked(){return this.modelValue()===this.trueValue}writeControlValue(n,e){e(n),this.cd.markForCheck()}get dataP(){return this.cn({checked:this.checked(),disabled:this.$disabled(),invalid:this.invalid()})}static \u0275fac=(()=>{let n;return function(t){return(n||(n=O(i)))(t||i)}})();static \u0275cmp=f({type:i,selectors:[["p-toggleswitch"],["p-toggleSwitch"],["p-toggle-switch"]],contentQueries:function(e,t,l){if(e&1&&ie(l,Ne,4)(l,M,4),e&2){let m;C(m=_())&&(t.handleTemplate=m.first),C(m=_())&&(t.templates=m)}},viewQuery:function(e,t){if(e&1&&oe(Fe,5),e&2){let l;C(l=_())&&(t.input=l.first)}},hostVars:7,hostBindings:function(e,t){e&1&&u("click",function(m){return t.onHostClick(m)}),e&2&&(b("data-p-checked",t.checked())("data-p-disabled",t.$disabled())("data-p",t.dataP),k(t.sx("root")),h(t.cn(t.cx("root"),t.styleClass)))},inputs:{styleClass:"styleClass",tabindex:[2,"tabindex","tabindex",ge],inputId:"inputId",readonly:[2,"readonly","readonly",Q],trueValue:"trueValue",falseValue:"falseValue",ariaLabel:"ariaLabel",size:[1,"size"],ariaLabelledBy:"ariaLabelledBy",autofocus:[2,"autofocus","autofocus",Q]},outputs:{onChange:"onChange"},features:[le([ze,Te,{provide:Ie,useExisting:i},{provide:me,useExisting:i}]),X([y]),Y],decls:5,vars:22,consts:[["input",""],["type","checkbox","role","switch",3,"focus","blur","checked","pAutoFocus","pBind"],[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(e,t){e&1&&(o(0,"input",1,0),u("focus",function(){return t.onFocus()})("blur",function(){return t.onBlur()}),r(),o(2,"div",2)(3,"div",2),Z(4,Ve,1,4,"ng-container"),r()()),e&2&&(h(t.cx("input")),c("checked",t.checked())("pAutoFocus",t.autofocus)("pBind",t.ptm("input")),b("id",t.inputId)("required",t.required()?"":void 0)("disabled",t.$disabled()?"":void 0)("aria-checked",t.checked())("aria-labelledby",t.ariaLabelledBy)("aria-label",t.ariaLabel)("name",t.name())("tabindex",t.tabindex),s(2),h(t.cx("slider")),c("pBind",t.ptm("slider")),b("data-p",t.dataP),s(),h(t.cx("handle")),c("pBind",t.ptm("handle")),b("data-p",t.dataP),s(),ee(t.handleTemplate||t._handleTemplate?4:-1))},dependencies:[v,ue,fe,T,ve,y],encapsulation:2,changeDetection:0})}return i})(),Be=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=K({type:i});static \u0275inj=q({imports:[A,T,T]})}return i})();var V=class i{initial=x.required();intervalChanged=ce();value=P(1);unit=P("hours");unitOptions=[{label:"Minutes",value:"minutes"},{label:"Hours",value:"hours"}];bounds=w(()=>this.unit()==="minutes"?{min:30,max:1440}:{min:1,max:24});canSave=w(()=>{let a=this.value(),{min:n,max:e}=this.bounds();return a!=null&&Number.isFinite(a)&&a>=n&&a<=e});constructor(){H(()=>{let{value:a,unit:n}=this.initial();this.value.set(a),this.unit.set(n)}),H(()=>{let{min:a,max:n}=this.bounds(),e=this.value();e==null||!Number.isFinite(e)?this.value.set(a):e<a?this.value.set(a):e>n&&this.value.set(n)})}save(){this.canSave()&&this.intervalChanged.emit({value:this.value(),unit:this.unit()})}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=f({type:i,selectors:[["app-sync-interval-form"]],inputs:{initial:[1,"initial"]},outputs:{intervalChanged:"intervalChanged"},decls:17,vars:11,consts:[[1,"grid","gap-4"],[1,"grid","grid-cols-1","gap-3","sm:grid-cols-2","sm:gap-4"],[1,"block","text-sm","font-medium","text-[var(--color-text-muted)]","mb-1"],[1,"text-red-500"],["mode","decimal","styleClass","w-full",3,"ngModelChange","ngModel","min","max","useGrouping"],["optionLabel","label","optionValue","value","styleClass","w-full",3,"ngModelChange","ngModel","options"],[1,"text-xs","text-[var(--color-text-muted)]"],["styleClass","w-full",3,"onClick","label","disabled"]],template:function(n,e){n&1&&(o(0,"div",0)(1,"div",1)(2,"div")(3,"label",2),d(4," Every "),o(5,"span",3),d(6,"*"),r()(),o(7,"p-inputNumber",4),G("ngModelChange",function(l){return j(e.value,l)||(e.value=l),l}),r()(),o(8,"div")(9,"label",2),d(10," Unit "),o(11,"span",3),d(12,"*"),r()(),o(13,"p-select",5),G("ngModelChange",function(l){return j(e.unit,l)||(e.unit=l),l}),r()()(),o(14,"p",6),d(15),r(),o(16,"p-button",7),u("onClick",function(){return e.save()}),r()()),n&2&&(s(7),R("ngModel",e.value),c("min",e.bounds().min)("max",e.bounds().max)("useGrouping",!1),s(6),R("ngModel",e.unit),c("options",e.unitOptions),s(2),re(" Allowed: ",e.bounds().min,"\u2013",e.bounds().max," ",e.unit()," "),s(),c("label","Save")("disabled",!e.canSave()))},dependencies:[v,N,B,D,E,I,Se,ye,L,F],encapsulation:2,changeDetection:0})};var We=()=>({width:"100%"});function qe(i,a){if(i&1&&(o(0,"div",18)(1,"span",19),d(2),r(),o(3,"span",20),d(4),r()()),i&2){let n=a.$implicit;s(2),ae(n.code),s(2),z(" ",n.name," ")}}var De=class i{exchangeStore=g(_e);theme=g(xe);currencyService=g(Ce);toast=g(ke);allCurrencies=w(()=>this.currencyService.getAllCurrencies());onBaseCurrencyChange(a){this.exchangeStore.setBaseCurrency(a),this.runSync(),this.toast.success("Updated",`Base currency changed to ${a}`)}onIntervalChanged(a){this.exchangeStore.setSyncInterval(a.value,a.unit),this.toast.success("Updated","Sync interval changed")}async runSync(){try{await this.exchangeStore.syncFromApi()}catch{this.toast.error("Sync failed","Could not fetch live exchange rates")}}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=f({type:i,selectors:[["app-settings"]],decls:33,vars:13,consts:[[1,"mx-auto","grid","w-full","max-w-2xl","gap-4","md:gap-6"],[1,"flex","items-center","gap-2"],["icon","pi pi-arrow-left","severity","secondary","size","small","routerLink","/dashboard","ariaLabel","Back to dashboard",3,"text","rounded"],[1,"flex","items-center","gap-2","text-lg","font-semibold","text-[var(--color-text)]","sm:text-xl"],[1,"pi","pi-cog","text-[var(--color-primary)]"],[1,"bg-[var(--color-surface)]","rounded-[var(--radius)]","shadow-sm","border","border-[var(--color-border)]","p-3","sm:p-4"],[1,"flex","items-center","gap-2","text-base","font-semibold","mb-1","text-[var(--color-text)]","sm:text-lg"],[1,"pi","pi-globe","text-[var(--color-primary)]"],[1,"text-xs","text-[var(--color-text-muted)]","mb-3"],["optionLabel","code","optionValue","code","filterBy","code,name","placeholder","Select","styleClass","w-full",3,"onChange","options","ngModel","filter"],["pTemplate","item"],[1,"pi","pi-palette","text-[var(--color-primary)]"],[1,"flex","items-center","justify-between"],[1,"text-[var(--color-primary)]"],[1,"text-sm","text-[var(--color-text)]"],["inputId","theme-toggle","ariaLabel","Toggle dark mode",3,"ngModelChange","ngModel"],[1,"pi","pi-clock","text-[var(--color-primary)]"],[3,"intervalChanged","initial"],[1,"flex","min-w-0","items-center","gap-2"],[1,"font-semibold"],[1,"min-w-0","flex-1","truncate","text-[var(--color-text-muted)]","text-sm"]],template:function(n,e){n&1&&(o(0,"div",0)(1,"div",1),p(2,"p-button",2),o(3,"h2",3),p(4,"i",4),d(5," Settings "),r()(),o(6,"div",5)(7,"h3",6),p(8,"i",7),d(9," Base Currency "),r(),o(10,"p",8),d(11," All savings totals and exchange rates are displayed relative to this currency. "),r(),o(12,"p-select",9),u("onChange",function(l){return e.onBaseCurrencyChange(l.value)}),S(13,qe,5,2,"ng-template",10),r()(),o(14,"div",5)(15,"h3",6),p(16,"i",11),d(17," Theme "),r(),o(18,"p",8),d(19,"Toggle between light and dark mode."),r(),o(20,"div",12)(21,"div",1),p(22,"i",13),o(23,"span",14),d(24),r()(),o(25,"p-toggleSwitch",15),u("ngModelChange",function(){return e.theme.toggle()}),r()()(),o(26,"div",5)(27,"h3",6),p(28,"i",16),d(29," Exchange Rate Auto-Sync "),r(),o(30,"p",8),d(31," How often to refresh live exchange rates from the API while the app is open. "),r(),o(32,"app-sync-interval-form",17),u("intervalChanged",function(l){return e.onIntervalChanged(l)}),r()()()),n&2&&(s(2),c("text",!0)("rounded",!0),s(10),k(se(12,We)),c("options",e.allCurrencies())("ngModel",e.exchangeStore.currentBase())("filter",!0),s(10),h(e.theme.isDark()?"pi pi-moon":"pi pi-sun"),s(2),z(" ",e.theme.isDark()?"Dark":"Light"," mode "),s(),c("ngModel",e.theme.isDark()),s(7),c("initial",e.exchangeStore.syncInterval()))},dependencies:[v,N,B,D,pe,E,I,M,L,F,Be,A,V],encapsulation:2,changeDetection:0})};export{De as Settings};
