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
	    key: "getListSubscription",
	    value: function getListSubscription() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.getListSubscription').then(function (response) {
	          var listSubscription = response.data.listSubscription;
	          resolve(listSubscription);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getListPurchase",
	    value: function getListPurchase() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.getListPurchase').then(function (response) {
	          var listPurchase = response.data.listPurchase;
	          resolve(listPurchase);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getListUserSubscriptions",
	    value: function getListUserSubscriptions() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.getListUserSubscription').then(function (response) {
	          var listUserSubscriptions = response.data.listUserSubscriptions;
	          resolve(listUserSubscriptions);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "updateUserSubscription",
	    value: function updateUserSubscription(newUserSubscription) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.updateUserSubscription', {
	          data: {
	            newUserSubscription: newUserSubscription
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getListUserPurchase",
	    value: function getListUserPurchase() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.getListUserPurchase').then(function (response) {
	          var listUserPurchase = response.data.listUserPurchase;
	          resolve(listUserPurchase);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "deactivationSubscription",
	    value: function deactivationSubscription(id, active) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.deactivationSubscription', {
	          data: {
	            id: id,
	            active: active
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "removePurchase",
	    value: function removePurchase(purchaseId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.removePurchase', {
	          data: {
	            purchaseId: purchaseId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "removePurchaseUser",
	    value: function removePurchaseUser(userId, purchaseId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.removePurchaseUserRelation', {
	          data: {
	            userId: userId,
	            purchaseId: purchaseId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "updateSubscription",
	    value: function updateSubscription(newSubscription) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.updateSubscription', {
	          data: {
	            newSubscription: newSubscription
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addSubscription",
	    value: function addSubscription(subscription) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.addSubscription', {
	          data: {
	            subscription: subscription
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addPurchase",
	    value: function addPurchase(purchase) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.addPurchase', {
	          data: {
	            purchase: purchase
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addPurchaseUser",
	    value: function addPurchaseUser(userId, purchaseId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.admin.addPurchaseUserRelation', {
	          data: {
	            userId: userId,
	            purchaseId: purchaseId
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
	var RenderForm = /*#__PURE__*/function () {
	  function RenderForm() {
	    babelHelpers.classCallCheck(this, RenderForm);
	  }
	  babelHelpers.createClass(RenderForm, null, [{
	    key: "render",
	    value: function render(data) {
	      return main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"sign-up-modal\">\n\t\t\t<div class=\"logo-container\">\n\t\t\t\t<svg height=\"90px\" width=\"90px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t</style>\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<path class=\"st0\" d=\"M465.771,234.587c0-26.914-10.749-51.289-28.142-69.166c0.629-4.688,1.075-9.437,1.075-14.301\n\t\t\t\t\t\tc0-54.151-40.625-98.726-93.05-105.14C319.308,17.754,281.874,0,240.206,0C160.476,0,95.853,64.624,95.853,144.361\n\t\t\t\t\t\tc0,0.422,0.062,0.821,0.062,1.236c-29.975,20.27-49.686,54.58-49.686,93.494c0,53.346,37.08,97.937,86.842,109.667\n\t\t\t\t\t\tc10.089,24.69,34.318,42.106,62.636,42.106c10.557,0,20.508-2.486,29.407-6.798V512h77.528v-83.988l30.236-51.657\n\t\t\t\t\t\tc30.95-2.256,57.097-21.766,68.743-49.033C439.087,313.128,465.771,277.022,465.771,234.587z M260.615,342.229\n\t\t\t\t\t\tc0.66,0.928,1.343,1.826,2.041,2.724l-3.43,1.396C259.725,344.984,260.208,343.625,260.615,342.229z M284.874,405.402v-40.579\n\t\t\t\t\t\tc7.181,4.366,15.076,7.642,23.492,9.622L284.874,405.402z\"/>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t\n\t\t\t<form class=\"details\">\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"name\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"name\" type=\"text\" placeholder=\"Name\"/>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"price\">\u0426\u0435\u043D\u0430:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"price\" type=\"number\" placeholder=\"Price\" min=\"0\"/>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"input-container-number\">\n\t\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t\t<label class=\"modal-form-label\" for=\"numberTrees\">\u041A\u043E\u043B\u0438\u0447\u0435\u0442\u0441\u0432\u043E \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432:</label>\n\t\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"numberTrees\" type=\"number\" placeholder=\"Number trees\" min=\"0\"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t\t<label class=\"modal-form-label\" for=\"numberNodes\">\u041A\u043E\u043B\u0438\u0447\u0435\u0442\u0441\u0432\u043E \u0432\u0435\u0440\u0448\u0438\u043D:</label>\n\t\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\"  value=\"", "\" id=\"numberNodes\" type=\"number\" placeholder=\"Number nodes\" min=\"0\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"customization\">\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u043A\u043E\u0441\u0442\u0430\u043C\u0438\u0437\u0430\u0446\u0438\u044E:</label>\n\t\t\t\t\t<select id=\"customization-select\" class=\"modal-select\" name=\"customization\">\n\t\t\t\t\t\t<option class=\"modal-option\" value=\"1\">\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C</option>\n\t\t\t\t\t\t<option class=\"modal-option\" value=\"0\">\u0417\u0430\u043F\u0440\u0435\u0442\u0438\u0442\u044C</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t\t<input id=\"edit-button\" class=\"add\" type=\"submit\" value=\"", "\">\n\t\t\t</form>\n\t\t</div>\n\t\t"])), data !== null ? data.level : '', data !== null ? data.price : '', data !== null ? data.numberTrees : '', data !== null ? data.numberNodes : '', data !== null ? 'Edit' : 'Add');
	    }
	  }]);
	  return RenderForm;
	}();

	var _templateObject$1;
	var Form = /*#__PURE__*/function () {
	  function Form() {
	    babelHelpers.classCallCheck(this, Form);
	  }
	  babelHelpers.createClass(Form, null, [{
	    key: "render",
	    value: function render() {
	      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
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
	            this.setContent(RenderForm.render(data));
	            if (data !== null) {
	              var options = document.querySelectorAll('.modal-option');
	              options.forEach(function (option) {
	                if (Number(option.value) === data.customization) {
	                  option.selected = true;
	                }
	              });
	              BX.bind(BX('edit-button'), 'click', function (event) {
	                event.preventDefault();
	                var spinner = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t"])));
	                BX.append(spinner, BX('table'));
	                var newSubscription = {
	                  id: Number(data.id),
	                  level: BX('name').value,
	                  price: BX('price').value,
	                  numberTrees: BX('numberTrees').value,
	                  numberNodes: BX('numberNodes').value,
	                  customization: Number(BX('customization-select').value)
	                };
	                Requests.updateSubscription(newSubscription).then(function (result) {
	                  new Admin({
	                    rootNodeId: 'table'
	                  });
	                  _this.destroy();
	                });
	              });
	            }
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

	var _templateObject$2, _templateObject2, _templateObject3;
	var SubscriptionTable = /*#__PURE__*/function () {
	  function SubscriptionTable() {
	    babelHelpers.classCallCheck(this, SubscriptionTable);
	  }
	  babelHelpers.createClass(SubscriptionTable, null, [{
	    key: "render",
	    value: function render(data) {
	      var headingTable = main_core.Tag.render(_templateObject$2 || (_templateObject$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"table-header\">\n\t\t\t\t<div class=\"table-head col col-1\">ID</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0426\u0435\u043D\u0430</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u041A\u043E\u043B-\u0432\u043E \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u041A\u043E\u043B-\u0432\u043E \u0432\u0435\u0440\u0448\u0438\u043D</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u041A\u0430\u0441\u0442\u043E\u043C\u0438\u0437\u0430\u0446\u0438\u044F</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0421\u0442\u0430\u0442\u0443\u0441</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F</div>\n\t\t\t</li>\n\t\t"])));
	      var dataSub = this.renderList(data);
	      var table = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<ul id=\"subList\" class=\"responsive-table\"></ul>\n\t\t"])));
	      BX.append(headingTable, table);
	      dataSub.forEach(function (el) {
	        BX.append(el, table);
	      });
	      return table;
	    }
	  }, {
	    key: "renderList",
	    value: function renderList(data) {
	      return data.map(function (sub) {
	        return main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"table-row\">\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"id\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"level\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"price\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"numberTrees\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"numberNodest\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"customization\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"customization\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"action\">\n\t\t\t\t\t\t<ul class=\"action-list\">\n\t\t\t\t\t\t\t<li class=\"action-item\">\n\t\t\t\t\t\t\t\t<label class=\"checkbox\">\n\t\t\t\t\t\t\t\t\t<input class=\"input-checkbox\" data-btn-id=\"", "\" ", " type=\"checkbox\" />\n\t\t\t\t\t\t\t\t\t<svg viewBox=\"0 0 21 18\">\n\t\t\t\t\t\t\t\t\t\t<symbol id=\"tick-path", "\" viewBox=\"0 0 21 18\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t\t\t<path d=\"M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69\" fill=\"none\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n\t\t\t\t\t\t\t\t\t\t</symbol>\n\t\t\t\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t\t\t\t\t<mask id=\"tick", "\">\n\t\t\t\t\t\t\t\t\t\t\t\t<use class=\"tick mask\" href=\"#tick-path", "\" />\n\t\t\t\t\t\t\t\t\t\t\t</mask>\n\t\t\t\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t\t\t\t<use class=\"tick\" href=\"#tick-path", "\" stroke=\"currentColor\" />\n\t\t\t\t\t\t\t\t\t\t<path fill=\"white\" mask=\"url(#tick", ")\" d=\"M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z\" />\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t<svg class=\"lines\" viewBox=\"0 0 11 11\">\n\t\t\t\t\t\t\t\t\t\t<path d=\"M5.88086 5.89441L9.53504 4.26746\" />\n\t\t\t\t\t\t\t\t\t\t<path d=\"M5.5274 8.78838L9.45391 9.55161\" />\n\t\t\t\t\t\t\t\t\t\t<path d=\"M3.49371 4.22065L5.55387 0.79198\" />\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li class=\"action-item\">\n\t\t\t\t\t\t\t\t<button data-btn-id=\"", "\" id=\"btnEdit\" class=\"action-list-btn edit\">\n\t\t\t\t\t\t\t\t\t<svg data-btn-id=\"", "\" class=\"btn-svg\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t\t<path data-btn-id=\"", "\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z\" fill=\"green\"/>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t"])), BX.util.htmlspecialchars(sub.id), BX.util.htmlspecialchars(sub.level), BX.util.htmlspecialchars(sub.price), BX.util.htmlspecialchars(sub.numberTrees), BX.util.htmlspecialchars(sub.numberNodes), !!sub.customization ? 'Разрешить' : 'Запретить', !!sub.isActive ? 'Активна' : 'Неактивна', sub.id, sub.isActive ? "checked" : '', sub.id, sub.id, sub.id, sub.id, sub.id, sub.id, sub.id, sub.id);
	      });
	    }
	  }]);
	  return SubscriptionTable;
	}();

	var _templateObject$3, _templateObject2$1, _templateObject3$1;
	var PurchaseTable = /*#__PURE__*/function () {
	  function PurchaseTable() {
	    babelHelpers.classCallCheck(this, PurchaseTable);
	  }
	  babelHelpers.createClass(PurchaseTable, null, [{
	    key: "render",
	    value: function render(data) {
	      var headingTable = main_core.Tag.render(_templateObject$3 || (_templateObject$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"table-header\">\n\t\t\t\t<div class=\"table-head col col-1\">ID</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u041D\u0410\u0417\u0412\u0410\u041D\u0418\u0415</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0426\u0415\u041D\u0410</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F</div>\n\t\t\t</li>\n\t\t"])));
	      var dataPurchase = this.renderList(data);
	      var table = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<ul class=\"responsive-table\"></ul>\n\t\t"])));
	      BX.append(headingTable, table);
	      dataPurchase.forEach(function (el) {
	        BX.append(el, table);
	      });
	      return table;
	    }
	  }, {
	    key: "renderList",
	    value: function renderList(data) {
	      return data.map(function (purchase) {
	        return main_core.Tag.render(_templateObject3$1 || (_templateObject3$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"table-row\">\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Id\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Title\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Price\">", "</div>\n\t\t\t\t\t\t<ul class=\"action-list\">\n\t\t\t\t\t\t\t<li class=\"action-item\">\n\t\t\t\t\t\t\t\t<button class=\"action-list-btn remove\" data-btn-id=\"", "\" >\n\t\t\t\t\t\t\t\t\t<svg data-btn-id=\"", "\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t\t<path data-btn-id=\"", "\" d=\"M10 12V17\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t\t<path data-btn-id=\"", "\" d=\"M14 12V17\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t\t<path data-btn-id=\"", "\" d=\"M4 7H20\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t\t<path data-btn-id=\"", "\" d=\"M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t\t<path data-btn-id=\"", "\" d=\"M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li class=\"action-item\">\n\t\t\t\t\t\t\t\t<button data-btn-id=\"", "\" id=\"btnEdit\" class=\"action-list-btn edit\">\n\t\t\t\t\t\t\t\t\t<svg data-btn-id=\"", "\" class=\"btn-svg\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t\t<path data-btn-id=\"", "\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z\" fill=\"green\"/>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t"])), purchase.ID, purchase.TITLE, purchase.PRICE, purchase.ID, purchase.ID, purchase.ID, purchase.ID, purchase.ID, purchase.ID, purchase.ID, purchase.ID, purchase.ID, purchase.ID);
	      });
	    }
	  }]);
	  return PurchaseTable;
	}();

	var _templateObject$4, _templateObject2$2, _templateObject3$2;
	var UserSubscriptionsTable = /*#__PURE__*/function () {
	  function UserSubscriptionsTable() {
	    babelHelpers.classCallCheck(this, UserSubscriptionsTable);
	  }
	  babelHelpers.createClass(UserSubscriptionsTable, null, [{
	    key: "render",
	    value: function render(data) {
	      var headingTable = main_core.Tag.render(_templateObject$4 || (_templateObject$4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"table-header\">\n\t\t\t\t<div class=\"table-head col col-1\">ID \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div>\n\t\t\t\t<div class=\"table-head col col-1\">ID \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u041A\u043E\u043B-\u0432\u043E \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u041A\u043E\u043B-\u0432\u043E \u0432\u0435\u0440\u0448\u0438\u043D</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u043A\u0443\u043F\u043A\u0438</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F</div>\n\t\t\t</li>\n\t\t"])));
	      var dataUserSub = this.renderList(data);
	      var table = main_core.Tag.render(_templateObject2$2 || (_templateObject2$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<ul class=\"responsive-table\"></ul>\n\t\t"])));
	      BX.append(headingTable, table);
	      dataUserSub.forEach(function (el) {
	        BX.append(el, table);
	      });
	      return table;
	    }
	  }, {
	    key: "renderList",
	    value: function renderList(data) {
	      return data.map(function (userSub) {
	        return main_core.Tag.render(_templateObject3$2 || (_templateObject3$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"table-row\">\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Job Id\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Customer Name\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Amount\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Payment Status\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Amount\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Customer Name\">\n\t\t\t\t\t\t<ul class=\"action-list\">\n\t\t\t\t\t\t\t<li class=\"action-item\">\n\t\t\t\t\t\t\t\t<button data-user-id=\"", "\" class=\"action-list-btn\">\n\t\t\t\t\t\t\t\t\t<svg data-user-id=\"", "\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t\t<path data-user-id=\"", "\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z\" fill=\"green\"/>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t"])), userSub.userId, userSub.subscriptionId, userSub.countTrees, userSub.countNodes, String(userSub.buyTime), userSub.userId, userSub.userId, userSub.userId);
	      });
	    }
	  }]);
	  return UserSubscriptionsTable;
	}();

	var _templateObject$5, _templateObject2$3, _templateObject3$3;
	var UserPurchaseTable = /*#__PURE__*/function () {
	  function UserPurchaseTable() {
	    babelHelpers.classCallCheck(this, UserPurchaseTable);
	  }
	  babelHelpers.createClass(UserPurchaseTable, null, [{
	    key: "render",
	    value: function render(data) {
	      var headingTable = main_core.Tag.render(_templateObject$5 || (_templateObject$5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"table-header\">\n\t\t\t\t<div class=\"table-head col col-1\">ID \u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u042F</div>\n\t\t\t\t<div class=\"table-head col col-1\">ID \u041F\u041E\u041A\u0423\u041F\u041A\u0418</div>\n\t\t\t\t<div class=\"table-head col col-1\">\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F</div>\n\t\t\t</li>\n\t\t"])));
	      var dataUserPurchase = this.renderList(data);
	      var table = main_core.Tag.render(_templateObject2$3 || (_templateObject2$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<ul class=\"responsive-table\"></ul>\n\t\t"])));
	      BX.append(headingTable, table);
	      dataUserPurchase.forEach(function (el) {
	        BX.append(el, table);
	      });
	      return table;
	    }
	  }, {
	    key: "renderList",
	    value: function renderList(data) {
	      return data.map(function (userPurchase) {
	        return main_core.Tag.render(_templateObject3$3 || (_templateObject3$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"table-row\">\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Job Id\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Customer Name\">", "</div>\n\t\t\t\t\t<div class=\"col col-1\" data-label=\"Customer Name\">\n\t\t\t\t\t\t\t<button class=\"action-list-btn remove__user_purchase\" data-btn-user-id=\"", "\" data-btn-purchase-id=\"", "\">\n\t\t\t\t\t\t\t\t<svg data-btn-user-id=\"", "\" data-btn-purchase-id=\"", "\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t<path data-btn-user-id=\"", "\" data-btn-purchase-id=\"", "\" d=\"M10 12V17\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t<path data-btn-user-id=\"", "\" data-btn-purchase-id=\"", "\" d=\"M14 12V17\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t<path data-btn-user-id=\"", "\" data-btn-purchase-id=\"", "\" d=\"M4 7H20\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t<path data-btn-user-id=\"", "\" data-btn-purchase-id=\"", "\" d=\"M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t<path data-btn-user-id=\"", "\" data-btn-purchase-id=\"", "\" d=\"M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z\" stroke=\"red\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t"])), userPurchase.userId, userPurchase.singlePurchaseId, userPurchase.userId, userPurchase.singlePurchaseId, userPurchase.userId, userPurchase.singlePurchaseId, userPurchase.userId, userPurchase.singlePurchaseId, userPurchase.userId, userPurchase.singlePurchaseId, userPurchase.userId, userPurchase.singlePurchaseId, userPurchase.userId, userPurchase.singlePurchaseId, userPurchase.userId, userPurchase.singlePurchaseId);
	      });
	    }
	  }]);
	  return UserPurchaseTable;
	}();

	var _templateObject$6;
	var RenderForm$1 = /*#__PURE__*/function () {
	  function RenderForm() {
	    babelHelpers.classCallCheck(this, RenderForm);
	  }
	  babelHelpers.createClass(RenderForm, null, [{
	    key: "render",
	    value: function render(data) {
	      return main_core.Tag.render(_templateObject$6 || (_templateObject$6 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"sign-up-modal\">\n\t\t\t<div class=\"logo-container\">\n\t\t\t\t<svg height=\"90px\" width=\"90px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t</style>\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<path class=\"st0\" d=\"M465.771,234.587c0-26.914-10.749-51.289-28.142-69.166c0.629-4.688,1.075-9.437,1.075-14.301\n\t\t\t\t\t\tc0-54.151-40.625-98.726-93.05-105.14C319.308,17.754,281.874,0,240.206,0C160.476,0,95.853,64.624,95.853,144.361\n\t\t\t\t\t\tc0,0.422,0.062,0.821,0.062,1.236c-29.975,20.27-49.686,54.58-49.686,93.494c0,53.346,37.08,97.937,86.842,109.667\n\t\t\t\t\t\tc10.089,24.69,34.318,42.106,62.636,42.106c10.557,0,20.508-2.486,29.407-6.798V512h77.528v-83.988l30.236-51.657\n\t\t\t\t\t\tc30.95-2.256,57.097-21.766,68.743-49.033C439.087,313.128,465.771,277.022,465.771,234.587z M260.615,342.229\n\t\t\t\t\t\tc0.66,0.928,1.343,1.826,2.041,2.724l-3.43,1.396C259.725,344.984,260.208,343.625,260.615,342.229z M284.874,405.402v-40.579\n\t\t\t\t\t\tc7.181,4.366,15.076,7.642,23.492,9.622L284.874,405.402z\"/>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t\n\t\t\t<form class=\"details\">\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"title\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0438:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"title\" type=\"text\" placeholder=\"Name\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"price\">\u0426\u0435\u043D\u0430:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"price\" type=\"number\" placeholder=\"Price\" min=\"0\"/>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<input id=\"edit-button\" class=\"add\" type=\"submit\" value=\"", "\">\n\t\t\t</form>\n\t\t</div>\n\t\t"])), data !== null ? data.TITLE : '', data !== null ? data.PRICE : '', data !== null ? 'Edit' : 'Add');
	    }
	  }]);
	  return RenderForm;
	}();

	var _templateObject$7;
	var FormPurchase = /*#__PURE__*/function () {
	  function FormPurchase() {
	    babelHelpers.classCallCheck(this, FormPurchase);
	  }
	  babelHelpers.createClass(FormPurchase, null, [{
	    key: "render",
	    value: function render() {
	      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
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
	            this.setContent(RenderForm$1.render(data));
	            if (data !== null) {
	              var options = document.querySelectorAll('.modal-option');
	              options.forEach(function (option) {
	                if (Number(option.value) === data.customization) {
	                  option.selected = true;
	                }
	              });
	              BX.bind(BX('edit-button'), 'click', function (event) {
	                event.preventDefault();
	                var spinner = main_core.Tag.render(_templateObject$7 || (_templateObject$7 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t"])));
	                BX.append(spinner, BX('table'));
	                var newPurchase = {
	                  id: Number(data.ID),
	                  title: BX('title').value,
	                  // id
	                  price: BX('price').value
	                };
	                console.log(newPurchase);
	                Requests.updatePurchase(newPurchase).then(function (result) {
	                  new Admin({
	                    rootNodeId: 'table'
	                  });
	                  _this.destroy();
	                });
	              });
	            }
	          },
	          onPopupClose: function onPopupClose() {
	            this.destroy();
	          }
	        }
	      });
	      modalPopup.show();
	    }
	  }]);
	  return FormPurchase;
	}();

	var _templateObject$8;
	var RenderForm$2 = /*#__PURE__*/function () {
	  function RenderForm() {
	    babelHelpers.classCallCheck(this, RenderForm);
	  }
	  babelHelpers.createClass(RenderForm, null, [{
	    key: "render",
	    value: function render(data) {
	      console.log(data);
	      console.log(data.userId);
	      console.log(data.purchaseId);
	      return main_core.Tag.render(_templateObject$8 || (_templateObject$8 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"sign-up-modal\">\n\t\t\t<div class=\"logo-container\">\n\t\t\t\t<svg height=\"90px\" width=\"90px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t</style>\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<path class=\"st0\" d=\"M465.771,234.587c0-26.914-10.749-51.289-28.142-69.166c0.629-4.688,1.075-9.437,1.075-14.301\n\t\t\t\t\t\tc0-54.151-40.625-98.726-93.05-105.14C319.308,17.754,281.874,0,240.206,0C160.476,0,95.853,64.624,95.853,144.361\n\t\t\t\t\t\tc0,0.422,0.062,0.821,0.062,1.236c-29.975,20.27-49.686,54.58-49.686,93.494c0,53.346,37.08,97.937,86.842,109.667\n\t\t\t\t\t\tc10.089,24.69,34.318,42.106,62.636,42.106c10.557,0,20.508-2.486,29.407-6.798V512h77.528v-83.988l30.236-51.657\n\t\t\t\t\t\tc30.95-2.256,57.097-21.766,68.743-49.033C439.087,313.128,465.771,277.022,465.771,234.587z M260.615,342.229\n\t\t\t\t\t\tc0.66,0.928,1.343,1.826,2.041,2.724l-3.43,1.396C259.725,344.984,260.208,343.625,260.615,342.229z M284.874,405.402v-40.579\n\t\t\t\t\t\tc7.181,4.366,15.076,7.642,23.492,9.622L284.874,405.402z\"/>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t\n\t\t\t<form class=\"details\">\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"userId\">ID \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"userId\" type=\"number\" placeholder=\"User ID\" min=\"0\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"purchaseId\">ID \u043F\u043E\u043A\u0443\u043F\u043A\u0438:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"purchaseId\" type=\"number\" placeholder=\"Purchase ID\"  min=\"0\"/>\n\t\t\t\t</div>\n\t\t\t\t<input id=\"action-button\" type=\"submit\" value=\"Edit\">\n\t\t\t</form>\n\t\t</div>\n\t\t"])), data.userId, data.purchaseId);
	    }
	  }]);
	  return RenderForm;
	}();

	var _templateObject$9;
	var FormUserPurchase = /*#__PURE__*/function () {
	  function FormUserPurchase() {
	    babelHelpers.classCallCheck(this, FormUserPurchase);
	  }
	  babelHelpers.createClass(FormUserPurchase, null, [{
	    key: "render",
	    value: function render(data) {
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
	            this.setContent(RenderForm$2.render(data));
	            BX.bind(BX('action-button'), 'click', function (event) {
	              event.preventDefault();
	              var spinner = main_core.Tag.render(_templateObject$9 || (_templateObject$9 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t"])));
	              BX.append(spinner, BX('table'));
	              var newUserSubscription = {
	                //
	                userId: Number(data.userId),
	                subscriptionId: BX('subId').value,
	                countTrees: BX('countTrees').value,
	                countNodes: BX('countNodes').value,
	                buyTime: BX('buyTime').value.length !== 0 ? BX('buyTime').value : null
	              };
	              Requests.updateUserSubscription(newUserSubscription).then(function (result) {
	                new Admin({
	                  rootNodeId: 'table'
	                });
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
	  return FormUserPurchase;
	}();

	var _templateObject$a;
	var RenderForm$3 = /*#__PURE__*/function () {
	  function RenderForm() {
	    babelHelpers.classCallCheck(this, RenderForm);
	  }
	  babelHelpers.createClass(RenderForm, null, [{
	    key: "render",
	    value: function render(data) {
	      return main_core.Tag.render(_templateObject$a || (_templateObject$a = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"sign-up-modal\">\n\t\t\t<div class=\"logo-container\">\n\t\t\t\t<svg height=\"90px\" width=\"90px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t</style>\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<path class=\"st0\" d=\"M465.771,234.587c0-26.914-10.749-51.289-28.142-69.166c0.629-4.688,1.075-9.437,1.075-14.301\n\t\t\t\t\t\tc0-54.151-40.625-98.726-93.05-105.14C319.308,17.754,281.874,0,240.206,0C160.476,0,95.853,64.624,95.853,144.361\n\t\t\t\t\t\tc0,0.422,0.062,0.821,0.062,1.236c-29.975,20.27-49.686,54.58-49.686,93.494c0,53.346,37.08,97.937,86.842,109.667\n\t\t\t\t\t\tc10.089,24.69,34.318,42.106,62.636,42.106c10.557,0,20.508-2.486,29.407-6.798V512h77.528v-83.988l30.236-51.657\n\t\t\t\t\t\tc30.95-2.256,57.097-21.766,68.743-49.033C439.087,313.128,465.771,277.022,465.771,234.587z M260.615,342.229\n\t\t\t\t\t\tc0.66,0.928,1.343,1.826,2.041,2.724l-3.43,1.396C259.725,344.984,260.208,343.625,260.615,342.229z M284.874,405.402v-40.579\n\t\t\t\t\t\tc7.181,4.366,15.076,7.642,23.492,9.622L284.874,405.402z\"/>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t\n\t\t\t<form class=\"details\">\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"subId\">ID \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"subId\" type=\"number\" placeholder=\"ID\" min=\"0\"/>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"countTrees\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"countTrees\" type=\"number\" placeholder=\"countTrees\" min=\"0\"/>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"countNodes\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0435\u0440\u0448\u0438\u043D:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"countNodes\" type=\"number\" placeholder=\"countNodes\" min=\"0\"/>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"input-container\">\n\t\t\t\t\t<label class=\"modal-form-label\" for=\"buyTime\">\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u043A\u0443\u043F\u043A\u0438:</label>\n\t\t\t\t\t<input class=\"col-sm-12 with-placeholder\" value=\"", "\" id=\"buyTime\" type=\"datetime-local\" step=\"2\" placeholder=\"buyTime\" />\n\t\t\t\t</div>\n\t\t\t\n\t\t\t\n\t\t\t\t<input id=\"edit-button\" type=\"submit\" value=\"Edit\">\n\t\t\t</form>\n\t\t</div>\n\t\t"])), data.subscriptionId, data.countTrees, data.countNodes, data.buyTime);
	    }
	  }]);
	  return RenderForm;
	}();

	var _templateObject$b;
	var FormUserSub = /*#__PURE__*/function () {
	  function FormUserSub() {
	    babelHelpers.classCallCheck(this, FormUserSub);
	  }
	  babelHelpers.createClass(FormUserSub, null, [{
	    key: "render",
	    value: function render(data) {
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
	            this.setContent(RenderForm$3.render(data));
	            BX.bind(BX('edit-button'), 'click', function (event) {
	              event.preventDefault();
	              var spinner = main_core.Tag.render(_templateObject$b || (_templateObject$b = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t"])));
	              BX.append(spinner, BX('table'));
	              var newUserSubscription = {
	                userId: Number(data.userId),
	                subscriptionId: BX('subId').value,
	                countTrees: BX('countTrees').value,
	                countNodes: BX('countNodes').value,
	                buyTime: BX('buyTime').value.length !== 0 ? BX('buyTime').value : null
	              };
	              Requests.updateUserSubscription(newUserSubscription).then(function (result) {
	                new Admin({
	                  rootNodeId: 'table'
	                });
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
	  return FormUserSub;
	}();

	var _templateObject$c, _templateObject2$4, _templateObject3$4, _templateObject4, _templateObject5, _templateObject6;
	var Admin = /*#__PURE__*/function () {
	  function Admin() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Admin);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Table: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Table: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.listSub = [];
	    this.listPurchase = [];
	    this.listUserSubscriptions = [];
	    this.listUserPurchase = [];
	    this.loadListSub();
	    this.setEvents();
	  }
	  babelHelpers.createClass(Admin, [{
	    key: "loadListSub",
	    value: function loadListSub() {
	      var _this = this;
	      Requests.getListSubscription().then(function (list) {
	        _this.rootNode.innerHTML = '';
	        _this.listSub = list;
	        var btns = document.querySelectorAll('.admin__btn');
	        btns.forEach(function (btn) {
	          BX.removeClass(btn, 'btn-active');
	        });
	        BX.addClass(BX('sub'), 'btn-active');
	        BX.append(SubscriptionTable.render(list), _this.rootNode);
	        var btnEdit = document.querySelectorAll('.edit');
	        var btnDeactivation = document.querySelectorAll('.deactivation');
	        var btnActivation = document.querySelectorAll('.activation');
	        var btnAdd = BX('add');
	        BX.bind(btnAdd, 'click', function () {
	          Form.render();
	          BX.bind(BX('edit-button'), 'click', function (event) {
	            event.preventDefault();
	            var spinner = main_core.Tag.render(_templateObject$c || (_templateObject$c = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])));
	            BX.append(spinner, _this.rootNode);
	            var subscription = {
	              level: BX('name').value,
	              price: Number(BX('price').value),
	              numberTrees: Number(BX('numberTrees').value),
	              numberNodes: Number(BX('numberNodes').value),
	              customization: Number(BX('customization-select').value)
	            };
	            Requests.addSubscription(subscription).then(function (result) {
	              _this.loadListSub();
	              document.querySelector('.popup-window').remove();
	              document.querySelector('.popup-window-overlay').remove();
	            });
	          });
	        });
	        btnEdit.forEach(function (btn) {
	          BX.bind(btn, 'click', function (event) {
	            var el = event.target;
	            console.log(el);
	            var data = _this.listSub.find(function (item) {
	              return item.id === Number(el.dataset.btnId);
	            });
	            console.log(data);
	            Form.render(data);
	          });
	        });
	        var checkbox = document.querySelectorAll('.input-checkbox');
	        checkbox.forEach(function (el) {
	          BX.bind(el, 'click', function (event) {
	            var id = event.target.dataset.btnId;
	            var spinner = main_core.Tag.render(_templateObject2$4 || (_templateObject2$4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])));
	            BX.append(spinner, _this.rootNode);
	            if (!el.checked) {
	              Requests.deactivationSubscription(Number(id), 0).then(function (result) {
	                _this.loadListSub();
	              });
	            } else {
	              Requests.deactivationSubscription(Number(id), 1).then(function (result) {
	                _this.loadListSub();
	              });
	            }
	          });
	        });
	      });
	    }
	  }, {
	    key: "loadListPurchase",
	    value: function loadListPurchase() {
	      var _this2 = this;
	      Requests.getListPurchase().then(function (list) {
	        _this2.rootNode.innerHTML = '';
	        _this2.listPurchase = list;
	        BX.append(PurchaseTable.render(list), _this2.rootNode);
	        var btns = document.querySelectorAll('.admin__btn');
	        var btnRemove = document.querySelectorAll('.remove');
	        var btnEdit = document.querySelectorAll('.edit');
	        var btnAdd = BX('add');
	        btns.forEach(function (btn) {
	          BX.removeClass(btn, 'btn-active');
	        });
	        BX.addClass(BX('purchase'), 'btn-active');
	        btnRemove.forEach(function (btn) {
	          BX.bind(btn, 'click', function (event) {
	            var id = event.target.dataset.btnId;
	            console.log(id);
	            var spinner = main_core.Tag.render(_templateObject3$4 || (_templateObject3$4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])));
	            BX.append(spinner, _this2.rootNode);
	            Requests.removePurchase(Number(id)).then(function (result) {
	              _this2.loadListPurchase();
	            });
	          });
	        });
	        btnEdit.forEach(function (btn) {
	          BX.bind(btn, 'click', function (event) {
	            var el = event.target;
	            console.log(_this2.listPurchase);
	            console.log(el.dataset.btnId);
	            var data = _this2.listPurchase.find(function (item) {
	              return Number(item.ID) === Number(el.dataset.btnId);
	            });
	            FormPurchase.render(data);
	          });
	        });
	        BX.bind(btnAdd, 'click', function () {
	          FormPurchase.render();
	          BX.bind(BX('edit-button'), 'click', function (event) {
	            event.preventDefault();
	            var spinner = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])));
	            BX.append(spinner, _this2.rootNode);
	            var purchase = {
	              title: BX('title').value,
	              price: Number(BX('price').value)
	            };
	            Requests.addPurchase(purchase).then(function (result) {
	              _this2.loadListPurchase();
	              document.querySelector('.popup-window').remove();
	              document.querySelector('.popup-window-overlay').remove();
	            });
	          });
	        });
	      });
	    }
	  }, {
	    key: "loadListUserSubscriptions",
	    value: function loadListUserSubscriptions() {
	      var _this3 = this;
	      Requests.getListUserSubscriptions().then(function (list) {
	        _this3.listUserSubscriptions = list;
	        var btns = document.querySelectorAll('.admin__btn');
	        btns.forEach(function (btn) {
	          BX.removeClass(btn, 'btn-active');
	        });
	        BX.addClass(BX('userSub'), 'btn-active');
	        _this3.rootNode.innerHTML = '';
	        BX.append(UserSubscriptionsTable.render(list), _this3.rootNode);
	        var editBtn = document.querySelectorAll('.action-list-btn');
	        editBtn.forEach(function (btn) {
	          BX.bind(btn, 'click', function (event) {
	            var userId = event.target.dataset.userId;
	            var data = _this3.listUserSubscriptions.find(function (item) {
	              return item.userId === Number(userId);
	            });
	            console.log(data);
	            FormUserSub.render(data);
	          });
	        });
	      });
	    }
	  }, {
	    key: "loadListUserPurchase",
	    value: function loadListUserPurchase() {
	      var _this4 = this;
	      Requests.getListUserPurchase().then(function (list) {
	        _this4.rootNode.innerHTML = '';
	        _this4.listPurchase = list;
	        BX.append(UserPurchaseTable.render(list), _this4.rootNode);
	        var btns = document.querySelectorAll('.admin__btn');
	        var btnRemove = document.querySelectorAll('.remove__user_purchase');
	        var btnAdd = BX('add');
	        console.log(btnRemove);
	        btns.forEach(function (btn) {
	          BX.removeClass(btn, 'btn-active');
	        });
	        BX.addClass(BX('userPurchase'), 'btn-active');
	        btnRemove.forEach(function (btn) {
	          BX.bind(btn, 'click', function (event) {
	            var purchaseId = event.target.dataset.btnPurchaseId;
	            console.log(purchaseId);
	            var userId = event.target.dataset.btnUserId;
	            console.log(userId);
	            console.log(event.target.dataset);
	            var spinner = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])));
	            BX.append(spinner, _this4.rootNode);
	            Requests.removePurchaseUser(Number(userId), Number(purchaseId)).then(function (result) {
	              _this4.loadListUserPurchase();
	            });
	          });
	        });
	        BX.bind(btnAdd, 'click', function () {
	          FormUserPurchase.render(list);
	          BX.bind(BX('action-button'), 'click', function (event) {
	            event.preventDefault();
	            var spinner = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"admin__spinner spinner-grow text-primary\" role=\"status\">\n\t\t\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"])));
	            BX.append(spinner, _this4.rootNode);
	            var userId = Number(BX('userId').value);
	            var purchaseId = Number(BX('purchaseId').value);
	            Requests.addPurchaseUser(userId, purchaseId).then(function (result) {
	              _this4.loadListUserPurchase();
	              document.querySelector('.popup-window').remove();
	              document.querySelector('.popup-window-overlay').remove();
	            });
	          });
	        });
	      });
	    }
	  }, {
	    key: "setEvents",
	    value: function setEvents() {
	      var _this5 = this;
	      var btnSub = BX('sub');
	      var btnPurchase = BX('purchase');
	      var btnUserSub = BX('userSub');
	      var btnUserPurchase = BX('userPurchase');
	      BX.bind(btnSub, 'click', function () {
	        _this5.loadListSub();
	      });
	      BX.bind(btnPurchase, 'click', function () {
	        _this5.loadListPurchase();
	      });
	      BX.bind(btnUserSub, 'click', function () {
	        _this5.loadListUserSubscriptions();
	      });
	      BX.bind(btnUserPurchase, 'click', function () {
	        _this5.loadListUserPurchase();
	      });
	    }
	  }]);
	  return Admin;
	}();

	exports.Admin = Admin;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
