/*! Hammer.JS - v2.0.2 - 2014-07-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e,f;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0,f=a.length;f>e;e++)b.call(c,a[e],e,a);else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0,g=e.length;g>f;f++)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]);return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==hb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0,e=a.length;e>d;d++)if(c&&a[d][c]==b||!c&&a[d]===b)return d;return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0,g=a.length;g>f;f++){var h=b?a[f][b]:a[f];s(e,h)<0&&d.push(a[f]),e[f]=h}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0,h=fb.length;h>g;g++)if(c=fb[g],e=c?c+f:b,e in a)return e;return d}function w(){return lb++}function x(b,c){var d=this;this.manager=b,this.callback=c,this.element=b.element,this.target=b.options.inputTarget,this.domHandler=function(a){l(b.options.enable,[b])&&d.handler(a)},this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(a,this.evWin,this.domHandler)}function y(a){var b;return new(b=ob?M:pb?N:nb?P:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&vb&&d-e===0,g=b&(xb|yb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=kb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY),b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,C(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===vb||f.eventType===xb)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=yb&&(i>ub||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=jb(l.x)>jb(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;c++)b[c]={clientX:ib(a.pointers[c].clientX),clientY:ib(a.pointers[c].clientY)};return{timeStamp:kb(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:ib(a[0].clientX),y:ib(a[0].clientY)};for(var c=0,d=0,e=0;b>e;e++)c+=a[e].clientX,d+=a[e].clientY;return{x:ib(c/b),y:ib(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?zb:jb(a)>=jb(b)?a>0?Ab:Bb:b>0?Cb:Db}function H(a,b,c){c||(c=Hb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Hb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ib)-I(a[1],a[0],Ib)}function K(a,b){return H(b[0],b[1],Ib)/H(a[0],a[1],Ib)}function L(){this.evEl=Kb,this.evWin=Lb,this.allow=!0,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Ob,this.evWin=Pb,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=Rb,this.targetIds={},x.apply(this,arguments)}function O(a,b){var c=t(a.touches),d=this.targetIds;if(b&(vb|wb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.targetTouches),h=t(a.changedTouches),i=[];if(b===vb)for(e=0,f=g.length;f>e;e++)d[g[e].identifier]=!0;for(e=0,f=h.length;f>e;e++)d[h[e].identifier]&&i.push(h[e]),b&(xb|yb)&&delete d[h[e].identifier];return i.length?[u(g.concat(i),"identifier",!0),i]:void 0}function P(){x.apply(this,arguments);var a=k(this.handler,this);this.touch=new N(this.manager,a),this.mouse=new L(this.manager,a)}function Q(a,b){this.manager=a,this.set(b)}function R(a){if(q(a,Xb))return Xb;var b=q(a,Yb),c=q(a,Zb);return b&&c?Yb+" "+Zb:b||c?b?Yb:Zb:q(a,Wb)?Wb:Vb}function S(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=$b,this.simultaneous={},this.requireFail=[]}function T(a){return a&dc?"cancel":a&bc?"end":a&ac?"move":a&_b?"start":""}function U(a){return a==Db?"down":a==Cb?"up":a==Ab?"left":a==Bb?"right":""}function V(a,b){var c=b.manager;return c?c.get(a):a}function W(){S.apply(this,arguments)}function X(){W.apply(this,arguments),this.pX=null,this.pY=null}function Y(){W.apply(this,arguments)}function Z(){S.apply(this,arguments),this._timer=null,this._input=null}function $(){W.apply(this,arguments)}function _(){W.apply(this,arguments)}function ab(){S.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function bb(a,b){return b=b||{},b.recognizers=m(b.recognizers,bb.defaults.preset),new cb(a,b)}function cb(a,b){b=b||{},this.options=i(b,bb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=y(this),this.touchAction=new Q(this,this.options.touchAction),db(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[2])},this)}function db(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function eb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var fb=["","webkit","moz","MS","ms","o"],gb=b.createElement("div"),hb="function",ib=Math.round,jb=Math.abs,kb=Date.now,lb=1,mb=/mobile|tablet|ip(ad|hone|od)|android/i,nb="ontouchstart"in a,ob=v(a,"PointerEvent")!==d,pb=nb&&mb.test(navigator.userAgent),qb="touch",rb="pen",sb="mouse",tb="kinect",ub=25,vb=1,wb=2,xb=4,yb=8,zb=1,Ab=2,Bb=4,Cb=8,Db=16,Eb=Ab|Bb,Fb=Cb|Db,Gb=Eb|Fb,Hb=["x","y"],Ib=["clientX","clientY"];x.prototype={handler:function(){},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(a,this.evWin,this.domHandler)}};var Jb={mousedown:vb,mousemove:wb,mouseup:xb},Kb="mousedown",Lb="mousemove mouseup";j(L,x,{handler:function(a){var b=Jb[a.type];b&vb&&0===a.button&&(this.pressed=!0),b&wb&&1!==a.which&&(b=xb),this.pressed&&this.allow&&(b&xb&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:sb,srcEvent:a}))}});var Mb={pointerdown:vb,pointermove:wb,pointerup:xb,pointercancel:yb,pointerout:yb},Nb={2:qb,3:rb,4:sb,5:tb},Ob="pointerdown",Pb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Ob="MSPointerDown",Pb="MSPointerMove MSPointerUp MSPointerCancel"),j(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Mb[d],f=Nb[a.pointerType]||a.pointerType,g=f==qb;e&vb&&(0===a.button||g)?b.push(a):e&(xb|yb)&&(c=!0);var h=s(b,a.pointerId,"pointerId");0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Qb={touchstart:vb,touchmove:wb,touchend:xb,touchcancel:yb},Rb="touchstart touchmove touchend touchcancel";j(N,x,{handler:function(a){var b=Qb[a.type],c=O.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:qb,srcEvent:a})}}),j(P,x,{handler:function(a,b,c){var d=c.pointerType==qb,e=c.pointerType==sb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(xb|yb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Sb=v(gb.style,"touchAction"),Tb=Sb!==d,Ub="compute",Vb="auto",Wb="manipulation",Xb="none",Yb="pan-x",Zb="pan-y";Q.prototype={set:function(a){a==Ub&&(a=this.compute()),Tb&&(this.manager.element.style[Sb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),R(a.join(" "))},preventDefaults:function(a){if(!Tb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,Xb),f=q(d,Zb),g=q(d,Yb);return e||f&&g||f&&c&Eb||g&&c&Fb?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var $b=1,_b=2,ac=4,bc=8,cc=bc,dc=16,ec=32;S.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=V(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=V(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=V(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=V(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?T(d):""),a)}var c=this,d=this.state;bc>d&&b(!0),b(),d>=bc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=ec)},canEmit:function(){for(var a=0;a<this.requireFail.length;a++)if(!(this.requireFail[a].state&(ec|$b)))return!1;return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(cc|dc|ec)&&(this.state=$b),this.state=this.process(b),void(this.state&(_b|ac|bc|dc)&&this.tryEmit(b))):(this.reset(),void(this.state=ec))},process:function(){},getTouchAction:function(){},reset:function(){}},j(W,S,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(_b|ac),e=this.attrTest(a);return d&&(c&yb||!e)?b|dc:d||e?c&xb?b|bc:b&_b?b|ac:_b:ec}}),j(X,W,{defaults:{event:"pan",threshold:10,pointers:1,direction:Gb},getTouchAction:function(){var a=this.options.direction;if(a===Gb)return[Xb];var b=[];return a&Eb&&b.push(Zb),a&Fb&&b.push(Yb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Eb?(e=0===f?zb:0>f?Ab:Bb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?zb:0>g?Cb:Db,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return W.prototype.attrTest.call(this,a)&&(this.state&_b||!(this.state&_b)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=U(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(Y,W,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Xb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&_b)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(Z,S,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Vb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(xb|yb)&&!f)this.reset();else if(a.eventType&vb)this.reset(),this._timer=e(function(){this.state=cc,this.tryEmit()},b.time,this);else if(a.eventType&xb)return cc;return ec},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===cc&&(a&&a.eventType&xb?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=kb(),this.manager.emit(this.options.event,this._input)))}}),j($,W,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Xb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&_b)}}),j(_,W,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Eb|Fb,pointers:1},getTouchAction:function(){return X.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Eb|Fb)?b=a.velocity:c&Eb?b=a.velocityX:c&Fb&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&jb(b)>this.options.velocity&&a.eventType&xb},emit:function(a){var b=U(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(ab,S,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Wb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&vb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=xb)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=cc,this.tryEmit()},b.interval,this),_b):cc}return ec},failTimeout:function(){return this._timer=e(function(){this.state=ec},this.options.interval,this),ec},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==cc&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),bb.VERSION="2.0.2",bb.defaults={domEvents:!1,touchAction:Ub,inputTarget:null,enable:!0,preset:[[$,{enable:!1}],[Y,{enable:!1},["rotate"]],[_,{direction:Eb}],[X,{direction:Eb},["swipe"]],[ab],[ab,{event:"doubletap",taps:2},["tap"]],[Z]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var fc=1,gc=2;cb.prototype={set:function(a){return h(this.options,a),this},stop:function(a){this.session.stopped=a?gc:fc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&cc)&&(e=b.curRecognizer=null);for(var f=0,g=d.length;g>f;f++)c=d[f],b.stopped===gc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(_b|ac|bc)&&(e=b.curRecognizer=c)}},get:function(a){if(a instanceof S)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&eb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0,e=c.length;e>d;d++)c[d](b)}},destroy:function(){this.element&&db(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(bb,{INPUT_START:vb,INPUT_MOVE:wb,INPUT_END:xb,INPUT_CANCEL:yb,STATE_POSSIBLE:$b,STATE_BEGAN:_b,STATE_CHANGED:ac,STATE_ENDED:bc,STATE_RECOGNIZED:cc,STATE_CANCELLED:dc,STATE_FAILED:ec,DIRECTION_NONE:zb,DIRECTION_LEFT:Ab,DIRECTION_RIGHT:Bb,DIRECTION_UP:Cb,DIRECTION_DOWN:Db,DIRECTION_HORIZONTAL:Eb,DIRECTION_VERTICAL:Fb,DIRECTION_ALL:Gb,Manager:cb,Input:x,TouchAction:Q,Recognizer:S,AttrRecognizer:W,Tap:ab,Pan:X,Swipe:_,Pinch:Y,Rotate:$,Press:Z,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==hb&&define.amd?define(function(){return bb}):"undefined"!=typeof module&&module.exports?module.exports=bb:a[c]=bb}(window,document,"Hammer");

;/*!
 * /? [- /\ |) `/   /= () /?   /< |-| /\ |\| /\ ( /\ |) [- |\/| `/
 *
 * v0.1.0
 * Date: 2014-09-03
 */
