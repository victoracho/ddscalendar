(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue3-autocomplete"] = factory(require("vue"));
	else
		root["vue3-autocomplete"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "181e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3dd2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Autocomplete_vue_vue_type_style_index_0_id_1b14df99_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("181e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Autocomplete_vue_vue_type_style_index_0_id_1b14df99_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Autocomplete_vue_vue_type_style_index_0_id_1b14df99_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6b0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    for (const [key, val] of props) {
        sfc[key] = val;
    }
    return sfc;
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader??ref--12-2!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/Autocomplete.vue?vue&type=template&id=1b14df99&scoped=true&ts=true

const _withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-1b14df99"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const _hoisted_1 = { class: "vue3-autocomplete-container" };
const _hoisted_2 = ["placeholder"];
const _hoisted_3 = ["onClick", "innerHTML"];
const _hoisted_4 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, [
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["mergeProps"])({
            ref: "autocompleteRef",
            type: "text",
            onInput: _cache[0] || (_cache[0] =
                //@ts-ignore
                (...args) => ($setup.handleInput && $setup.handleInput(...args)))
        }, _ctx.$attrs, {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ($setup.searchText = $event)),
            placeholder: $props.placeholder,
            class: $setup.getInputClass,
            onFocus: _cache[2] || (_cache[2] =
                //@ts-ignore
                (...args) => ($setup.displayResults && $setup.displayResults(...args))),
            onBlur: _cache[3] || (_cache[3] =
                //@ts-ignore
                (...args) => ($setup.hideResults && $setup.hideResults(...args)))
        }), null, 16, _hoisted_2), [
            [external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], $setup.searchText]
        ]),
        ($setup.shouldShowResults)
            ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
                key: 0,
                style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({ width: $setup.inputWidth + 'px' }),
                class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($setup.getResultsContainerClass)
            }, [
                ($props.useHtmlForResults)
                    ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], { key: 0 }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($setup.filteredResults, (item) => {
                        return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
                            key: item,
                            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($setup.getResultsItemClass),
                            onClick: ($event) => ($setup.clickItem(item)),
                            onMousedown: _cache[4] || (_cache[4] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(() => { }, ["prevent"])),
                            innerHTML: $props.displayItem(item)
                        }, null, 42, _hoisted_3));
                    }), 128))
                    : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
                (!$props.useHtmlForResults)
                    ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], { key: 1 }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($setup.filteredResults, (item) => {
                        return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
                            key: item,
                            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($setup.getResultsItemClass),
                            onClick: ($event) => ($setup.clickItem(item)),
                            onMousedown: _cache[5] || (_cache[5] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(() => { }, ["prevent"]))
                        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.displayItem(item)), 43, _hoisted_4));
                    }), 128))
                    : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
            ], 6))
            : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
    ]));
}

// CONCATENATED MODULE: ./src/Autocomplete.vue?vue&type=template&id=1b14df99&scoped=true&ts=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader??ref--12-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/Autocomplete.vue?vue&type=script&lang=ts

/* harmony default export */ var Autocompletevue_type_script_lang_ts = ({
    name: 'Autocomplete',
    inheritAttrs: false,
    props: {
        debounce: {
            type: Number,
            default: 0
        },
        inputClass: {
            type: Array,
            default: []
        },
        useHtmlForResults: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 10
        },
        placeholder: {
            type: String,
            default: ''
        },
        results: {
            type: Array,
            default: []
        },
        resultsContainerClass: {
            type: Array,
            default: []
        },
        resultsItemClass: {
            type: Array,
            default: []
        },
        displayItem: {
            type: Function,
            default: (item) => {
                // @ts-ignore
                return typeof item === 'string' ? item : item.name;
            }
        }
    },
    emits: [
        'input',
        'onSelect'
    ],
    setup(props, context) {
        const autocompleteRef = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])();
        let inputWidth = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(0), searchText = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(''), timeout, showResults = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(true);
        /**
         * Same as Vue2 'mounted' function, used to get refs correctly
         */
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
            inputWidth.value = autocompleteRef.value.offsetWidth - 2;
        });
        /**
         * Triggered on input changes with a dynamic debounce
         * @param { InputEvent } e
         */
        function handleInput(e) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                context.emit('input', e.target.value);
            }, props.debounce);
        }
        /**
         * Triggered on click on a result item
         */
        function clickItem(data) {
            context.emit('onSelect', data);
            showResults.value = false;
        }
        /**
         * Called on focus
         */
        function displayResults() {
            showResults.value = true;
        }
        /**
         * Called on blur
         */
        function hideResults() {
            showResults.value = false;
        }
        /**
         * Manually update the displayed text in the input
         * @param value
         */
        function setText(value) {
            searchText.value = value;
        }
        /**
         * Return class(es) for input element
         */
        const getInputClass = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
            return props.inputClass.length > 0 ? props.inputClass : ['vue3-input'];
        });
        /**
         * Return class(es) for results container element
         */
        const getResultsContainerClass = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
            return props.resultsContainerClass.length > 0 ?
                props.resultsContainerClass :
                ['vue3-results-container'];
        });
        /**
         * Return class(es) for results item elements
         */
        const getResultsItemClass = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
            return props.resultsItemClass.length > 0 ?
                props.resultsItemClass :
                ['vue3-results-item'];
        });
        /**
         * Show results depending on results length and showResults boolean
         */
        const shouldShowResults = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
            return showResults.value && (props.results.length > 0);
        });
        /**
         * Return results filtered with the 'max' props
         */
        const filteredResults = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
            return props.results.slice(0, props.max);
        });
        /**
         * Return data, making them reactive
         */
        return {
            searchText,
            showResults,
            autocompleteRef,
            inputWidth,
            displayResults,
            hideResults,
            handleInput,
            clickItem,
            setText,
            filteredResults,
            getInputClass,
            getResultsContainerClass,
            getResultsItemClass,
            shouldShowResults
        };
    }
});

// CONCATENATED MODULE: ./src/Autocomplete.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./src/Autocomplete.vue?vue&type=style&index=0&id=1b14df99&lang=scss&scoped=true
var Autocompletevue_type_style_index_0_id_1b14df99_lang_scss_scoped_true = __webpack_require__("3dd2");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/Autocomplete.vue







/* harmony default export */ var Autocomplete = (/*#__PURE__*/exportHelper_default()(Autocompletevue_type_script_lang_ts, [['render',render],['__scopeId',"data-v-1b14df99"]]));
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (Autocomplete);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue3-autocomplete.umd.js.map