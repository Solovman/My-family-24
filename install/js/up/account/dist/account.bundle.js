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
	    key: "getInformation",
	    value: function getInformation() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.account.getUserInfo', {}).then(function (response) {
	          var userInfo = response.data.userInfo;
	          resolve(userInfo);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var _templateObject;
	var Content = /*#__PURE__*/function () {
	  function Content() {
	    babelHelpers.classCallCheck(this, Content);
	  }
	  babelHelpers.createClass(Content, null, [{
	    key: "render",
	    value: function render() {
	      var icons = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div>test</div>\n\t\t"])));
	      return icons;
	    }
	  }]);
	  return Content;
	}();

	var Window = /*#__PURE__*/function () {
	  function Window() {
	    babelHelpers.classCallCheck(this, Window);
	  }
	  babelHelpers.createClass(Window, null, [{
	    key: "render",
	    value: function render() {
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
	            this.setContent(Content.render());
	          },
	          onPopupClose: function onPopupClose() {
	            this.destroy();
	          }
	        }
	      });
	      modalPopup.show();
	    }
	  }]);
	  return Window;
	}();

	var _templateObject$1;
	var Account = /*#__PURE__*/function () {
	  function Account() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Account);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Account: options.rootNodeId required');
	    }
	    this.rootNode = BX(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Account: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.nodeList = [];
	    this.reload();
	  }
	  babelHelpers.createClass(Account, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      Requests.getInformation().then(function (data) {
	        _this.nodeList = data;
	        _this.render();
	      });
	    }
	  }, {
	    key: "setEvents",
	    value: function setEvents() {
	      var btnOpenMenu = BX('open-menu-icon');
	      BX.bind(btnOpenMenu, 'click', function () {
	        Window.render();
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var data = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"profile-container\">\n\t\t\t\t<div class=\"image\">\n\t\t\t\t\t<img id=\"user-icon\" src=\"/local/modules/up.tree/images/tree-account.png\" alt=\"\u0424\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044F\">\n\t\t\t\t\t<div class=\"caption\">\n\t\t\t\t\t\t<button id=\"open-menu-icon\" class=\"lupa\">\n\t\t\t\t\t\t\t<svg height=\"50px\" width=\"50px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\t\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t\t\t\t</style>\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<path class=\"st0\" d=\"M84.523,84.523V512H512V84.523H84.523z M220.739,184.766c24.028,0,43.5,19.48,43.5,43.507\n\t\t\t\t\t\t\t\t\t\tc0,24.027-19.473,43.507-43.5,43.507c-24.027,0-43.507-19.48-43.507-43.507C177.232,204.246,196.712,184.766,220.739,184.766z\n\t\t\t\t\t\t\t\t\t\tM463.923,407.239c-1.494,2.776-4.398,4.517-7.556,4.517H140.156c-3.151,0-6.048-1.726-7.548-4.502\n\t\t\t\t\t\t\t\t\t\tc-1.501-2.777-1.359-6.153,0.375-8.787l55.311-84.276c3.669-5.59,9.732-9.154,16.403-9.627c6.679-0.472,13.185,2.192,17.612,7.212\n\t\t\t\t\t\t\t\t\t\tl38.15,43.236l69.125-105.196c3.962-6.026,10.693-9.665,17.904-9.672c7.211-0.008,13.95,3.617,17.92,9.635l98.127,148.666\n\t\t\t\t\t\t\t\t\t\tC465.273,401.086,465.424,404.463,463.923,407.239z\"/>\n\t\t\t\t\t\t\t\t\t<polygon class=\"st0\" points=\"450.529,0 0,0 0,450.529 46.104,450.529 46.104,46.104 450.529,46.104 \t\"/>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<h2 class=\"profile-heading font-account\">", "</h2>\n\t\t\t\t<div class=\"font-account\">", " ", "</div>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div class=\"profile-container\">\n\t\t\t\t<div class=\"image\">\n\t\t\t\t\t<img id=\"user-icon\" src=\"/local/modules/up.tree/images/tree-account.png\" alt=\"\u0424\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044F\">\n\t\t\t\t\t<div class=\"caption\">\n\t\t\t\t\t\t<button id=\"open-menu-icon\" class=\"lupa\">\n\t\t\t\t\t\t\t<svg height=\"50px\" width=\"50px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\t\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t\t\t\t</style>\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<path class=\"st0\" d=\"M84.523,84.523V512H512V84.523H84.523z M220.739,184.766c24.028,0,43.5,19.48,43.5,43.507\n\t\t\t\t\t\t\t\t\t\tc0,24.027-19.473,43.507-43.5,43.507c-24.027,0-43.507-19.48-43.507-43.507C177.232,204.246,196.712,184.766,220.739,184.766z\n\t\t\t\t\t\t\t\t\t\tM463.923,407.239c-1.494,2.776-4.398,4.517-7.556,4.517H140.156c-3.151,0-6.048-1.726-7.548-4.502\n\t\t\t\t\t\t\t\t\t\tc-1.501-2.777-1.359-6.153,0.375-8.787l55.311-84.276c3.669-5.59,9.732-9.154,16.403-9.627c6.679-0.472,13.185,2.192,17.612,7.212\n\t\t\t\t\t\t\t\t\t\tl38.15,43.236l69.125-105.196c3.962-6.026,10.693-9.665,17.904-9.672c7.211-0.008,13.95,3.617,17.92,9.635l98.127,148.666\n\t\t\t\t\t\t\t\t\t\tC465.273,401.086,465.424,404.463,463.923,407.239z\"/>\n\t\t\t\t\t\t\t\t\t<polygon class=\"st0\" points=\"450.529,0 0,0 0,450.529 46.104,450.529 46.104,46.104 450.529,46.104 \\t\"/>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<h2 class=\"profile-heading font-account\">", "</h2>\n\t\t\t\t<div class=\"font-account\">", " ", "</div>\n\t\t\t</div>\n\t\t"])), BX.util.htmlspecialchars(this.nodeList[1].name) + ' ' + BX.util.htmlspecialchars(this.nodeList[1].surname), BX.message('UP_ACCOUNT_LEVEL_SUBSCRIPTION'), BX.util.htmlspecialchars(this.nodeList[0]));
	      this.rootNode.append(data);
	      this.setEvents();
	    }
	  }]);
	  return Account;
	}();

	exports.Account = Account;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