(function(window, undefined) {

    "use strict";


var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);




var StartView = (function() {

    var startScreen = $("#start-screen"),
        leaf = $(".start-leaf"),
        leafTrace = $("#leaf-trace"),
        leafLeftTrace = $('#leaf-trace__left'),
        leafRightTrace = $('#leaf-trace__right'),
        topPanel = $(".start-screen__top"),
        bottomPanel = $(".start-screen__bottom"),
        renderTrace = function(path) {
        /**
        *  @see http://jakearchibald.com/2013/animated-line-drawing-svg/
        */

            var length = path.getTotalLength();
            // Clear any previous transition
            path.style.transition = path.style.WebkitTransition =
            'none';
            // Set up the starting positions
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            path.style.visibility = "visible";
            // Define our transition
            path.style.transition = path.style.WebkitTransition =
            'stroke-dashoffset 1.5s ease-in-out';
            // Go!
            path.style.strokeDashoffset = '0';
        };

    return { 
        init: function(onComplete) {
            renderTrace(leafLeftTrace);
            renderTrace(leafRightTrace);

            // TODO: clean up nesting
            setTimeout(function(){
                leafTrace.classList.add("hide");
                leaf.classList.add("show");
                setTimeout(function() {
                    leaf.classList.add("scaleDown");
                    setTimeout(function() {
                        // may possibly need to make panels look seamless
                        // $("#start-screen").style.background = "none";
                        topPanel.classList.add("slideUp");
                        bottomPanel.classList.add("slideDown");
                        setTimeout(function() {
                            // destroy start screen and clear references
                            startScreen.parentNode.removeChild(startScreen);
                            if (onComplete) {
                                onComplete();
                            }
                            startScreen = null;
                            leaf = null;
                            leafTrace = null;
                            leafLeftTrace = null;
                            leafRightTrace = null;
                            topPanel = null;
                            bottomPanel = null;
                            renderTrace = null;
                        }, 600);
                    }, 600);
                }, 500);
            }, 1500);
        }
    };
})();



    var transformProp = Modernizr.prefixed('transform');

    /**
     * @class SlideView
     * @desc View for slides with static content
     */
    var SlideView = function(opts) {
        this.el = opts.el;
    };

    /**
     * @method update
     * @desc updates slide position
     */
    SlideView.prototype.update = function (data) {
        var style = this.el.style;
        style.opacity =  data.opacity;
        style[transformProp] = "translate3d(0px , 0px," + data.translateZ  + "px) rotateY(" + data.rotateY + "deg)";
    };

    /**
     * @method enableAnimation
     * adds class that enables smooth transitioning via CSS
     */
    SlideView.prototype.enableAnimation = function () {
        this.el.classList.add("animateTransform");
    };

    /**
     * @method disableAnimation
     * removes class that enables smooth transitioning
     */
    SlideView.prototype.disableAnimation = function() {
        this.el.classList.remove("animateTransform");
    };



    /**
     * @class IframeSlideView
     * @extends SlideView
     * @desc SlideView for managing content heavy iframes
     */
    var IframeSlideView = function(opts) {

        SlideView.apply(this, arguments);
        var iframe = document.createElement("iframe");
        iframe.src = "about:blank";
        /*
        consider adding a load event
        iframe.onload = function() {
        };
        */
        var self = this;
            // TODO make iframe transitions smooth
        iframe.onload = function() {
            self.iframe.style.visibility = "visible";
        };
        this.iframe = iframe;
        this.src = opts.src;
        this.loaded = false;
        this.container = this.el.querySelector(".content--iframe");

        this.container.appendChild(iframe);
    };

    IframeSlideView.prototype = Object.create(SlideView.prototype);
    IframeSlideView.prototype.constructor = IframeSlideView;

    /**
     * @method load
     * @desc loads iframe source
     */
    IframeSlideView.prototype.load = function() {
        if (!this.loaded) {
            this.iframe.src = this.src;
            this.loaded = true;
            this.iframe.style.visibility = "hidden";
        }
    };

    /**
     * @method destroy
     * @desc clears iframe by adding blank page
     */
    IframeSlideView.prototype.destroy = function() {
        if (this.loaded) {
            this.iframe.src = "about:blank";
            this.loaded = false;
        }
    };




    /**
     * @class AnimSlideView
     * @extends SlideView
     * @desc SlideView for animations
     */
    var AnimSlideView = function(opts) {

        SlideView.apply(this, arguments);
        // override current play function if needed
        if (opts.play) {
            this.play = opts.play;
        }
        this.played = false;

    };

    AnimSlideView.prototype = Object.create(SlideView.prototype);
    AnimSlideView.prototype.constructor = AnimSlideView;

    /**
     * @method play
     * @desc plays animation
     */
    AnimSlideView.prototype.play = function() {
        if (!this.played) {
            this.el.classList.add("render");
            this.played = true;
        }
    };



    var HelloKASlideView = new AnimSlideView({
        el: $("#hello-ka"),
    });

    window.HelloKASlideView = HelloKASlideView;


    var KeylightSlideView = new IframeSlideView({
        el: $("#sound-viz"),
        src: "http://hakim.se/experiments/html5/keylight/03"
    });



    /**
     * @class PersistentAnimSlideView
     * @extends AnimSlideView
     * @desc SlideView for animations that loop or have infinite frames
     */
    var PersistentAnimSlideView = function(opts) {

        AnimSlideView.apply(this, arguments);
        if (opts.setup) {
            this.setup = opts.setup;
        }

        if (opts.pause) {
            this.pause = opts.pause;
        }

    };

    PersistentAnimSlideView.prototype = Object.create(AnimSlideView.prototype);
    PersistentAnimSlideView.prototype.constructor = PersistentAnimSlideView;

    /**
     * @method setup
     * @desc performs preprocessing or any other work before animation
     */
    PersistentAnimSlideView.prototype.setup = function() {
    };

    /**
     * @method play
     * @desc plays animation
     */
    PersistentAnimSlideView.prototype.play = function() {
    };

    /**
     * @method pause
     * @desc pause  animation
     */
    PersistentAnimSlideView.prototype.pause = function() {
    };



var VideoSlideView;

(function() {

var canvas = $("#videoCanvas"),
    ctx = canvas.getContext("2d"),

    bgCanvas = document.createElement("canvas"),
    bgCtx = bgCanvas.getContext("2d"),

    canvasW,
    canvasH,
    imageData,
    keyword = "V I D E O",
    rowGap = 10,
    columnGap = 10,
    requestId,
    drawing = false,
    particles;

 
var draw = function() {
    if (drawing) {
        ctx.clearRect(0, 0, canvasW, canvasH);
        // add text shadows
        ctx.shadowColor = "#000";
        ctx.shadowBlur = "4";
        // draw
        var p,x,y;
        ctx.lineWidth = 1;
        for (var i = 0; i < particles.length; i++) {

            var width   = columnGap - 2,
                height  = rowGap;
            p = particles[i];
            x = p.x;
            y = p.y;
            ctx.fillStyle = p.color;
            ctx.strokeStyle = p.color;

            ctx.beginPath();
            ctx.moveTo( x, y);

            // oscillate between a threshold
            ctx.lineTo(x + (2 + Math.random() * width), y);
        

            ctx.closePath();
            ctx.stroke();
           
        }
        requestId = requestAnimationFrame(draw);
    }
 };

    VideoSlideView = new PersistentAnimSlideView({
        el: $("#video"),
        setup: function() {
            if (!this.ready) {
                var textMetrics,
                    worker;
                canvasW = this.el.querySelector('.content-wrapper').offsetWidth;
                canvasH = this.el.querySelector('.content-wrapper').offsetHeight;

                canvas.width = canvasW;
                canvas.height = canvasH;
                bgCanvas.width = canvasW;
                bgCanvas.height = canvasH;


                bgCtx.font = "125px bold Oswald ";
                // Fill the keyword text onto the bgCanvas.
                textMetrics = bgCtx.measureText(keyword);
                // console.log(textMetrics);
                // draw text relative to its vertical middle
                bgCtx.textBaseline = "middle";
                bgCtx.fillText(keyword, ( canvasW / 2 ) - ( Math.round( textMetrics.width /2 ) ) , (canvasH / 2));
                imageData = bgCtx.getImageData(0, 0, canvasW, canvasH).data;
               
                // TODO resize text if too big
                worker = new Worker("js/thread/prepareVideoSlideView.min.js");
                worker.addEventListener("message", function(e) {
                    particles = e.data.message;
                    console.log(e.data);
                    worker.terminate();
                    worker = null;
                });

                // tell worker to begin image processing
                worker.postMessage({
                    canvasW: canvasW,
                    canvasH: canvasH,
                    imageData: imageData
                });
            }
            this.ready = true;
        },
        play: function() {
            drawing = true;
            requestId = requestAnimationFrame(draw);

        },
        pause: function() {
            console.log("pause");
            drawing = false;
            cancelAnimationFrame(requestId);
        }
    });

})();

         
    window.VideoSlideView = VideoSlideView;


    var AaronTropeSlideView = new IframeSlideView({
        el: $("#aaron-trope"),
        src: "http://www.aaronkoblin.com/Aaronetrope/"
    });

    window.AaronTropeSlideView = AaronTropeSlideView;


    var HelloRacerSlideView = new IframeSlideView({
        el: $("#graphics"),
        src: "http://helloracer.com/webgl/"
    });


    var ReadySlideView = new AnimSlideView({
        el: $("#ready"),
        play: function() {
            var tree = $("#khan-tree");
             // first trigger a reflow
            // tree.getBoundingClientRect();
            tree.classList.add("render");
        }
    });

    window.ReadySlideView = ReadySlideView;

// https://developer.mozilla.org/en-US/docs/Web/Events/wheel

// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(window,document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            console.log("DOMMouseScroll");
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);



// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


 /* jshint strict: false */


var transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
    'MozTransition'    : 'transitionend',      // only for FF < 15
    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
},
transEndEvent = transEndEventNames[ Modernizr.prefixed('transition') ];



var SlidedeckView = function(el, slides) {
 
    var frames = slides,
        lastFrameIndex = frames.length - 1,
        wheelDelta = 0,
        perspective = 3000, // corresponds to value for webkit perspective
        vanishingPoint = 19000,
        focusPoint = -1500,
        dampConstant = 1, // 0.2
        ticking = false, 
        
        perspectiveOffset = 500, // 1500
        isMouseWheel = false,
        curIdx = 0,
        currentFrame = frames[curIdx],
        prevFrame = frames[curIdx - 1],
        nextTwoFrame = frames[curIdx - 2],
        nextFrame = frames[curIdx + 1],
        KEY_LEFT = 37,
        KEY_RIGHT = 39;

    var hammerTime = new Hammer.Manager(el, {
        recognizers: [
            // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
            [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
        ]
    });

    function _updateSlideReferences() {
        currentFrame = frames[curIdx];
        prevFrame = frames[curIdx - 1];
        nextFrame = frames[curIdx + 1];
        nextTwoFrame = frames[curIdx + 2];
    }

    function _renderSlide() {

        currentFrame = frames[curIdx];
        _updateSlideReferences();
        frames.forEach(function(f, i){
            f.enableAnimation();
        });
        wheelDelta = curIdx > 0 ? perspective * curIdx : 0;
        requestTick();
    }

    function nextSlide() {


        if (curIdx < lastFrameIndex) {
            curIdx += 1;
            _renderSlide();
        }
       
    }

    function previousSlide() {

        if (curIdx >= 1) {
            curIdx -= 1;
            _renderSlide();
        }
        
    }


    function handleKeys(e) {
      
        var keyCode = e.keyCode;
        if (keyCode === KEY_LEFT) {

            previousSlide();
            
        } else if (keyCode === KEY_RIGHT) {
           
            nextSlide();
        }
        
    }

   

    function handleMouseWheel(e) {
        wheelDelta += e.deltaY * dampConstant;
        // console.log("requesting Tick");
        isMouseWheel = true;
        requestTick();
    }

    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    function calculateRotation(translateZ) {
        // before a slide moves completely out of view (perspective == translateZ),
        // add rotations
        return (translateZ >= focusPoint && translateZ <  perspective) ? ((translateZ - focusPoint) / perspective) * 90 : 0;
        
    }

    function calculateOpacity(z) {

        // normalize z relative to focus point
        z = Math.abs(z) + focusPoint;
        // the further we're away the more transparent the slide gets
        return (z < vanishingPoint) ? 1 - (z / vanishingPoint): 0;
        

    }

    /**
     * @function playAfterTransition
     * @desc plays slide after transition ends, i.e. slide stops moving
     */
    function playAfterTransition(){
        // console.log("transitionend");
        // console.log(currentFrame);
        currentFrame.play();
        currentFrame.el.removeEventListener(transEndEvent, playAfterTransition);
    }

    function update() {

        var translateZ,
            rotateY;

        if (isMouseWheel) {
            frames.forEach(function(f, i){
                f.disableAnimation();
            });   
        }


        frames.forEach(function(f, i) {

            translateZ =  (focusPoint + (-perspective * i) + wheelDelta);

            if (isMouseWheel && translateZ > focusPoint && translateZ <  perspective) {
                curIdx = i;
                _updateSlideReferences();
            }
           
            // add some additional offset if slide should be offScreen
            if (i < curIdx) {
                translateZ += perspectiveOffset;
            }
            
            rotateY = calculateRotation(translateZ);

            // add rotation if needed for mouse/swipe events
            if (translateZ > perspective) {
                rotateY = 90;
            }

            f.update({
                opacity: calculateOpacity(translateZ),
                rotateY: rotateY,
                translateZ: translateZ
            });

        });

        
        if (currentFrame) {

            if (currentFrame.play) {
                if (isMouseWheel) {
                    if (!currentFrame.played) {
                        currentFrame.play();
                    }
                } else {
          
                    currentFrame.el.addEventListener(transEndEvent, playAfterTransition);
                }

            }

            if (currentFrame.load) {
              currentFrame.load();  
            }
        }

        if (nextFrame) {
            // browser bug in Chrome where
            // loading Youtube Iframe or Canvas with lowered opacity
            // messes up zIndex layering
            // fixed by setting to full opacity
            if (nextFrame.el.id === "networking" || nextFrame.el.id === "video") {
                nextFrame.el.style.opacity = "1.0";
            }

            if (nextFrame.destroy) {
                nextFrame.destroy();
            }

            if (nextFrame.pause) {
                nextFrame.pause();
            }
               /*
                console.log(nextFrame.el.id);
                if (nextFrame && nextFrame.load) {
                    console.log(nextFrame.id);
                    nextFrame.load();
                }*/
        }

        if (nextTwoFrame) {
            if (nextTwoFrame.setup) {
                nextTwoFrame.setup();
            }
        }

        /*
            TODO consider refreshing previous frame instead
            of deleting it
            
            if (prevFrame && prevFrame.load) {
                prevFrame.load();
            }
         */
        if (prevFrame) {
            if  (prevFrame.destroy) {
                prevFrame.destroy();
            }
            if (prevFrame.pause) {
                prevFrame.pause();
            }
        }

        if (isMouseWheel) {
            isMouseWheel = false;
        }
        
        ticking = false;
    }

    hammerTime.on("swipeleft", nextSlide);
    hammerTime.on("swiperight", previousSlide);
    window.addEventListener("keyup", handleKeys);
    addWheelListener(window, handleMouseWheel);

    if (Modernizr.csstransforms3d) {
        requestTick();
    }

    this.getFrames = function() {
        return frames;
    };
    this.play =  function(idx) {
        var frame = frames[idx];
        if (frame && frame.play) {
            frame.play();
        }
    };

};



 /* jshint strict: false */

    var slides = $$(".slide"),
        slideDeck = new SlidedeckView($("#world"), [
            // Hello Khan Academy
            HelloKASlideView,
            // What
            new SlideView({
                el: slides[1],
            }),
            // Specifics
            new SlideView({
                el: slides[2],
            }),
            // Research
            new SlideView({
                el: slides[3],
            }),
            // HTML5 Expansions
            new SlideView({
                el: slides[4],
            }),
            // Sound Visualization
            KeylightSlideView,
            // Chrome Racer
            new SlideView({
                el: slides[6],
            }),
            // Video Introduction
            VideoSlideView,
            // Aaron Trope
            AaronTropeSlideView,
            // Hello Racer
            HelloRacerSlideView,
            // Visualizing Algorithms
            new SlideView({
                el: slides[10],
            }),
            // Enable
            new SlideView({
                el: slides[11],
            }),
            // Anthony Su
            new SlideView({
                el: slides[12],
            }),
            // I'm Ready
            ReadySlideView
        ]);
        StartView.init(function() {
            slideDeck.play(0);
        });
        window.slideDeck = slideDeck;


})(this);
