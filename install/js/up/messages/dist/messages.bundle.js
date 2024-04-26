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
	    key: "getMessages",
	    value: function getMessages(chatId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.messages.getMessages', {
	          data: {
	            chatId: chatId
	          }
	        }).then(function (response) {
	          var listMessages = response.data.listMessages;
	          resolve(listMessages);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addMessages",
	    value: function addMessages(chatId, message) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.messages.addMessage', {
	          data: {
	            chatId: chatId,
	            message: message
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
	var Messages = /*#__PURE__*/function () {
	  function Messages() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Messages);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Messages: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Messages: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.listChats = [];
	    this.reload();
	    this.setEvents();
	  }
	  babelHelpers.createClass(Messages, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      var chatId = parseInt(window.location.href.match(/\d+/));
	      Requests.getMessages(Number(chatId)).then(function (list) {
	        _this.listMessages = list;
	        _this.render();
	      });
	    }
	  }, {
	    key: "setEvents",
	    value: function setEvents() {
	      var _this2 = this;
	      var formSend = BX('formSend');
	      var chatId = parseInt(window.location.href.match(/\d+/));
	      BX.bind(formSend, 'submit', function (event) {
	        event.preventDefault();
	        var message = BX('message').value;
	        Requests.addMessages(Number(chatId), message).then(function (result) {
	          _this2.reload();
	        });
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	      this.rootNode.innerHTML = '';
	      var currentUserId = BX.message('USER_ID');
	      console.log(this.listMessages);
	      this.listMessages.forEach(function (message) {
	        var direction = Number(currentUserId) !== message.authorId ? 'is-align-items-start' : 'is-align-items-end';
	        var bodyColor = Number(currentUserId) !== message.authorId ? '#DCF8C6' : '#f1f1f1';
	        var messages = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t\t<div class=\"message-info is-flex is-flex-direction-column is-align-items-start ", "\" style=\"margin-bottom: 20px !important;\">\n\t\t\t\t\t\t\t\t<div class=\"message-header\" style=\"background-color: #00ceaa; width: 25%;\" >\n\t\t\t\t\t\t\t\t\t<p><strong>", ":</strong></p>\n\t\t\t\t\t\t\t\t\t\t<p>", "</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"message-body\" style=\"background-color: ", "; width: 25%;;\">\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t"])), direction, message.authorName, message.createdAt, bodyColor, message.message);
	        BX.append(messages, _this3.rootNode);
	      });
	    }
	  }]);
	  return Messages;
	}();

	exports.Messages = Messages;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
