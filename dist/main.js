/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 974:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 81:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss
var style = __webpack_require__(974);
;// CONCATENATED MODULE: ./src/style.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(style/* default */.Z, options);




       /* harmony default export */ const src_style = (style/* default */.Z && style/* default.locals */.Z.locals ? style/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/components/accordion/_accordion.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Accordion = /*#__PURE__*/function () {
  function Accordion(selectors) {
    _classCallCheck(this, Accordion);
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(".".concat(selectors));
    this.init();
  }
  _createClass(Accordion, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.selectors.forEach(function (selector, index, arr) {
        _this.toggle(selector, index, arr);
      });
    }
  }, {
    key: "toggle",
    value: function toggle(selector, index, arr) {
      var _this2 = this;
      this.addUniqueID(selector, index);
      selector.querySelector('[role="tab"]').addEventListener("click", function (e) {
        _this2.changeAriaState(selector, index);
        var panel = selector.querySelector('[role="tabpanel"]');
        var panelHeight = panel.scrollHeight;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = "".concat(panelHeight, "px");
        }
      });
    }
  }, {
    key: "addUniqueID",
    value: function addUniqueID(selector, index) {
      var headerID = "".concat(this.selectorName, "-header-").concat(index);
      var panelID = "".concat(this.selectorName, "-panel-").concat(index);
      var header = selector.querySelector('[role="tab"]');
      var panel = selector.querySelector('[role="tabpanel"]');
      // id を設定
      header.setAttribute("id", headerID);
      panel.setAttribute("id", panelID);
      // aria-controls aria-labelledby 属性を設定
      header.setAttribute("aria-controls", panelID);
      panel.setAttribute("aria-labelledby", headerID);
      return {
        header: header,
        panel: panel
      };
    }
  }, {
    key: "changeAriaState",
    value: function changeAriaState(selector, index) {
      var tabElement = selector.querySelector('[role="tab"]');
      var tabPanelElement = selector.querySelector('[role="tabpanel"]');
      // aria-expanded と aria-hidden の値を反転
      tabElement.setAttribute("aria-expanded", tabElement.getAttribute("aria-expanded") === "true" ? "false" : "true");
      tabPanelElement.setAttribute("aria-hidden", tabPanelElement.getAttribute("aria-hidden") === "true" ? "false" : "true");
    }
  }]);
  return Accordion;
}();

;// CONCATENATED MODULE: ./src/components/tab/_tab.js
function _tab_typeof(obj) { "@babel/helpers - typeof"; return _tab_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _tab_typeof(obj); }
function _tab_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _tab_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _tab_toPropertyKey(descriptor.key), descriptor); } }
function _tab_createClass(Constructor, protoProps, staticProps) { if (protoProps) _tab_defineProperties(Constructor.prototype, protoProps); if (staticProps) _tab_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _tab_toPropertyKey(arg) { var key = _tab_toPrimitive(arg, "string"); return _tab_typeof(key) === "symbol" ? key : String(key); }
function _tab_toPrimitive(input, hint) { if (_tab_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_tab_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Tab = /*#__PURE__*/function () {
  function Tab(selectors) {
    _tab_classCallCheck(this, Tab);
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(".".concat(selectors));
    this.init();
  }
  _tab_createClass(Tab, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.selectors.forEach(function (selector, index, arr) {
        var selectorsIndex = Array.prototype.indexOf.call(arr, selector);
        _this.tabChange(selector, index, arr, selectorsIndex);
      });
    }
  }, {
    key: "tabChange",
    value: function tabChange(selector, index, arr, selectorsIndex) {
      var _this2 = this;
      this.addUniqueID(selector, index, arr, selectorsIndex);
      var buttons = selector.querySelectorAll('[role="tab"]');
      buttons.forEach(function (button, index) {
        var buttonIndex = Array.prototype.indexOf.call(buttons, button);
        var panels = selector.querySelectorAll('[role="tabpanel"]');
        button.addEventListener("click", function (e) {
          _this2.changeAriaState(button, buttonIndex, buttons, panels);
        });
      });
    }
  }, {
    key: "addUniqueID",
    value: function addUniqueID(selector, index, arr, selectorsIndex) {
      var _this3 = this;
      selector.querySelectorAll('[role="tab"]').forEach(function (button, index) {
        var panel = selector.querySelectorAll('[role="tabpanel"]')[index];
        var buttonID = "".concat(_this3.selectorName, "-button-").concat(selectorsIndex, "-").concat(index);
        var panelID = "".concat(_this3.selectorName, "-panel-").concat(selectorsIndex, "-").concat(index);
        button.setAttribute("id", buttonID);
        panel.setAttribute("id", panelID);
        button.setAttribute("aria-controls", panelID);
        panel.setAttribute("aria-labelledby", buttonID);
        return {
          button: button,
          panel: panel
        };
      });
    }
  }, {
    key: "changeAriaState",
    value: function changeAriaState(button, buttonIndex, buttons, panels) {
      // クリックされたたボタンのaria-selectedとaria-hiddenの値を変更
      // クリックされたボタン以外のボタンのaria-selectedとaria-hiddenの値を変更
      buttons.forEach(function (button, index) {
        if (index === buttonIndex) {
          button.setAttribute("aria-selected", "true");
          button.setAttribute("tabindex", "-1");
          panels[index].setAttribute("aria-hidden", "false");
        } else {
          button.setAttribute("tabindex", "0");
          button.setAttribute("aria-selected", "false");
          panels[index].setAttribute("aria-hidden", "true");
        }
      });
    }
  }]);
  return Tab;
}();

