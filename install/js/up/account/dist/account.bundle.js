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
	        console.log(_this.nodeList);
	        _this.render();
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var data = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"profile-container\">\n\t\t\t\t<img src=\"/local/modules/up.tree/images/user_default.png\" alt=\"\u0424\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044F\">\n\t\t\t\t<h2 class=\"profile-heading font-account\">", "</h2>\n\t\t\t\t<div class=\"font-account\">\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438: ", "</div>\n\t\t\t</div>\n\t\t"])), this.nodeList[1].name + ' ' + this.nodeList[1].surname, this.nodeList[0]);
	      this.rootNode.append(data);
	    }
	  }]);
	  return Account;
	}();

	exports.Account = Account;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
