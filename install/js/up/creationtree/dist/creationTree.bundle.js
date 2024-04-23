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
	    key: "loadNodes",
	    value: function loadNodes(id) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.getPersons', {
	          data: {
	            treeId: id
	          }
	        }).then(function (response) {
	          var nodesList = response.data.tree;
	          resolve(nodesList);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "updateNode",
	    value: function updateNode(id, active, imageId, lastImageId, name, surname, birthDate, deathDate, gender, treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.update', {
	          data: {
	            id: id,
	            updatablePerson: {
	              active: active,
	              imageId: imageId,
	              lastImageId: lastImageId,
	              name: name,
	              surname: surname,
	              birthDate: birthDate,
	              deathDate: deathDate,
	              gender: gender,
	              treeId: treeId
	            }
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addNode",
	    value: function addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeId, personConnectedIds, relationType) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.add', {
	          data: {
	            person: {
	              active: active,
	              imageId: imageId,
	              name: name,
	              surname: surname,
	              birthDate: birthDate,
	              deathDate: deathDate,
	              gender: gender,
	              treeId: treeId
	            },
	            personConnectedIds: personConnectedIds,
	            relationType: relationType
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "removeNode",
	    value: function removeNode(id) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.remove', {
	          data: {
	            id: id
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

	var Helper = /*#__PURE__*/function () {
	  function Helper() {
	    babelHelpers.classCallCheck(this, Helper);
	  }
	  babelHelpers.createClass(Helper, null, [{
	    key: "addRelation",
	    value: function addRelation(list) {
	      if (list.familyRelations.length !== 0) {
	        list.familyRelations.forEach(function (parent) {
	          var nodeToUpdateParent = list.persons.find(function (node) {
	            return node.id === parent.childId;
	          });
	          var parents = list.persons.find(function (node) {
	            return node.id === parent.parentId;
	          });
	          if (parents.gender === 'male') {
	            nodeToUpdateParent.fid = parent.parentId;
	          } else {
	            nodeToUpdateParent.mid = parent.parentId;
	          }
	        });
	      }
	      if (list.familyRelationsMarried.length !== 0) {
	        list.familyRelationsMarried.forEach(function (partner) {
	          var nodeToUpdateMarried = list.persons.find(function (node) {
	            return node.id === partner.personID;
	          });
	          if (nodeToUpdateMarried) {
	            if (!nodeToUpdateMarried.pids) {
	              nodeToUpdateMarried.pids = [];
	            }
	            if (!nodeToUpdateMarried.pids.includes(partner.partnerID)) {
	              nodeToUpdateMarried.pids.push(partner.partnerID);
	            }
	          }
	        });
	      }
	    }
	  }, {
	    key: "isNumeric",
	    value: function isNumeric(str) {
	      return !isNaN(parseFloat(str)) && isFinite(str);
	    }
	  }, {
	    key: "formatDate",
	    value: function formatDate(date) {
	      var dateObject = new Date(date);
	      var day = dateObject.getDate();
	      var month = dateObject.getMonth() + 1;
	      var year = dateObject.getFullYear();
	      var formattedDay = day < 10 ? '0' + day : day;
	      var formattedMonth = month < 10 ? '0' + month : month;
	      return "".concat(formattedDay, ".").concat(formattedMonth, ".").concat(year);
	    }
	  }, {
	    key: "getRootOf",
	    value: function getRootOf(node, family) {
	      while (node) {
	        if (!family.getNode(node.mid)) {
	          break;
	        }
	        node = family.getNode(node.mid);
	      }
	      return node;
	    }
	  }]);
	  return Helper;
	}();

	var DownloadJson = /*#__PURE__*/function () {
	  function DownloadJson() {
	    babelHelpers.classCallCheck(this, DownloadJson);
	  }
	  babelHelpers.createClass(DownloadJson, null, [{
	    key: "download",
	    value: function download(obj, name) {
	      var dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
	      var anchorElement = document.createElement('a');
	      anchorElement.href = dataUri;
	      anchorElement.download = "".concat(name, ".json");
	      document.body.appendChild(anchorElement);
	      anchorElement.click();
	      document.body.removeChild(anchorElement);
	    }
	  }, {
	    key: "changeKey",
	    value: function changeKey(obj, oldKey, newKey) {
	      if (obj.hasOwnProperty(oldKey)) {
	        obj[newKey] = obj[oldKey];
	        delete obj[oldKey];
	      }
	    }
	  }]);
	  return DownloadJson;
	}();

	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var CreatedNode = /*#__PURE__*/function () {
	  function CreatedNode() {
	    babelHelpers.classCallCheck(this, CreatedNode);
	  }
	  babelHelpers.createClass(CreatedNode, null, [{
	    key: "requestCreationNode",
	    value: function requestCreationNode(nodeId, family, onUpdateNodeAdded, onUpdatePerson, self) {
	      var treeID = parseInt(window.location.href.match(/\d+/));
	      if (nodeId && typeof nodeId === "string" && !onUpdateNodeAdded) {
	        onUpdateNodeAdded = this.addRequestNode(family, onUpdateNodeAdded, self);
	      } else if (!onUpdatePerson) {
	        onUpdatePerson = true;
	        family.onUpdateNode( /*#__PURE__*/function () {
	          var _ref = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(args) {
	            var formData, fileInput, updateNodes, id, gender, name, imageId, surname, active, birthDate, deathDate;
	            return _regeneratorRuntime().wrap(function _callee$(_context) {
	              while (1) switch (_context.prev = _context.next) {
	                case 0:
	                  if (!(Object.keys(args.addNodesData).length !== 0)) {
	                    _context.next = 2;
	                    break;
	                  }
	                  return _context.abrupt("return");
	                case 2:
	                  formData = new FormData();
	                  fileInput = document.querySelector('input[type="file"]');
	                  formData.append(fileInput.name, fileInput.files[0]);
	                  updateNodes = args.updateNodesData;
	                  id = updateNodes[0].id;
	                  gender = updateNodes[0].gender[0];
	                  name = updateNodes[0].name;
	                  imageId = updateNodes[0].imageId;
	                  surname = updateNodes[0].surname;
	                  active = updateNodes[0].active;
	                  birthDate = Helper.formatDate(updateNodes[0].birthDate);
	                  deathDate = Helper.formatDate(updateNodes[0].deathDate);
	                  if (surname.length === 0) {
	                    surname = null;
	                  }
	                  if (active) {
	                    active = '1';
	                  } else {
	                    active = '0';
	                  }
	                  if (updateNodes[0].deathDate.length === 0) {
	                    deathDate = null;
	                  }
	                  if (updateNodes[0].birthDate.length === 0) {
	                    birthDate = null;
	                  }
	                  if (BX('photoName').value !== '') {
	                    fetch("/tree/".concat(treeID, "/"), {
	                      method: 'POST',
	                      headers: {
	                        "X-Bitrix-Csrf-Token": BX.bitrix_sessid()
	                      },
	                      body: formData
	                    }).then(function (response) {
	                      if (!response.ok) {
	                        throw new Error('Network response was not ok');
	                      }
	                      return response.json();
	                    }).then(function (response) {
	                      var lastImageId = updateNodes[0].imageId;
	                      updateNodes[0].imageId = response.data.fileId;
	                      var imageId = updateNodes[0].imageId;
	                      Requests.updateNode(id, active, imageId, lastImageId, name, surname, birthDate, deathDate, gender, treeID).then(function (node) {
	                        self.reload();
	                        return node;
	                      });
	                    })["catch"](function (error) {
	                      console.error('Error while changing item:', error);
	                    });
	                  } else {
	                    Requests.updateNode(id, active, imageId, 0, name, surname, birthDate, deathDate, gender, treeID).then(function (node) {
	                      self.reload();
	                      return node;
	                    });
	                  }
	                case 19:
	                case "end":
	                  return _context.stop();
	              }
	            }, _callee);
	          }));
	          return function (_x) {
	            return _ref.apply(this, arguments);
	          };
	        }());
	      }
	      return [onUpdateNodeAdded, onUpdatePerson];
	    }
	  }, {
	    key: "addRequestNode",
	    value: function addRequestNode(family, onUpdateNodeAdded, self) {
	      var _this = this;
	      var treeID = parseInt(window.location.href.match(/\d+/));
	      onUpdateNodeAdded = true;
	      family.onUpdateNode(function (args) {
	        var updateNodes = args.updateNodesData;
	        var addNodes = args.addNodesData;
	        var removeNodes = args.removeNodeId;
	        var formData = new FormData();
	        var fileInput = document.querySelector('input[type="file"]');
	        formData.append(fileInput.name, fileInput.files[0]);
	        if (BX('photoName').value !== '') {
	          fetch("/tree/".concat(treeID, "/"), {
	            method: 'POST',
	            headers: {
	              "X-Bitrix-Csrf-Token": BX.bitrix_sessid()
	            },
	            body: formData
	          }).then(function (response) {
	            if (!response.ok) {
	              throw new Error('Network response was not ok');
	            }
	            return response.json();
	          }).then(function (response) {
	            updateNodes[0].imageId = response.data.fileId;
	            _this.addNode(family, updateNodes, addNodes, removeNodes, self);
	          })["catch"](function (error) {
	            console.error('Error while changing item:', error);
	          });
	        } else {
	          updateNodes[0].imageId = 1;
	          _this.addNode(family, updateNodes, addNodes, removeNodes, self);
	        }
	      });
	      return onUpdateNodeAdded;
	    }
	  }, {
	    key: "addNode",
	    value: function addNode(family, updateNodes, addNodes, removeNodes, self) {
	      var treeID = parseInt(window.location.href.match(/\d+/));
	      if (Object.keys(addNodes).length === 0 && removeNodes === null) {
	        var gender = updateNodes[0].gender[0];
	        var name = updateNodes[0].name;
	        var active = updateNodes[0].active;
	        var imageId = updateNodes[0].imageId;
	        var surname = updateNodes[0].surname;
	        var birthDate = Helper.formatDate(updateNodes[0].birthDate);
	        var deathDate = Helper.formatDate(updateNodes[0].deathDate);
	        if (surname.length === 0) {
	          surname = null;
	        }
	        console.log(surname);
	        if (active) {
	          active = '1';
	        } else {
	          active = '0';
	        }
	        if (updateNodes[0].deathDate.length === 0) {
	          deathDate = null;
	        }
	        if (updateNodes[0].birthDate.length === 0) {
	          birthDate = null;
	        }
	        var personConnectedId = [Number(updateNodes[0].pids[0])];
	        if (updateNodes[0].mid || updateNodes[0].fid) {
	          if (Helper.isNumeric(updateNodes[0].mid) && Helper.isNumeric(updateNodes[0].fid)) {
	            personConnectedId = [Number(updateNodes[0].mid), Number(updateNodes[0].fid)];
	          } else if (Helper.isNumeric(updateNodes[0].mid) && !Helper.isNumeric(updateNodes[0].fid)) {
	            personConnectedId = [Number(updateNodes[0].mid)];
	          } else if (Helper.isNumeric(updateNodes[0].fid) && !Helper.isNumeric(updateNodes[0].mid)) {
	            personConnectedId = [Number(updateNodes[0].fid)];
	          }
	          Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'child').then(function (node) {
	            if (node) {
	              self.reload();
	            }
	          });
	          return;
	        }
	        if (updateNodes[0].child && updateNodes[0].pids.length === 0 && updateNodes[0].pids[0] !== 0) {
	          if (updateNodes[0].child.mid) {
	            personConnectedId = [updateNodes[0].child.mid];
	          } else {
	            personConnectedId = [updateNodes[0].child.fid];
	          }
	          Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'parent').then(function (node) {
	            if (node) {
	              self.reload();
	            }
	          });
	          return;
	        }
	        if (updateNodes[0].child && updateNodes[0].pids.length !== 0 && updateNodes[0].pids[0] !== 0) {
	          var partner = updateNodes[0].pids[0];
	          var childID = 0;
	          if (updateNodes[0].child.mid) {
	            childID = updateNodes[0].child.mid;
	          } else {
	            childID = updateNodes[0].child.fid;
	          }
	          personConnectedId = [partner, childID];
	          Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'partnerParent').then(function (node) {
	            if (node) {
	              self.reload();
	            }
	          });
	          return;
	        }
	        if (updateNodes[0].pids.length !== 0) {
	          Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'partner').then(function (node) {
	            if (node) {
	              self.reload();
	            }
	          });
	          return;
	        }
	        Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, [0], 'init').then(function (node) {
	          if (node) {
	            self.reload();
	          }
	        });
	      }
	    }
	  }]);
	  return CreatedNode;
	}();

	var Family = /*#__PURE__*/function () {
	  function Family() {
	    babelHelpers.classCallCheck(this, Family);
	  }
	  babelHelpers.createClass(Family, null, [{
	    key: "create",
	    value: function create(list, templateName) {
	      var family = new FamilyTree(document.getElementById('tree'), {
	        mouseScrool: FamilyTree.action.scroll,
	        searchDisplayField: 'name',
	        searchFields: ["name", "surname"],
	        searchFieldsWeight: {
	          "name": 100
	        },
	        template: templateName,
	        nodeTreeMenu: true,
	        nodeMenu: {
	          remove: {
	            text: 'Remove'
	          }
	        },
	        nodes: list,
	        nodeBinding: {
	          field_0: 'name',
	          field_1: "surname",
	          img_0: 'photo'
	        },
	        exportUrl: 'http://127.0.0.1:1337',
	        editForm: {
	          titleBinding: "name",
	          photoBinding: "photo",
	          addMore: null,
	          cancelBtn: 'Close',
	          saveAndCloseBtn: 'Save',
	          generateElementsFromFields: false,
	          buttons: {
	            share: null,
	            remove: null
	          },
	          elements: [{
	            type: 'textbox',
	            label: 'Name',
	            binding: 'name'
	          }, {
	            type: 'textbox',
	            label: 'Surname',
	            binding: 'surname'
	          }, [{
	            type: 'date',
	            label: 'Date Of Birth',
	            binding: 'birthDate'
	          }, {
	            type: 'date',
	            label: 'Date Of Death',
	            binding: 'deathDate'
	          }], [{
	            type: 'select',
	            options: [{
	              value: 'male',
	              text: 'Male'
	            }, {
	              value: 'female',
	              text: 'Female'
	            }],
	            label: 'Gender',
	            binding: 'gender'
	          }], {
	            type: 'checkbox',
	            label: 'Important',
	            binding: 'active'
	          }]
	        }
	      });
	      return family;
	    }
	  }]);
	  return Family;
	}();

	var Original = /*#__PURE__*/function () {
	  function Original() {
	    babelHelpers.classCallCheck(this, Original);
	  }
	  babelHelpers.createClass(Original, null, [{
	    key: "stylingNode",
	    value: function stylingNode(family) {
	      FamilyTree.templates.base.defs = "\n\t\t<g style=\"cursor: pointer;\" id=\"base_tree_menu\">\n\t\t<rect x=\"0\" y=\"0\" width=\"25\" height=\"25\" fill=\"transparent\"></rect>\n\t\t".concat(FamilyTree.icon.addUser(25, 25, '#fff', 0, 0), "\n\t\t</g>");
	      FamilyTree.templates.tommy_male.defs = "<g transform=\"matrix(0.05,0,0,0.05,-12,-9)\" id=\"heart\">\n       \t\t\t <path fill=\"#F57C00\" d=\"M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z\"/>\n\t\t\t<g>\n\t\t\t";
	      FamilyTree.templates.tommy.node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="grey" stroke="#aeaeae" rx="15" ry="15"></rect>';
	      family.on('expcollclick', function (sender, isCollapsing, nodeId) {
	        var node = family.getNode(nodeId);
	        if (isCollapsing) {
	          family.expandCollapse(nodeId, [], node.ftChildrenIds);
	        } else {
	          family.expandCollapse(nodeId, node.ftChildrenIds, []);
	        }
	        return false;
	      });
	      family.on('render-link', function (sender, args) {
	        if (args.cnode.ppid != undefined) args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + args.p.xa + '" y="' + args.p.ya + '"/>';
	        if (args.cnode.isPartner && args.node.partnerSeparation == 30) args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + args.p.xb + '" y="' + args.p.yb + '"/>';
	      });
	    }
	  }]);
	  return Original;
	}();

	var Sriniz = /*#__PURE__*/function () {
	  function Sriniz() {
	    babelHelpers.classCallCheck(this, Sriniz);
	  }
	  babelHelpers.createClass(Sriniz, null, [{
	    key: "stylingNode",
	    value: function stylingNode(family) {
	      FamilyTree.templates.base.defs = "\n\t\t<g style=\"cursor: pointer;\" id=\"base_tree_menu\">\n\t\t<rect x=\"0\" y=\"0\" width=\"25\" height=\"25\" fill=\"transparent\"></rect>\n\t\t".concat(FamilyTree.icon.addUser(25, 25, '#fff', 0, 0), "\n\t\t</g>");
	      FamilyTree.templates.sriniz = Object.assign({}, FamilyTree.templates.base);
	      FamilyTree.templates.sriniz.size = [225, 90];
	      FamilyTree.templates.sriniz.node = '<rect x="0" y="0" height="90" width="225" stroke-width="1" rx="15" ry="15"></rect>';
	      FamilyTree.templates.sriniz.defs = "\n\t\t<g transform=\"matrix(0.05,0,0,0.05,-13 ,-12)\" id=\"heartsriniz\">\n\t\t\t<path d=\"M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z\" style=\"fill:#fff;stroke:red;stroke-miterlimit:10;stroke-width:24px\" fill=\"red\"></path><path d=\"M256,360a16,16,0,0,1-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06,25.22-56.33,55.53-56.33,20.4,0,35,10.63,44.1,20.41a6,6,0,0,0,8.72,0c9.11-9.78,23.7-20.41,44.1-20.41,30.31,0,55.22,25.27,55.53,56.33.28,27.1-9.31,52.13-29.3,76.5-9.38,11.44-26.4,29.73-65.7,56.41A16,16,0,0,1,256,360Z\" fill=\"red\"></path>\n\t\t</g>\n\t\t<g id=\"sriniz_male_up\">\n\t\t\t<circle cx=\"15\" cy=\"15\" r=\"10\" fill=\"#fff\" stroke=\"#fff\" stroke-width=\"1\"></circle>\n\t\t\t".concat(FamilyTree.icon.ft(15, 15, '#039BE5', 7.5, 7.5), "\n\t\t</g>\n\t\t\n\t\t<g id=\"sriniz_female_up\">\n\t\t\t<circle cx=\"15\" cy=\"15\" r=\"10\" fill=\"#fff\" stroke=\"#fff\" stroke-width=\"1\"></circle>\n\t\t\t").concat(FamilyTree.icon.ft(15, 15, '#FF46A3', 7.5, 7.5), "\n\t\t</g>");
	      FamilyTree.templates.sriniz_male = Object.assign({}, FamilyTree.templates.sriniz);
	      FamilyTree.templates.sriniz_male.node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="15" ry="15"></rect>';
	      FamilyTree.templates.sriniz.node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="grey" stroke="#aeaeae" rx="15" ry="15"></rect>';
	      FamilyTree.templates.sriniz_male.field_0 = '<text data-width="120px" style="font-size: 16px; font-weight: bold;" fill="#ffffff" x="90" y="45">{val}</text>';
	      FamilyTree.templates.sriniz_male.field_1 = '<text data-width="120px" style="font-size: 12px; font-weight: bold;" fill="#ffffff" x="90" y="65">{val}</text>';
	      FamilyTree.templates.sriniz_female = Object.assign({}, FamilyTree.templates.sriniz);
	      FamilyTree.templates.sriniz_female.node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#FF46A3" stroke="#aeaeae" rx="15" ry="15"></rect>';
	      FamilyTree.templates.sriniz_female.field_0 = '<text data-width="120px" style="font-size: 16px; font-weight: bold;" fill="#ffffff" x="90" y="45">{val}</text>';
	      FamilyTree.templates.sriniz_female.field_1 = '<text data-width="120px" style="font-size: 12px; font-weight: bold;" fill="#ffffff" x="90" y="65">{val}</text>';
	      FamilyTree.templates.sriniz.field_0 = '<text data-width="150px" style="font-size: 12px; font-weight: bold;" fill="#ffffff" x="81" y="47">{val}</text>';
	      FamilyTree.templates.sriniz.field_1 = '<text data-width="150px" style="font-size: 12px; font-weight: bold;" fill="#ffffff" x="83" y="65">{val}</text>';
	      var expandIconMale = '<circle cx="97" cy="-16" r="10" fill="#039BE5" stroke="#fff" stroke-width="1"><title>Expand</title></circle>' + '<line x1="90" y1="-16" x2="104" y2="-16" stroke-width="1" stroke="#fff"></line>' + '<line x1="97" y1="-23" x2="97" y2="-9" stroke-width="1" stroke="#fff"></line>';
	      var expandIconFemale = '<circle cx="97" cy="-16" r="10" fill="#FF46A3" stroke="#fff" stroke-width="1"></circle>' + '<line x1="90" y1="-16" x2="104" y2="-16" stroke-width="1" stroke="#fff"></line>' + '<line x1="97" y1="-23" x2="97" y2="-9" stroke-width="1" stroke="#fff"></line>';
	      FamilyTree.templates.sriniz_male.plus = expandIconMale;
	      FamilyTree.templates.sriniz_female.plus = expandIconFemale;
	      FamilyTree.templates.sriniz.plus = expandIconFemale;
	      var imgTemplate = '<clipPath id="ulaImg">' + '<rect  height="75" width="75" x="7" y="7" stroke-width="1" fill="#FF46A3" stroke="#aeaeae" rx="15" ry="15"></rect>' + '</clipPath>' + '<image x="7" y="7" preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" width="75" height="75">' + '</image>';
	      FamilyTree.templates.sriniz_male.img_0 = imgTemplate;
	      FamilyTree.templates.sriniz_female.img_0 = imgTemplate;
	      FamilyTree.templates.sriniz.img_0 = imgTemplate;
	      FamilyTree.templates.sriniz_male.up = '<use x="195" y="0" xlink:href="#sriniz_male_up"></use>';
	      FamilyTree.templates.sriniz_female.up = '<use x="195" y="0" xlink:href="#sriniz_female_up"></use>';
	      FamilyTree.templates.sriniz.up = '<use x="195" y="0" xlink:href="#sriniz_female_up"></use>';
	      FamilyTree.templates.sriniz.pointer = '<g data-pointer="pointer" transform="matrix(0,0,0,0,80,80)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">' + '<polygon fill="#039BE5" points="53.004,173.004 53.004,66.996 0,120" />' + '<polygon fill="#039BE5" points="186.996,66.996 186.996,173.004 240,120" />' + '<polygon fill="#FF46A3" points="66.996,53.004 173.004,53.004 120,0" />' + '<polygon fill="#FF46A3" points="120,240 173.004,186.996 66.996,186.996" />' + '<circle fill="red" cx="120" cy="120" r="30" />' + '</g></g>';
	      family.on('render-link', function (sender, args) {
	        if (args.cnode.ppid != undefined) args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heartsriniz" x="' + args.p.xa + '" y="' + args.p.ya + '"/>';
	        if (args.cnode.isPartner && args.node.partnerSeparation == 30) args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heartsriniz" x="' + args.p.xb + '" y="' + args.p.yb + '"/>';
	      });
	    }
	  }]);
	  return Sriniz;
	}();

	var Multiple = /*#__PURE__*/function () {
	  function Multiple() {
	    babelHelpers.classCallCheck(this, Multiple);
	  }
	  babelHelpers.createClass(Multiple, null, [{
	    key: "stylingNode",
	    value: function stylingNode(family) {
	      FamilyTree.templates.base.defs = "<g transform=\"matrix(0.05,0,0,0.05,-12,-9)\" id=\"heartmultiple\">\n\t<path fill=\"#aeaeae\" d=\"M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z\"/>\n\t</g>\n\t<g transform=\"matrix(1,0,0,1,0,0)\" id=\"dot\"></g>\n      <g id=\"base_node_menu\" style=\"cursor:pointer;\">\n          <rect x=\"0\" y=\"0\" fill=\"transparent\" width=\"22\" height=\"22\"></rect>\n          <circle cx=\"4\" cy=\"11\" r=\"2\" fill=\"#b1b9be\"></circle>\n          <circle cx=\"11\" cy=\"11\" r=\"2\" fill=\"#b1b9be\"></circle>\n          <circle cx=\"18\" cy=\"11\" r=\"2\" fill=\"#b1b9be\"></circle>\n      </g>\n      <g style=\"cursor: pointer;\" id=\"base_tree_menu\">\n          <rect x=\"0\" y=\"0\" width=\"25\" height=\"25\" fill=\"transparent\"></rect>\n          ".concat(FamilyTree.icon.addUser(25, 25, 'black', 0, 0), "\n      </g>\n      <g style=\"cursor: pointer;\" id=\"base_tree_menu_close\">\n          <circle cx=\"12.5\" cy=\"12.5\" r=\"12\" fill=\"#F57C00\"></circle>\n          ").concat(FamilyTree.icon.close(25, 25, '#fff', 0, 0), "\n      </g>            \n      <g id=\"base_up\">\n          <circle cx=\"115\" cy=\"30\" r=\"15\" fill=\"#fff\" stroke=\"#b1b9be\" stroke-width=\"1\"></circle>\n          ").concat(FamilyTree.icon.ft(20, 80, '#b1b9be', 105, -10), "\n      </g>\n      <clipPath id=\"base_img_0\">\n        <circle id=\"base_img_0_stroke\" cx=\"45\" cy=\"62\" r=\"35\"/>\n      </clipPath>\n      <clipPath id=\"base_img_1\">\n        <circle id=\"base_img_1_stroke\" cx=\"100\" cy=\"62\" r=\"35\"/>\n      </clipPath>\n      ");
	      FamilyTree.templates.main = Object.assign({}, FamilyTree.templates.base);
	      FamilyTree.templates.main.defs = "<style>\n                                        .{randId} .bft-edit-form-header, .{randId} .bft-img-button{\n                                            background-color: #aeaeae;\n                                        }\n                                        .{randId}.male .bft-edit-form-header, .{randId}.male .bft-img-button{\n                                            background-color: #6bb4df;\n                                        }        \n                                        .{randId}.male div.bft-img-button:hover{\n                                            background-color: #cb4aaf;\n                                        }\n                                        .{randId}.female .bft-edit-form-header, .{randId}.female .bft-img-button{\n                                            background-color: #cb4aaf;\n                                        }        \n                                        .{randId}.female div.bft-img-button:hover{\n                                            background-color: #6bb4df;\n                                        }\n    \t</style>";
	      FamilyTree.templates.main.node = '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" stroke-width="3" stroke="#ccc" rx="5" ry="5"></rect>' + '<rect x="0" y="0" height="20" width="{w}" fill="#b1b9be" stroke-width="1" stroke="#b1b9be" rx="5" ry="5"></rect>' + '<line x1="0" y1="20" x2="250" y2="20" stroke-width="5" stroke="#b1b9be"></line>';
	      FamilyTree.templates.main.field_0 = '<text ' + FamilyTree.attr.width + ' ="250" style="font-size: 14px;" font-variant="all-small-caps" fill="white" x="125" y="16" text-anchor="middle">{val}</text>';
	      FamilyTree.templates.main.field_1 = '<text ' + FamilyTree.attr.width + ' ="160" data-text-overflow="multiline" style="font-size: 14px;" fill="black" x="100" y="66" text-anchor="start">{val}</text>';
	      FamilyTree.templates.main.field_2 = '<text ' + FamilyTree.attr.width + ' ="160" style="font-size: 10px;" fill="#b1b9be" x="100" y="95" text-anchor="start">{val}</text>';
	      FamilyTree.templates.main.field_3 = '<text ' + FamilyTree.attr.width + ' ="60" style="font-size: 12px;" fill="black" x="47" y="112" text-anchor="middle">{val}</text>';
	      FamilyTree.templates.main.img_0 = "<use xlink:href=\"#base_img_0_stroke\" /> \n       <circle id=\"base_img_0_stroke\" fill=\"#b1b9be\" cx=\"45\" cy=\"62\" r=\"37\"/>\n      <image preserveAspectRatio=\"xMidYMid slice\" clip-path=\"url(#base_img_0)\" xlink:href=\"{val}\" x=\"10\" y=\"26\" width=\"72\" height=\"72\"></image>";
	      FamilyTree.templates.main_male = Object.assign({}, FamilyTree.templates.main);
	      FamilyTree.templates.main_male.node = '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" stroke-width="3" stroke="#6bb4df" rx="5" ry="5"></rect>' + '<rect x="0" y="0" height="20" width="{w}" fill="#6bb4df" stroke-width="1" stroke="#6bb4df" rx="5" ry="5"></rect>' + '<line x1="0" y1="20" x2="250" y2="20" stroke-width="5" stroke="#6bb4df"></line>';
	      FamilyTree.templates.main_male.img_0 = "<use xlink:href=\"#base_img_0_stroke\" /> \n       <circle id=\"base_img_0_stroke\" fill=\"#6bb4df\" cx=\"45\" cy=\"62\" r=\"37\"/>\n      <image preserveAspectRatio=\"xMidYMid slice\" clip-path=\"url(#base_img_0)\" xlink:href=\"{val}\" x=\"10\" y=\"26\" width=\"72\" height=\"72\"></image>";
	      FamilyTree.templates.main_male_child = Object.assign({}, FamilyTree.templates.main_male);
	      FamilyTree.templates.main_male_child.link = '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="{rounded}" />';
	      FamilyTree.templates.main_female = Object.assign({}, FamilyTree.templates.main_male);
	      FamilyTree.templates.main_female.node = '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" stroke-width="3" stroke="#cb4aaf" rx="5" ry="5"></rect>' + '<rect x="0" y="0" height="20" width="{w}" fill="#cb4aaf" stroke-width="1" stroke="#cb4aaf" rx="5" ry="5"></rect>' + '<line x1="0" y1="20" x2="250" y2="20" stroke-width="5" stroke="#cb4aaf"></line>';
	      FamilyTree.templates.main_female.img_0 = "<use xlink:href=\"#base_img_0_stroke\" /> \n       <circle id=\"base_img_0_stroke\" fill=\"#cb4aaf\" cx=\"45\" cy=\"62\" r=\"37\"/>\n      <image preserveAspectRatio=\"xMidYMid slice\" clip-path=\"url(#base_img_0)\" xlink:href=\"{val}\" x=\"10\" y=\"26\" width=\"72\" height=\"72\"></image>";
	      FamilyTree.templates.main_female_child = Object.assign({}, FamilyTree.templates.main_female);
	      FamilyTree.templates.main_female_child.link = '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="{rounded}" />';
	      family.on('render-link', function (sender, args) {
	        if (args.cnode.ppid != undefined) {
	          args.html += '<use xlink:href="#heartmultiple" x="' + args.p.xa + '" y="' + args.p.ya + '"/>';
	        }
	      });
	    }
	  }]);
	  return Multiple;
	}();

	var John = /*#__PURE__*/function () {
	  function John() {
	    babelHelpers.classCallCheck(this, John);
	  }
	  babelHelpers.createClass(John, null, [{
	    key: "stylingNode",
	    value: function stylingNode() {
	      FamilyTree.templates.base.defs = "\n\t\t\t\t<g id=\"john_up\">\n\t\t\t\t\t<circle cx=\"115\" cy=\"30\" r=\"15\" fill=\"#fff\" stroke=\"#b1b9be\" stroke-width=\"1\"></circle>\n\t\t\t\t\t".concat(FamilyTree.icon.ft(20, 80, '#b1b9be', 80, 5), "\n\t\t\t\t</g>\n\t\t\t\t<g style=\"cursor: pointer;\" id=\"base_tree_menu\">\n\t\t\t\t\t<rect x=\"0\" y=\"0\" width=\"25\" height=\"25\" fill=\"transparent\"></rect>\n\t\t\t\t\t").concat(FamilyTree.icon.addUser(25, 25, 'grey', 0, 0), "\n\t\t\t\t</g>\n\t\t\t");
	    }
	  }]);
	  return John;
	}();

	var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
	var CreationTree = /*#__PURE__*/function () {
	  function CreationTree() {
	    var _this = this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, CreationTree);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Tree: options.rootNodeId required');
	    }
	    this.rootNode = BX(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Tree: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.nodeList = [];
	    this.isHandlerAdded = false;
	    var buttonJSON = BX('json');
	    BX.bind(buttonJSON, 'click', function () {
	      _this.nodeList.persons.forEach(function (person) {
	        DownloadJson.changeKey(person, 'mid', 'mother');
	        DownloadJson.changeKey(person, 'fid', 'farther');
	        DownloadJson.changeKey(person, 'pids', 'partners');
	      });
	      DownloadJson.download(_this.nodeList.persons, "familyTree");
	    });
	    setTimeout(function () {
	      _this.reload();
	    }, 300);
	  }
	  babelHelpers.createClass(CreationTree, [{
	    key: "reload",
	    value: function reload() {
	      var _this2 = this;
	      var id = parseInt(window.location.href.match(/\d+/));
	      Requests.loadNodes(id).then(function (nodeList) {
	        _this2.nodeList = nodeList;
	        _this2.nodeList.persons.forEach(function (person) {
	          person.birthDate = new Date(person.birthDate);
	          person.active = person.active !== '0';
	          var newStyles = document.createElement('style');
	          document.head.append(newStyles);
	          if (person.active) {
	            newStyles.innerHTML = "svg.hugo [data-n-id=\"".concat(person.id, "\"].node>rect {\n\t\t\t\t\t\t\tfill: #FFE13E\n\t\t\t\t\t\t}");
	          } else {
	            if (person.gender.length !== 0) {
	              newStyles.innerHTML = "svg.hugo [data-n-id=\"".concat(person.id, "\"].node>rect {\n\t\t\t\t\t\t\tfill: url(#hugo_grad_").concat(person.gender, ")\n\t\t\t\t\t\t}");
	            }
	          }
	        });
	        _this2.render();
	      });
	    }
	  }, {
	    key: "tree",
	    value: function tree(nameTemplate) {
	      localStorage.setItem('template', nameTemplate);
	      var family = Family.create(this.nodeList.persons, nameTemplate);
	      if (nameTemplate === 'hugo') {
	        Original.stylingNode(family);
	      } else if (nameTemplate === 'sriniz') {
	        Sriniz.stylingNode(family);
	      } else if (nameTemplate === 'main') {
	        Multiple.stylingNode(family);
	      } else if (nameTemplate === 'john') {
	        John.stylingNode(family);
	      }
	      var self = this;
	      var buttonPDF = BX('pdf');
	      BX.bind(buttonPDF, 'click', function () {
	        family.exportPDF();
	      });
	      family.onUpdateNode(function (args) {
	        var updateNodes = args.updateNodesData;
	        var addNodes = args.addNodesData;
	        var removeNodes = args.removeNodeId;
	        if (Object.keys(addNodes).length !== 0 && Object.keys(updateNodes).length !== 0 && removeNodes === null && !addNodes[0].pids) {
	          if (updateNodes[0].mid) {
	            addNodes[0].child = {
	              mid: Number(updateNodes[0].id)
	            };
	          } else if (updateNodes[0].fid) {
	            addNodes[0].child = {
	              fid: Number(updateNodes[0].id)
	            };
	          }
	        }
	        if (Object.keys(updateNodes).length === 2 && addNodes[0].pids) {
	          updateNodes.forEach(function (node) {
	            if (node.fid && node.fid === addNodes[0].id) {
	              addNodes[0].child = {
	                fid: updateNodes[0].id
	              };
	            } else if (node.mid && node.mid === addNodes[0].id) {
	              addNodes[0].child = {
	                mid: updateNodes[0].id
	              };
	            }
	          });
	        }
	      });
	      family.nodeMenuUI.on('show', function (sender, args) {
	        args.menu = {
	          remove: {
	            text: 'Remove',
	            onClick: function onClick() {
	              if (typeof args.firstNodeId === "number") {
	                if (confirm("Are you sure you are going to remove this family member?")) {
	                  Requests.removeNode(args.firstNodeId).then(function (node) {
	                    self.reload();
	                  });
	                }
	              } else {
	                if (confirm("Are you sure you are going to remove this family member?")) {
	                  self.reload();
	                }
	              }
	            }
	          }
	        };
	      });
	      var onUpdateNodeAdded = false;
	      var onUpdatePerson = false;

	      // let id = this.nodeList.persons[0].id;
	      //
	      // family.onInit(() => {
	      // 	let root = Helper.getRootOf(family.getNode(id), family);
	      // 	family.config.roots = [root.id];
	      //
	      // 	if (root.id === id) {
	      // 		family.config.roots = null;
	      // 	}
	      //
	      // 	family.draw();
	      // });

	      family.on('init', function (sender, args) {
	        if (self.nodeList.persons.length === 1) {
	          sender.editUI.show(self.nodeList.persons[0].id, false);
	          var saveButton = document.querySelector('[data-edit-from-save]');
	          var inputName = document.querySelector('[data-binding="name"]');
	          inputName.addEventListener('input', function (el) {
	            saveButton.disabled = inputName.value.length <= 0;
	          });
	          var statusRequest = CreatedNode.requestCreationNode(self.nodeList.persons[0].id, family, onUpdateNodeAdded, onUpdatePerson, self);
	          onUpdateNodeAdded = statusRequest[0];
	          onUpdatePerson = statusRequest[1];
	          var form = document.querySelector('.bft-edit-form');
	          var editForm = document.querySelector('.bft-form-fieldset');
	          var warningName = document.querySelector('[data-bft-edit-from-btns]');
	          var textWarning = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"warning-text\">*\u041F\u043E\u043B\u0435 \"\u0438\u043C\u044F\" \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C</div>\n\t\t\t\t\t"])));
	          BX.append(textWarning, warningName);
	          form.enctype = "multipart/form-data";
	          form.action = '/tree/{id}/';
	          var formFile = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<label class=\"input-file\">\n\t\t\t\t\t<span class=\"input-file-text\" type=\"text\"></span>\n\t\t\t\t\t<input id=\"photoName\" type=\"file\" name=\"photo\">\n\t\t\t\t\t<span class=\"input-file-btn\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B</span>\n\t\t\t\t</label>\n\t\t\t\t"])));
	          editForm.append(formFile);
	          BX('photoName').addEventListener('change', function () {
	            var file = this.files[0];
	            document.querySelector('.input-file-text').innerHTML = file.name;
	          });
	        }
	      });
	      family.on('updated', function (sender, args) {
	        if (args.addNodesData.length !== 0) {
	          if (typeof args.addNodesData[0].id === 'string') {
	            sender.editUI.show(args.addNodesData[0].id, false);
	            var saveButton = document.querySelector('[data-edit-from-save]');
	            saveButton.disabled = true;
	            var inputName = document.querySelector('[data-binding="name"]');
	            inputName.addEventListener('input', function (el) {
	              saveButton.disabled = inputName.value.length <= 0;
	            });
	            onUpdateNodeAdded = CreatedNode.addRequestNode(family, onUpdateNodeAdded, self);
	            var form = document.querySelector('.bft-edit-form');
	            var editForm = document.querySelector('.bft-form-fieldset');
	            var warningName = document.querySelector('[data-bft-edit-from-btns]');
	            var textWarning = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"warning-text\">*\u041F\u043E\u043B\u0435 \"\u0438\u043C\u044F\" \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C</div>\n\t\t\t\t\t"])));
	            BX.append(textWarning, warningName);
	            form.enctype = "multipart/form-data";
	            form.action = '/tree/{id}/';
	            var formFile = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t<label class=\"input-file\">\n\t\t\t\t\t\t<span class=\"input-file-text\" type=\"text\"></span>\n\t\t\t\t\t\t<input id=\"photoName\" type=\"file\" name=\"photo\">\n\t\t\t\t\t\t<span class=\"input-file-btn\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B</span>\n\t\t\t\t\t</label>\n\t\t\t\t\t"])));
	            editForm.append(formFile);
	            BX('photoName').addEventListener('change', function () {
	              var file = this.files[0];
	              document.querySelector('.input-file-text').innerHTML = file.name;
	            });
	            var closeButton = document.querySelector('[data-edit-from-cancel]');
	            var clonedButton = closeButton.cloneNode(true);
	            closeButton.parentNode.replaceChild(clonedButton, closeButton);
	            clonedButton.addEventListener('click', function () {
	              if (confirm("The node you created will not be saved. Are you sure you want to close the form?")) {
	                sender.editUI.hide();
	              }
	            });
	            family.editUI.on('hide', function () {
	              self.reload();
	            });
	          }
	        }
	      });
	      family.on('click', function (sender, args) {
	        var statusRequest = CreatedNode.requestCreationNode(args.node.id, family, onUpdateNodeAdded, onUpdatePerson, self);
	        onUpdateNodeAdded = statusRequest[0];
	        onUpdatePerson = statusRequest[1];
	        sender.editUI.show(args.node.id, false);
	        var saveButton = document.querySelector('[data-edit-from-save]');
	        var inputName = document.querySelector('[data-binding="name"]');
	        inputName.addEventListener('input', function (el) {
	          saveButton.disabled = inputName.value.length <= 0;
	        });
	        var form = document.querySelector('.bft-edit-form');
	        var editForm = document.querySelector('.bft-form-fieldset');
	        var warningName = document.querySelector('[data-bft-edit-from-btns]');
	        var textWarning = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"warning-text\">*\u041F\u043E\u043B\u0435 \"\u0438\u043C\u044F\" \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C</div>\n\t\t\t\t\t"])));
	        BX.append(textWarning, warningName);
	        form.enctype = "multipart/form-data";
	        form.action = '/tree/{id}/';
	        var formFile = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<label class=\"input-file\">\n\t\t\t\t\t<span class=\"input-file-text\" type=\"text\"></span>\n\t\t\t\t\t<input id=\"photoName\" type=\"file\" name=\"photo\">\n\t\t\t\t\t<span class=\"input-file-btn\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B</span>\n\t\t\t\t</label>\n\t\t\t"])));
	        editForm.append(formFile);
	        BX('photoName').addEventListener('change', function () {
	          var file = this.files[0];
	          document.querySelector('.input-file-text').innerHTML = file.name;
	        });
	        return false;
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	      Helper.addRelation(this.nodeList);
	      if (localStorage.getItem('template')) {
	        this.tree(localStorage.getItem('template'));
	      } else {
	        this.tree('hugo');
	      }
	      BX('tree').style.backgroundColor = localStorage.getItem('mode') ? localStorage.getItem('mode') : '#F1F9F8';
	      if (localStorage.getItem('mode')) {
	        if (localStorage.getItem('mode') === '#000000') {
	          BX('color_mode').checked = true;
	        }
	      }
	      BX('navbar-purchases').innerHTML = localStorage.getItem('titleTemplate') ? localStorage.getItem('titleTemplate') : 'Skins';
	      if (!this.isHandlerAdded) {
	        BX.bind(BX('Sriniz'), 'click', function () {
	          _this3.tree('sriniz');
	          localStorage.setItem('titleTemplate', 'Sriniz');
	          _this3.reload();
	        });
	        BX.bind(BX('color_mode'), 'click', function () {
	          var template = localStorage.getItem('template') ? localStorage.getItem('template') : 'hugo';
	          if (BX('color_mode').checked) {
	            localStorage.setItem('mode', '#000000');
	            _this3.tree(template);
	            _this3.reload();
	          } else {
	            localStorage.setItem('mode', '#F1F9F8');
	            _this3.tree(template);
	            _this3.reload();
	          }
	        });
	        BX.bind(BX('Hugo'), 'click', function () {
	          _this3.tree('hugo');
	          localStorage.setItem('titleTemplate', 'Hugo');
	          _this3.reload();
	        });
	        BX.bind(BX('Multiple'), 'click', function () {
	          _this3.tree('main');
	          localStorage.setItem('titleTemplate', 'Multiple');
	          _this3.reload();
	        });
	        BX.bind(BX('Royal'), 'click', function () {
	          _this3.tree('john');
	          localStorage.setItem('titleTemplate', 'Royal');
	          _this3.reload();
	        });
	        BX.bind(BX('logout'), 'click', function () {
	          localStorage.clear();
	        });
	        this.isHandlerAdded = true;
	      }
	    }
	  }]);
	  return CreationTree;
	}();

	exports.CreationTree = CreationTree;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
