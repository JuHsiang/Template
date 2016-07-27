/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://static.wikitec.com.cn/components/v1.5/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 该文件是为了打包用
	 * 之后可以定制化，比如需要哪些控件，则在下面Require一下，重新打包
	 */
	__webpack_require__(1);
	__webpack_require__(6);
	__webpack_require__(20);
	__webpack_require__(24);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(31);
	__webpack_require__(22);
	__webpack_require__(33);
	__webpack_require__(40);
	__webpack_require__(43);
	__webpack_require__(45);
	//require('./iCheck');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 弹出模态框的封装(基于bootstrap)
	 * author: le0zh
	 *
	 * 插件文档： http://v3.bootcss.com/javascript/#modals
	 * 将内容包括在<div class="scroll"></div>可以自动添加Scrollbar
	 */
	// define(['avalon',
	//     'text!components/dialog.html',
	//     'mCustomScrollbar'
	// ], function(avalon, sourceHtml) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(2),
	    __webpack_require__(3)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(sourceHtml) {
	    var template;
	    var dialogId;
	    var wrapperId;

	    /**
	     * 根据传入的参数转换为相应的Css类名
	     * @param  {string}  大小的参数
	     * @return {string}  css类名
	     */
	    function getSizeClass(size) {
	        var sizeClass = " "; //default is empty
	        switch (size) {
	            case 'extralarge':
	                sizeClass = "modal-lg";
	                break;
	            case 'large':
	                sizeClass = "modal-lg";
	                break;
	            case 'small':
	                sizeClass = "modal-sm";
	            default:
	                sizeClass = "";
	        }

	        return sizeClass;
	    }

	    /**
	     * 获取当前视窗的大小
	     */
	    function getViewPort() {
	        var e = window,
	            a = 'inner';
	        if (!('innerWidth' in window)) {
	            a = 'client';
	            e = document.documentElement || document.body;
	        }

	        return {
	            width: e[a + 'Width'],
	            height: e[a + 'Height']
	        };
	    }

	    var dialog = {
	        //配置参数
	        title: '标题',
	        size: 'default', //enum: extralarge, large, small, default
	        fade: true, //是否需要淡入淡出效果； 建议：对于dialog上要放大数据量的禁止该效果，可以减少卡顿感

	        // 事件
	        onInit: avalon.noop,
	        onHidden: avalon.noop,

	        // 方法       
	        show: avalon.noop,
	        hide: avalon.noop,

	        // 内部用的属性和方法

	        $replace: false, // 真值时表示替换其容器

	        $init: init,

	        $childReady: function(vm) {
	            console.log('childReady');
	        },

	        $ready: function(vm, elem) {
	            console.log('ready');

	            var totalHeight = getViewPort().height;

	            // 设定custome scroll bar
	            // http://manos.malihu.gr/jquery-custom-content-scroller/
	            $("#" + wrapperId + " .scroll").mCustomScrollbar({
	                setHeight: totalHeight - 200,
	                theme: "dark",
	                //下面两个配置项是为了让滑动感觉没那么快
	                scrollInertia: 0,
	                mouseWheel: {
	                    deltaFactor: 20
	                }
	            });

	            $('#' + dialogId).on('hidden.bs.modal', function(e) {
	                // 恢复背景上的scrollbar
	                $("#wrapper").mCustomScrollbar("update");

	                vm.onHidden.call(elem, vm);
	            });
	        },

	        $dispose: function(vm, elem) {
	            elem.innerHTML = elem.textContent = "";
	        },

	        //$template: template, //因为模板是动态生成的，所以这里不需要指定
	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, elem) {
	        console.log('init');

	        //拿到当前组件id
	        dialogId = vm.$id;
	        wrapperId = dialogId + "_wrapper";

	        template = sourceHtml.replace('$ID$', dialogId)
	            .replace('$wrappperid$', wrapperId)
	            .replace('$SIZE$', getSizeClass(vm.size))
	            .replace('$FADE$', vm.fade ? 'fade' : '')
	            .replace('$DATA_TEMPLATE$', elem.innerHTML); //将模板的内容插入到当前元素下面

	        vm.$$template = function() {
	            return template;
	        };

	        // 定义内部的方法实现
	        vm.show = function() {
	            // 禁止背景上的scrollbar
	            $("#wrapper").mCustomScrollbar("disable");

	            $('#' + dialogId).modal('show');
	        };

	        vm.hide = function() {
	            $('#' + dialogId).modal('hide');
	        };

	        //用户初始化事件
	        if (typeof vm.onInit === "function") {
	            vm.onInit.call(elem, vm);
	        }
	    }

	    avalon.component("wk:dialog", dialog);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal $FADE$\" data-backdrop=\"static\" data-keyboard=\"false\" id=\"$ID$\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog $SIZE$\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\r\n                <h4 class=\"modal-title\">{{title}}</h4>\r\n            </div>\r\n            <div id=\"$wrappperid$\">\r\n                $DATA_TEMPLATE$\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* == malihu jquery custom scrollbar plugin == Version: 3.0.9, License: MIT License (MIT) */
	!function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"=="function"&&__webpack_require__(4),a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";o||(a?__webpack_require__(5)(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:!0,autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&V(t),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),S.call(this),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r.children())),n.overflowed=B.call(this),O.call(this),i.autoDraggerLength&&b.call(this),C.call(this),k.call(this);var s=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?l[0].height()>l[0].parent().height()?T.call(this):(Q(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(T.call(this),"y"===i.axis?M.call(this):"yx"===i.axis&&n.overflowed[1]&&Q(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?l[1].width()>l[1].parent().width()?T.call(this):(Q(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(T.call(this),"x"===i.axis?M.call(this):"yx"===i.axis&&n.overflowed[0]&&Q(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),X.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=j.call(this,c[0],"y"),c[1]=j.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",Q(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",Q(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&V(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){{o.data(a)}X.call(this,"remove"),M.call(this),t&&T.call(this),O.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),X.call(this,"remove"),M.call(this),T.call(this),n.removeData(a),Z(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),Z(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir="+n.langDir+" /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p.children())),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){return Math.max.apply(Math,t.map(function(){return e(this).outerWidth(!0)}).get())},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis&&i.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),position:"relative"}).unwrap()},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=te(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=t.css("max-height")||"none",r=-1!==i.indexOf("%"),l=t.css("box-sizing");if("none"!==i){var s=r?t.parent().height()*parseInt(i)/100:parseInt(i);"border-box"===l&&(s-=t.innerHeight()-t.height()+(t.outerHeight()-t.innerHeight())),n.css("max-height",Math.round(s))}},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},C=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},y=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},B=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1);return[r>n.height(),l>n.width()]},T=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(V(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),Q(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),Q(t,"_resetX")}},k=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(R.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),H.call(this),i.advanced.autoScrollOnFocus&&z.call(this),i.scrollButtons.enable&&U.call(this),i.keyboard.enable&&F.call(this),n.bindEvents=!0}},M=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),o.bindEvents&&(e(document).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),Z(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),Z(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),Z(s[0],"onCompleteTimeout"),o.bindEvents=!1)},O=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},I=function(e){var t=e.type;switch(t){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return e.target.ownerDocument!==document?[e.originalEvent.screenY,e.originalEvent.screenX,!1]:[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var o=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return e.target.ownerDocument!==document?[o.screenY,o.screenX,a>1]:[o.pageY,o.pageX,a>1];default:return[e.pageY,e.pageX,!1]}},R=function(){function t(e){var t=m.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function o(e,t,o,a){if(m[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===h[1])var i="x",r=(n[0].offsetLeft-t+a)*d.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+o)*d.scrollRatio.y;Q(l,r.toString(),{dir:i,drag:!0})}var n,i,r,l=e(this),d=l.data(a),u=d.opt,f=a+"_"+d.idx,h=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],m=e("#mCSB_"+d.idx+"_container"),p=e("#"+h[0]+",#"+h[1]),g=u.advanced.releaseDraggableSelectors?p.add(e(u.advanced.releaseDraggableSelectors)):p;p.bind("mousedown."+f+" touchstart."+f+" pointerdown."+f+" MSPointerDown."+f,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),$(o)){c=!0,s&&(document.onselectstart=function(){return!1}),t(!1),V(l),n=e(this);var a=n.offset(),d=I(o)[0]-a.top,f=I(o)[1]-a.left,h=n.height()+a.top,m=n.width()+a.left;h>d&&d>0&&m>f&&f>0&&(i=d,r=f),y(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+f,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=I(e)[0]-t.top,l=I(e)[1]-t.left;o(i,r,a,l)}),e(document).bind("mousemove."+f+" pointermove."+f+" MSPointerMove."+f,function(e){if(n){var t=n.offset(),a=I(e)[0]-t.top,l=I(e)[1]-t.left;if(i===a)return;o(i,r,a,l)}}).add(g).bind("mouseup."+f+" touchend."+f+" pointerup."+f+" MSPointerUp."+f,function(e){n&&(y(n,"active",u.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),t(!0)})},D=function(){function o(e){if(!ee(e)||c||I(e)[2])return void(t=0);t=1,S=0,b=0,C.removeClass("mCS_touch_action");var o=M.offset();d=I(e)[0]-o.top,u=I(e)[1]-o.left,A=[I(e)[0],I(e)[1]]}function n(e){if(ee(e)&&!c&&!I(e)[2]&&(e.stopImmediatePropagation(),!b||S)){p=J();var t=k.offset(),o=I(e)[0]-t.top,a=I(e)[1]-t.left,n="mcsLinearOut";if(R.push(o),D.push(a),A[2]=Math.abs(I(e)[0]-A[0]),A[3]=Math.abs(I(e)[1]-A[1]),y.overflowed[0])var i=O[0].parent().height()-O[0].height(),r=d-o>0&&o-d>-(i*y.scrollRatio.y)&&(2*A[3]<A[2]||"yx"===B.axis);if(y.overflowed[1])var l=O[1].parent().width()-O[1].width(),f=u-a>0&&a-u>-(l*y.scrollRatio.x)&&(2*A[2]<A[3]||"yx"===B.axis);r||f?(e.preventDefault(),S=1):(b=1,C.addClass("mCS_touch_action")),_="yx"===B.axis?[d-o,u-a]:"x"===B.axis?[null,u-a]:[d-o,null],M[0].idleTimer=250,y.overflowed[0]&&s(_[0],E,n,"y","all",!0),y.overflowed[1]&&s(_[1],E,n,"x",W,!0)}}function i(e){if(!ee(e)||c||I(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),V(C),m=J();var o=k.offset();f=I(e)[0]-o.top,h=I(e)[1]-o.left,R=[],D=[]}function r(e){if(ee(e)&&!c&&!I(e)[2]){e.stopImmediatePropagation(),S=0,b=0,g=J();var t=k.offset(),o=I(e)[0]-t.top,a=I(e)[1]-t.left;if(!(g-p>30)){x=1e3/(g-m);var n="mcsEaseOut",i=2.5>x,r=i?[R[R.length-2],D[D.length-2]]:[0,0];v=i?[o-r[0],a-r[1]]:[o-f,a-h];var d=[Math.abs(v[0]),Math.abs(v[1])];x=i?[Math.abs(v[0]/4),Math.abs(v[1]/4)]:[x,x];var u=[Math.abs(M[0].offsetTop)-v[0]*l(d[0]/x[0],x[0]),Math.abs(M[0].offsetLeft)-v[1]*l(d[1]/x[1],x[1])];_="yx"===B.axis?[u[0],u[1]]:"x"===B.axis?[null,u[1]]:[u[0],null],w=[4*d[0]+B.scrollInertia,4*d[1]+B.scrollInertia];var C=parseInt(B.contentTouchScroll)||0;_[0]=d[0]>C?_[0]:0,_[1]=d[1]>C?_[1]:0,y.overflowed[0]&&s(_[0],w[0],n,"y",W,!1),y.overflowed[1]&&s(_[1],w[1],n,"x",W,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&Q(C,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C=e(this),y=C.data(a),B=y.opt,T=a+"_"+y.idx,k=e("#mCSB_"+y.idx),M=e("#mCSB_"+y.idx+"_container"),O=[e("#mCSB_"+y.idx+"_dragger_vertical"),e("#mCSB_"+y.idx+"_dragger_horizontal")],R=[],D=[],E=0,W="yx"===B.axis?"none":"all",A=[],P=M.find("iframe"),z=["touchstart."+T+" pointerdown."+T+" MSPointerDown."+T,"touchmove."+T+" pointermove."+T+" MSPointerMove."+T,"touchend."+T+" pointerup."+T+" MSPointerUp."+T];M.bind(z[0],function(e){o(e)}).bind(z[1],function(e){n(e)}),k.bind(z[0],function(e){i(e)}).bind(z[2],function(e){r(e)}),P.length&&P.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind(z[0],function(e){o(e),i(e)}).bind(z[1],function(e){n(e)}).bind(z[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,q(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(e){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=I(e)[0]-a.top+f[0].offsetTop,c=I(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u,function(e){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(V(o),!A(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100;if("x"===i.axis||"x"===i.mouseWheel.axis)var d="x",u=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],f="auto"!==i.mouseWheel.scrollAmount?u[1]:u[0]>=l.width()?.9*l.width():u[0],h=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),m=c[1][0].offsetLeft,p=c[1].parent().width()-c[1].width(),g=t.deltaX||t.deltaY||a;else var d="y",u=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],f="auto"!==i.mouseWheel.scrollAmount?u[1]:u[0]>=l.height()?.9*l.height():u[0],h=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),m=c[0][0].offsetTop,p=c[0].parent().height()-c[0].height(),g=t.deltaY||a;"y"===d&&!n.overflowed[0]||"x"===d&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(g=-g),i.mouseWheel.normalizeDelta&&(g=0>g?-1:1),(g>0&&0!==m||0>g&&m!==p||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),Q(o,(h-g*f).toString(),{dir:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},L=function(e){var t=null;try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t},A=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container"),r=i.parent(),l=e(".mCSB_"+o.idx+"_scrollbar ."+d[12]);l.bind("touchstart."+n+" pointerdown."+n+" MSPointerDown."+n,function(e){c=!0}).bind("touchend."+n+" pointerup."+n+" MSPointerUp."+n,function(e){c=!1}).bind("click."+n,function(a){if(e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail")){V(t);var n=e(this),l=n.find(".mCSB_dragger");if(n.parent(".mCSB_scrollTools_horizontal").length>0){if(!o.overflowed[1])return;var s="x",c=a.pageX>l.offset().left?-1:1,u=Math.abs(i[0].offsetLeft)-.9*c*r.width()}else{if(!o.overflowed[0])return;var s="y",c=a.pageY>l.offset().top?-1:1,u=Math.abs(i[0].offsetTop)-.9*c*r.height()}Q(t,u.toString(),{dir:s,scrollEasing:"mcsEaseInOut"})}})},z=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(o){var a=e(document.activeElement),i=r.find(".mCustomScrollBox").length,s=0;a.is(n.advanced.autoScrollOnFocus)&&(V(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(s+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[oe(a)[0],oe(a)[1]],o=[r[0].offsetTop,r[0].offsetLeft],i=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-a.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||Q(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s}),"y"===n.axis||i[1]||Q(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s})},t[0]._focusTimer))})},H=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(t){(0!==i.scrollTop()||0!==i.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},U=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.snapAmount||n.scrollButtons.scrollAmount,q(t,e,o)}if(a.preventDefault(),$(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},F=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.snapAmount||i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||q(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){V(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-.9*f*d.width();else var h="y",m=Math.abs(c[0].offsetTop)-.9*f*d.height();Q(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;Q(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},q=function(t,o,n,i,r){function l(e){var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],u="x"===f.dir[0]?s[1]+f.dir[1]*d[1]*n:s[0]+f.dir[1]*d[0]*n,m="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),v="auto"!==f.scrollAmount?m:u,x=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",_=e?!0:!1;return e&&17>a&&(v="x"===f.dir[0]?s[1]:s[0]),Q(t,v.toString(),{dir:f.dir[0],scrollEasing:x,dur:a,onComplete:_}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),Z(f,"step"),V(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type?!0:!1,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],V(t),te(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},j=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?oe(m)[1]:oe(m)[0];case"string":case"number":if(te(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&te(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?oe(m)[1]:oe(m)[0]}return e(t).length?"x"===o?oe(e(t))[1]:oe(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},X=function(t){function o(){return clearTimeout(h[0].autoUpdate),0===s.parents("html").length?void(s=null):void(h[0].autoUpdate=setTimeout(function(){return f.advanced.updateOnSelectorChange&&(m=r(),m!==w)?(l(3),void(w=m)):(f.advanced.updateOnContentResize&&(p=[h.outerHeight(!1),h.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],(p[0]!==S[0]||p[1]!==S[1]||p[2]!==S[2]||p[3]!==S[3]||p[4]!==S[4]||p[5]!==S[5])&&(l(p[0]!==S[0]||p[1]!==S[1]),S=p)),f.advanced.updateOnImageLoad&&(g=n(),g!==b&&(h.find("img").each(function(){i(this)}),b=g)),void((f.advanced.updateOnSelectorChange||f.advanced.updateOnContentResize||f.advanced.updateOnImageLoad)&&o()))},f.advanced.autoUpdateTimeout))}function n(){var e=0;return f.advanced.updateOnImageLoad&&(e=h.find("img").length),e}function i(t){function o(e,t){return function(){return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),l(2)}if(e(t).hasClass(d[2]))return void l();var n=new Image;n.onload=o(n,a),n.src=t.src}function r(){f.advanced.updateOnSelectorChange===!0&&(f.advanced.updateOnSelectorChange="*");var t=0,o=h.find(f.advanced.updateOnSelectorChange);return f.advanced.updateOnSelectorChange&&o.length>0&&o.each(function(){t+=e(this).height()+e(this).width()}),t}function l(e){clearTimeout(h[0].autoUpdate),u.update.call(null,s[0],e)}var s=e(this),c=s.data(a),f=c.opt,h=e("#mCSB_"+c.idx+"_container");if(t)return clearTimeout(h[0].autoUpdate),void Z(h[0],"autoUpdate");var m,p,g,v=h.parent(),x=[e("#mCSB_"+c.idx+"_scrollbar_vertical"),e("#mCSB_"+c.idx+"_scrollbar_horizontal")],_=function(){return[x[0].is(":visible")?x[0].outerHeight(!0):0,x[1].is(":visible")?x[1].outerWidth(!0):0]},w=r(),S=[h.outerHeight(!1),h.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],b=n();o()},N=function(e,t,o){return Math.round(e/t)*t-o},V=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){K.call(this)})},Q=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||_>=w[0]+b,c.callbacks.alwaysTriggerOffsets||-C>=_]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[v[0].offsetTop,v[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",
	callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){switch(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount&&(o=N(o,c.snapAmount,c.snapOffset)),n.dir){case"x":var v=e("#mCSB_"+s.idx+"_dragger_horizontal"),x="left",_=h[0].offsetLeft,w=[f.width()-h.outerWidth(!1),v.parent().width()-v.width()],S=[o,0===o?0:o/s.scrollRatio.x],b=p[1],C=g[1],B=b>0?b/s.scrollRatio.x:0,T=C>0?C/s.scrollRatio.x:0;break;case"y":var v=e("#mCSB_"+s.idx+"_dragger_vertical"),x="top",_=h[0].offsetTop,w=[f.height()-h.outerHeight(!1),v.parent().height()-v.height()],S=[o,0===o?0:o/s.scrollRatio.y],b=p[0],C=g[0],B=b>0?b/s.scrollRatio.y:0,T=C>0?C/s.scrollRatio.y:0}S[1]<0||0===S[0]&&0===S[1]?S=[0,0]:S[1]>=w[1]?S=[w[0],w[1]]:S[0]=-S[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),(s.tweenRunning||!(0===_&&S[0]>=0||_===w[0]&&S[0]<=w[0]))&&(G(v[0],x,Math.round(S[1]),u[1],n.scrollEasing),G(h[0],x,Math.round(S[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,y(v),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&S[1]>=w[1]-B&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&S[1]<=T&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,y(v,"hide")},e)}}}))}},G=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=J()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=J(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},J=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},K=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},Z=function(e,t){try{delete e[t]}catch(o){e[t]=null}},$=function(e){return!(e.which&&1!==e.which)},ee=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},te=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},oe=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).load(function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+oe(n)[0]>=0&&a[0]+oe(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+oe(n)[1]>=0&&a[1]+oe(n)[1]<o.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
	 * Licensed under the MIT License (LICENSE.txt).
	 *
	 * Version: 3.1.12
	 *
	 * Requires: jQuery 1.2.2+
	 */
	!function(a){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * fileupload是一个单文件上传的组件。支持初始化
	 * Created by qianbinbin on 19/2/2016.
	 */
	// define(['avalon',
	//     'text!components/fileupload.html',
	//     'jquery.fileupload',
	//     'jquery.fileupload.process',
	//     'jquery.fileupload.validate',
	//     'css!../plugin/jquery-file-upload/css/jquery.fileupload.css',
	//     'css!../plugin/jquery-file-upload/css/jquery.fileupload-ui.css'
	// ], function (avalon, templateHtml) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(7),
	    __webpack_require__(8),
	    __webpack_require__(10),
	    __webpack_require__(11),
	    __webpack_require__(12),
	    __webpack_require__(16)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(templateHtml) {
	    /**
	     * 获取
	     * @returns {string}
	     */
	    function newGuid() {
	        var guid = "";
	        for (var i = 1; i <= 32; i++) {
	            var n = Math.floor(Math.random() * 16.0).toString(16);
	            guid += n;
	        }
	        return guid;
	    }

	    var fileData;
	    var elementId = "Fileupload" + newGuid();
	    var _interface = function() {};
	    var fileupload = {
	        url: '/', // 上传文件的POST地址
	        acceptFileTypes: 'jpe?g|png', //允许上传的文件类型 html|txt|xls|xlsx|doc|pdf|docx|ppt|pptx|zip|msg
	        maxFileSize: 10485760, // 10MB, 文件上传大小限制
	        prompt: "文件格式为：jpeg,jpg,png，大小为10MB", // 上传文件的提示内容
	        elementId: elementId,

	        //公开事件
	        onInit: _interface,
	        onfileUploadDone: _interface, //文件上传完毕后, 可以在这里拿到API返回的值res

	        // 私有属性
	        _fileName: '还没有选定文件',
	        _fileSize: 0,
	        _errorMessage: '',
	        _successMessage: '',
	        _uploadDisabled: true,
	        // 对外公开的方法
	        reset: _interface,

	        // 私有方法
	        _upload: _interface,
	        _cancel: _interface,

	        // 初始化
	        $init: function(vm, element) {
	            elementId="Fileupload"+vm.$id;
	            element.innerHTML = templateHtml;
	            vm.$$template = function() {
	                return templateHtml;
	            };

	            if (typeof vm.onInit === 'function') {
	                vm.onInit.call(element, vm);
	            }
	        },
	        $ready: function(vm) {
	            $('#' + elementId).fileupload({
	                url: vm.url,
	                autoUpload: false,
	                acceptFileTypes: new RegExp("(\.|\/)(" + vm.acceptFileTypes + ")$"),
	                maxFileSize: vm.maxFileSize // 10 MB
	            }).on('fileuploadadd', function(e, data) {
	                // 目前仅支持单文件上传
	                var file = data.files[0];
	                var fileSize = parseInt(file.size / 1024);
	                vm._fileName = file.name;
	                vm._fileSize = fileSize == 0 ? 1 : fileSize;

	                fileData = data;
	                vm._uploadDisabled = false;
	                vm._errorMessage = "";
	            }).on('fileuploadprocessalways', function(e, data) {
	                var file = data.files[0];
	                if (file.error) {
	                    vm._uploadDisabled = true;
	                    vm._errorMessage = file.error;
	                }
	            }).on('fileuploaddone', function(e, data) {
	                vm._successMessage = "上传成功";
	                vm._uploadDisabled = true;
	            }).on('fileuploadprogressall', function(e, data) {
	                var progress = parseInt(data.loaded / data.total * 100, 10);
	                $('#progress .progress-bar').css(
	                    'width',
	                    progress + '%'
	                );
	            }).on('fileuploadfail', function(e, data) {
	                vm._errorMessage = "上传失败";
	            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

	            /**
	             * 重置组件的状态
	             * @return {[type]} [description]
	             */
	            vm.reset = function() {
	                vm._fileName = '还没有选定文件';
	                vm._fileSize = 0;
	                vm._errorMessage = '';
	                vm._successMessage = '';
	                vm = null;
	                $('#progress .progress-bar').css('width', '0');
	            };

	            /**
	             * 上传文件
	             * @param vm
	             * @private
	             */
	            vm._upload = function() {
	                if (fileData != null) {
	                    fileData.submit().success(function(res) {
	                        if (typeof vm.onfileUploadDone === 'function') {
	                            vm.onfileUploadDone.call(element, res);
	                        }
	                    });
	                    if (event && event.preventDefault) {
	                        event.preventDefault();
	                    } else {
	                        window.event.returnValue = false;
	                    }
	                }
	            };

	            /**
	             * 取消上传
	             */
	            vm._cancel = function() {
	                fileData = null;
	            };
	        },
	        $dispose: function(vm, elem) {
	            elem.innerHTML = elem.textContent = "";
	        }
	    };
	    avalon.component("wk:fileupload", fileupload);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<span class=\"btn green fileinput-button\">\r\n    <i class=\"fa fa-plus\"></i>\r\n    <span>选择文件... </span>\r\n    <input ms-attr-id=\"elementId\" type=\"file\" name=\"toUpload\">\r\n</span>\r\n\r\n<span class=\"text-danger\">{{prompt}}</span>\r\n<table style=\"margin-top: 7px;\" role=\"presentation\" class=\"table table-striped clearfix\">\r\n    <tbody class=\"files\">\r\n    <tr class=\"template-upload fade in\">\r\n        <td>\r\n            <span class=\"preview\"></span>\r\n        </td>\r\n        <td>\r\n            <p class=\"name\">{{_fileName}}</p>\r\n            <strong class=\"error text-danger label label-danger\" style=\"color: white\">{{_errorMessage}}</strong>\r\n            <strong class=\"success text-success label label-success\" style=\"color: white\">{{_successMessage}}</strong>\r\n        </td>\r\n        <td>\r\n            <p class=\"size\">{{_fileSize}} KB</p>\r\n            <div id=\"progress\" class=\"progress progress-striped active\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"0\">\r\n                <div class=\"progress-bar progress-bar-success\" style=\"width: 0%;\"></div>\r\n            </div>\r\n        </td>\r\n        <td>\r\n            <button ms-click=\"_upload\" class=\"btn blue start\" ms-attr-disabled=\"_uploadDisabled\">\r\n                <i class=\"fa fa-upload\"></i>\r\n                <span>上传</span>\r\n            </button>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * jQuery File Upload Plugin 5.42.0
	 * https://github.com/blueimp/jQuery-File-Upload
	 *
	 * Copyright 2010, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */

	/* jshint nomen:false */
	/* global define, window, document, location, Blob, FormData */

	(function (factory) {
	    'use strict';
	    if (true) {
	        // Register as an anonymous AMD module:
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	            __webpack_require__(9)
	        ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // Browser globals:
	        factory(window.jQuery);
	    }
	}(function () {
	    'use strict';

	    // Detect file input support, based on
	    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
	    $.support.fileInput = !(new RegExp(
	        // Handle devices which give false positives for the feature detection:
	        '(Android (1\\.[0156]|2\\.[01]))' +
	            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
	            '|(w(eb)?OSBrowser)|(webOS)' +
	            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
	    ).test(window.navigator.userAgent) ||
	        // Feature detection for all other devices:
	        $('<input type="file">').prop('disabled'));

	    // The FileReader API is not actually used, but works as feature detection,
	    // as some Safari versions (5?) support XHR file uploads via the FormData API,
	    // but not non-multipart XHR file uploads.
	    // window.XMLHttpRequestUpload is not available on IE10, so we check for
	    // window.ProgressEvent instead to detect XHR2 file upload capability:
	    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
	    $.support.xhrFormDataFileUpload = !!window.FormData;

	    // Detect support for Blob slicing (required for chunked uploads):
	    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
	        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

	    // Helper function to create drag handlers for dragover/dragenter/dragleave:
	    function getDragHandler(type) {
	        var isDragOver = type === 'dragover';
	        return function (e) {
	            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
	            var dataTransfer = e.dataTransfer;
	            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
	                    this._trigger(
	                        type,
	                        $.Event(type, {delegatedEvent: e})
	                    ) !== false) {
	                e.preventDefault();
	                if (isDragOver) {
	                    dataTransfer.dropEffect = 'copy';
	                }
	            }
	        };
	    }

	    // The fileupload widget listens for change events on file input fields defined
	    // via fileInput setting and paste or drop events of the given dropZone.
	    // In addition to the default jQuery Widget methods, the fileupload widget
	    // exposes the "add" and "send" methods, to add or directly send files using
	    // the fileupload API.
	    // By default, files added via file input selection, paste, drag & drop or
	    // "add" method are uploaded immediately, but it is possible to override
	    // the "add" callback option to queue file uploads.
	    $.widget('blueimp.fileupload', {

	        options: {
	            // The drop target element(s), by the default the complete document.
	            // Set to null to disable drag & drop support:
	            dropZone: $(document),
	            // The paste target element(s), by the default undefined.
	            // Set to a DOM node or jQuery object to enable file pasting:
	            pasteZone: undefined,
	            // The file input field(s), that are listened to for change events.
	            // If undefined, it is set to the file input fields inside
	            // of the widget element on plugin initialization.
	            // Set to null to disable the change listener.
	            fileInput: undefined,
	            // By default, the file input field is replaced with a clone after
	            // each input field change event. This is required for iframe transport
	            // queues and allows change events to be fired for the same file
	            // selection, but can be disabled by setting the following option to false:
	            replaceFileInput: true,
	            // The parameter name for the file form data (the request argument name).
	            // If undefined or empty, the name property of the file input field is
	            // used, or "files[]" if the file input name property is also empty,
	            // can be a string or an array of strings:
	            paramName: undefined,
	            // By default, each file of a selection is uploaded using an individual
	            // request for XHR type uploads. Set to false to upload file
	            // selections in one request each:
	            singleFileUploads: true,
	            // To limit the number of files uploaded with one XHR request,
	            // set the following option to an integer greater than 0:
	            limitMultiFileUploads: undefined,
	            // The following option limits the number of files uploaded with one
	            // XHR request to keep the request size under or equal to the defined
	            // limit in bytes:
	            limitMultiFileUploadSize: undefined,
	            // Multipart file uploads add a number of bytes to each uploaded file,
	            // therefore the following option adds an overhead for each file used
	            // in the limitMultiFileUploadSize configuration:
	            limitMultiFileUploadSizeOverhead: 512,
	            // Set the following option to true to issue all file upload requests
	            // in a sequential order:
	            sequentialUploads: false,
	            // To limit the number of concurrent uploads,
	            // set the following option to an integer greater than 0:
	            limitConcurrentUploads: undefined,
	            // Set the following option to true to force iframe transport uploads:
	            forceIframeTransport: false,
	            // Set the following option to the location of a redirect url on the
	            // origin server, for cross-domain iframe transport uploads:
	            redirect: undefined,
	            // The parameter name for the redirect url, sent as part of the form
	            // data and set to 'redirect' if this option is empty:
	            redirectParamName: undefined,
	            // Set the following option to the location of a postMessage window,
	            // to enable postMessage transport uploads:
	            postMessage: undefined,
	            // By default, XHR file uploads are sent as multipart/form-data.
	            // The iframe transport is always using multipart/form-data.
	            // Set to false to enable non-multipart XHR uploads:
	            multipart: true,
	            // To upload large files in smaller chunks, set the following option
	            // to a preferred maximum chunk size. If set to 0, null or undefined,
	            // or the browser does not support the required Blob API, files will
	            // be uploaded as a whole.
	            maxChunkSize: undefined,
	            // When a non-multipart upload or a chunked multipart upload has been
	            // aborted, this option can be used to resume the upload by setting
	            // it to the size of the already uploaded bytes. This option is most
	            // useful when modifying the options object inside of the "add" or
	            // "send" callbacks, as the options are cloned for each file upload.
	            uploadedBytes: undefined,
	            // By default, failed (abort or error) file uploads are removed from the
	            // global progress calculation. Set the following option to false to
	            // prevent recalculating the global progress data:
	            recalculateProgress: true,
	            // Interval in milliseconds to calculate and trigger progress events:
	            progressInterval: 100,
	            // Interval in milliseconds to calculate progress bitrate:
	            bitrateInterval: 500,
	            // By default, uploads are started automatically when adding files:
	            autoUpload: true,

	            // Error and info messages:
	            messages: {
	                uploadedBytes: 'Uploaded bytes exceed file size'
	            },

	            // Translation function, gets the message key to be translated
	            // and an object with context specific data as arguments:
	            i18n: function (message, context) {
	                message = this.messages[message] || message.toString();
	                if (context) {
	                    $.each(context, function (key, value) {
	                        message = message.replace('{' + key + '}', value);
	                    });
	                }
	                return message;
	            },

	            // Additional form data to be sent along with the file uploads can be set
	            // using this option, which accepts an array of objects with name and
	            // value properties, a function returning such an array, a FormData
	            // object (for XHR file uploads), or a simple object.
	            // The form of the first fileInput is given as parameter to the function:
	            formData: function (form) {
	                return form.serializeArray();
	            },

	            // The add callback is invoked as soon as files are added to the fileupload
	            // widget (via file input selection, drag & drop, paste or add API call).
	            // If the singleFileUploads option is enabled, this callback will be
	            // called once for each file in the selection for XHR file uploads, else
	            // once for each file selection.
	            //
	            // The upload starts when the submit method is invoked on the data parameter.
	            // The data object contains a files property holding the added files
	            // and allows you to override plugin options as well as define ajax settings.
	            //
	            // Listeners for this callback can also be bound the following way:
	            // .bind('fileuploadadd', func);
	            //
	            // data.submit() returns a Promise object and allows to attach additional
	            // handlers using jQuery's Deferred callbacks:
	            // data.submit().done(func).fail(func).always(func);
	            add: function (e, data) {
	                if (e.isDefaultPrevented()) {
	                    return false;
	                }
	                if (data.autoUpload || (data.autoUpload !== false &&
	                        $(this).fileupload('option', 'autoUpload'))) {
	                    data.process().done(function () {
	                        data.submit();
	                    });
	                }
	            },

	            // Other callbacks:

	            // Callback for the submit event of each file upload:
	            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

	            // Callback for the start of each file upload request:
	            // send: function (e, data) {}, // .bind('fileuploadsend', func);

	            // Callback for successful uploads:
	            // done: function (e, data) {}, // .bind('fileuploaddone', func);

	            // Callback for failed (abort or error) uploads:
	            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

	            // Callback for completed (success, abort or error) requests:
	            // always: function (e, data) {}, // .bind('fileuploadalways', func);

	            // Callback for upload progress events:
	            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

	            // Callback for global upload progress events:
	            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

	            // Callback for uploads start, equivalent to the global ajaxStart event:
	            // start: function (e) {}, // .bind('fileuploadstart', func);

	            // Callback for uploads stop, equivalent to the global ajaxStop event:
	            // stop: function (e) {}, // .bind('fileuploadstop', func);

	            // Callback for change events of the fileInput(s):
	            // change: function (e, data) {}, // .bind('fileuploadchange', func);

	            // Callback for paste events to the pasteZone(s):
	            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

	            // Callback for drop events of the dropZone(s):
	            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

	            // Callback for dragover events of the dropZone(s):
	            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

	            // Callback for the start of each chunk upload request:
	            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

	            // Callback for successful chunk uploads:
	            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

	            // Callback for failed (abort or error) chunk uploads:
	            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

	            // Callback for completed (success, abort or error) chunk upload requests:
	            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

	            // The plugin options are used as settings object for the ajax calls.
	            // The following are jQuery ajax settings required for the file uploads:
	            processData: false,
	            contentType: false,
	            cache: false
	        },

	        // A list of options that require reinitializing event listeners and/or
	        // special initialization code:
	        _specialOptions: [
	            'fileInput',
	            'dropZone',
	            'pasteZone',
	            'multipart',
	            'forceIframeTransport'
	        ],

	        _blobSlice: $.support.blobSlice && function () {
	            var slice = this.slice || this.webkitSlice || this.mozSlice;
	            return slice.apply(this, arguments);
	        },

	        _BitrateTimer: function () {
	            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
	            this.loaded = 0;
	            this.bitrate = 0;
	            this.getBitrate = function (now, loaded, interval) {
	                var timeDiff = now - this.timestamp;
	                if (!this.bitrate || !interval || timeDiff > interval) {
	                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
	                    this.loaded = loaded;
	                    this.timestamp = now;
	                }
	                return this.bitrate;
	            };
	        },

	        _isXHRUpload: function (options) {
	            return !options.forceIframeTransport &&
	                ((!options.multipart && $.support.xhrFileUpload) ||
	                $.support.xhrFormDataFileUpload);
	        },

	        _getFormData: function (options) {
	            var formData;
	            if ($.type(options.formData) === 'function') {
	                return options.formData(options.form);
	            }
	            if ($.isArray(options.formData)) {
	                return options.formData;
	            }
	            if ($.type(options.formData) === 'object') {
	                formData = [];
	                $.each(options.formData, function (name, value) {
	                    formData.push({name: name, value: value});
	                });
	                return formData;
	            }
	            return [];
	        },

	        _getTotal: function (files) {
	            var total = 0;
	            $.each(files, function (index, file) {
	                total += file.size || 1;
	            });
	            return total;
	        },

	        _initProgressObject: function (obj) {
	            var progress = {
	                loaded: 0,
	                total: 0,
	                bitrate: 0
	            };
	            if (obj._progress) {
	                $.extend(obj._progress, progress);
	            } else {
	                obj._progress = progress;
	            }
	        },

	        _initResponseObject: function (obj) {
	            var prop;
	            if (obj._response) {
	                for (prop in obj._response) {
	                    if (obj._response.hasOwnProperty(prop)) {
	                        delete obj._response[prop];
	                    }
	                }
	            } else {
	                obj._response = {};
	            }
	        },

	        _onProgress: function (e, data) {
	            if (e.lengthComputable) {
	                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
	                    loaded;
	                if (data._time && data.progressInterval &&
	                        (now - data._time < data.progressInterval) &&
	                        e.loaded !== e.total) {
	                    return;
	                }
	                data._time = now;
	                loaded = Math.floor(
	                    e.loaded / e.total * (data.chunkSize || data._progress.total)
	                ) + (data.uploadedBytes || 0);
	                // Add the difference from the previously loaded state
	                // to the global loaded counter:
	                this._progress.loaded += (loaded - data._progress.loaded);
	                this._progress.bitrate = this._bitrateTimer.getBitrate(
	                    now,
	                    this._progress.loaded,
	                    data.bitrateInterval
	                );
	                data._progress.loaded = data.loaded = loaded;
	                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
	                    now,
	                    loaded,
	                    data.bitrateInterval
	                );
	                // Trigger a custom progress event with a total data property set
	                // to the file size(s) of the current upload and a loaded data
	                // property calculated accordingly:
	                this._trigger(
	                    'progress',
	                    $.Event('progress', {delegatedEvent: e}),
	                    data
	                );
	                // Trigger a global progress event for all current file uploads,
	                // including ajax calls queued for sequential file uploads:
	                this._trigger(
	                    'progressall',
	                    $.Event('progressall', {delegatedEvent: e}),
	                    this._progress
	                );
	            }
	        },

	        _initProgressListener: function (options) {
	            var that = this,
	                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
	            // Accesss to the native XHR object is required to add event listeners
	            // for the upload progress event:
	            if (xhr.upload) {
	                $(xhr.upload).bind('progress', function (e) {
	                    var oe = e.originalEvent;
	                    // Make sure the progress event properties get copied over:
	                    e.lengthComputable = oe.lengthComputable;
	                    e.loaded = oe.loaded;
	                    e.total = oe.total;
	                    that._onProgress(e, options);
	                });
	                options.xhr = function () {
	                    return xhr;
	                };
	            }
	        },

	        _isInstanceOf: function (type, obj) {
	            // Cross-frame instanceof check
	            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	        },

	        _initXHRData: function (options) {
	            var that = this,
	                formData,
	                file = options.files[0],
	                // Ignore non-multipart setting if not supported:
	                multipart = options.multipart || !$.support.xhrFileUpload,
	                paramName = $.type(options.paramName) === 'array' ?
	                    options.paramName[0] : options.paramName;
	            options.headers = $.extend({}, options.headers);
	            if (options.contentRange) {
	                options.headers['Content-Range'] = options.contentRange;
	            }
	            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
	                options.headers['Content-Disposition'] = 'attachment; filename="' +
	                    encodeURI(file.name) + '"';
	            }
	            if (!multipart) {
	                options.contentType = file.type || 'application/octet-stream';
	                options.data = options.blob || file;
	            } else if ($.support.xhrFormDataFileUpload) {
	                if (options.postMessage) {
	                    // window.postMessage does not allow sending FormData
	                    // objects, so we just add the File/Blob objects to
	                    // the formData array and let the postMessage window
	                    // create the FormData object out of this array:
	                    formData = this._getFormData(options);
	                    if (options.blob) {
	                        formData.push({
	                            name: paramName,
	                            value: options.blob
	                        });
	                    } else {
	                        $.each(options.files, function (index, file) {
	                            formData.push({
	                                name: ($.type(options.paramName) === 'array' &&
	                                    options.paramName[index]) || paramName,
	                                value: file
	                            });
	                        });
	                    }
	                } else {
	                    if (that._isInstanceOf('FormData', options.formData)) {
	                        formData = options.formData;
	                    } else {
	                        formData = new FormData();
	                        $.each(this._getFormData(options), function (index, field) {
	                            formData.append(field.name, field.value);
	                        });
	                    }
	                    if (options.blob) {
	                        formData.append(paramName, options.blob, file.name);
	                    } else {
	                        $.each(options.files, function (index, file) {
	                            // This check allows the tests to run with
	                            // dummy objects:
	                            if (that._isInstanceOf('File', file) ||
	                                    that._isInstanceOf('Blob', file)) {
	                                formData.append(
	                                    ($.type(options.paramName) === 'array' &&
	                                        options.paramName[index]) || paramName,
	                                    file,
	                                    file.uploadName || file.name
	                                );
	                            }
	                        });
	                    }
	                }
	                options.data = formData;
	            }
	            // Blob reference is not needed anymore, free memory:
	            options.blob = null;
	        },

	        _initIframeSettings: function (options) {
	            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
	            // Setting the dataType to iframe enables the iframe transport:
	            options.dataType = 'iframe ' + (options.dataType || '');
	            // The iframe transport accepts a serialized array as form data:
	            options.formData = this._getFormData(options);
	            // Add redirect url to form data on cross-domain uploads:
	            if (options.redirect && targetHost && targetHost !== location.host) {
	                options.formData.push({
	                    name: options.redirectParamName || 'redirect',
	                    value: options.redirect
	                });
	            }
	        },

	        _initDataSettings: function (options) {
	            if (this._isXHRUpload(options)) {
	                if (!this._chunkedUpload(options, true)) {
	                    if (!options.data) {
	                        this._initXHRData(options);
	                    }
	                    this._initProgressListener(options);
	                }
	                if (options.postMessage) {
	                    // Setting the dataType to postmessage enables the
	                    // postMessage transport:
	                    options.dataType = 'postmessage ' + (options.dataType || '');
	                }
	            } else {
	                this._initIframeSettings(options);
	            }
	        },

	        _getParamName: function (options) {
	            var fileInput = $(options.fileInput),
	                paramName = options.paramName;
	            if (!paramName) {
	                paramName = [];
	                fileInput.each(function () {
	                    var input = $(this),
	                        name = input.prop('name') || 'files[]',
	                        i = (input.prop('files') || [1]).length;
	                    while (i) {
	                        paramName.push(name);
	                        i -= 1;
	                    }
	                });
	                if (!paramName.length) {
	                    paramName = [fileInput.prop('name') || 'files[]'];
	                }
	            } else if (!$.isArray(paramName)) {
	                paramName = [paramName];
	            }
	            return paramName;
	        },

	        _initFormSettings: function (options) {
	            // Retrieve missing options from the input field and the
	            // associated form, if available:
	            if (!options.form || !options.form.length) {
	                options.form = $(options.fileInput.prop('form'));
	                // If the given file input doesn't have an associated form,
	                // use the default widget file input's form:
	                if (!options.form.length) {
	                    options.form = $(this.options.fileInput.prop('form'));
	                }
	            }
	            options.paramName = this._getParamName(options);
	            if (!options.url) {
	                options.url = options.form.prop('action') || location.href;
	            }
	            // The HTTP request method must be "POST" or "PUT":
	            options.type = (options.type ||
	                ($.type(options.form.prop('method')) === 'string' &&
	                    options.form.prop('method')) || ''
	                ).toUpperCase();
	            if (options.type !== 'POST' && options.type !== 'PUT' &&
	                    options.type !== 'PATCH') {
	                options.type = 'POST';
	            }
	            if (!options.formAcceptCharset) {
	                options.formAcceptCharset = options.form.attr('accept-charset');
	            }
	        },

	        _getAJAXSettings: function (data) {
	            var options = $.extend({}, this.options, data);
	            this._initFormSettings(options);
	            this._initDataSettings(options);
	            return options;
	        },

	        // jQuery 1.6 doesn't provide .state(),
	        // while jQuery 1.8+ removed .isRejected() and .isResolved():
	        _getDeferredState: function (deferred) {
	            if (deferred.state) {
	                return deferred.state();
	            }
	            if (deferred.isResolved()) {
	                return 'resolved';
	            }
	            if (deferred.isRejected()) {
	                return 'rejected';
	            }
	            return 'pending';
	        },

	        // Maps jqXHR callbacks to the equivalent
	        // methods of the given Promise object:
	        _enhancePromise: function (promise) {
	            promise.success = promise.done;
	            promise.error = promise.fail;
	            promise.complete = promise.always;
	            return promise;
	        },

	        // Creates and returns a Promise object enhanced with
	        // the jqXHR methods abort, success, error and complete:
	        _getXHRPromise: function (resolveOrReject, context, args) {
	            var dfd = $.Deferred(),
	                promise = dfd.promise();
	            context = context || this.options.context || promise;
	            if (resolveOrReject === true) {
	                dfd.resolveWith(context, args);
	            } else if (resolveOrReject === false) {
	                dfd.rejectWith(context, args);
	            }
	            promise.abort = dfd.promise;
	            return this._enhancePromise(promise);
	        },

	        // Adds convenience methods to the data callback argument:
	        _addConvenienceMethods: function (e, data) {
	            var that = this,
	                getPromise = function (args) {
	                    return $.Deferred().resolveWith(that, args).promise();
	                };
	            data.process = function (resolveFunc, rejectFunc) {
	                if (resolveFunc || rejectFunc) {
	                    data._processQueue = this._processQueue =
	                        (this._processQueue || getPromise([this])).pipe(
	                            function () {
	                                if (data.errorThrown) {
	                                    return $.Deferred()
	                                        .rejectWith(that, [data]).promise();
	                                }
	                                return getPromise(arguments);
	                            }
	                        ).pipe(resolveFunc, rejectFunc);
	                }
	                return this._processQueue || getPromise([this]);
	            };
	            data.submit = function () {
	                if (this.state() !== 'pending') {
	                    data.jqXHR = this.jqXHR =
	                        (that._trigger(
	                            'submit',
	                            $.Event('submit', {delegatedEvent: e}),
	                            this
	                        ) !== false) && that._onSend(e, this);
	                }
	                return this.jqXHR || that._getXHRPromise();
	            };
	            data.abort = function () {
	                if (this.jqXHR) {
	                    return this.jqXHR.abort();
	                }
	                this.errorThrown = 'abort';
	                that._trigger('fail', null, this);
	                return that._getXHRPromise(false);
	            };
	            data.state = function () {
	                if (this.jqXHR) {
	                    return that._getDeferredState(this.jqXHR);
	                }
	                if (this._processQueue) {
	                    return that._getDeferredState(this._processQueue);
	                }
	            };
	            data.processing = function () {
	                return !this.jqXHR && this._processQueue && that
	                    ._getDeferredState(this._processQueue) === 'pending';
	            };
	            data.progress = function () {
	                return this._progress;
	            };
	            data.response = function () {
	                return this._response;
	            };
	        },

	        // Parses the Range header from the server response
	        // and returns the uploaded bytes:
	        _getUploadedBytes: function (jqXHR) {
	            var range = jqXHR.getResponseHeader('Range'),
	                parts = range && range.split('-'),
	                upperBytesPos = parts && parts.length > 1 &&
	                    parseInt(parts[1], 10);
	            return upperBytesPos && upperBytesPos + 1;
	        },

	        // Uploads a file in multiple, sequential requests
	        // by splitting the file up in multiple blob chunks.
	        // If the second parameter is true, only tests if the file
	        // should be uploaded in chunks, but does not invoke any
	        // upload requests:
	        _chunkedUpload: function (options, testOnly) {
	            options.uploadedBytes = options.uploadedBytes || 0;
	            var that = this,
	                file = options.files[0],
	                fs = file.size,
	                ub = options.uploadedBytes,
	                mcs = options.maxChunkSize || fs,
	                slice = this._blobSlice,
	                dfd = $.Deferred(),
	                promise = dfd.promise(),
	                jqXHR,
	                upload;
	            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
	                    options.data) {
	                return false;
	            }
	            if (testOnly) {
	                return true;
	            }
	            if (ub >= fs) {
	                file.error = options.i18n('uploadedBytes');
	                return this._getXHRPromise(
	                    false,
	                    options.context,
	                    [null, 'error', file.error]
	                );
	            }
	            // The chunk upload method:
	            upload = function () {
	                // Clone the options object for each chunk upload:
	                var o = $.extend({}, options),
	                    currentLoaded = o._progress.loaded;
	                o.blob = slice.call(
	                    file,
	                    ub,
	                    ub + mcs,
	                    file.type
	                );
	                // Store the current chunk size, as the blob itself
	                // will be dereferenced after data processing:
	                o.chunkSize = o.blob.size;
	                // Expose the chunk bytes position range:
	                o.contentRange = 'bytes ' + ub + '-' +
	                    (ub + o.chunkSize - 1) + '/' + fs;
	                // Process the upload data (the blob and potential form data):
	                that._initXHRData(o);
	                // Add progress listeners for this chunk upload:
	                that._initProgressListener(o);
	                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
	                        that._getXHRPromise(false, o.context))
	                    .done(function (result, textStatus, jqXHR) {
	                        ub = that._getUploadedBytes(jqXHR) ||
	                            (ub + o.chunkSize);
	                        // Create a progress event if no final progress event
	                        // with loaded equaling total has been triggered
	                        // for this chunk:
	                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
	                            that._onProgress($.Event('progress', {
	                                lengthComputable: true,
	                                loaded: ub - o.uploadedBytes,
	                                total: ub - o.uploadedBytes
	                            }), o);
	                        }
	                        options.uploadedBytes = o.uploadedBytes = ub;
	                        o.result = result;
	                        o.textStatus = textStatus;
	                        o.jqXHR = jqXHR;
	                        that._trigger('chunkdone', null, o);
	                        that._trigger('chunkalways', null, o);
	                        if (ub < fs) {
	                            // File upload not yet complete,
	                            // continue with the next chunk:
	                            upload();
	                        } else {
	                            dfd.resolveWith(
	                                o.context,
	                                [result, textStatus, jqXHR]
	                            );
	                        }
	                    })
	                    .fail(function (jqXHR, textStatus, errorThrown) {
	                        o.jqXHR = jqXHR;
	                        o.textStatus = textStatus;
	                        o.errorThrown = errorThrown;
	                        that._trigger('chunkfail', null, o);
	                        that._trigger('chunkalways', null, o);
	                        dfd.rejectWith(
	                            o.context,
	                            [jqXHR, textStatus, errorThrown]
	                        );
	                    });
	            };
	            this._enhancePromise(promise);
	            promise.abort = function () {
	                return jqXHR.abort();
	            };
	            upload();
	            return promise;
	        },

	        _beforeSend: function (e, data) {
	            if (this._active === 0) {
	                // the start callback is triggered when an upload starts
	                // and no other uploads are currently running,
	                // equivalent to the global ajaxStart event:
	                this._trigger('start');
	                // Set timer for global bitrate progress calculation:
	                this._bitrateTimer = new this._BitrateTimer();
	                // Reset the global progress values:
	                this._progress.loaded = this._progress.total = 0;
	                this._progress.bitrate = 0;
	            }
	            // Make sure the container objects for the .response() and
	            // .progress() methods on the data object are available
	            // and reset to their initial state:
	            this._initResponseObject(data);
	            this._initProgressObject(data);
	            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
	            data._progress.total = data.total = this._getTotal(data.files) || 1;
	            data._progress.bitrate = data.bitrate = 0;
	            this._active += 1;
	            // Initialize the global progress values:
	            this._progress.loaded += data.loaded;
	            this._progress.total += data.total;
	        },

	        _onDone: function (result, textStatus, jqXHR, options) {
	            var total = options._progress.total,
	                response = options._response;
	            if (options._progress.loaded < total) {
	                // Create a progress event if no final progress event
	                // with loaded equaling total has been triggered:
	                this._onProgress($.Event('progress', {
	                    lengthComputable: true,
	                    loaded: total,
	                    total: total
	                }), options);
	            }
	            response.result = options.result = result;
	            response.textStatus = options.textStatus = textStatus;
	            response.jqXHR = options.jqXHR = jqXHR;
	            this._trigger('done', null, options);
	        },

	        _onFail: function (jqXHR, textStatus, errorThrown, options) {
	            var response = options._response;
	            if (options.recalculateProgress) {
	                // Remove the failed (error or abort) file upload from
	                // the global progress calculation:
	                this._progress.loaded -= options._progress.loaded;
	                this._progress.total -= options._progress.total;
	            }
	            response.jqXHR = options.jqXHR = jqXHR;
	            response.textStatus = options.textStatus = textStatus;
	            response.errorThrown = options.errorThrown = errorThrown;
	            this._trigger('fail', null, options);
	        },

	        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
	            // jqXHRorResult, textStatus and jqXHRorError are added to the
	            // options object via done and fail callbacks
	            this._trigger('always', null, options);
	        },

	        _onSend: function (e, data) {
	            if (!data.submit) {
	                this._addConvenienceMethods(e, data);
	            }
	            var that = this,
	                jqXHR,
	                aborted,
	                slot,
	                pipe,
	                options = that._getAJAXSettings(data),
	                send = function () {
	                    that._sending += 1;
	                    // Set timer for bitrate progress calculation:
	                    options._bitrateTimer = new that._BitrateTimer();
	                    jqXHR = jqXHR || (
	                        ((aborted || that._trigger(
	                            'send',
	                            $.Event('send', {delegatedEvent: e}),
	                            options
	                        ) === false) &&
	                        that._getXHRPromise(false, options.context, aborted)) ||
	                        that._chunkedUpload(options) || $.ajax(options)
	                    ).done(function (result, textStatus, jqXHR) {
	                        that._onDone(result, textStatus, jqXHR, options);
	                    }).fail(function (jqXHR, textStatus, errorThrown) {
	                        that._onFail(jqXHR, textStatus, errorThrown, options);
	                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
	                        that._onAlways(
	                            jqXHRorResult,
	                            textStatus,
	                            jqXHRorError,
	                            options
	                        );
	                        that._sending -= 1;
	                        that._active -= 1;
	                        if (options.limitConcurrentUploads &&
	                                options.limitConcurrentUploads > that._sending) {
	                            // Start the next queued upload,
	                            // that has not been aborted:
	                            var nextSlot = that._slots.shift();
	                            while (nextSlot) {
	                                if (that._getDeferredState(nextSlot) === 'pending') {
	                                    nextSlot.resolve();
	                                    break;
	                                }
	                                nextSlot = that._slots.shift();
	                            }
	                        }
	                        if (that._active === 0) {
	                            // The stop callback is triggered when all uploads have
	                            // been completed, equivalent to the global ajaxStop event:
	                            that._trigger('stop');
	                        }
	                    });
	                    return jqXHR;
	                };
	            this._beforeSend(e, options);
	            if (this.options.sequentialUploads ||
	                    (this.options.limitConcurrentUploads &&
	                    this.options.limitConcurrentUploads <= this._sending)) {
	                if (this.options.limitConcurrentUploads > 1) {
	                    slot = $.Deferred();
	                    this._slots.push(slot);
	                    pipe = slot.pipe(send);
	                } else {
	                    this._sequence = this._sequence.pipe(send, send);
	                    pipe = this._sequence;
	                }
	                // Return the piped Promise object, enhanced with an abort method,
	                // which is delegated to the jqXHR object of the current upload,
	                // and jqXHR callbacks mapped to the equivalent Promise methods:
	                pipe.abort = function () {
	                    aborted = [undefined, 'abort', 'abort'];
	                    if (!jqXHR) {
	                        if (slot) {
	                            slot.rejectWith(options.context, aborted);
	                        }
	                        return send();
	                    }
	                    return jqXHR.abort();
	                };
	                return this._enhancePromise(pipe);
	            }
	            return send();
	        },

	        _onAdd: function (e, data) {
	            var that = this,
	                result = true,
	                options = $.extend({}, this.options, data),
	                files = data.files,
	                filesLength = files.length,
	                limit = options.limitMultiFileUploads,
	                limitSize = options.limitMultiFileUploadSize,
	                overhead = options.limitMultiFileUploadSizeOverhead,
	                batchSize = 0,
	                paramName = this._getParamName(options),
	                paramNameSet,
	                paramNameSlice,
	                fileSet,
	                i,
	                j = 0;
	            if (limitSize && (!filesLength || files[0].size === undefined)) {
	                limitSize = undefined;
	            }
	            if (!(options.singleFileUploads || limit || limitSize) ||
	                    !this._isXHRUpload(options)) {
	                fileSet = [files];
	                paramNameSet = [paramName];
	            } else if (!(options.singleFileUploads || limitSize) && limit) {
	                fileSet = [];
	                paramNameSet = [];
	                for (i = 0; i < filesLength; i += limit) {
	                    fileSet.push(files.slice(i, i + limit));
	                    paramNameSlice = paramName.slice(i, i + limit);
	                    if (!paramNameSlice.length) {
	                        paramNameSlice = paramName;
	                    }
	                    paramNameSet.push(paramNameSlice);
	                }
	            } else if (!options.singleFileUploads && limitSize) {
	                fileSet = [];
	                paramNameSet = [];
	                for (i = 0; i < filesLength; i = i + 1) {
	                    batchSize += files[i].size + overhead;
	                    if (i + 1 === filesLength ||
	                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
	                            (limit && i + 1 - j >= limit)) {
	                        fileSet.push(files.slice(j, i + 1));
	                        paramNameSlice = paramName.slice(j, i + 1);
	                        if (!paramNameSlice.length) {
	                            paramNameSlice = paramName;
	                        }
	                        paramNameSet.push(paramNameSlice);
	                        j = i + 1;
	                        batchSize = 0;
	                    }
	                }
	            } else {
	                paramNameSet = paramName;
	            }
	            data.originalFiles = files;
	            $.each(fileSet || files, function (index, element) {
	                var newData = $.extend({}, data);
	                newData.files = fileSet ? element : [element];
	                newData.paramName = paramNameSet[index];
	                that._initResponseObject(newData);
	                that._initProgressObject(newData);
	                that._addConvenienceMethods(e, newData);
	                result = that._trigger(
	                    'add',
	                    $.Event('add', {delegatedEvent: e}),
	                    newData
	                );
	                return result;
	            });
	            return result;
	        },

	        _replaceFileInput: function (data) {
	            var input = data.fileInput,
	                inputClone = input.clone(true);
	            // Add a reference for the new cloned file input to the data argument:
	            data.fileInputClone = inputClone;
	            $('<form></form>').append(inputClone)[0].reset();
	            // Detaching allows to insert the fileInput on another form
	            // without loosing the file input value:
	            input.after(inputClone).detach();
	            // Avoid memory leaks with the detached file input:
	            $.cleanData(input.unbind('remove'));
	            // Replace the original file input element in the fileInput
	            // elements set with the clone, which has been copied including
	            // event handlers:
	            this.options.fileInput = this.options.fileInput.map(function (i, el) {
	                if (el === input[0]) {
	                    return inputClone[0];
	                }
	                return el;
	            });
	            // If the widget has been initialized on the file input itself,
	            // override this.element with the file input clone:
	            if (input[0] === this.element[0]) {
	                this.element = inputClone;
	            }
	        },

	        _handleFileTreeEntry: function (entry, path) {
	            var that = this,
	                dfd = $.Deferred(),
	                errorHandler = function (e) {
	                    if (e && !e.entry) {
	                        e.entry = entry;
	                    }
	                    // Since $.when returns immediately if one
	                    // Deferred is rejected, we use resolve instead.
	                    // This allows valid files and invalid items
	                    // to be returned together in one set:
	                    dfd.resolve([e]);
	                },
	                successHandler = function (entries) {
	                    that._handleFileTreeEntries(
	                        entries,
	                        path + entry.name + '/'
	                    ).done(function (files) {
	                        dfd.resolve(files);
	                    }).fail(errorHandler);
	                },
	                readEntries = function () {
	                    dirReader.readEntries(function (results) {
	                        if (!results.length) {
	                            successHandler(entries);
	                        } else {
	                            entries = entries.concat(results);
	                            readEntries();
	                        }
	                    }, errorHandler);
	                },
	                dirReader, entries = [];
	            path = path || '';
	            if (entry.isFile) {
	                if (entry._file) {
	                    // Workaround for Chrome bug #149735
	                    entry._file.relativePath = path;
	                    dfd.resolve(entry._file);
	                } else {
	                    entry.file(function (file) {
	                        file.relativePath = path;
	                        dfd.resolve(file);
	                    }, errorHandler);
	                }
	            } else if (entry.isDirectory) {
	                dirReader = entry.createReader();
	                readEntries();
	            } else {
	                // Return an empy list for file system items
	                // other than files or directories:
	                dfd.resolve([]);
	            }
	            return dfd.promise();
	        },

	        _handleFileTreeEntries: function (entries, path) {
	            var that = this;
	            return $.when.apply(
	                $,
	                $.map(entries, function (entry) {
	                    return that._handleFileTreeEntry(entry, path);
	                })
	            ).pipe(function () {
	                return Array.prototype.concat.apply(
	                    [],
	                    arguments
	                );
	            });
	        },

	        _getDroppedFiles: function (dataTransfer) {
	            dataTransfer = dataTransfer || {};
	            var items = dataTransfer.items;
	            if (items && items.length && (items[0].webkitGetAsEntry ||
	                    items[0].getAsEntry)) {
	                return this._handleFileTreeEntries(
	                    $.map(items, function (item) {
	                        var entry;
	                        if (item.webkitGetAsEntry) {
	                            entry = item.webkitGetAsEntry();
	                            if (entry) {
	                                // Workaround for Chrome bug #149735:
	                                entry._file = item.getAsFile();
	                            }
	                            return entry;
	                        }
	                        return item.getAsEntry();
	                    })
	                );
	            }
	            return $.Deferred().resolve(
	                $.makeArray(dataTransfer.files)
	            ).promise();
	        },

	        _getSingleFileInputFiles: function (fileInput) {
	            fileInput = $(fileInput);
	            var entries = fileInput.prop('webkitEntries') ||
	                    fileInput.prop('entries'),
	                files,
	                value;
	            if (entries && entries.length) {
	                return this._handleFileTreeEntries(entries);
	            }
	            files = $.makeArray(fileInput.prop('files'));
	            if (!files.length) {
	                value = fileInput.prop('value');
	                if (!value) {
	                    return $.Deferred().resolve([]).promise();
	                }
	                // If the files property is not available, the browser does not
	                // support the File API and we add a pseudo File object with
	                // the input value as name with path information removed:
	                files = [{name: value.replace(/^.*\\/, '')}];
	            } else if (files[0].name === undefined && files[0].fileName) {
	                // File normalization for Safari 4 and Firefox 3:
	                $.each(files, function (index, file) {
	                    file.name = file.fileName;
	                    file.size = file.fileSize;
	                });
	            }
	            return $.Deferred().resolve(files).promise();
	        },

	        _getFileInputFiles: function (fileInput) {
	            if (!(fileInput instanceof $) || fileInput.length === 1) {
	                return this._getSingleFileInputFiles(fileInput);
	            }
	            return $.when.apply(
	                $,
	                $.map(fileInput, this._getSingleFileInputFiles)
	            ).pipe(function () {
	                return Array.prototype.concat.apply(
	                    [],
	                    arguments
	                );
	            });
	        },

	        _onChange: function (e) {
	            var that = this,
	                data = {
	                    fileInput: $(e.target),
	                    form: $(e.target.form)
	                };
	            this._getFileInputFiles(data.fileInput).always(function (files) {
	                data.files = files;
	                if (that.options.replaceFileInput) {
	                    that._replaceFileInput(data);
	                }
	                if (that._trigger(
	                        'change',
	                        $.Event('change', {delegatedEvent: e}),
	                        data
	                    ) !== false) {
	                    that._onAdd(e, data);
	                }
	            });
	        },

	        _onPaste: function (e) {
	            var items = e.originalEvent && e.originalEvent.clipboardData &&
	                    e.originalEvent.clipboardData.items,
	                data = {files: []};
	            if (items && items.length) {
	                $.each(items, function (index, item) {
	                    var file = item.getAsFile && item.getAsFile();
	                    if (file) {
	                        data.files.push(file);
	                    }
	                });
	                if (this._trigger(
	                        'paste',
	                        $.Event('paste', {delegatedEvent: e}),
	                        data
	                    ) !== false) {
	                    this._onAdd(e, data);
	                }
	            }
	        },

	        _onDrop: function (e) {
	            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
	            var that = this,
	                dataTransfer = e.dataTransfer,
	                data = {};
	            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
	                e.preventDefault();
	                this._getDroppedFiles(dataTransfer).always(function (files) {
	                    data.files = files;
	                    if (that._trigger(
	                            'drop',
	                            $.Event('drop', {delegatedEvent: e}),
	                            data
	                        ) !== false) {
	                        that._onAdd(e, data);
	                    }
	                });
	            }
	        },

	        _onDragOver: getDragHandler('dragover'),

	        _onDragEnter: getDragHandler('dragenter'),

	        _onDragLeave: getDragHandler('dragleave'),

	        _initEventHandlers: function () {
	            if (this._isXHRUpload(this.options)) {
	                this._on(this.options.dropZone, {
	                    dragover: this._onDragOver,
	                    drop: this._onDrop,
	                    // event.preventDefault() on dragenter is required for IE10+:
	                    dragenter: this._onDragEnter,
	                    // dragleave is not required, but added for completeness:
	                    dragleave: this._onDragLeave
	                });
	                this._on(this.options.pasteZone, {
	                    paste: this._onPaste
	                });
	            }
	            if ($.support.fileInput) {
	                this._on(this.options.fileInput, {
	                    change: this._onChange
	                });
	            }
	        },

	        _destroyEventHandlers: function () {
	            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
	            this._off(this.options.pasteZone, 'paste');
	            this._off(this.options.fileInput, 'change');
	        },

	        _setOption: function (key, value) {
	            var reinit = $.inArray(key, this._specialOptions) !== -1;
	            if (reinit) {
	                this._destroyEventHandlers();
	            }
	            this._super(key, value);
	            if (reinit) {
	                this._initSpecialOptions();
	                this._initEventHandlers();
	            }
	        },

	        _initSpecialOptions: function () {
	            var options = this.options;
	            if (options.fileInput === undefined) {
	                options.fileInput = this.element.is('input[type="file"]') ?
	                        this.element : this.element.find('input[type="file"]');
	            } else if (!(options.fileInput instanceof $)) {
	                options.fileInput = $(options.fileInput);
	            }
	            if (!(options.dropZone instanceof $)) {
	                options.dropZone = $(options.dropZone);
	            }
	            if (!(options.pasteZone instanceof $)) {
	                options.pasteZone = $(options.pasteZone);
	            }
	        },

	        _getRegExp: function (str) {
	            var parts = str.split('/'),
	                modifiers = parts.pop();
	            parts.shift();
	            return new RegExp(parts.join('/'), modifiers);
	        },

	        _isRegExpOption: function (key, value) {
	            return key !== 'url' && $.type(value) === 'string' &&
	                /^\/.*\/[igm]{0,3}$/.test(value);
	        },

	        _initDataAttributes: function () {
	            var that = this,
	                options = this.options,
	                clone = $(this.element[0].cloneNode(false));
	            // Initialize options set via HTML5 data-attributes:
	            $.each(
	                clone.data(),
	                function (key, value) {
	                    var dataAttributeName = 'data-' +
	                        // Convert camelCase to hyphen-ated key:
	                        key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	                    if (clone.attr(dataAttributeName)) {
	                        if (that._isRegExpOption(key, value)) {
	                            value = that._getRegExp(value);
	                        }
	                        options[key] = value;
	                    }
	                }
	            );
	        },

	        _create: function () {
	            this._initDataAttributes();
	            this._initSpecialOptions();
	            this._slots = [];
	            this._sequence = this._getXHRPromise(true);
	            this._sending = this._active = 0;
	            this._initProgressObject(this);
	            this._initEventHandlers();
	        },

	        // This method is exposed to the widget API and allows to query
	        // the number of active uploads:
	        active: function () {
	            return this._active;
	        },

	        // This method is exposed to the widget API and allows to query
	        // the widget upload progress.
	        // It returns an object with loaded, total and bitrate properties
	        // for the running uploads:
	        progress: function () {
	            return this._progress;
	        },

	        // This method is exposed to the widget API and allows adding files
	        // using the fileupload API. The data parameter accepts an object which
	        // must have a files property and can contain additional options:
	        // .fileupload('add', {files: filesList});
	        add: function (data) {
	            var that = this;
	            if (!data || this.options.disabled) {
	                return;
	            }
	            if (data.fileInput && !data.files) {
	                this._getFileInputFiles(data.fileInput).always(function (files) {
	                    data.files = files;
	                    that._onAdd(null, data);
	                });
	            } else {
	                data.files = $.makeArray(data.files);
	                this._onAdd(null, data);
	            }
	        },

	        // This method is exposed to the widget API and allows sending files
	        // using the fileupload API. The data parameter accepts an object which
	        // must have a files or fileInput property and can contain additional options:
	        // .fileupload('send', {files: filesList});
	        // The method returns a Promise object for the file upload call.
	        send: function (data) {
	            if (data && !this.options.disabled) {
	                if (data.fileInput && !data.files) {
	                    var that = this,
	                        dfd = $.Deferred(),
	                        promise = dfd.promise(),
	                        jqXHR,
	                        aborted;
	                    promise.abort = function () {
	                        aborted = true;
	                        if (jqXHR) {
	                            return jqXHR.abort();
	                        }
	                        dfd.reject(null, 'abort', 'abort');
	                        return promise;
	                    };
	                    this._getFileInputFiles(data.fileInput).always(
	                        function (files) {
	                            if (aborted) {
	                                return;
	                            }
	                            if (!files.length) {
	                                dfd.reject();
	                                return;
	                            }
	                            data.files = files;
	                            jqXHR = that._onSend(null, data);
	                            jqXHR.then(
	                                function (result, textStatus, jqXHR) {
	                                    dfd.resolve(result, textStatus, jqXHR);
	                                },
	                                function (jqXHR, textStatus, errorThrown) {
	                                    dfd.reject(jqXHR, textStatus, errorThrown);
	                                }
	                            );
	                        }
	                    );
	                    return this._enhancePromise(promise);
	                }
	                data.files = $.makeArray(data.files);
	                if (data.files.length) {
	                    return this._onSend(null, data);
	                }
	            }
	            return this._getXHRPromise(false, data && data.context);
	        }

	    });

	}));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery UI - v1.11.1 - 2014-09-17
	* http://jqueryui.com
	* Includes: widget.js
	* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

	(function( factory ) {
		if ( true ) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {

			// Browser globals
			factory( jQuery );
		}
	}(function() {
	/*!
	 * jQuery UI Widget 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/jQuery.widget/
	 */


	var widget_uuid = 0,
		widget_slice = Array.prototype.slice;

	$.cleanData = (function( orig ) {
		return function( elems ) {
			var events, elem, i;
			for ( i = 0; (elem = elems[i]) != null; i++ ) {
				try {

					// Only trigger remove when necessary to save time
					events = $._data( elem, "events" );
					if ( events && events.remove ) {
						$( elem ).triggerHandler( "remove" );
					}

				// http://bugs.jquery.com/ticket/8235
				} catch( e ) {}
			}
			orig( elems );
		};
	})( $.cleanData );

	$.widget = function( name, base, prototype ) {
		var fullName, existingConstructor, constructor, basePrototype,
			// proxiedPrototype allows the provided prototype to remain unmodified
			// so that it can be used as a mixin for multiple widgets (#8876)
			proxiedPrototype = {},
			namespace = name.split( "." )[ 0 ];

		name = name.split( "." )[ 1 ];
		fullName = namespace + "-" + name;

		if ( !prototype ) {
			prototype = base;
			base = $.Widget;
		}

		// create selector for plugin
		$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
			return !!$.data( elem, fullName );
		};

		$[ namespace ] = $[ namespace ] || {};
		existingConstructor = $[ namespace ][ name ];
		constructor = $[ namespace ][ name ] = function( options, element ) {
			// allow instantiation without "new" keyword
			if ( !this._createWidget ) {
				return new constructor( options, element );
			}

			// allow instantiation without initializing for simple inheritance
			// must use "new" keyword (the code above always passes args)
			if ( arguments.length ) {
				this._createWidget( options, element );
			}
		};
		// extend with the existing constructor to carry over any static properties
		$.extend( constructor, existingConstructor, {
			version: prototype.version,
			// copy the object used to create the prototype in case we need to
			// redefine the widget later
			_proto: $.extend( {}, prototype ),
			// track widgets that inherit from this widget in case this widget is
			// redefined after a widget inherits from it
			_childConstructors: []
		});

		basePrototype = new base();
		// we need to make the options hash a property directly on the new instance
		// otherwise we'll modify the options hash on the prototype that we're
		// inheriting from
		basePrototype.options = $.widget.extend( {}, basePrototype.options );
		$.each( prototype, function( prop, value ) {
			if ( !$.isFunction( value ) ) {
				proxiedPrototype[ prop ] = value;
				return;
			}
			proxiedPrototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		});
		constructor.prototype = $.widget.extend( basePrototype, {
			// TODO: remove support for widgetEventPrefix
			// always use the name + a colon as the prefix, e.g., draggable:start
			// don't prefix for widgets that aren't DOM-based
			widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
		}, proxiedPrototype, {
			constructor: constructor,
			namespace: namespace,
			widgetName: name,
			widgetFullName: fullName
		});

		// If this widget is being redefined then we need to find all widgets that
		// are inheriting from it and redefine all of them so that they inherit from
		// the new version of this widget. We're essentially trying to replace one
		// level in the prototype chain.
		if ( existingConstructor ) {
			$.each( existingConstructor._childConstructors, function( i, child ) {
				var childPrototype = child.prototype;

				// redefine the child widget using the same prototype that was
				// originally used, but inherit from the new version of the base
				$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
			});
			// remove the list of existing child constructors from the old constructor
			// so the old child constructors can be garbage collected
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push( constructor );
		}

		$.widget.bridge( name, constructor );

		return constructor;
	};

	$.widget.extend = function( target ) {
		var input = widget_slice.call( arguments, 1 ),
			inputIndex = 0,
			inputLength = input.length,
			key,
			value;
		for ( ; inputIndex < inputLength; inputIndex++ ) {
			for ( key in input[ inputIndex ] ) {
				value = input[ inputIndex ][ key ];
				if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
					// Clone objects
					if ( $.isPlainObject( value ) ) {
						target[ key ] = $.isPlainObject( target[ key ] ) ?
							$.widget.extend( {}, target[ key ], value ) :
							// Don't extend strings, arrays, etc. with objects
							$.widget.extend( {}, value );
					// Copy everything else by reference
					} else {
						target[ key ] = value;
					}
				}
			}
		}
		return target;
	};

	$.widget.bridge = function( name, object ) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[ name ] = function( options ) {
			var isMethodCall = typeof options === "string",
				args = widget_slice.call( arguments, 1 ),
				returnValue = this;

			// allow multiple hashes to be passed on init
			options = !isMethodCall && args.length ?
				$.widget.extend.apply( null, [ options ].concat(args) ) :
				options;

			if ( isMethodCall ) {
				this.each(function() {
					var methodValue,
						instance = $.data( this, fullName );
					if ( options === "instance" ) {
						returnValue = instance;
						return false;
					}
					if ( !instance ) {
						return $.error( "cannot call methods on " + name + " prior to initialization; " +
							"attempted to call method '" + options + "'" );
					}
					if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
						return $.error( "no such method '" + options + "' for " + name + " widget instance" );
					}
					methodValue = instance[ options ].apply( instance, args );
					if ( methodValue !== instance && methodValue !== undefined ) {
						returnValue = methodValue && methodValue.jquery ?
							returnValue.pushStack( methodValue.get() ) :
							methodValue;
						return false;
					}
				});
			} else {
				this.each(function() {
					var instance = $.data( this, fullName );
					if ( instance ) {
						instance.option( options || {} );
						if ( instance._init ) {
							instance._init();
						}
					} else {
						$.data( this, fullName, new object( options, this ) );
					}
				});
			}

			return returnValue;
		};
	};

	$.Widget = function( /* options, element */ ) {};
	$.Widget._childConstructors = [];

	$.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: false,

			// callbacks
			create: null
		},
		_createWidget: function( options, element ) {
			element = $( element || this.defaultElement || this )[ 0 ];
			this.element = $( element );
			this.uuid = widget_uuid++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.options = $.widget.extend( {},
				this.options,
				this._getCreateOptions(),
				options );

			this.bindings = $();
			this.hoverable = $();
			this.focusable = $();

			if ( element !== this ) {
				$.data( element, this.widgetFullName, this );
				this._on( true, this.element, {
					remove: function( event ) {
						if ( event.target === element ) {
							this.destroy();
						}
					}
				});
				this.document = $( element.style ?
					// element within the document
					element.ownerDocument :
					// element is window or document
					element.document || element );
				this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
			}

			this._create();
			this._trigger( "create", null, this._getCreateEventData() );
			this._init();
		},
		_getCreateOptions: $.noop,
		_getCreateEventData: $.noop,
		_create: $.noop,
		_init: $.noop,

		destroy: function() {
			this._destroy();
			// we can probably remove the unbind calls in 2.0
			// all event bindings should go through this._on()
			this.element
				.unbind( this.eventNamespace )
				.removeData( this.widgetFullName )
				// support: jquery <1.6.3
				// http://bugs.jquery.com/ticket/9413
				.removeData( $.camelCase( this.widgetFullName ) );
			this.widget()
				.unbind( this.eventNamespace )
				.removeAttr( "aria-disabled" )
				.removeClass(
					this.widgetFullName + "-disabled " +
					"ui-state-disabled" );

			// clean up events and states
			this.bindings.unbind( this.eventNamespace );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		},
		_destroy: $.noop,

		widget: function() {
			return this.element;
		},

		option: function( key, value ) {
			var options = key,
				parts,
				curOption,
				i;

			if ( arguments.length === 0 ) {
				// don't return a reference to the internal hash
				return $.widget.extend( {}, this.options );
			}

			if ( typeof key === "string" ) {
				// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
				options = {};
				parts = key.split( "." );
				key = parts.shift();
				if ( parts.length ) {
					curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
					for ( i = 0; i < parts.length - 1; i++ ) {
						curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
						curOption = curOption[ parts[ i ] ];
					}
					key = parts.pop();
					if ( arguments.length === 1 ) {
						return curOption[ key ] === undefined ? null : curOption[ key ];
					}
					curOption[ key ] = value;
				} else {
					if ( arguments.length === 1 ) {
						return this.options[ key ] === undefined ? null : this.options[ key ];
					}
					options[ key ] = value;
				}
			}

			this._setOptions( options );

			return this;
		},
		_setOptions: function( options ) {
			var key;

			for ( key in options ) {
				this._setOption( key, options[ key ] );
			}

			return this;
		},
		_setOption: function( key, value ) {
			this.options[ key ] = value;

			if ( key === "disabled" ) {
				this.widget()
					.toggleClass( this.widgetFullName + "-disabled", !!value );

				// If the widget is becoming disabled, then nothing is interactive
				if ( value ) {
					this.hoverable.removeClass( "ui-state-hover" );
					this.focusable.removeClass( "ui-state-focus" );
				}
			}

			return this;
		},

		enable: function() {
			return this._setOptions({ disabled: false });
		},
		disable: function() {
			return this._setOptions({ disabled: true });
		},

		_on: function( suppressDisabledCheck, element, handlers ) {
			var delegateElement,
				instance = this;

			// no suppressDisabledCheck flag, shuffle arguments
			if ( typeof suppressDisabledCheck !== "boolean" ) {
				handlers = element;
				element = suppressDisabledCheck;
				suppressDisabledCheck = false;
			}

			// no element argument, shuffle and use this.element
			if ( !handlers ) {
				handlers = element;
				element = this.element;
				delegateElement = this.widget();
			} else {
				element = delegateElement = $( element );
				this.bindings = this.bindings.add( element );
			}

			$.each( handlers, function( event, handler ) {
				function handlerProxy() {
					// allow widgets to customize the disabled handling
					// - disabled as an array instead of boolean
					// - disabled class as method for disabling individual parts
					if ( !suppressDisabledCheck &&
							( instance.options.disabled === true ||
								$( this ).hasClass( "ui-state-disabled" ) ) ) {
						return;
					}
					return ( typeof handler === "string" ? instance[ handler ] : handler )
						.apply( instance, arguments );
				}

				// copy the guid so direct unbinding works
				if ( typeof handler !== "string" ) {
					handlerProxy.guid = handler.guid =
						handler.guid || handlerProxy.guid || $.guid++;
				}

				var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
					eventName = match[1] + instance.eventNamespace,
					selector = match[2];
				if ( selector ) {
					delegateElement.delegate( selector, eventName, handlerProxy );
				} else {
					element.bind( eventName, handlerProxy );
				}
			});
		},

		_off: function( element, eventName ) {
			eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
			element.unbind( eventName ).undelegate( eventName );
		},

		_delay: function( handler, delay ) {
			function handlerProxy() {
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}
			var instance = this;
			return setTimeout( handlerProxy, delay || 0 );
		},

		_hoverable: function( element ) {
			this.hoverable = this.hoverable.add( element );
			this._on( element, {
				mouseenter: function( event ) {
					$( event.currentTarget ).addClass( "ui-state-hover" );
				},
				mouseleave: function( event ) {
					$( event.currentTarget ).removeClass( "ui-state-hover" );
				}
			});
		},

		_focusable: function( element ) {
			this.focusable = this.focusable.add( element );
			this._on( element, {
				focusin: function( event ) {
					$( event.currentTarget ).addClass( "ui-state-focus" );
				},
				focusout: function( event ) {
					$( event.currentTarget ).removeClass( "ui-state-focus" );
				}
			});
		},

		_trigger: function( type, event, data ) {
			var prop, orig,
				callback = this.options[ type ];

			data = data || {};
			event = $.Event( event );
			event.type = ( type === this.widgetEventPrefix ?
				type :
				this.widgetEventPrefix + type ).toLowerCase();
			// the original event may come from any element
			// so we need to reset the target on the new event
			event.target = this.element[ 0 ];

			// copy original event properties over to the new event
			orig = event.originalEvent;
			if ( orig ) {
				for ( prop in orig ) {
					if ( !( prop in event ) ) {
						event[ prop ] = orig[ prop ];
					}
				}
			}

			this.element.trigger( event, data );
			return !( $.isFunction( callback ) &&
				callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
				event.isDefaultPrevented() );
		}
	};

	$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
		$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
			if ( typeof options === "string" ) {
				options = { effect: options };
			}
			var hasOptions,
				effectName = !options ?
					method :
					options === true || typeof options === "number" ?
						defaultEffect :
						options.effect || defaultEffect;
			options = options || {};
			if ( typeof options === "number" ) {
				options = { duration: options };
			}
			hasOptions = !$.isEmptyObject( options );
			options.complete = callback;
			if ( options.delay ) {
				element.delay( options.delay );
			}
			if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
				element[ method ]( options );
			} else if ( effectName !== method && element[ effectName ] ) {
				element[ effectName ]( options.duration, options.easing, callback );
			} else {
				element.queue(function( next ) {
					$( this )[ method ]();
					if ( callback ) {
						callback.call( element[ 0 ] );
					}
					next();
				});
			}
		};
	});

	var widget = $.widget;



	}));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * jQuery File Upload Processing Plugin 1.3.0
	 * https://github.com/blueimp/jQuery-File-Upload
	 *
	 * Copyright 2012, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */

	/* jshint nomen:false */
	/* global define, window */

	(function (factory) {
	    'use strict';
	    if (true) {
	        // Register as an anonymous AMD module:
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	            __webpack_require__(8)
	        ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // Browser globals:
	        factory(
	            window.jQuery
	        );
	    }
	}(function () {
	    'use strict';

	    var originalAdd = $.blueimp.fileupload.prototype.options.add;

	    // The File Upload Processing plugin extends the fileupload widget
	    // with file processing functionality:
	    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

	        options: {
	            // The list of processing actions:
	            processQueue: [
	                /*
	                {
	                    action: 'log',
	                    type: 'debug'
	                }
	                */
	            ],
	            add: function (e, data) {
	                var $this = $(this);
	                data.process(function () {
	                    return $this.fileupload('process', data);
	                });
	                originalAdd.call(this, e, data);
	            }
	        },

	        processActions: {
	            /*
	            log: function (data, options) {
	                console[options.type](
	                    'Processing "' + data.files[data.index].name + '"'
	                );
	            }
	            */
	        },

	        _processFile: function (data, originalData) {
	            var that = this,
	                dfd = $.Deferred().resolveWith(that, [data]),
	                chain = dfd.promise();
	            this._trigger('process', null, data);
	            $.each(data.processQueue, function (i, settings) {
	                var func = function (data) {
	                    if (originalData.errorThrown) {
	                        return $.Deferred()
	                                .rejectWith(that, [originalData]).promise();
	                    }
	                    return that.processActions[settings.action].call(
	                        that,
	                        data,
	                        settings
	                    );
	                };
	                chain = chain.pipe(func, settings.always && func);
	            });
	            chain
	                .done(function () {
	                    that._trigger('processdone', null, data);
	                    that._trigger('processalways', null, data);
	                })
	                .fail(function () {
	                    that._trigger('processfail', null, data);
	                    that._trigger('processalways', null, data);
	                });
	            return chain;
	        },

	        // Replaces the settings of each processQueue item that
	        // are strings starting with an "@", using the remaining
	        // substring as key for the option map,
	        // e.g. "@autoUpload" is replaced with options.autoUpload:
	        _transformProcessQueue: function (options) {
	            var processQueue = [];
	            $.each(options.processQueue, function () {
	                var settings = {},
	                    action = this.action,
	                    prefix = this.prefix === true ? action : this.prefix;
	                $.each(this, function (key, value) {
	                    if ($.type(value) === 'string' &&
	                            value.charAt(0) === '@') {
	                        settings[key] = options[
	                            value.slice(1) || (prefix ? prefix +
	                                key.charAt(0).toUpperCase() + key.slice(1) : key)
	                        ];
	                    } else {
	                        settings[key] = value;
	                    }

	                });
	                processQueue.push(settings);
	            });
	            options.processQueue = processQueue;
	        },

	        // Returns the number of files currently in the processsing queue:
	        processing: function () {
	            return this._processing;
	        },

	        // Processes the files given as files property of the data parameter,
	        // returns a Promise object that allows to bind callbacks:
	        process: function (data) {
	            var that = this,
	                options = $.extend({}, this.options, data);
	            if (options.processQueue && options.processQueue.length) {
	                this._transformProcessQueue(options);
	                if (this._processing === 0) {
	                    this._trigger('processstart');
	                }
	                $.each(data.files, function (index) {
	                    var opts = index ? $.extend({}, options) : options,
	                        func = function () {
	                            if (data.errorThrown) {
	                                return $.Deferred()
	                                        .rejectWith(that, [data]).promise();
	                            }
	                            return that._processFile(opts, data);
	                        };
	                    opts.index = index;
	                    that._processing += 1;
	                    that._processingQueue = that._processingQueue.pipe(func, func)
	                        .always(function () {
	                            that._processing -= 1;
	                            if (that._processing === 0) {
	                                that._trigger('processstop');
	                            }
	                        });
	                });
	            }
	            return this._processingQueue;
	        },

	        _create: function () {
	            this._super();
	            this._processing = 0;
	            this._processingQueue = $.Deferred().resolveWith(this)
	                .promise();
	        }

	    });

	}));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * jQuery File Upload Validation Plugin 1.1.2
	 * https://github.com/blueimp/jQuery-File-Upload
	 *
	 * Copyright 2013, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */

	/* global define, window */

	(function (factory) {
	    'use strict';
	    if (true) {
	        // Register as an anonymous AMD module:
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	            __webpack_require__(10)
	        ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // Browser globals:
	        factory(
	            window.jQuery
	        );
	    }
	}(function () {
	    'use strict';

	    // Append to the default processQueue:
	    $.blueimp.fileupload.prototype.options.processQueue.push(
	        {
	            action: 'validate',
	            // Always trigger this action,
	            // even if the previous action was rejected: 
	            always: true,
	            // Options taken from the global options map:
	            acceptFileTypes: '@',
	            maxFileSize: '@',
	            minFileSize: '@',
	            maxNumberOfFiles: '@',
	            disabled: '@disableValidation'
	        }
	    );

	    // The File Upload Validation plugin extends the fileupload widget
	    // with file validation functionality:
	    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

	        options: {
	            /*
	            // The regular expression for allowed file types, matches
	            // against either file type or file name:
	            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	            // The maximum allowed file size in bytes:
	            maxFileSize: 10000000, // 10 MB
	            // The minimum allowed file size in bytes:
	            minFileSize: undefined, // No minimal file size
	            // The limit of files to be uploaded:
	            maxNumberOfFiles: 10,
	            */

	            // Function returning the current number of files,
	            // has to be overriden for maxNumberOfFiles validation:
	            getNumberOfFiles: $.noop,

	            // Error and info messages:
	            messages: {
	                maxNumberOfFiles: '已达到文件上传最大数',
	                acceptFileTypes: '文件格式不允许上传',
	                maxFileSize: '文件太大',
	                minFileSize: '文件太小'
	            }
	        },

	        processActions: {

	            validate: function (data, options) {
	                if (options.disabled) {
	                    return data;
	                }
	                var dfd = $.Deferred(),
	                    settings = this.options,
	                    file = data.files[data.index],
	                    fileSize;
	                if (options.minFileSize || options.maxFileSize) {
	                    fileSize = file.size;
	                }
	                if ($.type(options.maxNumberOfFiles) === 'number' &&
	                        (settings.getNumberOfFiles() || 0) + data.files.length >
	                            options.maxNumberOfFiles) {
	                    file.error = settings.i18n('maxNumberOfFiles');
	                } else if (options.acceptFileTypes &&
	                        !(options.acceptFileTypes.test(file.type) ||
	                        options.acceptFileTypes.test(file.name))) {
	                    file.error = settings.i18n('acceptFileTypes');
	                } else if (fileSize > options.maxFileSize) {
	                    file.error = settings.i18n('maxFileSize');
	                } else if ($.type(fileSize) === 'number' &&
	                        fileSize < options.minFileSize) {
	                    file.error = settings.i18n('minFileSize');
	                } else {
	                    delete file.error;
	                }
	                if (file.error || data.files.error) {
	                    data.files.error = true;
	                    dfd.rejectWith(this, [data]);
	                } else {
	                    dfd.resolveWith(this, [data]);
	                }
	                return dfd.promise();
	            }

	        }

	    });

	}));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./jquery.fileupload.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./jquery.fileupload.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*\n * jQuery File Upload Plugin CSS 1.3.0\n * https://github.com/blueimp/jQuery-File-Upload\n *\n * Copyright 2013, Sebastian Tschan\n * https://blueimp.net\n *\n * Licensed under the MIT license:\n * http://www.opensource.org/licenses/MIT\n */\n\n.fileinput-button {\n  position: relative;\n  overflow: hidden;\n}\n.fileinput-button input {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 0;\n  opacity: 0;\n  -ms-filter: 'alpha(opacity=0)';\n  font-size: 200px;\n  direction: ltr;\n  cursor: pointer;\n}\n\n/* Fixes for IE < 8 */\n@media screen\\9 {\n  .fileinput-button input {\n    filter: alpha(opacity=0);\n    font-size: 100%;\n    height: 100%;\n  }\n}\n", ""]);

	// exports


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./jquery.fileupload-ui.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./jquery.fileupload-ui.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*\n * jQuery File Upload UI Plugin CSS 9.0.0\n * https://github.com/blueimp/jQuery-File-Upload\n *\n * Copyright 2010, Sebastian Tschan\n * https://blueimp.net\n *\n * Licensed under the MIT license:\n * http://www.opensource.org/licenses/MIT\n */\n\n.fileupload-buttonbar .btn,\n.fileupload-buttonbar .toggle {\n  margin-bottom: 5px;\n}\n.progress-animated .progress-bar,\n.progress-animated .bar {\n  background: url(" + __webpack_require__(18) + ") !important;\n  filter: none;\n}\n.fileupload-process {\n  float: right;\n  display: none;\n}\n.fileupload-processing .fileupload-process,\n.files .processing .preview {\n  display: block;\n  width: 32px;\n  height: 32px;\n  background: url(" + __webpack_require__(19) + ") center no-repeat;\n  background-size: contain;\n}\n.files audio,\n.files video {\n  max-width: 300px;\n}\n\n@media (max-width: 767px) {\n  .fileupload-buttonbar .toggle,\n  .files .toggle,\n  .files .btn span {\n    display: none;\n  }\n  .files .name {\n    width: 80px;\n    word-wrap: break-word;\n  }\n  .files audio,\n  .files video {\n    max-width: 80px;\n  }\n  .files img,\n  .files canvas {\n    max-width: 100%;\n  }\n}\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2165b99c89c8431e7165530ccb5f89fb.gif";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "05992d3434d3589b38a3a5431842d38f.gif";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// define(['avalon',
	//     'text!components/grid.html',
	//     'components/pager',
	// ], function(avalon, sourceHtml) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(21),
	    __webpack_require__(22),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(sourceHtml) {
	    var pagerVm; // 暂存内部pager的vm
	    var template; //暂存

	    var grid = {
	        //配置参数
	        emptyMessage: '当前没有任何数据', // @config 提示信息
	        loadingMessage: '数据加载中', // @config 提示信息
	        showPager: true, // @config 是否分页
	        extraAttribute: null, // @config 扩展属性，在绑定数据前，给拿到的数据做属性扩展
	        lazyload: false, // @config 是否为手动初始化
	        loadData: avalon.noop, // @config 如何加载数据

	        // 事件
	        onInit: avalon.noop,

	        // 方法       
	        init: avalon.noop, // 手动调用初始化，针对一些特殊情，比如一开始Grid是没有在界面上的，一定操作后才初始化
	        refreshAll: avalon.noop, //全部重新刷新
	        refreshCurrentPage: avalon.noop, //仅仅刷新本页

	        // 内部用的属性和方法
	        loading: false,
	        data: [],
	        fectchData: avalon.noop,

	        $replace: false, // 真值时表示替换其容器

	        $init: init,

	        $childReady: function(vm) {
	            if (!vm.lazyload) {
	                vm.fectchData(1);
	            }

	            // 指定pager的onPageChanged事件
	            pagerVm.onPageChanged = function(page) {
	                vm.fectchData(page);
	            };
	        },

	        $ready: function() {},

	        $dispose: function(vm, elem) {
	            elem.innerHTML = elem.textContent = "";
	        },

	        //$template: template, //因为模板是动态生成的，所以这里不需要指定

	        // 内部pager组件的配置项
	        $pagerOpt: {
	            onInit: function(vm) {
	                pagerVm = vm;
	            }
	        },
	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, elem) {
	        template = sourceHtml.replace('$DATA_TEMPLATE$', elem.innerHTML); //将模板的内容插入到当前元素下面
	        vm.$$template = function() {
	            return template;
	        };

	        vm.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	        // 定义内部的方法实现
	        vm.fectchData = function(page) {
	            vm.loading = true;

	            if (!vm.loadData) {
	                console.error("没有定义loadData方法");
	                return;
	            }

	            vm.loadData.call(elem, page).then(function success(result) {

	                var dataTmp = result.List ? result.List : result;
	                vm.loading = false;

	                if (vm.extraAttribute != null) { //如果指定了扩展属性，则在这里扩展
	                    for (var i = dataTmp.length - 1; i >= 0; i--) {
	                        avalon.mix(dataTmp[i], vm.extraAttribute);
	                    };
	                }

	                vm.data.clear();
	                vm.data.pushArray(dataTmp);

	                if (vm.showPager) {
	                    pagerVm.doInit(result.PageIndex, result.PageCount, result.RecordCount, result.PageSize);
	                }
	            }, function fail(res) {
	                vm.loading = false;
	                console.error(res);
	            });
	        };

	        vm.init = function() {
	            vm.fectchData(1);
	        };

	        vm.refreshAll = function() {
	            vm.fectchData(1);
	        };

	        vm.refreshCurrentPage = function() {
	            vm.fectchData(pagerVm.currentIndex);
	        };

	        if (typeof vm.onInit === "function") {
	            vm.onInit.call(elem, vm);
	        }
	    }

	    avalon.component("wk:grid", grid);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div class=\"alert alert-info\" ms-if=\"loading\">\r\n    <strong>{{loadingMessage}}</strong>  <i class=\"fa fa-spin  fa-circle-o-notch\"></i>\r\n</div>\r\n\r\n<div ms-if=\"loading == false && data.length == 0\" class=\"note note-info\">\r\n        <h4 class=\"block\">暂无数据</h4>\r\n        <p>\r\n            {{emptyMessage}}\r\n        </p>\r\n</div>\r\n\r\n<div ms-visible=\"loading == false && data.length > 0\">\r\n    \r\n    $DATA_TEMPLATE$\r\n\t\r\n    <div ms-visible=\"showPager\">\r\n    \t<wk:pager config=\"$pagerOpt\"></wk:pager>\r\n    </div>                     \r\n</div>"

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// define(['avalon',
	// 	'text!components/pager.html'
	// ], function(avalon, sourceHtml) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(23)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(sourceHtml) {

		var pager = {
			showPagingInfo: true,
			pageSize: 10,

			//分页信息
			currentIndex: 1,
			totalPage: 1,
			totalCount: 1,
			pageIndexs: [],

			// 事件
			onInit: avalon.noop,
			onPageChanged: avalon.noop,

			// 方法
			doInit: avalon.noop,
			jump: avalon.noop,
			jumpToFirst: avalon.noop,
			jumpToLast: avalon.noop,

			$replace: true, // 真值时表示替换其容器

			$init: init,

			$childReady: function() {

			},
			$ready: function() {

			},
			$dispose: function(vm, elem) {
				elem.innerHTML = elem.textContent = "";
			},
			$template: sourceHtml
		};

		/**
		 * 组件初始化
		 * @param  vm   当前组件的view model
		 * @param  elem 当前组件对应的dom
		 */
		function init(vm, elem) {
			vm.jump = function(toIndex) {
				vm.onPageChanged.call(elem, toIndex);
				vm.currentIndex = toIndex;
			};

			vm.jumpToFirst = function() {
				vm.jump(1);
			};

			vm.jumpToLast = function() {
				vm.jump(vm.totalPage);
			};

			// 初始化方法
			vm.doInit = function(pageIndex, pageCount, totalCount, pageSize) {
				vm.currentIndex = pageIndex;
				vm.totalPage = pageCount;
				vm.totalCount = totalCount;

				vm.pageSize = pageSize || options.pageSize;

				vm.pageIndexs.clear();

				for (var i = 1; i <= vm.totalPage; i++) {
					vm.pageIndexs.push(i);
				}
			};

			vm.onInit.call(elem, vm);
		}

		avalon.component("wk:pager", pager);

		return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-5 col-sm-12\" style=\"margin: 10px 0;\" ms-if='showPagingInfo'>\r\n        <span>第<span style=\"color: #b70c5e\"> {{currentIndex}} / {{totalPage}} </span>页，\r\n        每页显示<span style=\"color: #b70c5e\"> {{pageSize}} </span>条记录，\r\n        共搜索出<span style=\"color: #b70c5e\"> {{totalCount}} </span>条记录</span>\r\n    </div>\r\n    <div class=\"col-md-7 col-sm-12\">\r\n        <nav style=\"float: right;\">\r\n            <ul class=\"pagination pagination-sm\" style=\"margin:5px 0;\">\r\n                <li ref=\"1\"><a ms-click=\"jumpToFirst\" href=\"javascript:;\">首页</a></li>\r\n\r\n                <li ms-class='active: el === currentIndex' ms-repeat='pageIndexs'><a href=\"javascript:;\" ms-click='jump(el)'>{{el}}</a></li>\r\n                \r\n                <li ref=\"2\"><a ms-click=\"jumpToLast\" href=\"javascript:;\">尾页</a></li>\r\n            </ul>\r\n        </nav>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../vendor/avalon/avalon.js" />
	/**
	 * msdatepicker是一个日期选择组件
	 * author: zxl
	 * 使用说明：
	 * 例子：<wk:msdatepicker duplex="dto.DateTime" placeholder="设置日期时间"></wk:msdatepicker>
	 */
	 //define(['avalon',
	 //    'datepicker',
	 //    'css!../plugin/datepicker/css/datepicker3.css'
	 //], function (avalon) {
	//
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(25),
	    __webpack_require__(26)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var template;

	    /*本地化*/
	    $.fn.datepicker.dates['zh-CN'] = {
	        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
	        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
	        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
	        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	        today: "今日",
	        format: "yyyy年mm月dd日",
	        weekStart: 1
	    };

	    var $datepicker;
	    var _interface = function() {};

	    var msdatepicker = {
	        config: {
	            orientation: "left",
	            format: "yyyy-mm-dd",
	            autoclose: true,
	            language: 'zh-CN',
	            todayHighlight: true
	        },
	        duplex: '',
	        cssclass: 'form-control',
	        placeholder: '点击选择时间',
	        name: '',
	        endToday: false,
	        elementId:'',

	        // 事件
	        onChanged: _interface,
	        onInit: _interface,
	        init: _interface,

	        $init: init,

	        $ready: function(vm, el) {
	            var $datepicker = $('#' + vm.elementId);

	            console.log($datepicker);

	            $datepicker
	                .datepicker(vm.config)
	                .on("changeDate", function(e) {
	                    vm.onChanged.call(el, e); //用户回调
	                    // 清除表单验证的错误提示
	                    if (typeof(vm.name) != 'undefined') {
	                        $('#' + vm.elementId).closest('.form-group').removeClass('has-error');
	                        $('#' + vm.elementId + '-error').remove();
	                    }
	                });

	            if (vm.endToday) {
	                $datepicker.datepicker('setEndDate', new Date());
	            }

	            $datepicker.datepicker('update', $('#' + vm.elementId).val());
	        },

	        $dispose: function(vm, el) {
	            el.innerHTML = el.textContent = "";
	        }
	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, el) {
	        vm.elementId = "msdatepicker" + vm.$id;

	        var rawHtml = '<input ms-duplex="$DUPLEX$" name="$NAME$" id= "' + vm.elementId + '" class="$CSS$ date-picker" placeholder="$PLACEHOLDER$" type="text" value="">';
	        var html = rawHtml.replace('$CSS$', vm.cssclass).replace('$PLACEHOLDER$', vm.placeholder).replace('$NAME$', vm.name);

	        if (vm.duplex != "") {
	            html = html.replace('$DUPLEX$', vm.duplex);
	        }

	        template = html;
	        vm.$$template = function() {
	            return template;
	        };

	        if (typeof vm.onInit === 'function') {
	            vm.onInit.call(el, vm);
	        }
	    };

	    avalon.component("wk:msdatepicker", msdatepicker);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 25 */
/***/ function(module, exports) {

	/* =========================================================
	 * bootstrap-datepicker.js
	 * Repo: https://github.com/eternicode/bootstrap-datepicker/
	 * Demo: http://eternicode.github.io/bootstrap-datepicker/
	 * Docs: http://bootstrap-datepicker.readthedocs.org/
	 * Forked from http://www.eyecon.ro/bootstrap-datepicker
	 * =========================================================
	 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */

	(function($, undefined){

		var $window = $(window);

		function UTCDate(){
			return new Date(Date.UTC.apply(Date, arguments));
		}
		function UTCToday(){
			var today = new Date();
			return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
		}
		function alias(method){
			return function(){
				return this[method].apply(this, arguments);
			};
		}

		var DateArray = (function(){
			var extras = {
				get: function(i){
					return this.slice(i)[0];
				},
				contains: function(d){
					// Array.indexOf is not cross-browser;
					// $.inArray doesn't work with Dates
					var val = d && d.valueOf();
					for (var i=0, l=this.length; i < l; i++)
						if (this[i].valueOf() === val)
							return i;
					return -1;
				},
				remove: function(i){
					this.splice(i,1);
				},
				replace: function(new_array){
					if (!new_array)
						return;
					if (!$.isArray(new_array))
						new_array = [new_array];
					this.clear();
					this.push.apply(this, new_array);
				},
				clear: function(){
					this.splice(0);
				},
				copy: function(){
					var a = new DateArray();
					a.replace(this);
					return a;
				}
			};

			return function(){
				var a = [];
				a.push.apply(a, arguments);
				$.extend(a, extras);
				return a;
			};
		})();


		// Picker object

		var Datepicker = function(element, options){
			this.dates = new DateArray();
			this.viewDate = UTCToday();
			this.focusDate = null;

			this._process_options(options);

			this.element = $(element);
			this.isInline = false;
			this.isInput = this.element.is('input');
			this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
			this.hasInput = this.component && this.element.find('input').length;
			if (this.component && this.component.length === 0)
				this.component = false;

			this.picker = $(DPGlobal.template);
			this._buildEvents();
			this._attachEvents();

			if (this.isInline){
				this.picker.addClass('datepicker-inline').appendTo(this.element);
			}
			else {
				this.picker.addClass('datepicker-dropdown dropdown-menu');
			}

			if (this.o.rtl){
				this.picker.addClass('datepicker-rtl');
				this.picker.find('.prev i, .next i')
							.toggleClass('fa-angle-left fa-angle-right');
			}

			this.viewMode = this.o.startView;

			if (this.o.calendarWeeks)
				this.picker.find('tfoot th.today')
							.attr('colspan', function(i, val){
								return parseInt(val) + 1;
							});

			this._allow_update = false;

			this.setStartDate(this._o.startDate);
			this.setEndDate(this._o.endDate);
			this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

			this.fillDow();
			this.fillMonths();

			this._allow_update = true;

			this.update();
			this.showMode();

			if (this.isInline){
				this.show();
			}
		};

		Datepicker.prototype = {
			constructor: Datepicker,

			_process_options: function(opts){
				// Store raw options for reference
				this._o = $.extend({}, this._o, opts);
				// Processed options
				var o = this.o = $.extend({}, this._o);

				// Check if "de-DE" style date is available, if not language should
				// fallback to 2 letter code eg "de"
				var lang = o.language;
				if (!dates[lang]){
					lang = lang.split('-')[0];
					if (!dates[lang])
						lang = defaults.language;
				}
				o.language = lang;

				switch (o.startView){
					case 2:
					case 'decade':
						o.startView = 2;
						break;
					case 1:
					case 'year':
						o.startView = 1;
						break;
					default:
						o.startView = 0;
				}

				switch (o.minViewMode){
					case 1:
					case 'months':
						o.minViewMode = 1;
						break;
					case 2:
					case 'years':
						o.minViewMode = 2;
						break;
					default:
						o.minViewMode = 0;
				}

				o.startView = Math.max(o.startView, o.minViewMode);

				// true, false, or Number > 0
				if (o.multidate !== true){
					o.multidate = Number(o.multidate) || false;
					if (o.multidate !== false)
						o.multidate = Math.max(0, o.multidate);
					else
						o.multidate = 1;
				}
				o.multidateSeparator = String(o.multidateSeparator);

				o.weekStart %= 7;
				o.weekEnd = ((o.weekStart + 6) % 7);

				var format = DPGlobal.parseFormat(o.format);
				if (o.startDate !== -Infinity){
					if (!!o.startDate){
						if (o.startDate instanceof Date)
							o.startDate = this._local_to_utc(this._zero_time(o.startDate));
						else
							o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
					}
					else {
						o.startDate = -Infinity;
					}
				}
				if (o.endDate !== Infinity){
					if (!!o.endDate){
						if (o.endDate instanceof Date)
							o.endDate = this._local_to_utc(this._zero_time(o.endDate));
						else
							o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
					}
					else {
						o.endDate = Infinity;
					}
				}

				o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
				if (!$.isArray(o.daysOfWeekDisabled))
					o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
				o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
					return parseInt(d, 10);
				});

				var plc = String(o.orientation).toLowerCase().split(/\s+/g),
					_plc = o.orientation.toLowerCase();
				plc = $.grep(plc, function(word){
					return (/^auto|left|right|top|bottom$/).test(word);
				});
				o.orientation = {x: 'auto', y: 'auto'};
				if (!_plc || _plc === 'auto')
					; // no action
				else if (plc.length === 1){
					switch (plc[0]){
						case 'top':
						case 'bottom':
							o.orientation.y = plc[0];
							break;
						case 'left':
						case 'right':
							o.orientation.x = plc[0];
							break;
					}
				}
				else {
					_plc = $.grep(plc, function(word){
						return (/^left|right$/).test(word);
					});
					o.orientation.x = _plc[0] || 'auto';

					_plc = $.grep(plc, function(word){
						return (/^top|bottom$/).test(word);
					});
					o.orientation.y = _plc[0] || 'auto';
				}
			},
			_events: [],
			_secondaryEvents: [],
			_applyEvents: function(evs){
				for (var i=0, el, ch, ev; i < evs.length; i++){
					el = evs[i][0];
					if (evs[i].length === 2){
						ch = undefined;
						ev = evs[i][1];
					}
					else if (evs[i].length === 3){
						ch = evs[i][1];
						ev = evs[i][2];
					}
					el.on(ev, ch);
				}
			},
			_unapplyEvents: function(evs){
				for (var i=0, el, ev, ch; i < evs.length; i++){
					el = evs[i][0];
					if (evs[i].length === 2){
						ch = undefined;
						ev = evs[i][1];
					}
					else if (evs[i].length === 3){
						ch = evs[i][1];
						ev = evs[i][2];
					}
					el.off(ev, ch);
				}
			},
			_buildEvents: function(){
				if (this.isInput){ // single input
					this._events = [
						[this.element, {
							focus: $.proxy(this.show, this),
							keyup: $.proxy(function(e){
								if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
									this.update();
							}, this),
							keydown: $.proxy(this.keydown, this)
						}]
					];
				}
				else if (this.component && this.hasInput){ // component: input + button
					this._events = [
						// For components that are not readonly, allow keyboard nav
						[this.element.find('input'), {
							focus: $.proxy(this.show, this),
							keyup: $.proxy(function(e){
								if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
									this.update();
							}, this),
							keydown: $.proxy(this.keydown, this)
						}],
						[this.component, {
							click: $.proxy(this.show, this)
						}]
					];
				}
				else if (this.element.is('div')){  // inline datepicker
					this.isInline = true;
				}
				else {
					this._events = [
						[this.element, {
							click: $.proxy(this.show, this)
						}]
					];
				}
				this._events.push(
					// Component: listen for blur on element descendants
					[this.element, '*', {
						blur: $.proxy(function(e){
							this._focused_from = e.target;
						}, this)
					}],
					// Input: listen for blur on element
					[this.element, {
						blur: $.proxy(function(e){
							this._focused_from = e.target;
						}, this)
					}]
				);

				this._secondaryEvents = [
					[this.picker, {
						click: $.proxy(this.click, this)
					}],
					[$(window), {
						resize: $.proxy(this.place, this)
					}],
					[$(document), {
						'mousedown touchstart': $.proxy(function(e){
							// Clicked outside the datepicker, hide it
							if (!(
								this.element.is(e.target) ||
								this.element.find(e.target).length ||
								this.picker.is(e.target) ||
								this.picker.find(e.target).length
							)){
								this.hide();
							}
						}, this)
					}]
				];
			},
			_attachEvents: function(){
				this._detachEvents();
				this._applyEvents(this._events);
			},
			_detachEvents: function(){
				this._unapplyEvents(this._events);
			},
			_attachSecondaryEvents: function(){
				this._detachSecondaryEvents();
				this._applyEvents(this._secondaryEvents);
			},
			_detachSecondaryEvents: function(){
				this._unapplyEvents(this._secondaryEvents);
			},
			_trigger: function(event, altdate){
				var date = altdate || this.dates.get(-1),
					local_date = this._utc_to_local(date);

				this.element.trigger({
					type: event,
					date: local_date,
					dates: $.map(this.dates, this._utc_to_local),
					format: $.proxy(function(ix, format){
						if (arguments.length === 0){
							ix = this.dates.length - 1;
							format = this.o.format;
						}
						else if (typeof ix === 'string'){
							format = ix;
							ix = this.dates.length - 1;
						}
						format = format || this.o.format;
						var date = this.dates.get(ix);
						return DPGlobal.formatDate(date, format, this.o.language);
					}, this)
				});
			},

			show: function(){
				if (!this.isInline)
					this.picker.appendTo('body');
				this.picker.show();
				this.place();
				this._attachSecondaryEvents();
				this._trigger('show');
			},

			hide: function(){
				if (this.isInline)
					return;
				if (!this.picker.is(':visible'))
					return;
				this.focusDate = null;
				this.picker.hide().detach();
				this._detachSecondaryEvents();
				this.viewMode = this.o.startView;
				this.showMode();

				if (
					this.o.forceParse &&
					(
						this.isInput && this.element.val() ||
						this.hasInput && this.element.find('input').val()
					)
				)
					this.setValue();
				this._trigger('hide');
			},

			remove: function(){
				this.hide();
				this._detachEvents();
				this._detachSecondaryEvents();
				this.picker.remove();
				delete this.element.data().datepicker;
				if (!this.isInput){
					delete this.element.data().date;
				}
			},

			_utc_to_local: function(utc){
				return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
			},
			_local_to_utc: function(local){
				return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
			},
			_zero_time: function(local){
				return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
			},
			_zero_utc_time: function(utc){
				return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
			},

			getDates: function(){
				return $.map(this.dates, this._utc_to_local);
			},

			getUTCDates: function(){
				return $.map(this.dates, function(d){
					return new Date(d);
				});
			},

			getDate: function(){
				return this._utc_to_local(this.getUTCDate());
			},

			getUTCDate: function(){
				return new Date(this.dates.get(-1));
			},

			setDates: function(){
				var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
				this.update.apply(this, args);
				this._trigger('changeDate');
				this.setValue();
			},

			setUTCDates: function(){
				var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
				this.update.apply(this, $.map(args, this._utc_to_local));
				this._trigger('changeDate');
				this.setValue();
			},

			setDate: alias('setDates'),
			setUTCDate: alias('setUTCDates'),

			setValue: function(){
				var formatted = this.getFormattedDate();
				if (!this.isInput){
					if (this.component){
						this.element.find('input').val(formatted).change();
					}
				}
				else {
					this.element.val(formatted).change();
				}
			},

			getFormattedDate: function(format){
				if (format === undefined)
					format = this.o.format;

				var lang = this.o.language;
				return $.map(this.dates, function(d){
					return DPGlobal.formatDate(d, format, lang);
				}).join(this.o.multidateSeparator);
			},

			setStartDate: function(startDate){
				this._process_options({startDate: startDate});
				this.update();
				this.updateNavArrows();
			},

			setEndDate: function(endDate){
				this._process_options({endDate: endDate});
				this.update();
				this.updateNavArrows();
			},

			setDaysOfWeekDisabled: function(daysOfWeekDisabled){
				this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
				this.update();
				this.updateNavArrows();
			},

			place: function(){
				if (this.isInline)
					return;
				var calendarWidth = this.picker.outerWidth(),
					calendarHeight = this.picker.outerHeight(),
					visualPadding = 10,
					windowWidth = $window.width(),
					windowHeight = $window.height(),
					scrollTop = $window.scrollTop();

				var zIndex = parseInt(this.element.parents().filter(function(){
						return $(this).css('z-index') !== 'auto';
					}).first().css('z-index'))+10;
				var offset = this.component ? this.component.parent().offset() : this.element.offset();
				var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
				var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
				var left = offset.left,
					top = offset.top;

				this.picker.removeClass(
					'datepicker-orient-top datepicker-orient-bottom '+
					'datepicker-orient-right datepicker-orient-left'
				);

				if (this.o.orientation.x !== 'auto'){
					this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
					if (this.o.orientation.x === 'right')
						left -= calendarWidth - width;
				}
				// auto x orientation is best-placement: if it crosses a window
				// edge, fudge it sideways
				else {
					// Default to left
					this.picker.addClass('datepicker-orient-left');
					if (offset.left < 0)
						left -= offset.left - visualPadding;
					else if (offset.left + calendarWidth > windowWidth)
						left = windowWidth - calendarWidth - visualPadding;
				}

				// auto y orientation is best-situation: top or bottom, no fudging,
				// decision based on which shows more of the calendar
				var yorient = this.o.orientation.y,
					top_overflow, bottom_overflow;
				if (yorient === 'auto'){
					top_overflow = -scrollTop + offset.top - calendarHeight;
					bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
					if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
						yorient = 'top';
					else
						yorient = 'bottom';
				}
				this.picker.addClass('datepicker-orient-' + yorient);
				if (yorient === 'top')
					top += height;
				else
					top -= calendarHeight + parseInt(this.picker.css('padding-top'));

				this.picker.css({
					top: top,
					left: left,
					zIndex: zIndex
				});
			},

			_allow_update: true,
			update: function(){
				if (!this._allow_update)
					return;

				var oldDates = this.dates.copy(),
					dates = [],
					fromArgs = false;
				if (arguments.length){
					$.each(arguments, $.proxy(function(i, date){
						if (date instanceof Date)
							date = this._local_to_utc(date);
						dates.push(date);
					}, this));
					fromArgs = true;
				}
				else {
					dates = this.isInput
							? this.element.val()
							: this.element.data('date') || this.element.find('input').val();
					if (dates && this.o.multidate)
						dates = dates.split(this.o.multidateSeparator);
					else
						dates = [dates];
					delete this.element.data().date;
				}

				dates = $.map(dates, $.proxy(function(date){
					return DPGlobal.parseDate(date, this.o.format, this.o.language);
				}, this));
				dates = $.grep(dates, $.proxy(function(date){
					return (
						date < this.o.startDate ||
						date > this.o.endDate ||
						!date
					);
				}, this), true);
				this.dates.replace(dates);

				if (this.dates.length)
					this.viewDate = new Date(this.dates.get(-1));
				else if (this.viewDate < this.o.startDate)
					this.viewDate = new Date(this.o.startDate);
				else if (this.viewDate > this.o.endDate)
					this.viewDate = new Date(this.o.endDate);

				if (fromArgs){
					// setting date by clicking
					this.setValue();
				}
				else if (dates.length){
					// setting date by typing
					if (String(oldDates) !== String(this.dates))
						this._trigger('changeDate');
				}
				if (!this.dates.length && oldDates.length)
					this._trigger('clearDate');

				this.fill();
			},

			fillDow: function(){
				var dowCnt = this.o.weekStart,
					html = '<tr>';
				if (this.o.calendarWeeks){
					var cell = '<th class="cw">&nbsp;</th>';
					html += cell;
					this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
				}
				while (dowCnt < this.o.weekStart + 7){
					html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
				}
				html += '</tr>';
				this.picker.find('.datepicker-days thead').append(html);
			},

			fillMonths: function(){
				var html = '',
				i = 0;
				while (i < 12){
					html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
				}
				this.picker.find('.datepicker-months td').html(html);
			},

			setRange: function(range){
				if (!range || !range.length)
					delete this.range;
				else
					this.range = $.map(range, function(d){
						return d.valueOf();
					});
				this.fill();
			},

			getClassNames: function(date){
				var cls = [],
					year = this.viewDate.getUTCFullYear(),
					month = this.viewDate.getUTCMonth(),
					today = new Date();
				if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
					cls.push('old');
				}
				else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
					cls.push('new');
				}
				if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
					cls.push('focused');
				// Compare internal UTC date with local today, not UTC today
				if (this.o.todayHighlight &&
					date.getUTCFullYear() === today.getFullYear() &&
					date.getUTCMonth() === today.getMonth() &&
					date.getUTCDate() === today.getDate()){
					cls.push('today');
				}
				if (this.dates.contains(date) !== -1)
					cls.push('active');
				if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
					$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
					cls.push('disabled');
				}
				if (this.range){
					if (date > this.range[0] && date < this.range[this.range.length-1]){
						cls.push('range');
					}
					if ($.inArray(date.valueOf(), this.range) !== -1){
						cls.push('selected');
					}
				}
				return cls;
			},

			fill: function(){
				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth(),
					startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
					startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
					endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
					endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
					todaytxt = dates[this.o.language].today || dates['en'].today || '',
					cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
					tooltip;
				this.picker.find('.datepicker-days thead th.datepicker-switch')
							.text(dates[this.o.language].months[month]+' '+year);
				this.picker.find('tfoot th.today')
							.text(todaytxt)
							.toggle(this.o.todayBtn !== false);
				this.picker.find('tfoot th.clear')
							.text(cleartxt)
							.toggle(this.o.clearBtn !== false);
				this.updateNavArrows();
				this.fillMonths();
				var prevMonth = UTCDate(year, month-1, 28),
					day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
				prevMonth.setUTCDate(day);
				prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
				var nextMonth = new Date(prevMonth);
				nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
				nextMonth = nextMonth.valueOf();
				var html = [];
				var clsName;
				while (prevMonth.valueOf() < nextMonth){
					if (prevMonth.getUTCDay() === this.o.weekStart){
						html.push('<tr>');
						if (this.o.calendarWeeks){
							// ISO 8601: First week contains first thursday.
							// ISO also states week starts on Monday, but we can be more abstract here.
							var
								// Start of current week: based on weekstart/current date
								ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
								// Thursday of this week
								th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
								// First Thursday of year, year from thursday
								yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
								// Calendar week: ms between thursdays, div ms per day, div 7 days
								calWeek =  (th - yth) / 864e5 / 7 + 1;
							html.push('<td class="cw">'+ calWeek +'</td>');

						}
					}
					clsName = this.getClassNames(prevMonth);
					clsName.push('day');

					if (this.o.beforeShowDay !== $.noop){
						var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
						if (before === undefined)
							before = {};
						else if (typeof(before) === 'boolean')
							before = {enabled: before};
						else if (typeof(before) === 'string')
							before = {classes: before};
						if (before.enabled === false)
							clsName.push('disabled');
						if (before.classes)
							clsName = clsName.concat(before.classes.split(/\s+/));
						if (before.tooltip)
							tooltip = before.tooltip;
					}

					clsName = $.unique(clsName);
					html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
					if (prevMonth.getUTCDay() === this.o.weekEnd){
						html.push('</tr>');
					}
					prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
				}
				this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

				var months = this.picker.find('.datepicker-months')
							.find('th:eq(1)')
								.text(year)
								.end()
							.find('span').removeClass('active');

				$.each(this.dates, function(i, d){
					if (d.getUTCFullYear() === year)
						months.eq(d.getUTCMonth()).addClass('active');
				});

				if (year < startYear || year > endYear){
					months.addClass('disabled');
				}
				if (year === startYear){
					months.slice(0, startMonth).addClass('disabled');
				}
				if (year === endYear){
					months.slice(endMonth+1).addClass('disabled');
				}

				html = '';
				year = parseInt(year/10, 10) * 10;
				var yearCont = this.picker.find('.datepicker-years')
									.find('th:eq(1)')
										.text(year + '-' + (year + 9))
										.end()
									.find('td');
				year -= 1;
				var years = $.map(this.dates, function(d){
						return d.getUTCFullYear();
					}),
					classes;
				for (var i = -1; i < 11; i++){
					classes = ['year'];
					if (i === -1)
						classes.push('old');
					else if (i === 10)
						classes.push('new');
					if ($.inArray(year, years) !== -1)
						classes.push('active');
					if (year < startYear || year > endYear)
						classes.push('disabled');
					html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
					year += 1;
				}
				yearCont.html(html);
			},

			updateNavArrows: function(){
				if (!this._allow_update)
					return;

				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth();
				switch (this.viewMode){
					case 0:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
							this.picker.find('.prev').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
							this.picker.find('.next').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
					case 1:
					case 2:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
							this.picker.find('.prev').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
							this.picker.find('.next').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
				}
			},

			click: function(e){
				e.preventDefault();
				var target = $(e.target).closest('span, td, th'),
					year, month, day;
				if (target.length === 1){
					switch (target[0].nodeName.toLowerCase()){
						case 'th':
							switch (target[0].className){
								case 'datepicker-switch':
									this.showMode(1);
									break;
								case 'prev':
								case 'next':
									var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
									switch (this.viewMode){
										case 0:
											this.viewDate = this.moveMonth(this.viewDate, dir);
											this._trigger('changeMonth', this.viewDate);
											break;
										case 1:
										case 2:
											this.viewDate = this.moveYear(this.viewDate, dir);
											if (this.viewMode === 1)
												this._trigger('changeYear', this.viewDate);
											break;
									}
									this.fill();
									break;
								case 'today':
									var date = new Date();
									date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

									this.showMode(-2);
									var which = this.o.todayBtn === 'linked' ? null : 'view';
									this._setDate(date, which);
									break;
								case 'clear':
									var element;
									if (this.isInput)
										element = this.element;
									else if (this.component)
										element = this.element.find('input');
									if (element)
										element.val("").change();
									this.update();
									this._trigger('changeDate');
									if (this.o.autoclose)
										this.hide();
									break;
							}
							break;
						case 'span':
							if (!target.is('.disabled')){
								this.viewDate.setUTCDate(1);
								if (target.is('.month')){
									day = 1;
									month = target.parent().find('span').index(target);
									year = this.viewDate.getUTCFullYear();
									this.viewDate.setUTCMonth(month);
									this._trigger('changeMonth', this.viewDate);
									if (this.o.minViewMode === 1){
										this._setDate(UTCDate(year, month, day));
									}
								}
								else {
									day = 1;
									month = 0;
									year = parseInt(target.text(), 10)||0;
									this.viewDate.setUTCFullYear(year);
									this._trigger('changeYear', this.viewDate);
									if (this.o.minViewMode === 2){
										this._setDate(UTCDate(year, month, day));
									}
								}
								this.showMode(-1);
								this.fill();
							}
							break;
						case 'td':
							if (target.is('.day') && !target.is('.disabled')){
								day = parseInt(target.text(), 10)||1;
								year = this.viewDate.getUTCFullYear();
								month = this.viewDate.getUTCMonth();
								if (target.is('.old')){
									if (month === 0){
										month = 11;
										year -= 1;
									}
									else {
										month -= 1;
									}
								}
								else if (target.is('.new')){
									if (month === 11){
										month = 0;
										year += 1;
									}
									else {
										month += 1;
									}
								}
								this._setDate(UTCDate(year, month, day));
							}
							break;
					}
				}
				if (this.picker.is(':visible') && this._focused_from){
					$(this._focused_from).focus();
				}
				delete this._focused_from;
			},

			_toggle_multidate: function(date){
				var ix = this.dates.contains(date);
				if (!date){
					this.dates.clear();
				}
				else if (ix !== -1){
					this.dates.remove(ix);
				}
				else {
					this.dates.push(date);
				}
				if (typeof this.o.multidate === 'number')
					while (this.dates.length > this.o.multidate)
						this.dates.remove(0);
			},

			_setDate: function(date, which){
				if (!which || which === 'date')
					this._toggle_multidate(date && new Date(date));
				if (!which || which  === 'view')
					this.viewDate = date && new Date(date);

				this.fill();
				this.setValue();
				this._trigger('changeDate');
				var element;
				if (this.isInput){
					element = this.element;
				}
				else if (this.component){
					element = this.element.find('input');
				}
				if (element){
					element.change();
				}
				if (this.o.autoclose && (!which || which === 'date')){
					this.hide();
				}
			},

			moveMonth: function(date, dir){
				if (!date)
					return undefined;
				if (!dir)
					return date;
				var new_date = new Date(date.valueOf()),
					day = new_date.getUTCDate(),
					month = new_date.getUTCMonth(),
					mag = Math.abs(dir),
					new_month, test;
				dir = dir > 0 ? 1 : -1;
				if (mag === 1){
					test = dir === -1
						// If going back one month, make sure month is not current month
						// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
						? function(){
							return new_date.getUTCMonth() === month;
						}
						// If going forward one month, make sure month is as expected
						// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
						: function(){
							return new_date.getUTCMonth() !== new_month;
						};
					new_month = month + dir;
					new_date.setUTCMonth(new_month);
					// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
					if (new_month < 0 || new_month > 11)
						new_month = (new_month + 12) % 12;
				}
				else {
					// For magnitudes >1, move one month at a time...
					for (var i=0; i < mag; i++)
						// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
						new_date = this.moveMonth(new_date, dir);
					// ...then reset the day, keeping it in the new month
					new_month = new_date.getUTCMonth();
					new_date.setUTCDate(day);
					test = function(){
						return new_month !== new_date.getUTCMonth();
					};
				}
				// Common date-resetting loop -- if date is beyond end of month, make it
				// end of month
				while (test()){
					new_date.setUTCDate(--day);
					new_date.setUTCMonth(new_month);
				}
				return new_date;
			},

			moveYear: function(date, dir){
				return this.moveMonth(date, dir*12);
			},

			dateWithinRange: function(date){
				return date >= this.o.startDate && date <= this.o.endDate;
			},

			keydown: function(e){
				if (this.picker.is(':not(:visible)')){
					if (e.keyCode === 27) // allow escape to hide and re-show picker
						this.show();
					return;
				}
				var dateChanged = false,
					dir, newDate, newViewDate,
					focusDate = this.focusDate || this.viewDate;
				switch (e.keyCode){
					case 27: // escape
						if (this.focusDate){
							this.focusDate = null;
							this.viewDate = this.dates.get(-1) || this.viewDate;
							this.fill();
						}
						else
							this.hide();
						e.preventDefault();
						break;
					case 37: // left
					case 39: // right
						if (!this.o.keyboardNavigation)
							break;
						dir = e.keyCode === 37 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveYear(focusDate, dir);
							this._trigger('changeYear', this.viewDate);
						}
						else if (e.shiftKey){
							newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveMonth(focusDate, dir);
							this._trigger('changeMonth', this.viewDate);
						}
						else {
							newDate = new Date(this.dates.get(-1) || UTCToday());
							newDate.setUTCDate(newDate.getUTCDate() + dir);
							newViewDate = new Date(focusDate);
							newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
						}
						if (this.dateWithinRange(newDate)){
							this.focusDate = this.viewDate = newViewDate;
							this.setValue();
							this.fill();
							e.preventDefault();
						}
						break;
					case 38: // up
					case 40: // down
						if (!this.o.keyboardNavigation)
							break;
						dir = e.keyCode === 38 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveYear(focusDate, dir);
							this._trigger('changeYear', this.viewDate);
						}
						else if (e.shiftKey){
							newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveMonth(focusDate, dir);
							this._trigger('changeMonth', this.viewDate);
						}
						else {
							newDate = new Date(this.dates.get(-1) || UTCToday());
							newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
							newViewDate = new Date(focusDate);
							newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
						}
						if (this.dateWithinRange(newDate)){
							this.focusDate = this.viewDate = newViewDate;
							this.setValue();
							this.fill();
							e.preventDefault();
						}
						break;
					case 32: // spacebar
						// Spacebar is used in manually typing dates in some formats.
						// As such, its behavior should not be hijacked.
						break;
					case 13: // enter
						focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
						this._toggle_multidate(focusDate);
						dateChanged = true;
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.setValue();
						this.fill();
						if (this.picker.is(':visible')){
							e.preventDefault();
							if (this.o.autoclose)
								this.hide();
						}
						break;
					case 9: // tab
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
						this.hide();
						break;
				}
				if (dateChanged){
					if (this.dates.length)
						this._trigger('changeDate');
					else
						this._trigger('clearDate');
					var element;
					if (this.isInput){
						element = this.element;
					}
					else if (this.component){
						element = this.element.find('input');
					}
					if (element){
						element.change();
					}
				}
			},

			showMode: function(dir){
				if (dir){
					this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
				}
				this.picker
					.find('>div')
					.hide()
					.filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
						.css('display', 'block');
				this.updateNavArrows();
			}
		};

		var DateRangePicker = function(element, options){
			this.element = $(element);
			this.inputs = $.map(options.inputs, function(i){
				return i.jquery ? i[0] : i;
			});
			delete options.inputs;

			$(this.inputs)
				.datepicker(options)
				.bind('changeDate', $.proxy(this.dateUpdated, this));

			this.pickers = $.map(this.inputs, function(i){
				return $(i).data('datepicker');
			});
			this.updateDates();
		};
		DateRangePicker.prototype = {
			updateDates: function(){
				this.dates = $.map(this.pickers, function(i){
					return i.getUTCDate();
				});
				this.updateRanges();
			},
			updateRanges: function(){
				var range = $.map(this.dates, function(d){
					return d.valueOf();
				});
				$.each(this.pickers, function(i, p){
					p.setRange(range);
				});
			},
			dateUpdated: function(e){
				// `this.updating` is a workaround for preventing infinite recursion
				// between `changeDate` triggering and `setUTCDate` calling.  Until
				// there is a better mechanism.
				if (this.updating)
					return;
				this.updating = true;

				var dp = $(e.target).data('datepicker'),
					new_date = dp.getUTCDate(),
					i = $.inArray(e.target, this.inputs),
					l = this.inputs.length;
				if (i === -1)
					return;

				$.each(this.pickers, function(i, p){
					if (!p.getUTCDate())
						p.setUTCDate(new_date);
				});

				if (new_date < this.dates[i]){
					// Date being moved earlier/left
					while (i >= 0 && new_date < this.dates[i]){
						this.pickers[i--].setUTCDate(new_date);
					}
				}
				else if (new_date > this.dates[i]){
					// Date being moved later/right
					while (i < l && new_date > this.dates[i]){
						this.pickers[i++].setUTCDate(new_date);
					}
				}
				this.updateDates();

				delete this.updating;
			},
			remove: function(){
				$.map(this.pickers, function(p){ p.remove(); });
				delete this.element.data().datepicker;
			}
		};

		function opts_from_el(el, prefix){
			// Derive options from element data-attrs
			var data = $(el).data(),
				out = {}, inkey,
				replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
			prefix = new RegExp('^' + prefix.toLowerCase());
			function re_lower(_,a){
				return a.toLowerCase();
			}
			for (var key in data)
				if (prefix.test(key)){
					inkey = key.replace(replace, re_lower);
					out[inkey] = data[key];
				}
			return out;
		}

		function opts_from_locale(lang){
			// Derive options from locale plugins
			var out = {};
			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					return;
			}
			var d = dates[lang];
			$.each(locale_opts, function(i,k){
				if (k in d)
					out[k] = d[k];
			});
			return out;
		}

		var old = $.fn.datepicker;
		$.fn.datepicker = function(option){
			var args = Array.apply(null, arguments);
			args.shift();
			var internal_return;
			this.each(function(){
				var $this = $(this),
					data = $this.data('datepicker'),
					options = typeof option === 'object' && option;
				if (!data){
					var elopts = opts_from_el(this, 'date'),
						// Preliminary otions
						xopts = $.extend({}, defaults, elopts, options),
						locopts = opts_from_locale(xopts.language),
						// Options priority: js args, data-attrs, locales, defaults
						opts = $.extend({}, defaults, locopts, elopts, options);
					if ($this.is('.input-daterange') || opts.inputs){
						var ropts = {
							inputs: opts.inputs || $this.find('input').toArray()
						};
						$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
					}
					else {
						$this.data('datepicker', (data = new Datepicker(this, opts)));
					}
				}
				if (typeof option === 'string' && typeof data[option] === 'function'){
					internal_return = data[option].apply(data, args);
					if (internal_return !== undefined)
						return false;
				}
			});
			if (internal_return !== undefined)
				return internal_return;
			else
				return this;
		};

		var defaults = $.fn.datepicker.defaults = {
			autoclose: false,
			beforeShowDay: $.noop,
			calendarWeeks: false,
			clearBtn: false,
			daysOfWeekDisabled: [],
			endDate: Infinity,
			forceParse: true,
			format: 'mm/dd/yyyy',
			keyboardNavigation: true,
			language: 'en',
			minViewMode: 0,
			multidate: false,
			multidateSeparator: ',',
			orientation: "auto",
			rtl: false,
			startDate: -Infinity,
			startView: 0,
			todayBtn: false,
			todayHighlight: false,
			weekStart: 0
		};
		var locale_opts = $.fn.datepicker.locale_opts = [
			'format',
			'rtl',
			'weekStart'
		];
		$.fn.datepicker.Constructor = Datepicker;
		var dates = $.fn.datepicker.dates = {
			en: {
				days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				today: "Today",
				clear: "Clear"
			}
		};

		var DPGlobal = {
			modes: [
				{
					clsName: 'days',
					navFnc: 'Month',
					navStep: 1
				},
				{
					clsName: 'months',
					navFnc: 'FullYear',
					navStep: 1
				},
				{
					clsName: 'years',
					navFnc: 'FullYear',
					navStep: 10
			}],
			isLeapYear: function(year){
				return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
			},
			getDaysInMonth: function(year, month){
				return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
			},
			validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
			nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
			parseFormat: function(format){
				// IE treats \0 as a string end in inputs (truncating the value),
				// so it's a bad format delimiter, anyway
				var separators = format.replace(this.validParts, '\0').split('\0'),
					parts = format.match(this.validParts);
				if (!separators || !separators.length || !parts || parts.length === 0){
					throw new Error("Invalid date format.");
				}
				return {separators: separators, parts: parts};
			},
			parseDate: function(date, format, language){
				if (!date)
					return undefined;
				if (date instanceof Date)
					return date;
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				var part_re = /([\-+]\d+)([dmwy])/,
					parts = date.match(/([\-+]\d+)([dmwy])/g),
					part, dir, i;
				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
					date = new Date();
					for (i=0; i < parts.length; i++){
						part = part_re.exec(parts[i]);
						dir = parseInt(part[1]);
						switch (part[2]){
							case 'd':
								date.setUTCDate(date.getUTCDate() + dir);
								break;
							case 'm':
								date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
								break;
							case 'w':
								date.setUTCDate(date.getUTCDate() + dir * 7);
								break;
							case 'y':
								date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
								break;
						}
					}
					return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
				}
				parts = date && date.match(this.nonpunctuation) || [];
				date = new Date();
				var parsed = {},
					setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
					setters_map = {
						yyyy: function(d,v){
							return d.setUTCFullYear(v);
						},
						yy: function(d,v){
							return d.setUTCFullYear(2000+v);
						},
						m: function(d,v){
							if (isNaN(d))
								return d;
							v -= 1;
							while (v < 0) v += 12;
							v %= 12;
							d.setUTCMonth(v);
							while (d.getUTCMonth() !== v)
								d.setUTCDate(d.getUTCDate()-1);
							return d;
						},
						d: function(d,v){
							return d.setUTCDate(v);
						}
					},
					val, filtered;
				setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
				setters_map['dd'] = setters_map['d'];
				date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
				var fparts = format.parts.slice();
				// Remove noop parts
				if (parts.length !== fparts.length){
					fparts = $(fparts).filter(function(i,p){
						return $.inArray(p, setters_order) !== -1;
					}).toArray();
				}
				// Process remainder
				function match_part(){
					var m = this.slice(0, parts[i].length),
						p = parts[i].slice(0, m.length);
					return m === p;
				}
				if (parts.length === fparts.length){
					var cnt;
					for (i=0, cnt = fparts.length; i < cnt; i++){
						val = parseInt(parts[i], 10);
						part = fparts[i];
						if (isNaN(val)){
							switch (part){
								case 'MM':
									filtered = $(dates[language].months).filter(match_part);
									val = $.inArray(filtered[0], dates[language].months) + 1;
									break;
								case 'M':
									filtered = $(dates[language].monthsShort).filter(match_part);
									val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
									break;
							}
						}
						parsed[part] = val;
					}
					var _date, s;
					for (i=0; i < setters_order.length; i++){
						s = setters_order[i];
						if (s in parsed && !isNaN(parsed[s])){
							_date = new Date(date);
							setters_map[s](_date, parsed[s]);
							if (!isNaN(_date))
								date = _date;
						}
					}
				}
				return date;
			},
			formatDate: function(date, format, language){
				if (!date)
					return '';
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				var val = {
					d: date.getUTCDate(),
					D: dates[language].daysShort[date.getUTCDay()],
					DD: dates[language].days[date.getUTCDay()],
					m: date.getUTCMonth() + 1,
					M: dates[language].monthsShort[date.getUTCMonth()],
					MM: dates[language].months[date.getUTCMonth()],
					yy: date.getUTCFullYear().toString().substring(2),
					yyyy: date.getUTCFullYear()
				};
				val.dd = (val.d < 10 ? '0' : '') + val.d;
				val.mm = (val.m < 10 ? '0' : '') + val.m;
				date = [];
				var seps = $.extend([], format.separators);
				for (var i=0, cnt = format.parts.length; i <= cnt; i++){
					if (seps.length)
						date.push(seps.shift());
					date.push(val[format.parts[i]]);
				}
				return date.join('');
			},
			headTemplate: '<thead>'+
								'<tr>'+
									'<th class="prev"><i class="fa fa-angle-left"></i></th>'+
									'<th colspan="5" class="datepicker-switch"></th>'+
									'<th class="next"><i class="fa fa-angle-right"></i></th>'+
								'</tr>'+
							'</thead>',
			contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
			footTemplate: '<tfoot>'+
								'<tr>'+
									'<th colspan="7" class="today"></th>'+
								'</tr>'+
								'<tr>'+
									'<th colspan="7" class="clear"></th>'+
								'</tr>'+
							'</tfoot>'
		};
		DPGlobal.template = '<div class="datepicker">'+
								'<div class="datepicker-days">'+
									'<table class=" table-condensed">'+
										DPGlobal.headTemplate+
										'<tbody></tbody>'+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-months">'+
									'<table class="table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-years">'+
									'<table class="table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
							'</div>';

		$.fn.datepicker.DPGlobal = DPGlobal;


		/* DATEPICKER NO CONFLICT
		* =================== */

		$.fn.datepicker.noConflict = function(){
			$.fn.datepicker = old;
			return this;
		};


		/* DATEPICKER DATA-API
		* ================== */

		$(document).on(
			'focus.datepicker.data-api click.datepicker.data-api',
			'[data-provide="datepicker"]',
			function(e){
				var $this = $(this);
				if ($this.data('datepicker'))
					return;
				e.preventDefault();
				// component click requires us to explicitly show it
				$this.datepicker('show');
			}
		);
		$(function(){
			$('[data-provide="datepicker-inline"]').datepicker();
		});

	}(window.jQuery));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./datepicker3.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./datepicker3.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, "/*!\n * Datepicker for Bootstrap\n *\n * Copyright 2012 Stefan Petre\n * Improvements by Andrew Rowls\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n */\n.datepicker {\n  padding: 4px;\n  border-radius: 4px;\n  direction: ltr;\n  /*.dow {\n\t\tborder-top: 1px solid #ddd !important;\n\t}*/\n}\n.datepicker-inline {\n  width: 220px;\n}\n.datepicker.datepicker-rtl {\n  direction: rtl;\n}\n.datepicker.datepicker-rtl table tr td span {\n  float: right;\n}\n.datepicker-dropdown {\n  top: 0;\n  left: 0;\n}\n.datepicker-dropdown:before {\n  content: '';\n  display: inline-block;\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  border-bottom: 7px solid #ccc;\n  border-top: 0;\n  border-bottom-color: rgba(0, 0, 0, 0.2);\n  position: absolute;\n}\n.datepicker-dropdown:after {\n  content: '';\n  display: inline-block;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid #fff;\n  border-top: 0;\n  position: absolute;\n}\n.datepicker-dropdown.datepicker-orient-left:before {\n  left: 6px;\n}\n.datepicker-dropdown.datepicker-orient-left:after {\n  left: 7px;\n}\n.datepicker-dropdown.datepicker-orient-right:before {\n  right: 6px;\n}\n.datepicker-dropdown.datepicker-orient-right:after {\n  right: 7px;\n}\n.datepicker-dropdown.datepicker-orient-top:before {\n  top: -7px;\n}\n.datepicker-dropdown.datepicker-orient-top:after {\n  top: -6px;\n}\n.datepicker-dropdown.datepicker-orient-bottom:before {\n  bottom: -7px;\n  border-bottom: 0;\n  border-top: 7px solid #999;\n}\n.datepicker-dropdown.datepicker-orient-bottom:after {\n  bottom: -6px;\n  border-bottom: 0;\n  border-top: 6px solid #fff;\n}\n.datepicker > div {\n  display: none;\n}\n.datepicker.days div.datepicker-days {\n  display: block;\n}\n.datepicker.months div.datepicker-months {\n  display: block;\n}\n.datepicker.years div.datepicker-years {\n  display: block;\n}\n.datepicker table {\n  margin: 0;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.datepicker table tr td,\n.datepicker table tr th {\n  text-align: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 4px;\n  border: none;\n}\n.table-striped .datepicker table tr td,\n.table-striped .datepicker table tr th {\n  background-color: transparent;\n}\n.datepicker table tr td.day:hover,\n.datepicker table tr td.day.focused {\n  background: #eeeeee;\n  cursor: pointer;\n}\n.datepicker table tr td.old,\n.datepicker table tr td.new {\n  color: #999999;\n}\n.datepicker table tr td.disabled,\n.datepicker table tr td.disabled:hover {\n  background: none;\n  color: #999999;\n  cursor: default;\n}\n.datepicker table tr td.today,\n.datepicker table tr td.today:hover,\n.datepicker table tr td.today.disabled,\n.datepicker table tr td.today.disabled:hover {\n  color: #000000;\n  background-color: #ffdb99;\n  border-color: #ffb733;\n}\n.datepicker table tr td.today:hover,\n.datepicker table tr td.today:hover:hover,\n.datepicker table tr td.today.disabled:hover,\n.datepicker table tr td.today.disabled:hover:hover,\n.datepicker table tr td.today:focus,\n.datepicker table tr td.today:hover:focus,\n.datepicker table tr td.today.disabled:focus,\n.datepicker table tr td.today.disabled:hover:focus,\n.datepicker table tr td.today:active,\n.datepicker table tr td.today:hover:active,\n.datepicker table tr td.today.disabled:active,\n.datepicker table tr td.today.disabled:hover:active,\n.datepicker table tr td.today.active,\n.datepicker table tr td.today:hover.active,\n.datepicker table tr td.today.disabled.active,\n.datepicker table tr td.today.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.today,\n.open .dropdown-toggle.datepicker table tr td.today:hover,\n.open .dropdown-toggle.datepicker table tr td.today.disabled,\n.open .dropdown-toggle.datepicker table tr td.today.disabled:hover {\n  color: #000000;\n  background-color: #ffcd70;\n  border-color: #f59e00;\n}\n.datepicker table tr td.today:active,\n.datepicker table tr td.today:hover:active,\n.datepicker table tr td.today.disabled:active,\n.datepicker table tr td.today.disabled:hover:active,\n.datepicker table tr td.today.active,\n.datepicker table tr td.today:hover.active,\n.datepicker table tr td.today.disabled.active,\n.datepicker table tr td.today.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.today,\n.open .dropdown-toggle.datepicker table tr td.today:hover,\n.open .dropdown-toggle.datepicker table tr td.today.disabled,\n.open .dropdown-toggle.datepicker table tr td.today.disabled:hover {\n  background-image: none;\n}\n.datepicker table tr td.today.disabled,\n.datepicker table tr td.today:hover.disabled,\n.datepicker table tr td.today.disabled.disabled,\n.datepicker table tr td.today.disabled:hover.disabled,\n.datepicker table tr td.today[disabled],\n.datepicker table tr td.today:hover[disabled],\n.datepicker table tr td.today.disabled[disabled],\n.datepicker table tr td.today.disabled:hover[disabled],\nfieldset[disabled] .datepicker table tr td.today,\nfieldset[disabled] .datepicker table tr td.today:hover,\nfieldset[disabled] .datepicker table tr td.today.disabled,\nfieldset[disabled] .datepicker table tr td.today.disabled:hover,\n.datepicker table tr td.today.disabled:hover,\n.datepicker table tr td.today:hover.disabled:hover,\n.datepicker table tr td.today.disabled.disabled:hover,\n.datepicker table tr td.today.disabled:hover.disabled:hover,\n.datepicker table tr td.today[disabled]:hover,\n.datepicker table tr td.today:hover[disabled]:hover,\n.datepicker table tr td.today.disabled[disabled]:hover,\n.datepicker table tr td.today.disabled:hover[disabled]:hover,\nfieldset[disabled] .datepicker table tr td.today:hover,\nfieldset[disabled] .datepicker table tr td.today:hover:hover,\nfieldset[disabled] .datepicker table tr td.today.disabled:hover,\nfieldset[disabled] .datepicker table tr td.today.disabled:hover:hover,\n.datepicker table tr td.today.disabled:focus,\n.datepicker table tr td.today:hover.disabled:focus,\n.datepicker table tr td.today.disabled.disabled:focus,\n.datepicker table tr td.today.disabled:hover.disabled:focus,\n.datepicker table tr td.today[disabled]:focus,\n.datepicker table tr td.today:hover[disabled]:focus,\n.datepicker table tr td.today.disabled[disabled]:focus,\n.datepicker table tr td.today.disabled:hover[disabled]:focus,\nfieldset[disabled] .datepicker table tr td.today:focus,\nfieldset[disabled] .datepicker table tr td.today:hover:focus,\nfieldset[disabled] .datepicker table tr td.today.disabled:focus,\nfieldset[disabled] .datepicker table tr td.today.disabled:hover:focus,\n.datepicker table tr td.today.disabled:active,\n.datepicker table tr td.today:hover.disabled:active,\n.datepicker table tr td.today.disabled.disabled:active,\n.datepicker table tr td.today.disabled:hover.disabled:active,\n.datepicker table tr td.today[disabled]:active,\n.datepicker table tr td.today:hover[disabled]:active,\n.datepicker table tr td.today.disabled[disabled]:active,\n.datepicker table tr td.today.disabled:hover[disabled]:active,\nfieldset[disabled] .datepicker table tr td.today:active,\nfieldset[disabled] .datepicker table tr td.today:hover:active,\nfieldset[disabled] .datepicker table tr td.today.disabled:active,\nfieldset[disabled] .datepicker table tr td.today.disabled:hover:active,\n.datepicker table tr td.today.disabled.active,\n.datepicker table tr td.today:hover.disabled.active,\n.datepicker table tr td.today.disabled.disabled.active,\n.datepicker table tr td.today.disabled:hover.disabled.active,\n.datepicker table tr td.today[disabled].active,\n.datepicker table tr td.today:hover[disabled].active,\n.datepicker table tr td.today.disabled[disabled].active,\n.datepicker table tr td.today.disabled:hover[disabled].active,\nfieldset[disabled] .datepicker table tr td.today.active,\nfieldset[disabled] .datepicker table tr td.today:hover.active,\nfieldset[disabled] .datepicker table tr td.today.disabled.active,\nfieldset[disabled] .datepicker table tr td.today.disabled:hover.active {\n  background-color: #ffdb99;\n  border-color: #ffb733;\n}\n.datepicker table tr td.today:hover:hover {\n  color: #000;\n}\n.datepicker table tr td.today.active:hover {\n  color: #fff;\n}\n.datepicker table tr td.range,\n.datepicker table tr td.range:hover,\n.datepicker table tr td.range.disabled,\n.datepicker table tr td.range.disabled:hover {\n  background: #eeeeee;\n  border-radius: 0;\n}\n.datepicker table tr td.range.today,\n.datepicker table tr td.range.today:hover,\n.datepicker table tr td.range.today.disabled,\n.datepicker table tr td.range.today.disabled:hover {\n  color: #000000;\n  background-color: #f7ca77;\n  border-color: #f1a417;\n  border-radius: 0;\n}\n.datepicker table tr td.range.today:hover,\n.datepicker table tr td.range.today:hover:hover,\n.datepicker table tr td.range.today.disabled:hover,\n.datepicker table tr td.range.today.disabled:hover:hover,\n.datepicker table tr td.range.today:focus,\n.datepicker table tr td.range.today:hover:focus,\n.datepicker table tr td.range.today.disabled:focus,\n.datepicker table tr td.range.today.disabled:hover:focus,\n.datepicker table tr td.range.today:active,\n.datepicker table tr td.range.today:hover:active,\n.datepicker table tr td.range.today.disabled:active,\n.datepicker table tr td.range.today.disabled:hover:active,\n.datepicker table tr td.range.today.active,\n.datepicker table tr td.range.today:hover.active,\n.datepicker table tr td.range.today.disabled.active,\n.datepicker table tr td.range.today.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.range.today,\n.open .dropdown-toggle.datepicker table tr td.range.today:hover,\n.open .dropdown-toggle.datepicker table tr td.range.today.disabled,\n.open .dropdown-toggle.datepicker table tr td.range.today.disabled:hover {\n  color: #000000;\n  background-color: #f4bb51;\n  border-color: #bf800c;\n}\n.datepicker table tr td.range.today:active,\n.datepicker table tr td.range.today:hover:active,\n.datepicker table tr td.range.today.disabled:active,\n.datepicker table tr td.range.today.disabled:hover:active,\n.datepicker table tr td.range.today.active,\n.datepicker table tr td.range.today:hover.active,\n.datepicker table tr td.range.today.disabled.active,\n.datepicker table tr td.range.today.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.range.today,\n.open .dropdown-toggle.datepicker table tr td.range.today:hover,\n.open .dropdown-toggle.datepicker table tr td.range.today.disabled,\n.open .dropdown-toggle.datepicker table tr td.range.today.disabled:hover {\n  background-image: none;\n}\n.datepicker table tr td.range.today.disabled,\n.datepicker table tr td.range.today:hover.disabled,\n.datepicker table tr td.range.today.disabled.disabled,\n.datepicker table tr td.range.today.disabled:hover.disabled,\n.datepicker table tr td.range.today[disabled],\n.datepicker table tr td.range.today:hover[disabled],\n.datepicker table tr td.range.today.disabled[disabled],\n.datepicker table tr td.range.today.disabled:hover[disabled],\nfieldset[disabled] .datepicker table tr td.range.today,\nfieldset[disabled] .datepicker table tr td.range.today:hover,\nfieldset[disabled] .datepicker table tr td.range.today.disabled,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:hover,\n.datepicker table tr td.range.today.disabled:hover,\n.datepicker table tr td.range.today:hover.disabled:hover,\n.datepicker table tr td.range.today.disabled.disabled:hover,\n.datepicker table tr td.range.today.disabled:hover.disabled:hover,\n.datepicker table tr td.range.today[disabled]:hover,\n.datepicker table tr td.range.today:hover[disabled]:hover,\n.datepicker table tr td.range.today.disabled[disabled]:hover,\n.datepicker table tr td.range.today.disabled:hover[disabled]:hover,\nfieldset[disabled] .datepicker table tr td.range.today:hover,\nfieldset[disabled] .datepicker table tr td.range.today:hover:hover,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:hover,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:hover:hover,\n.datepicker table tr td.range.today.disabled:focus,\n.datepicker table tr td.range.today:hover.disabled:focus,\n.datepicker table tr td.range.today.disabled.disabled:focus,\n.datepicker table tr td.range.today.disabled:hover.disabled:focus,\n.datepicker table tr td.range.today[disabled]:focus,\n.datepicker table tr td.range.today:hover[disabled]:focus,\n.datepicker table tr td.range.today.disabled[disabled]:focus,\n.datepicker table tr td.range.today.disabled:hover[disabled]:focus,\nfieldset[disabled] .datepicker table tr td.range.today:focus,\nfieldset[disabled] .datepicker table tr td.range.today:hover:focus,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:focus,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:hover:focus,\n.datepicker table tr td.range.today.disabled:active,\n.datepicker table tr td.range.today:hover.disabled:active,\n.datepicker table tr td.range.today.disabled.disabled:active,\n.datepicker table tr td.range.today.disabled:hover.disabled:active,\n.datepicker table tr td.range.today[disabled]:active,\n.datepicker table tr td.range.today:hover[disabled]:active,\n.datepicker table tr td.range.today.disabled[disabled]:active,\n.datepicker table tr td.range.today.disabled:hover[disabled]:active,\nfieldset[disabled] .datepicker table tr td.range.today:active,\nfieldset[disabled] .datepicker table tr td.range.today:hover:active,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:active,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:hover:active,\n.datepicker table tr td.range.today.disabled.active,\n.datepicker table tr td.range.today:hover.disabled.active,\n.datepicker table tr td.range.today.disabled.disabled.active,\n.datepicker table tr td.range.today.disabled:hover.disabled.active,\n.datepicker table tr td.range.today[disabled].active,\n.datepicker table tr td.range.today:hover[disabled].active,\n.datepicker table tr td.range.today.disabled[disabled].active,\n.datepicker table tr td.range.today.disabled:hover[disabled].active,\nfieldset[disabled] .datepicker table tr td.range.today.active,\nfieldset[disabled] .datepicker table tr td.range.today:hover.active,\nfieldset[disabled] .datepicker table tr td.range.today.disabled.active,\nfieldset[disabled] .datepicker table tr td.range.today.disabled:hover.active {\n  background-color: #f7ca77;\n  border-color: #f1a417;\n}\n.datepicker table tr td.selected,\n.datepicker table tr td.selected:hover,\n.datepicker table tr td.selected.disabled,\n.datepicker table tr td.selected.disabled:hover {\n  color: #ffffff;\n  background-color: #999999;\n  border-color: #555555;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\n.datepicker table tr td.selected:hover,\n.datepicker table tr td.selected:hover:hover,\n.datepicker table tr td.selected.disabled:hover,\n.datepicker table tr td.selected.disabled:hover:hover,\n.datepicker table tr td.selected:focus,\n.datepicker table tr td.selected:hover:focus,\n.datepicker table tr td.selected.disabled:focus,\n.datepicker table tr td.selected.disabled:hover:focus,\n.datepicker table tr td.selected:active,\n.datepicker table tr td.selected:hover:active,\n.datepicker table tr td.selected.disabled:active,\n.datepicker table tr td.selected.disabled:hover:active,\n.datepicker table tr td.selected.active,\n.datepicker table tr td.selected:hover.active,\n.datepicker table tr td.selected.disabled.active,\n.datepicker table tr td.selected.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.selected,\n.open .dropdown-toggle.datepicker table tr td.selected:hover,\n.open .dropdown-toggle.datepicker table tr td.selected.disabled,\n.open .dropdown-toggle.datepicker table tr td.selected.disabled:hover {\n  color: #ffffff;\n  background-color: #858585;\n  border-color: #373737;\n}\n.datepicker table tr td.selected:active,\n.datepicker table tr td.selected:hover:active,\n.datepicker table tr td.selected.disabled:active,\n.datepicker table tr td.selected.disabled:hover:active,\n.datepicker table tr td.selected.active,\n.datepicker table tr td.selected:hover.active,\n.datepicker table tr td.selected.disabled.active,\n.datepicker table tr td.selected.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.selected,\n.open .dropdown-toggle.datepicker table tr td.selected:hover,\n.open .dropdown-toggle.datepicker table tr td.selected.disabled,\n.open .dropdown-toggle.datepicker table tr td.selected.disabled:hover {\n  background-image: none;\n}\n.datepicker table tr td.selected.disabled,\n.datepicker table tr td.selected:hover.disabled,\n.datepicker table tr td.selected.disabled.disabled,\n.datepicker table tr td.selected.disabled:hover.disabled,\n.datepicker table tr td.selected[disabled],\n.datepicker table tr td.selected:hover[disabled],\n.datepicker table tr td.selected.disabled[disabled],\n.datepicker table tr td.selected.disabled:hover[disabled],\nfieldset[disabled] .datepicker table tr td.selected,\nfieldset[disabled] .datepicker table tr td.selected:hover,\nfieldset[disabled] .datepicker table tr td.selected.disabled,\nfieldset[disabled] .datepicker table tr td.selected.disabled:hover,\n.datepicker table tr td.selected.disabled:hover,\n.datepicker table tr td.selected:hover.disabled:hover,\n.datepicker table tr td.selected.disabled.disabled:hover,\n.datepicker table tr td.selected.disabled:hover.disabled:hover,\n.datepicker table tr td.selected[disabled]:hover,\n.datepicker table tr td.selected:hover[disabled]:hover,\n.datepicker table tr td.selected.disabled[disabled]:hover,\n.datepicker table tr td.selected.disabled:hover[disabled]:hover,\nfieldset[disabled] .datepicker table tr td.selected:hover,\nfieldset[disabled] .datepicker table tr td.selected:hover:hover,\nfieldset[disabled] .datepicker table tr td.selected.disabled:hover,\nfieldset[disabled] .datepicker table tr td.selected.disabled:hover:hover,\n.datepicker table tr td.selected.disabled:focus,\n.datepicker table tr td.selected:hover.disabled:focus,\n.datepicker table tr td.selected.disabled.disabled:focus,\n.datepicker table tr td.selected.disabled:hover.disabled:focus,\n.datepicker table tr td.selected[disabled]:focus,\n.datepicker table tr td.selected:hover[disabled]:focus,\n.datepicker table tr td.selected.disabled[disabled]:focus,\n.datepicker table tr td.selected.disabled:hover[disabled]:focus,\nfieldset[disabled] .datepicker table tr td.selected:focus,\nfieldset[disabled] .datepicker table tr td.selected:hover:focus,\nfieldset[disabled] .datepicker table tr td.selected.disabled:focus,\nfieldset[disabled] .datepicker table tr td.selected.disabled:hover:focus,\n.datepicker table tr td.selected.disabled:active,\n.datepicker table tr td.selected:hover.disabled:active,\n.datepicker table tr td.selected.disabled.disabled:active,\n.datepicker table tr td.selected.disabled:hover.disabled:active,\n.datepicker table tr td.selected[disabled]:active,\n.datepicker table tr td.selected:hover[disabled]:active,\n.datepicker table tr td.selected.disabled[disabled]:active,\n.datepicker table tr td.selected.disabled:hover[disabled]:active,\nfieldset[disabled] .datepicker table tr td.selected:active,\nfieldset[disabled] .datepicker table tr td.selected:hover:active,\nfieldset[disabled] .datepicker table tr td.selected.disabled:active,\nfieldset[disabled] .datepicker table tr td.selected.disabled:hover:active,\n.datepicker table tr td.selected.disabled.active,\n.datepicker table tr td.selected:hover.disabled.active,\n.datepicker table tr td.selected.disabled.disabled.active,\n.datepicker table tr td.selected.disabled:hover.disabled.active,\n.datepicker table tr td.selected[disabled].active,\n.datepicker table tr td.selected:hover[disabled].active,\n.datepicker table tr td.selected.disabled[disabled].active,\n.datepicker table tr td.selected.disabled:hover[disabled].active,\nfieldset[disabled] .datepicker table tr td.selected.active,\nfieldset[disabled] .datepicker table tr td.selected:hover.active,\nfieldset[disabled] .datepicker table tr td.selected.disabled.active,\nfieldset[disabled] .datepicker table tr td.selected.disabled:hover.active {\n  background-color: #999999;\n  border-color: #555555;\n}\n.datepicker table tr td.active,\n.datepicker table tr td.active:hover,\n.datepicker table tr td.active.disabled,\n.datepicker table tr td.active.disabled:hover {\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #357ebd;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\n.datepicker table tr td.active:hover,\n.datepicker table tr td.active:hover:hover,\n.datepicker table tr td.active.disabled:hover,\n.datepicker table tr td.active.disabled:hover:hover,\n.datepicker table tr td.active:focus,\n.datepicker table tr td.active:hover:focus,\n.datepicker table tr td.active.disabled:focus,\n.datepicker table tr td.active.disabled:hover:focus,\n.datepicker table tr td.active:active,\n.datepicker table tr td.active:hover:active,\n.datepicker table tr td.active.disabled:active,\n.datepicker table tr td.active.disabled:hover:active,\n.datepicker table tr td.active.active,\n.datepicker table tr td.active:hover.active,\n.datepicker table tr td.active.disabled.active,\n.datepicker table tr td.active.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.active,\n.open .dropdown-toggle.datepicker table tr td.active:hover,\n.open .dropdown-toggle.datepicker table tr td.active.disabled,\n.open .dropdown-toggle.datepicker table tr td.active.disabled:hover {\n  color: #ffffff;\n  background-color: #3276b1;\n  border-color: #285e8e;\n}\n.datepicker table tr td.active:active,\n.datepicker table tr td.active:hover:active,\n.datepicker table tr td.active.disabled:active,\n.datepicker table tr td.active.disabled:hover:active,\n.datepicker table tr td.active.active,\n.datepicker table tr td.active:hover.active,\n.datepicker table tr td.active.disabled.active,\n.datepicker table tr td.active.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td.active,\n.open .dropdown-toggle.datepicker table tr td.active:hover,\n.open .dropdown-toggle.datepicker table tr td.active.disabled,\n.open .dropdown-toggle.datepicker table tr td.active.disabled:hover {\n  background-image: none;\n}\n.datepicker table tr td.active.disabled,\n.datepicker table tr td.active:hover.disabled,\n.datepicker table tr td.active.disabled.disabled,\n.datepicker table tr td.active.disabled:hover.disabled,\n.datepicker table tr td.active[disabled],\n.datepicker table tr td.active:hover[disabled],\n.datepicker table tr td.active.disabled[disabled],\n.datepicker table tr td.active.disabled:hover[disabled],\nfieldset[disabled] .datepicker table tr td.active,\nfieldset[disabled] .datepicker table tr td.active:hover,\nfieldset[disabled] .datepicker table tr td.active.disabled,\nfieldset[disabled] .datepicker table tr td.active.disabled:hover,\n.datepicker table tr td.active.disabled:hover,\n.datepicker table tr td.active:hover.disabled:hover,\n.datepicker table tr td.active.disabled.disabled:hover,\n.datepicker table tr td.active.disabled:hover.disabled:hover,\n.datepicker table tr td.active[disabled]:hover,\n.datepicker table tr td.active:hover[disabled]:hover,\n.datepicker table tr td.active.disabled[disabled]:hover,\n.datepicker table tr td.active.disabled:hover[disabled]:hover,\nfieldset[disabled] .datepicker table tr td.active:hover,\nfieldset[disabled] .datepicker table tr td.active:hover:hover,\nfieldset[disabled] .datepicker table tr td.active.disabled:hover,\nfieldset[disabled] .datepicker table tr td.active.disabled:hover:hover,\n.datepicker table tr td.active.disabled:focus,\n.datepicker table tr td.active:hover.disabled:focus,\n.datepicker table tr td.active.disabled.disabled:focus,\n.datepicker table tr td.active.disabled:hover.disabled:focus,\n.datepicker table tr td.active[disabled]:focus,\n.datepicker table tr td.active:hover[disabled]:focus,\n.datepicker table tr td.active.disabled[disabled]:focus,\n.datepicker table tr td.active.disabled:hover[disabled]:focus,\nfieldset[disabled] .datepicker table tr td.active:focus,\nfieldset[disabled] .datepicker table tr td.active:hover:focus,\nfieldset[disabled] .datepicker table tr td.active.disabled:focus,\nfieldset[disabled] .datepicker table tr td.active.disabled:hover:focus,\n.datepicker table tr td.active.disabled:active,\n.datepicker table tr td.active:hover.disabled:active,\n.datepicker table tr td.active.disabled.disabled:active,\n.datepicker table tr td.active.disabled:hover.disabled:active,\n.datepicker table tr td.active[disabled]:active,\n.datepicker table tr td.active:hover[disabled]:active,\n.datepicker table tr td.active.disabled[disabled]:active,\n.datepicker table tr td.active.disabled:hover[disabled]:active,\nfieldset[disabled] .datepicker table tr td.active:active,\nfieldset[disabled] .datepicker table tr td.active:hover:active,\nfieldset[disabled] .datepicker table tr td.active.disabled:active,\nfieldset[disabled] .datepicker table tr td.active.disabled:hover:active,\n.datepicker table tr td.active.disabled.active,\n.datepicker table tr td.active:hover.disabled.active,\n.datepicker table tr td.active.disabled.disabled.active,\n.datepicker table tr td.active.disabled:hover.disabled.active,\n.datepicker table tr td.active[disabled].active,\n.datepicker table tr td.active:hover[disabled].active,\n.datepicker table tr td.active.disabled[disabled].active,\n.datepicker table tr td.active.disabled:hover[disabled].active,\nfieldset[disabled] .datepicker table tr td.active.active,\nfieldset[disabled] .datepicker table tr td.active:hover.active,\nfieldset[disabled] .datepicker table tr td.active.disabled.active,\nfieldset[disabled] .datepicker table tr td.active.disabled:hover.active {\n  background-color: #428bca;\n  border-color: #357ebd;\n}\n.datepicker table tr td span {\n  display: block;\n  width: 23%;\n  height: 54px;\n  line-height: 54px;\n  float: left;\n  margin: 1%;\n  cursor: pointer;\n  border-radius: 4px;\n}\n.datepicker table tr td span:hover {\n  background: #eeeeee;\n}\n.datepicker table tr td span.disabled,\n.datepicker table tr td span.disabled:hover {\n  background: none;\n  color: #999999;\n  cursor: default;\n}\n.datepicker table tr td span.active,\n.datepicker table tr td span.active:hover,\n.datepicker table tr td span.active.disabled,\n.datepicker table tr td span.active.disabled:hover {\n  color: #ffffff;\n  background-color: #428bca;\n  border-color: #357ebd;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\n.datepicker table tr td span.active:hover,\n.datepicker table tr td span.active:hover:hover,\n.datepicker table tr td span.active.disabled:hover,\n.datepicker table tr td span.active.disabled:hover:hover,\n.datepicker table tr td span.active:focus,\n.datepicker table tr td span.active:hover:focus,\n.datepicker table tr td span.active.disabled:focus,\n.datepicker table tr td span.active.disabled:hover:focus,\n.datepicker table tr td span.active:active,\n.datepicker table tr td span.active:hover:active,\n.datepicker table tr td span.active.disabled:active,\n.datepicker table tr td span.active.disabled:hover:active,\n.datepicker table tr td span.active.active,\n.datepicker table tr td span.active:hover.active,\n.datepicker table tr td span.active.disabled.active,\n.datepicker table tr td span.active.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td span.active,\n.open .dropdown-toggle.datepicker table tr td span.active:hover,\n.open .dropdown-toggle.datepicker table tr td span.active.disabled,\n.open .dropdown-toggle.datepicker table tr td span.active.disabled:hover {\n  color: #ffffff;\n  background-color: #3276b1;\n  border-color: #285e8e;\n}\n.datepicker table tr td span.active:active,\n.datepicker table tr td span.active:hover:active,\n.datepicker table tr td span.active.disabled:active,\n.datepicker table tr td span.active.disabled:hover:active,\n.datepicker table tr td span.active.active,\n.datepicker table tr td span.active:hover.active,\n.datepicker table tr td span.active.disabled.active,\n.datepicker table tr td span.active.disabled:hover.active,\n.open .dropdown-toggle.datepicker table tr td span.active,\n.open .dropdown-toggle.datepicker table tr td span.active:hover,\n.open .dropdown-toggle.datepicker table tr td span.active.disabled,\n.open .dropdown-toggle.datepicker table tr td span.active.disabled:hover {\n  background-image: none;\n}\n.datepicker table tr td span.active.disabled,\n.datepicker table tr td span.active:hover.disabled,\n.datepicker table tr td span.active.disabled.disabled,\n.datepicker table tr td span.active.disabled:hover.disabled,\n.datepicker table tr td span.active[disabled],\n.datepicker table tr td span.active:hover[disabled],\n.datepicker table tr td span.active.disabled[disabled],\n.datepicker table tr td span.active.disabled:hover[disabled],\nfieldset[disabled] .datepicker table tr td span.active,\nfieldset[disabled] .datepicker table tr td span.active:hover,\nfieldset[disabled] .datepicker table tr td span.active.disabled,\nfieldset[disabled] .datepicker table tr td span.active.disabled:hover,\n.datepicker table tr td span.active.disabled:hover,\n.datepicker table tr td span.active:hover.disabled:hover,\n.datepicker table tr td span.active.disabled.disabled:hover,\n.datepicker table tr td span.active.disabled:hover.disabled:hover,\n.datepicker table tr td span.active[disabled]:hover,\n.datepicker table tr td span.active:hover[disabled]:hover,\n.datepicker table tr td span.active.disabled[disabled]:hover,\n.datepicker table tr td span.active.disabled:hover[disabled]:hover,\nfieldset[disabled] .datepicker table tr td span.active:hover,\nfieldset[disabled] .datepicker table tr td span.active:hover:hover,\nfieldset[disabled] .datepicker table tr td span.active.disabled:hover,\nfieldset[disabled] .datepicker table tr td span.active.disabled:hover:hover,\n.datepicker table tr td span.active.disabled:focus,\n.datepicker table tr td span.active:hover.disabled:focus,\n.datepicker table tr td span.active.disabled.disabled:focus,\n.datepicker table tr td span.active.disabled:hover.disabled:focus,\n.datepicker table tr td span.active[disabled]:focus,\n.datepicker table tr td span.active:hover[disabled]:focus,\n.datepicker table tr td span.active.disabled[disabled]:focus,\n.datepicker table tr td span.active.disabled:hover[disabled]:focus,\nfieldset[disabled] .datepicker table tr td span.active:focus,\nfieldset[disabled] .datepicker table tr td span.active:hover:focus,\nfieldset[disabled] .datepicker table tr td span.active.disabled:focus,\nfieldset[disabled] .datepicker table tr td span.active.disabled:hover:focus,\n.datepicker table tr td span.active.disabled:active,\n.datepicker table tr td span.active:hover.disabled:active,\n.datepicker table tr td span.active.disabled.disabled:active,\n.datepicker table tr td span.active.disabled:hover.disabled:active,\n.datepicker table tr td span.active[disabled]:active,\n.datepicker table tr td span.active:hover[disabled]:active,\n.datepicker table tr td span.active.disabled[disabled]:active,\n.datepicker table tr td span.active.disabled:hover[disabled]:active,\nfieldset[disabled] .datepicker table tr td span.active:active,\nfieldset[disabled] .datepicker table tr td span.active:hover:active,\nfieldset[disabled] .datepicker table tr td span.active.disabled:active,\nfieldset[disabled] .datepicker table tr td span.active.disabled:hover:active,\n.datepicker table tr td span.active.disabled.active,\n.datepicker table tr td span.active:hover.disabled.active,\n.datepicker table tr td span.active.disabled.disabled.active,\n.datepicker table tr td span.active.disabled:hover.disabled.active,\n.datepicker table tr td span.active[disabled].active,\n.datepicker table tr td span.active:hover[disabled].active,\n.datepicker table tr td span.active.disabled[disabled].active,\n.datepicker table tr td span.active.disabled:hover[disabled].active,\nfieldset[disabled] .datepicker table tr td span.active.active,\nfieldset[disabled] .datepicker table tr td span.active:hover.active,\nfieldset[disabled] .datepicker table tr td span.active.disabled.active,\nfieldset[disabled] .datepicker table tr td span.active.disabled:hover.active {\n  background-color: #428bca;\n  border-color: #357ebd;\n}\n.datepicker table tr td span.old,\n.datepicker table tr td span.new {\n  color: #999999;\n}\n.datepicker th.datepicker-switch {\n  width: 145px;\n}\n.datepicker thead tr:first-child th,\n.datepicker tfoot tr th {\n  cursor: pointer;\n}\n.datepicker thead tr:first-child th:hover,\n.datepicker tfoot tr th:hover {\n  background: #eeeeee;\n}\n.datepicker .cw {\n  font-size: 10px;\n  width: 12px;\n  padding: 0 2px 0 5px;\n  vertical-align: middle;\n}\n.datepicker thead tr:first-child th.cw {\n  cursor: default;\n  background-color: transparent;\n}\n.input-group.date .input-group-addon i {\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n}\n.input-daterange input {\n  text-align: center;\n}\n.input-daterange input:first-child {\n  border-radius: 3px 0 0 3px;\n}\n.input-daterange input:last-child {\n  border-radius: 0 3px 3px 0;\n}\n.input-daterange .input-group-addon {\n  width: auto;\n  min-width: 16px;\n  padding: 4px 5px;\n  font-weight: normal;\n  line-height: 1.428571429;\n  text-align: center;\n  text-shadow: 0 1px 0 #fff;\n  vertical-align: middle;\n  background-color: #eeeeee;\n  border: solid #cccccc;\n  border-width: 1px 0;\n  margin-left: -5px;\n  margin-right: -5px;\n}\n.datepicker.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  float: left;\n  display: none;\n  min-width: 160px;\n  list-style: none;\n  background-color: #ffffff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  -webkit-background-clip: padding-box;\n  -moz-background-clip: padding;\n  background-clip: padding-box;\n  *border-right-width: 2px;\n  *border-bottom-width: 2px;\n  color: #333333;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  line-height: 1.428571429;\n}\n.datepicker.dropdown-menu th,\n.datepicker.dropdown-menu td {\n  padding: 4px 5px;\n}\n", ""]);

	// exports


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../vendor/avalon/avalon.js" />
	/**
	 * msdaterangepicker 是一个日期范围选择组件
	 * author: zxl
	 * 使用说明：
	 * 例子：<wk:msdaterangepicker duplex-from="dto.StartTime" duplex-to="dto.EndTime"></wk:msdaterangepicker>
	 */
	// define(['avalon',
	//     'datepicker',
	//     'css!../plugin/datepicker/css/datepicker3.css'
	// ], function (avalon) {

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(25),
	    __webpack_require__(26)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var template;

	    /*本地化*/
	    $.fn.datepicker.dates['zh-CN'] = {
	        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
	        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
	        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
	        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	        today: "今日",
	        format: "yyyy年mm月dd日",
	        weekStart: 1
	    };

	    var _interface = function() {};

	    var msdaterangepicker = {
	        config: {
	            orientation: "left",
	            format: "yyyy-mm-dd",
	            autoclose: true,
	            language: 'zh-CN',
	            todayHighlight: true
	        },
	        duplexFrom: '',
	        duplexTo: '',
	        duplexDisabled: '',
	        cssclassFrom: 'form-control',
	        cssclassTo: 'form-control',
	        placeholderFrom: "点击选择时间",
	        placeholderTo: "点击选择时间",
	        spliter: '~',
	        elementId: "",

	        // 事件
	        onChangedFrom: _interface,
	        onChangedTo: _interface,
	        onChanged: _interface,
	        onInit: _interface,
	        init: _interface,

	        $init: init,

	        $ready: function(vm, elem) {
	            $('#' + vm.elementId + 'From')
	                .datepicker(vm.config)
	                .on("changeDate", function(e) {
	                    vm.onChangedFrom.call(elem, e, vm); //用户回调
	                    vm.onChanged.call(elem, vm); //用户回调
	                    $('#' + vm.elementId + 'To').datepicker(vm.config).datepicker("setStartDate", e.date);
	                });

	            //当起始时间值为空，清楚结束时间控件的初始值范围
	            $('#' + vm.elementId + 'From').blur(function() {
	                var dateFrom = $('#' + vm.elementId + 'From').val();
	                if (dateFrom == "") {
	                    $('#' + vm.elementId + 'To').datepicker(vm.config).datepicker("setStartDate", null);
	                }
	            });

	            $('#' + vm.elementId + 'To').datepicker(vm.config).on("changeDate", function(e) {
	                vm.onChangedTo.call(elem, e, vm); //用户回调
	                vm.onChanged.call(elem, vm); //用户回调
	                $('#' + vm.elementId + 'From').datepicker(vm.config).datepicker("setEndDate", e.date);
	            });

	            //当结束时间值为空，清楚起始时间控件的结束值范围
	            $('#' + vm.elementId + 'To').blur(function() {
	                var dateTo = $('#' + vm.elementId + 'To').val();
	                if (dateTo == "") {
	                    $('#' + vm.elementId + 'From').datepicker(vm.config).datepicker("setEndDate", null);
	                }
	            });

	            var val = $('#' + vm.elementId + 'From').val();
	            $('#' + vm.elementId + 'From').datepicker('update', val);
	        },

	        $dispose: function(vm, el) {
	            el.innerHTML = el.textContent = "";
	        }
	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, elem) {
	        vm.elementId = "msdateRangePicker" + vm.$id;
	        var rawHtml = '<div class="input-group date-picker input-daterange">' +
	            '<input $DIS-DUPLEX1$  id= "' + vm.elementId + 'From" class="$CSS-FROM$"  $duplex-from$ placeholder="$PLACEHOLDER-FROM$" type="text" value="">' +
	            '<span class="input-group-addon">' + vm.spliter + '</span>' +
	            '<input $DIS-DUPLEX2$ id= "' + vm.elementId + 'To"  class="$CSS-TO$" $duplex-to$ placeholder="$PLACEHOLDER-TO$" type="text" value="">' +
	            '</div>';

	        var html = rawHtml.replace('$CSS-FROM$', vm.cssclassFrom).replace('$CSS-TO$', vm.cssclassTo)
	            .replace('$PLACEHOLDER-FROM$', vm.placeholderFrom).replace('$PLACEHOLDER-TO$', vm.placeholderTo);

	        if (vm.duplexFrom != "") {
	            html = html.replace('$duplex-from$', 'ms-duplex="' + vm.duplexFrom + '"');
	        }

	        if (vm.duplexTo != "") {
	            html = html.replace('$duplex-to$', 'ms-duplex="' + vm.duplexTo + '"');
	        }

	        if (vm.duplexDisabled != "") {
	            html = html.replace('$DIS-DUPLEX1$', 'ms-attr-disabled="' + vm.duplexDisabled + '"');
	            html = html.replace('$DIS-DUPLEX2$', 'ms-attr-disabled="' + vm.duplexDisabled + '"');
	        }

	        template = html;
	        vm.$$template = function() {
	            return template;
	        };

	        /**
	         * 获取值
	         * @return {start: from-time, end: to-time}
	         */
	        vm.getVal = function() {
	            return {
	                start: $('#' + vm.elementId + 'From').val(),
	                end: $('#' + vm.elementId + 'To').val()
	            }
	        };

	        /**
	         *比较2个时间的大小
	         @parameters {start:开始时间,end:结束时间}
	         @return 开始时间大于结束时间为false,否则为true
	         */
	        vm._diff = function(start, end) {
	            if (start != null && end != null) {
	                var startArr, startDate, startTime;
	                if (start.indexOf('-') > 0) {
	                    startArr = start.split('-');
	                    startDate = new Date(startArr[0], startArr[1], startArr[2]);
	                    startTime = startDate.getTime();
	                }

	                var endArr, endDate, endTime;
	                if (end.indexOf('-') > 0) {
	                    endArr = end.split('-');
	                    endDate = new Date(endArr[0], endArr[1], endArr[2]);
	                    endTime = endDate.getTime();
	                }

	                if (startTime != null && endTime != null) {
	                    if (startTime > endTime) {
	                        return false;
	                    } else {
	                        return true;
	                    }
	                } else {
	                    return false;
	                }

	            } else {
	                return true;
	            }
	        };

	        if (typeof vm.onInit === 'function') {
	            vm.onInit.call(elem, vm);
	        }
	    };

	    avalon.component("wk:msdaterangepicker", msdaterangepicker)

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by qianbinbin on 20/2/2016.
	 */
	// define(['avalon',
	//     'text!components/multifileupload.html',
	//     'jquery.fileupload',
	//     'jquery.fileupload.process',
	//     'jquery.fileupload.validate',
	//     'css!../plugin/jquery-file-upload/css/jquery.fileupload.css',
	//     'css!../plugin/jquery-file-upload/css/jquery.fileupload-ui.css'], function (avalon, templateHtml) {
	//
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(30),
	    __webpack_require__(8),
	    __webpack_require__(10),
	    __webpack_require__(11),
	    __webpack_require__(12),
	    __webpack_require__(16)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(templateHtml) {

	    function newGuid() {
	        var guid = "";
	        for (var i = 1; i <= 32; i++) {
	            var n = Math.floor(Math.random() * 16.0).toString(16);
	            guid += n;
	        }
	        return guid;
	    };
	    var fileData;
	    var fileModel = function() {
	        this.fileName = '还没有选定文件',
	            this.fileSize = 0,
	            this.errorMessage = '',
	            this.successMessage = ''
	    };
	    var elementId = "Fileupload" + newGuid();
	    var multifileupload = {
	        url: '/', // 上传文件的POST地址
	        acceptFileTypes: 'jpe?g|png', //允许上传的文件类型 html|txt|xls|xlsx|doc|pdf|docx|ppt|pptx|zip|msg
	        maxFileSize: 10485760, // 10MB, 文件上传大小限制,
	        prompt: "文件格式为：jpeg,jpg,png，大小为10MB",
	        formId: "",
	        uploadBtnId: "",

	        // 事件
	        onInit: avalon.noop,
	        onFileUploadDone: avalon.noop,
	        onFileUploadFail: avalon.noop,
	        reset: avalon.noop,
	        _cancel: avalon.noop,
	        upload: avalon.noop,
	        _remove: avalon.noop,
	        elemetnId: elementId,
	        fileList: [],
	        _uploadDisabled: true,
	        $init: function(vm, element) {
	            elementId="Fileupload"+vm.$id;
	            element.innerHTML = templateHtml;
	            vm.$$template = function() {
	                return templateHtml;
	            };

	            if (typeof vm.onInit === 'function') {
	                vm.onInit.call(element, vm);
	            }
	        },
	        $ready: function(vm, element) {
	            $('#' + elementId).fileupload({
	                url: vm.url,
	                dataType: 'json',
	                autoUpload: false,
	                acceptFileTypes: new RegExp("(\.|\/)(" + vm.acceptFileTypes + ")$"),
	                maxFileSize: vm.maxFileSize // 默认10 MB
	            }).on('fileuploadadd', function(e, data) {
	                var file = data.files[0];
	                var model = new fileModel();
	                model.fileName = file.name;
	                model.fileSize = parseInt(file.size / 1024) == 0 ? 1 : parseInt(file.size / 1024);
	                model.errorMessage = "";
	                model.successMessage = "";
	                vm.fileList.push(model)
	                if (fileData == null) {
	                    fileData = data;
	                } else {
	                    fileData.files.push(file);
	                }
	            }).on('fileuploadprocessalways', function(e, data) {
	                var file = data.files[0];
	                var length = vm.fileList.length;
	                if (file.error) {
	                    $("#" + vm.uploadBtnId).attr("disabled", "disabled");
	                    vm.fileList[length - 1].errorMessage = file.error;
	                } else {
	                    $("#" + vm.uploadBtnId).removeAttr("disabled");
	                }
	            }).on('fileuploaddone', function(e, data) {
	                for (var i = 0; i < vm.fileList.length; i++) {
	                    vm.fileList[i].successMessage = "上传成功";
	                }

	                vm._uploadDisabled = true;
	                vm.reset();
	                vm.onFileUploadDone.call(element, e, data) //用户上传完毕后回调

	            }).on('fileuploadprogressall', function(e, data) {
	                var progress = parseInt(data.loaded / data.total * 100, 10);
	                $("div[name='progress'] .progress-bar").css(
	                    'width',
	                    progress + '%'
	                );
	            }).on('fileuploadfail', function(e, data) {
	                vm.fileList[0].errorMessage = "上传失败";
	                vm.onFileUploadFail.call(element.e, data);
	            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
	            vm.reset = function() {
	                fileData = null;
	                $("div[name='progress'] .progress-bar").css('width', '0');
	            };

	            vm._cancel = function() {
	                fileData = null;
	            };
	            vm.upload = function() {
	                if (fileData != null) {
	                    fileData.submit();
	                } else {
	                    $.ajax({
	                        cache: true,
	                        type: "POST",
	                        url: vm.url,
	                        data: $("#" + vm.formId).serialize(),
	                        async: false,
	                        error: function(request) {},
	                        success: function(data) {
	                            vm.onFileUploadDone.call(data) // 用户上传完毕后回调
	                        }
	                    });
	                }
	            };

	            vm._remove = function(index) {
	                vm.fileList.splice(index, 1);
	                fileData.files.splice(index, 1);
	                for (var i = 0; i < fileData.files.length; i++) {
	                    var file = fileData.files[i];
	                    if (file.error) {
	                        $("#" + vm.uploadBtnId).attr("disabled", "disabled");
	                        break;
	                    } else {
	                        $("#" + vm.uploadBtnId).removeAttr("disabled");
	                    }
	                }
	            };
	        },
	        $dispose: function(vm, elem) {
	            elem.innerHTML = elem.textContent = "";
	        }
	    };

	    avalon.component("wk:multifileupload", multifileupload);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<span class=\"btn green fileinput-button\">\r\n    <span>选择文件</span> <i class=\"fa fa-plus\"></i>\r\n    <input ms-attr-id=\"elemetnId\" type=\"file\" name=\"files[]\">\r\n</span>\r\n<span class=\"text-danger\">{{prompt}}</span>\r\n<table style=\"margin-top: 7px; width: 100%;\" role=\"presentation\" class=\"table table-striped clearfix\">\r\n    <tbody class=\"files\">\r\n    <tr class=\"template-upload fade in\" ms-repeat=\"fileList\">\r\n        <td>\r\n            <span class=\"preview\"></span>\r\n        </td>\r\n        <td>\r\n            <p class=\"name\">{{el.fileName}}</p>\r\n            <strong class=\"error text-danger label label-danger\" style=\"color: white\">{{el.errorMessage}}</strong>\r\n            <strong class=\"success text-success label label-success\" style=\"color: white\">{{el.successMessage}}</strong>\r\n        </td>\r\n        <td>\r\n            <p class=\"size\">{{el.fileSize}} KB</p>\r\n            <div name=\"progress\" class=\"progress progress-striped active\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"0\">\r\n                <div class=\"progress-bar progress-bar-success\" style=\"width: 0%;\"></div>\r\n            </div>\r\n        </td>\r\n        <td>\r\n            <a class=\"badge badge-danger\" title=\"删除\" href=\"javascript:void(0);\" ms-on-click=\"_remove($index)\"><i class=\"fa fa-trash-o\"></i></a>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n"

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../vendor/avalon/avalon.js" />
	/**
	 * navigation是一个导航组件，主要呈现list属性中的数据。其数据由css,name,url组成一个对象。css:呈现的样式,name:导航名称,url:导航的链接地址
	 * author: coolqian
	 * 使用说明：
	 * 例子：<wk:navigation list="[{css:'',name:'合同管理',url:''}]"></wk:navigation>
	 */
	// define(['avalon',
	//     'text!components/navigation.html'
	// ], function(avalon, templateHtml) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(32)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(templateHtml) {
	    var template;
	    avalon.component("wk:navigation", {
	        indexName: "首页", // @config 导航名称
	        indexClass: "fa fa-home", // @config 导航样式
	        indexUrl: "#!/home", // @config 导航url
	        list: [], // @config 导航数据列表
	        $replace: false,
	        $init: function(vm, elem) {
	            var listHtml = "";
	            var items = eval('(' + vm.list + ')');
	            if (items.length > 0) {
	                avalon.each(items, function(i, data) {
	                    if (data.css != '') {
	                        listHtml += '<i class="fa fa-home"></i> ';
	                    }
	                    if (data.url == '') {
	                        if (i == items.length - 1) {
	                            listHtml += '<span>' + data.name + '</span>';
	                        } else {
	                            listHtml += '<span>' + data.name + '</span> <i class="fa fa-angle-right"></i>';
	                        }
	                    } else {
	                        if (i == items.length - 1) {
	                            listHtml += '<a href="' + data.url + '">' + data.name + '</a>';
	                        } else {
	                            listHtml += '<a href="' + data.url + '">' + data.name + '</a> <i class="fa fa-angle-right"></i>';
	                        }
	                    }
	                });
	            }

	            template = templateHtml.replace('$list$', listHtml);
	            vm.$$template = function() {
	                return template;
	            };
	        },
	        $ready: function() {},
	        $dispose: function(vm, elem) {
	            elem.innerHTML = elem.textContent = "";
	        }
	    });

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<ol class=\"page-breadcrumb\">\r\n    <li>\r\n        <i ms-attr-class=\"indexClass\"></i><a ms-attr-href=\"indexUrl\">{{indexName}}</a>\r\n        <i class=\"fa fa-angle-right\"></i>\r\n        $list$\r\n    </li>\r\n</ol>\r\n"

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../vendor/avalon/avalon.js" />
	/**
	 * select2是一个下拉列表组件
	 * author: zxl
	 * 使用说明：
	 * 例子：<wk:select2 duplex="dto.SelectId" placeholder="选择下拉选项"></wk:select2>
	 */
	// define(['avalon',
	 //    'jquery.select2',
	 //   'css!../plugin/select2/select2.css'
	 //], function (avalon) {

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(34),
	    __webpack_require__(35)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var template;

	    /*本地化*/
	    $.fn.select2.locales['zh-CN'] = {
	        formatNoMatches: function() {
	            return "没有找到匹配项";
	        },
	        formatInputTooShort: function(input, min) {
	            var n = min - input.length;
	            return "请再输入" + n + "个字符";
	        },
	        formatInputTooLong: function(input, max) {
	            var n = input.length - max;
	            return "请删掉" + n + "个字符";
	        },
	        formatSelectionTooBig: function(limit) {
	            return "你只能选择最多" + limit + "项";
	        },
	        formatLoadMore: function(pageNumber) {
	            return "加载结果中…";
	        },
	        formatSearching: function() {
	            return "搜索中…";
	        }
	    };

	    $.extend($.fn.select2.defaults, $.fn.select2.locales['zh-CN']);

	    /**
	     * 将任意类型的数据源转换为Select2支持的数据源
	     * @param  [] data 待转换的数据源
	     * @param  string id   待转换的数据源中数据的value属性
	     * @param  string text 待转换的数据源中数据的text属性
	     * @return [{id, text}] 转换后的数据源
	     */
	    function formatData(data, id, text) {
	        var formatedData = [];
	        $(data).each(function(i, item) {
	            formatedData.push({
	                id: item[id],
	                text: item[text],
	                original: item
	            });
	        });

	        return formatedData;
	    }

	    /**
	     * 根据key在data中找到id属性和key一样的项
	     * @param  [] data 数据源
	     * @param  string id   id属性名
	     * @param  int/string key  搜索关键字
	     * @return {}       匹配到的项
	     */
	    function findById(data, id, key) {
	        var found = null;
	        $(data).each(function(i, item) {
	            if (item[id] == key) {
	                found = item;
	                return false; //break
	            }
	        });

	        return found;
	    }

	    /**
	     * 获取双向绑定的值，主要用于初始化
	     * @param  {[type]} vmodels 包含组件的上层VM
	     * @param  {[type]} duplex  双向绑定的属性（可能是 'dto.pro.name' 的形式）
	     * @return {[type]}         值
	     */
	    function getDuplexValue(vmodels, duplex) {
	        var length = vmodels.length;
	        var propArray = duplex.split('.');
	        var result = 0;

	        $(vmodels).each(function(i, vm) {
	            if (vm.hasOwnProperty(propArray[0])) {
	                // 如果当前的vm已经包含了当前的duplex第一层属性，则遍历取出值
	                var tmp = vm[propArray[0]];
	                for (var i = 1; i < propArray.length; i++) {
	                    tmp = tmp[propArray[i]];
	                }
	                result = tmp;
	                return false; //break;
	            }
	        });

	        return result;
	    }

	    var $select; // 保存对 ipnut[hidden] 的引用，只有在初始化$init之后才能取到
	    var dataCache = [];
	    var _interface = function() {};

	    var select2 = {
	        duplex: "",
	        placeholder: "请选择",
	        disabled: '',
	        data: [], //数据源
	        dataId: 'Value', //数据源中作为id的属性名 如果在html配置要写成 data-select2-data-id = "xxx"
	        dataText: 'DisplayText', //数据源中作为text的属性名 如果在html配置要写成 data-select2-data-text = "xxx"
	        url: '', //ajax请求地址，如果指定了该属性，则忽略data属性，自己发起一个ajax请求并获取数据
	        matcher: "", // 自定义的匹配器
	        name: "", //用来验证是否选中值
	        cssclass: "", //用来验证是否选中值的样式
	        elementId: "",

	        // 事件
	        onChanged: _interface,
	        onInit: _interface,
	        init: _interface,
	        clear: _interface,
	        getSelectedItem: _interface,


	        $init: init,

	        $ready: function(vm, elem) {
	            if (vm.url != "") { //如果指定了URL，则从该地址请求数据
	                $.get(vm.url).then(function(res) {
	                    dataCache = formatData(res, vm.dataId, vm.dataText);
	                    $("#" + vm.elementId ).select2({
	                        data: dataCache,
	                        initSelection: function(elem, callback) {
	                            var id = $(elem).val();
	                            var item = findById(res, vm.dataId, id);

	                            // 从数据中查找对应id的数据项，并返回给callback函数
	                            if (item != null) {
	                                callback({
	                                    id: id,
	                                    text: item[vm.dataText]
	                                });
	                            } else {
	                                callback(null);
	                            }
	                        },
	                        placeholder: vm.placeholder,
	                        allowClear: true,
	                        language: "zh-CN",
	                        matcher: function(term, text, opt) {
	                            if (typeof vm.matcher === 'function') {
	                                return vm.matcher.call(elem, term, text, opt);
	                            }

	                            return text.toUpperCase().indexOf(term.toUpperCase()) >= 0; // defualt matcher
	                        }
	                    });
	                });
	            } else {
	                dataCache = formatData(vm.data, vm.dataId, vm.dataText);
	                $("#" + vm.elementId ).select2({
	                    data: dataCache,
	                    initSelection: function(elem, callback) {
	                        var id = $(elem).val();
	                        var item = findById(data, vm.dataId, id);

	                        // 从数据中查找对应id的数据项，并返回给callback函数

	                        if (item != null) {
	                            callback({
	                                id: id,
	                                text: item[vm.dataText]
	                            });
	                        } else {
	                            callback(null);
	                        }
	                    },
	                    placeholder: vm.placeholder,
	                    allowClear: true,
	                    language: "zh-CN",
	                    matcher: function(term, text, opt) {
	                        if (typeof vm.matcher === 'function') {
	                            return vm.matcher.call(elem, term, text, opt);
	                        }

	                        return text.toUpperCase().indexOf(term.toUpperCase()) >= 0; // defualt matcher
	                    }
	                });
	            }

	            // 绑定change事件
	            $("#" + vm.elementId ).bind("change", function(res) {
	                // 触发用户回调
	                var added = res.added;
	                var text = '';
	                if (added) {
	                    text = added.text;
	                }
	                vm.onChanged.call(elem, res.val, vm, text);
	                // 清除表单验证的错误提示
	                if (typeof(vm.name) != 'undefined') {
	                    $("#" + vm.elementId ).closest('.form-group').removeClass('has-error');
	                    $("#" + vm.elementId  + '-error').remove();
	                }
	            });

	            $("#" + vm.elementId ).on("select2-loaded", function(res) {
	                // 触发用户回调
	            });
	           //vm.init();
	        },

	        $dispose: function(vm, el) {
	            el.innerHTML = el.textContent = "";
	        }


	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, elem) {
	        vm.elementId = "select2" + vm.$id;
	        var rawHtml = '<input ms-attr-disabled="$DISABLED$" class="form-control" ms-duplex="$DUPLEX$" name= "$NAME$" id="' + vm.elementId + '"   type="hidden" tabindex="-1" title="">';
	        var html = rawHtml;
	        if (typeof(vm.name) != 'undefined') {
	            html = html.replace('$CSS$', vm.cssclass).replace('$NAME$', vm.name);
	        }

	        if (vm.duplex != "") {
	            html = html.replace('$DUPLEX$', vm.duplex);
	        }

	        html = html.replace('$DISABLED$', vm.disabled || false);
	        template = html;
	        vm.$$template = function() {
	            return template;
	        };

	        /**
	         * 对于一些特殊的情况，需要手动初始化
	         * @param  [val] 要初始化的值
	         * @return {[type]} [description]
	         */
	        vm.init = function(val) {
	            $select = $("#" + vm.elementId );

	            if (val) {
	                // *直接使用 $select.select2("val", val) 无效，只能先找到item在使用data的方式赋值
	                var item = findById(dataCache, "id", val);
	                $select.select2("data", item);
	            } else if (vm.duplex != "") {
	                var duplexVal =getDuplexValue(vm, vm.duplex);
	                $select.select2("val", duplexVal);
	            }
	        };

	        /**
	         * 清空选择
	         * @return {[type]} [description]
	         */
	        vm.clear = function() {
	            $select = $("#" + vm.elementId );
	            $select.select2("val", "");
	        };

	        /**
	         * 获取当前选中的项
	         * @return {[type]} 格式为{id, text}
	         */
	        vm.getSelectedItem = function() {
	            $select = $("#" + vm.elementId );
	            return $select.select2('data');
	        };

	        if (typeof vm.onInit === 'function') {
	            vm.onInit.call(elem, vm);
	        }

	    }

	    avalon.component("wk:select2", select2);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 34 */
/***/ function(module, exports) {

	/*
	Copyright 2014 Igor Vaynberg

	Version: 3.5.1 Timestamp: Tue Jul 22 18:58:56 EDT 2014

	This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
	General Public License version 2 (the "GPL License"). You may choose either license to govern your
	use of this software only upon the condition that you accept all of the terms of either the Apache
	License or the GPL License.

	You may obtain a copy of the Apache License and the GPL License at:

	http://www.apache.org/licenses/LICENSE-2.0
	http://www.gnu.org/licenses/gpl-2.0.html

	Unless required by applicable law or agreed to in writing, software distributed under the Apache License
	or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	either express or implied. See the Apache License and the GPL License for the specific language governing
	permissions and limitations under the Apache License and the GPL License.
	*/
	!function(a){"undefined"==typeof a.fn.each2&&a.extend(a.fn,{each2:function(b){for(var c=a([0]),d=-1,e=this.length;++d<e&&(c.context=c[0]=this[d])&&b.call(c[0],d,c)!==!1;);return this}})}(jQuery),function(a,b){"use strict";function n(b){var c=a(document.createTextNode(""));b.before(c),c.before(b),c.remove()}function o(a){function b(a){return m[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function p(a,b){for(var c=0,d=b.length;d>c;c+=1)if(r(a,b[c]))return c;return-1}function q(){var b=a(l);b.appendTo("body");var c={width:b.width()-b[0].clientWidth,height:b.height()-b[0].clientHeight};return b.remove(),c}function r(a,c){return a===c?!0:a===b||c===b?!1:null===a||null===c?!1:a.constructor===String?a+""==c+"":c.constructor===String?c+""==a+"":!1}function s(b,c){var d,e,f;if(null===b||b.length<1)return[];for(d=b.split(c),e=0,f=d.length;f>e;e+=1)d[e]=a.trim(d[e]);return d}function t(a){return a.outerWidth(!1)-a.width()}function u(c){var d="keyup-change-value";c.on("keydown",function(){a.data(c,d)===b&&a.data(c,d,c.val())}),c.on("keyup",function(){var e=a.data(c,d);e!==b&&c.val()!==e&&(a.removeData(c,d),c.trigger("keyup-change"))})}function v(c){c.on("mousemove",function(c){var d=i;(d===b||d.x!==c.pageX||d.y!==c.pageY)&&a(c.target).trigger("mousemove-filtered",c)})}function w(a,c,d){d=d||b;var e;return function(){var b=arguments;window.clearTimeout(e),e=window.setTimeout(function(){c.apply(d,b)},a)}}function x(a,b){var c=w(a,function(a){b.trigger("scroll-debounced",a)});b.on("scroll",function(a){p(a.target,b.get())>=0&&c(a)})}function y(a){a[0]!==document.activeElement&&window.setTimeout(function(){var d,b=a[0],c=a.val().length;a.focus();var e=b.offsetWidth>0||b.offsetHeight>0;e&&b===document.activeElement&&(b.setSelectionRange?b.setSelectionRange(c,c):b.createTextRange&&(d=b.createTextRange(),d.collapse(!1),d.select()))},0)}function z(b){b=a(b)[0];var c=0,d=0;if("selectionStart"in b)c=b.selectionStart,d=b.selectionEnd-c;else if("selection"in document){b.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-b.value.length),c=e.text.length-d}return{offset:c,length:d}}function A(a){a.preventDefault(),a.stopPropagation()}function B(a){a.preventDefault(),a.stopImmediatePropagation()}function C(b){if(!h){var c=b[0].currentStyle||window.getComputedStyle(b[0],null);h=a(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),h.attr("class","select2-sizer"),a("body").append(h)}return h.text(b.val()),h.width()}function D(b,c,d){var e,g,f=[];e=a.trim(b.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0===this.indexOf("select2-")&&f.push(this)})),e=a.trim(c.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0!==this.indexOf("select2-")&&(g=d(this),g&&f.push(g))})),b.attr("class",f.join(" "))}function E(a,b,c,d){var e=o(a.toUpperCase()).indexOf(o(b.toUpperCase())),f=b.length;return 0>e?(c.push(d(a)),void 0):(c.push(d(a.substring(0,e))),c.push("<span class='select2-match'>"),c.push(d(a.substring(e,e+f))),c.push("</span>"),c.push(d(a.substring(e+f,a.length))),void 0)}function F(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})}function G(c){var d,e=null,f=c.quietMillis||100,g=c.url,h=this;return function(i){window.clearTimeout(d),d=window.setTimeout(function(){var d=c.data,f=g,j=c.transport||a.fn.select2.ajaxDefaults.transport,k={type:c.type||"GET",cache:c.cache||!1,jsonpCallback:c.jsonpCallback||b,dataType:c.dataType||"json"},l=a.extend({},a.fn.select2.ajaxDefaults.params,k);d=d?d.call(h,i.term,i.page,i.context):null,f="function"==typeof f?f.call(h,i.term,i.page,i.context):f,e&&"function"==typeof e.abort&&e.abort(),c.params&&(a.isFunction(c.params)?a.extend(l,c.params.call(h)):a.extend(l,c.params)),a.extend(l,{url:f,dataType:c.dataType,data:d,success:function(a){var b=c.results(a,i.page,i);i.callback(b)},error:function(a,b,c){var d={hasError:!0,jqXHR:a,textStatus:b,errorThrown:c};i.callback(d)}}),e=j.call(h,l)},f)}}function H(b){var d,e,c=b,f=function(a){return""+a.text};a.isArray(c)&&(e=c,c={results:e}),a.isFunction(c)===!1&&(e=c,c=function(){return e});var g=c();return g.text&&(f=g.text,a.isFunction(f)||(d=g.text,f=function(a){return a[d]})),function(b){var g,d=b.term,e={results:[]};return""===d?(b.callback(c()),void 0):(g=function(c,e){var h,i;if(c=c[0],c.children){h={};for(i in c)c.hasOwnProperty(i)&&(h[i]=c[i]);h.children=[],a(c.children).each2(function(a,b){g(b,h.children)}),(h.children.length||b.matcher(d,f(h),c))&&e.push(h)}else b.matcher(d,f(c),c)&&e.push(c)},a(c().results).each2(function(a,b){g(b,e.results)}),b.callback(e),void 0)}}function I(c){var d=a.isFunction(c);return function(e){var f=e.term,g={results:[]},h=d?c(e):c;a.isArray(h)&&(a(h).each(function(){var a=this.text!==b,c=a?this.text:this;(""===f||e.matcher(f,c))&&g.results.push(a?this:{id:this,text:this})}),e.callback(g))}}function J(b,c){if(a.isFunction(b))return!0;if(!b)return!1;if("string"==typeof b)return!0;throw new Error(c+" must be a string, function, or falsy value")}function K(b,c){if(a.isFunction(b)){var d=Array.prototype.slice.call(arguments,2);return b.apply(c,d)}return b}function L(b){var c=0;return a.each(b,function(a,b){b.children?c+=L(b.children):c++}),c}function M(a,c,d,e){var h,i,j,k,l,f=a,g=!1;if(!e.createSearchChoice||!e.tokenSeparators||e.tokenSeparators.length<1)return b;for(;;){for(i=-1,j=0,k=e.tokenSeparators.length;k>j&&(l=e.tokenSeparators[j],i=a.indexOf(l),!(i>=0));j++);if(0>i)break;if(h=a.substring(0,i),a=a.substring(i+l.length),h.length>0&&(h=e.createSearchChoice.call(this,h,c),h!==b&&null!==h&&e.id(h)!==b&&null!==e.id(h))){for(g=!1,j=0,k=c.length;k>j;j++)if(r(e.id(h),e.id(c[j]))){g=!0;break}g||d(h)}}return f!==a?a:void 0}function N(){var b=this;a.each(arguments,function(a,c){b[c].remove(),b[c]=null})}function O(b,c){var d=function(){};return d.prototype=new b,d.prototype.constructor=d,d.prototype.parent=b.prototype,d.prototype=a.extend(d.prototype,c),d}if(window.Select2===b){var c,d,e,f,g,h,j,k,i={x:0,y:0},c={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case c.LEFT:case c.RIGHT:case c.UP:case c.DOWN:return!0}return!1},isControl:function(a){var b=a.which;switch(b){case c.SHIFT:case c.CTRL:case c.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){return a=a.which?a.which:a,a>=112&&123>=a}},l="<div class='select2-measure-scrollbar'></div>",m={"\u24b6":"A","\uff21":"A","\xc0":"A","\xc1":"A","\xc2":"A","\u1ea6":"A","\u1ea4":"A","\u1eaa":"A","\u1ea8":"A","\xc3":"A","\u0100":"A","\u0102":"A","\u1eb0":"A","\u1eae":"A","\u1eb4":"A","\u1eb2":"A","\u0226":"A","\u01e0":"A","\xc4":"A","\u01de":"A","\u1ea2":"A","\xc5":"A","\u01fa":"A","\u01cd":"A","\u0200":"A","\u0202":"A","\u1ea0":"A","\u1eac":"A","\u1eb6":"A","\u1e00":"A","\u0104":"A","\u023a":"A","\u2c6f":"A","\ua732":"AA","\xc6":"AE","\u01fc":"AE","\u01e2":"AE","\ua734":"AO","\ua736":"AU","\ua738":"AV","\ua73a":"AV","\ua73c":"AY","\u24b7":"B","\uff22":"B","\u1e02":"B","\u1e04":"B","\u1e06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24b8":"C","\uff23":"C","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\xc7":"C","\u1e08":"C","\u0187":"C","\u023b":"C","\ua73e":"C","\u24b9":"D","\uff24":"D","\u1e0a":"D","\u010e":"D","\u1e0c":"D","\u1e10":"D","\u1e12":"D","\u1e0e":"D","\u0110":"D","\u018b":"D","\u018a":"D","\u0189":"D","\ua779":"D","\u01f1":"DZ","\u01c4":"DZ","\u01f2":"Dz","\u01c5":"Dz","\u24ba":"E","\uff25":"E","\xc8":"E","\xc9":"E","\xca":"E","\u1ec0":"E","\u1ebe":"E","\u1ec4":"E","\u1ec2":"E","\u1ebc":"E","\u0112":"E","\u1e14":"E","\u1e16":"E","\u0114":"E","\u0116":"E","\xcb":"E","\u1eba":"E","\u011a":"E","\u0204":"E","\u0206":"E","\u1eb8":"E","\u1ec6":"E","\u0228":"E","\u1e1c":"E","\u0118":"E","\u1e18":"E","\u1e1a":"E","\u0190":"E","\u018e":"E","\u24bb":"F","\uff26":"F","\u1e1e":"F","\u0191":"F","\ua77b":"F","\u24bc":"G","\uff27":"G","\u01f4":"G","\u011c":"G","\u1e20":"G","\u011e":"G","\u0120":"G","\u01e6":"G","\u0122":"G","\u01e4":"G","\u0193":"G","\ua7a0":"G","\ua77d":"G","\ua77e":"G","\u24bd":"H","\uff28":"H","\u0124":"H","\u1e22":"H","\u1e26":"H","\u021e":"H","\u1e24":"H","\u1e28":"H","\u1e2a":"H","\u0126":"H","\u2c67":"H","\u2c75":"H","\ua78d":"H","\u24be":"I","\uff29":"I","\xcc":"I","\xcd":"I","\xce":"I","\u0128":"I","\u012a":"I","\u012c":"I","\u0130":"I","\xcf":"I","\u1e2e":"I","\u1ec8":"I","\u01cf":"I","\u0208":"I","\u020a":"I","\u1eca":"I","\u012e":"I","\u1e2c":"I","\u0197":"I","\u24bf":"J","\uff2a":"J","\u0134":"J","\u0248":"J","\u24c0":"K","\uff2b":"K","\u1e30":"K","\u01e8":"K","\u1e32":"K","\u0136":"K","\u1e34":"K","\u0198":"K","\u2c69":"K","\ua740":"K","\ua742":"K","\ua744":"K","\ua7a2":"K","\u24c1":"L","\uff2c":"L","\u013f":"L","\u0139":"L","\u013d":"L","\u1e36":"L","\u1e38":"L","\u013b":"L","\u1e3c":"L","\u1e3a":"L","\u0141":"L","\u023d":"L","\u2c62":"L","\u2c60":"L","\ua748":"L","\ua746":"L","\ua780":"L","\u01c7":"LJ","\u01c8":"Lj","\u24c2":"M","\uff2d":"M","\u1e3e":"M","\u1e40":"M","\u1e42":"M","\u2c6e":"M","\u019c":"M","\u24c3":"N","\uff2e":"N","\u01f8":"N","\u0143":"N","\xd1":"N","\u1e44":"N","\u0147":"N","\u1e46":"N","\u0145":"N","\u1e4a":"N","\u1e48":"N","\u0220":"N","\u019d":"N","\ua790":"N","\ua7a4":"N","\u01ca":"NJ","\u01cb":"Nj","\u24c4":"O","\uff2f":"O","\xd2":"O","\xd3":"O","\xd4":"O","\u1ed2":"O","\u1ed0":"O","\u1ed6":"O","\u1ed4":"O","\xd5":"O","\u1e4c":"O","\u022c":"O","\u1e4e":"O","\u014c":"O","\u1e50":"O","\u1e52":"O","\u014e":"O","\u022e":"O","\u0230":"O","\xd6":"O","\u022a":"O","\u1ece":"O","\u0150":"O","\u01d1":"O","\u020c":"O","\u020e":"O","\u01a0":"O","\u1edc":"O","\u1eda":"O","\u1ee0":"O","\u1ede":"O","\u1ee2":"O","\u1ecc":"O","\u1ed8":"O","\u01ea":"O","\u01ec":"O","\xd8":"O","\u01fe":"O","\u0186":"O","\u019f":"O","\ua74a":"O","\ua74c":"O","\u01a2":"OI","\ua74e":"OO","\u0222":"OU","\u24c5":"P","\uff30":"P","\u1e54":"P","\u1e56":"P","\u01a4":"P","\u2c63":"P","\ua750":"P","\ua752":"P","\ua754":"P","\u24c6":"Q","\uff31":"Q","\ua756":"Q","\ua758":"Q","\u024a":"Q","\u24c7":"R","\uff32":"R","\u0154":"R","\u1e58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1e5a":"R","\u1e5c":"R","\u0156":"R","\u1e5e":"R","\u024c":"R","\u2c64":"R","\ua75a":"R","\ua7a6":"R","\ua782":"R","\u24c8":"S","\uff33":"S","\u1e9e":"S","\u015a":"S","\u1e64":"S","\u015c":"S","\u1e60":"S","\u0160":"S","\u1e66":"S","\u1e62":"S","\u1e68":"S","\u0218":"S","\u015e":"S","\u2c7e":"S","\ua7a8":"S","\ua784":"S","\u24c9":"T","\uff34":"T","\u1e6a":"T","\u0164":"T","\u1e6c":"T","\u021a":"T","\u0162":"T","\u1e70":"T","\u1e6e":"T","\u0166":"T","\u01ac":"T","\u01ae":"T","\u023e":"T","\ua786":"T","\ua728":"TZ","\u24ca":"U","\uff35":"U","\xd9":"U","\xda":"U","\xdb":"U","\u0168":"U","\u1e78":"U","\u016a":"U","\u1e7a":"U","\u016c":"U","\xdc":"U","\u01db":"U","\u01d7":"U","\u01d5":"U","\u01d9":"U","\u1ee6":"U","\u016e":"U","\u0170":"U","\u01d3":"U","\u0214":"U","\u0216":"U","\u01af":"U","\u1eea":"U","\u1ee8":"U","\u1eee":"U","\u1eec":"U","\u1ef0":"U","\u1ee4":"U","\u1e72":"U","\u0172":"U","\u1e76":"U","\u1e74":"U","\u0244":"U","\u24cb":"V","\uff36":"V","\u1e7c":"V","\u1e7e":"V","\u01b2":"V","\ua75e":"V","\u0245":"V","\ua760":"VY","\u24cc":"W","\uff37":"W","\u1e80":"W","\u1e82":"W","\u0174":"W","\u1e86":"W","\u1e84":"W","\u1e88":"W","\u2c72":"W","\u24cd":"X","\uff38":"X","\u1e8a":"X","\u1e8c":"X","\u24ce":"Y","\uff39":"Y","\u1ef2":"Y","\xdd":"Y","\u0176":"Y","\u1ef8":"Y","\u0232":"Y","\u1e8e":"Y","\u0178":"Y","\u1ef6":"Y","\u1ef4":"Y","\u01b3":"Y","\u024e":"Y","\u1efe":"Y","\u24cf":"Z","\uff3a":"Z","\u0179":"Z","\u1e90":"Z","\u017b":"Z","\u017d":"Z","\u1e92":"Z","\u1e94":"Z","\u01b5":"Z","\u0224":"Z","\u2c7f":"Z","\u2c6b":"Z","\ua762":"Z","\u24d0":"a","\uff41":"a","\u1e9a":"a","\xe0":"a","\xe1":"a","\xe2":"a","\u1ea7":"a","\u1ea5":"a","\u1eab":"a","\u1ea9":"a","\xe3":"a","\u0101":"a","\u0103":"a","\u1eb1":"a","\u1eaf":"a","\u1eb5":"a","\u1eb3":"a","\u0227":"a","\u01e1":"a","\xe4":"a","\u01df":"a","\u1ea3":"a","\xe5":"a","\u01fb":"a","\u01ce":"a","\u0201":"a","\u0203":"a","\u1ea1":"a","\u1ead":"a","\u1eb7":"a","\u1e01":"a","\u0105":"a","\u2c65":"a","\u0250":"a","\ua733":"aa","\xe6":"ae","\u01fd":"ae","\u01e3":"ae","\ua735":"ao","\ua737":"au","\ua739":"av","\ua73b":"av","\ua73d":"ay","\u24d1":"b","\uff42":"b","\u1e03":"b","\u1e05":"b","\u1e07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24d2":"c","\uff43":"c","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\xe7":"c","\u1e09":"c","\u0188":"c","\u023c":"c","\ua73f":"c","\u2184":"c","\u24d3":"d","\uff44":"d","\u1e0b":"d","\u010f":"d","\u1e0d":"d","\u1e11":"d","\u1e13":"d","\u1e0f":"d","\u0111":"d","\u018c":"d","\u0256":"d","\u0257":"d","\ua77a":"d","\u01f3":"dz","\u01c6":"dz","\u24d4":"e","\uff45":"e","\xe8":"e","\xe9":"e","\xea":"e","\u1ec1":"e","\u1ebf":"e","\u1ec5":"e","\u1ec3":"e","\u1ebd":"e","\u0113":"e","\u1e15":"e","\u1e17":"e","\u0115":"e","\u0117":"e","\xeb":"e","\u1ebb":"e","\u011b":"e","\u0205":"e","\u0207":"e","\u1eb9":"e","\u1ec7":"e","\u0229":"e","\u1e1d":"e","\u0119":"e","\u1e19":"e","\u1e1b":"e","\u0247":"e","\u025b":"e","\u01dd":"e","\u24d5":"f","\uff46":"f","\u1e1f":"f","\u0192":"f","\ua77c":"f","\u24d6":"g","\uff47":"g","\u01f5":"g","\u011d":"g","\u1e21":"g","\u011f":"g","\u0121":"g","\u01e7":"g","\u0123":"g","\u01e5":"g","\u0260":"g","\ua7a1":"g","\u1d79":"g","\ua77f":"g","\u24d7":"h","\uff48":"h","\u0125":"h","\u1e23":"h","\u1e27":"h","\u021f":"h","\u1e25":"h","\u1e29":"h","\u1e2b":"h","\u1e96":"h","\u0127":"h","\u2c68":"h","\u2c76":"h","\u0265":"h","\u0195":"hv","\u24d8":"i","\uff49":"i","\xec":"i","\xed":"i","\xee":"i","\u0129":"i","\u012b":"i","\u012d":"i","\xef":"i","\u1e2f":"i","\u1ec9":"i","\u01d0":"i","\u0209":"i","\u020b":"i","\u1ecb":"i","\u012f":"i","\u1e2d":"i","\u0268":"i","\u0131":"i","\u24d9":"j","\uff4a":"j","\u0135":"j","\u01f0":"j","\u0249":"j","\u24da":"k","\uff4b":"k","\u1e31":"k","\u01e9":"k","\u1e33":"k","\u0137":"k","\u1e35":"k","\u0199":"k","\u2c6a":"k","\ua741":"k","\ua743":"k","\ua745":"k","\ua7a3":"k","\u24db":"l","\uff4c":"l","\u0140":"l","\u013a":"l","\u013e":"l","\u1e37":"l","\u1e39":"l","\u013c":"l","\u1e3d":"l","\u1e3b":"l","\u017f":"l","\u0142":"l","\u019a":"l","\u026b":"l","\u2c61":"l","\ua749":"l","\ua781":"l","\ua747":"l","\u01c9":"lj","\u24dc":"m","\uff4d":"m","\u1e3f":"m","\u1e41":"m","\u1e43":"m","\u0271":"m","\u026f":"m","\u24dd":"n","\uff4e":"n","\u01f9":"n","\u0144":"n","\xf1":"n","\u1e45":"n","\u0148":"n","\u1e47":"n","\u0146":"n","\u1e4b":"n","\u1e49":"n","\u019e":"n","\u0272":"n","\u0149":"n","\ua791":"n","\ua7a5":"n","\u01cc":"nj","\u24de":"o","\uff4f":"o","\xf2":"o","\xf3":"o","\xf4":"o","\u1ed3":"o","\u1ed1":"o","\u1ed7":"o","\u1ed5":"o","\xf5":"o","\u1e4d":"o","\u022d":"o","\u1e4f":"o","\u014d":"o","\u1e51":"o","\u1e53":"o","\u014f":"o","\u022f":"o","\u0231":"o","\xf6":"o","\u022b":"o","\u1ecf":"o","\u0151":"o","\u01d2":"o","\u020d":"o","\u020f":"o","\u01a1":"o","\u1edd":"o","\u1edb":"o","\u1ee1":"o","\u1edf":"o","\u1ee3":"o","\u1ecd":"o","\u1ed9":"o","\u01eb":"o","\u01ed":"o","\xf8":"o","\u01ff":"o","\u0254":"o","\ua74b":"o","\ua74d":"o","\u0275":"o","\u01a3":"oi","\u0223":"ou","\ua74f":"oo","\u24df":"p","\uff50":"p","\u1e55":"p","\u1e57":"p","\u01a5":"p","\u1d7d":"p","\ua751":"p","\ua753":"p","\ua755":"p","\u24e0":"q","\uff51":"q","\u024b":"q","\ua757":"q","\ua759":"q","\u24e1":"r","\uff52":"r","\u0155":"r","\u1e59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1e5b":"r","\u1e5d":"r","\u0157":"r","\u1e5f":"r","\u024d":"r","\u027d":"r","\ua75b":"r","\ua7a7":"r","\ua783":"r","\u24e2":"s","\uff53":"s","\xdf":"s","\u015b":"s","\u1e65":"s","\u015d":"s","\u1e61":"s","\u0161":"s","\u1e67":"s","\u1e63":"s","\u1e69":"s","\u0219":"s","\u015f":"s","\u023f":"s","\ua7a9":"s","\ua785":"s","\u1e9b":"s","\u24e3":"t","\uff54":"t","\u1e6b":"t","\u1e97":"t","\u0165":"t","\u1e6d":"t","\u021b":"t","\u0163":"t","\u1e71":"t","\u1e6f":"t","\u0167":"t","\u01ad":"t","\u0288":"t","\u2c66":"t","\ua787":"t","\ua729":"tz","\u24e4":"u","\uff55":"u","\xf9":"u","\xfa":"u","\xfb":"u","\u0169":"u","\u1e79":"u","\u016b":"u","\u1e7b":"u","\u016d":"u","\xfc":"u","\u01dc":"u","\u01d8":"u","\u01d6":"u","\u01da":"u","\u1ee7":"u","\u016f":"u","\u0171":"u","\u01d4":"u","\u0215":"u","\u0217":"u","\u01b0":"u","\u1eeb":"u","\u1ee9":"u","\u1eef":"u","\u1eed":"u","\u1ef1":"u","\u1ee5":"u","\u1e73":"u","\u0173":"u","\u1e77":"u","\u1e75":"u","\u0289":"u","\u24e5":"v","\uff56":"v","\u1e7d":"v","\u1e7f":"v","\u028b":"v","\ua75f":"v","\u028c":"v","\ua761":"vy","\u24e6":"w","\uff57":"w","\u1e81":"w","\u1e83":"w","\u0175":"w","\u1e87":"w","\u1e85":"w","\u1e98":"w","\u1e89":"w","\u2c73":"w","\u24e7":"x","\uff58":"x","\u1e8b":"x","\u1e8d":"x","\u24e8":"y","\uff59":"y","\u1ef3":"y","\xfd":"y","\u0177":"y","\u1ef9":"y","\u0233":"y","\u1e8f":"y","\xff":"y","\u1ef7":"y","\u1e99":"y","\u1ef5":"y","\u01b4":"y","\u024f":"y","\u1eff":"y","\u24e9":"z","\uff5a":"z","\u017a":"z","\u1e91":"z","\u017c":"z","\u017e":"z","\u1e93":"z","\u1e95":"z","\u01b6":"z","\u0225":"z","\u0240":"z","\u2c6c":"z","\ua763":"z","\u0386":"\u0391","\u0388":"\u0395","\u0389":"\u0397","\u038a":"\u0399","\u03aa":"\u0399","\u038c":"\u039f","\u038e":"\u03a5","\u03ab":"\u03a5","\u038f":"\u03a9","\u03ac":"\u03b1","\u03ad":"\u03b5","\u03ae":"\u03b7","\u03af":"\u03b9","\u03ca":"\u03b9","\u0390":"\u03b9","\u03cc":"\u03bf","\u03cd":"\u03c5","\u03cb":"\u03c5","\u03b0":"\u03c5","\u03c9":"\u03c9","\u03c2":"\u03c3"};j=a(document),g=function(){var a=1;return function(){return a++}}(),d=O(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(c){var d,e,f=".select2-results";this.opts=c=this.prepareOpts(c),this.id=c.id,c.element.data("select2")!==b&&null!==c.element.data("select2")&&c.element.data("select2").destroy(),this.container=this.createContainer(),this.liveRegion=a("<span>",{role:"status","aria-live":"polite"}).addClass("select2-hidden-accessible").appendTo(document.body),this.containerId="s2id_"+(c.element.attr("id")||"autogen"+g()),this.containerEventName=this.containerId.replace(/([.])/g,"_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.container.attr("title",c.element.attr("title")),this.body=a("body"),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.attr("style",c.element.attr("style")),this.container.css(K(c.containerCss,this.opts.element)),this.container.addClass(K(c.containerCssClass,this.opts.element)),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.element.data("select2",this).attr("tabindex","-1").before(this.container).on("click.select2",A),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(c.dropdownCssClass,this.opts.element)),this.dropdown.data("select2",this),this.dropdown.on("click",A),this.results=d=this.container.find(f),this.search=e=this.container.find("input.select2-input"),this.queryCount=0,this.resultsPage=0,this.context=null,this.initContainer(),this.container.on("click",A),v(this.results),this.dropdown.on("mousemove-filtered",f,this.bind(this.highlightUnderEvent)),this.dropdown.on("touchstart touchmove touchend",f,this.bind(function(a){this._touchEvent=!0,this.highlightUnderEvent(a)})),this.dropdown.on("touchmove",f,this.bind(this.touchMoved)),this.dropdown.on("touchstart touchend",f,this.bind(this.clearTouchMoved)),this.dropdown.on("click",this.bind(function(){this._touchEvent&&(this._touchEvent=!1,this.selectHighlighted())})),x(80,this.results),this.dropdown.on("scroll-debounced",f,this.bind(this.loadMoreIfNeeded)),a(this.container).on("change",".select2-input",function(a){a.stopPropagation()}),a(this.dropdown).on("change",".select2-input",function(a){a.stopPropagation()}),a.fn.mousewheel&&d.mousewheel(function(a,b,c,e){var f=d.scrollTop();e>0&&0>=f-e?(d.scrollTop(0),A(a)):0>e&&d.get(0).scrollHeight-d.scrollTop()+e<=d.height()&&(d.scrollTop(d.get(0).scrollHeight-d.height()),A(a))}),u(e),e.on("keyup-change input paste",this.bind(this.updateResults)),e.on("focus",function(){e.addClass("select2-focused")}),e.on("blur",function(){e.removeClass("select2-focused")}),this.dropdown.on("mouseup",f,this.bind(function(b){a(b.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(b),this.selectHighlighted(b))})),this.dropdown.on("click mouseup mousedown touchstart touchend focusin",function(a){a.stopPropagation()}),this.nextSearchTerm=b,a.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),null!==c.maximumInputLength&&this.search.attr("maxlength",c.maximumInputLength);var h=c.element.prop("disabled");h===b&&(h=!1),this.enable(!h);var i=c.element.prop("readonly");i===b&&(i=!1),this.readonly(i),k=k||q(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this.focus(),this.search.attr("placeholder",c.searchInputPlaceholder)},destroy:function(){var a=this.opts.element,c=a.data("select2"),d=this;this.close(),a.length&&a[0].detachEvent&&a.each(function(){this.detachEvent("onpropertychange",d._sync)}),this.propertyObserver&&(this.propertyObserver.disconnect(),this.propertyObserver=null),this._sync=null,c!==b&&(c.container.remove(),c.liveRegion.remove(),c.dropdown.remove(),a.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus",this.autofocus||!1),this.elementTabIndex?a.attr({tabindex:this.elementTabIndex}):a.removeAttr("tabindex"),a.show()),N.call(this,"container","liveRegion","dropdown","results","search")},optionToData:function(a){return a.is("option")?{id:a.prop("value"),text:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:r(a.attr("locked"),"locked")||r(a.data("locked"),!0)}:a.is("optgroup")?{text:a.attr("label"),children:[],element:a.get(),css:a.attr("class")}:void 0},prepareOpts:function(c){var d,e,f,h,i=this;if(d=c.element,"select"===d.get(0).tagName.toLowerCase()&&(this.select=e=c.element),e&&a.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in c)throw new Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")}),c=a.extend({},{populateResults:function(d,e,f){var h,j=this.opts.id,k=this.liveRegion;h=function(d,e,l){var m,n,o,p,q,r,s,t,u,v;d=c.sortResults(d,e,f);var w=[];for(m=0,n=d.length;n>m;m+=1)o=d[m],q=o.disabled===!0,p=!q&&j(o)!==b,r=o.children&&o.children.length>0,s=a("<li></li>"),s.addClass("select2-results-dept-"+l),s.addClass("select2-result"),s.addClass(p?"select2-result-selectable":"select2-result-unselectable"),q&&s.addClass("select2-disabled"),r&&s.addClass("select2-result-with-children"),s.addClass(i.opts.formatResultCssClass(o)),s.attr("role","presentation"),t=a(document.createElement("div")),t.addClass("select2-result-label"),t.attr("id","select2-result-label-"+g()),t.attr("role","option"),v=c.formatResult(o,t,f,i.opts.escapeMarkup),v!==b&&(t.html(v),s.append(t)),r&&(u=a("<ul></ul>"),u.addClass("select2-result-sub"),h(o.children,u,l+1),s.append(u)),s.data("select2-data",o),w.push(s[0]);e.append(w),k.text(c.formatMatches(d.length))},h(e,d,0)}},a.fn.select2.defaults,c),"function"!=typeof c.id&&(f=c.id,c.id=function(a){return a[f]}),a.isArray(c.element.data("select2Tags"))){if("tags"in c)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+c.element.attr("id");c.tags=c.element.data("select2Tags")}if(e?(c.query=this.bind(function(a){var f,g,h,c={results:[],more:!1},e=a.term;h=function(b,c){var d;b.is("option")?a.matcher(e,b.text(),b)&&c.push(i.optionToData(b)):b.is("optgroup")&&(d=i.optionToData(b),b.children().each2(function(a,b){h(b,d.children)}),d.children.length>0&&c.push(d))},f=d.children(),this.getPlaceholder()!==b&&f.length>0&&(g=this.getPlaceholderOption(),g&&(f=f.not(g))),f.each2(function(a,b){h(b,c.results)}),a.callback(c)}),c.id=function(a){return a.id}):"query"in c||("ajax"in c?(h=c.element.data("ajax-url"),h&&h.length>0&&(c.ajax.url=h),c.query=G.call(c.element,c.ajax)):"data"in c?c.query=H(c.data):"tags"in c&&(c.query=I(c.tags),c.createSearchChoice===b&&(c.createSearchChoice=function(b){return{id:a.trim(b),text:a.trim(b)}}),c.initSelection===b&&(c.initSelection=function(b,d){var e=[];a(s(b.val(),c.separator)).each(function(){var b={id:this,text:this},d=c.tags;a.isFunction(d)&&(d=d()),a(d).each(function(){return r(this.id,b.id)?(b=this,!1):void 0}),e.push(b)}),d(e)}))),"function"!=typeof c.query)throw"query function not defined for Select2 "+c.element.attr("id");if("top"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.unshift(b)};else if("bottom"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.push(b)};else if("function"!=typeof c.createSearchChoicePosition)throw"invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";return c},monitorSource:function(){var d,c=this.opts.element,e=this;c.on("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()})),this._sync=this.bind(function(){var a=c.prop("disabled");a===b&&(a=!1),this.enable(!a);var d=c.prop("readonly");d===b&&(d=!1),this.readonly(d),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(K(this.opts.containerCssClass,this.opts.element)),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(this.opts.dropdownCssClass,this.opts.element))}),c.length&&c[0].attachEvent&&c.each(function(){this.attachEvent("onpropertychange",e._sync)}),d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,d!==b&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new d(function(b){a.each(b,e._sync)}),this.propertyObserver.observe(c.get(0),{attributes:!0,subtree:!1}))},triggerSelect:function(b){var c=a.Event("select2-selecting",{val:this.id(b),object:b,choice:b});return this.opts.element.trigger(c),!c.isDefaultPrevented()},triggerChange:function(b){b=b||{},b=a.extend({},b,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(b),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()},isInterfaceEnabled:function(){return this.enabledInterface===!0},enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a===this.enabledInterface?!1:(this.container.toggleClass("select2-container-disabled",b),this.close(),this.enabledInterface=a,!0)},enable:function(a){a===b&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.enableInterface())},disable:function(){this.enable(!1)},readonly:function(a){a===b&&(a=!1),this._readonly!==a&&(this._readonly=a,this.opts.element.prop("readonly",a),this.enableInterface())},opened:function(){return this.container?this.container.hasClass("select2-dropdown-open"):!1},positionDropdown:function(){var t,u,v,w,x,b=this.dropdown,c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),g=a(window),h=g.width(),i=g.height(),j=g.scrollLeft()+h,l=g.scrollTop()+i,m=c.top+d,n=c.left,o=l>=m+f,p=c.top-f>=g.scrollTop(),q=b.outerWidth(!1),r=j>=n+q,s=b.hasClass("select2-drop-above");s?(u=!0,!p&&o&&(v=!0,u=!1)):(u=!1,!o&&p&&(v=!0,u=!0)),v&&(b.hide(),c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),j=g.scrollLeft()+h,l=g.scrollTop()+i,m=c.top+d,n=c.left,q=b.outerWidth(!1),r=j>=n+q,b.show(),this.focusSearch()),this.opts.dropdownAutoWidth?(x=a(".select2-results",b)[0],b.addClass("select2-drop-auto-width"),b.css("width",""),q=b.outerWidth(!1)+(x.scrollHeight===x.clientHeight?0:k.width),q>e?e=q:q=e,f=b.outerHeight(!1),r=j>=n+q):this.container.removeClass("select2-drop-auto-width"),"static"!==this.body.css("position")&&(t=this.body.offset(),m-=t.top,n-=t.left),r||(n=c.left+this.container.outerWidth(!1)-q),w={left:n,width:e},u?(w.top=c.top-f,w.bottom="auto",this.container.addClass("select2-drop-above"),b.addClass("select2-drop-above")):(w.top=m,w.bottom="auto",this.container.removeClass("select2-drop-above"),b.removeClass("select2-drop-above")),w=a.extend(w,K(this.opts.dropdownCss,this.opts.element)),b.css(w)},shouldOpen:function(){var b;return this.opened()?!1:this._enabled===!1||this._readonly===!0?!1:(b=a.Event("select2-opening"),this.opts.element.trigger(b),!b.isDefaultPrevented())},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")},open:function(){return this.shouldOpen()?(this.opening(),j.on("mousemove.select2Event",function(a){i.x=a.pageX,i.y=a.pageY}),!0):!1},opening:function(){var f,b=this.containerEventName,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body.children().last()[0]&&this.dropdown.detach().appendTo(this.body),f=a("#select2-drop-mask"),0==f.length&&(f=a(document.createElement("div")),f.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),f.hide(),f.appendTo(this.body),f.on("mousedown touchstart click",function(b){n(f);var d,c=a("#select2-drop");c.length>0&&(d=c.data("select2"),d.opts.selectOnBlur&&d.selectHighlighted({noFocus:!0}),d.close(),b.preventDefault(),b.stopPropagation())})),this.dropdown.prev()[0]!==f[0]&&this.dropdown.before(f),a("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),f.show(),this.positionDropdown(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active");var g=this;this.container.parents().add(window).each(function(){a(this).on(d+" "+c+" "+e,function(){g.opened()&&g.positionDropdown()})})},close:function(){if(this.opened()){var b=this.containerEventName,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.parents().add(window).each(function(){a(this).off(c).off(d).off(e)}),this.clearDropdownAlignmentPreference(),a("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),this.results.empty(),j.off("mousemove.select2Event"),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(a.Event("select2-close"))}},externalSearch:function(a){this.open(),this.search.val(a),this.updateResults(!1)},clearSearch:function(){},getMaximumSelectionSize:function(){return K(this.opts.maximumSelectionSize,this.opts.element)},ensureHighlightVisible:function(){var c,d,e,f,g,h,i,j,b=this.results;if(d=this.highlight(),!(0>d)){if(0==d)return b.scrollTop(0),void 0;c=this.findHighlightableChoices().find(".select2-result-label"),e=a(c[d]),j=(e.offset()||{}).top||0,f=j+e.outerHeight(!0),d===c.length-1&&(i=b.find("li.select2-more-results"),i.length>0&&(f=i.offset().top+i.outerHeight(!0))),g=b.offset().top+b.outerHeight(!0),f>g&&b.scrollTop(b.scrollTop()+(f-g)),h=j-b.offset().top,0>h&&"none"!=e.css("display")&&b.scrollTop(b.scrollTop()+h)}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")},moveHighlight:function(b){for(var c=this.findHighlightableChoices(),d=this.highlight();d>-1&&d<c.length;){d+=b;var e=a(c[d]);if(e.hasClass("select2-result-selectable")&&!e.hasClass("select2-disabled")&&!e.hasClass("select2-selected")){this.highlight(d);
	break}}},highlight:function(b){var d,e,c=this.findHighlightableChoices();return 0===arguments.length?p(c.filter(".select2-highlighted")[0],c.get()):(b>=c.length&&(b=c.length-1),0>b&&(b=0),this.removeHighlight(),d=a(c[b]),d.addClass("select2-highlighted"),this.search.attr("aria-activedescendant",d.find(".select2-result-label").attr("id")),this.ensureHighlightVisible(),this.liveRegion.text(d.text()),e=d.data("select2-data"),e&&this.opts.element.trigger({type:"select2-highlight",val:this.id(e),choice:e}),void 0)},removeHighlight:function(){this.results.find(".select2-highlighted").removeClass("select2-highlighted")},touchMoved:function(){this._touchMoved=!0},clearTouchMoved:function(){this._touchMoved=!1},countSelectableResults:function(){return this.findHighlightableChoices().length},highlightUnderEvent:function(b){var c=a(b.target).closest(".select2-result-selectable");if(c.length>0&&!c.is(".select2-highlighted")){var d=this.findHighlightableChoices();this.highlight(d.index(c))}else 0==c.length&&this.removeHighlight()},loadMoreIfNeeded:function(){var c,a=this.results,b=a.find("li.select2-more-results"),d=this.resultsPage+1,e=this,f=this.search.val(),g=this.context;0!==b.length&&(c=b.offset().top-a.offset().top-a.height(),c<=this.opts.loadMorePadding&&(b.addClass("select2-active"),this.opts.query({element:this.opts.element,term:f,page:d,context:g,matcher:this.opts.matcher,callback:this.bind(function(c){e.opened()&&(e.opts.populateResults.call(this,a,c.results,{term:f,page:d,context:g}),e.postprocessResults(c,!1,!1),c.more===!0?(b.detach().appendTo(a).text(K(e.opts.formatLoadMore,e.opts.element,d+1)),window.setTimeout(function(){e.loadMoreIfNeeded()},10)):b.remove(),e.positionDropdown(),e.resultsPage=d,e.context=c.context,this.opts.element.trigger({type:"select2-loaded",items:c}))})})))},tokenize:function(){},updateResults:function(c){function m(){d.removeClass("select2-active"),h.positionDropdown(),e.find(".select2-no-results,.select2-selection-limit,.select2-searching").length?h.liveRegion.text(e.text()):h.liveRegion.text(h.opts.formatMatches(e.find(".select2-result-selectable").length))}function n(a){e.html(a),m()}var g,i,l,d=this.search,e=this.results,f=this.opts,h=this,j=d.val(),k=a.data(this.container,"select2-last-term");if((c===!0||!k||!r(j,k))&&(a.data(this.container,"select2-last-term",j),c===!0||this.showSearchInput!==!1&&this.opened())){l=++this.queryCount;var o=this.getMaximumSelectionSize();if(o>=1&&(g=this.data(),a.isArray(g)&&g.length>=o&&J(f.formatSelectionTooBig,"formatSelectionTooBig")))return n("<li class='select2-selection-limit'>"+K(f.formatSelectionTooBig,f.element,o)+"</li>"),void 0;if(d.val().length<f.minimumInputLength)return J(f.formatInputTooShort,"formatInputTooShort")?n("<li class='select2-no-results'>"+K(f.formatInputTooShort,f.element,d.val(),f.minimumInputLength)+"</li>"):n(""),c&&this.showSearch&&this.showSearch(!0),void 0;if(f.maximumInputLength&&d.val().length>f.maximumInputLength)return J(f.formatInputTooLong,"formatInputTooLong")?n("<li class='select2-no-results'>"+K(f.formatInputTooLong,f.element,d.val(),f.maximumInputLength)+"</li>"):n(""),void 0;f.formatSearching&&0===this.findHighlightableChoices().length&&n("<li class='select2-searching'>"+K(f.formatSearching,f.element)+"</li>"),d.addClass("select2-active"),this.removeHighlight(),i=this.tokenize(),i!=b&&null!=i&&d.val(i),this.resultsPage=1,f.query({element:f.element,term:d.val(),page:this.resultsPage,context:null,matcher:f.matcher,callback:this.bind(function(g){var i;if(l==this.queryCount){if(!this.opened())return this.search.removeClass("select2-active"),void 0;if(g.hasError!==b&&J(f.formatAjaxError,"formatAjaxError"))return n("<li class='select2-ajax-error'>"+K(f.formatAjaxError,f.element,g.jqXHR,g.textStatus,g.errorThrown)+"</li>"),void 0;if(this.context=g.context===b?null:g.context,this.opts.createSearchChoice&&""!==d.val()&&(i=this.opts.createSearchChoice.call(h,d.val(),g.results),i!==b&&null!==i&&h.id(i)!==b&&null!==h.id(i)&&0===a(g.results).filter(function(){return r(h.id(this),h.id(i))}).length&&this.opts.createSearchChoicePosition(g.results,i)),0===g.results.length&&J(f.formatNoMatches,"formatNoMatches"))return n("<li class='select2-no-results'>"+K(f.formatNoMatches,f.element,d.val())+"</li>"),void 0;e.empty(),h.opts.populateResults.call(this,e,g.results,{term:d.val(),page:this.resultsPage,context:null}),g.more===!0&&J(f.formatLoadMore,"formatLoadMore")&&(e.append("<li class='select2-more-results'>"+f.escapeMarkup(K(f.formatLoadMore,f.element,this.resultsPage))+"</li>"),window.setTimeout(function(){h.loadMoreIfNeeded()},10)),this.postprocessResults(g,c),m(),this.opts.element.trigger({type:"select2-loaded",items:g})}})})}},cancel:function(){this.close()},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){y(this.search)},selectHighlighted:function(a){if(this._touchMoved)return this.clearTouchMoved(),void 0;var b=this.highlight(),c=this.results.find(".select2-highlighted"),d=c.closest(".select2-result").data("select2-data");d?(this.highlight(b),this.onSelect(d,a)):a&&a.noFocus&&this.close()},getPlaceholder:function(){var a;return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder||((a=this.getPlaceholderOption())!==b?a.text():b)},getPlaceholderOption:function(){if(this.select){var c=this.select.children("option").first();if(this.opts.placeholderOption!==b)return"first"===this.opts.placeholderOption&&c||"function"==typeof this.opts.placeholderOption&&this.opts.placeholderOption(this.select);if(""===a.trim(c.text())&&""===c.val())return c}},initContainerWidth:function(){function c(){var c,d,e,f,g,h;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){if(c=this.opts.element.attr("style"),c!==b)for(d=c.split(";"),f=0,g=d.length;g>f;f+=1)if(h=d[f].replace(/\s/g,""),e=h.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i),null!==e&&e.length>=1)return e[1];return"resolve"===this.opts.width?(c=this.opts.element.css("width"),c.indexOf("%")>0?c:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null}return a.isFunction(this.opts.width)?this.opts.width():this.opts.width}var d=c.call(this);null!==d&&this.container.css("width",d)}}),e=O(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>","   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>","   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>","</a>","<label for='' class='select2-offscreen'></label>","<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />","<div class='select2-drop select2-display-none'>","   <div class='select2-search'>","       <label for='' class='select2-offscreen'></label>","       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'","       aria-autocomplete='list' />","   </div>","   <ul class='select2-results' role='listbox'>","   </ul>","</div>"].join(""));return b},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.focusser.prop("disabled",!this.isInterfaceEnabled())},opening:function(){var c,d,e;this.opts.minimumResultsForSearch>=0&&this.showSearch(!0),this.parent.opening.apply(this,arguments),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.opts.shouldFocusInput(this)&&(this.search.focus(),c=this.search.get(0),c.createTextRange?(d=c.createTextRange(),d.collapse(!1),d.select()):c.setSelectionRange&&(e=this.search.val().length,c.setSelectionRange(e,e))),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.focusser.prop("disabled",!0).val(""),this.updateResults(!0),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&(this.parent.close.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},focus:function(){this.opened()?this.close():(this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},isFocused:function(){return this.container.hasClass("select2-container-active")},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus()},destroy:function(){a("label[for='"+this.focusser.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),N.call(this,"selection","focusser")},initContainer:function(){var b,h,d=this.container,e=this.dropdown,f=g();this.opts.minimumResultsForSearch<0?this.showSearch(!1):this.showSearch(!0),this.selection=b=d.find(".select2-choice"),this.focusser=d.find(".select2-focusser"),b.find(".select2-chosen").attr("id","select2-chosen-"+f),this.focusser.attr("aria-labelledby","select2-chosen-"+f),this.results.attr("id","select2-results-"+f),this.search.attr("aria-owns","select2-results-"+f),this.focusser.attr("id","s2id_autogen"+f),h=a("label[for='"+this.opts.element.attr("id")+"']"),this.focusser.prev().text(h.text()).attr("for",this.focusser.attr("id"));var i=this.opts.element.attr("title");this.opts.element.attr("title",i||h.text()),this.focusser.attr("tabindex",this.elementTabIndex),this.search.attr("id",this.focusser.attr("id")+"_search"),this.search.prev().text(a("label[for='"+this.focusser.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&229!=a.keyCode){if(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)return A(a),void 0;switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),void 0;case c.ESC:return this.cancel(a),A(a),void 0}}})),this.search.on("blur",this.bind(function(){document.activeElement===this.body.get(0)&&window.setTimeout(this.bind(function(){this.opened()&&this.search.focus()}),0)})),this.focusser.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.ESC){if(this.opts.openOnEnter===!1&&a.which===c.ENTER)return A(a),void 0;if(a.which==c.DOWN||a.which==c.UP||a.which==c.ENTER&&this.opts.openOnEnter){if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return;return this.open(),A(a),void 0}return a.which==c.DELETE||a.which==c.BACKSPACE?(this.opts.allowClear&&this.clear(),A(a),void 0):void 0}})),u(this.focusser),this.focusser.on("keyup-change input",this.bind(function(a){if(this.opts.minimumResultsForSearch>=0){if(a.stopPropagation(),this.opened())return;this.open()}})),b.on("mousedown touchstart","abbr",this.bind(function(a){this.isInterfaceEnabled()&&(this.clear(),B(a),this.close(),this.selection.focus())})),b.on("mousedown touchstart",this.bind(function(c){n(b),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.opened()?this.close():this.isInterfaceEnabled()&&this.open(),A(c)})),e.on("mousedown touchstart",this.bind(function(){this.opts.shouldFocusInput(this)&&this.search.focus()})),b.on("focus",this.bind(function(a){A(a)})),this.focusser.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})).on("blur",this.bind(function(){this.opened()||(this.container.removeClass("select2-container-active"),this.opts.element.trigger(a.Event("select2-blur")))})),this.search.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.setPlaceholder()},clear:function(b){var c=this.selection.data("select2-data");if(c){var d=a.Event("select2-clearing");if(this.opts.element.trigger(d),d.isDefaultPrevented())return;var e=this.getPlaceholderOption();this.opts.element.val(e?e.val():""),this.selection.find(".select2-chosen").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),b!==!1&&(this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}))}},initSelection:function(){if(this.isPlaceholderOptionSelected())this.updateSelection(null),this.close(),this.setPlaceholder();else{var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.setPlaceholder(),c.nextSearchTerm=c.opts.nextSearchTerm(a,c.search.val()))})}},isPlaceholderOptionSelected:function(){var a;return this.getPlaceholder()===b?!1:(a=this.getPlaceholderOption())!==b&&a.prop("selected")||""===this.opts.element.val()||this.opts.element.val()===b||null===this.opts.element.val()},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=a.find("option").filter(function(){return this.selected&&!this.disabled});b(c.optionToData(d))}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=c.val(),f=null;b.query({matcher:function(a,c,d){var g=r(e,b.id(d));return g&&(f=d),g},callback:a.isFunction(d)?function(){d(f)}:a.noop})}),b},getPlaceholder:function(){return this.select&&this.getPlaceholderOption()===b?b:this.parent.getPlaceholder.apply(this,arguments)},setPlaceholder:function(){var a=this.getPlaceholder();if(this.isPlaceholderOptionSelected()&&a!==b){if(this.select&&this.getPlaceholderOption()===b)return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.container.removeClass("select2-allowclear")}},postprocessResults:function(a,b,c){var d=0,e=this;if(this.findHighlightableChoices().each2(function(a,b){return r(e.id(b.data("select2-data")),e.opts.element.val())?(d=a,!1):void 0}),c!==!1&&(b===!0&&d>=0?this.highlight(d):this.highlight(0)),b===!0){var g=this.opts.minimumResultsForSearch;g>=0&&this.showSearch(L(a.results)>=g)}},showSearch:function(b){this.showSearchInput!==b&&(this.showSearchInput=b,this.dropdown.find(".select2-search").toggleClass("select2-search-hidden",!b),this.dropdown.find(".select2-search").toggleClass("select2-offscreen",!b),a(this.dropdown,this.container).toggleClass("select2-with-searchbox",b))},onSelect:function(a,b){if(this.triggerSelect(a)){var c=this.opts.element.val(),d=this.data();this.opts.element.val(this.id(a)),this.updateSelection(a),this.opts.element.trigger({type:"select2-selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.close(),b&&b.noFocus||!this.opts.shouldFocusInput(this)||this.focusser.focus(),r(c,this.id(a))||this.triggerChange({added:a,removed:d})}},updateSelection:function(a){var d,e,c=this.selection.find(".select2-chosen");this.selection.data("select2-data",a),c.empty(),null!==a&&(d=this.opts.formatSelection(a,c,this.opts.escapeMarkup)),d!==b&&c.append(d),e=this.opts.formatSelectionCssClass(a,c),e!==b&&c.addClass(e),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==b&&this.container.addClass("select2-allowclear")},val:function(){var a,c=!1,d=null,e=this,f=this.data();if(0===arguments.length)return this.opts.element.val();if(a=arguments[0],arguments.length>1&&(c=arguments[1]),this.select)this.select.val(a).find("option").filter(function(){return this.selected}).each2(function(a,b){return d=e.optionToData(b),!1}),this.updateSelection(d),this.setPlaceholder(),c&&this.triggerChange({added:d,removed:f});else{if(!a&&0!==a)return this.clear(c),void 0;if(this.opts.initSelection===b)throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){e.opts.element.val(a?e.id(a):""),e.updateSelection(a),e.setPlaceholder(),c&&e.triggerChange({added:a,removed:f})})}},clearSearch:function(){this.search.val(""),this.focusser.val("")},data:function(a){var c,d=!1;return 0===arguments.length?(c=this.selection.data("select2-data"),c==b&&(c=null),c):(arguments.length>1&&(d=arguments[1]),a?(c=this.data(),this.opts.element.val(a?this.id(a):""),this.updateSelection(a),d&&this.triggerChange({added:a,removed:c})):this.clear(d),void 0)}}),f=O(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["<ul class='select2-choices'>","  <li class='select2-search-field'>","    <label for='' class='select2-offscreen'></label>","    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi select2-display-none'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=[];a.find("option").filter(function(){return this.selected&&!this.disabled}).each2(function(a,b){d.push(c.optionToData(b))}),b(d)}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=s(c.val(),b.separator),f=[];b.query({matcher:function(c,d,g){var h=a.grep(e,function(a){return r(a,b.id(g))}).length;return h&&f.push(g),h},callback:a.isFunction(d)?function(){for(var a=[],c=0;c<e.length;c++)for(var g=e[c],h=0;h<f.length;h++){var i=f[h];if(r(g,b.id(i))){a.push(i),f.splice(h,1);break}}d(a)}:a.noop})}),b},selectChoice:function(a){var b=this.container.find(".select2-search-choice-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("select2-search-choice-focus"),a&&a.length&&(this.close(),a.addClass("select2-search-choice-focus"),this.opts.element.trigger("choice-selected",a)))},destroy:function(){a("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),N.call(this,"searchContainer","selection")},initContainer:function(){var d,b=".select2-choices";this.searchContainer=this.container.find(".select2-search-field"),this.selection=d=this.container.find(b);var e=this;this.selection.on("click",".select2-search-choice:not(.select2-locked)",function(){e.search[0].focus(),e.selectChoice(a(this))}),this.search.attr("id","s2id_autogen"+g()),this.search.prev().text(a("label[for='"+this.opts.element.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.search.on("input paste",this.bind(function(){this.search.attr("placeholder")&&0==this.search.val().length||this.isInterfaceEnabled()&&(this.opened()||this.open())})),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){++this.keydowns;var b=d.find(".select2-search-choice-focus"),e=b.prev(".select2-search-choice:not(.select2-locked)"),f=b.next(".select2-search-choice:not(.select2-locked)"),g=z(this.search);if(b.length&&(a.which==c.LEFT||a.which==c.RIGHT||a.which==c.BACKSPACE||a.which==c.DELETE||a.which==c.ENTER)){var h=b;return a.which==c.LEFT&&e.length?h=e:a.which==c.RIGHT?h=f.length?f:null:a.which===c.BACKSPACE?this.unselect(b.first())&&(this.search.width(10),h=e.length?e:f):a.which==c.DELETE?this.unselect(b.first())&&(this.search.width(10),h=f.length?f:null):a.which==c.ENTER&&(h=null),this.selectChoice(h),A(a),h&&h.length||this.open(),void 0}if((a.which===c.BACKSPACE&&1==this.keydowns||a.which==c.LEFT)&&0==g.offset&&!g.length)return this.selectChoice(d.find(".select2-search-choice:not(.select2-locked)").last()),A(a),void 0;if(this.selectChoice(null),this.opened())switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),this.close(),void 0;case c.ESC:return this.cancel(a),A(a),void 0}if(a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.BACKSPACE&&a.which!==c.ESC){if(a.which===c.ENTER){if(this.opts.openOnEnter===!1)return;if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return}this.open(),(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)&&A(a),a.which===c.ENTER&&A(a)}}})),this.search.on("keyup",this.bind(function(){this.keydowns=0,this.resizeSearch()})),this.search.on("blur",this.bind(function(b){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.selectChoice(null),this.opened()||this.clearSearch(),b.stopImmediatePropagation(),this.opts.element.trigger(a.Event("select2-blur"))})),this.container.on("click",b,this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").length>0||(this.selectChoice(null),this.clearPlaceholder(),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.open(),this.focusSearch(),b.preventDefault()))})),this.container.on("focus",b,this.bind(function(){this.isInterfaceEnabled()&&(this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.clearSearch()},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this.isInterfaceEnabled())},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.clearSearch())})}},clearSearch:function(){var a=this.getPlaceholder(),c=this.getMaxSearchWidth();a!==b&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(a).addClass("select2-default"),this.search.width(c>0?c:this.container.css("width"))):this.search.val("").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.updateResults(!0),this.opts.shouldFocusInput(this)&&this.search.focus(),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&this.parent.close.apply(this,arguments)},focus:function(){this.close(),this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(b){var c=[],d=[],e=this;a(b).each(function(){p(e.id(this),c)<0&&(c.push(e.id(this)),d.push(this))}),b=d,this.selection.find(".select2-search-choice").remove(),a(b).each(function(){e.addSelectedChoice(this)}),e.postprocessResults()},tokenize:function(){var a=this.search.val();a=this.opts.tokenizer.call(this,a,this.data(),this.bind(this.onSelect),this.opts),null!=a&&a!=b&&(this.search.val(a),a.length>0&&this.open())},onSelect:function(a,c){this.triggerSelect(a)&&""!==a.text&&(this.addSelectedChoice(a),this.opts.element.trigger({type:"selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.clearSearch(),this.updateResults(),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(a,!1,this.opts.closeOnSelect===!0),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()?this.updateResults(!0):this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.updateResults(),this.search.select()),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:a}),c&&c.noFocus||this.focusSearch())},cancel:function(){this.close(),this.focusSearch()},addSelectedChoice:function(c){var j,k,d=!c.locked,e=a("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),f=a("<li class='select2-search-choice select2-locked'><div></div></li>"),g=d?e:f,h=this.id(c),i=this.getVal();j=this.opts.formatSelection(c,g.find("div"),this.opts.escapeMarkup),j!=b&&g.find("div").replaceWith("<div>"+j+"</div>"),k=this.opts.formatSelectionCssClass(c,g.find("div")),k!=b&&g.addClass(k),d&&g.find(".select2-search-choice-close").on("mousedown",A).on("click dblclick",this.bind(function(b){this.isInterfaceEnabled()&&(this.unselect(a(b.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),A(b),this.close(),this.focusSearch())})).on("focus",this.bind(function(){this.isInterfaceEnabled()&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))})),g.data("select2-data",c),g.insertBefore(this.searchContainer),i.push(h),this.setVal(i)},unselect:function(b){var d,e,c=this.getVal();if(b=b.closest(".select2-search-choice"),0===b.length)throw"Invalid argument: "+b+". Must be .select2-search-choice";if(d=b.data("select2-data")){var f=a.Event("select2-removing");if(f.val=this.id(d),f.choice=d,this.opts.element.trigger(f),f.isDefaultPrevented())return!1;for(;(e=p(this.id(d),c))>=0;)c.splice(e,1),this.setVal(c),this.select&&this.postprocessResults();return b.remove(),this.opts.element.trigger({type:"select2-removed",val:this.id(d),choice:d}),this.triggerChange({removed:d}),!0}},postprocessResults:function(a,b,c){var d=this.getVal(),e=this.results.find(".select2-result"),f=this.results.find(".select2-result-with-children"),g=this;e.each2(function(a,b){var c=g.id(b.data("select2-data"));p(c,d)>=0&&(b.addClass("select2-selected"),b.find(".select2-result-selectable").addClass("select2-selected"))}),f.each2(function(a,b){b.is(".select2-result-selectable")||0!==b.find(".select2-result-selectable:not(.select2-selected)").length||b.addClass("select2-selected")}),-1==this.highlight()&&c!==!1&&g.highlight(0),!this.opts.createSearchChoice&&!e.filter(".select2-result:not(.select2-selected)").length>0&&(!a||a&&!a.more&&0===this.results.find(".select2-no-results").length)&&J(g.opts.formatNoMatches,"formatNoMatches")&&this.results.append("<li class='select2-no-results'>"+K(g.opts.formatNoMatches,g.opts.element,g.search.val())+"</li>")},getMaxSearchWidth:function(){return this.selection.width()-t(this.search)},resizeSearch:function(){var a,b,c,d,e,f=t(this.search);a=C(this.search)+10,b=this.search.offset().left,c=this.selection.width(),d=this.selection.offset().left,e=c-(b-d)-f,a>e&&(e=c-f),40>e&&(e=c-f),0>=e&&(e=a),this.search.width(Math.floor(e))},getVal:function(){var a;return this.select?(a=this.select.val(),null===a?[]:a):(a=this.opts.element.val(),s(a,this.opts.separator))},setVal:function(b){var c;this.select?this.select.val(b):(c=[],a(b).each(function(){p(this,c)<0&&c.push(this)}),this.opts.element.val(0===c.length?"":c.join(this.opts.separator)))},buildChangeDetails:function(a,b){for(var b=b.slice(0),a=a.slice(0),c=0;c<b.length;c++)for(var d=0;d<a.length;d++)r(this.opts.id(b[c]),this.opts.id(a[d]))&&(b.splice(c,1),c>0&&c--,a.splice(d,1),d--);return{added:b,removed:a}},val:function(c,d){var e,f=this;if(0===arguments.length)return this.getVal();if(e=this.data(),e.length||(e=[]),!c&&0!==c)return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),d&&this.triggerChange({added:this.data(),removed:e}),void 0;if(this.setVal(c),this.select)this.opts.initSelection(this.select,this.bind(this.updateSelection)),d&&this.triggerChange(this.buildChangeDetails(e,this.data()));else{if(this.opts.initSelection===b)throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,function(b){var c=a.map(b,f.id);f.setVal(c),f.updateSelection(b),f.clearSearch(),d&&f.triggerChange(f.buildChangeDetails(e,f.data()))})}this.clearSearch()},onSortStart:function(){if(this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0),this.searchContainer.hide()},onSortEnd:function(){var b=[],c=this;this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){b.push(c.opts.id(a(this).data("select2-data")))}),this.setVal(b),this.triggerChange()},data:function(b,c){var e,f,d=this;return 0===arguments.length?this.selection.children(".select2-search-choice").map(function(){return a(this).data("select2-data")}).get():(f=this.data(),b||(b=[]),e=a.map(b,function(a){return d.opts.id(a)}),this.setVal(e),this.updateSelection(b),this.clearSearch(),c&&this.triggerChange(this.buildChangeDetails(f,this.data())),void 0)}}),a.fn.select2=function(){var d,e,f,g,h,c=Array.prototype.slice.call(arguments,0),i=["val","destroy","opened","open","close","focus","isFocused","container","dropdown","onSortStart","onSortEnd","enable","disable","readonly","positionDropdown","data","search"],j=["opened","isFocused","container","dropdown"],k=["val","data"],l={search:"externalSearch"};return this.each(function(){if(0===c.length||"object"==typeof c[0])d=0===c.length?{}:a.extend({},c[0]),d.element=a(this),"select"===d.element.get(0).tagName.toLowerCase()?h=d.element.prop("multiple"):(h=d.multiple||!1,"tags"in d&&(d.multiple=h=!0)),e=h?new window.Select2["class"].multi:new window.Select2["class"].single,e.init(d);else{if("string"!=typeof c[0])throw"Invalid arguments to select2 plugin: "+c;if(p(c[0],i)<0)throw"Unknown method: "+c[0];if(g=b,e=a(this).data("select2"),e===b)return;if(f=c[0],"container"===f?g=e.container:"dropdown"===f?g=e.dropdown:(l[f]&&(f=l[f]),g=e[f].apply(e,c.slice(1))),p(c[0],j)>=0||p(c[0],k)>=0&&1==c.length)return!1}}),g===b?this:g},a.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c,d){var e=[];return E(a.text,c.term,e,d),e.join("")},formatSelection:function(a,c,d){return a?d(a.text):b},sortResults:function(a){return a},formatResultCssClass:function(a){return a.css},formatSelectionCssClass:function(){return b},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(a){return a==b?null:a.id},matcher:function(a,b){return o(""+b).toUpperCase().indexOf(o(""+a).toUpperCase())>=0},separator:",",tokenSeparators:[],tokenizer:M,escapeMarkup:F,blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(a){return a},adaptDropdownCssClass:function(){return null},nextSearchTerm:function(){return b},searchInputPlaceholder:"",createSearchChoicePosition:"top",shouldFocusInput:function(a){var b="ontouchstart"in window||navigator.msMaxTouchPoints>0;return b?a.opts.minimumResultsForSearch<0?!1:!0:!0}},a.fn.select2.locales=[],a.fn.select2.locales.en={formatMatches:function(a){return 1===a?"One result is available, press enter to select it.":a+" results are available, use up and down arrow keys to navigate."
	},formatNoMatches:function(){return"No matches found"},formatAjaxError:function(){return"Loading failed"},formatInputTooShort:function(a,b){var c=b-a.length;return"Please enter "+c+" or more character"+(1==c?"":"s")},formatInputTooLong:function(a,b){var c=a.length-b;return"Please delete "+c+" character"+(1==c?"":"s")},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results\u2026"},formatSearching:function(){return"Searching\u2026"}},a.extend(a.fn.select2.defaults,a.fn.select2.locales.en),a.fn.select2.ajaxDefaults={transport:a.ajax,params:{type:"GET",cache:!1,dataType:"json"}},window.Select2={query:{ajax:G,local:H,tags:I},util:{debounce:w,markMatch:E,escapeMarkup:F,stripDiacritics:o},"class":{"abstract":d,single:e,multi:f}}}}(jQuery);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./select2.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./select2.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, "/*\nVersion: 3.5.1 Timestamp: Tue Jul 22 18:58:56 EDT 2014\n*/\n.select2-container {\n    margin: 0;\n    position: relative;\n    display: inline-block;\n    /* inline-block for ie7 */\n    zoom: 1;\n    *display: inline;\n    vertical-align: middle;\n}\n\n.select2-container,\n.select2-drop,\n.select2-search,\n.select2-search input {\n  /*\n    Force border-box so that % widths fit the parent\n    container without overlap because of margin/padding.\n    More Info : http://www.quirksmode.org/css/box.html\n  */\n  -webkit-box-sizing: border-box; /* webkit */\n     -moz-box-sizing: border-box; /* firefox */\n          box-sizing: border-box; /* css3 */\n}\n\n.select2-container .select2-choice {\n    display: block;\n    height: 26px;\n    padding: 0 0 0 8px;\n    overflow: hidden;\n    position: relative;\n\n    border: 1px solid #aaa;\n    white-space: nowrap;\n    line-height: 26px;\n    color: #444;\n    text-decoration: none;\n\n    border-radius: 4px;\n\n    background-clip: padding-box;\n\n    -webkit-touch-callout: none;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n\n    background-color: #fff;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(0.5, #fff));\n    background-image: -webkit-linear-gradient(center bottom, #eee 0%, #fff 50%);\n    background-image: -moz-linear-gradient(center bottom, #eee 0%, #fff 50%);\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#ffffff', endColorstr = '#eeeeee', GradientType = 0);\n    background-image: linear-gradient(to top, #eee 0%, #fff 50%);\n}\n\nhtml[dir=\"rtl\"] .select2-container .select2-choice {\n    padding: 0 8px 0 0;\n}\n\n.select2-container.select2-drop-above .select2-choice {\n    border-bottom-color: #aaa;\n\n    border-radius: 0 0 4px 4px;\n\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(0.9, #fff));\n    background-image: -webkit-linear-gradient(center bottom, #eee 0%, #fff 90%);\n    background-image: -moz-linear-gradient(center bottom, #eee 0%, #fff 90%);\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#eeeeee', GradientType=0);\n    background-image: linear-gradient(to bottom, #eee 0%, #fff 90%);\n}\n\n.select2-container.select2-allowclear .select2-choice .select2-chosen {\n    margin-right: 42px;\n}\n\n.select2-container .select2-choice > .select2-chosen {\n    margin-right: 26px;\n    display: block;\n    overflow: hidden;\n\n    white-space: nowrap;\n\n    text-overflow: ellipsis;\n    float: none;\n    width: auto;\n}\n\nhtml[dir=\"rtl\"] .select2-container .select2-choice > .select2-chosen {\n    margin-left: 26px;\n    margin-right: 0;\n    margin-top: 3px;\n}\n\n.select2-container .select2-choice abbr {\n    display: none;\n    width: 12px;\n    height: 12px;\n    position: absolute;\n    right: 24px;\n    top: 8px;\n\n    font-size: 1px;\n    text-decoration: none;\n\n    border: 0;\n    background: url(" + __webpack_require__(37) + ") right top no-repeat;\n    cursor: pointer;\n    outline: 0;\n}\n\n.select2-container.select2-allowclear .select2-choice abbr {\n    display: inline-block;\n}\n\n.select2-container .select2-choice abbr:hover {\n    background-position: right -11px;\n    cursor: pointer;\n}\n\n.select2-drop-mask {\n    border: 0;\n    margin: 0;\n    padding: 0;\n    position: fixed;\n    left: 0;\n    top: 0;\n    min-height: 100%;\n    min-width: 100%;\n    height: auto;\n    width: auto;\n    opacity: 0;\n    z-index: 9998;\n    /* styles required for IE to work */\n    background-color: #fff;\n    filter: alpha(opacity=0);\n}\n\n.select2-drop {\n    width: 100%;\n    margin-top: -1px;\n    position: absolute;\n    z-index: 9999;\n    top: 100%;\n\n    background: #fff;\n    color: #000;\n    border: 1px solid #aaa;\n    border-top: 0;\n\n    border-radius: 0 0 4px 4px;\n\n    -webkit-box-shadow: 0 4px 5px rgba(0, 0, 0, .15);\n            box-shadow: 0 4px 5px rgba(0, 0, 0, .15);\n}\n\n.select2-drop.select2-drop-above {\n    margin-top: 1px;\n    border-top: 1px solid #aaa;\n    border-bottom: 0;\n\n    border-radius: 4px 4px 0 0;\n\n    -webkit-box-shadow: 0 -4px 5px rgba(0, 0, 0, .15);\n            box-shadow: 0 -4px 5px rgba(0, 0, 0, .15);\n}\n\n.select2-drop-active {\n    border: 1px solid #5897fb;\n    border-top: none;\n}\n\n.select2-drop.select2-drop-above.select2-drop-active {\n    border-top: 1px solid #5897fb;\n}\n\n.select2-drop-auto-width {\n    border-top: 1px solid #aaa;\n    width: auto;\n}\n\n.select2-drop-auto-width .select2-search {\n    padding-top: 4px;\n}\n\n.select2-container .select2-choice .select2-arrow {\n    display: inline-block;\n    width: 18px;\n    height: 100%;\n    position: absolute;\n    right: 0;\n    top: 0;\n\n    border-left: 1px solid #aaa;\n    border-radius: 0 4px 4px 0;\n\n    background-clip: padding-box;\n\n    background: #ccc;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #ccc), color-stop(0.6, #eee));\n    background-image: -webkit-linear-gradient(center bottom, #ccc 0%, #eee 60%);\n    background-image: -moz-linear-gradient(center bottom, #ccc 0%, #eee 60%);\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#eeeeee', endColorstr = '#cccccc', GradientType = 0);\n    background-image: linear-gradient(to top, #ccc 0%, #eee 60%);\n}\n\nhtml[dir=\"rtl\"] .select2-container .select2-choice .select2-arrow {\n    left: 0;\n    right: auto;\n\n    border-left: none;\n    border-right: 1px solid #e5e5e5;\n    border-radius: 4px 0 0 4px;\n    padding-right: 2px;\n}\n\n\n.select2-container .select2-choice .select2-arrow b {\n    display: block;\n    width: 100%;\n    height: 100%;\n    background: url(" + __webpack_require__(37) + ") no-repeat 0 1px;\n}\n\nhtml[dir=\"rtl\"] .select2-container .select2-choice .select2-arrow b {\n    background-position: 0px 1px;\n}\n\n.select2-search {\n    display: inline-block;\n    width: 100%;\n    min-height: 26px;\n    margin: 0;\n    padding-left: 4px;\n    padding-right: 4px;\n\n    position: relative;\n    z-index: 10000;\n\n    white-space: nowrap;\n}\n\n.select2-search input {\n    width: 100%;\n    height: auto !important;\n    min-height: 26px;\n    padding: 4px 20px 4px 5px;\n    margin: 0;\n\n    outline: 0;\n    font-family: sans-serif;\n    font-size: 1em;\n\n    border: 1px solid #aaa;\n    border-radius: 0;\n\n    -webkit-box-shadow: none;\n            box-shadow: none;\n\n    background: #fff url(" + __webpack_require__(37) + ") no-repeat 100% -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat 100% -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat 100% -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat 100% -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat 100% -22px;\n}\n\nhtml[dir=\"rtl\"] .select2-search input {\n    padding: 4px 5px 4px 20px;\n\n    background: #fff url(" + __webpack_require__(37) + ") no-repeat -37px -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat -37px -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat -37px -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat -37px -22px;\n    background: url(" + __webpack_require__(37) + ") no-repeat -37px -22px;\n}\n\n.select2-drop.select2-drop-above .select2-search input {\n    margin-top: 4px;\n}\n\n.select2-search input.select2-active {\n    background: #fff url(" + __webpack_require__(38) + ") no-repeat 100%;\n    background: url(" + __webpack_require__(38) + ") no-repeat 100%;\n    background: url(" + __webpack_require__(38) + ") no-repeat 100%;\n    background: url(" + __webpack_require__(38) + ") no-repeat 100%;\n    background: url(" + __webpack_require__(38) + ") no-repeat 100%;\n}\n\n.select2-container-active .select2-choice,\n.select2-container-active .select2-choices {\n    border: 1px solid #5897fb;\n    outline: none;\n\n    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .3);\n            box-shadow: 0 0 5px rgba(0, 0, 0, .3);\n}\n\n.select2-dropdown-open .select2-choice {\n    border-bottom-color: transparent;\n    -webkit-box-shadow: 0 1px 0 #fff inset;\n            box-shadow: 0 1px 0 #fff inset;\n\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n\n    background-color: #eee;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #fff), color-stop(0.5, #eee));\n    background-image: -webkit-linear-gradient(center bottom, #fff 0%, #eee 50%);\n    background-image: -moz-linear-gradient(center bottom, #fff 0%, #eee 50%);\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#ffffff', GradientType=0);\n    background-image: linear-gradient(to top, #fff 0%, #eee 50%);\n}\n\n.select2-dropdown-open.select2-drop-above .select2-choice,\n.select2-dropdown-open.select2-drop-above .select2-choices {\n    border: 1px solid #5897fb;\n    border-top-color: transparent;\n\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(0.5, #eee));\n    background-image: -webkit-linear-gradient(center top, #fff 0%, #eee 50%);\n    background-image: -moz-linear-gradient(center top, #fff 0%, #eee 50%);\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#ffffff', GradientType=0);\n    background-image: linear-gradient(to bottom, #fff 0%, #eee 50%);\n}\n\n.select2-dropdown-open .select2-choice .select2-arrow {\n    background: transparent;\n    border-left: none;\n    filter: none;\n}\nhtml[dir=\"rtl\"] .select2-dropdown-open .select2-choice .select2-arrow {\n    border-right: none;\n}\n\n.select2-dropdown-open .select2-choice .select2-arrow b {\n    background-position: -18px 1px;\n}\n\nhtml[dir=\"rtl\"] .select2-dropdown-open .select2-choice .select2-arrow b {\n    background-position: -16px 1px;\n}\n\n.select2-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n/* results */\n.select2-results {\n    max-height: 200px;\n    padding: 0 0 0 4px;\n    margin: 4px 4px 4px 0;\n    position: relative;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\nhtml[dir=\"rtl\"] .select2-results {\n    padding: 0 4px 0 0;\n    margin: 4px 0 4px 4px;\n}\n\n.select2-results ul.select2-result-sub {\n    margin: 0;\n    padding-left: 0;\n}\n\n.select2-results li {\n    list-style: none;\n    display: list-item;\n    background-image: none;\n}\n\n.select2-results li.select2-result-with-children > .select2-result-label {\n    font-weight: bold;\n}\n\n.select2-results .select2-result-label {\n    padding: 3px 7px 4px;\n    margin: 0;\n    cursor: pointer;\n\n    min-height: 1em;\n\n    -webkit-touch-callout: none;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n}\n\n.select2-results-dept-1 .select2-result-label { padding-left: 20px }\n.select2-results-dept-2 .select2-result-label { padding-left: 40px }\n.select2-results-dept-3 .select2-result-label { padding-left: 60px }\n.select2-results-dept-4 .select2-result-label { padding-left: 80px }\n.select2-results-dept-5 .select2-result-label { padding-left: 100px }\n.select2-results-dept-6 .select2-result-label { padding-left: 110px }\n.select2-results-dept-7 .select2-result-label { padding-left: 120px }\n\n.select2-results .select2-highlighted {\n    background: #3875d7;\n    color: #fff;\n}\n\n.select2-results li em {\n    background: #feffde;\n    font-style: normal;\n}\n\n.select2-results .select2-highlighted em {\n    background: transparent;\n}\n\n.select2-results .select2-highlighted ul {\n    background: #fff;\n    color: #000;\n}\n\n.select2-results .select2-no-results,\n.select2-results .select2-searching,\n.select2-results .select2-ajax-error,\n.select2-results .select2-selection-limit {\n    background: #f4f4f4;\n    display: list-item;\n    padding-left: 5px;\n}\n\n/*\ndisabled look for disabled choices in the results dropdown\n*/\n.select2-results .select2-disabled.select2-highlighted {\n    color: #666;\n    background: #f4f4f4;\n    display: list-item;\n    cursor: default;\n}\n.select2-results .select2-disabled {\n  background: #f4f4f4;\n  display: list-item;\n  cursor: default;\n}\n\n.select2-results .select2-selected {\n    display: none;\n}\n\n.select2-more-results.select2-active {\n    background: #f4f4f4 url(" + __webpack_require__(38) + ") no-repeat 100%;\n}\n\n.select2-results .select2-ajax-error {\n    background: rgba(255, 50, 50, .2);\n}\n\n.select2-more-results {\n    background: #f4f4f4;\n    display: list-item;\n}\n\n/* disabled styles */\n\n.select2-container.select2-container-disabled .select2-choice {\n    background-color: #f4f4f4;\n    background-image: none;\n    border: 1px solid #ddd;\n    cursor: default;\n}\n\n.select2-container.select2-container-disabled .select2-choice .select2-arrow {\n    background-color: #f4f4f4;\n    background-image: none;\n    border-left: 0;\n}\n\n.select2-container.select2-container-disabled .select2-choice abbr {\n    display: none;\n}\n\n\n/* multiselect */\n\n.select2-container-multi .select2-choices {\n    height: auto !important;\n    height: 1%;\n    margin: 0;\n    padding: 0 5px 0 0;\n    position: relative;\n\n    border: 1px solid #aaa;\n    cursor: text;\n    overflow: hidden;\n\n    background-color: #fff;\n    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(1%, #eee), color-stop(15%, #fff));\n    background-image: -webkit-linear-gradient(top, #eee 1%, #fff 15%);\n    background-image: -moz-linear-gradient(top, #eee 1%, #fff 15%);\n    background-image: linear-gradient(to bottom, #eee 1%, #fff 15%);\n}\n\nhtml[dir=\"rtl\"] .select2-container-multi .select2-choices {\n    padding: 0 0 0 5px;\n}\n\n.select2-locked {\n  padding: 3px 5px 3px 5px !important;\n}\n\n.select2-container-multi .select2-choices {\n    min-height: 26px;\n}\n\n.select2-container-multi.select2-container-active .select2-choices {\n    border: 1px solid #5897fb;\n    outline: none;\n\n    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .3);\n            box-shadow: 0 0 5px rgba(0, 0, 0, .3);\n}\n.select2-container-multi .select2-choices li {\n    float: left;\n    list-style: none;\n}\nhtml[dir=\"rtl\"] .select2-container-multi .select2-choices li\n{\n    float: right;\n}\n.select2-container-multi .select2-choices .select2-search-field {\n    margin: 0;\n    padding: 0;\n    white-space: nowrap;\n}\n\n.select2-container-multi .select2-choices .select2-search-field input {\n    padding: 5px;\n    margin: 1px 0;\n\n    font-family: sans-serif;\n    font-size: 100%;\n    color: #666;\n    outline: 0;\n    border: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    background: transparent !important;\n}\n\n.select2-container-multi .select2-choices .select2-search-field input.select2-active {\n    background: #fff url(" + __webpack_require__(38) + ") no-repeat 100% !important;\n}\n\n.select2-default {\n    color: #999 !important;\n}\n\n.select2-container-multi .select2-choices .select2-search-choice {\n    padding: 3px 5px 3px 18px;\n    margin: 3px 0 3px 5px;\n    position: relative;\n\n    line-height: 13px;\n    color: #333;\n    cursor: default;\n    border: 1px solid #aaaaaa;\n\n    border-radius: 3px;\n\n    -webkit-box-shadow: 0 0 2px #fff inset, 0 1px 0 rgba(0, 0, 0, 0.05);\n            box-shadow: 0 0 2px #fff inset, 0 1px 0 rgba(0, 0, 0, 0.05);\n\n    background-clip: padding-box;\n\n    -webkit-touch-callout: none;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n\n    background-color: #e4e4e4;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#f4f4f4', GradientType=0);\n    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(20%, #f4f4f4), color-stop(50%, #f0f0f0), color-stop(52%, #e8e8e8), color-stop(100%, #eee));\n    background-image: -webkit-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eee 100%);\n    background-image: -moz-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eee 100%);\n    background-image: linear-gradient(to top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eee 100%);\n}\nhtml[dir=\"rtl\"] .select2-container-multi .select2-choices .select2-search-choice\n{\n    margin: 6px 5px 0px 0;\n    padding: 3px 18px 3px 5px;\n}\n.select2-container-multi .select2-choices .select2-search-choice .select2-chosen {\n    cursor: default;\n}\n.select2-container-multi .select2-choices .select2-search-choice-focus {\n    background: #d4d4d4;\n}\n\n.select2-search-choice-close {\n    display: block;\n    width: 12px;\n    height: 13px;\n    position: absolute;\n    right: 3px;\n    top: 4px;\n\n    font-size: 1px;\n    outline: none;\n    background: url(" + __webpack_require__(37) + ") right top no-repeat;\n}\nhtml[dir=\"rtl\"] .select2-search-choice-close {\n    right: auto;\n    left: 3px;\n}\n\n.select2-container-multi .select2-search-choice-close {\n    left: 3px;\n}\n\nhtml[dir=\"rtl\"] .select2-container-multi .select2-search-choice-close {\n    left: auto;\n    right: 2px;\n}\n\n.select2-container-multi .select2-choices .select2-search-choice .select2-search-choice-close:hover {\n  background-position: right -11px;\n}\n.select2-container-multi .select2-choices .select2-search-choice-focus .select2-search-choice-close {\n    background-position: right -11px;\n}\n\n/* disabled styles */\n.select2-container-multi.select2-container-disabled .select2-choices {\n    background-color: #f4f4f4;\n    background-image: none;\n    border: 1px solid #ddd;\n    cursor: default;\n}\n\n.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice {\n    padding: 3px 5px 3px 5px;\n    border: 1px solid #ddd;\n    background-image: none;\n    background-color: #f4f4f4;\n}\n\n.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice .select2-search-choice-close {    display: none;\n    background: none;\n}\n/* end multiselect */\n\n\n.select2-result-selectable .select2-match,\n.select2-result-unselectable .select2-match {\n    text-decoration: underline;\n}\n\n.select2-offscreen, .select2-offscreen:focus {\n    clip: rect(0 0 0 0) !important;\n    width: 1px !important;\n    height: 1px !important;\n    border: 0 !important;\n    margin: 0 !important;\n    padding: 0 !important;\n    overflow: hidden !important;\n    position: absolute !important;\n    outline: 0 !important;\n    left: 0px !important;\n    top: 0px !important;\n}\n\n.select2-display-none {\n    display: none;\n}\n\n.select2-measure-scrollbar {\n    position: absolute;\n    top: -10000px;\n    left: -10000px;\n    width: 100px;\n    height: 100px;\n    overflow: scroll;\n}\n\n/* Retina-ize icons */\n\n@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 2dppx)  {\n    .select2-search input,\n    .select2-search-choice-close,\n    .select2-container .select2-choice abbr,\n    .select2-container .select2-choice .select2-arrow b {\n        background-image: url(" + __webpack_require__(39) + ") !important;\n        background-repeat: no-repeat !important;\n        background-size: 60px 40px !important;\n    }\n\n    .select2-search input {\n        background-position: 100% -21px !important;\n    }\n}\n", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c4642b7ba1e7e02c8ca235563a112e4a.png";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9ed4669f524bec38319be63a2ee4ba26.gif";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2194ed34eeab5926a0035ca7105e133c.png";

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../vendor/avalon/avalon.js" />
	/**
	 * piechart是一个图表饼图组件
	 * author: zxl
	 * 使用说明：
	 * 例子：<wk:piechart config="piechartOpts"></wk:piechart>
	 */
	// define(['avalon',
	//     'pie'
	// ], function (avalon) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(41)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(AmCharts) {
	    var template;
	    var chart;

	    var _interface = function() {};

	    var piechart = {
	        chartId: '', //图表Id
	        title: '', //图表标题
	        data: [], //展示数据
	        hight: '400', //图表高度

	        // 事件
	        onInit: _interface,
	        loadData: _interface,
	        init: _interface,

	        $init: init,

	        $ready: function(vm, elem) {
	            vm.initChart(vm, elem);
	        },

	        $dispose: function(vm, el) {
	            el.innerHTML = el.textContent = "";
	        }
	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, elem) {
	        var html = '<div id="$ID$" class="chart" style="width: 100%; height: $HIGHT$px;"></div>';
	        html = html.replace('$ID$', vm.chartId).replace('$HIGHT$', vm.hight);

	        //将模板的内容插入到当前元素下面
	        template = html;
	        vm.$$template = function() {
	            return template;
	        };

	        vm.initChart = function(vm, elem) {
	            vm.loadData.call().then(function sucess(result) {
	                if (result != null && result.length > 0) {
	                    chart = new AmCharts.AmPieChart();
	                    chart.dataProvider = vm.data;
	                    chart.titles = [{
	                            "text": vm.title,
	                            "size": 15
	                        }],
	                        //chart.theme = "light";
	                        //chart.fontFamily = 'Open Sans';
	                        //chart.color = '#888';
	                        chart.valueField = "value";
	                    chart.titleField = "label";
	                    chart.outlineAlpha = 0.4;
	                    //chart.outlineThickness = 2;
	                    // chart.outlineColor = "#FFFFFF";
	                    chart.depth3D = 15;
	                    chart.angle = 30;
	                    chart.labelRadius = -30;
	                    chart.labelText = "[[percents]]%";
	                    chart.radius = 120;
	                    chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";

	                    // LEGEND
	                    var legend = new AmCharts.AmLegend();
	                    legend.markerSize = 10;
	                    legend.position = "bottom";
	                    legend.align = "center";
	                    legend.markerType = "square";
	                    legend.marginRight = 0;
	                    chart.addLegend(legend);

	                    chart.dataProvider = result;
	                    chart.write(vm.chartId);

	                    //当数据改变时或者属性改变时, 想要重新绘图
	                    chart.validateNow();
	                    chart.validateData();

	                } else {
	                    elem.innerHTML = '<div ms-if="loading == false && data.length == 0" class="note note-info"><h4 class="block">暂无数据</h4><p>当前系统内还没有相应数据</p></div>';
	                }
	            }, function fail(res) {
	                elem.innerHTML = '<div ms-if="loading == false && data.length == 0" class="note note-info"><h4 class="block">暂无数据</h4><p>加载数据出错，请刷新再试</p></div>';
	                console.log(res);
	            });
	        };

	        vm.init = function() {
	            vm.initChart(vm, elem);
	        };

	        if (typeof vm.onInit === 'function') {
	            vm.onInit.call(elem, vm);
	        }
	    };

	    avalon.component("wk:piechart", piechart);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//var AmCharts = require('amcharts');
	//
	//module.exports = AmCharts;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(42)], __WEBPACK_AMD_DEFINE_RESULT__ = function (AmCharts) {
	    AmCharts.AmPieChart=AmCharts.Class({inherits:AmCharts.AmSlicedChart,construct:function(){AmCharts.AmPieChart.base.construct.call(this);this.pieBrightnessStep=30;this.minRadius=10;this.depth3D=0;this.startAngle=90;this.angle=this.innerRadius=0;this.startRadius="500%";this.pullOutRadius="20%";this.labelRadius=30;this.labelText="[[title]]: [[percents]]%";this.balloonText="[[title]]: [[percents]]% ([[value]])\n[[description]]";this.previousScale=1},drawChart:function(){AmCharts.AmPieChart.base.drawChart.call(this);
	        var e=this.chartData;if(AmCharts.ifArray(e)){if(0<this.realWidth&&0<this.realHeight){AmCharts.VML&&(this.startAlpha=1);var g=this.startDuration,c=this.container,a=this.updateWidth();this.realWidth=a;var h=this.updateHeight();this.realHeight=h;var d=AmCharts.toCoordinate,k=d(this.marginLeft,a),b=d(this.marginRight,a),q=d(this.marginTop,h)+this.getTitleHeight(),l=d(this.marginBottom,h),w,x,f,s=AmCharts.toNumber(this.labelRadius),r=this.measureMaxLabel();this.labelText&&this.labelsEnabled||(s=r=0);w=
	            void 0===this.pieX?(a-k-b)/2+k:d(this.pieX,this.realWidth);x=void 0===this.pieY?(h-q-l)/2+q:d(this.pieY,h);f=d(this.radius,a,h);f||(a=0<=s?a-k-b-2*r:a-k-b,h=h-q-l,f=Math.min(a,h),h<a&&(f/=1-this.angle/90,f>a&&(f=a)),h=AmCharts.toCoordinate(this.pullOutRadius,f),f=(0<=s?f-1.8*(s+h):f-1.8*h)/2);f<this.minRadius&&(f=this.minRadius);h=d(this.pullOutRadius,f);q=AmCharts.toCoordinate(this.startRadius,f);d=d(this.innerRadius,f);d>=f&&(d=f-1);l=AmCharts.fitToBounds(this.startAngle,0,360);0<this.depth3D&&
	        (l=270<=l?270:90);l-=90;a=f-f*this.angle/90;for(k=0;k<e.length;k++)if(b=e[k],!0!==b.hidden&&0<b.percents){var n=360*b.percents/100,r=Math.sin((l+n/2)/180*Math.PI),y=-Math.cos((l+n/2)/180*Math.PI)*(a/f),p={fill:b.color,stroke:this.outlineColor,"stroke-width":this.outlineThickness,"stroke-opacity":this.outlineAlpha};b.url&&(p.cursor="pointer");p=AmCharts.wedge(c,w,x,l,n,f,a,d,this.depth3D,p,this.gradientRatio,b.pattern);this.addEventListeners(p,b);b.startAngle=l;e[k].wedge=p;if(0<g){var t=this.startAlpha;
	            this.chartCreated&&(t=b.alpha);p.setAttr("opacity",t)}b.ix=r;b.iy=y;b.wedge=p;b.index=k;if(this.labelsEnabled&&this.labelText&&b.percents>=this.hideLabelsPercent){var m=l+n/2,n=s;isNaN(b.labelRadius)||(n=b.labelRadius);var t=w+r*(f+n),u=x+y*(f+n),z,v=0;if(0<=n){var A;90>=m&&0<=m?(A=0,z="start",v=8):90<=m&&180>m?(A=1,z="start",v=8):180<=m&&270>m?(A=2,z="end",v=-8):270<=m&&360>m&&(A=3,z="end",v=-8);b.labelQuarter=A}else z="middle";var m=this.formatString(this.labelText,b),B=b.labelColor;B||(B=this.color);
	            m=AmCharts.text(c,m,B,this.fontFamily,this.fontSize,z);m.translate(t+1.5*v,u);b.tx=t+1.5*v;b.ty=u;u=d+(f-d)/2;b.pulled&&(u+=this.pullOutRadiusReal);b.balloonX=r*u+w;b.balloonY=y*u+x;0<=n?p.push(m):this.freeLabelsSet.push(m);b.label=m;b.tx=t;b.tx2=t+v;b.tx0=w+r*f;b.ty0=x+y*f}b.startX=Math.round(r*q);b.startY=Math.round(y*q);b.pullX=Math.round(r*h);b.pullY=Math.round(y*h);this.graphsSet.push(p);(0===b.alpha||0<g&&!this.chartCreated)&&p.hide();l+=360*b.percents/100}0<s&&!this.labelRadiusField&&this.arrangeLabels();
	            this.pieXReal=w;this.pieYReal=x;this.radiusReal=f;this.innerRadiusReal=d;0<s&&this.drawTicks();this.initialStart();this.setDepths()}(e=this.legend)&&e.invalidateSize()}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},setDepths:function(){var e=this.chartData,g;for(g=0;g<e.length;g++){var c=e[g],a=c.wedge,c=c.startAngle;0<=c&&180>c?a.toFront():180<=c&&a.toBack()}},arrangeLabels:function(){var e=this.chartData,g=e.length,c,a;for(a=g-1;0<=a;a--)c=e[a],0!==c.labelQuarter||c.hidden||this.checkOverlapping(a,
	        c,0,!0,0);for(a=0;a<g;a++)c=e[a],1!=c.labelQuarter||c.hidden||this.checkOverlapping(a,c,1,!1,0);for(a=g-1;0<=a;a--)c=e[a],2!=c.labelQuarter||c.hidden||this.checkOverlapping(a,c,2,!0,0);for(a=0;a<g;a++)c=e[a],3!=c.labelQuarter||c.hidden||this.checkOverlapping(a,c,3,!1,0)},checkOverlapping:function(e,g,c,a,h){var d,k,b=this.chartData,q=b.length,l=g.label;if(l){if(!0===a)for(k=e+1;k<q;k++)b[k].labelQuarter==c&&(d=this.checkOverlappingReal(g,b[k],c))&&(k=q);else for(k=e-1;0<=k;k--)b[k].labelQuarter==
	    c&&(d=this.checkOverlappingReal(g,b[k],c))&&(k=0);!0===d&&100>h&&(d=g.ty+3*g.iy,g.ty=d,l.translate(g.tx2,d),this.checkOverlapping(e,g,c,a,h+1))}},checkOverlappingReal:function(e,g,c){var a=!1,h=e.label,d=g.label;e.labelQuarter!=c||e.hidden||g.hidden||!d||(h=h.getBBox(),c={},c.width=h.width,c.height=h.height,c.y=e.ty,c.x=e.tx,e=d.getBBox(),d={},d.width=e.width,d.height=e.height,d.y=g.ty,d.x=g.tx,AmCharts.hitTest(c,d)&&(a=!0));return a}});


	    return AmCharts;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//module.exports = AmCharts;


	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
	    if(!AmCharts)var AmCharts={};AmCharts.inheriting={};
	    AmCharts.Class=function(a){var b=function(){arguments[0]!==AmCharts.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(AmCharts.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0,b=arguments.length;a<b;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.events[a].push({handler:b,scope:c})},
	        b.prototype.removeListener=function(a,b,c){a=a.events[b];for(b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a,b){for(var c=this.events[a],g=0,h=c.length;g<h;g++){var k=c[g];k.handler.call(k.scope,b)}});for(var c in a)b.prototype[c]=a[c];return b};AmCharts.charts=[];AmCharts.addChart=function(a){AmCharts.charts.push(a)};AmCharts.removeChart=function(a){for(var b=AmCharts.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)};AmCharts.IEversion=0;AmCharts.isModern=!0;
	    AmCharts.navigator=navigator.userAgent.toLowerCase();-1!=AmCharts.navigator.indexOf("msie")&&(AmCharts.IEversion=parseInt(AmCharts.navigator.split("msie")[1]),document.documentMode&&(AmCharts.IEversion=Number(document.documentMode)),9>AmCharts.IEversion&&(AmCharts.isModern=!1));AmCharts.dx=0;AmCharts.dy=0;if(document.addEventListener||window.opera)AmCharts.isNN=!0,AmCharts.isIE=!1,AmCharts.dx=0.5,AmCharts.dy=0.5;
	    document.attachEvent&&(AmCharts.isNN=!1,AmCharts.isIE=!0,AmCharts.isModern||(AmCharts.dx=0,AmCharts.dy=0));window.chrome&&(AmCharts.chrome=!0);AmCharts.handleResize=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&c.div&&c.handleResize()}};AmCharts.handleMouseUp=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleReleaseOutside(a)}};AmCharts.handleMouseMove=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleMouseMove(a)}};
	    AmCharts.resetMouseOver=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};AmCharts.onReadyArray=[];AmCharts.ready=function(a){AmCharts.onReadyArray.push(a)};AmCharts.handleLoad=function(){for(var a=AmCharts.onReadyArray,b=0;b<a.length;b++)(0,a[b])()};AmCharts.useUTC=!1;AmCharts.updateRate=40;AmCharts.uid=0;AmCharts.getUniqueId=function(){AmCharts.uid++;return"AmChartsEl-"+AmCharts.uid};
	    AmCharts.isNN&&(document.addEventListener("mousemove",AmCharts.handleMouseMove,!0),window.addEventListener("resize",AmCharts.handleResize,!0),document.addEventListener("mouseup",AmCharts.handleMouseUp,!0),window.addEventListener("load",AmCharts.handleLoad,!0));AmCharts.isIE&&(document.attachEvent("onmousemove",AmCharts.handleMouseMove),window.attachEvent("onresize",AmCharts.handleResize),document.attachEvent("onmouseup",AmCharts.handleMouseUp),window.attachEvent("onload",AmCharts.handleLoad));
	    AmCharts.clear=function(){var a=AmCharts.charts;if(a)for(var b=0;b<a.length;b++)a[b].clear();AmCharts.charts=null;AmCharts.isNN&&(document.removeEventListener("mousemove",AmCharts.handleMouseMove,!0),window.removeEventListener("resize",AmCharts.handleResize,!0),document.removeEventListener("mouseup",AmCharts.handleMouseUp,!0),window.removeEventListener("load",AmCharts.handleLoad,!0));AmCharts.isIE&&(document.detachEvent("onmousemove",AmCharts.handleMouseMove),window.detachEvent("onresize",AmCharts.handleResize),
	        document.detachEvent("onmouseup",AmCharts.handleMouseUp),window.detachEvent("onload",AmCharts.handleLoad))};AmCharts.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case "true":case "yes":case "1":return!0;case "false":case "no":case "0":case null:return!1;default:return Boolean(a)}};AmCharts.removeFromArray=function(a,b){var c;for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};
	    AmCharts.getStyle=function(a,b){var c="";document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};AmCharts.removePx=function(a){return Number(a.substring(0,a.length-2))};
	    AmCharts.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else{var c=document.getElementsByName(b)[0];c?c.src=a:window.open(a)}else window.location.href=a};AmCharts.ifArray=function(a){return a&&0<a.length?!0:!1};AmCharts.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var d=b[c];if(d){if(d[a])d[a]();var e=d.length;if(0<e){var f;for(f=0;f<e;f++){var g=d[f];if(g&&g[a])g[a]()}}}}};
	    AmCharts.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};AmCharts.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};
	    AmCharts.toCoordinate=function(a,b,c){var d;void 0!==a&&(a=String(a),c&&c<b&&(b=c),d=Number(a),-1!=a.indexOf("!")&&(d=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(d=b*Number(a.substr(0,a.length-1))/100));return d};AmCharts.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};AmCharts.isDefined=function(a){return void 0===a?!1:!0};AmCharts.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")};AmCharts.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};
	    AmCharts.toFixed=function(a,b){var c=String(Math.round(a*Math.pow(10,b)));if(0<b){var d=c.length;if(d<b){var e;for(e=0;e<b-d;e++)c="0"+c}d=c.substring(0,c.length-b);""===d&&(d=0);return d+"."+c.substring(c.length-b,c.length)}return String(c)};
	    AmCharts.formatDuration=function(a,b,c,d,e,f){var g=AmCharts.intervals,h=f.decimalSeparator;if(a>=g[b].contains){var k=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b&&(k=AmCharts.formatNumber(k,f),1==k.split(h)[0].length&&(k="0"+k));("mm"==b||"hh"==b)&&10>k&&(k="0"+k);c=k+""+d[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return AmCharts.formatDuration(a,b,c,d,e,f)}"ss"==b&&(a=AmCharts.formatNumber(a,f),1==a.split(h)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+
	        d[b]+""+c;if(g[e].count>g[b].count)for(a=g[b].count;a<g[e].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+d[b]+""+c:"DD"==b&&(c="0"+d[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1));return c};
	    AmCharts.formatNumber=function(a,b,c,d,e){a=AmCharts.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var h=String(a),k=!1;-1!=h.indexOf("e")&&(k=!0);0<=c&&!k&&(h=AmCharts.toFixed(a,c));var l="";if(k)l=h;else{var h=h.split("."),k=String(h[0]),m;for(m=k.length;0<=m;m-=3)l=m!=k.length?0!==m?k.substring(m-3,m)+b+l:k.substring(m-3,m)+l:k.substring(m-3,m);void 0!==h[1]&&(l=l+f+h[1]);void 0!==c&&0<c&&"0"!=l&&(l=AmCharts.addZeroes(l,
	        f,c))}l=g+l;""===g&&!0===d&&0!==a&&(l="+"+l);!0===e&&(l+="%");return l};AmCharts.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",AmCharts.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};
	    AmCharts.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var d=0;b=a[0].split(".");b[1]&&(d=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-d;c++)b+="0"}return b};
	    AmCharts.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E);Math.pow(10,c);mantissa=String(mantissa).split(".").join(b);return String(mantissa)+"e"+c};AmCharts.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};
	    AmCharts.hitTest=function(a,b,c){var d=!1,e=a.x,f=a.x+a.width,g=a.y,h=a.y+a.height,k=AmCharts.isInRectangle;d||(d=k(e,g,b));d||(d=k(e,h,b));d||(d=k(f,g,b));d||(d=k(f,h,b));d||!0===c||(d=AmCharts.hitTest(b,a,!0));return d};AmCharts.isInRectangle=function(a,b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};AmCharts.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};
	    AmCharts.findPosX=function(a){var b=a,c=a.offsetLeft;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetLeft;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollLeft||0}return c};AmCharts.findPosY=function(a){var b=a,c=a.offsetTop;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetTop;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollTop||0}return c};AmCharts.findIfFixed=function(a){if(a.offsetParent)for(;a=a.offsetParent;)if("fixed"==AmCharts.getStyle(a,"position"))return!0;return!1};
	    AmCharts.findIfAuto=function(a){return a.style&&"auto"==AmCharts.getStyle(a,"overflow")?!0:a.parentNode?AmCharts.findIfAuto(a.parentNode):!1};AmCharts.findScrollLeft=function(a,b){a.scrollLeft&&(b+=a.scrollLeft);return a.parentNode?AmCharts.findScrollLeft(a.parentNode,b):b};AmCharts.findScrollTop=function(a,b){a.scrollTop&&(b+=a.scrollTop);return a.parentNode?AmCharts.findScrollTop(a.parentNode,b):b};
	    AmCharts.formatValue=function(a,b,c,d,e,f,g,h){if(b){void 0===e&&(e="");var k;for(k=0;k<c.length;k++){var l=c[k],m=b[l];void 0!==m&&(m=f?AmCharts.addPrefix(m,h,g,d):AmCharts.formatNumber(m,d),a=a.replace(RegExp("\\[\\["+e+""+l+"\\]\\]","g"),m))}}return a};AmCharts.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),d;for(d=0;d<c.length;d++){var e=c[d],e=e.substr(2,e.length-4);void 0!==b[e]&&(a=a.replace(RegExp("\\[\\["+e+"\\]\\]","g"),b[e]))}}return a};
	    AmCharts.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];void 0===d&&(d="");a=a.replace(c,d)}return a};AmCharts.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};
	    AmCharts.addPrefix=function(a,b,c,d,e){var f=AmCharts.formatNumber(a,d),g="",h,k,l;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(h=b.length-1;-1<h;h--){if(a>=b[h].number&&(k=a/b[h].number,l=Number(d.precision),1>l&&(l=1),c=AmCharts.roundTo(k,l),l=AmCharts.formatNumber(c,{precision:-1,decimalSeparator:d.decimalSeparator,thousandsSeparator:d.thousandsSeparator}),!e||k==c)){f=g+""+l+""+b[h].prefix;break}}else for(h=0;h<c.length;h++)if(a<=c[h].number){k=a/c[h].number;l=Math.abs(Math.round(Math.log(k)*
	        Math.LOG10E));k=AmCharts.roundTo(k,l);f=g+""+k+""+c[h].prefix;break}return f};AmCharts.remove=function(a){a&&a.remove()};AmCharts.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&(b[c]=a[c])};AmCharts.recommended=function(){var a="js";document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")||swfobject&&swfobject.hasFlashPlayerVersion("8")&&(a="flash");return a};
	    AmCharts.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};AmCharts.extend=function(a,b){for(var c in b)void 0!==b[c]&&(a.hasOwnProperty(c)||(a[c]=b[c]))};AmCharts.fixNewLines=function(a){if(!AmCharts.isModern){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"))}return a};
	    AmCharts.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)AmCharts.deleteObject(a[c],b-1),a[c]=null;else try{for(c in a)a[c]&&("object"==typeof a[c]&&AmCharts.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(d){}}};
	    AmCharts.bounce=function(a,b,c,d,e){return(b/=e)<1/2.75?7.5625*d*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+0.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+0.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+0.984375)+c};AmCharts.easeInSine=function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c};AmCharts.easeOutSine=function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c};
	    AmCharts.easeOutElastic=function(a,b,c,d,e){a=1.70158;var f=0,g=d;if(0===b)return c;if(1==(b/=e))return c+d;f||(f=0.3*e);g<Math.abs(d)?(g=d,a=f/4):a=f/(2*Math.PI)*Math.asin(d/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*e-a)*Math.PI/f)+d+c};AmCharts.AxisBase=AmCharts.Class({construct:function(){this.viY=this.viX=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=0.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=!0;this.valueRollOverColor="#CC0000";this.offset=
	        0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minGap=75;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=0.07},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},draw:function(){var a=this.chart;void 0===this.titleColor&&(this.titleColor=
	        a.color);isNaN(this.titleFontSize)&&(this.titleFontSize=a.fontSize+1);this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount&&("V"==this.orientation?(a=this.height/35,3>a&&(a=3)):a=this.width/this.minGap,this.gridCount=Math.max(a,1));this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=
	        a?"H":"V"},addTitle:function(){var a=this.title;if(a){var b=this.chart;this.titleLabel=AmCharts.text(b.container,a,this.titleColor,b.fontFamily,this.titleFontSize,"middle",this.titleBold)}},positionTitle:function(){var a=this.titleLabel;if(a){var b,c,d=this.labelsSet,e={};0<d.length()?e=d.getBBox():(e.x=0,e.y=0,e.width=this.viW,e.height=this.viH);d.push(a);var d=e.x,f=e.y;AmCharts.VML&&(this.rotate?d-=this.x:f-=this.y);var g=e.width,e=e.height,h=this.viW,k=this.viH;a.getBBox();var l=0,m=this.titleFontSize/
	        2,n=this.inside;switch(this.position){case "top":b=h/2;c=f-10-m;break;case "bottom":b=h/2;c=f+e+10+m;break;case "left":b=d-10-m;n&&(b-=5);c=k/2;l=-90;break;case "right":b=d+g+10+m-3,n&&(b+=7),c=k/2,l=-90}this.marginsChanged?(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;0!==l&&a.rotate(l)}},pushAxisItem:function(a,b){var c=a.graphics();0<c.length()&&(b?this.labelsSet.push(c):this.set.push(c));(c=a.getLabel())&&this.labelsSet.push(c)},addGuide:function(a){this.guides.push(a)},
	        removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),c=b.x+b.width/2,b=b.y+b.height/2,d=a.fillColor;void 0===d&&(d=a.lineColor);this.chart.showBalloon(a.balloonText,d,!0,c,b)},handleGuideOut:function(a){this.chart.hideBalloon()},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a=
	            this.labelsSet.getBBox();AmCharts.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height});return a},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.labelsSet);var a=this.axisLine;a&&AmCharts.remove(a.set);AmCharts.remove(this.grid0)}});AmCharts.ValueAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(){this.createEvents("axisChanged","logarithmicAxisFailed","axisSelfZoomed","axisZoomed");AmCharts.ValueAxis.base.construct.call(this);this.dataChanged=!0;this.gridCount=8;this.stackType="none";this.position="left";this.unitPosition="right";this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=0;this.radarCategoriesEnabled=
	        !0;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.minMaxMultiplier=1},updateData:function(){0>=this.gridCount&&(this.gridCount=1);this.totals=[];this.data=this.chart.chartData;"xy"!=this.chart.chartType&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&this.recalculate();this.synchronizationMultiplier&&this.synchronizeWith?this.foundGraphs=!0:(this.foundGraphs=!1,this.getMinMax())},
	        draw:function(){AmCharts.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;"duration"==this.type&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);if(this.logarithmic&&(0>=this.getMin(0,this.data.length-1)||0>=this.minimum))this.fire("logarithmicAxisFailed",{type:"logarithmicAxisFailed",chart:a});else{this.grid0=null;var c,d,e=a.dx,f=a.dy,g=!1,h=this.logarithmic,k=a.chartType;if(isNaN(this.min)||isNaN(this.max)||!this.foundGraphs||Infinity==this.min||-Infinity==
	            this.max)g=!0;else{var l=this.labelFrequency,m=this.showFirstLabel,n=this.showLastLabel,p=1,q=0,u=Math.round((this.max-this.min)/this.step)+1,r;!0===h?(r=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/r,2<r&&(u=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,q=Math.round(Math.log(this.minReal)*Math.LOG10E),u>this.gridCount&&(p=Math.ceil(u/this.gridCount)))):this.stepWidth=this.axisWidth/(this.max-this.min);var s=0;1>this.step&&-1<this.step&&(s=this.getDecimals(this.step));
	            this.integersOnly&&(s=0);s>this.maxDecCount&&(s=this.maxDecCount);var w=this.precision;isNaN(w)||(s=w);this.max=AmCharts.roundTo(this.max,this.maxDecCount);this.min=AmCharts.roundTo(this.min,this.maxDecCount);var v={};v.precision=s;v.decimalSeparator=a.numberFormatter.decimalSeparator;v.thousandsSeparator=a.numberFormatter.thousandsSeparator;this.numberFormatter=v;var t,A=this.guides,E=A.length;if(0<E){c=this.fillAlpha;for(d=this.fillAlpha=0;d<E;d++){var x=A[d],z=NaN,H=x.above;isNaN(x.toValue)||(z=
	                this.getCoordinate(x.toValue),t=new this.axisItemRenderer(this,z,"",!0,NaN,NaN,x),this.pushAxisItem(t,H));var I=NaN;isNaN(x.value)||(I=this.getCoordinate(x.value),t=new this.axisItemRenderer(this,I,x.label,!0,NaN,(z-I)/2,x),this.pushAxisItem(t,H));isNaN(z-I)||(t=new this.guideFillRenderer(this,I,z,x),this.pushAxisItem(t,H),t=t.graphics(),x.graphics=t,x.balloonText&&this.addEventListeners(t,x))}this.fillAlpha=c}A=!1;for(d=q;d<u;d+=p)E=AmCharts.roundTo(this.step*d+this.min,s),-1!=String(E).indexOf("e")&&
	            (A=!0,String(E).split("e"));this.duration&&(this.maxInterval=AmCharts.getMaxInterval(this.max,this.duration));var s=this.step,B,E=this.minorGridAlpha;this.minorGridEnabled&&(B=this.getMinorGridStep(s,this.stepWidth*s));for(d=q;d<u;d+=p)if(q=s*d+this.min,q=AmCharts.roundTo(q,this.maxDecCount+1),!this.integersOnly||Math.round(q)==q)if(isNaN(w)||Number(AmCharts.toFixed(q,w))==q){!0===h&&(0===q&&(q=this.minReal),2<r&&(q=Math.pow(10,d)),A=-1!=String(q).indexOf("e")?!0:!1);this.useScientificNotation&&(A=
	                !0);this.usePrefixes&&(A=!1);A?(t=-1==String(q).indexOf("e")?q.toExponential(15):String(q),c=t.split("e"),t=Number(c[0]),c=Number(c[1]),t=AmCharts.roundTo(t,14),10==t&&(t=1,c+=1),t=t+"e"+c,0===q&&(t="0"),1==q&&(t="1")):(h&&(t=String(q).split("."),v.precision=t[1]?t[1].length:-1),t=this.usePrefixes?AmCharts.addPrefix(q,a.prefixesOfBigNumbers,a.prefixesOfSmallNumbers,v,!0):AmCharts.formatNumber(q,v,v.precision));this.duration&&(t=AmCharts.formatDuration(q,this.duration,"",this.durationUnits,this.maxInterval,
	                v));this.recalculateToPercents?t+="%":(c=this.unit)&&(t="left"==this.unitPosition?c+t:t+c);Math.round(d/l)!=d/l&&(t=void 0);if(0===d&&!m||d==u-1&&!n)t=" ";c=this.getCoordinate(q);this.labelFunction&&(t=this.labelFunction(q,t,this));t=new this.axisItemRenderer(this,c,t);this.pushAxisItem(t);if(q==this.baseValue&&"radar"!=k){var ba,N,H=this.viW,z=this.viH;t=this.viX;x=this.viY;"H"==this.orientation?0<=c&&c<=H+1&&(ba=[c,c,c+e],N=[z,0,f]):0<=c&&c<=z+1&&(ba=[0,H,H+e],N=[c,c,c+f]);ba&&(c=AmCharts.fitToBounds(2*
	                this.gridAlpha,0,1),c=AmCharts.line(a.container,ba,N,this.gridColor,c,1,this.dashLength),c.translate(t,x),this.grid0=c,a.axesSet.push(c),c.toBack())}if(!isNaN(B)&&0<E&&d<u-1){t=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;for(c=1;c<s/B;c++)x=this.getCoordinate(q+B*c),x=new this.axisItemRenderer(this,x,"",!1,0,0,!1,!1,0,!0),this.pushAxisItem(x);this.gridAlpha=t}}d=this.baseValue;this.min>this.baseValue&&this.max>this.baseValue&&(d=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(d=
	                this.max);h&&d<this.minReal&&(d=this.minReal);this.baseCoord=this.getCoordinate(d);a={type:"axisChanged",target:this,chart:a};a.min=h?this.minReal:this.min;a.max=this.max;this.fire("axisChanged",a);this.axisCreated=!0}h=this.axisLine.set;a=this.labelsSet;this.positionTitle();"radar"!=k?(k=this.viX,d=this.viY,b.translate(k,d),a.translate(k,d)):h.toFront();!this.visible||g?(b.hide(),h.hide(),a.hide()):(b.show(),h.show(),a.show())}},getDecimals:function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?
	            b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b},getMinorGridStep:function(a,b){var c=[5,4,2];60>b&&c.shift();for(var d=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=0;e<c.length;e++){var f=a/c[e],g=Math.floor(Math.log(Math.abs(f))*Math.LOG10E);if(!(0<Math.abs(d-g)))if(1>a){if(g=Math.pow(10,-g)*f,g==Math.round(g))return f}else if(f==Math.round(f))return f}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==
	        b&&(b="100%");this.stackType=b;var c=[],d=[],e=[],f=[],g,h=this.chart.graphs,k,l,m,n,p=this.baseValue,q=!1;if("line"==a||"step"==a||"smoothedLine"==a)q=!0;if(q&&("regular"==b||"100%"==b))for(n=0;n<h.length;n++)m=h[n],m.hidden||(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(k&&(m.stackGraph=k),k=m));for(k=this.start;k<=this.end;k++){var u=0;for(n=0;n<h.length;n++)if(m=h[n],!m.hidden&&(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(l=this.data[k].axes[this.id].graphs[m.id],
	                g=l.values.value,!isNaN(g)))){var r=this.getDecimals(g);u<r&&(u=r);isNaN(f[k])?f[k]=Math.abs(g):f[k]+=Math.abs(g);f[k]=AmCharts.roundTo(f[k],u);m=m.fillToGraph;q&&m&&(m=this.data[k].axes[this.id].graphs[m.id])&&(l.values.open=m.values.value);"regular"==b&&(q&&(isNaN(c[k])?(c[k]=g,l.values.close=g,l.values.open=this.baseValue):(isNaN(g)?l.values.close=c[k]:l.values.close=g+c[k],l.values.open=c[k],c[k]=l.values.close)),"column"!=a||isNaN(g)||(l.values.close=g,0>g?(l.values.close=g,isNaN(d[k])?l.values.open=
	            p:(l.values.close+=d[k],l.values.open=d[k]),d[k]=l.values.close):(l.values.close=g,isNaN(e[k])?l.values.open=p:(l.values.close+=e[k],l.values.open=e[k]),e[k]=l.values.close)))}}for(k=this.start;k<=this.end;k++)for(n=0;n<h.length;n++)m=h[n],m.hidden||(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(l=this.data[k].axes[this.id].graphs[m.id],g=l.values.value,isNaN(g)||(c=100*(g/f[k]),l.values.percents=c,l.values.total=f[k],"100%"==b&&(isNaN(d[k])&&(d[k]=0),isNaN(e[k])&&(e[k]=0),
	            0>c?(l.values.close=AmCharts.fitToBounds(c+d[k],-100,100),l.values.open=d[k],d[k]=l.values.close):(l.values.close=AmCharts.fitToBounds(c+e[k],-100,100),l.values.open=e[k],e[k]=l.values.close)))))},recalculate:function(){var a=this.chart.graphs,b;for(b=0;b<a.length;b++){var c=a[b];if(c.valueAxis==this){var d="value";if("candlestick"==c.type||"ohlc"==c.type)d="open";var e,f,g=this.end+2,g=AmCharts.fitToBounds(this.end+1,0,this.data.length-1),h=this.start;0<h&&h--;var k;f=this.start;c.compareFromStart&&
	        (f=0);for(k=f;k<=g&&(f=this.data[k].axes[this.id].graphs[c.id],e=f.values[d],isNaN(e));k++);for(d=h;d<=g;d++){f=this.data[d].axes[this.id].graphs[c.id];f.percents={};var h=f.values,l;for(l in h)f.percents[l]="percents"!=l?100*(h[l]/e)-100:h[l]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,d;for(d=0;d<c.length;d++){var e=c[d].type;("line"==e||"step"==e||"smoothedLine"==e)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-1&&this.end++);"serial"==b.chartType&&
	        (!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);a=this.minMaxMultiplier;this.min=this.getMin(this.start,this.end);this.max=this.getMax();a=(this.max-this.min)*(a-1);this.min-=a;this.max+=a;a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=this.minimum);
	            isNaN(this.maximum)||(this.max=this.maximum);this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minTemp)||(this.min=this.minTemp);isNaN(this.maxTemp)||(this.max=this.maxTemp);this.minReal=this.min;this.maxReal=this.max;0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-1);a=this.min;b=this.max;c=this.max-this.min;d=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;
	            isNaN(this.maximum)&&isNaN(this.maxTemp)&&(this.max=Math.ceil(this.max/d)*d+d);isNaN(this.minimum)&&isNaN(this.minTemp)&&(this.min=Math.floor(this.min/d)*d-d);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;d=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCount/d)*d;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=this.fixStepE(c);
	            d=Math.ceil(this.step/c);5<d&&(d=10);5>=d&&2<d&&(d=5);this.step=Math.ceil(this.step/(c*d))*c*d;1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=AmCharts.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));
	            c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);c=Math.log(b)*Math.LOG10E-Math.log(a)*Math.LOG10E;this.logarithmic&&(2<c?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(b=Math.pow(10,
	                    Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10,a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,b<a&&(this.minReal=this.min=10*a)))},fixStepE:function(a){a=a.toExponential(0).split("e");var b=Number(a[1]);9==Number(a[0])&&b++;return this.generateNumber(1,b)},generateNumber:function(a,b){var c="",d;d=0>b?Math.abs(b)-1:Math.abs(b);var e;for(e=0;e<d;e++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)},getMin:function(a,b){var c,d;for(d=a;d<=b;d++){var e=this.data[d].axes[this.id].graphs,
	            f;for(f in e)if(e.hasOwnProperty(f)){var g=this.chart.getGraphById(f);if(g.includeInMinMax&&(!g.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);this.foundGraphs=!0;g=e[f].values;this.recalculateToPercents&&(g=e[f].percents);var h;if(this.minMaxField)h=g[this.minMaxField],h<c&&(c=h);else for(var k in g)g.hasOwnProperty(k)&&"percents"!=k&&"total"!=k&&(h=g[k],h<c&&(c=h))}}}return c},getMax:function(){var a,b;for(b=this.start;b<=this.end;b++){var c=this.data[b].axes[this.id].graphs,d;for(d in c)if(c.hasOwnProperty(d)){var e=
	            this.chart.getGraphById(d);if(e.includeInMinMax&&(!e.hidden||this.includeHidden)){isNaN(a)&&(a=-Infinity);this.foundGraphs=!0;e=c[d].values;this.recalculateToPercents&&(e=c[d].percents);var f;if(this.minMaxField)f=e[this.minMaxField],f>a&&(a=f);else for(var g in e)e.hasOwnProperty(g)&&"percents"!=g&&"total"!=g&&(f=e[g],f>a&&(a=f))}}}return a},dispatchZoomEvent:function(a,b){var c={type:"axisZoomed",startValue:a,endValue:b,target:this,chart:this.chart};this.fire(c.type,c)},zoomToValues:function(a,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               b){if(b<a){var c=b;b=a;a=c}a<this.min&&(a=this.min);b>this.max&&(b=this.max);c={type:"axisSelfZoomed"};c.chart=this.chart;c.valueAxis=this;c.multiplier=this.axisWidth/Math.abs(this.getCoordinate(b)-this.getCoordinate(a));c.position="V"==this.orientation?this.reversed?this.getCoordinate(a):this.getCoordinate(b):this.reversed?this.getCoordinate(b):this.getCoordinate(a);this.fire(c.type,c)},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,d=this.reversed,e=this.rotate,
	            f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(e?!0===d?(b-a)/c:a/c:!0===d?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===d?e?f-(a-b)/c:a/c+f:e?a/c+f:f-(a-b)/c},getCoordinate:function(a){if(isNaN(a))return NaN;var b=this.rotate,c=this.reversed,d=this.axisWidth,e=this.stepWidth,f=this.min,g=this.minReal;!0===this.logarithmic?(a=Math.log(a)*Math.LOG10E-Math.log(g)*Math.LOG10E,b=b?!0===c?d-e*a:e*a:!0===c?e*a:d-e*a):b=!0===c?b?d-e*(a-f):e*(a-f):b?e*(a-f):d-e*(a-f);b=this.rotate?b+(this.x-
	        this.viX):b+(this.y-this.viY);return Math.round(b)},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.removeListener(this.synchronizeWith,"axisChanged",this.handleSynchronization);this.listenTo(this.synchronizeWith,"axisChanged",this.handleSynchronization)},handleSynchronization:function(a){var b=this.synchronizeWith;a=b.min;var c=b.max,b=b.step,d=this.synchronizationMultiplier;d&&(this.min=a*d,this.max=c*d,this.step=b*d,a=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E)),
	            a=Math.abs(Math.log(Math.abs(a))*Math.LOG10E),this.maxDecCount=a=Math.round(a),this.draw())}});AmCharts.RecAxis=AmCharts.Class({construct:function(a){var b=a.chart,c=a.axisThickness,d=a.axisColor,e=a.axisAlpha,f=a.offset,g=a.dx,h=a.dy,k=a.viX,l=a.viY,m=a.viH,n=a.viW,p=b.container;"H"==a.orientation?(d=AmCharts.line(p,[0,n],[0,0],d,e,c),this.axisWidth=a.width,"bottom"==a.position?(a=c/2+f+m+l-1,c=k):(a=-c/2-f+l+h,c=g+k)):(this.axisWidth=a.height,"right"==a.position?(d=AmCharts.line(p,[0,0,-g],[0,m,m-h],d,e,c),a=l+h,c=c/2+f+g+n+k-1):(d=AmCharts.line(p,[0,0],[0,m],d,e,c),a=l,c=-c/2-f+k));d.translate(c,
	        a);b.axesSet.push(d);this.set=d}});AmCharts.RecItem=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l){b=Math.round(b);void 0==c&&(c="");k||(k=0);void 0==d&&(d=!0);var m=a.chart.fontFamily,n=a.fontSize;void 0==n&&(n=a.chart.fontSize);var p=a.color;void 0==p&&(p=a.chart.color);var q=a.chart.container,u=q.set();this.set=u;var r=a.axisThickness,s=a.axisColor,w=a.axisAlpha,v=a.tickLength,t=a.gridAlpha,A=a.gridThickness,E=a.gridColor,x=a.dashLength,z=a.fillColor,H=a.fillAlpha,I=a.labelsEnabled,B=a.labelRotation,ba=a.counter,N=a.inside,
	        $=a.dx,V=a.dy,Da=a.orientation,ca=a.position,Y=a.previousCoord,O=a.viH,U=a.viW,na=a.offset,W,X;g?(I=!0,isNaN(g.tickLength)||(v=g.tickLength),void 0!=g.lineColor&&(E=g.lineColor),void 0!=g.color&&(p=g.color),isNaN(g.lineAlpha)||(t=g.lineAlpha),isNaN(g.dashLength)||(x=g.dashLength),isNaN(g.lineThickness)||(A=g.lineThickness),!0===g.inside&&(N=!0),isNaN(g.labelRotation)||(B=g.labelRotation),isNaN(g.fontSize)||(n=g.fontSize),g.position&&(ca=g.position)):""===c&&(v=0);X="start";e&&(X="middle");var ga=
	        B*Math.PI/180,ha,G=0,F=0,ia=0,aa=ha=0;"V"==Da&&(B=0);var y;I&&(y=AmCharts.text(q,c,p,m,n,X,h),aa=y.getBBox().width);if("H"==Da){if(0<=b&&b<=U+1&&(0<v&&0<w&&b+k<=U+1&&(W=AmCharts.line(q,[b+k,b+k],[0,v],s,w,A),u.push(W)),0<t&&(X=AmCharts.line(q,[b,b+$,b+$],[O,O+V,V],E,t,A,x),u.push(X))),F=0,G=b,g&&90==B&&(G-=n),!1===d?(X="start",F="bottom"==ca?N?F+v:F-v:N?F-v:F+v,G+=3,e&&(G+=e/2,X="middle"),0<B&&(X="middle")):X="middle",1==ba&&0<H&&!g&&!l&&Y<U&&(d=AmCharts.fitToBounds(b,0,U),Y=AmCharts.fitToBounds(Y,
	            0,U),ha=d-Y,0<ha&&(fill=AmCharts.rect(q,ha,a.height,z,H),fill.translate(d-ha+$,V),u.push(fill))),"bottom"==ca?(F+=O+n/2+na,N?0<B?(F=O-aa/2*Math.sin(ga)-v-3,G+=aa/2*Math.cos(ga)):F-=v+n+3+3:0<B?(F=O+aa/2*Math.sin(ga)+v+3,G-=aa/2*Math.cos(ga)):F+=v+r+3+3):(F+=V+n/2-na,G+=$,N?0<B?(F=aa/2*Math.sin(ga)+v+3,G-=aa/2*Math.cos(ga)):F+=v+3:0<B?(F=-(aa/2)*Math.sin(ga)-v-6,G+=aa/2*Math.cos(ga)):F-=v+n+3+r+3),"bottom"==ca?ha=(N?O-v-1:O+r-1)+na:(ia=$,ha=(N?V:V-v-r+1)-na),f&&(G+=f),V=G,0<B&&(V+=aa/2*Math.cos(ga)),
	        y&&(ca=0,N&&(ca=aa/2*Math.cos(ga)),V+ca>U+2||0>V))y.remove(),y=null}else{0<=b&&b<=O+1&&(0<v&&0<w&&b+k<=O+1&&(W=AmCharts.line(q,[0,v],[b+k,b+k],s,w,A),u.push(W)),0<t&&(X=AmCharts.line(q,[0,$,U+$],[b,b+V,b+V],E,t,A,x),u.push(X)));X="end";if(!0===N&&"left"==ca||!1===N&&"right"==ca)X="start";F=b-n/2;1==ba&&0<H&&!g&&!l&&(d=AmCharts.fitToBounds(b,0,O),Y=AmCharts.fitToBounds(Y,0,O),ga=d-Y,fill=AmCharts.polygon(q,[0,a.width,a.width,0],[0,0,ga,ga],z,H),fill.translate($,d-ga+V),u.push(fill));F+=n/2;"right"==
	    ca?(G+=$+U+na,F+=V,N?(G-=v+4,f||(F-=n/2+3)):(G+=v+4+r,F-=2)):N?(G+=v+4-na,f||(F-=n/2+3),g&&(G+=$,F+=V)):(G+=-v-r-4-2-na,F-=2);W&&("right"==ca?(ia+=$+na+U,ha+=V,ia=N?ia-r:ia+r):(ia-=na,N||(ia-=v+r)));f&&(F+=f);N=-3;"right"==ca&&(N+=V);y&&(F>O+1||F<N)&&(y.remove(),y=null)}W&&W.translate(ia,ha);!1===a.visible&&(W&&W.remove(),y&&(y.remove(),y=null));y&&(y.attr({"text-anchor":X}),y.translate(G,F),0!==B&&y.rotate(-B,a.chart.backgroundColor),a.allLabels.push(y)," "!=c&&(this.label=y));l||(a.counter=0===
	    ba?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}});AmCharts.RecFill=AmCharts.Class({construct:function(a,b,c,d){var e=a.dx,f=a.dy,g=a.orientation,h=0;if(c<b){var k=b;b=c;c=k}var l=d.fillAlpha;isNaN(l)&&(l=0);k=a.chart.container;d=d.fillColor;"V"==g?(b=AmCharts.fitToBounds(b,0,a.viH),c=AmCharts.fitToBounds(c,0,a.viH)):(b=AmCharts.fitToBounds(b,0,a.viW),c=AmCharts.fitToBounds(c,0,a.viW));c-=b;isNaN(c)&&(c=4,h=2,l=0);0>c&&"object"==typeof d&&(d=d.join(",").split(",").reverse());"V"==g?(a=AmCharts.rect(k,a.width,c,d,l),a.translate(e,b-h+f)):(a=AmCharts.rect(k,
	        c,a.height,d,l),a.translate(b-h+e,f));this.set=k.set([a])},graphics:function(){return this.set},getLabel:function(){}});AmCharts.AmChart=AmCharts.Class({construct:function(){this.version="3.1.1";AmCharts.addChart(this);this.createEvents("dataUpdated","init","rendered","drawn");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=11;this.usePrefixes=!1;this.numberFormatter={precision:-1,decimalSeparator:".",thousandsSeparator:","};
	        this.percentFormatter={precision:2,decimalSeparator:".",thousandsSeparator:","};this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];var a=document.createElement("div"),b=a.style;b.overflow="hidden";b.position="relative";b.textAlign="left";this.chartDiv=a;a=document.createElement("div");b=a.style;b.overflow="hidden";b.position="relative";b.textAlign="left";this.legendDiv=a;this.balloon=new AmCharts.AmBalloon;this.balloon.chart=this;
	        this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=2;this.handDrawThickness=1;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},
	            {number:1E-6,prefix:"\u03bc"},{number:0.001,prefix:"m"}];this.panEventsEnabled=!1;AmCharts.bezierX=3;AmCharts.bezierY=6;this.product="amcharts";this.animations=[]},drawChart:function(){this.drawBackground();this.redrawLabels();this.drawTitles()},drawBackground:function(){AmCharts.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,d=this.set;AmCharts.isModern||0!==c||(c=0.001);var e=this.updateWidth();this.realWidth=e;var f=this.updateHeight();this.realHeight=
	        f;this.background=b=AmCharts.polygon(a,[0,e-1,e-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);d.push(b);if(b=this.backgroundImage)this.path&&(b=this.path+b),this.bgImg=a=a.image(b,0,0,e,f),d.push(a)},drawTitles:function(){var a=this.titles;if(AmCharts.ifArray(a)){var b=20,c;for(c=0;c<a.length;c++){var d=a[c],e=d.color;void 0===e&&(e=this.color);var f=d.size;isNaN(d.alpha);var g=this.marginLeft,e=AmCharts.text(this.container,d.text,e,this.fontFamily,f);e.translate(g+(this.realWidth-this.marginRight-
	        g)/2,b);g=!0;void 0!==d.bold&&(g=d.bold);g&&e.attr({"font-weight":"bold"});b+=f+6;this.freeLabelsSet.push(e)}}},write:function(a){var b=this.balloon;b&&!b.chart&&(b.chart=this);a="object"!=typeof a?document.getElementById(a):a;a.innerHTML="";this.div=a;a.style.overflow="hidden";a.style.textAlign="left";var b=this.chartDiv,c=this.legendDiv,d=this.legend,e=c.style,f=b.style;this.measure();var g,h;if(d)switch(d.position){case "bottom":a.appendChild(b);a.appendChild(c);break;case "top":a.appendChild(c);
	        a.appendChild(b);break;case "absolute":g=document.createElement("div");h=g.style;h.position="relative";h.width=a.style.width;h.height=a.style.height;a.appendChild(g);e.position="absolute";f.position="absolute";void 0!==d.left&&(e.left=d.left+"px");void 0!==d.right&&(e.right=d.right+"px");void 0!==d.top&&(e.top=d.top+"px");void 0!==d.bottom&&(e.bottom=d.bottom+"px");d.marginLeft=0;d.marginRight=0;g.appendChild(b);g.appendChild(c);break;case "right":g=document.createElement("div");h=g.style;h.position=
	        "relative";h.width=a.style.width;h.height=a.style.height;a.appendChild(g);e.position="relative";f.position="absolute";g.appendChild(b);g.appendChild(c);break;case "left":g=document.createElement("div");h=g.style;h.position="relative";h.width=a.style.width;h.height=a.style.height;a.appendChild(g);e.position="absolute";f.position="relative";g.appendChild(b);g.appendChild(c);break;case "outside":a.appendChild(b)}else a.appendChild(b);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);
	        this.initChart()},createLabelsSet:function(){AmCharts.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){this.divIsFixed=AmCharts.findIfFixed(this.chartDiv);this.previousHeight=this.divRealHeight;this.previousWidth=this.divRealWidth;this.destroy();this.startInterval();var a=0;document.attachEvent&&!window.opera&&(a=1);this.dmouseX=this.dmouseY=0;var b=document.getElementsByTagName("html")[0];b&&window.getComputedStyle&&(b=window.getComputedStyle(b,
	        null))&&(this.dmouseY=AmCharts.removePx(b.getPropertyValue("margin-top")),this.dmouseX=AmCharts.removePx(b.getPropertyValue("margin-left")));this.mouseMode=a;a=new AmCharts.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);a.handDrawn=this.handDrawn;a.handDrawScatter=this.handDrawScatter;a.handDrawThickness=this.handDrawThickness;this.container=a;if(AmCharts.VML||AmCharts.SVG)a=this.container,this.set=a.set(),this.gridSet=a.set(),this.graphsBehindSet=a.set(),this.bulletBehindSet=a.set(),this.columnSet=
	        a.set(),this.graphsSet=a.set(),this.trendLinesSet=a.set(),this.axesLabelsSet=a.set(),this.axesSet=a.set(),this.cursorSet=a.set(),this.scrollbarsSet=a.set(),this.bulletSet=a.set(),this.freeLabelsSet=a.set(),this.balloonsSet=a.set(),this.balloonsSet.setAttr("id","balloons"),this.zoomButtonSet=a.set(),this.linkSet=a.set(),this.brrr(),this.renderFix()},measure:function(){var a=this.div,b=this.chartDiv,c=a.offsetWidth,d=a.offsetHeight,e=this.container;a.clientHeight&&(c=a.clientWidth,d=a.clientHeight);
	        var f=AmCharts.removePx(AmCharts.getStyle(a,"padding-left")),g=AmCharts.removePx(AmCharts.getStyle(a,"padding-right")),h=AmCharts.removePx(AmCharts.getStyle(a,"padding-top")),k=AmCharts.removePx(AmCharts.getStyle(a,"padding-bottom"));isNaN(f)||(c-=f);isNaN(g)||(c-=g);isNaN(h)||(d-=h);isNaN(k)||(d-=k);f=a.style;a=f.width;f=f.height;-1!=a.indexOf("px")&&(c=AmCharts.removePx(a));-1!=f.indexOf("px")&&(d=AmCharts.removePx(f));a=AmCharts.toCoordinate(this.width,c);f=AmCharts.toCoordinate(this.height,d);
	        if(a!=this.previousWidth||f!=this.previousHeight)b.style.width=a+"px",b.style.height=f+"px",e&&e.setSize(a,f),this.balloon.setBounds(2,2,a-2,f);this.realWidth=a;this.realHeight=f;this.divRealWidth=c;this.divRealHeight=d},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();this.interval&&clearInterval(this.interval);this.interval=NaN},clearTimeOuts:function(){var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){AmCharts.callMethod("clear",
	        [this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));a||AmCharts.removeChart(this)},setMouseCursor:function(a){"auto"==a&&AmCharts.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=[];var a=this.allLabels;this.createLabelsSet();
	        var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){if(this.container){var b=a.y,c=a.text,d=a.align,e=a.size,f=a.color,g=a.rotation,h=a.alpha,k=a.bold,l=AmCharts.toCoordinate(a.x,this.realWidth),b=AmCharts.toCoordinate(b,this.realHeight);l||(l=0);b||(b=0);void 0===f&&(f=this.color);isNaN(e)&&(e=this.fontSize);d||(d="start");"left"==d&&(d="start");"right"==d&&(d="end");"center"==d&&(d="middle",g?b=this.realHeight-b+b/2:l=this.realWidth/2-l);void 0===h&&(h=1);void 0===g&&(g=0);
	        b+=e/2;c=AmCharts.text(this.container,c,f,this.fontFamily,e,d,k,h);c.translate(l,b);0!==g&&c.rotate(g);a.url&&(c.setAttr("cursor","pointer"),c.click(function(){AmCharts.getURL(a.url)}));this.labelsSet.push(c);this.labels.push(c)}},addLabel:function(a,b,c,d,e,f,g,h,k,l){a={x:a,y:b,text:c,align:d,size:e,color:f,alpha:h,rotation:g,bold:k,url:l};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=
	        []},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,b=b.position;if("top"==b||"bottom"==b)a-=c,0>a&&(a=0),this.chartDiv.style.height=a+"px"}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var d=this.legendDiv,e=d.offsetWidth,f=d.offsetHeight,d=d.style,g=this.chartDiv.style,c=c.position;if("right"==c||"left"==c)a-=e,0>a&&(a=0),g.width=a+"px","left"==c?g.left=e+"px":d.left=a+"px",d.top=(b-f)/2+"px"}return a},
	        getTitleHeight:function(){var a=0,b=this.titles;if(0<b.length){var a=15,c;for(c=0;c<b.length;c++)a+=b[c].size+6}return a},addTitle:function(a,b,c,d,e){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:d,bold:e};this.titles.push(a);return a},addMouseWheel:function(){var a=this;window.addEventListener&&(window.addEventListener("DOMMouseScroll",function(b){a.handleWheel.call(a,b)},!1),document.addEventListener("mousewheel",function(b){a.handleWheel.call(a,b)},!1))},handleWheel:function(a){if(this.mouseIsOver){var b=
	            0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b);a.preventDefault&&a.preventDefault();a.returnValue=!1}},handleWheelReal:function(a){},addListeners:function(){var a=this,b=a.chartDiv;document.addEventListener?(a.panEventsEnabled&&"ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b);a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,
	            b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0)),b.addEventListener("mousedown",function(b){a.handleMouseDown.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,
	            b)}))},dispDUpd:function(){var a;this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,a="dataUpdated",this.fire(a,{type:a,chart:this}));this.chartCreated||(a="init",this.fire(a,{type:a,chart:this}));this.chartRendered||(a="rendered",this.fire(a,{type:a,chart:this}),this.chartRendered=!0);a="drawn";this.fire(a,{type:a,chart:this})},brrr:function(){var a=this.product,b=a+".com",c=window.location.hostname.split("."),d;2<=c.length&&(d=c[c.length-2]+"."+c[c.length-1]);AmCharts.remove(this.bbset);if(d==
	            b){var b=b+"/?utm_source=swf&utm_medium=demo&utm_campaign=jsDemo"+a,e="chart by ",c=145;"ammap"==a&&(e="tool by ",c=125);d=AmCharts.rect(this.container,c,20,"#FFFFFF",1);e=AmCharts.text(this.container,e+a+".com","#000000","Verdana",11,"start");e.translate(7,9);d=this.container.set([d,e]);"ammap"==a&&d.translate(this.realWidth-c,0);this.bbset=d;this.linkSet.push(d);d.setAttr("cursor","pointer");d.click(function(){window.location.href="http://"+b});for(a=0;a<d.length;a++)d[a].attr({cursor:"pointer"})}},
	        validateSize:function(){var a=this;a.measure();var b=a.legend;if((a.realWidth!=a.previousWidth||a.realHeight!=a.previousHeight)&&0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},100);a.timeOuts.push(c);a.legendInitTO=c}a.marginsUpdated="xy"!=a.chartType?!1:!0;clearTimeout(a.initTO);c=setTimeout(function(){a.initChart()},150);a.timeOuts.push(c);a.initTO=c}a.renderFix();b&&b.renderFix()},invalidateSize:function(){this.previousHeight=
	            this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.marginsUpdated="xy"!=this.chartType?!1:!0,this.initChart(a))},validateNow:function(){this.listenersAdded=!1;this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=
	            !0;this.initChart()},hideBalloon:function(){var a=this;clearInterval(a.hoverInt);clearTimeout(a.balloonTO);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},hideBalloonReal:function(){var a=this.balloon;a&&a.hide()},showBalloon:function(a,b,c,d,e){var f=this;clearTimeout(f.balloonTO);clearInterval(f.hoverInt);f.balloonTO=setTimeout(function(){f.showBalloonReal.call(f,a,b,c,d,e)},1)},showBalloonReal:function(a,b,c,d,e){this.handleMouseMove();var f=
	            this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(d,e),f.followCursor(!1)):f.followCursor(!0),a&&f.showBalloon(a))},handleTouchMove:function(a){this.hideBalloon();var b=this.chartDiv;a.touches&&(a=a.touches.item(0),this.mouseX=a.pageX-AmCharts.findPosX(b),this.mouseY=a.pageY-AmCharts.findPosY(b))},handleMouseOver:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!1},handleMouseMove:function(a){if(this.mouseIsOver){var b=
	            this.chartDiv;a||(a=window.event);var c,d;if(a){this.posX=AmCharts.findPosX(b);this.posY=AmCharts.findPosY(b);switch(this.mouseMode){case 1:c=a.clientX-this.posX;d=a.clientY-this.posY;if(!this.divIsFixed){var b=document.body,e,f;b&&(e=b.scrollLeft,y1=b.scrollTop);if(b=document.documentElement)f=b.scrollLeft,y2=b.scrollTop;e=Math.max(e,f);f=Math.max(y1,y2);c+=e;d+=f}break;case 0:this.divIsFixed?(c=a.clientX-this.posX,d=a.clientY-this.posY):(c=a.pageX-this.posX,d=a.pageY-this.posY)}a.touches&&(a=a.touches.item(0),
	            c=a.pageX-this.posX,d=a.pageY-this.posY);this.mouseX=c-this.dmouseX;this.mouseY=d-this.dmouseY}}},handleTouchStart:function(a){this.handleMouseDown(a)},handleTouchEnd:function(a){AmCharts.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(a){},handleMouseDown:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&a.preventDefault()},addLegend:function(a,b){AmCharts.extend(a,new AmCharts.AmLegend);var c;c="object"!=typeof b?document.getElementById(b):
	            b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;c=this.handleLegendEvent;this.listenTo(a,"showItem",c);this.listenTo(a,"hideItem",c);this.listenTo(a,"clickMarker",c);this.listenTo(a,"rollOverItem",c);this.listenTo(a,"rollOutItem",c);this.listenTo(a,"rollOverMarker",c);this.listenTo(a,"rollOutMarker",c);this.listenTo(a,"clickLabel",c)},removeLegend:function(){this.legend=void 0;this.legendDiv.innerHTML=""},handleResize:function(){(AmCharts.isPercents(this.width)||
	        AmCharts.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},getSVG:function(){if(AmCharts.hasSVG)return this.container},animate:function(a,b,c,d,e,f,g){a["an_"+b]&&AmCharts.removeFromArray(this.animations,a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:d,time:e,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},startInterval:function(){var a=this;clearInterval(a.interval);a.interval=
	            setInterval(function(){a.updateAnimations.call(a)},AmCharts.updateRate)},stopAnim:function(a){AmCharts.removeFromArray(this.animations,a)},updateAnimations:function(){var a;this.container&&this.container.update();for(a=this.animations.length-1;0<=a;a--){var b=this.animations[a],c=1E3*b.time/AmCharts.updateRate,d=b.frame+1,e=b.obj,f=b.attribute;if(d<=c){b.frame++;var g=Number(b.from),h=Number(b.to)-g,c=AmCharts[b.effect](0,d,g,h,c);0===h?this.animations.splice(a,1):e.node.style[f]=c+b.suffix}else e.node.style[f]=
	            Number(b.to)+b.suffix,this.animations.splice(a,1)}}});AmCharts.Slice=AmCharts.Class({construct:function(){}});AmCharts.SerialDataItem=AmCharts.Class({construct:function(){}});AmCharts.GraphDataItem=AmCharts.Class({construct:function(){}});AmCharts.Guide=AmCharts.Class({construct:function(){}});AmCharts.AmGraph=AmCharts.Class({construct:function(){this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=0;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.pointPosition="middle";this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=
	        0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.hideBulletsCount=this.bulletOffset=0;this.labelPosition="top";this.cornerRadiusTop=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=0;this.periodValue="";this.clustered=!0;this.y=this.x=0},draw:function(){var a=
	        this.chart,b=a.container;this.container=b;this.destroy();var c=b.set(),d=b.set();this.behindColumns?(a.graphsBehindSet.push(c),a.bulletBehindSet.push(d)):(a.graphsSet.push(c),a.bulletSet.push(d));this.bulletSet=d;if(!this.scrollbar){var e=a.marginLeftReal,a=a.marginTopReal;c.translate(e,a);d.translate(e,a)}b=b.set();AmCharts.remove(this.columnsSet);c.push(b);this.set=c;this.columnsSet=b;this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];AmCharts.ifArray(this.data)&&
	    (c=!1,"xy"==this.chartType?this.xAxis.axisCreated&&this.yAxis.axisCreated&&(c=!0):this.valueAxis.axisCreated&&(c=!0),!this.hidden&&c&&this.createGraph())},createGraph:function(){var a=this,b=a.chart;"inside"==a.labelPosition&&(a.labelPosition="bottom");a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;a.fillColors||(a.fillColors=a.lineColor);void 0===a.fillAlphas&&(a.fillAlphas=0);void 0===a.bulletColor&&(a.bulletColor=a.lineColor,a.bulletColorNegative=a.negativeLineColor);
	        void 0===a.bulletAlpha&&(a.bulletAlpha=a.lineAlpha);clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(a.chartType){case "serial":a.createSerialGraph();"candlestick"==a.type&&1>a.valueAxis.minMaxMultiplier&&a.positiveClip(a.set);break;case "radar":a.createRadarGraph();break;case "xy":a.createXYGraph(),a.positiveClip(a.set)}a.playedTO=setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=
	        !0},createXYGraph:function(){var a=[],b=[],c=this.xAxis,d=this.yAxis;this.pmh=d.viH+1;this.pmw=c.viW+1;this.pmy=this.pmx=0;var e;for(e=this.start;e<=this.end;e++){var f=this.data[e].axes[c.id].graphs[this.id],g=f.values,h=g.x,k=g.y,g=c.getCoordinate(h),l=d.getCoordinate(k);!isNaN(h)&&!isNaN(k)&&(a.push(g),b.push(l),(h=this.createBullet(f,g,l,e))||(h=0),k=this.labelText)&&(f=this.createLabel(f,g,l,k),this.allBullets.push(f),this.positionLabel(g,l,f,this.labelPosition,h))}this.drawLineGraph(a,b);this.launchAnimation()},
	        createRadarGraph:function(){var a=this.valueAxis.stackType,b=[],c=[],d,e,f;for(f=this.start;f<=this.end;f++){var g=this.data[f].axes[this.valueAxis.id].graphs[this.id],h;h="none"==a||"3d"==a?g.values.value:g.values.close;if(isNaN(h))this.drawLineGraph(b,c),b=[],c=[];else{var k=this.y-(this.valueAxis.getCoordinate(h)-this.height),l=180-360/(this.end-this.start+1)*f;h=k*Math.sin(l/180*Math.PI);k*=Math.cos(l/180*Math.PI);b.push(h);c.push(k);(l=this.createBullet(g,h,k,f))||(l=0);var m=this.labelText;
	            m&&(g=this.createLabel(g,h,k,m),this.allBullets.push(g),this.positionLabel(h,k,g,this.labelPosition,l));isNaN(d)&&(d=h);isNaN(e)&&(e=k)}}b.push(d);c.push(e);this.drawLineGraph(b,c);this.launchAnimation()},positionLabel:function(a,b,c,d,e){var f=c.getBBox();switch(d){case "left":a-=(f.width+e)/2+2;break;case "top":b-=(e+f.height)/2+1;break;case "right":a+=(f.width+e)/2+2;break;case "bottom":b+=(e+f.height)/2+1}c.translate(a,b)},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&
	        (a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=this.fillColorsSwitched=this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,d=this.data,e=this.chart.container,f=this.valueAxis,g=this.type,h=this.columnWidthReal;isNaN(this.columnWidth)||(h=this.columnWidth);var k=this.width,l=this.height,m=this.y,n=this.rotate,p=this.columnCount,q=AmCharts.toCoordinate(this.cornerRadiusTop,h/2),u=this.connect,r=[],s=[],w,v,t,A,E=this.chart.graphs.length,
	            x,z=this.dx/this.depthCount,H=this.dy/this.depthCount,I=f.stackType,B=this.labelPosition,ba=this.start,N=this.end,$=this.scrollbar,V=this.categoryAxis,Da=this.baseCoord,ca=this.negativeBase,Y=this.columnIndex,O=this.lineThickness,U=this.lineAlpha,na=this.lineColor,W=this.dashLength,X=this.set;"above"==B&&(B="top");"below"==B&&(B="bottom");var ga=B,ha=this.getGradRotation(),G=this.chart.columnSpacing,F=V.cellWidth,ia=(F*h-p)/p;G>ia&&(G=ia);var aa,y,Qa,Ya=l+1,Za=k+1,Ra=0,$a=0,ab,bb,Sa,Ta,Hb=this.fillColors,
	            Ha=this.negativeFillColors,ya=this.negativeLineColor,Ia=this.fillAlphas,Ja=this.negativeFillAlphas;"object"==typeof Ia&&(Ia=Ia[0]);"object"==typeof Ja&&(Ja=Ja[0]);var Ua=f.getCoordinate(f.min);f.logarithmic&&(Ua=f.getCoordinate(f.minReal));this.minCoord=Ua;this.resetBullet&&(this.bullet="none");if(!$&&("line"==g||"smoothedLine"==g||"step"==g)&&(1==d.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),Ha||void 0!=ya)){var Ea=ca;Ea>f.max&&(Ea=f.max);Ea<f.min&&(Ea=f.min);
	            f.logarithmic&&(Ea=f.minReal);var ua=f.getCoordinate(Ea),sb=f.getCoordinate(f.max);n?(Ya=l,Za=Math.abs(sb-ua),ab=l,bb=Math.abs(Ua-ua),Ta=$a=0,f.reversed?(Ra=0,Sa=ua):(Ra=ua,Sa=0)):(Za=k,Ya=Math.abs(sb-ua),bb=k,ab=Math.abs(Ua-ua),Sa=Ra=0,f.reversed?(Ta=m,$a=ua):Ta=ua+1)}var va=Math.round;this.pmx=va(Ra);this.pmy=va($a);this.pmh=va(Ya);this.pmw=va(Za);this.nmx=va(Sa);this.nmy=va(Ta);this.nmh=va(ab);this.nmw=va(bb);AmCharts.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);h="column"==g?(F*h-G*(p-
	        1))/p:F*h;1>h&&(h=1);var P;if("line"==g||"step"==g||"smoothedLine"==g){if(0<ba)for(P=ba-1;-1<P;P--)if(aa=d[P],y=aa.axes[f.id].graphs[b],Qa=y.values.value,!isNaN(Qa)){ba=P;break}if(N<d.length-1)for(P=N+1;P<d.length;P++)if(aa=d[P],y=aa.axes[f.id].graphs[b],Qa=y.values.value,!isNaN(Qa)){N=P;break}}N<d.length-1&&N++;var S=[],T=[],Ka=!1;if("line"==g||"step"==g||"smoothedLine"==g)if(this.stackable&&"regular"==I||"100%"==I||this.fillToGraph)Ka=!0;var tb=this.noStepRisers;for(P=ba;P<=N;P++){aa=d[P];y=aa.axes[f.id].graphs[b];
	            y.index=P;var K,L,J,da,oa=NaN,D=NaN,C=NaN,Q=NaN,M=NaN,La=NaN,za=NaN,Ma=NaN,Aa=NaN,Z=NaN,fa=NaN,pa=NaN,qa=NaN,R=NaN,cb=NaN,db=NaN,ja=NaN,la=void 0,wa=Hb,Na=Ia,ra=na,ka,sa,eb=this.pattern;void 0!=y.pattern&&(eb=y.pattern);void 0!=y.color&&(wa=y.color);y.fillColors&&(wa=y.fillColors);isNaN(y.alpha)||(Na=y.alpha);isNaN(y.dashLength)||(W=y.dashLength);var ta=y.values;f.recalculateToPercents&&(ta=y.percents);if(ta){R=this.stackable&&"none"!=I&&"3d"!=I?ta.close:ta.value;if("candlestick"==g||"ohlc"==g)R=
	                ta.close,db=ta.low,za=f.getCoordinate(db),cb=ta.high,Aa=f.getCoordinate(cb);ja=ta.open;C=f.getCoordinate(R);isNaN(ja)||(M=f.getCoordinate(ja));if(!$)switch(this.showBalloonAt){case "close":y.y=C;break;case "open":y.y=M;break;case "high":y.y=Aa;break;case "low":y.y=za}var oa=aa.x[V.id],ma=Math.floor(F/2),Ba=ma;"start"==this.pointPosition&&(oa-=F/2,ma=0,Ba=F);if(tb){var fb=this.columnWidth;isNaN(fb)||(ma*=fb,Ba*=fb)}$||(y.x=oa);-1E5>oa&&(oa=-1E5);oa>k+1E5&&(oa=k+1E5);n?(D=C,Q=M,M=C=oa,isNaN(ja)&&!this.fillToGraph&&
	            (Q=Da),La=za,Ma=Aa):(Q=D=oa,isNaN(ja)&&!this.fillToGraph&&(M=Da));R<ja&&(y.isNegative=!0,Ha&&(wa=Ha),Ja&&(Na=Ja),void 0!=ya&&(ra=ya));switch(g){case "line":isNaN(R)?u||(this.drawLineGraph(r,s,S,T),r=[],s=[],S=[],T=[]):(y.isNegative=R<ca?!0:!1,r.push(D),s.push(C),Z=D,fa=C,pa=D,qa=C,!Ka||isNaN(M)||isNaN(Q)||(S.push(Q),T.push(M)),void 0==y.lineColor&&void 0==y.fillColors&&isNaN(y.dashLength)||(this.drawLineGraph(r,s,S,T),r=[D],s=[C],S=[],T=[],this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=
	                y.fillColors,this.dashLengthSwitched=y.dashLength));break;case "smoothedLine":isNaN(R)?u||(this.drawSmoothedGraph(r,s,S,T),r=[],s=[],S=[],T=[]):(y.isNegative=R<ca?!0:!1,r.push(D),s.push(C),Z=D,fa=C,pa=D,qa=C,!Ka||isNaN(M)||isNaN(Q)||(S.push(Q),T.push(M)),void 0==y.lineColor&&void 0==y.fillColors&&isNaN(y.dashLength)||(this.drawSmoothedGraph(r,s,S,T),r=[D],s=[C],S=[],T=[],this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors,this.dashLengthSwitched=y.dashLength));break;case "step":isNaN(R)?
	            u||(w=v=NaN,this.drawLineGraph(r,s,S,T),r=[],s=[],S=[],T=[]):(y.isNegative=R<ca?!0:!1,void 0==y.lineColor&&void 0==y.fillColors&&isNaN(y.dashLength)||(this.drawLineGraph(r,s,S,T),r=[],s=[],S=[],T=[],this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors,this.dashLengthSwitched=y.dashLength),n?(isNaN(w)||(r.push(w),s.push(C-ma)),s.push(C-ma),r.push(D),s.push(C+Ba),r.push(D),!Ka||isNaN(M)||isNaN(Q)||(S.push(t),T.push(M-ma),S.push(Q),T.push(M-ma),S.push(Q),T.push(M+Ba))):(isNaN(v)||
	            (s.push(v),r.push(D-ma)),r.push(D-ma),s.push(C),r.push(D+Ba),s.push(C),!Ka||isNaN(M)||isNaN(Q)||(S.push(Q-ma),T.push(A),S.push(Q-ma),T.push(M),S.push(Q+Ba),T.push(M))),w=D,v=C,t=Q,A=M,Z=D,fa=C,pa=D,qa=C,tb&&(w=v=NaN,this.drawLineGraph(r,s,S,T),r=[],s=[],S=[],T=[]));break;case "column":ka=ra;void 0!=y.lineColor&&(ka=y.lineColor);if(!isNaN(R)){R<ca?(y.isNegative=!0,Ha&&(wa=Ha),void 0!=ya&&(ka=ya)):y.isNegative=!1;var ub=f.min,vb=f.max;if(!(R<ub&&ja<ub||R>vb&&ja>vb))if(n){"3d"==I?(L=C-0.5*(h+G)+G/2+
	                H*Y,K=Q+z*Y):(L=C-(p/2-Y)*(h+G)+G/2,K=Q);J=h;Z=D;fa=L+h/2;pa=D;qa=L+h/2;L+J>l&&(J=l-L);0>L&&(J+=L,L=0);da=D-Q;var Ib=K;K=AmCharts.fitToBounds(K,0,k);da+=Ib-K;da=AmCharts.fitToBounds(da,-K,k-K+z*Y);if(L<l&&0<J&&(la=new AmCharts.Cuboid(e,da,J,z-a.d3x,H-a.d3y,wa,Na,O,ka,U,ha,q,n,W,eb),"bottom"!=B))if(B=f.reversed?"left":"right",0>R)B=f.reversed?"right":"left";else if("regular"==I||"100%"==I)Z+=this.dx}else{"3d"==I?(K=D-0.5*(h+G)+G/2+z*Y,L=M+H*Y):(K=D-(p/2-Y)*(h+G)+G/2,L=M);J=h;Z=K+h/2;fa=C;pa=K+h/2;
	                qa=C;K+J>k+Y*z&&(J=k-K+Y*z);0>K&&(J+=K,K=0);da=C-M;var Jb=L;L=AmCharts.fitToBounds(L,this.dy,l);da+=Jb-L;da=AmCharts.fitToBounds(da,-L+H*Y,l-L);if(K<k+Y*z&&0<J)if(la=new AmCharts.Cuboid(e,J,da,z-a.d3x,H-a.d3y,wa,Na,O,ka,this.lineAlpha,ha,q,n,W,eb),0>R&&"middle"!=B)B="bottom";else if(B=ga,"regular"==I||"100%"==I)fa+=this.dy}if(la&&(sa=la.set,sa.translate(K,L),this.columnsSet.push(sa),(y.url||this.showHandOnHover)&&sa.setAttr("cursor","pointer"),!$)){"none"==I&&(x=n?(this.end+1-P)*E-c:E*P+c);"3d"==
	            I&&(n?(x=(E-c)*(this.end+1-P),Z+=z*this.columnIndex,pa+=z*this.columnIndex,y.y+=z*this.columnIndex):(x=(E-c)*(P+1),Z+=3,fa+=H*this.columnIndex+7,qa+=H*this.columnIndex,y.y+=H*this.columnIndex));if("regular"==I||"100%"==I)B="middle",x=n?0<ta.value?(this.end+1-P)*E+c:(this.end+1-P)*E-c:0<ta.value?E*P+c:E*P-c;this.columnsArray.push({column:la,depth:x});y.x=n?L+J/2:K+J/2;this.ownColumns.push(la);this.animateColumns(la,P,D,Q,C,M);this.addListeners(sa,y)}}break;case "candlestick":if(!isNaN(ja)&&!isNaN(R)){var Va,
	                gb;ka=ra;void 0!=y.lineColor&&(ka=y.lineColor);if(n){if(L=C-h/2,K=Q,J=h,L+J>l&&(J=l-L),0>L&&(J+=L,L=0),L<l&&0<J){var hb,ib;R>ja?(hb=[D,Ma],ib=[Q,La]):(hb=[Q,Ma],ib=[D,La]);!isNaN(Ma)&&!isNaN(La)&&C<l&&0<C&&(Va=AmCharts.line(e,hb,[C,C],ka,U,O),gb=AmCharts.line(e,ib,[C,C],ka,U,O));da=D-Q;la=new AmCharts.Cuboid(e,da,J,z,H,wa,Ia,O,ka,U,ha,q,n,W)}}else if(K=D-h/2,L=M+O/2,J=h,K+J>k&&(J=k-K),0>K&&(J+=K,K=0),da=C-M,K<k&&0<J){var la=new AmCharts.Cuboid(e,J,da,z,H,wa,Na,O,ka,U,ha,q,n,W),jb,kb;R>ja?(jb=[C,Aa],
	                kb=[M,za]):(jb=[M,Aa],kb=[C,za]);!isNaN(Aa)&&!isNaN(za)&&D<k&&0<D&&(Va=AmCharts.line(e,[D,D],jb,ka,U,O),gb=AmCharts.line(e,[D,D],kb,ka,U,O))}la&&(sa=la.set,X.push(sa),sa.translate(K,L-O/2),(y.url||this.showHandOnHover)&&sa.setAttr("cursor","pointer"),Va&&(X.push(Va),X.push(gb)),Z=D,fa=C,pa=D,qa=C,$||(y.x=n?L+J/2:K+J/2,this.animateColumns(la,P,D,Q,C,M),this.addListeners(sa,y)))}break;case "ohlc":if(!(isNaN(ja)||isNaN(cb)||isNaN(db)||isNaN(R))){R<ja&&(y.isNegative=!0,void 0!=ya&&(ra=ya));var lb,mb,
	                nb;if(n){var ob=C-h/2,ob=AmCharts.fitToBounds(ob,0,l),wb=AmCharts.fitToBounds(C,0,l),pb=C+h/2,pb=AmCharts.fitToBounds(pb,0,l);mb=AmCharts.line(e,[Q,Q],[ob,wb],ra,U,O,W);0<C&&C<l&&(lb=AmCharts.line(e,[La,Ma],[C,C],ra,U,O,W));nb=AmCharts.line(e,[D,D],[wb,pb],ra,U,O,W)}else{var qb=D-h/2,qb=AmCharts.fitToBounds(qb,0,k),xb=AmCharts.fitToBounds(D,0,k),rb=D+h/2,rb=AmCharts.fitToBounds(rb,0,k);mb=AmCharts.line(e,[qb,xb],[M,M],ra,U,O,W);0<D&&D<k&&(lb=AmCharts.line(e,[D,D],[za,Aa],ra,U,O,W));nb=AmCharts.line(e,
	                [xb,rb],[C,C],ra,U,O,W)}X.push(mb);X.push(lb);X.push(nb);Z=D;fa=C;pa=D;qa=C}}if(!$&&!isNaN(R)){var yb=this.hideBulletsCount;if(this.end-this.start<=yb||0===yb){var Fa=this.createBullet(y,pa,qa,P);Fa||(Fa=0);var zb=this.labelText;if(zb){var ea=this.createLabel(y,0,0,zb),xa=0,Ca=0,Ab=ea.getBBox(),Wa=Ab.width,Xa=Ab.height;switch(B){case "left":xa=-(Wa/2+Fa/2+3);break;case "top":Ca=-(Xa/2+Fa/2+3);break;case "right":xa=Fa/2+2+Wa/2;break;case "bottom":n&&"column"==g?(Z=Da,0>R?(xa=-6,ea.attr({"text-anchor":"end"})):
	                (xa=6,ea.attr({"text-anchor":"start"}))):(Ca=Fa/2+Xa/2,ea.x=-(Wa/2+2));break;case "middle":"column"==g&&(n?(Ca=-(Xa/2)+this.fontSize/2,xa=-(D-Q)/2-z,0>da&&(xa+=z),Math.abs(D-Q)<Wa&&!this.showAllValueLabels&&(ea.remove(),ea=null)):(Ca=-(C-M)/2,0>da&&(Ca-=H),Math.abs(C-M)<Xa&&!this.showAllValueLabels&&(ea.remove(),ea=null)))}if(ea){if(isNaN(fa)||isNaN(Z))ea.remove(),ea=null;else if(Z+=xa,fa+=Ca,ea.translate(Z,fa),n){if(0>fa||fa>l)ea.remove(),ea=null}else{var Bb=0;"3d"==I&&(Bb=z*Y);if(0>Z||Z>k+Bb)ea.remove(),
	                ea=null}ea&&this.allBullets.push(ea)}}if("column"==g&&"regular"==I||"100%"==I){var Cb=f.totalText;if(Cb){var Ga=this.createLabel(y,0,0,Cb,f.totalTextColor);this.allBullets.push(Ga);var Db=Ga.getBBox(),Eb=Db.width,Fb=Db.height,Oa,Pa,Gb=f.totals[P];Gb&&Gb.remove();n?(Pa=C,Oa=0>R?D-Eb/2-2:D+Eb/2+3):(Oa=D,Pa=0>R?C+Fb/2:C-Fb/2-3);Ga.translate(Oa,Pa);f.totals[P]=Ga;n?(0>Pa||Pa>l)&&Ga.remove():(0>Oa||Oa>k)&&Ga.remove()}}}}}}if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(r,
	            s,S,T):this.drawLineGraph(r,s,S,T),$||this.launchAnimation();this.bulletsHidden&&this.hideBullets()},animateColumns:function(a,b,c,d,e,f){var g=this;c=g.chart.startDuration;0<c&&!g.animationPlayed&&(g.seqAn?(a.set.hide(),g.animationArray.push(a),a=setTimeout(function(){g.animate.call(g)},1E3*(c/(g.end-g.start+1))*(b-g.start)),g.timeOuts.push(a)):g.animate(a))},createLabel:function(a,b,c,d,e){var f=this.chart,g=a.labelColor;g||(g=this.color);g||(g=f.color);e&&(g=e);e=this.fontSize;void 0===e&&(this.fontSize=
	            e=f.fontSize);a=f.formatString(d,a,this);a=AmCharts.cleanFromEmpty(a);f=AmCharts.text(this.container,a,g,f.fontFamily,e);f.translate(b,c);this.bulletSet.push(f);return f},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,d){var e=this;if(1<a.length){var f=e.set,g=e.container,h=g.set(),k=g.set();f.push(k);f.push(h);var l=e.lineAlpha,m=e.lineThickness,f=e.fillAlphas,n=e.lineColor,
	            p=e.negativeLineAlpha;isNaN(p)&&(p=l);var q=e.lineColorSwitched;q&&(n=q);var q=e.fillColors,u=e.fillColorsSwitched;u&&(q=u);var r=e.dashLength;(u=e.dashLengthSwitched)&&(r=u);var u=e.negativeLineColor,s=e.negativeFillColors,w=e.negativeFillAlphas,v=e.baseCoord;0!==e.negativeBase&&(v=e.valueAxis.getCoordinate(e.negativeBase));l=AmCharts.line(g,a,b,n,l,m,r,!1,!0);h.push(l);h.click(function(){e.handleGraphClick()});void 0!==u&&(m=AmCharts.line(g,a,b,u,p,m,r,!1,!0),k.push(m));if(0<f||0<w)if(m=a.join(";").split(";"),
	                p=b.join(";").split(";"),"serial"==e.chartType&&(0<c.length?(c.reverse(),d.reverse(),m=a.concat(c),p=b.concat(d)):e.rotate?(p.push(p[p.length-1]),m.push(v),p.push(p[0]),m.push(v),p.push(p[0]),m.push(m[0])):(m.push(m[m.length-1]),p.push(v),m.push(m[0]),p.push(v),m.push(a[0]),p.push(p[0]))),a=e.gradientRotation,0<f&&(b=AmCharts.polygon(g,m,p,q,f,1,"#000",0,a),b.pattern(e.pattern),h.push(b)),s||void 0!==u)isNaN(w)&&(w=f),s||(s=u),g=AmCharts.polygon(g,m,p,s,w,1,"#000",0,a),g.pattern(e.pattern),k.push(g),
	            k.click(function(){e.handleGraphClick()});e.applyMask(k,h)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chartType||this.scrollbar||(this.positiveClip(b),0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,b,c,d){if(1<a.length){var e=this.set,f=this.container,g=f.set(),h=f.set();e.push(h);e.push(g);var k=this.lineAlpha,l=this.lineThickness,e=this.dashLength,m=this.fillAlphas,n=this.lineColor,p=this.fillColors,q=this.negativeLineColor,u=this.negativeFillColors,r=this.negativeFillAlphas,
	            s=this.baseCoord,w=this.lineColorSwitched;w&&(n=w);(w=this.fillColorsSwitched)&&(p=w);w=this.negativeLineAlpha;isNaN(w)&&(w=k);k=new AmCharts.Bezier(f,a,b,n,k,l,p,0,e);g.push(k.path);void 0!==q&&(l=new AmCharts.Bezier(f,a,b,q,w,l,p,0,e),h.push(l.path));0<m&&(k=a.join(";").split(";"),n=b.join(";").split(";"),l="",0<c.length?(c.reverse(),d.reverse(),k=a.concat(c),n=b.concat(d)):(this.rotate?(l+=" L"+s+","+b[b.length-1],l+=" L"+s+","+b[0]):(l+=" L"+a[a.length-1]+","+s,l+=" L"+a[0]+","+s),l+=" L"+a[0]+
	            ","+b[0]),c=new AmCharts.Bezier(f,k,n,NaN,0,0,p,m,e,l),c.path.pattern(this.pattern),g.push(c.path),u||void 0!==q)&&(r||(r=m),u||(u=q),a=new AmCharts.Bezier(f,a,b,NaN,0,0,u,r,e,l),a.path.pattern(this.pattern),h.push(a.path));this.applyMask(h,g)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=a.set,d=a.bulletSet;AmCharts.VML||(c.attr({opacity:a.startAlpha}),d.attr({opacity:a.startAlpha}));c.hide();d.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},
	            1E3*a.index*b),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,d=this.x,e=this.y;b.show();c.show();var f=a.startDuration,a=a.startEffect;b&&(this.rotate?(b.translate(-1E3,e),c.translate(-1E3,e)):(b.translate(d,-1E3),c.translate(d,-1E3)),b.animate({opacity:1,translate:d+","+e},f,a),c.animate({opacity:1,translate:d+","+e},f,a))},animate:function(a){var b=this.chart,c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=AmCharts[AmCharts.getEffect(b.startEffect)];
	            b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=this.lineColor,0===b&&(b=this.fillColors)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0===a&&(a=this.lineAlpha,0===a&&this.fillAlphas&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=1));return a},createBullet:function(a,b,c,d){d=this.container;var e=this.bulletOffset,
	            f=this.bulletSize;isNaN(a.bulletSize)||(f=a.bulletSize);var g=a.values.value;isNaN(this.maxValue)||isNaN(g)||(f=g/this.maxValue*this.maxBulletSize);var h=f;this.bulletAxis&&(f=a.values.error,isNaN(f)||(g=f),f=this.bulletAxis.stepWidth*g);f<this.minBulletSize&&(f=this.minBulletSize);this.rotate?b+=e:c-=e;var k,l=this.bulletColor;a.lineColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(l=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(l=this.bulletColorNegative);
	            void 0!==a.color&&(l=a.color);e=this.bullet;a.bullet&&(e=a.bullet);var g=this.bulletBorderThickness,m=this.bulletBorderColor,n=this.bulletBorderAlpha,p=this.bulletAlpha;m||(m=l);var q=a.alpha;isNaN(q)||(p=q);if("none"!=this.bullet||a.bullet)k=AmCharts.bullet(d,e,f,l,p,g,m,n,h);if(this.customBullet||a.customBullet)h=this.customBullet,a.customBullet&&(h=a.customBullet),h&&(k&&k.remove(),"function"==typeof h?(k=new h,k.chart=this.chart,a.bulletConfig&&(k.availableSpace=c,k.graph=this,a.bulletConfig.minCoord=
	                this.minCoord-c,k.bulletConfig=a.bulletConfig),k.write(d),k=k.set):(this.chart.path&&(h=this.chart.path+h),k=d.set(),d=d.image(h,0,0,f,f),k.push(d),this.centerCustomBullets&&d.translate(-f/2,-f/2)));k&&((a.url||this.showHandOnHover)&&k.setAttr("cursor","pointer"),"serial"==this.chartType&&(0>b-0||b-0>this.width||c<-f/2||c-0>this.height)&&(k.remove(),k=null),k&&(this.bulletSet.push(k),k.translate(b,c),this.addListeners(k,a),this.allBullets.push(k)),a.bx=b,a.by=c);a.bulletGraphics=k;return f},showBullets:function(){var a=
	            this.allBullets,b;this.bulletsHidden=!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,
	            a)})},handleRollOver:function(a,b){if(a){var c=this.chart,d={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOverGraphItem",d);c.fire("rollOverGraphItem",d);clearTimeout(c.hoverInt);d=this.showBalloon;c.chartCursor&&"serial"==this.chartType&&(d=!1,!c.chartCursor.valueBalloonsEnabled&&this.showBalloon&&(d=!0));if(d){var d=c.formatString(this.balloonText,a,a.graph),e=this.balloonFunction;e&&(d=e(a,a.graph));d=AmCharts.cleanFromEmpty(d);e=
	            c.getBalloonColor(this,a);c.balloon.showBullet=!1;c.balloon.pointerOrientation="V";var f=a.x,g=a.y;c.rotate&&(f=a.y,g=a.x);c.showBalloon(d,e,!0,f+c.marginLeftReal,g+c.marginTopReal)}}},handleRollOut:function(a,b){this.chart.hideBalloon();if(a){var c={type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOutGraphItem",c);this.chart.fire("rollOutGraphItem",c)}},handleClick:function(a,b){if(a){var c={type:"clickGraphItem",item:a,index:a.index,graph:this,
	            target:this,chart:this.chart,event:b};this.fire("clickGraphItem",c);this.chart.fire("clickGraphItem",c);AmCharts.getURL(a.url,this.urlTarget)}this.handleGraphClick()},handleGraphClick:function(){var a={type:"clickGraph",graph:this,target:this,chart:this.chart};this.fire("clickGraph",a);this.chart.fire("clickGraph",a)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rightClickGraphItem",c);this.chart.fire("rightClickGraphItem",
	            c)}},handleDoubleClick:function(a,b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("doubleClickGraphItem",c);this.chart.fire("doubleClickGraphItem",c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var d=b[c].set;d&&d.setAttr("opacity",a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){AmCharts.remove(this.set);
	            AmCharts.remove(this.bulletSet);var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]}});AmCharts.ChartCursor=AmCharts.Class({construct:function(){this.createEvents("changed","zoomed","onHideCursor","draw","selected");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=0.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition="middle";this.bulletsEnabled=this.skipZoomDispatch=
	        !1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=0.3},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container;a.rotate=b.rotate;a.container=c;c=c.set();c.translate(a.x,a.y);a.set=c;b.cursorSet.push(c);c=new AmCharts.AmBalloon;c.chart=b;a.categoryBalloon=c;AmCharts.copyProperties(b.balloon,c);c.cornerRadius=0;c.shadowAlpha=0;c.borderThickness=1;c.borderAlpha=1;c.showBullet=!1;var d=a.categoryBalloonColor;void 0===d&&(d=
	        a.cursorColor);c.fillColor=d;c.fillAlpha=a.categoryBalloonAlpha;c.borderColor=d;c.color=a.color;a.rotate&&(c.pointerOrientation="H");a.prevX=[];a.prevY=[];a.prevTX=[];a.prevTY=[];if(a.valueBalloonsEnabled)for(c=0;c<b.graphs.length;c++)d=new AmCharts.AmBalloon,d.chart=b,AmCharts.copyProperties(b.balloon,d),b.graphs[c].valueBalloon=d;"cursor"==a.type?a.createCursor():a.createCrosshair();a.interval=setInterval(function(){a.detectMovement.call(a)},40)},updateData:function(){var a=this.chart;this.data=
	        a.chartData;this.firstTime=a.firstTime;this.lastTime=a.lastTime},createCursor:function(){var a=this.chart,b=this.cursorAlpha,c=a.categoryAxis,d=c.position,e=c.inside,f=c.axisThickness,g=this.categoryBalloon,h,k,l=a.dx,m=a.dy,n=this.x,p=this.y,q=this.width,u=this.height,a=a.rotate,r=c.tickLength;g.pointerWidth=r;a?(h=[0,q,q+l],k=[0,0,m]):(h=[l,0,0],k=[m,0,u]);this.line=b=AmCharts.line(this.container,h,k,this.cursorColor,b,1);this.set.push(b);a?(e&&(g.pointerWidth=0),"right"==d?e?g.setBounds(n,p+m,
	        n+q+l,p+u+m):g.setBounds(n+q+l+f,p+m,n+q+1E3,p+u+m):e?g.setBounds(n,p,q+n,u+p):g.setBounds(-1E3,-1E3,n-r-f,p+u+15)):(g.maxWidth=q,c.parseDates&&(r=0,g.pointerWidth=0),"top"==d?e?g.setBounds(n+l,p+m,q+l+n,u+p):g.setBounds(n+l,-1E3,q+l+n,p+m-r-f):e?g.setBounds(n,p,q+n,u+p-r):g.setBounds(n,p+u+r+f-1,n+q,p+u+r+f));this.hideCursor()},createCrosshair:function(){var a=this.cursorAlpha,b=this.container,c=AmCharts.line(b,[0,0],[0,this.height],this.cursorColor,a,1),a=AmCharts.line(b,[0,this.width],[0,0],this.cursorColor,
	        a,1);this.set.push(c);this.set.push(a);this.vLine=c;this.hLine=a;this.hideCursor()},detectMovement:function(){var a=this.chart;if(a.mouseIsOver){var b=a.mouseX-this.x,c=a.mouseY-this.y;0<b&&b<this.width&&0<c&&c<this.height?(this.drawing?this.rolledOver||a.setMouseCursor("crosshair"):this.pan&&(this.rolledOver||a.setMouseCursor("move")),this.rolledOver=!0,this.setPosition()):this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)}else this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)},
	        getMousePosition:function(){var a,b=this.width,c=this.height;a=this.chart;this.rotate?(a=a.mouseY-this.y,0>a&&(a=0),a>c&&(a=c)):(a=a.mouseX-this.x,0>a&&(a=0),a>b&&(a=b));return a},updateCrosshair:function(){var a=this.chart,b=a.mouseX-this.x,c=a.mouseY-this.y,d=this.vLine,e=this.hLine,b=AmCharts.fitToBounds(b,0,this.width),c=AmCharts.fitToBounds(c,0,this.height);0<this.cursorAlpha&&(d.show(),e.show(),d.translate(b,0),e.translate(0,c));this.zooming&&(a.hideXScrollbar&&(b=NaN),a.hideYScrollbar&&(c=
	            NaN),this.updateSelectionSize(b,c));a.mouseIsOver||this.zooming||this.hideCursor()},updateSelectionSize:function(a,b){AmCharts.remove(this.selection);var c=this.selectionPosX,d=this.selectionPosY,e=0,f=0,g=this.width,h=this.height;isNaN(a)||(c>a&&(e=a,g=c-a),c<a&&(e=c,g=a-c),c==a&&(e=a,g=0));isNaN(b)||(d>b&&(f=b,h=d-b),d<b&&(f=d,h=b-d),d==b&&(f=b,h=0));0<g&&0<h&&(c=AmCharts.rect(this.container,g,h,this.cursorColor,this.selectionAlpha),c.translate(e+this.x,f+this.y),this.selection=c)},arrangeBalloons:function(){var a=
	            this.valueBalloons,b=this.x,c=this.y,d=this.height+c;a.sort(this.compareY);var e;for(e=0;e<a.length;e++){var f=a[e].balloon;f.setBounds(b,c,b+this.width,d);f.prevX=this.prevX[e];f.prevY=this.prevY[e];f.prevTX=this.prevTX[e];f.prevTY=this.prevTY[e];f.draw();d=f.yPos-3}this.arrangeBalloons2()},compareY:function(a,b){return a.yy<b.yy?1:-1},arrangeBalloons2:function(){var a=this.valueBalloons;a.reverse();var b,c=this.x,d,e,f=a.length;for(e=0;e<f;e++){var g=a[e].balloon;b=g.bottom;var h=g.bottom-g.yPos,
	            k=f-e-1;0<e&&b-h<d+3&&(g.setBounds(c,d+3,c+this.width,d+h+3),g.prevX=this.prevX[k],g.prevY=this.prevY[k],g.prevTX=this.prevTX[k],g.prevTY=this.prevTY[k],g.draw());g.set&&g.set.show();this.prevX[k]=g.prevX;this.prevY[k]=g.prevY;this.prevTX[k]=g.prevTX;this.prevTY[k]=g.prevTY;d=g.bottom}},showBullets:function(){AmCharts.remove(this.allBullets);var a=this.container,b=a.set();this.set.push(b);this.set.show();this.allBullets=b;var b=this.chart.graphs,c;for(c=0;c<b.length;c++){var d=b[c];if(!d.hidden&&
	            d.balloonText){var e=this.data[this.index].axes[d.valueAxis.id].graphs[d.id],f=e.y;if(!isNaN(f)){var g,h;g=e.x;this.rotate?(h=f,f=g):h=g;d=AmCharts.circle(a,this.bulletSize/2,this.chart.getBalloonColor(d,e),d.cursorBulletAlpha);d.translate(h,f);this.allBullets.push(d)}}}},destroy:function(){this.clear();AmCharts.remove(this.selection);this.selection=null;var a=this.categoryBalloon;a&&a.destroy();this.destroyValueBalloons();AmCharts.remove(this.set)},clear:function(){clearInterval(this.interval)},
	        destroyValueBalloons:function(){var a=this.valueBalloons;if(a){var b;for(b=0;b<a.length;b++)a[b].balloon.hide()}},zoom:function(a,b,c,d){var e=this.chart;this.destroyValueBalloons();this.zooming=!1;var f;this.rotate?this.selectionPosY=f=e.mouseY:this.selectionPosX=f=e.mouseX;this.start=a;this.end=b;this.startTime=c;this.endTime=d;this.zoomed=!0;var g=e.categoryAxis,e=this.rotate;f=this.width;var h=this.height;g.parseDates&&!g.equalSpacing?(a=d-c+g.minDuration(),a=e?h/a:f/a):a=e?h/(b-a):f/(b-a);this.stepWidth=
	            a;this.tempVal=this.valueBalloonsEnabled;this.valueBalloonsEnabled=!1;this.setPosition();this.valueBalloonsEnabled=this.tempVal;this.hideCursor()},hideObj:function(a){a&&a.hide()},hideCursor:function(a){void 0===a&&(a=!0);this.hideObj(this.set);this.hideObj(this.categoryBalloon);this.hideObj(this.line);this.hideObj(this.vLine);this.hideObj(this.hLine);this.hideObj(this.allBullets);this.destroyValueBalloons();this.selectWithoutZooming||AmCharts.remove(this.selection);this.previousIndex=NaN;a&&this.fire("onHideCursor",
	            {type:"onHideCursor",chart:this.chart,target:this});this.drawing||this.chart.setMouseCursor("auto");this.normalizeBulletSize()},setPosition:function(a,b){void 0===b&&(b=!0);if("cursor"==this.type){if(AmCharts.ifArray(this.data)){isNaN(a)&&(a=this.getMousePosition());if((a!=this.previousMousePosition||!0===this.zoomed||this.oneBalloonOnly)&&!isNaN(a)){var c=this.chart.categoryAxis.xToIndex(a);if(c!=this.previousIndex||this.zoomed||"mouse"==this.cursorPosition||this.oneBalloonOnly)this.updateCursor(c,
	            b),this.zoomed=!1}this.previousMousePosition=a}}else this.updateCrosshair()},normalizeBulletSize:function(){var a=this.resizedBullets;if(a)for(var b=0;b<a.length;b++){var c=a[b],d=c.bulletGraphics;d&&d.translate(c.bx,c.by,1)}},updateCursor:function(a,b){var c=this.chart,d=c.mouseX-this.x,e=c.mouseY-this.y;this.drawingNow&&(AmCharts.remove(this.drawingLine),this.drawingLine=AmCharts.line(this.container,[this.x+this.drawStartX,this.x+d],[this.y+this.drawStartY,this.y+e],this.cursorColor,1,1));if(this.enabled){void 0===
	        b&&(b=!0);this.index=a;var f=c.categoryAxis,g=c.dx,h=c.dy,k=this.x,l=this.y,m=this.width,n=this.height,p=this.data[a];if(p){var q=p.x[f.id],u=c.rotate,r=f.inside,s=this.stepWidth,w=this.categoryBalloon,v=this.firstTime,t=this.lastTime,A=this.cursorPosition,E=f.position,x=this.zooming,z=this.panning,H=c.graphs,I=f.axisThickness;if(c.mouseIsOver||x||z||this.forceShow)if(this.forceShow=!1,z){var g=this.panClickPos,c=this.panClickEndTime,x=this.panClickStartTime,B=this.panClickEnd,k=this.panClickStart,
	            d=(u?g-e:g-d)/s;if(!f.parseDates||f.equalSpacing)d=Math.round(d);0!==d&&(g={type:"zoomed",target:this},g.chart=this.chart,f.parseDates&&!f.equalSpacing?(c+d>t&&(d=t-c),x+d<v&&(d=v-x),g.start=x+d,g.end=c+d,this.fire(g.type,g)):B+d>=this.data.length||0>k+d||(g.start=k+d,g.end=B+d,this.fire(g.type,g)))}else{"start"==A&&(q-=f.cellWidth/2);"mouse"==A&&c.mouseIsOver&&(q=u?e-2:d-2);if(u){if(0>q)if(x)q=0;else{this.hideCursor();return}if(q>n+1)if(x)q=n+1;else{this.hideCursor();return}}else{if(0>q)if(x)q=0;
	        else{this.hideCursor();return}if(q>m)if(x)q=m;else{this.hideCursor();return}}0<this.cursorAlpha&&(v=this.line,u?(t=0,s=q+h):(t=q,s=0),A=this.animationDuration,0<A&&!this.zooming?isNaN(this.previousX)?v.translate(t,s):(v.translate(this.previousX,this.previousY),v.animate({translate:t+","+s},A,"easeOutSine")):v.translate(t,s),this.previousX=t,this.previousY=s,v.show());this.linePos=u?q+h:q;x&&(u?this.updateSelectionSize(NaN,q):this.updateSelectionSize(q,NaN));s=!0;x&&(s=!1);this.categoryBalloonEnabled&&
	        s?(u?(r&&("right"==E?w.setBounds(k,l+h,k+m+g,l+q+h):w.setBounds(k,l+h,k+m+g,l+q)),"right"==E?r?w.setPosition(k+m+g,l+q+h):w.setPosition(k+m+g+I,l+q+h):r?w.setPosition(k,l+q):w.setPosition(k-I,l+q)):"top"==E?r?w.setPosition(k+q+g,l+h):w.setPosition(k+q+g,l+h-I+1):r?w.setPosition(k+q,l+n):w.setPosition(k+q,l+n+I-1),(v=this.categoryBalloonFunction)?w.showBalloon(v(p.category)):f.parseDates?(f=AmCharts.formatDate(p.category,this.categoryBalloonDateFormat),-1!=f.indexOf("fff")&&(f=AmCharts.formatMilliseconds(f,
	            p.category)),w.showBalloon(f)):w.showBalloon(p.category)):w.hide();H&&this.bulletsEnabled&&this.showBullets();if(this.oneBalloonOnly){h=Infinity;for(t=0;t<H.length;t++)f=H[t],f.showBalloon&&!f.hidden&&f.balloonText&&(w=p.axes[f.valueAxis.id].graphs[f.id],v=w.y,isNaN(v)||(u?Math.abs(d-v)<h&&(h=Math.abs(d-v),B=f):Math.abs(e-v)<h&&(h=Math.abs(e-v),B=f)));this.mostCloseGraph&&(B=this.mostCloseGraph)}if(a!=this.previousIndex||B!=this.previousMostCloseGraph)if(this.normalizeBulletSize(),this.destroyValueBalloons(),
	                this.resizedBullets=[],H&&this.valueBalloonsEnabled&&s&&c.balloon.enabled){this.valueBalloons=h=[];for(t=0;t<H.length;t++)if(f=H[t],(!this.oneBalloonOnly||f==B)&&f.showBalloon&&!f.hidden&&f.balloonText&&(w=p.axes[f.valueAxis.id].graphs[f.id],v=w.y,!isNaN(v))){r=w.x;s=!0;if(u){if(q=v,0>r||r>n)s=!1}else if(q=r,r=v,0>q||q>m+g)s=!1;s&&(1!=this.graphBulletSize&&AmCharts.isModern&&(s=w.bulletGraphics)&&(s.getBBox(),s.translate(w.bx,w.by,this.graphBulletSize),this.resizedBullets.push(w)),s=f.valueBalloon,
	            E=c.getBalloonColor(f,w),s.setBounds(k,l,k+m,l+n),s.pointerOrientation="H",s.changeColor(E),void 0!==f.balloonAlpha&&(s.fillAlpha=f.balloonAlpha),void 0!==f.balloonTextColor&&(s.color=f.balloonTextColor),s.setPosition(q+k,r+l),q=c.formatString(f.balloonText,w,f),(r=f.balloonFunction)&&(q=r(w,f)),""!==q&&(u?s.showBalloon(q):(s.text=q,s.show=!0)),!u&&s.set&&s.set.hide(),h.push({yy:v,balloon:s}))}u||this.arrangeBalloons()}b?(g={type:"changed"},g.index=a,g.target=this,g.chart=this.chart,g.zooming=x,g.mostCloseGraph=
	            B,g.position=u?e:d,g.target=this,c.fire("changed",g),this.fire("changed",g),this.skipZoomDispatch=!1):(this.skipZoomDispatch=!0,c.updateLegendValues(a));this.previousIndex=a;this.previousMostCloseGraph=B}}}else this.hideCursor()},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.rolledOver=!1;this.drawing=a},isZooming:function(a){a&&a!=this.zooming&&this.handleMouseDown("fake");a||a==this.zooming||this.handleMouseUp()},handleMouseOut:function(){if(this.enabled)if(this.zooming)this.setPosition();
	        else{this.index=void 0;var a={type:"changed",index:void 0,target:this};a.chart=this.chart;this.fire("changed",a);this.hideCursor()}},handleReleaseOutside:function(){this.handleMouseUp()},handleMouseUp:function(){var a=this.chart,b=this.data,c;if(a){var d=a.mouseX-this.x,e=a.mouseY-this.y;if(this.drawingNow){this.drawingNow=!1;AmCharts.remove(this.drawingLine);c=this.drawStartX;var f=this.drawStartY;if(2<Math.abs(c-d)||2<Math.abs(f-e))c={type:"draw",target:this,chart:a,initialX:c,initialY:f,finalX:d,
	            finalY:e},this.fire(c.type,c)}if(this.enabled&&0<b.length){if(this.pan)this.rolledOver=!1;else if(this.zoomable&&this.zooming){c=this.selectWithoutZooming?{type:"selected"}:{type:"zoomed"};c.target=this;c.chart=a;if("cursor"==this.type)this.rotate?this.selectionPosY=e:this.selectionPosX=e=d,2>Math.abs(e-this.initialMouse)&&this.fromIndex==this.index||(this.index<this.fromIndex?(c.end=this.fromIndex,c.start=this.index):(c.end=this.index,c.start=this.fromIndex),e=a.categoryAxis,e.parseDates&&!e.equalSpacing&&
	        (c.start=b[c.start].time,c.end=a.getEndTime(b[c.end].time)),this.skipZoomDispatch||this.fire(c.type,c));else{var g=this.initialMouseX,h=this.initialMouseY;3>Math.abs(d-g)&&3>Math.abs(e-h)||(b=Math.min(g,d),f=Math.min(h,e),d=Math.abs(g-d),e=Math.abs(h-e),a.hideXScrollbar&&(b=0,d=this.width),a.hideYScrollbar&&(f=0,e=this.height),c.selectionHeight=e,c.selectionWidth=d,c.selectionY=f,c.selectionX=b,this.skipZoomDispatch||this.fire(c.type,c))}this.selectWithoutZooming||AmCharts.remove(this.selection)}this.panning=
	            this.zooming=this.skipZoomDispatch=!1}}},showCursorAt:function(a){var b=this.chart.categoryAxis;a=b.parseDates?b.dateToCoordinate(a):b.categoryToCoordinate(a);this.previousMousePosition=NaN;this.forceShow=!0;this.setPosition(a,!1)},handleMouseDown:function(a){if(this.zoomable||this.pan||this.drawing){var b=this.rotate,c=this.chart,d=c.mouseX-this.x,e=c.mouseY-this.y;if(0<d&&d<this.width&&0<e&&e<this.height||"fake"==a)this.setPosition(),this.selectWithoutZooming&&AmCharts.remove(this.selection),this.drawing?
	            (this.drawStartY=e,this.drawStartX=d,this.drawingNow=!0):this.pan?(this.zoomable=!1,c.setMouseCursor("move"),this.panning=!0,this.panClickPos=b?e:d,this.panClickStart=this.start,this.panClickEnd=this.end,this.panClickStartTime=this.startTime,this.panClickEndTime=this.endTime):this.zoomable&&("cursor"==this.type?(this.fromIndex=this.index,b?(this.initialMouse=e,this.selectionPosY=this.linePos):(this.initialMouse=d,this.selectionPosX=this.linePos)):(this.initialMouseX=d,this.initialMouseY=e,this.selectionPosX=
	            d,this.selectionPosY=e),this.zooming=!0)}}});AmCharts.SimpleChartScrollbar=AmCharts.Class({construct:function(){this.createEvents("zoomed");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconWidth=18;this.dragIconHeight=25},draw:function(){var a=this;a.destroy();a.interval=setInterval(function(){a.updateScrollbar.call(a)},
	        40);var b=a.chart.container,c=a.rotate,d=a.chart,e=b.set();a.set=e;d.scrollbarsSet.push(e);var f,g;c?(f=a.scrollbarHeight,g=d.plotAreaHeight):(g=a.scrollbarHeight,f=d.plotAreaWidth);a.width=f;if((a.height=g)&&f){var h=AmCharts.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);a.bg=h;e.push(h);h=AmCharts.rect(b,f,g,"#000",0.005);e.push(h);a.invisibleBg=h;h.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});
	        h=AmCharts.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);a.selectedBG=h;e.push(h);f=AmCharts.rect(b,f,g,"#000",0.005);a.dragger=f;e.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});f=d.pathToImages;c?(h=f+"dragIconH.gif",f=a.dragIconWidth,c=a.dragIconHeight):(h=f+
	            "dragIcon.gif",c=a.dragIconWidth,f=a.dragIconHeight);g=b.image(h,0,0,c,f);var h=b.image(h,0,0,c,f),k=10,l=20;d.panEventsEnabled&&(k=25,l=a.scrollbarHeight);var m=AmCharts.rect(b,k,l,"#000",0.005),n=AmCharts.rect(b,k,l,"#000",0.005);n.translate(-(k-c)/2,-(l-f)/2);m.translate(-(k-c)/2,-(l-f)/2);c=b.set([g,n]);b=b.set([h,m]);a.iconLeft=c;e.push(a.iconLeft);a.iconRight=b;e.push(b);c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.leftDragStart()}).touchend(function(){a.leftDragStop()});
	        b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.rightDragStart()}).touchend(function(){a.rightDragStop()});AmCharts.ifArray(d.chartData)?e.show():e.hide();a.hideDragIcons()}e.translate(a.x,a.y);a.clipDragger(!1)},updateScrollbarSize:function(a,b){var c=this.dragger,d,e,f,g;this.rotate?(d=0,e=a,f=this.width+1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",e)):(d=a,
	        e=0,f=b-a,g=this.height+1,c.setAttr("width",b-a),c.setAttr("x",d));this.clipAndUpdate(d,e,f,g)},updateScrollbar:function(){var a,b=!1,c,d,e=this.x,f=this.y,g=this.dragger,h=this.getDBox();c=h.x+e;d=h.y+f;var k=h.width,h=h.height,l=this.rotate,m=this.chart,n=this.width,p=this.height,q=m.mouseX,u=m.mouseY;a=this.initialMouse;m.mouseIsOver&&(this.dragging&&(m=this.initialCoord,l?(a=m+(u-a),0>a&&(a=0),m=p-h,a>m&&(a=m),g.setAttr("y",a)):(a=m+(q-a),0>a&&(a=0),m=n-k,a>m&&(a=m),g.setAttr("x",a))),this.resizingRight&&
	    (l?(a=u-d,a+d>p+f&&(a=p-d+f),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=0.1),g.setAttr("height",a))):(a=q-c,a+c>n+e&&(a=n-c+e),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=0.1),g.setAttr("width",a)))),this.resizingLeft&&(l?(c=d,d=u,d<f&&(d=f),d>p+f&&(d=p+f),a=!0===b?c-d:h+c-d,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("y",c+h-f)):(0===a&&(a=0.1),g.setAttr("y",d-f),g.setAttr("height",a))):(d=q,d<e&&(d=e),d>n+e&&(d=n+e),a=!0===b?c-d:k+c-d,0>a?(this.resizingRight=
	        !0,this.resizingLeft=!1,g.setAttr("x",c+k-e)):(0===a&&(a=0.1),g.setAttr("x",d-e),g.setAttr("width",a)))),this.clipDragger(!0))},clipDragger:function(a){var b=this.getDBox(),c=b.x,d=b.y,e=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,e=this.width+1,this.clipY!=d||this.clipH!=b)f=!0}else if(d=0,b=this.height+1,this.clipX!=c||this.clipW!=e)f=!0;f&&(this.clipAndUpdate(c,d,e,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))},maskGraphs:function(){},clipAndUpdate:function(a,b,c,d){this.clipX=
	        a;this.clipY=b;this.clipW=c;this.clipH=d;this.selectedBG.clipRect(a,b,c,d);this.updateDragIconPositions();this.maskGraphs(a,b,c,d)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,d=b.y,e=b.width,b=b.height;this.rotate?(c=d,e=this.height/b):e=this.width/e;a={type:"zoomed",position:c,chart:a,target:this,multiplier:e};this.fire(a.type,a)}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,c=a.y,d=this.iconLeft,
	        e=this.iconRight,f,g,h=this.scrollbarHeight;this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,d.translate((h-g)/2,c-f/2),e.translate((h-g)/2,c+a.height-f/2)):(f=this.dragIconHeight,g=this.dragIconWidth,d.translate(b-g/2,(h-f)/2),e.translate(b+-g/2+a.width,(h-f)/2))},showDragIcons:function(){this.resizeEnabled&&(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){this.resizingLeft||this.resizingRight||this.dragging||(this.hideResizeGrips&&(this.iconLeft.hide(),this.iconRight.hide()),
	        this.removeCursors())},removeCursors:function(){this.chart.setMouseCursor("auto")},relativeZoom:function(a,b){this.dragger.stop();this.multiplier=a;this.position=b;this.updateScrollbarSize(b,this.rotate?b+this.height/a:b+this.width/a)},destroy:function(){this.clear();AmCharts.remove(this.set)},clear:function(){clearInterval(this.interval)},handleDragStart:function(){var a=this.chart;this.dragger.stop();this.removeCursors();this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=
	        a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)},handleDragStop:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();this.updateScrollbar()},handleDraggerOver:function(){this.handleMouseOver()},leftDragStart:function(){this.dragger.stop();this.resizingLeft=!0},leftDragStop:function(){this.resizingLeft=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},rightDragStart:function(){this.dragger.stop();
	        this.resizingRight=!0},rightDragStop:function(){this.resizingRight=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?this.chart.setMouseCursor("n-resize"):this.chart.setMouseCursor("e-resize");this.handleMouseOver()},getDBox:function(){return this.dragger.getBBox()},handleBgClick:function(){if(!this.resizingRight&&!this.resizingLeft){this.zooming=!0;var a,b,c=this.scrollDuration,d=this.dragger;a=this.getDBox();
	        var e=a.height,f=a.width;b=this.chart;var g=this.y,h=this.x,k=this.rotate;k?(a="y",b=b.mouseY-e/2-g,b=AmCharts.fitToBounds(b,0,this.height-e)):(a="x",b=b.mouseX-f/2-h,b=AmCharts.fitToBounds(b,0,this.width-f));this.updateOnReleaseOnly?(this.skipEvent=!1,d.setAttr(a,b),this.dispatchScrollbarEvent(),this.clipDragger()):(b=Math.round(b),k?d.animate({y:b},c,">"):d.animate({x:b},c,">"))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent())},
	        handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.updateOnRelease(),this.removeCursors();this.mouseIsOver=this.dragging=this.resizingRight=this.resizingLeft=!1;this.hideDragIcons();this.updateScrollbar()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons()}});AmCharts.ChartScrollbar=AmCharts.Class({inherits:AmCharts.SimpleChartScrollbar,construct:function(){AmCharts.ChartScrollbar.base.construct.call(this);this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=0.7;this.skipEvent=this.autoGridCount=!1;this.color="#FFFFFF";
	        this.scrollbarCreated=!1},init:function(){var a=this.categoryAxis,b=this.chart;a||(this.categoryAxis=a=new AmCharts.CategoryAxis);a.chart=b;a.id="scrollbar";a.dateFormats=b.categoryAxis.dateFormats;a.boldPeriodBeginning=b.categoryAxis.boldPeriodBeginning;a.axisItemRenderer=AmCharts.RecItem;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.inside=!0;a.fontSize=this.fontSize;a.tickLength=0;a.axisAlpha=0;if(a=this.graph){var c=this.valueAxis;c||(this.valueAxis=c=new AmCharts.ValueAxis,
	        c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=AmCharts.RecItem,c.axisRenderer=AmCharts.RecAxis,c.guideFillRenderer=AmCharts.RecFill,c.labelsEnabled=!1,c.chart=b);b=this.unselectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers);b=this.selectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers)}this.scrollbarCreated=!0},draw:function(){var a=
	        this;AmCharts.ChartScrollbar.base.draw.call(a);a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,d=a.categoryAxis,e=a.rotate,f=a.x,g=a.y,h=a.width,k=a.height,l=b.categoryAxis,m=a.set;d.setOrientation(!e);d.parseDates=l.parseDates;d.rotate=e;d.equalSpacing=l.equalSpacing;d.minPeriod=l.minPeriod;d.startOnAxis=l.startOnAxis;d.viW=h;d.viH=k;d.width=h;d.height=k;d.gridCount=a.gridCount;d.gridColor=a.gridColor;d.gridAlpha=a.gridAlpha;d.color=a.color;d.autoGridCount=a.autoGridCount;d.parseDates&&
	    !d.equalSpacing&&d.timeZoom(b.firstTime,b.lastTime);d.zoom(0,c.length-1);if(l=a.graph){var n=a.valueAxis,p=l.valueAxis;n.id=p.id;n.rotate=e;n.setOrientation(e);n.width=h;n.height=k;n.viW=h;n.viH=k;n.dataProvider=c;n.reversed=p.reversed;n.logarithmic=p.logarithmic;n.gridAlpha=0;n.axisAlpha=0;m.push(n.set);e?n.y=g:n.x=f;var f=Infinity,g=-Infinity,q;for(q=0;q<c.length;q++){var u=c[q].axes[p.id].graphs[l.id].values,r;for(r in u)if(u.hasOwnProperty(r)&&"percents"!=r&&"total"!=r){var s=u[r];s<f&&(f=s);
	        s>g&&(g=s)}}Infinity!=f&&(n.minimum=f);-Infinity!=g&&(n.maximum=g+0.1*(g-f));f==g&&(n.minimum-=1,n.maximum+=1);void 0!==a.minimum&&(n.minimum=a.minimum);void 0!==a.maximum&&(n.maximum=a.maximum);n.zoom(0,c.length-1);r=a.unselectedGraph;r.id=l.id;r.rotate=e;r.chart=b;r.chartType=b.chartType;r.data=c;r.valueAxis=n;r.chart=l.chart;r.categoryAxis=a.categoryAxis;r.valueField=l.valueField;r.openField=l.openField;r.closeField=l.closeField;r.highField=l.highField;r.lowField=l.lowField;r.lineAlpha=a.graphLineAlpha;
	        r.lineColor=a.graphLineColor;r.fillAlphas=a.graphFillAlpha;r.fillColors=a.graphFillColor;r.connect=l.connect;r.hidden=l.hidden;r.width=h;r.height=k;p=a.selectedGraph;p.id=l.id;p.rotate=e;p.chart=b;p.chartType=b.chartType;p.data=c;p.valueAxis=n;p.chart=l.chart;p.categoryAxis=d;p.valueField=l.valueField;p.openField=l.openField;p.closeField=l.closeField;p.highField=l.highField;p.lowField=l.lowField;p.lineAlpha=a.selectedGraphLineAlpha;p.lineColor=a.selectedGraphLineColor;p.fillAlphas=a.selectedGraphFillAlpha;
	        p.fillColors=a.selectedGraphFillColor;p.connect=l.connect;p.hidden=l.hidden;p.width=h;p.height=k;b=a.graphType;b||(b=l.type);r.type=b;p.type=b;c=c.length-1;r.zoom(0,c);p.zoom(0,c);p.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});r.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});m.push(r.set);m.push(p.set)}m.push(d.set);m.push(d.labelsSet);
	        a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()},timeZoom:function(a,b){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!0;this.zoomScrollbar()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,d=this.dragger.getBBox();b=d.x;c=d.y;var e=d.width,f=d.height,d=this.chart;this.rotate?(b=c,
	        c=f):c=e;e={type:"zoomed",target:this};e.chart=d;var f=this.categoryAxis,g=this.stepWidth;if(f.parseDates&&!f.equalSpacing){if(a=d.firstTime,f.minDuration(),d=Math.round(b/g)+a,a=this.dragging?d+this.timeDifference:Math.round((b+c)/g)+a,d>a&&(d=a),d!=this.startTime||a!=this.endTime)this.startTime=d,this.endTime=a,e.start=d,e.end=a,e.startDate=new Date(d),e.endDate=new Date(a),this.fire(e.type,e)}else if(f.startOnAxis||(b+=g/2),c-=this.stepWidth/2,d=f.xToIndex(b),b=f.xToIndex(b+c),d!=this.start||this.end!=
	        b)f.startOnAxis&&(this.resizingRight&&d==b&&b++,this.resizingLeft&&d==b&&(0<d?d--:b=1)),this.start=d,this.end=this.dragging?this.start+this.difference:b,e.start=this.start,e.end=this.end,f.parseDates&&(a[this.start]&&(e.startDate=new Date(a[this.start].time)),a[this.end]&&(e.endDate=new Date(a[this.end].time))),this.fire(e.type,e)}},zoomScrollbar:function(){var a,b;a=this.chart;var c=a.chartData,d=this.categoryAxis;d.parseDates&&!d.equalSpacing?(c=d.stepWidth,d=a.firstTime,a=c*(this.startTime-d),
	        b=c*(this.endTime-d)):(a=c[this.start].x[d.id],b=c[this.end].x[d.id],c=d.stepWidth,d.startOnAxis||(d=c/2,a-=d,b+=d));this.stepWidth=c;this.updateScrollbarSize(a,b)},maskGraphs:function(a,b,c,d){var e=this.selectedGraph;e&&e.set.clipRect(a,b,c,d)},handleDragStart:function(){AmCharts.ChartScrollbar.base.handleDragStart.call(this);this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);
	        this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}});AmCharts.AmBalloon=AmCharts.Class({construct:function(){this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=0.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maximumWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=0.4;this.shadowColor="#000000";this.fadeOutDuration=this.animationDuration=
	        0.3;this.fixedPosition=!1;this.offsetY=6;this.offsetX=1;AmCharts.isModern||(this.offsetY*=1.5)},draw:function(){var a=this.pointToX,b=this.pointToY;this.deltaSignX=this.deltaSignY=1;var c=this.chart;AmCharts.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);if(!isNaN(a)){var d=this.follow,e=c.container,f=this.set;AmCharts.remove(f);this.removeDiv();this.set=f=e.set();c.balloonsSet.push(f);if(this.show){var g=this.l,h=this.t,k=this.r,l=this.b,m=this.balloonColor,
	        n=this.fillColor,p=this.borderColor,q=n;void 0!=m&&(this.adjustBorderColor?q=p=m:n=m);var u=this.horizontalPadding,r=this.verticalPadding,s=this.pointerWidth,w=this.pointerOrientation,v=this.cornerRadius,t=c.fontFamily,A=this.fontSize;void 0==A&&(A=c.fontSize);var m=document.createElement("div"),E=m.style;E.position="absolute";m.innerHTML='<div style="max-width:'+this.maxWidth+"px; font-size:"+A+"px; color:"+this.color+"; font-family:"+t+'">'+this.text+"</div>";c.chartDiv.appendChild(m);this.textDiv=
	        m;A=m.offsetWidth;t=m.offsetHeight;m.clientHeight&&(A=m.clientWidth,t=m.clientHeight);var t=t+2*r,x=A+2*u;window.opera&&(t+=2);var z,H=!1;z=this.offsetY;c.handDrawn&&(z+=c.handDrawScatter+2);"H"!=w?(A=a-x/2,b<h+t+10&&"down"!=w?(H=!0,d&&(b+=z),z=b+s,this.deltaSignY=-1):(d&&(b-=z),z=b-t-s,this.deltaSignY=1)):(2*s>t&&(s=t/2),z=b-t/2,a<g+(k-g)/2?(A=a+s,this.deltaSignX=-1):(A=a-x-s,this.deltaSignX=1));z+t>=l&&(z=l-t);z<h&&(z=h);A<g&&(A=g);A+x>k&&(A=k-x);var h=z+r,l=A+u,r=this.shadowAlpha,I=this.shadowColor,
	        u=this.borderThickness,B=this.bulletSize,ba;0<v||0===s?(0<r&&(a=AmCharts.rect(e,x,t,n,0,u+1,I,r,this.cornerRadius),AmCharts.isModern?a.translate(1,1):a.translate(4,4),f.push(a)),n=AmCharts.rect(e,x,t,n,this.fillAlpha,u,p,this.borderAlpha,this.cornerRadius),this.showBullet&&(ba=AmCharts.circle(e,B,q,this.fillAlpha),f.push(ba))):(q=[],v=[],"H"!=w?(g=a-A,g>x-s&&(g=x-s),g<s&&(g=s),q=[0,g-s,a-A,g+s,x,x,0,0],v=H?[0,0,b-z,0,0,t,t,0]:[t,t,b-z,t,t,0,0,t]):(q=b-z,q>t-s&&(q=t-s),q<s&&(q=s),v=[0,q-s,b-z,q+s,
	        t,t,0,0],q=a<g+(k-g)/2?[0,0,A<a?0:a-A,0,0,x,x,0]:[x,x,A+x>a?x:a-A,x,x,0,0,x]),0<r&&(a=AmCharts.polygon(e,q,v,n,0,u,I,r),a.translate(1,1),f.push(a)),n=AmCharts.polygon(e,q,v,n,this.fillAlpha,u,p,this.borderAlpha));this.bg=n;f.push(n);n.toFront();e=1*this.deltaSignX;E.left=l+"px";E.top=h+"px";f.translate(A-e,z);n=n.getBBox();this.bottom=z+t+1;this.yPos=n.y+z;ba&&ba.translate(this.pointToX-A+e,b-z);b=this.animationDuration;0<this.animationDuration&&!d&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY),
	        f.animate({translate:A-e+","+z},b,"easeOutSine"),m&&(E.left=this.prevTX+"px",E.top=this.prevTY+"px",this.xAnim=c.animate({node:m},"left",this.prevTX,l,b,"easeOutSine","px"),this.yAnim=c.animate({node:m},"top",this.prevTY,h,b,"easeOutSine","px")));this.prevX=A-e;this.prevY=z;this.prevTX=l;this.prevTY=h}}},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX,b=this.chart.mouseY;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=
	            a,this.previousY=b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var d=c.getBBox(),a=a-d.width/2,e=b-d.height-10;a<this.l&&(a=this.l);a>this.r-d.width&&(a=this.r-d.width);e<this.t&&(e=b+10);c.translate(a,e);b=this.textDiv.style;b.left=a+this.horizontalPadding+"px";b.top=e+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,d){this.l=a;this.t=b;this.r=c;this.b=d;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){this.text=
	        a;this.show=!0;this.destroyTO&&clearTimeout(this.destroyTO);a=this.chart;this.fadeAnim1&&a.stopAnim(this.fadeAnim1);this.fadeAnim2&&a.stopAnim(this.fadeAnim2);this.draw()},hide:function(){var a=this,b=a.fadeOutDuration,c=a.chart;if(0<b){a.destroyTO=setTimeout(function(){a.destroy.call(a)},1E3*b);a.follow=!1;a.show=!1;var d=a.set;d&&(d.setAttr("opacity",a.fillAlpha),a.fadeAnim1=d.animate({opacity:0},b,"easeInSine"));a.textDiv&&(a.fadeAnim2=c.animate({node:a.textDiv},"opacity",1,0,b,"easeInSine",""))}else a.show=
	        !1,a.follow=!1,a.destroy()},setPosition:function(a,b,c){this.pointToX=a;this.pointToY=b;c&&(a==this.previousX&&b==this.previousY||this.draw());this.previousX=a;this.previousY=b},followCursor:function(a){var b=this;(b.follow=a)?(b.pShowBullet=b.showBullet,b.showBullet=!1):void 0!==b.pShowBullet&&(b.showBullet=b.pShowBullet);clearInterval(b.interval);var c=b.chart.mouseX,d=b.chart.mouseY;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=d,b.followMouse(),b.interval=setInterval(function(){b.followMouse.call(b)},
	        40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);AmCharts.remove(this.set);this.removeDiv();this.set=null}});AmCharts.AmCoordinateChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(){AmCharts.AmCoordinateChart.base.construct.call(this);this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph");this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=0;this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors=
	        "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[]},initChart:function(){AmCharts.AmCoordinateChart.base.initChart.call(this);this.createValueAxes();AmCharts.VML&&(this.startAlpha=1);var a=this.legend;a&&a.setData(this.graphs)},createValueAxes:function(){if(0===this.valueAxes.length){var a=new AmCharts.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();
	        this.processGraphs()},parseSerialData:function(){var a=this.graphs,b,c={},d=this.seriesIdField;d||(d=this.categoryField);this.chartData=[];var e=this.dataProvider;if(e){var f=!1,g,h=this.categoryAxis,k;h&&(f=h.parseDates,k=h.forceShowField,g=h.categoryFunction);var l,m;f&&(b=AmCharts.extractPeriod(h.minPeriod),l=b.period,m=b.count);var n={};this.lookupTable=n;var p,q=this.dataDateFormat;for(p=0;p<e.length;p++){var u={},r=e[p];b=r[this.categoryField];u.category=g?g(b,r,h):String(b);k&&(u.forceShow=
	        r[k]);n[r[d]]=u;f&&(b=h.categoryFunction?h.categoryFunction(b,r,h):b instanceof Date?"fff"==h.minPeriod?AmCharts.useUTC?new Date(b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate(),b.getUTCHours(),b.getUTCMinutes(),b.getUTCSeconds(),b.getUTCMilliseconds()):new Date(b.getFullYear(),b.getMonth(),b.getDate(),b.getHours(),b.getMinutes(),b.getSeconds(),b.getMilliseconds()):new Date(b):q?AmCharts.stringToDate(b,q):new Date(b),b=AmCharts.resetDateToMin(b,l,m,h.firstDayOfWeek),u.category=b,u.time=b.getTime());
	        var s=this.valueAxes;u.axes={};u.x={};var w;for(w=0;w<s.length;w++){var v=s[w].id;u.axes[v]={};u.axes[v].graphs={};var t;for(t=0;t<a.length;t++){b=a[t];var A=b.id,E=b.periodValue;if(b.valueAxis.id==v){u.axes[v].graphs[A]={};var x={};x.index=p;var z=r;b.dataProvider&&(z=c);x.values=this.processValues(z,b,E);this.processFields(b,x,z);x.category=u.category;x.serialDataItem=u;x.graph=b;u.axes[v].graphs[A]=x}}}this.chartData[p]=u}}for(c=0;c<a.length;c++)b=a[c],b.dataProvider&&this.parseGraphData(b)},processValues:function(a,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   b,c){var d={},e,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);e=Number(a[b.valueField+c]);isNaN(e)||(d.value=e);e=Number(a[b.errorField+c]);isNaN(e)||(d.error=e);f&&(c="Open");e=Number(a[b.openField+c]);isNaN(e)||(d.open=e);f&&(c="Close");e=Number(a[b.closeField+c]);isNaN(e)||(d.close=e);f&&(c="Low");e=Number(a[b.lowField+c]);isNaN(e)||(d.low=e);f&&(c="High");e=Number(a[b.highField+c]);isNaN(e)||(d.high=e);return d},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||
	    (c=this.seriesIdField);c||(c=this.categoryField);var d;for(d=0;d<b.length;d++){var e=b[d],f=this.lookupTable[String(e[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(e,a,a.periodValue),this.processFields(a,g,e))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,b;for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,
	        c;for(c=b.length-1;0<=c;c--){var d=b[c];d&&d.valueAxis==a&&this.removeGraph(d)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b];c.chart=this;
	        c.id||(c.id="valueAxis"+b+"_"+(new Date).getTime());if(!0===this.usePrefixes||!1===this.usePrefixes)c.usePrefixes=this.usePrefixes}},processGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.chart=this;c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id="graph"+b+"_"+(new Date).getTime())}},formatString:function(a,b){var c=b.graph,d=c.valueAxis;d.duration&&b.values.value&&(d=AmCharts.formatDuration(b.values.value,d.duration,"",d.durationUnits,d.maxInterval,d.numberFormatter),
	        a=a.split("[[value]]").join(d));a=AmCharts.massReplace(a,{"[[title]]":c.title,"[[description]]":b.description});a=AmCharts.fixNewLines(a);return a=AmCharts.cleanFromEmpty(a)},getBalloonColor:function(a,b){var c=a.lineColor,d=a.balloonColor,e=a.fillColors;"object"==typeof e?c=e[0]:void 0!==e&&(c=e);if(b.isNegative){var e=a.negativeLineColor,f=a.negativeFillColors;"object"==typeof f?e=f[0]:void 0!==f&&(e=f);void 0!==e&&(c=e)}void 0!==b.color&&(c=b.color);void 0===d&&(d=c);return d},getGraphById:function(a){return this.getObjById(this.graphs,
	        a)},getValueAxisById:function(a){return this.getObjById(this.valueAxes,a)},getObjById:function(a,b){var c,d;for(d=0;d<a.length;d++){var e=a[d];e.id==b&&(c=e)}return c},processFields:function(a,b,c){if(a.itemColors){var d=a.itemColors,e=b.index;b.color=e<d.length?d[e]:AmCharts.randomColor()}d="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern".split(" ");for(e=0;e<d.length;e++){var f=d[e],g=a[f+"Field"];g&&(g=c[g],AmCharts.isDefined(g)&&
	    (b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(!a.lineColor){var c;c=this.colors.length>b?this.colors[b]:AmCharts.randomColor();a.lineColor=c}},handleLegendEvent:function(a){var b=a.type;if(a=a.dataItem){var c=a.hidden,d=a.showBalloon;switch(b){case "clickMarker":d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case "clickLabel":d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case "rollOverItem":c||this.highlightGraph(a);break;case "rollOutItem":c||this.unhighlightGraph();
	        break;case "hideItem":this.hideGraph(a);break;case "showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=this.graphs,c,d=0.2;this.legend&&(d=this.legend.rollOverGraphAlpha);if(1!=d)for(c=0;c<b.length;c++){var e=b[c];e!=a&&e.changeOpacity(d)}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.hidden=!1;this.dataChanged=!0;this.marginsUpdated=!1;this.chartCreated&&
	    this.initChart()},hideGraph:function(a){this.dataChanged=!0;this.marginsUpdated=!1;a.hidden=!0;this.chartCreated&&this.initChart()},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();this.validateNow()}});AmCharts.AmSlicedChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice","rightClickSlice");AmCharts.AmSlicedChart.base.construct.call(this);this.colors="#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");this.alpha=1;this.groupPercent=0;this.groupedTitle="Other";this.groupedPulled=
	        !1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.hoverAlpha=1;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startAlpha=0;this.startDuration=1;this.startEffect="bounce";this.sequencedAnimation=!0;this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelTickColor="#000000";this.labelTickAlpha=0.2;this.hideLabelsPercent=0;this.urlTarget="_self";this.autoMarginOffset=
	        10;this.gradientRatio=[]},initChart:function(){AmCharts.AmSlicedChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.legend&&this.legend.setData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type;if(a=a.dataItem){var c=a.hidden;switch(b){case "clickMarker":c||this.clickSlice(a);break;case "clickLabel":c||this.clickSlice(a);break;case "rollOverItem":c||this.rollOverSlice(a,!1);break;case "rollOutItem":c||
	    this.rollOutSlice(a);break;case "hideItem":this.hideSlice(a);break;case "showItem":this.showSlice(a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;a&&a.invalidateSize()},addEventListeners:function(a,b){var c=this;a.mouseover(function(a){c.rollOverSlice(b,!0,a)}).mouseout(function(a){c.rollOutSlice(b,a)}).click(function(a){c.clickSlice(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},formatString:function(a,b){a=AmCharts.formatValue(a,b,["value"],
	        this.numberFormatter,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b,["percents"],this.percentFormatter);a=AmCharts.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description});-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,b.dataContext));a=AmCharts.fixNewLines(a);return a=AmCharts.cleanFromEmpty(a)},startSlices:function(){var a;for(a=0;a<this.chartData.length;a++)0<this.startDuration&&this.sequencedAnimation?this.setStartTO(a):
	        this.startSlice(this.chartData[a])},setStartTO:function(a){var b=this;a=setTimeout(function(){b.startSequenced.call(b)},500*(b.startDuration/b.chartData.length)*a);b.timeOuts.push(a)},pullSlices:function(a){var b=this.chartData,c;for(c=0;c<b.length;c++){var d=b[c];d.pulled&&this.pullSlice(d,1,a)}},startSequenced:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);break}},startSlice:function(a){a.started=!0;var b=a.wedge,c=this.startDuration;
	        b&&0<c&&(0<a.alpha&&b.show(),b.translate(a.startX,a.startY),b.animate({opacity:a.alpha,translate:"0,0"},c,this.startEffect))},showLabels:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(0<c.alpha){var d=c.label;d&&d.show();(c=c.tick)&&c.show()}}},showSlice:function(a){isNaN(a)?a.hidden=!1:this.chartData[a].hidden=!1;this.invalidateVisibility()},hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        b,c){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);this.pullOnHover&&this.pullSlice(a,1);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var d=a.balloonX,e=a.balloonY;a.pulled&&(d+=a.pullX,e+=a.pullY);var f=this.formatString(this.balloonText,a),g=AmCharts.adjustLuminosity(a.color,-0.15);this.showBalloon(f,g,b,d,e);a={type:"rollOverSlice",dataItem:a,chart:this,event:c};this.fire(a.type,a)},rollOutSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:a.alpha});
	        this.hideBalloon();var c={type:"rollOutSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},clickSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.pulled?this.pullSlice(a,0):this.pullSlice(a,1);AmCharts.getURL(a.url,this.urlTarget);var c={type:"clickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},handleRightClick:function(a,b){isNaN(a)||(a=this.chartData[a]);var c={type:"rightClickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},drawTicks:function(){var a=this.chartData,
	        b;for(b=0;b<a.length;b++){var c=a[b];if(c.label){var d=c.ty,d=AmCharts.line(this.container,[c.tx0,c.tx,c.tx2],[c.ty0,d,d],this.labelTickColor,this.labelTickAlpha);c.tick=d;c.wedge.push(d)}}},initialStart:function(){var a=this,b=a.startDuration,c=setTimeout(function(){a.showLabels.call(a)},1E3*b);a.timeOuts.push(c);a.chartCreated?a.pullSlices(!0):(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b),a.startSlices())},pullSlice:function(a,b,c){var d=this.pullOutDuration;!0===c&&
	    (d=0);(c=a.wedge)&&c.animate({translate:b*a.pullX+","+b*a.pullY},d,this.pullOutEffect);1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",dataItem:a,chart:this}):(a.pulled=!1,a={type:"pullInSlice",dataItem:a,chart:this});this.fire(a.type,a)},pullInAll:function(a){var b=this.chartData,c;for(c=0;c<this.chartData.length;c++)c!=a&&b[c].pulled&&this.pullSlice(b[c],0)},pullOutAll:function(a){a=this.chartData;var b;for(b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],
	        1)},parseData:function(){var a=[];this.chartData=a;var b=this.dataProvider;isNaN(this.pieAlpha)||(this.alpha=this.pieAlpha);if(void 0!==b){var c=b.length,d=0,e,f,g;for(e=0;e<c;e++){f={};var h=b[e];f.dataContext=h;f.value=Number(h[this.valueField]);(g=h[this.titleField])||(g="");f.title=g;f.pulled=AmCharts.toBoolean(h[this.pulledField],!1);(g=h[this.descriptionField])||(g="");f.description=g;f.labelRadius=Number(h[this.labelRadiusField]);f.url=h[this.urlField];f.pattern=h[this.patternField];f.visibleInLegend=
	        AmCharts.toBoolean(h[this.visibleInLegendField],!0);g=h[this.alphaField];f.alpha=void 0!==g?Number(g):this.alpha;g=h[this.colorField];void 0!==g&&(f.color=AmCharts.toColor(g));f.labelColor=AmCharts.toColor(h[this.labelColorField]);d+=f.value;f.hidden=!1;a[e]=f}for(e=b=0;e<c;e++)f=a[e],f.percents=100*(f.value/d),f.percents<this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),a.push({title:this.groupedTitle,value:this.groupValue,percents:100*(this.groupValue/d),pulled:this.groupedPulled,
	        color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha,pattern:this.groupedPattern}));c=this.baseColor;c||(c=this.pieBaseColor);d=this.brightnessStep;d||(d=this.pieBrightnessStep);for(e=0;e<a.length;e++)c?g=AmCharts.adjustLuminosity(c,e*d/100):(g=this.colors[e],void 0===g&&(g=AmCharts.randomColor())),void 0===a[e].color&&(a[e].color=g);this.recalculatePercents()}},recalculatePercents:function(){var a=this.chartData,b=0,c,d;for(c=0;c<a.length;c++)d=
	        a[c],!d.hidden&&0<d.value&&(b+=d.value);for(c=0;c<a.length;c++)d=this.chartData[c],d.percents=!d.hidden&&0<d.value?100*d.value/b:0},removeSmallSlices:function(){var a=this.chartData,b;for(b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=this;a.startSlices();var b=setTimeout(function(){a.pullSlices.call(a)},1200*a.startDuration);a.timeOuts.push(b)},measureMaxLabel:function(){var a=this.chartData,b=0,c;for(c=0;c<a.length;c++){var d=
	        this.formatString(this.labelText,a[c]),d=AmCharts.text(this.container,d,this.color,this.fontFamily,this.fontSize),e=d.getBBox().width;e>b&&(b=e);d.remove()}return b}});AmCharts.AmRectangularChart=AmCharts.Class({inherits:AmCharts.AmCoordinateChart,construct:function(){AmCharts.AmRectangularChart.base.construct.call(this);this.createEvents("zoomed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.verticalPosition=this.horizontalPosition=this.depth3D=this.angle=0;this.heightMultiplier=this.widthMultiplier=1;this.zoomOutText="Show all";this.zoomOutButton={backgroundColor:"#e5e5e5",backgroundAlpha:1};this.trendLines=[];this.autoMargins=!0;
	        this.marginsUpdated=!1;this.autoMarginOffset=10},initChart:function(){AmCharts.AmRectangularChart.base.initChart.call(this);this.updateDxy();var a=!0;!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),a=!1);this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a&&(this.scrollbarOnly||this.updateGraphs())},drawChart:function(){AmCharts.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(AmCharts.ifArray(this.chartData)){var a=
	        this.chartCursor;a&&a.draw();a=this.zoomOutText;""!==a&&a&&this.drawZoomOutButton()}},resetMargins:function(){var a={},b;if("serial"==this.chartType||"gantt"==this.chartType){var c=this.valueAxes;for(b=0;b<c.length;b++){var d=c[b];d.ignoreAxisWidth||(d.setOrientation(this.rotate),d.fixAxisPosition(),a[d.position]=!0)}(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}else{d=this.xAxes;c=this.yAxes;for(b=0;b<d.length;b++){var e=
	        d[b];e.ignoreAxisWidth||(e.setOrientation(!0),e.fixAxisPosition(),a[e.position]=!0)}for(b=0;b<c.length;b++)d=c[b],d.ignoreAxisWidth||(d.setOrientation(!1),d.fixAxisPosition(),a[d.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,d=this.fixMargins,e=this.realWidth,f=this.realHeight,g=c,h=c,k=e-c;b=f-c;var l;for(l=0;l<a.length;l++)b=
	        this.getAxisBounds(a[l],g,k,h,b),g=b.l,k=b.r,h=b.t,b=b.b;if(a=this.categoryAxis)b=this.getAxisBounds(a,g,k,h,b),g=b.l,k=b.r,h=b.t,b=b.b;d.left&&g<c&&(this.marginLeft=Math.round(-g+c));d.right&&k>e-c&&(this.marginRight=Math.round(k-e+c));d.top&&h<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-h+c+this.titleHeight));d.bottom&&b>f-c&&(this.marginBottom=Math.round(b-f+c));this.initChart()},getAxisBounds:function(a,b,c,d,e){if(!a.ignoreAxisWidth){var f=a.labelsSet,g=a.tickLength;a.inside&&
	    (g=0);if(f)switch(f=a.getBBox(),a.position){case "top":a=f.y;d>a&&(d=a);break;case "bottom":a=f.y+f.height;e<a&&(e=a);break;case "right":a=f.x+f.width+g+3;c<a&&(c=a);break;case "left":a=f.x-g,b>a&&(b=a)}}return{l:b,t:d,r:c,b:e}},drawZoomOutButton:function(){var a=this,b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,d=a.fontSize,e=a.zoomOutButton;e&&(e.fontSize&&(d=e.fontSize),e.color&&(c=e.color));c=AmCharts.text(a.container,a.zoomOutText,c,a.fontFamily,d,"start");d=c.getBBox();c.translate(26,
	        6+d.height/2);var f=e.backgroundColor,e=e.backgroundAlpha,e=AmCharts.rect(a.container,d.width+35,d.height+15,f,e,1,f,e);b.push(e);a.zbBG=e;void 0!==a.pathToImages&&(e=a.container.image(a.pathToImages+"lens.png",0,0,17,17),e.translate(6,d.height/2-1),e.toFront(),b.push(e));c.toFront();b.push(c);c=b.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-c.width,a.marginTopReal);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();
	        a.clickZB()});for(c=0;c<b.length;c++)b[c].attr({cursor:"pointer"});a.zbSet=b},rollOverZB:function(){this.zbBG.show()},rollOutZB:function(){this.zbBG.hide()},clickZB:function(){this.zoomOut()},zoomOut:function(){this.updateScrollbar=!0;this.zoom()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,d=this.marginTopReal,e=this.plotAreaWidth-1,f=this.plotAreaHeight-1,g=this.plotAreaFillColors,h=this.plotAreaFillAlphas,k=this.plotAreaBorderColor,l=this.plotAreaBorderAlpha;this.trendLinesSet.clipRect(c,
	        d,e,f);"object"==typeof h&&(h=h[0]);g=AmCharts.polygon(this.container,[0,e,e,0],[0,0,f,f],g,h,1,k,l,this.plotAreaGradientAngle);g.translate(c+a,d+b);g.node.setAttribute("class","amChartsPlotArea");this.set.push(g);0!==a&&0!==b&&(g=this.plotAreaFillColors,"object"==typeof g&&(g=g[0]),g=AmCharts.adjustLuminosity(g,-0.15),e=AmCharts.polygon(this.container,[0,a,e+a,e,0],[0,b,b,0,0],g,h,1,k,l),e.translate(c,d+f),this.set.push(e),a=AmCharts.polygon(this.container,[0,0,a,a,0],[0,f,f+b,b,0],g,h,1,k,l),a.translate(c,
	        d),this.set.push(a))},updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);a=a-this.marginLeftReal-this.marginRightReal-this.dx;b=b-this.marginTopReal-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*
	            Math.PI/180));this.d3x=Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy+a;this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){var a=this.valueAxes,b=this.marginLeftReal,c=this.marginTopReal,d=this.plotAreaHeight,
	        e=this.plotAreaWidth,f;for(f=0;f<a.length;f++){var g=a[f];g.axisRenderer=AmCharts.RecAxis;g.guideFillRenderer=AmCharts.RecFill;g.axisItemRenderer=AmCharts.RecItem;g.dx=this.dx;g.dy=this.dy;g.viW=e-1;g.viH=d-1;g.marginsChanged=!0;g.viX=b;g.viY=c;this.updateObjectSize(g)}},updateObjectSize:function(a){a.width=(this.plotAreaWidth-1)*this.widthMultiplier;a.height=(this.plotAreaHeight-1)*this.heightMultiplier;a.x=this.marginLeftReal+this.horizontalPosition;a.y=this.marginTopReal+this.verticalPosition},
	        updateGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.x=this.marginLeftReal+this.horizontalPosition;c.y=this.marginTopReal+this.verticalPosition;c.width=this.plotAreaWidth*this.widthMultiplier;c.height=this.plotAreaHeight*this.heightMultiplier;c.index=b;c.dx=this.dx;c.dy=this.dy;c.rotate=this.rotate;c.chartType=this.chartType}},updateChartCursor:function(){var a=this.chartCursor;a&&(a.x=this.marginLeftReal,a.y=this.marginTopReal,a.width=this.plotAreaWidth-1,a.height=this.plotAreaHeight-
	            1,a.chart=this)},updateScrollbars:function(){},addChartCursor:function(a){AmCharts.callMethod("destroy",[this.chartCursor]);a&&(this.listenTo(a,"changed",this.handleCursorChange),this.listenTo(a,"zoomed",this.handleCursorZoom));this.chartCursor=a},removeChartCursor:function(){AmCharts.callMethod("destroy",[this.chartCursor]);this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal+
	            this.horizontalPosition,c.y=this.marginTopReal+this.verticalPosition,c.draw())}},addTrendLine:function(a){this.trendLines.push(a)},removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,b){var c=a.scrollbarHeight;"top"==a.position?b?this.marginLeftReal+=c:this.marginTopReal+=c:b?this.marginRightReal+=c:this.marginBottomReal+=c},getScrollbarPosition:function(a,b,c){a.position=b?"bottom"==c||"left"==c?"bottom":"top":"top"==c||"right"==
	        c?"bottom":"top"},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,d=this.marginLeftReal,e=a.scrollbarHeight,f=this.dx,g=this.dy;"top"==a.position?b?(a.y=c,a.x=d-e):(a.y=c-e+g-1,a.x=d+f):b?(a.y=c+g,a.x=d+this.plotAreaWidth+f):(a.y=c+this.plotAreaHeight,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;b&&(a?b.show():b.hide(),this.zbBG.hide())},handleReleaseOutside:function(a){AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&
	        a.handleReleaseOutside()},handleMouseDown:function(a){AmCharts.AmRectangularChart.base.handleMouseDown.call(this,a);var b=this.chartCursor;b&&b.handleMouseDown(a)},handleCursorChange:function(a){}});AmCharts.TrendLine=AmCharts.Class({construct:function(){this.createEvents("click");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,d,e,f,g,h=a.categoryAxis,k=a.initialDate,l=a.initialCategory,m=a.finalDate,n=a.finalCategory,p=a.valueAxis,q=a.valueAxisX,u=a.initialXValue,r=a.finalXValue,s=a.initialValue,w=a.finalValue,v=p.recalculateToPercents,t=b.dataDateFormat;h&&(k&&(k instanceof
	    Date||(k=t?AmCharts.stringToDate(k,t):new Date(k)),a.initialDate=k,d=h.dateToCoordinate(k)),l&&(d=h.categoryToCoordinate(l)),m&&(m instanceof Date||(m=t?AmCharts.stringToDate(m,t):new Date(m)),a.finalDate=m,e=h.dateToCoordinate(m)),n&&(e=h.categoryToCoordinate(n)));q&&!v&&(isNaN(u)||(d=q.getCoordinate(u)),isNaN(r)||(e=q.getCoordinate(r)));p&&!v&&(isNaN(s)||(f=p.getCoordinate(s)),isNaN(w)||(g=p.getCoordinate(w)));isNaN(d)||isNaN(e)||isNaN(f)||isNaN(f)||(b.rotate?(h=[f,g],e=[d,e]):(h=[d,e],e=[f,g]),
	        f=a.lineColor,d=AmCharts.line(c,h,e,f,a.lineAlpha,a.lineThickness,a.dashLength),e=AmCharts.line(c,h,e,f,0.005,5),c=c.set([d,e]),c.translate(b.marginLeftReal,b.marginTopReal),b.trendLinesSet.push(c),a.line=d,a.set=c,e.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()}),e.touchend&&e.touchend(function(){a.handleLineClick()}))},handleLineClick:function(){var a={type:"click",trendLine:this,chart:this.chart};this.fire(a.type,a)},handleLineOver:function(){var a=
	        this.rollOverColor;void 0!==a&&this.line.attr({stroke:a})},handleLineOut:function(){this.line.attr({stroke:this.lineColor})},destroy:function(){AmCharts.remove(this.set)}});AmCharts.circle=function(a,b,c,d,e,f,g,h){if(void 0==e||0===e)e=1;void 0===f&&(f="#000000");void 0===g&&(g=0);d={fill:c,stroke:f,"fill-opacity":d,"stroke-width":e,"stroke-opacity":g};a=a.circle(0,0,b).attr(d);h&&a.gradient("radialGradient",[c,AmCharts.adjustLuminosity(c,-0.6)]);return a};
	    AmCharts.text=function(a,b,c,d,e,f,g,h){f||(f="middle");"right"==f&&(f="end");isNaN(h)&&(h=1);void 0!==b&&(b=String(b),AmCharts.isIE&&!AmCharts.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":d,"font-size":e,opacity:h};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};
	    AmCharts.polygon=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=0);isNaN(h)&&(h=e);var n=d,p=!1;"object"==typeof n&&1<n.length&&(p=!0,n=n[0]);void 0===g&&(g=n);e={fill:n,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);m=AmCharts.dx;f=AmCharts.dy;a.handDrawn&&(c=AmCharts.makeHD(b,c,a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;l&&(g=AmCharts.doNothing);l="M"+(g(b[0])+m)+","+(g(c[0])+f);for(h=1;h<b.length;h++)l+=" L"+(g(b[h])+m)+","+(g(c[h])+
	        f);a=a.path(l+" Z").attr(e);p&&a.gradient("linearGradient",d,k);return a};
	    AmCharts.rect=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=0);void 0===k&&(k=0);void 0===l&&(l=270);isNaN(e)&&(e=0);var n=d,p=!1;"object"==typeof n&&(n=n[0],p=!0);void 0===g&&(g=n);void 0===h&&(h=e);b=Math.round(b);c=Math.round(c);var q=0,u=0;0>b&&(b=Math.abs(b),q=-b);0>c&&(c=Math.abs(c),u=-c);q+=AmCharts.dx;u+=AmCharts.dy;e={fill:n,stroke:g,"fill-opacity":e,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);a=a.rect(q,u,b,c,k,f).attr(e);p&&a.gradient("linearGradient",d,l);return a};
	    AmCharts.bullet=function(a,b,c,d,e,f,g,h,k,l,m){var n;"circle"==b&&(b="round");switch(b){case "round":n=AmCharts.circle(a,c/2,d,e,f,g,h);break;case "square":n=AmCharts.polygon(a,[-c/2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],d,e,f,g,h,l-180);break;case "diamond":n=AmCharts.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],d,e,f,g,h);break;case "triangleUp":n=AmCharts.triangle(a,c,0,d,e,f,g,h);break;case "triangleDown":n=AmCharts.triangle(a,c,180,d,e,f,g,h);break;case "triangleLeft":n=AmCharts.triangle(a,c,270,d,e,
	        f,g,h);break;case "triangleRight":n=AmCharts.triangle(a,c,90,d,e,f,g,h);break;case "bubble":n=AmCharts.circle(a,c/2,d,e,f,g,h,!0);break;case "yError":n=a.set();n.push(AmCharts.line(a,[0,0],[-c/2,c/2],d,e,f));n.push(AmCharts.line(a,[-k,k],[-c/2,-c/2],d,e,f));n.push(AmCharts.line(a,[-k,k],[c/2,c/2],d,e,f));break;case "xError":n=a.set(),n.push(AmCharts.line(a,[-c/2,c/2],[0,0],d,e,f)),n.push(AmCharts.line(a,[-c/2,-c/2],[-k,k],d,e,f)),n.push(AmCharts.line(a,[c/2,c/2],[-k,k],d,e,f))}n&&n.pattern(m);return n};
	    AmCharts.triangle=function(a,b,c,d,e,f,g,h){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===h&&(h=0);d={fill:d,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};b/=2;var k;0===c&&(k=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(k=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(k=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(k=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(k).attr(d)};
	    AmCharts.line=function(a,b,c,d,e,f,g,h,k,l,m){if(a.handDrawn&&!m)return AmCharts.handDrawnLine(a,b,c,d,e,f,g,h,k,l,m);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d=Math.round;l&&(d=AmCharts.doNothing);l=AmCharts.dx;e=AmCharts.dy;g="M"+(d(b[0])+l)+","+(d(c[0])+e);for(h=1;h<b.length;h++)g+=" L"+(d(b[h])+l)+","+(d(c[h])+e);if(AmCharts.VML)return a.path(g,void 0,!0).attr(f);k&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};
	    AmCharts.makeHD=function(a,b,c){for(var d=[],e=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),h=Number(b[f-1]),k=Number(a[f]),l=Number(b[f]),m=Math.sqrt(Math.pow(k-g,2)+Math.pow(l-h,2)),m=Math.round(m/50)+1,k=(k-g)/m,l=(l-h)/m,n=0;n<=m;n++){var p=g+n*k+Math.random()*c,q=h+n*l+Math.random()*c;d.push(p);e.push(q)}return[d,e]};
	    AmCharts.handDrawnLine=function(a,b,c,d,e,f,g,h,k,l,m){var n=a.set();for(m=1;m<b.length;m++)for(var p=[b[m-1],b[m]],q=[c[m-1],c[m]],q=AmCharts.makeHD(p,q,a.handDrawScatter),p=q[0],q=q[1],u=1;u<p.length;u++)n.push(AmCharts.line(a,[p[u-1],p[u]],[q[u-1],q[u]],d,e,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,h,k,l,!0));return n};AmCharts.doNothing=function(a){return a};
	    AmCharts.wedge=function(a,b,c,d,e,f,g,h,k,l,m,n){var p=Math.round;f=p(f);g=p(g);h=p(h);var q=p(g/f*h),u=AmCharts.VML,r=359.5+f/100;359.94<r&&(r=359.94);e>=r&&(e=r);var s=1/180*Math.PI,r=b+Math.sin(d*s)*h,w=c-Math.cos(d*s)*q,v=b+Math.sin(d*s)*f,t=c-Math.cos(d*s)*g,A=b+Math.sin((d+e)*s)*f,E=c-Math.cos((d+e)*s)*g,x=b+Math.sin((d+e)*s)*h,s=c-Math.cos((d+e)*s)*q,z={fill:AmCharts.adjustLuminosity(l.fill,-0.2),"stroke-opacity":0},H=0;180<Math.abs(e)&&(H=1);d=a.set();var I;u&&(r=p(10*r),v=p(10*v),A=p(10*
	        A),x=p(10*x),w=p(10*w),t=p(10*t),E=p(10*E),s=p(10*s),b=p(10*b),k=p(10*k),c=p(10*c),f*=10,g*=10,h*=10,q*=10,1>Math.abs(e)&&1>=Math.abs(A-v)&&1>=Math.abs(E-t)&&(I=!0));e="";var B;0<k&&(u?(B=" M"+r+","+(w+k)+" L"+v+","+(t+k),I||(B+=" A"+(b-f)+","+(k+c-g)+","+(b+f)+","+(k+c+g)+","+v+","+(t+k)+","+A+","+(E+k)),B+=" L"+x+","+(s+k),0<h&&(I||(B+=" B"+(b-h)+","+(k+c-q)+","+(b+h)+","+(k+c+q)+","+x+","+(k+s)+","+r+","+(k+w)))):(B=" M"+r+","+(w+k)+" L"+v+","+(t+k)+(" A"+f+","+g+",0,"+H+",1,"+A+","+(E+k)+" L"+
	        x+","+(s+k)),0<h&&(B+=" A"+h+","+q+",0,"+H+",0,"+r+","+(w+k))),B+=" Z",B=a.path(B,void 0,void 0,"1000,1000").attr(z),d.push(B),B=a.path(" M"+r+","+w+" L"+r+","+(w+k)+" L"+v+","+(t+k)+" L"+v+","+t+" L"+r+","+w+" Z",void 0,void 0,"1000,1000").attr(z),k=a.path(" M"+A+","+E+" L"+A+","+(E+k)+" L"+x+","+(s+k)+" L"+x+","+s+" L"+A+","+E+" Z",void 0,void 0,"1000,1000").attr(z),d.push(B),d.push(k));u?(I||(e=" A"+p(b-f)+","+p(c-g)+","+p(b+f)+","+p(c+g)+","+p(v)+","+p(t)+","+p(A)+","+p(E)),f=" M"+p(r)+","+p(w)+
	        " L"+p(v)+","+p(t)+e+" L"+p(x)+","+p(s)):f=" M"+r+","+w+" L"+v+","+t+(" A"+f+","+g+",0,"+H+",1,"+A+","+E)+" L"+x+","+s;0<h&&(u?I||(f+=" B"+(b-h)+","+(c-q)+","+(b+h)+","+(c+q)+","+x+","+s+","+r+","+w):f+=" A"+h+","+q+",0,"+H+",0,"+r+","+w);a.handDrawn&&(b=AmCharts.line(a,[r,v],[w,t],l.stroke,l.thickness*Math.random()*a.handDrawThickness,l["stroke-opacity"]),d.push(b));a=a.path(f+" Z",void 0,void 0,"1000,1000").attr(l);if(m){b=[];for(c=0;c<m.length;c++)b.push(AmCharts.adjustLuminosity(l.fill,m[c]));
	        0<b.length&&a.gradient("linearGradient",b)}a.pattern(n);d.push(a);return d};AmCharts.adjustLuminosity=function(a,b){a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",d,e;for(e=0;3>e;e++)d=parseInt(a.substr(2*e,2),16),d=Math.round(Math.min(Math.max(0,d+d*b),255)).toString(16),c+=("00"+d).substr(d.length);return c};AmCharts.Bezier=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l){"object"==typeof g&&(g=g[0]);"object"==typeof h&&(h=h[0]);f={fill:g,"fill-opacity":h,"stroke-width":f};void 0!==k&&0<k&&(f["stroke-dasharray"]=k);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d="M"+Math.round(b[0])+","+Math.round(c[0]);e=[];for(k=0;k<b.length;k++)e.push({x:Number(b[k]),y:Number(c[k])});1<e.length&&(b=this.interpolate(e),d+=this.drawBeziers(b));l?d+=l:AmCharts.VML||(d+="M0,0 L0,0");this.path=a.path(d).attr(f)},
	        interpolate:function(a){var b=[];b.push({x:a[0].x,y:a[0].y});var c=a[1].x-a[0].x,d=a[1].y-a[0].y,e=AmCharts.bezierX,f=AmCharts.bezierY;b.push({x:a[0].x+c/e,y:a[0].y+d/f});var g;for(g=1;g<a.length-1;g++){var h=a[g-1],k=a[g],d=a[g+1],c=d.x-k.x,d=d.y-h.y,h=k.x-h.x;h>c&&(h=c);b.push({x:k.x-h/e,y:k.y-d/f});b.push({x:k.x,y:k.y});b.push({x:k.x+h/e,y:k.y+d/f})}d=a[a.length-1].y-a[a.length-2].y;c=a[a.length-1].x-a[a.length-2].x;b.push({x:a[a.length-1].x-c/e,y:a[a.length-1].y-d/f});b.push({x:a[a.length-1].x,
	            y:a[a.length-1].y});return b},drawBeziers:function(a){var b="",c;for(c=0;c<(a.length-1)/3;c++)b+=this.drawBezierMidpoint(a[3*c],a[3*c+1],a[3*c+2],a[3*c+3]);return b},drawBezierMidpoint:function(a,b,c,d){var e=Math.round,f=this.getPointOnSegment(a,b,0.75),g=this.getPointOnSegment(d,c,0.75),h=(d.x-a.x)/16,k=(d.y-a.y)/16,l=this.getPointOnSegment(a,b,0.375);a=this.getPointOnSegment(f,g,0.375);a.x-=h;a.y-=k;b=this.getPointOnSegment(g,f,0.375);b.x+=h;b.y+=k;c=this.getPointOnSegment(d,c,0.375);h=this.getMiddle(l,
	            a);f=this.getMiddle(f,g);g=this.getMiddle(b,c);l=" Q"+e(l.x)+","+e(l.y)+","+e(h.x)+","+e(h.y);l+=" Q"+e(a.x)+","+e(a.y)+","+e(f.x)+","+e(f.y);l+=" Q"+e(b.x)+","+e(b.y)+","+e(g.x)+","+e(g.y);return l+=" Q"+e(c.x)+","+e(c.y)+","+e(d.x)+","+e(d.y)},getMiddle:function(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}},getPointOnSegment:function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}}});AmCharts.AmDraw=AmCharts.Class({construct:function(a,b,c,d){AmCharts.SVG_NS="http://www.w3.org/2000/svg";AmCharts.SVG_XLINK="http://www.w3.org/1999/xlink";AmCharts.hasSVG=!!document.createElementNS&&!!document.createElementNS(AmCharts.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");AmCharts.hasSVG?(AmCharts.SVG=!0,d=this.createSvgElement("svg"),d.style.position="absolute",d.style.width=b+"px",d.style.height=c+"px",AmCharts.rtl&&
	    (d.setAttribute("direction","rtl"),d.style.left="auto",d.style.right="0px"),d.setAttribute("version","1.1"),a.appendChild(d),this.container=d,this.R=new AmCharts.SVGRenderer(this)):AmCharts.isIE&&AmCharts.VMLRenderer&&(AmCharts.VML=!0,AmCharts.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),b=document.createStyleSheet(),b.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),AmCharts.vmlStyleSheet=b),this.container=a,this.R=new AmCharts.VMLRenderer(this,
	        d),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(AmCharts.SVG_NS,a)},circle:function(a,b,c,d){var e=new AmCharts.AmDObject("circle",this);e.attr({r:c,cx:a,cy:b});this.addToContainer(e.node,d);return e},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,d,e,f,g){var h=new AmCharts.AmDObject("rect",this);AmCharts.VML&&(e=100*e/Math.min(c,d),c+=2*f,d+=2*f,h.bw=f,h.node.style.marginLeft=
	        -f,h.node.style.marginTop=-f);1>c&&(c=1);1>d&&(d=1);h.attr({x:a,y:b,width:c,height:d,rx:e,ry:e,"stroke-width":f});this.addToContainer(h.node,g);return h},image:function(a,b,c,d,e,f){var g=new AmCharts.AmDObject("image",this);g.attr({x:b,y:c,width:d,height:e});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,c){return this.R.text(a,b,c)},path:function(a,b,c,d){var e=new AmCharts.AmDObject("path",this);d||
	    (d="100,100");e.attr({cs:d});c?e.attr({dd:a}):e.attr({d:a});this.addToContainer(e.node,b);return e},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=this.container,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}a=1-c.e%1;c=1-c.f%1;0.5<a&&(a-=1);0.5<c&&(c-=1);a&&(b.left=a+"px");c&&(b.top=c+"px")},update:function(){this.R.update()}});AmCharts.AmDObject=AmCharts.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=c;this.angle&&this.rotate(this.angle)},
	        rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var d in a)if(a.hasOwnProperty(d)){var e=d,f=a[d];c=AmCharts.getEffect(c);this.R.animate(this,e,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},
	        hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;
	            c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchstart:function(a){this.R.addListener(this,
	            "touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(a){(a=this.animationX)&&AmCharts.removeFromArray(this.R.animations,a);(a=this.animationY)&&AmCharts.removeFromArray(this.R.animations,a)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,
	            a,b,c)},pattern:function(a,b){a&&this.R.pattern(this,a,b)}});AmCharts.VMLRenderer=AmCharts.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),a.type="image";else{a.type=
	        "shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var e=document.createElement("amvml:fill");c.appendChild(e);a.fill=e;e.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var d;8===document.documentMode&&(d=!0);var e=a.node,f=a.type,
	        g=e.style;"r"==b&&(g.width=2*c,g.height=2*c);"roundrect"!=a.shapeType||"width"!=b&&"height"!=b||(c-=1);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-AmCharts.removePx(g.width)/2);"cy"==b&&(g.top=c-AmCharts.removePx(g.height)/2);var h=this.styleMap[b];void 0!==h&&(g[h]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,h=e.clientWidth,"end"==c&&(g.marginLeft=-h+"px"),"middle"==c&&(g.marginLeft=-(h/2)+"px",g.textAlign="center"),"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=
	        c));if(g=a.children)for(h=0;h<g.length;h++)g[h].setAttr(b,c);if("shape"==f){"cs"==b&&(e.style.width="100px",e.style.height="100px",e.setAttribute("coordsize",c));"d"==b&&e.setAttribute("path",this.svgPathToVml(c));"dd"==b&&e.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(d?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(d?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&(d?f.opacity=c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),
	    3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),d?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?d?a.on=!1:a.setAttribute("on",!1):d?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(d?a.color=c:a.setAttribute("color",c));"rx"==b&&(d?e.arcSize=c+"%":e.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,b,c){var d=new AmCharts.AmDObject("text",this.D),e=d.node;e.style.whiteSpace="pre";e.innerHTML=
	        a;this.D.addToContainer(e,c);this.attr(d,b);return d},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,e=a.offsetHeight,f;if(a.hasChildNodes()){var g,h,k;for(k=0;k<a.childNodes.length;k++){f=this.getBox(a.childNodes[k]);var l=f.x;isNaN(l)||(isNaN(g)?g=l:l<g&&(g=l));var m=f.y;isNaN(m)||(isNaN(h)?h=m:m<h&&(h=m));l=f.width+l;isNaN(l)||(d=Math.max(d,l));f=f.height+m;isNaN(f)||(e=Math.max(e,f))}0>g&&(b+=g);0>h&&(c+=h)}return{x:b,y:c,width:d,
	        height:e}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var d=a.node,e=d.style;"text"==a.type&&(c-=AmCharts.removePx(e.fontSize)/2-1);"oval"==a.shapeType&&(b-=AmCharts.removePx(e.width)/2,c-=AmCharts.removePx(e.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(d.style.left=b+"px",d.style.top=c+"px")},svgPathToVml:function(a){var b=a.split(" ");a="";var c,d=Math.round,e;for(e=
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   0;e<b.length;e++){var f=b[e],g=f.substring(0,1),f=f.substring(1),h=f.split(","),k=d(h[0])+","+d(h[1]);"M"==g&&(a+=" m "+k);"L"==g&&(a+=" l "+k);"Z"==g&&(a+=" x e");if("Q"==g){var l=c.length,m=c[l-1],n=h[0],p=h[1],k=h[2],q=h[3];c=d(c[l-2]/3+2/3*n);m=d(m/3+2/3*p);n=d(2/3*n+k/3);p=d(2/3*p+q/3);a+=" c "+c+","+m+","+n+","+p+","+k+","+q}"A"==g&&(a+=" wa "+f);"B"==g&&(a+=" at "+f);c=h}return a},animate:function(a,b,c,d,e){var f=a.node,g=this.chart;if("translate"==b){b=c.split(",");c=b[1];var h=f.offsetTop;
	        g.animate(a,"left",f.offsetLeft,b[0],d,e,"px");g.animate(a,"top",h,c,d,e,"px")}},clipRect:function(a,b,c,d,e){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=e+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+e)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var d=a.node;a=d.style;c||(c=this.getBGColor(d.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/180;var e=Math.cos(c),f=Math.sin(c),g=AmCharts.removePx(a.left),h=AmCharts.removePx(a.top),
	        k=d.offsetWidth,d=d.offsetHeight;b/=Math.abs(b);a.left=g+k/2-k/2*Math.cos(c)-b*d/2*Math.sin(c)+3;a.top=h-b*k/2*Math.sin(c)+b*d/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+e+"', M12='"+-f+"', M21='"+f+"', M22='"+e+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},set:function(a){var b=new AmCharts.AmDObject("group",this.D);
	        this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var e="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++){var g=Math.round(100*f/(c.length-1)),e=e+(g+"% "+c[f]);f<c.length-1&&(e+=",")}a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",b),a.setAttribute("angle",d));e&&(a.colors.value=
	        e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){void 0!==typeof a.onselectstart&&(a.onselectstart=function(){return!1});a.style.cursor="default"},pattern:function(a,b){var c=a.fill;a.node.fillColor="none";8===document.documentMode?(c.type="tile",c.src=b.url):(c.setAttribute("type","tile"),c.setAttribute("src",b.url))},update:function(){}});AmCharts.SVGRenderer=AmCharts.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(AmCharts.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,d,e){var f=a.node;a["an_"+b]&&AmCharts.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",f=
	        f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:d,effect:e};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],d=1E3*c.time/AmCharts.updateRate,e=c.frame+1,f=c.obj,g=c.attribute,h,k,l;e<=d?(c.frame++,"translate"==g?(h=c.from.split(","),g=Number(h[0]),h=Number(h[1]),isNaN(h)&&(h=0),k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),l=0===l-g?l:
	        Math.round(AmCharts[c.effect](0,e,g,l-g,d)),c=0===k-h?k:Math.round(AmCharts[c.effect](0,e,h,k-h,d)),g="transform",c="translate("+l+","+c+")"):(k=Number(c.from),h=Number(c.to),l=h-k,c=AmCharts[c.effect](0,e,k,l,d),isNaN(c)&&(c=h),0===l&&this.animations.splice(a,1)),this.setAttr(f,g,c)):("translate"==g?(k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),f.translate(l,k)):(h=Number(c.to),this.setAttr(f,g,h)),this.animations.splice(a,1))}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,
	        height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(AmCharts.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,d,e){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var h=f.parentNode;h&&(f=document.createElementNS(AmCharts.SVG_NS,"clipPath"),g=AmCharts.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,d,e,0,0,f),h.appendChild(f),b="#",AmCharts.baseHref&&!AmCharts.isIE&&(b=window.location.href+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},text:function(a,b,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          c){var d=new AmCharts.AmDObject("text",this.D);a=String(a).split("\n");var e=b["font-size"],f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(e+2)*f+Math.round(e/2));g.setAttribute("x",0);d.node.appendChild(g)}d.node.setAttribute("y",Math.round(e/2));this.attr(d,b);this.D.addToContainer(d.node,c);return d},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},move:function(a,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    b,c,d){b="translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new AmCharts.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,d){var e=a.node,f=a.grad;f&&this.D.remove(f);b=document.createElementNS(AmCharts.SVG_NS,
	        b);f=AmCharts.getUniqueId();b.setAttribute("id",f);if(!isNaN(d)){var g=0,h=0,k=0,l=0;90==d?k=100:270==d?l=100:180==d?g=100:0===d&&(h=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",h+"%");b.setAttribute("y1",k+"%");b.setAttribute("y2",l+"%")}for(d=0;d<c.length;d++)g=document.createElementNS(AmCharts.SVG_NS,"stop"),h=100*d/(c.length-1),0===d&&(h=0),g.setAttribute("offset",h+"%"),g.setAttribute("stop-color",c[d]),b.appendChild(g);e.parentNode.appendChild(b);c="#";AmCharts.baseHref&&!AmCharts.isIE&&
	    (c=window.location.href+c);e.setAttribute("fill","url("+c+f+")");a.grad=b},pattern:function(a,b,c){var d=a.node;isNaN(c)&&(c=1);var e=a.patternNode;e&&this.D.remove(e);var e=document.createElementNS(AmCharts.SVG_NS,"pattern"),f=AmCharts.getUniqueId(),g=b;b.url&&(g=b.url);var h=Number(b.width);isNaN(h)&&(h=4);var k=Number(b.height);isNaN(k)&&(k=4);h/=c;k/=c;c=b.x;isNaN(c)&&(c=0);var l=-Math.random()*Number(b.randomX);isNaN(l)||(c=l);l=b.y;isNaN(l)&&(l=0);b=-Math.random()*Number(b.randomY);isNaN(b)||
	    (l=b);e.setAttribute("id",f);e.setAttribute("width",h);e.setAttribute("height",k);e.setAttribute("patternUnits","userSpaceOnUse");e.setAttribute("xlink:href",g);this.D.image(g,0,0,h,k,e).translate(c,l);g="#";AmCharts.baseHref&&!AmCharts.isIE&&(g=window.location.href+g);d.setAttribute("fill","url("+g+f+")");a.patternNode=e;d.parentNode.appendChild(e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}});AmCharts.AmDSet=AmCharts.Class({construct:function(a){this.create("g")},attr:function(a){this.R.attr(this.node,a)},move:function(a,b){this.R.move(this.node,a,b)}});AmCharts.AmLegend=AmCharts.Class({construct:function(){this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=16;this.markerBorderThickness=this.markerBorderAlpha=
	        1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.dateFormat="DD-MM-YYYY";this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.useGraphSettings=!1;this.showEntries=
	        !0},setData:function(a){this.data=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];AmCharts.ifArray(this.data)&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,d=a.divRealWidth,e=a.divRealHeight,f=this.div,g=this.data;isNaN(this.fontSize)&&(this.fontSize=a.fontSize);if("right"==b||"left"==b)this.maxColumns=1,this.marginLeft=this.marginRight=10;else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=
	        a.marginLeft;var h=a.autoMarginOffset;"bottom"==b?(this.marginBottom=h,this.marginTop=0):(this.marginTop=h,this.marginBottom=0)}c=void 0!==c?AmCharts.toCoordinate(c,d):a.realWidth;"outside"==b?(c=f.offsetWidth,e=f.offsetHeight,f.clientHeight&&(c=f.clientWidth,e=f.clientHeight)):(f.style.width=c+"px",f.className="amChartsLegend");this.divWidth=c;this.container=new AmCharts.AmDraw(f,c,e,a);this.lx=0;this.ly=8;b=this.markerSize;b>this.fontSize&&(this.ly=b/2-1);0<b&&(this.lx+=b+this.markerLabelGap);this.titleWidth=
	        0;if(b=this.title)a=AmCharts.text(this.container,b,this.color,a.fontFamily,this.fontSize,"start",!0),a.translate(this.marginLeft,this.marginTop+this.verticalGap+this.ly+1),a=a.getBBox(),this.titleWidth=a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+
	        this.titleWidth,c=this.marginRight,d=this.marginTop,e=this.marginBottom,f=this.horizontalGap,g=this.div,h=this.divWidth,k=this.maxColumns,l=this.verticalGap,m=this.spacing,n=h-c-b,p=0,q=0,u=this.container,r=u.set();this.set=r;u=u.set();r.push(u);var s=this.entries,w,v;for(v=0;v<s.length;v++){w=s[v].getBBox();var t=w.width;t>p&&(p=t);w=w.height;w>q&&(q=w)}var A=t=0,E=f;for(v=0;v<s.length;v++){var x=s[v];this.reversedOrder&&(x=s[s.length-v-1]);w=x.getBBox();var z;this.equalWidths?z=f+A*(p+m+this.markerLabelGap):
	        (z=E,E=E+w.width+f+m);z+w.width>n&&0<v&&0!==A&&(t++,A=0,z=f,E=z+w.width+f+m);x.translate(z,(q+l)*t);A++;!isNaN(k)&&A>=k&&(A=0,t++);u.push(x)}w=u.getBBox();k=w.height+2*l-1;"left"==a||"right"==a?(h=w.width+2*f,g.style.width=h+b+c+"px"):h=h-b-c-1;c=AmCharts.polygon(this.container,[0,h,h,0],[0,0,k,k],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);r.push(c);r.translate(b,d);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==a)"center"==this.align?b=f+(h-
	        w.width)/2:"right"==this.align&&(b=f+h-w.width);u.translate(b,l+1);this.titleHeight>k&&(k=this.titleHeight);a=k+d+e+1;0>a&&(a=0);g.style.height=Math.round(a)+"px"},createEntry:function(a){if(!1!==a.visibleInLegend){var b=this.chart,c=a.markerType;c||(c=this.markerType);var d=a.color,e=a.alpha;a.legendKeyColor&&(d=a.legendKeyColor());a.legendKeyAlpha&&(e=a.legendKeyAlpha());var f;!0===a.hidden&&(f=d=this.markerDisabledColor);var g=a.pattern,h=a.customMarker;h||(h=this.customMarker);var k=this.container,
	        l=this.markerSize,m=0;if(this.useGraphSettings)if(c=a.type,"line"==c||"step"==c||"smoothedLine"==c||"ohlc"==c)this.switchType=void 0,g=k.set(),a.hidden||(d=a.lineColor,f=a.bulletBorderColor),m=AmCharts.line(k,[0,2*l],[l/2,l/2],d,a.lineAlpha,a.lineThickness,a.dashLength),g.push(m),a.bullet&&(a.hidden||(d=a.bulletColor),m=AmCharts.bullet(k,a.bullet,a.bulletSize,d,a.bulletAlpha,a.bulletBorderThickness,f,a.bulletBorderAlpha))&&(m.translate(l+1,l/2),g.push(m)),m=l;else{var n;a.getGradRotation&&(n=a.getGradRotation());
	        (g=this.createMarker("square",a.fillColors,a.fillAlphas,a.lineThickness,d,a.lineAlpha,n,g))&&g.translate(l/2,l/2)}else h?(b.path&&(h=b.path+h),g=k.image(h,0,0,l,l)):(g=this.createMarker(c,d,e,void 0,void 0,void 0,void 0,g))&&g.translate(l/2,l/2);this.addListeners(g,a);k=k.set([g]);this.switchable&&k.setAttr("cursor","pointer");if(f=this.switchType)n="x"==f?this.createX():this.createV(),n.dItem=a,!0!==a.hidden?"x"==f?n.hide():n.show():"x"!=f&&n.hide(),this.switchable||n.hide(),this.addListeners(n,
	        a),a.legendSwitch=n,k.push(n);f=this.color;a.showBalloon&&this.textClickEnabled&&void 0!==this.selectedColor&&(f=this.selectedColor);this.useMarkerColorForLabels&&(f=d);!0===a.hidden&&(f=this.markerDisabledColor);d=AmCharts.massReplace(this.labelText,{"[[title]]":a.title});n=this.fontSize;g&&l<=n&&g.translate(l/2,l/2+this.ly-n/2+(n+2-l)/2);var p;d&&(d=AmCharts.fixNewLines(d),a.legendTextReal=d,p=AmCharts.text(this.container,d,f,b.fontFamily,n,"start"),p.translate(this.lx+m,this.ly),k.push(p),b=p.getBBox().width,
	    this.maxLabelWidth<b&&(this.maxLabelWidth=b));this.entries[this.index]=k;a.legendEntry=this.entries[this.index];a.legendLabel=p;this.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(){c.rollOverMarker(b)}).mouseout(function(){c.rollOutMarker(b)}).click(function(){c.clickMarker(b)})},rollOverMarker:function(a){this.switchable&&this.dispatch("rollOverMarker",a);this.dispatch("rollOverItem",a)},rollOutMarker:function(a){this.switchable&&this.dispatch("rollOutMarker",a);this.dispatch("rollOutItem",
	        a)},clickMarker:function(a){this.switchable?!0===a.hidden?this.dispatch("showItem",a):this.dispatch("hideItem",a):this.textClickEnabled&&this.dispatch("clickMarker",a)},rollOverLabel:function(a){a.hidden||(this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor}),this.dispatch("rollOverItem",a))},rollOutLabel:function(a){if(!a.hidden){if(this.textClickEnabled&&a.legendLabel){var b=this.color;void 0!==this.selectedColor&&a.showBalloon&&(b=this.selectedColor);this.useMarkerColorForLabels&&
	    (b=a.lineColor,void 0===b&&(b=a.color));a.legendLabel.attr({fill:b})}this.dispatch("rollOutItem",a)}},clickLabel:function(a){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a):this.dispatch("hideItem",a))},dispatch:function(a,b){this.fire(a,{type:a,dataItem:b,target:this,chart:this.chart})},createValue:function(a){var b=this,c=b.fontSize;if(!1!==a.visibleInLegend){var d=b.maxLabelWidth;b.equalWidths||(b.valueAlign="left");"left"==
	    b.valueAlign&&(d=a.legendEntry.getBBox().width);var e=d;if(b.valueText){var f=b.color;b.useMarkerColorForValues&&(f=a.color,a.legendKeyColor&&(f=a.legendKeyColor()));!0===a.hidden&&(f=b.markerDisabledColor);var g=b.valueText,d=d+b.lx+b.markerLabelGap+b.valueWidth,h="end";"left"==b.valueAlign&&(d-=b.valueWidth,h="start");f=AmCharts.text(b.container,g,f,b.chart.fontFamily,c,h);f.translate(d,b.ly);b.entries[b.index].push(f);e+=b.valueWidth+2*b.markerLabelGap;f.dItem=a;b.valueLabels.push(f)}b.index++;
	        f=b.markerSize;f<c+7&&(f=c+7,AmCharts.VML&&(f+=3));c=b.container.rect(b.markerSize,0,e,f,0,0).attr({stroke:"none",fill:"#ffffff","fill-opacity":0.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(){b.rollOverLabel(a)}).mouseout(function(){b.rollOutLabel(a)}).click(function(){b.clickLabel(a)})}},createV:function(){var a=this.markerSize;return AmCharts.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=this.markerSize-3,b={stroke:this.switchColor,
	        "stroke-width":3},c=this.container,d=AmCharts.line(c,[3,a],[3,a]).attr(b),a=AmCharts.line(c,[3,a],[a,3]).attr(b);return this.container.set([d,a])},createMarker:function(a,b,c,d,e,f,g,h){var k=this.markerSize,l=this.container;e||(e=this.markerBorderColor);e||(e=b);isNaN(d)&&(d=this.markerBorderThickness);isNaN(f)&&(f=this.markerBorderAlpha);return AmCharts.bullet(l,a,k,b,c,d,e,f,k,g,h)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c;for(c=
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0;c<a.length;c++){var d=a[c],e=d.dItem,f=" ";if(void 0!==e.type){var g=e.currentDataItem,h=this.periodValueText;e.legendPeriodValueText&&(h=e.legendPeriodValueText);g?(f=this.valueText,e.legendValueText&&(f=e.legendValueText),f=b.formatString(f,g)):h&&(f=b.formatPeriodString(h,e))}else f=b.formatString(this.valueText,e);(g=e.legendLabel)&&g.text(e.legendTextReal);d.text(f)}},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";AmCharts.remove(this.set)}});AmCharts.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};AmCharts.extractPeriod=function(a){var b=AmCharts.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};
	    AmCharts.resetDateToMin=function(a,b,c,d){void 0===d&&(d=1);var e,f,g,h,k,l,m;AmCharts.useUTC?(e=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),h=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),m=a.getUTCMilliseconds(),a=a.getUTCDay()):(e=a.getFullYear(),f=a.getMonth(),g=a.getDate(),h=a.getHours(),k=a.getMinutes(),l=a.getSeconds(),m=a.getMilliseconds(),a=a.getDay());switch(b){case "YYYY":e=Math.floor(e/c)*c;f=0;g=1;m=l=k=h=0;break;case "MM":f=Math.floor(f/c)*c;g=1;m=l=k=h=0;break;case "WW":0===
	    a&&0<d&&(a=7);g=g-a+d;m=l=k=h=0;break;case "DD":m=l=k=h=0;break;case "hh":h=Math.floor(h/c)*c;m=l=k=0;break;case "mm":k=Math.floor(k/c)*c;m=l=0;break;case "ss":l=Math.floor(l/c)*c;m=0;break;case "fff":m=Math.floor(m/c)*c}AmCharts.useUTC?(a=new Date,a.setUTCFullYear(e,f,g),a.setUTCHours(h,k,l,m)):a=new Date(e,f,g,h,k,l,m);return a};
	    AmCharts.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case "YYYY":c=316224E5;break;case "MM":c=26784E5;break;case "WW":c=6048E5;break;case "DD":c=864E5;break;case "hh":c=36E5;break;case "mm":c=6E4;break;case "ss":c=1E3;break;case "fff":c=1}return c*b};AmCharts.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};
	    AmCharts.getMaxInterval=function(a,b){var c=AmCharts.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,AmCharts.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};AmCharts.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");AmCharts.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");AmCharts.monthNames="January February March April May June July August September October November December".split(" ");AmCharts.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
	    AmCharts.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};
	    AmCharts.stringToDate=function(a,b){var c={},d=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",
	        period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],e=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(e=!1));var f=b,g,h,k;for(k=0;k<d.length;k++)h=d[k].period,c[h]=0,"date"==h&&(c[h]=1);for(k=0;k<d.length;k++)if(g=d[k].pattern,h=d[k].period,-1!=b.indexOf(g)){var l=AmCharts.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==
	        g||"L"==g)e||(l+=12);c[h]=l}return new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds)};AmCharts.getFromDateString=function(a,b,c){c=c.indexOf(a);b=b.substr(c,a.length);"0"==b.charAt(0)&&(b=b.substr(1,b.length-1));b=Number(b);isNaN(b)&&(b=0);-1!=a.indexOf("M")&&b--;return b};
	    AmCharts.formatDate=function(a,b){var c,d,e,f,g,h,k,l,m=AmCharts.getWeekNumber(a);AmCharts.useUTC?(c=a.getUTCFullYear(),d=a.getUTCMonth(),e=a.getUTCDate(),f=a.getUTCDay(),g=a.getUTCHours(),h=a.getUTCMinutes(),k=a.getUTCSeconds(),l=a.getUTCMilliseconds()):(c=a.getFullYear(),d=a.getMonth(),e=a.getDate(),f=a.getDay(),g=a.getHours(),h=a.getMinutes(),k=a.getSeconds(),l=a.getMilliseconds());var n=String(c).substr(2,2),p=d+1;9>d&&(p="0"+p);var q=e;10>e&&(q="0"+e);var u="0"+f;b=b.replace(/W/g,m);m=g;24==
	    m&&(m=0);var r=m;10>r&&(r="0"+r);b=b.replace(/JJ/g,r);b=b.replace(/J/g,m);m=g;0===m&&(m=24);r=m;10>r&&(r="0"+r);b=b.replace(/HH/g,r);b=b.replace(/H/g,m);m=g;11<m&&(m-=12);r=m;10>r&&(r="0"+r);b=b.replace(/KK/g,r);b=b.replace(/K/g,m);m=g;0===m&&(m=12);12<m&&(m-=12);r=m;10>r&&(r="0"+r);b=b.replace(/LL/g,r);b=b.replace(/L/g,m);m=h;10>m&&(m="0"+m);b=b.replace(/NN/g,m);b=b.replace(/N/g,h);h=k;10>h&&(h="0"+h);b=b.replace(/SS/g,h);b=b.replace(/S/g,k);k=l;10>k&&(k="00"+k);100>k&&(k="0"+k);h=l;10>h&&(h="00"+
	        h);b=b.replace(/QQQ/g,k);b=b.replace(/QQ/g,h);b=b.replace(/Q/g,l);b=12>g?b.replace(/A/g,"am"):b.replace(/A/g,"pm");b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,c);b=b.replace(/@II@/g,n);b=b.replace(/@XXXX@/g,
	        AmCharts.monthNames[d]);b=b.replace(/@XXX@/g,AmCharts.shortMonthNames[d]);b=b.replace(/@XX@/g,p);b=b.replace(/@X@/g,d+1);b=b.replace(/@RR@/g,q);b=b.replace(/@R@/g,e);b=b.replace(/@PPPP@/g,AmCharts.dayNames[f]);b=b.replace(/@PPP@/g,AmCharts.shortDayNames[f]);b=b.replace(/@PP@/g,u);return b=b.replace(/@P@/g,f)};
	    AmCharts.changeDate=function(a,b,c,d,e){var f=-1;void 0===d&&(d=!0);void 0===e&&(e=!1);!0===d&&(f=1);switch(b){case "YYYY":a.setFullYear(a.getFullYear()+c*f);d||e||a.setDate(a.getDate()+1);break;case "MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);d||e||a.setDate(a.getDate()+1);break;case "DD":a.setDate(a.getDate()+c*f);break;case "WW":a.setDate(a.getDate()+7*c*f);break;case "hh":a.setHours(a.getHours()+c*f);break;case "mm":a.setMinutes(a.getMinutes()+
	        c*f);break;case "ss":a.setSeconds(a.getSeconds()+c*f);break;case "fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};

	    return AmCharts;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../vendor/avalon/avalon.js" />
	/**
	 * serialchart是一个图表柱状图组件
	 * author: zxl
	 * 使用说明：
	 * 例子：<wk:serialchart config="serialchartOpts"></wk:serialchart>
	 */
	// define(['avalon',
	//     'serial'
	// ], function (avalon) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(44)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(AmCharts) {
	    var template;
	    var chart;

	    var _interface = function() {};

	    var serialchart = {
	        chartId: '', //图表Id
	        title: '', //图表标题
	        yTitle: '', //Y轴标题
	        data: [], //展示数据
	        isScroll: false, //是否展现滚动条
	        hight: '400', //图表高度

	        // 事件
	        onInit: _interface,
	        loadData: _interface,
	        init: _interface,

	        $init: init,

	        $ready: function(vm, elem) {
	            vm.initChart(vm, elem);
	        },

	        $dispose: function(vm, el) {
	            el.innerHTML = el.textContent = "";
	        }
	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, elem) {
	        var html = '<div id="$ID$" class="chart" style="width: 100%; height: $HIGHT$px;"></div>';
	        html = html.replace('$ID$', vm.chartId).replace('$HIGHT$', vm.hight);

	        //将模板的内容插入到当前元素下面
	        template = html;
	        vm.$$template = function() {
	            return template;
	        };

	        vm.initChart = function(vm, elem) {
	            vm.loadData.call().then(function sucess(result) {
	                if (result != null && result.length > 0) {
	                    chart = new AmCharts.AmSerialChart();
	                    chart.dataProvider = vm.data;
	                    chart.pathToImages = "../plugin/amcharts_3.1.1/amcharts/images/";
	                    chart.titles = [{
	                            "text": vm.title,
	                            "size": 15
	                        }],
	                        // chart.theme = "light";
	                        chart.startDuration = 2;
	                    // chart.fontFamily = 'Open Sans',
	                    //  chart.color = "#888";
	                    chart.columnWidth = 0.5; //设置柱的宽度
	                    chart.depth3D = 25;
	                    chart.angle = 15;
	                    chart.categoryField = "label";

	                    // chartCursor
	                    var chartCursor = new AmCharts.ChartCursor;
	                    chartCursor.categoryBalloonEnabled = false;
	                    chartCursor.cursorAlpha = 0;
	                    chartCursor.zoomable = false;

	                    //这是分类颜色注释
	                    //var legend = new AmCharts.AmLegend();
	                    //legend.borderAlpha = 0.1; //外边框
	                    //legend.horizontalGap = 10; //横向距离
	                    //legend.autoMargins = false;
	                    //legend.marginLeft = 30;
	                    //legend.marginRight = 30;
	                    //chart.addLegend(legend);

	                    // category
	                    var categoryAxis = chart.categoryAxis;
	                    categoryAxis.gridPosition = "start";
	                    categoryAxis.axisAlpha = 0;
	                    categoryAxis.gridAlpha = 0.1;
	                    categoryAxis.labelRotation = 45; //设置X轴字体旋转

	                    // value
	                    var valueAxis = new AmCharts.ValueAxis();
	                    //valueAxis.stackType = "3d";  //3d:前后,不写:左右,100%:上下
	                    valueAxis.position = "left";
	                    valueAxis.axisAlpha = 0;
	                    valueAxis.gridAlpha = 0.1;
	                    valueAxis.title = vm.yTitle;
	                    chart.addValueAxis(valueAxis);

	                    // GRAPHS
	                    // first graph
	                    var graph1 = new AmCharts.AmGraph();
	                    graph1.title = "";
	                    graph1.balloonText = "[[label]]: <b>[[value]]</b>";
	                    graph1.colorField = "#C72C95";
	                    graph1.lineColor = "#C72C95";
	                    graph1.fillAlphas = 1;
	                    graph1.lineAlpha = 0;
	                    graph1.type = "column";
	                    graph1.topRadius = 1; //设置柱状体形状
	                    graph1.valueField = "value";
	                    graph1.labelText = "[[value]]";
	                    chart.addGraph(graph1);

	                    //设置滚动条
	                    if (vm.isScroll) {
	                        var chartScrollbar = new AmCharts.ChartScrollbar();
	                        chartScrollbar.dragIcon = "dragIconRectBig";
	                        chart.addChartScrollbar(chartScrollbar);
	                    }

	                    chart.dataProvider = result;
	                    chart.write(vm.chartId);

	                    //当数据改变时或者属性改变时, 想要重新绘图
	                    chart.validateNow();
	                    chart.validateData();

	                } else {
	                    elem.innerHTML = '<div ms-if="loading == false && data.length == 0" class="note note-info"><h4 class="block">暂无数据</h4><p>当前系统内还没有相应数据</p></div>';
	                }
	            }, function fail(res) {
	                elem.innerHTML = '<div ms-if="loading == false && data.length == 0" class="note note-info"><h4 class="block">暂无数据</h4><p>加载数据出错，请刷新再试</p></div>';
	                console.log(res);
	            });
	        };

	        vm.init = function() {
	            vm.initChart(vm, elem);
	        };

	        if (typeof vm.onInit === 'function') {
	            vm.onInit.call(elem, vm);
	        }
	    };

	    avalon.component("wk:serialchart", serialchart);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//var AmCharts = require('amcharts');
	//module.exports = AmCharts;


	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(42)], __WEBPACK_AMD_DEFINE_RESULT__ = function(AmCharts){
		AmCharts.AmSerialChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(){AmCharts.AmSerialChart.base.construct.call(this);this.createEvents("changed");this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=0.8;this.updateScrollbar=!0;var a=new AmCharts.CategoryAxis;a.chart=this;this.categoryAxis=a;this.chartType="serial";this.zoomOutOnDataUpdate=!0;this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=!1;this.minSelectedTime=0},initChart:function(){AmCharts.AmSerialChart.base.initChart.call(this);
			this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);var a=this.chartCursor;a&&a.updateData();var a=this.countColumns(),b=this.graphs,c;for(c=0;c<b.length;c++)b[c].columnCount=a;this.updateScrollbar=!0;this.drawChart();this.autoMargins&&!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins());this.mouseWheelScrollEnabled&&this.addMouseWheel()},validateData:function(a){this.marginsUpdated=
			!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);AmCharts.AmSerialChart.base.validateData.call(this)},drawChart:function(){AmCharts.AmSerialChart.base.drawChart.call(this);var a=this.chartData;if(AmCharts.ifArray(a)){var b=this.chartScrollbar;b&&b.draw();if(0<this.realWidth&&0<this.realHeight){var a=a.length-1,c,b=this.categoryAxis;if(b.parseDates&&!b.equalSpacing){if(b=this.startTime,c=this.endTime,isNaN(b)||isNaN(c))b=this.firstTime,c=this.lastTime}else if(b=
				this.start,c=this.end,isNaN(b)||isNaN(c))b=0,c=a;this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(b,c)}}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},cleanChart:function(){AmCharts.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},updateCategoryAxis:function(a,b,c){a.id=c;a.rotate=b;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.axisItemRenderer=AmCharts.RecItem;a.setOrientation(!this.rotate);
			a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy;a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.viW=this.plotAreaWidth-1;a.viH=this.plotAreaHeight-1;a.viX=this.marginLeftReal;a.viY=this.marginTopReal;a.marginsChanged=!0},updateValueAxes:function(){AmCharts.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],d=this.rotate;c.rotate=d;c.setOrientation(d);d=this.categoryAxis;if(!d.startOnAxis||d.parseDates)c.expandMinMax=
			!0}},updateData:function(){this.parseData();var a=this.graphs,b,c=this.chartData;for(b=0;b<a.length;b++)a[b].data=c;0<c.length&&(this.firstTime=this.getStartTime(c[0].time),this.lastTime=this.getEndTime(c[c.length-1].time))},getStartTime:function(a){var b=this.categoryAxis;return AmCharts.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},getEndTime:function(a){var b=AmCharts.extractPeriod(this.categoryAxis.minPeriod);return AmCharts.changeDate(new Date(a),b.period,b.count,!0).getTime()-
			1},updateMargins:function(){AmCharts.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate))},updateScrollbars:function(){this.updateChartScrollbar(this.chartScrollbar,this.rotate)},zoom:function(a,b){var c=this.categoryAxis;c.parseDates&&!c.equalSpacing?this.timeZoom(a,b):this.indexZoom(a,b)},timeZoom:function(a,b){var c=this.maxSelectedTime;isNaN(c)||(b!=this.endTime&&b-a>c&&
		(a=b-c,this.updateScrollbar=!0),a!=this.startTime&&b-a>c&&(b=a+c,this.updateScrollbar=!0));var d=this.minSelectedTime;if(0<d&&b-a<d){var e=Math.round(a+(b-a)/2),d=Math.round(d/2);a=e-d;b=e+d}var g=this.chartData,e=this.categoryAxis;if(AmCharts.ifArray(g)&&(a!=this.startTime||b!=this.endTime)){var k=e.minDuration(),d=this.firstTime,m=this.lastTime;a||(a=d,isNaN(c)||(a=m-c));b||(b=m);a>m&&(a=m);b<d&&(b=d);a<d&&(a=d);b>m&&(b=m);b<a&&(b=a+k);b-a<k/5&&(b<m?b=a+k/5:a=b-k/5);this.startTime=a;this.endTime=
			b;c=g.length-1;k=this.getClosestIndex(g,"time",a,!0,0,c);g=this.getClosestIndex(g,"time",b,!1,k,c);e.timeZoom(a,b);e.zoom(k,g);this.start=AmCharts.fitToBounds(k,0,c);this.end=AmCharts.fitToBounds(g,0,c);this.zoomAxesAndGraphs();this.zoomScrollbar();a!=d||b!=m?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},indexZoom:function(a,b){var c=this.maxSelectedSeries;isNaN(c)||(b!=this.end&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.start&&b-a>c&&(b=a+c,this.updateScrollbar=
			!0));if(a!=this.start||b!=this.end){var d=this.chartData.length-1;isNaN(a)&&(a=0,isNaN(c)||(a=d-c));isNaN(b)&&(b=d);b<a&&(b=a);b>d&&(b=d);a>d&&(a=d-1);0>a&&(a=0);this.start=a;this.end=b;this.categoryAxis.zoom(a,b);this.zoomAxesAndGraphs();this.zoomScrollbar();0!==a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchIndexZoomEvent()}},updateGraphs:function(){AmCharts.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var c=
			a[b];c.columnWidthReal=this.columnWidth;c.categoryAxis=this.categoryAxis}},updateColumnsDepth:function(){var a,b=this.graphs,c;AmCharts.remove(this.columnsSet);this.columnsArray=[];for(a=0;a<b.length;a++){c=b[a];var d=c.columnsArray;if(d){var e;for(e=0;e<d.length;e++)this.columnsArray.push(d[e])}}this.columnsArray.sort(this.compareDepth);if(0<this.columnsArray.length){b=this.container.set();this.columnSet.push(b);for(a=0;a<this.columnsArray.length;a++)b.push(this.columnsArray[a].column.set);c&&b.translate(c.x,
			c.y);this.columnsSet=b}},compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;a&&this.updateScrollbar&&(b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.chart=this;c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=
			this.valueAxes,b;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);this.zoomTrendLines();(b=this.chartCursor)&&b.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){var a=0,b=this.valueAxes.length,c=this.graphs.length,d,e,g=!1,k,m;for(m=0;m<b;m++){e=this.valueAxes[m];var l=e.stackType;if("100%"==l||"regular"==l)for(g=!1,k=0;k<c;k++)d=this.graphs[k],d.hidden||d.valueAxis!=e||"column"!=d.type||(!g&&d.stackable&&
		(a++,g=!0),!d.stackable&&d.clustered&&a++,d.columnIndex=a-1,d.clustered||(d.columnIndex=0));if("none"==l||"3d"==l)for(k=0;k<c;k++)d=this.graphs[k],!d.hidden&&d.valueAxis==e&&"column"==d.type&&d.clustered&&(d.columnIndex=a,a++);if("3d"==l){for(m=0;m<c;m++)d=this.graphs[m],d.depthCount=a;a=1}}return a},parseData:function(){AmCharts.AmSerialChart.base.parseData.call(this);this.parseSerialData()},getCategoryIndexByValue:function(a){var b=this.chartData,c,d;for(d=0;d<b.length;d++)b[d].category==a&&(c=
			d);return c},handleCursorChange:function(a){this.updateLegendValues(a.index)},handleCursorZoom:function(a){this.updateScrollbar=!0;this.zoom(a.start,a.end)},handleScrollbarZoom:function(a){this.updateScrollbar=!1;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;
			this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,c=AmCharts.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[c];a.startValue=AmCharts.formatDate(a.startDate,b);a.endValue=AmCharts.formatDate(a.endDate,b);a.chart=this;a.target=this;this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;this.endIndex=
			this.end;var a=this.chartData;if(AmCharts.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b.type,b)}}},updateLegendValues:function(a){var b=
			this.graphs,c;for(c=0;c<b.length;c++){var d=b[c];isNaN(a)?d.currentDataItem=void 0:d.currentDataItem=this.chartData[a].axes[d.valueAxis.id].graphs[d.id]}this.legend&&this.legend.updateValues()},getClosestIndex:function(a,b,c,d,e,g){0>e&&(e=0);g>a.length-1&&(g=a.length-1);var k=e+Math.round((g-e)/2),m=a[k][b];if(1>=g-e){if(d)return e;d=a[g][b];return Math.abs(a[e][b]-c)<Math.abs(d-c)?e:g}return c==m?k:c<m?this.getClosestIndex(a,b,c,d,e,k):this.getClosestIndex(a,b,c,d,k,g)},zoomToIndexes:function(a,
																																																																																																																																b){this.updateScrollbar=!0;var c=this.chartData;if(c){var d=c.length;0<d&&(0>a&&(a=0),b>d-1&&(b=d-1),d=this.categoryAxis,d.parseDates&&!d.equalSpacing?this.zoom(c[a].time,this.getEndTime(c[b].time)):this.zoom(a,b))}},zoomToDates:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(this.categoryAxis.equalSpacing){var d=this.getClosestIndex(c,"time",a.getTime(),!0,0,c.length),c=this.getClosestIndex(c,"time",b.getTime(),!1,0,c.length);this.zoom(d,c)}else this.zoom(a.getTime(),b.getTime())},
			zoomToCategoryValues:function(a,b){this.updateScrollbar=!0;this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatPeriodString:function(a,b){if(b){var c=["value","open","low","high","close"],d="value open low high close average sum count".split(" "),e=b.valueAxis,g=this.chartData,k=b.numberFormatter;k||(k=this.numberFormatter);for(var m=0;m<c.length;m++){for(var l=c[m],h=0,f=0,n,u,p,s,y,w=0,r=0,q,t,v,z,B,A=this.start;A<=this.end;A++){var x=g[A];if(x&&(x=x.axes[e.id].graphs[b.id])){if(x.values){var C=
				x.values[l];if(!isNaN(C)){isNaN(n)&&(n=C);u=C;if(isNaN(p)||p>C)p=C;if(isNaN(s)||s<C)s=C;h+=C;f++;y=h/f}}if(x.percents&&(x=x.percents[l],!isNaN(x))){isNaN(q)&&(q=x);t=x;if(isNaN(v)||v>x)v=x;if(isNaN(z)||z<x)z=x;w+=x;r++;B=w/r}}}w={open:q,close:t,high:z,low:v,average:B,sum:w,count:r};a=AmCharts.formatValue(a,{open:n,close:u,high:s,low:p,average:y,sum:h,count:f},d,k,l+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,w,d,this.percentFormatter,"percents\\."+
				l+"\\.")}}return a},formatString:function(a,b){var c=b.graph;if(-1!=a.indexOf("[[category]]")){var d=b.serialDataItem.category;if(this.categoryAxis.parseDates){var e=this.balloonDateFormat,g=this.chartCursor;g&&(e=g.categoryBalloonDateFormat);-1!=a.indexOf("[[category]]")&&(e=AmCharts.formatDate(d,e),-1!=e.indexOf("fff")&&(e=AmCharts.formatMilliseconds(e,d)),d=e)}a=a.replace(/\[\[category\]\]/g,String(d))}c=c.numberFormatter;c||(c=this.numberFormatter);d=b.graph.valueAxis;(e=d.duration)&&!isNaN(b.values.value)&&
			(d=AmCharts.formatDuration(b.values.value,e,"",d.durationUnits,d.maxInterval,c),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),d));d="value open low high close total".split(" ");e=this.percentFormatter;a=AmCharts.formatValue(a,b.percents,d,e,"percents\\.");a=AmCharts.formatValue(a,b.values,d,c,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b.values,["percents"],e);-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,b.dataContext));return a=AmCharts.AmSerialChart.base.formatString.call(this,
				a,b)},addChartScrollbar:function(a){AmCharts.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=a.scrollbarHeight);this.chartScrollbar=a},removeChartScrollbar:function(){AmCharts.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},handleReleaseOutside:function(a){AmCharts.AmSerialChart.base.handleReleaseOutside.call(this,a);AmCharts.callMethod("handleReleaseOutside",
				[this.chartScrollbar])}});AmCharts.Cuboid=AmCharts.Class({construct:function(a,b,c,d,e,g,k,m,l,h,f,n,u,p,s){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=e;this.colors=g;this.alpha=k;this.bwidth=m;this.bcolor=l;this.balpha=h;this.colors=g;this.dashLength=p;this.pattern=s;u?0>b&&0===f&&(f=180):0>c&&270==f&&(f=90);this.gradientRotation=f;0===d&&0===e&&(this.cornerRadius=n);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,c=this.w,d=this.h,e=this.dx,g=
			this.dy,k=this.colors,m=this.alpha,l=this.bwidth,h=this.bcolor,f=this.balpha,n=this.gradientRotation,u=this.cornerRadius,p=this.dashLength,s=this.pattern,y=k,w=k;"object"==typeof k&&(y=k[0],w=k[k.length-1]);var r,q,t,v,z,B,A,x,C;if(0<e||0<g)A=w,w=AmCharts.adjustLuminosity(y,-0.2),w=AmCharts.adjustLuminosity(y,-0.2),r=AmCharts.polygon(b,[0,e,c+e,c,0],[0,g,g,0,0],w,m,1,h,0,n),0<f&&(C=AmCharts.line(b,[0,e,c+e],[0,g,g],h,f,l,p)),q=AmCharts.polygon(b,[0,0,c,c,0],[0,d,d,0,0],w,m,1,h,0,n),q.translate(e,
			g),0<f&&(t=AmCharts.line(b,[e,e],[g,g+d],h,1,l,p)),v=AmCharts.polygon(b,[0,0,e,e,0],[0,d,d+g,g,0],w,m,1,h,0,n),z=AmCharts.polygon(b,[c,c,c+e,c+e,c],[0,d,d+g,g,0],w,m,1,h,0,n),0<f&&(B=AmCharts.line(b,[c,c+e,c+e,c],[0,g,d+g,d],h,f,l,p)),w=AmCharts.adjustLuminosity(A,0.2),A=AmCharts.polygon(b,[0,e,c+e,c,0],[d,d+g,d+g,d,d],w,m,1,h,0,n),0<f&&(x=AmCharts.line(b,[0,e,c+e],[d,d+g,d+g],h,f,l,p));1>Math.abs(d)&&(d=0);1>Math.abs(c)&&(c=0);b=0===d?AmCharts.line(b,[0,c],[0,0],h,f,l,p):0===c?AmCharts.line(b,[0,
			0],[0,d],h,f,l,p):0<u?AmCharts.rect(b,c,d,k,m,l,h,f,u,n,p):AmCharts.polygon(b,[0,0,c,c,0],[0,d,d,0,0],k,m,l,h,f,n,!1,p);d=0>d?[r,C,q,t,v,z,B,A,x,b]:[A,x,q,t,v,z,r,C,B,b];for(r=0;r<d.length;r++)(q=d[r])&&a.push(q);s&&b.pattern(s)},width:function(a){this.w=a;this.draw()},height:function(a){this.h=a;this.draw()},animateHeight:function(a,b){var c=this;c.easing=b;c.totalFrames=1E3*a/AmCharts.updateRate;c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},AmCharts.updateRate)},updateHeight:function(){var a=
			this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),setTimeout(function(){a.updateHeight.call(a)},AmCharts.updateRate))},animateWidth:function(a,b){var c=this;c.easing=b;c.totalFrames=1E3*a/AmCharts.updateRate;c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},AmCharts.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),setTimeout(function(){a.updateWidth.call(a)},
			AmCharts.updateRate))}});AmCharts.CategoryAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(){AmCharts.CategoryAxis.base.construct.call(this);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.firstDayOfWeek=1;this.gridPosition="middle";this.markPeriodChange=this.boldPeriodBeginning=!0;this.safeDistance=30;this.centerLabelOnFullPeriod=!0;this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",
			count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},
			{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={};this.nextPeriod.fff="ss";this.nextPeriod.ss="mm";this.nextPeriod.mm="hh";this.nextPeriod.hh="DD";this.nextPeriod.DD="MM";this.nextPeriod.MM="YYYY"},draw:function(){AmCharts.CategoryAxis.base.draw.call(this);
			this.generateDFObject();var a=this.chart.chartData;this.data=a;if(AmCharts.ifArray(a)){var b,c=this.chart,d=this.start,e=this.labelFrequency,g=0;b=this.end-d+1;var k=this.gridCount,m=this.showFirstLabel,l=this.showLastLabel,h,f="",n=AmCharts.extractPeriod(this.minPeriod);h=AmCharts.getPeriodDuration(n.period,n.count);var u,p,s,y,w;u=this.rotate;var r=this.firstDayOfWeek,q=this.boldPeriodBeginning,a=AmCharts.resetDateToMin(new Date(a[a.length-1].time+1.05*h),this.minPeriod,1,r).getTime(),t;this.endTime>
			a&&(this.endTime=a);t=this.minorGridEnabled;var v,a=this.gridAlpha,z;if(this.parseDates&&!this.equalSpacing){this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);e=d.period;u=d.count;p=AmCharts.getPeriodDuration(e,u);p<h&&(e=n.period,u=n.count,p=h);s=e;"WW"==s&&(s="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var k=Math.ceil(this.timeDifference/p)+5,B=f=AmCharts.resetDateToMin(new Date(this.startTime-p),e,u,r).getTime();s==e&&1==u&&this.centerLabelOnFullPeriod&&(y=
				p*this.stepWidth);this.cellWidth=h*this.stepWidth;b=Math.round(f/p);d=-1;b/2==Math.round(b/2)&&(d=-2,f-=p);var A=c.firstTime,x=0;t&&1<u&&(v=this.chooseMinorFrequency(u),z=AmCharts.getPeriodDuration(e,v));if(0<this.gridCount)for(b=d;b<=k;b++){n=A+p*(b+Math.floor((B-A)/p))-x;n=AmCharts.resetDateToMin(new Date(n),e,u,r).getTime();"MM"==e&&(t=(n-f)/p,1.5<=(n-f)/p&&(n-=(t-1)*p,x+=p));h=(n-this.startTime)*this.stepWidth;w=!1;this.nextPeriod[s]&&(w=this.checkPeriodChange(this.nextPeriod[s],1,n,f));t=!1;
				w&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[s]],t=!0):f=this.dateFormatsObject[s];q||(t=!1);f=AmCharts.formatDate(new Date(n),f);if(b==d&&!m||b==k&&!l)f=" ";this.labelFunction&&(f=this.labelFunction(f,new Date(n),this));f=new this.axisItemRenderer(this,h,f,!1,y,0,!1,t);this.pushAxisItem(f);f=n;if(!isNaN(v))for(h=1;h<u;h+=v)this.gridAlpha=this.minorGridAlpha,t=n+z*h,t=AmCharts.resetDateToMin(new Date(t),e,v,r).getTime(),t=new this.axisItemRenderer(this,(t-this.startTime)*this.stepWidth),
					this.pushAxisItem(t);this.gridAlpha=a}}else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(b),b<k&&(k=b),g+=this.start,this.stepWidth=this.getStepWidth(b),0<k)for(q=Math.floor(b/k),v=this.chooseMinorFrequency(q),h=g,h/2==Math.round(h/2)&&h--,0>h&&(h=0),k=0,b=h;b<=this.end+2;b++){r=!1;0<=b&&b<this.data.length?(s=this.data[b],f=s.category,r=s.forceShow):f="";if(t&&!isNaN(v))if(b/v==Math.round(b/v)||r)b/q==Math.round(b/q)||r||(this.gridAlpha=this.minorGridAlpha,f=void 0);else continue;else if(b/
				q!=Math.round(b/q)&&!r)continue;h=this.getCoordinate(b-g);r=0;"start"==this.gridPosition&&(h-=this.cellWidth/2,r=this.cellWidth/2);if(b==d&&!m||b==this.end&&!l)f=void 0;Math.round(k/e)!=k/e&&(f=void 0);k++;B=this.cellWidth;u&&(B=NaN);this.labelFunction&&s&&(f=this.labelFunction(f,s,this));f=AmCharts.fixNewLines(f);f=new this.axisItemRenderer(this,h,f,!0,B,r,void 0,!1,r);this.pushAxisItem(f);this.gridAlpha=a}}else if(this.parseDates&&this.equalSpacing){g=this.start;this.startTime=this.data[this.start].time;
				this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);e=d.period;u=d.count;p=AmCharts.getPeriodDuration(e,u);p<h&&(e=n.period,u=n.count,p=h);s=e;"WW"==s&&(s="DD");this.stepWidth=this.getStepWidth(b);k=Math.ceil(this.timeDifference/p)+1;f=AmCharts.resetDateToMin(new Date(this.startTime-p),e,u,r).getTime();this.cellWidth=this.getStepWidth(b);b=Math.round(f/p);d=-1;b/2==Math.round(b/2)&&(d=-2,f-=p);h=this.start;h/2==Math.round(h/2)&&h--;0>h&&(h=
					0);y=this.end+2;y>=this.data.length&&(y=this.data.length);z=!1;z=!m;this.previousPos=-1E3;20<this.labelRotation&&(this.safeDistance=5);p=h;if(this.data[h].time!=AmCharts.resetDateToMin(new Date(this.data[h].time),e,u,r).getTime())for(r=0,A=f,b=h;b<y;b++)n=this.data[b].time,this.checkPeriodChange(e,u,n,A)&&(r++,2<=r&&(p=b,b=y),A=n);t&&1<u&&(v=this.chooseMinorFrequency(u),AmCharts.getPeriodDuration(e,v));for(b=h;b<y;b++)if(n=this.data[b].time,this.checkPeriodChange(e,u,n,f)&&b>=p){h=this.getCoordinate(b-
					this.start);w=!1;this.nextPeriod[s]&&(w=this.checkPeriodChange(this.nextPeriod[s],1,n,f));t=!1;w&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[s]],t=!0):f=this.dateFormatsObject[s];f=AmCharts.formatDate(new Date(n),f);if(b==d&&!m||b==k&&!l)f=" ";z?z=!1:(q||(t=!1),h-this.previousPos>this.safeDistance*Math.cos(this.labelRotation*Math.PI/180)&&(this.labelFunction&&(f=this.labelFunction(f,new Date(n),this)),f=new this.axisItemRenderer(this,h,f,void 0,void 0,void 0,void 0,t),r=f.graphics(),
					this.pushAxisItem(f),r=r.getBBox().width,AmCharts.isModern||(r-=h),this.previousPos=h+r));f=n}else isNaN(v)||(this.checkPeriodChange(e,v,n,B)&&(this.gridAlpha=this.minorGridAlpha,h=this.getCoordinate(b-this.start),t=new this.axisItemRenderer(this,h),this.pushAxisItem(t),B=n),this.gridAlpha=a)}for(b=0;b<this.data.length;b++)if(m=this.data[b])l=this.parseDates&&!this.equalSpacing?Math.round((m.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(b-g),m.x[this.id]=l;m=this.guides.length;
				for(b=0;b<m;b++)l=this.guides[b],q=q=q=a=d=NaN,v=l.above,l.toCategory&&(q=c.getCategoryIndexByValue(l.toCategory),isNaN(q)||(d=this.getCoordinate(q-g),f=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,l),this.pushAxisItem(f,v))),l.category&&(q=c.getCategoryIndexByValue(l.category),isNaN(q)||(a=this.getCoordinate(q-g),q=(d-a)/2,f=new this.axisItemRenderer(this,a,l.label,!0,NaN,q,l),this.pushAxisItem(f,v))),l.toDate&&(this.equalSpacing?(q=c.getClosestIndex(this.data,"time",l.toDate.getTime(),!1,0,this.data.length-
					1),isNaN(q)||(d=this.getCoordinate(q-g))):d=(l.toDate.getTime()-this.startTime)*this.stepWidth,f=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,l),this.pushAxisItem(f,v)),l.date&&(this.equalSpacing?(q=c.getClosestIndex(this.data,"time",l.date.getTime(),!1,0,this.data.length-1),isNaN(q)||(a=this.getCoordinate(q-g))):a=(l.date.getTime()-this.startTime)*this.stepWidth,q=(d-a)/2,f="H"==this.orientation?new this.axisItemRenderer(this,a,l.label,!1,2*q,NaN,l):new this.axisItemRenderer(this,a,l.label,!1,
					NaN,q,l),this.pushAxisItem(f,v)),d=new this.guideFillRenderer(this,a,d,l),a=d.graphics(),this.pushAxisItem(d,v),l.graphics=a,a.index=b,l.balloonText&&this.addEventListeners(a,l)}this.axisCreated=!0;c=this.x;g=this.y;this.set.translate(c,g);this.labelsSet.translate(c,g);this.positionTitle();(c=this.axisLine.set)&&c.toFront()},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/b==Math.round(a/b))return a/b},choosePeriod:function(a){var b=AmCharts.getPeriodDuration(this.periods[a].period,this.periods[a].count),
			c=Math.ceil(this.timeDifference/b),d=this.periods;return this.timeDifference<b&&0<a?d[a-1]:c<=this.gridCount?d[a]:a+1<d.length?this.choosePeriod(a+1):d[a]},getStepWidth:function(a){var b;this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)},timeZoom:function(a,b){this.startTime=a;this.endTime=b},minDuration:function(){var a=AmCharts.extractPeriod(this.minPeriod);
			return AmCharts.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,c,d){c=new Date(c);var e=new Date(d),g=this.firstDayOfWeek;d=b;"DD"==a&&(b=1);c=AmCharts.resetDateToMin(c,a,b,g).getTime();b=AmCharts.resetDateToMin(e,a,b,g).getTime();return"DD"==a&&c-b<=AmCharts.getPeriodDuration(a,d)?!1:c!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}},xToIndex:function(a){var b=
			this.data,c=this.chart,d=c.rotate,e=this.stepWidth;this.parseDates&&!this.equalSpacing?(a=this.startTime+Math.round(a/e)-this.minDuration()/2,c=c.getClosestIndex(b,"time",a,!1,this.start,this.end+1)):(this.startOnAxis||(a-=e/2),c=this.start+Math.round(a/e));var c=AmCharts.fitToBounds(c,0,b.length-1),g;b[c]&&(g=b[c].x[this.id]);d?g>this.height+1&&c--:g>this.width+1&&c--;0>g&&c++;return c=AmCharts.fitToBounds(c,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&!this.equalSpacing?(a.getTime()-
		this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-this.start)):NaN},categoryToCoordinate:function(a){return this.chart?(a=this.chart.getCategoryIndexByValue(a),this.getCoordinate(a-this.start)):NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)}});

		return AmCharts;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../vendor/avalon/avalon.js" />
	/**
	 * serialmchart是一个图表多柱状图组件
	 * author: zxl
	 * 使用说明：
	 * 例子：<wk:serialmchart config="serialmchartOpts"></wk:serialmchart>
	 */
	// define(['avalon',
	//     'serial'
	// ], function (avalon) {
	// 
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(44)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(AmCharts) {
	    var template;
	    var chart;

	    var _interface = function() {};

	    var serialmchart = {
	        chartId: '', //图表Id
	        title: '', //图表标题
	        yTitle: '', //Y轴标题
	        data: [], //展示数据
	        isScroll: false, //是否展现滚动条
	        isAxis: false, //是否xy轴对调展示(false:对调，true:正常显示)
	        hight: '400', //图表高度

	        // 事件
	        onInit: _interface,
	        loadData: _interface,
	        init: _interface,

	        $init: init,

	        $ready: function(vm, elem) {
	            vm.initChart(vm, elem);
	        },

	        $dispose: function(vm, el) {
	            el.innerHTML = el.textContent = "";
	        }
	    };

	    /**
	     * 组件初始化
	     * @param  vm   当前组件的view model
	     * @param  elem 当前组件对应的dom
	     */
	    function init(vm, elem) {
	        var html = '<div id="$ID$" class="chart" style="width: 100%; height: $HIGHT$px;"></div>';
	        html = html.replace('$ID$', vm.chartId).replace('$HIGHT$', vm.hight);

	        //将模板的内容插入到当前元素下面
	        template = html;
	        vm.$$template = function() {
	            return template;
	        };

	        vm.initChart = function(vm, elem) {
	            vm.loadData.call().then(function sucess(result) {
	                if (result != null && result.length > 0) {
	                    chart = new AmCharts.AmSerialChart();
	                    chart.dataProvider = vm.data;
	                    chart.pathToImages = "../plugin/amcharts_3.1.1/amcharts/images/";
	                    chart.titles = [{
	                            "text": vm.title,
	                            "size": 15
	                        }],
	                        // chart.theme = "light";
	                        chart.startDuration = 2;
	                    // chart.fontFamily = 'Open Sans',
	                    //  chart.color = "#888";
	                    chart.columnWidth = 0.5; //设置柱的宽度
	                    chart.depth3D = 25;
	                    chart.angle = 15;
	                    chart.categoryField = "label";
	                    if (!vm.isAxis) {
	                        chart.rotate = true; //设置xy轴对调
	                    }

	                    // chartCursor
	                    var chartCursor = new AmCharts.ChartCursor;
	                    chartCursor.categoryBalloonEnabled = false;
	                    chartCursor.cursorAlpha = 0;
	                    chartCursor.zoomable = false;

	                    //这是分类颜色注释
	                    var legend = new AmCharts.AmLegend();
	                    legend.borderAlpha = 0.1; //外边框
	                    legend.horizontalGap = 10; //横向距离
	                    legend.autoMargins = false;
	                    legend.marginLeft = 30;
	                    legend.marginRight = 30;
	                    chart.addLegend(legend);

	                    // category
	                    var categoryAxis = chart.categoryAxis;
	                    categoryAxis.gridPosition = "start";
	                    categoryAxis.axisAlpha = 0;
	                    categoryAxis.gridAlpha = 0.1;
	                    categoryAxis.labelRotation = 45; //设置X轴字体旋转

	                    // value
	                    var valueAxis = new AmCharts.ValueAxis();
	                    //valueAxis.stackType = "3d";  //3d:前后,不写:左右,100%:上下
	                    valueAxis.position = "left";
	                    valueAxis.axisAlpha = 0;
	                    valueAxis.gridAlpha = 0.1;
	                    valueAxis.title = vm.yTitle;
	                    chart.addValueAxis(valueAxis);

	                    var list = eval(result);
	                    chart.dataProvider = list;
	                    if (chart.dataProvider != null && chart.dataProvider.length > 0) {
	                        for (var i = 0; i < chart.dataProvider[0].count; i++) {
	                            var orgName = "OrgName" + (i + 1);
	                            var orgCount = "OrgCount" + (i + 1);
	                            var graph1 = new AmCharts.AmGraph();
	                            for (item in chart.dataProvider[0]) {
	                                if (item == orgName) {
	                                    graph1.title = chart.dataProvider[0][item];
	                                }
	                            }
	                            graph1.balloonText = "[[" + orgName + "]]: <b>[[" + orgCount + "]]</b>";
	                            // graph1.colorField = "#C72C95";
	                            //graph1.lineColor = "#C72C95";
	                            graph1.fillAlphas = 1;
	                            graph1.lineAlpha = 0;
	                            graph1.type = "column";
	                            graph1.topRadius = 1; //设置柱状体形状
	                            graph1.valueField = orgCount;
	                            graph1.labelText = "[[" + orgCount + "]]";
	                            chart.addGraph(graph1);
	                        }
	                    }

	                    //设置滚动条
	                    if (vm.isScroll) {
	                        var chartScrollbar = new AmCharts.ChartScrollbar();
	                        chartScrollbar.dragIcon = "dragIconRectBig";
	                        chart.addChartScrollbar(chartScrollbar);
	                    }

	                    chart.write(vm.chartId);

	                    //当数据改变时或者属性改变时, 想要重新绘图
	                    chart.validateNow();
	                    chart.validateData();

	                } else {
	                    elem.innerHTML = '<div ms-if="loading == false && data.length == 0" class="note note-info"><h4 class="block">暂无数据</h4><p>当前系统内还没有相应数据</p></div>';
	                }
	            }, function fail(res) {
	                elem.innerHTML = '<div ms-if="loading == false && data.length == 0" class="note note-info"><h4 class="block">暂无数据</h4><p>加载数据出错，请刷新再试</p></div>';
	                console.log(res);
	            });
	        };

	        vm.init = function() {
	            vm.initChart(vm, elem);
	        };

	        if (typeof vm.onInit === 'function') {
	            vm.onInit.call(elem, vm);
	        }
	    };

	    avalon.component("wk:serialmchart", serialmchart);

	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ]);