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
	    key: "getChats",
	    value: function getChats() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.chatRelatives.getChats').then(function (response) {
	          var listChats = response.data.listChats;
	          resolve(listChats);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var _templateObject;
	var Chat = /*#__PURE__*/function () {
	  function Chat() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Chat);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Chat: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Chat: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.listChats = [];
	    this.reload();
	  }
	  babelHelpers.createClass(Chat, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      Requests.getChats().then(function (list) {
	        _this.listChats = list;
	        _this.render();
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	      var currentUserId = BX.message('USER_ID');
	      console.log(babelHelpers["typeof"](currentUserId));
	      console.log(this.listChats);
	      this.listChats.forEach(function (chat) {
	        var chats = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"message is-info\">\n\t\t\t\t\t<div class=\"message-header\" style=\"background-color: #00ceaa\">\n\t\t\t\t\t\t<p>", "</p>\n\t\t\t\t\t\t<button class=\"delete\" aria-label=\"delete\"></button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"message-body\">\n\t\t\t\t\t\t<a class=\"message-link\" href=\"/chat/", "/\">\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0447\u0430\u0442\u0443</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"])), Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName), chat.id);
	        BX.append(chats, _this2.rootNode);
	      });
	    }
	  }]);
	  return Chat;
	}();

	exports.Chat = Chat;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
