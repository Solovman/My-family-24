/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var Requests = /*#__PURE__*/function () {
	  function Requests() {
	    babelHelpers.classCallCheck(this, Requests);
	  }
	  babelHelpers.createClass(Requests, null, [{
	    key: "getListTrees",
	    value: function getListTrees() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.search.getUserTrees').then(function (response) {
	          var trees = response.data.trees;
	          resolve(trees);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getUsersPersons",
	    value: function getUsersPersons(treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.search.getPersonsUsers', {
	          data: {
	            treeId: [treeId]
	          }
	        }).then(function (response) {
	          var infoUsersPersons = response.data.infoUsersPersons;
	          resolve(infoUsersPersons);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addMessages",
	    value: function addMessages(recipientId, message) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.chatRelatives.addMessages', {
	          data: {
	            recipientId: recipientId,
	            message: message,
	            isAdmin: 0
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "searchChatByRecipientId",
	    value: function searchChatByRecipientId(recipientId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.chatRelatives.searchChatByRecipientId', {
	          data: {
	            recipientId: recipientId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var _templateObject;
	var Form = /*#__PURE__*/function () {
	  function Form() {
	    babelHelpers.classCallCheck(this, Form);
	  }
	  babelHelpers.createClass(Form, null, [{
	    key: "render",
	    value: function render(id, name, surname) {
	      var popupId = "ModalPopup_" + new Date().getTime();
	      var modalPopup = BX.PopupWindowManager.create(popupId, null, {
	        autoHide: true,
	        offsetLeft: 0,
	        offsetTop: 0,
	        overlay: true,
	        draggable: {
	          restrict: true
	        },
	        closeByEsc: true,
	        closeIcon: {
	          right: "12px",
	          top: "10px"
	        },
	        content: "<div style=\"width:400px;height:400px; text-align: center;\"><span style=\"position:absolute;left:50%; top:50%\"><img src=\"/bitrix/templates/eshop_adapt_yellow/img/wait.gif\"/></span></div>",
	        events: {
	          onPopupShow: function onPopupShow() {
	            var _this = this;
	            this.setContent(main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div id=\"form-message\" class=\"message\">\n\t\t\t\t\t\t\t<form id=\"formSend\" class=\"message__form\">\n\t\t\t\t\t\t\t\t<label class=\"message__label\" for=\"message\">\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435: ", "</label>\n\t\t\t\t\t\t\t\t<input id=\"message\" placeholder=\"\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\" type=\"text\">\n\t\t\t\t\t\t\t\t<button id=\"send\" class=\"message__button\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])), BX.util.htmlspecialchars(name) + ' ' + BX.util.htmlspecialchars(surname)));
	            var formSend = BX('formSend');
	            BX.bind(formSend, 'submit', function (event) {
	              event.preventDefault();
	              var message = BX('message').value;
	              Requests.addMessages(Number(id), message).then(function (result) {
	                var notice = document.querySelector("[data-user-check=\"".concat(id, "\"]"));
	                notice.innerHTML = 'Сообщение отправлено';
	                _this.destroy();
	              });
	            });
	          },
	          onPopupClose: function onPopupClose() {
	            this.destroy();
	          }
	        }
	      });
	      modalPopup.show();
	    }
	  }]);
	  return Form;
	}();

	var _templateObject$1, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
	var Search = /*#__PURE__*/function () {
	  function Search() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Search);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Search: options.rootNodeId required');
	    }
	    if (main_core.Type.isStringFilled(options.rootSearchId)) {
	      this.rootSearchId = options.rootSearchId;
	    } else {
	      throw new Error('Search: options.rootSearch required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    this.rootSearch = document.getElementById(this.rootSearchId);
	    if (!this.rootNode) {
	      throw new Error("Search: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    if (!this.rootSearch) {
	      throw new Error("Search: element with id \"".concat(this.rootSearch, "\" not found"));
	    }
	    this.trees = [];
	    this.usersPersons = [];
	    this.loadTrees();
	  }
	  babelHelpers.createClass(Search, [{
	    key: "loadTrees",
	    value: function loadTrees() {
	      var _this = this;
	      Requests.getListTrees().then(function (list) {
	        _this.trees = list;
	        _this.renderSelect();
	        _this.setEvents();
	      });
	    }
	  }, {
	    key: "setEvents",
	    value: function setEvents() {
	      var _this2 = this;
	      var btnSearch = BX('search-relatives');
	      BX.bind(btnSearch, 'click', function (event) {
	        var treeId;
	        var selectBoxInput = document.querySelectorAll('.select-box__input-text');
	        selectBoxInput.forEach(function (input) {
	          var displayStyle = window.getComputedStyle(input).display;
	          if (displayStyle === 'block') {
	            treeId = parseInt(input.id.match(/\d+/));
	          }
	        });
	        var spinner = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div id=\"spinner\" class=\"search__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])));
	        BX.append(spinner, _this2.rootNode);
	        Requests.getUsersPersons(treeId).then(function (result) {
	          _this2.usersPersons = result;
	          _this2.renderListUser();
	        });
	      });
	    }
	  }, {
	    key: "renderSelect",
	    value: function renderSelect() {
	      var select = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"select-box\">\n\t\t\t<div class=\"select-container\">\n\t\t\t\t<div class=\"select-box__current\" tabindex=\"1\">\n\t\t\t\t\t", "\n\t\t\t\t\t<img class=\"select-box__icon\" src=\"http://cdn.onlinewebfonts.com/svg/img_295694.svg\" alt=\"Arrow Icon\" aria-hidden=\"true\"/>\n\t\t\t\t</div>\n\t\t\t\t<ul class=\"select-box__list\">\n\t\t\t\t\t", "\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<button id=\"search-relatives\" class=\"search__btn\">\u041F\u043E\u0438\u0441\u043A</button>\n\t\t</div>"])), this.trees.length !== 0 ? "\n\t\t\t\t\t\t".concat(this.trees.map(function (item) {
	        return "\n\t\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" id=\"".concat(item.id, "\" value=\"").concat(item.id, "\" name=\"trees\" checked=\"checked\"/>\n\t\t\t\t\t\t\t<p id=\"tree").concat(item.id, "\" class=\"select-box__input-text\">").concat(item.title, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t");
	      }).join(''), "\n\t\t\t\t\t") : "\n\t\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" name=\"trees\" checked=\"checked\"/>\n\t\t\t\t\t\t\t<p class=\"select-box__input-text\">\u041D\u0435\u0442 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t", this.trees.length !== 0 ? "\n\t\t\t\t\t\t".concat(this.trees.map(function (item) {
	        return "\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<label class=\"select-box__option\" for=\"".concat(item.id, "\" aria-hidden=\"aria-hidden\">").concat(item.title, "</label>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t ");
	      }).join(''), "\n\t\t\t\t\t") : "\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<label class=\"select-box__option\" aria-hidden=\"aria-hidden\">\u041D\u0435\u0442 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432</label>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t");
	      var textInfo = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<h2 class=\"search__heading\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0440\u0435\u0432\u043E, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u043E\u043C\u0443 \u0445\u043E\u0442\u0438\u0442\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043F\u043E\u0438\u0441\u043A</h2>\n\t\t"])));
	      BX.append(textInfo, this.rootNode);
	      BX.append(select, this.rootNode);
	      if (this.trees.length !== 0) {
	        BX('text-search').innerHTML = 'Нажмите на кнопку "Поиск"';
	        BX('search-relatives').disabled = false;
	      } else {
	        BX('text-search').innerHTML = 'Отсутствуют деревья с подтвержденным пользовательским соглашением. Подробнее в <a class="search-doc" href="#">документации</a>';
	        BX('search-relatives').disabled = true;
	      }
	    }
	  }, {
	    key: "renderListUser",
	    value: function renderListUser() {
	      var _this3 = this;
	      this.rootSearch.innerHTML = '';
	      if (this.usersPersons.foundUsers) {
	        var processUsers = /*#__PURE__*/function () {
	          var _ref = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	            var usersWithChats, _iterator, _step, user, chatExists;
	            return _regeneratorRuntime().wrap(function _callee$(_context) {
	              while (1) switch (_context.prev = _context.next) {
	                case 0:
	                  usersWithChats = [];
	                  _iterator = _createForOfIteratorHelper(_this3.usersPersons.foundUsers);
	                  _context.prev = 2;
	                  _iterator.s();
	                case 4:
	                  if ((_step = _iterator.n()).done) {
	                    _context.next = 12;
	                    break;
	                  }
	                  user = _step.value;
	                  _context.next = 8;
	                  return _this3.searchChatByRecipientId(user.ID);
	                case 8:
	                  chatExists = _context.sent;
	                  usersWithChats.push({
	                    user: user,
	                    chatExists: chatExists
	                  });
	                case 10:
	                  _context.next = 4;
	                  break;
	                case 12:
	                  _context.next = 17;
	                  break;
	                case 14:
	                  _context.prev = 14;
	                  _context.t0 = _context["catch"](2);
	                  _iterator.e(_context.t0);
	                case 17:
	                  _context.prev = 17;
	                  _iterator.f();
	                  return _context.finish(17);
	                case 20:
	                  return _context.abrupt("return", usersWithChats);
	                case 21:
	                case "end":
	                  return _context.stop();
	              }
	            }, _callee, null, [[2, 14, 17, 20]]);
	          }));
	          return function processUsers() {
	            return _ref.apply(this, arguments);
	          };
	        }();
	        processUsers().then(function (usersWithChats) {
	          var list = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t  <main class=\"leaderboard__profiles\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t  </main>\n\t\t\t\t\t"])), usersWithChats.map(function (_ref2) {
	            var user = _ref2.user,
	              chatExists = _ref2.chatExists;
	            return "\n\t\t\t\t\t\t  <article class=\"leaderboard__profile\">\n\t\t\t\t\t\t\t<img src=\"".concat(user.FILE_NAME, "\" alt=\"user\" class=\"leaderboard__picture\">\n\t\t\t\t\t\t\t<span class=\"leaderboard__name\">\n\t\t\t\t\t\t\t\t<span>").concat(BX.message('UP_TREE_SEARCH_USER'), ": ").concat(BX.util.htmlspecialchars(user.NAME) + ' ' + BX.util.htmlspecialchars(user.LAST_NAME), "</span>\n\t\t\t\t\t\t\t \t <span class=\"leaderboard__persons\">\n\t\t\t\t\t\t\t\t\t<span class=\"heading-persons\">").concat(BX.message('UP_TREE_SEARCH_FOUND_RELATIVES'), ":</span>\n\t\t\t\t\t\t\t\t\t\t").concat(_this3.usersPersons.foundPersons.filter(function (person) {
	              return person.userId === Number(user.ID);
	            }).map(function (person) {
	              return "\n\t\t\t\t\t\t\t\t\t\t  <p class=\"persons-info\">".concat(person.name + ' ' + person.surname, ";</p>\n\t\t\t\t\t\t\t\t\t\t");
	            }).join(''), "\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\n\t\t\t\t\t\t\t<div data-user-check = \"").concat(user.ID, "\" class=\"notice-container\">\n\t\t\t\t\t\t\t\t").concat(chatExists ? "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E" : "\n\t\t\t\t\t\t\t\t\t<span data-user-id = \"".concat(user.ID, "\" data-user-name = \"").concat(user.NAME, "\" data-user-surname = \"").concat(user.LAST_NAME, "\" class=\"notice leaderboard__value\">\n\t\t\t\t\t\t\t\t\t\t<svg data-user-id = \"").concat(user.ID, "\" data-user-name = \"").concat(user.NAME, "\" data-user-surname = \"").concat(user.LAST_NAME, "\" width=\"30px\" height=\"30px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t\t\t<path data-user-id = \"").concat(user.ID, "\" data-user-name = \"").concat(user.NAME, "\" data-user-surname = \"").concat(user.LAST_NAME, "\" d=\"M11.713 7.14977C12.1271 7.13953 12.4545 6.79555 12.4443 6.38146C12.434 5.96738 12.0901 5.63999 11.676 5.65023L11.713 7.14977ZM6.30665 12.193H7.05665C7.05665 12.1874 7.05659 12.1818 7.05646 12.1761L6.30665 12.193ZM6.30665 14.51L6.34575 15.259C6.74423 15.2382 7.05665 14.909 7.05665 14.51H6.30665ZM6.30665 17.6L6.26755 18.349C6.28057 18.3497 6.29361 18.35 6.30665 18.35L6.30665 17.6ZM9.41983 18.35C9.83404 18.35 10.1698 18.0142 10.1698 17.6C10.1698 17.1858 9.83404 16.85 9.41983 16.85V18.35ZM10.9445 6.4C10.9445 6.81421 11.2803 7.15 11.6945 7.15C12.1087 7.15 12.4445 6.81421 12.4445 6.4H10.9445ZM12.4445 4C12.4445 3.58579 12.1087 3.25 11.6945 3.25C11.2803 3.25 10.9445 3.58579 10.9445 4H12.4445ZM11.713 5.65023C11.299 5.63999 10.955 5.96738 10.9447 6.38146C10.9345 6.79555 11.2619 7.13953 11.676 7.14977L11.713 5.65023ZM17.0824 12.193L16.3325 12.1761C16.3324 12.1818 16.3324 12.1874 16.3324 12.193H17.0824ZM17.0824 14.51H16.3324C16.3324 14.909 16.6448 15.2382 17.0433 15.259L17.0824 14.51ZM17.0824 17.6V18.35C17.0954 18.35 17.1084 18.3497 17.1215 18.349L17.0824 17.6ZM13.9692 16.85C13.555 16.85 13.2192 17.1858 13.2192 17.6C13.2192 18.0142 13.555 18.35 13.9692 18.35V16.85ZM10.1688 17.6027C10.1703 17.1885 9.83574 16.8515 9.42153 16.85C9.00732 16.8485 8.67034 17.1831 8.66886 17.5973L10.1688 17.6027ZM10.0848 19.3L10.6322 18.7873L10.6309 18.786L10.0848 19.3ZM13.3023 19.3L12.7561 18.786L12.7549 18.7873L13.3023 19.3ZM14.7182 17.5973C14.7167 17.1831 14.3797 16.8485 13.9655 16.85C13.5513 16.8515 13.2167 17.1885 13.2182 17.6027L14.7182 17.5973ZM9.41788 16.85C9.00366 16.85 8.66788 17.1858 8.66788 17.6C8.66788 18.0142 9.00366 18.35 9.41788 18.35V16.85ZM13.9692 18.35C14.3834 18.35 14.7192 18.0142 14.7192 17.6C14.7192 17.1858 14.3834 16.85 13.9692 16.85V18.35ZM11.676 5.65023C8.198 5.73622 5.47765 8.68931 5.55684 12.2099L7.05646 12.1761C6.99506 9.44664 9.09735 7.21444 11.713 7.14977L11.676 5.65023ZM5.55665 12.193V14.51H7.05665V12.193H5.55665ZM6.26755 13.761C5.0505 13.8246 4.125 14.8488 4.125 16.055H5.625C5.625 15.6136 5.95844 15.2792 6.34575 15.259L6.26755 13.761ZM4.125 16.055C4.125 17.2612 5.0505 18.2854 6.26755 18.349L6.34575 16.851C5.95843 16.8308 5.625 16.4964 5.625 16.055H4.125ZM6.30665 18.35H9.41983V16.85H6.30665V18.35ZM12.4445 6.4V4H10.9445V6.4H12.4445ZM11.676 7.14977C14.2917 7.21444 16.3939 9.44664 16.3325 12.1761L17.8322 12.2099C17.9114 8.68931 15.191 5.73622 11.713 5.65023L11.676 7.14977ZM16.3324 12.193V14.51H17.8324V12.193H16.3324ZM17.0433 15.259C17.4306 15.2792 17.764 15.6136 17.764 16.055H19.264C19.264 14.8488 18.3385 13.8246 17.1215 13.761L17.0433 15.259ZM17.764 16.055C17.764 16.4964 17.4306 16.8308 17.0433 16.851L17.1215 18.349C18.3385 18.2854 19.264 17.2612 19.264 16.055H17.764ZM17.0824 16.85H13.9692V18.35H17.0824V16.85ZM8.66886 17.5973C8.66592 18.4207 8.976 19.2162 9.53861 19.814L10.6309 18.786C10.335 18.4715 10.1673 18.0473 10.1688 17.6027L8.66886 17.5973ZM9.53739 19.8127C10.0977 20.4109 10.8758 20.7529 11.6935 20.7529V19.2529C11.2969 19.2529 10.9132 19.0873 10.6322 18.7873L9.53739 19.8127ZM11.6935 20.7529C12.5113 20.7529 13.2894 20.4109 13.8497 19.8127L12.7549 18.7873C12.4739 19.0873 12.0901 19.2529 11.6935 19.2529V20.7529ZM13.8484 19.814C14.4111 19.2162 14.7211 18.4207 14.7182 17.5973L13.2182 17.6027C13.2198 18.0473 13.0521 18.4715 12.7561 18.786L13.8484 19.814ZM9.41788 18.35H13.9692V16.85H9.41788V18.35Z\" fill=\"#00ceaa\"/>\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t"), "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t  </article>\n\t\t\t\t\t\t");
	          }).join(''));
	          BX.append(list, _this3.rootSearch);
	          BX('spinner').remove();
	          var btnNotice = document.querySelectorAll('.notice');
	          btnNotice.forEach(function (btn) {
	            BX.bind(btn, 'click', function (event) {
	              var id = event.target.dataset.userId;
	              var name = event.target.dataset.userName;
	              var surname = event.target.dataset.userSurname;
	              Form.render(id, name, surname);
	            });
	          });
	        });
	      } else {
	        var notFound = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"notFound\">\n\t\t\t\t\t<span class=\"notFound-icon\">\n\t\t\t\t\t\t<svg fill=\"#00ceaa\" width=\"80px\" height=\"80px\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t<path d=\"M7.29,12H6.87A5.73,5.73,0,0,0,1,17.54,2.38,2.38,0,0,0,1,18H8.26A7,7,0,0,1,7,14,7.27,7.27,0,0,1,7.29,12ZM8.46,9.73A7,7,0,0,1,14,7a5.12,5.12,0,0,1,.56,0A4.93,4.93,0,0,0,15,5,5,5,0,1,0,8.46,9.73Z\"/>\n\t\t\t\t\t\t\t\t<path class=\"secondary\" d=\"M14,8a6,6,0,1,0,6,6A6,6,0,0,0,14,8Zm0,10.8A4.8,4.8,0,1,1,18.8,14,4.8,4.8,0,0,1,14,18.8ZM17,12l-1-1-2,2-2-2-1,1,2,2-2,2,1,1,2-2,2,2,1-1-2-2Z\"/>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</span>\n\t\t\t\t\t<p class=\"notFound-text\">\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u0440\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B</p>\n\t\t\t\t</div>\n\t\t\t"])));
	        BX.append(notFound, this.rootSearch);
	        BX('spinner').remove();
	      }
	    }
	  }, {
	    key: "searchChatByRecipientId",
	    value: function () {
	      var _searchChatByRecipientId = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(recipientId) {
	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              _context2.prev = 0;
	              _context2.next = 3;
	              return Requests.searchChatByRecipientId(recipientId);
	            case 3:
	              return _context2.abrupt("return", _context2.sent);
	            case 6:
	              _context2.prev = 6;
	              _context2.t0 = _context2["catch"](0);
	              console.error('Error searching chat:', _context2.t0);
	            case 9:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2, null, [[0, 6]]);
	      }));
	      function searchChatByRecipientId(_x) {
	        return _searchChatByRecipientId.apply(this, arguments);
	      }
	      return searchChatByRecipientId;
	    }()
	  }]);
	  return Search;
	}();

	exports.Search = Search;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