;// CONCATENATED MODULE: ./src/components/modal/_modal.js
function _modal_typeof(obj) { "@babel/helpers - typeof"; return _modal_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _modal_typeof(obj); }
function _modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _modal_toPropertyKey(descriptor.key), descriptor); } }
function _modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) _modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) _modal_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _modal_toPropertyKey(arg) { var key = _modal_toPrimitive(arg, "string"); return _modal_typeof(key) === "symbol" ? key : String(key); }
function _modal_toPrimitive(input, hint) { if (_modal_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_modal_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Modal = /*#__PURE__*/function () {
  function Modal(selectors) {
    _modal_classCallCheck(this, Modal);
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(".".concat(selectors));
    this.init();
  }
  _modal_createClass(Modal, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.selectors.forEach(function (selector, index, arr) {
        _this.addUniqueID(selector, index);
        _this.open(selector);
        _this.close(selector);
      });
    }
  }, {
    key: "open",
    value: function open(selector) {
      var _this2 = this;
      var button = selector.querySelector('[data-modal="button-open"]');
      button.addEventListener("click", function (e) {
        // changeAriaStateでariaの値を変更
        _this2.changeAriaState(selector, true);
        var focusableElements = selector.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
        selector.addEventListener("keydown", function (e) {
          return _this2.trapTabKey(selector, e);
        });
      });
    }
  }, {
    key: "close",
    value: function close(selector) {
      var _this3 = this;
      var button = selector.querySelector('[data-modal="button-close"]');
      button.addEventListener("click", function (e) {
        // changeAriaStateでariaの値を変更
        _this3.changeAriaState(selector, false);
        selector.removeEventListener("keydown", function (e) {
          return _this3.trapTabKey(selector, e);
        });
      });
    }
  }, {
    key: "addUniqueID",
    value: function addUniqueID(selector, index) {
      var dialogID = "".concat(this.selectorName, "-dialog-").concat(index);
      var titleID = "".concat(this.selectorName, "-title-").concat(index);
      var daialog = selector.querySelector('[role="dialog"]');
      var title = selector.querySelector('[data-modal="title"]');
      // id を設定
      daialog.setAttribute("id", dialogID);
      title.setAttribute("id", titleID);
      // aria-labelledby 属性を設定
      daialog.setAttribute("aria-labelledby", titleID);
      return {
        title: title,
        daialog: daialog
      };
    }
  }, {
    key: "changeAriaState",
    value: function changeAriaState(selector) {
      // dialogのaria-modalを変更とhiddenを変更
      var dialogElement = selector.querySelector('[role="dialog"]');
      dialogElement.setAttribute("aria-modal", dialogElement.getAttribute("aria-modal") === "true" ? "false" : "true");
      // hiddenがあれば削除、なければ追加
      dialogElement.hasAttribute("hidden") ? dialogElement.removeAttribute("hidden") : dialogElement.setAttribute("hidden", "");
    }
  }, {
    key: "trapTabKey",
    value: function trapTabKey(selector, e) {
      var focusableElements = selector.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      var firstFocusableElement = focusableElements[0];
      var lastFocusableElement = focusableElements[focusableElements.length - 1];
      if (e.keyCode === 9) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
      if (e.keyCode === 27) {
        this.close(selector);
      }
    }
  }]);
  return Modal;
}();

;// CONCATENATED MODULE: ./src/components/tooltip/_tooltip.js
function _tooltip_typeof(obj) { "@babel/helpers - typeof"; return _tooltip_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _tooltip_typeof(obj); }
function _tooltip_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _tooltip_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _tooltip_toPropertyKey(descriptor.key), descriptor); } }
function _tooltip_createClass(Constructor, protoProps, staticProps) { if (protoProps) _tooltip_defineProperties(Constructor.prototype, protoProps); if (staticProps) _tooltip_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _tooltip_toPropertyKey(arg) { var key = _tooltip_toPrimitive(arg, "string"); return _tooltip_typeof(key) === "symbol" ? key : String(key); }
function _tooltip_toPrimitive(input, hint) { if (_tooltip_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_tooltip_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Tooltip = /*#__PURE__*/function () {
  function Tooltip(selectors) {
    _tooltip_classCallCheck(this, Tooltip);
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(".".concat(selectors, "[data-tooltip-text]"));
    this.init();
  }
  _tooltip_createClass(Tooltip, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.selectors.forEach(function (selector, index) {
        var tooltipId = "".concat(_this.selectorName, "-content-").concat(index);
        _this.attachTooltipEvents(selector, tooltipId);
      });
    }
  }, {
    key: "attachTooltipEvents",
    value: function attachTooltipEvents(elem, tooltipId) {
      var _this2 = this;
      elem.setAttribute("aria-describedby", tooltipId);
      elem.addEventListener("mouseenter", function (event) {
        _this2.createTooltip(elem, tooltipId);
      });
      elem.addEventListener("mouseleave", function (event) {
        _this2.removeTooltip(elem, tooltipId);
      });

      // 'focus'と'blur'イベントを追加
      elem.addEventListener("focus", function (event) {
        _this2.createTooltip(elem, tooltipId);
      });
      elem.addEventListener("blur", function (event) {
        _this2.removeTooltip(elem, tooltipId);
      });
    }
  }, {
    key: "createTooltip",
    value: function createTooltip(elem, tooltipId) {
      var tooltipText = elem.dataset.tooltipText;
      var tooltipDiv = document.createElement("div");
      tooltipDiv.style.position = "absolute";
      tooltipDiv.setAttribute("role", "tooltip");
      tooltipDiv.setAttribute("id", tooltipId);
      tooltipDiv.innerText = tooltipText;
      elem.appendChild(tooltipDiv);
    }
  }, {
    key: "removeTooltip",
    value: function removeTooltip(elem, tooltipId) {
      var tooltip = elem.querySelector("#".concat(tooltipId));
      if (tooltip) {
        elem.removeChild(tooltip);
      }
    }
  }]);
  return Tooltip;
}();

;// CONCATENATED MODULE: ./src/index.js





new Accordion("js-accordion");
new Accordion("js-uniqueAccordion");
new Tab("js-tab");
new Tab("js-uniqueTab");
new Modal("js-modal");
new Modal("js-uniqueModal");
new Tooltip("js-tooltip");
new Tooltip("js-uniqueTooltip");
})();

/******/ })()
;