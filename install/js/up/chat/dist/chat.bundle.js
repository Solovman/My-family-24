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
	  }, {
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
	  }, {
	    key: "getLastMessage",
	    value: function getLastMessage(chatId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.messages.getLastMessage', {
	          data: {
	            chatId: chatId
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
	    key: "dateFormat",
	    value: function dateFormat(dateString) {
	      var months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
	      var date = new Date(dateString);
	      var day = date.getDate();
	      var month = months[date.getMonth()];
	      var year = date.getFullYear();
	      var hours = date.getHours().toString().padStart(2, '0');
	      var minutes = date.getMinutes().toString().padStart(2, '0');
	      return "".concat(day, " ").concat(month, ". ").concat(year, " ").concat(hours, ":").concat(minutes);
	    }
	  }]);
	  return Helper;
	}();

	var _templateObject, _templateObject2, _templateObject3, _templateObject4;
	var Chat = /*#__PURE__*/function () {
	  function Chat() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Chat);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Chat: options.rootNodeId required');
	    }
	    if (main_core.Type.isStringFilled(options.rootMessages)) {
	      this.rootMessages = options.rootMessages;
	    } else {
	      throw new Error('Chat: options.rootMessages required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    this.messagesContainer = document.getElementById(this.rootMessages);
	    if (!this.rootNode) {
	      throw new Error("Chat: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    if (!this.messagesContainer) {
	      throw new Error("Chat: element with id \"".concat(this.messagesContainer, "\" not found"));
	    }
	    this.listChats = [];
	    this.listMessages = [];
	    this.isHandler = false;
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
	    key: "loadMessages",
	    value: function loadMessages(dataIdChat) {
	      var _this2 = this;
	      Requests.getMessages(dataIdChat).then(function (result) {
	        _this2.listMessages = result;
	        _this2.renderMessage(dataIdChat);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	      this.listChats.innerHTML = '';
	      var currentUserId = BX.message('USER_ID');
	      this.listChats.forEach(function (chat) {
	        var chats = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div data-id-chat=\"", "\" id=\"chat", "\" class=\"discussion chat-list\">\n\t\t\t\t\t<div class=\"photo\" style=\"background-image: url(/local/modules/up.tree/images/tree-account.png);\"></div>\n\t\t\t\t\t\t<div class=\"desc-contact\">\n\t\t\t\t\t\t<p class=\"name\">", "</p>\n\t\t\t\t\t\t<p id=\"lastMassage", "\" class=\"message\"></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"])), chat.id, chat.id, Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName), chat.id);
	        var btnSend = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"submit\" id=\"send", "\" class=\"btn-send\">\n\t\t\t\t<svg width=\"30px\" height=\"30px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t</svg>\n\t\t\t</button>"])), chat.id);
	        BX.append(chats, _this3.rootNode);
	        Requests.getLastMessage(chat.id).then(function (result) {
	          BX("lastMassage".concat(chat.id)).textContent = result;
	        });
	        var currentTarget = null;
	        BX.bind(BX("chat".concat(chat.id)), 'click', function (event) {
	          _this3.messagesContainer.innerHTML = '';
	          BX('footer-send').innerHTML = '';
	          BX('input-message').style.display = 'block';
	          var spinner = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div id=\"spinnerChat\" class=\"spinner-grow\" role=\"status\">\n\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t</div>\n\t\t\t\t"])));
	          BX.append(spinner, _this3.messagesContainer);
	          var chatsList = document.querySelectorAll('.chat-list');
	          chatsList.forEach(function (chat) {
	            BX.removeClass(chat, 'message-active');
	          });
	          BX.addClass(BX("chat".concat(chat.id)), 'message-active');
	          BX.append(btnSend, BX('footer-send'));
	          var targetDiv = event.target.closest('div[data-id-chat]');
	          if (currentTarget !== targetDiv) {
	            _this3.isHandler = false;
	          }
	          currentTarget = targetDiv;
	          if (targetDiv) {
	            var dataIdChat = Number(targetDiv.getAttribute('data-id-chat'));
	            var nameUser = BX('name-user');
	            nameUser.textContent = Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName);
	            _this3.loadMessages(dataIdChat);
	          }
	          if (!_this3.isHandler) {
	            _this3.isHandler = true;
	            BX.bind(BX("send".concat(chat.id)), 'click', function (event) {
	              event.preventDefault();
	              var textMessage = BX('input-message').value;
	              Requests.addMessages(chat.id, textMessage).then(function (result) {
	                BX('input-message').value = '';
	                BX("lastMassage".concat(chat.id)).textContent = textMessage;
	                _this3.loadMessages(chat.id);
	              });
	            });
	          }
	        });
	      });
	    }
	  }, {
	    key: "renderMessage",
	    value: function renderMessage() {
	      var _this4 = this;
	      this.messagesContainer.innerHTML = '';
	      var currentUserId = Number(BX.message('USER_ID'));
	      this.listMessages.forEach(function (message) {
	        var elMessage = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t", "\n\t\t\t"])), currentUserId === message.authorId ? "<div class=\"message text-only\">\n\t\t\t\t\t\t<div class=\"response\">\n\t\t\t\t\t\t\t<p class=\"text\">  \n\t\t\t\t\t\t\t\t<span class=\"text-message\">".concat(BX.util.htmlspecialchars(message.message), "</span> \n\t\t\t\t\t\t\t\t<span class=\"date-message\">").concat(Helper.dateFormat(message.createdAt), "</span> \n\t\t\t\t\t\t\t</p\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>") : "<div class=\"message\">\n\t\t\t\t\t<div class=\"photo\" style=\"background-image: url(/local/modules/up.tree/images/tree-account.png);\"></div>\n\t\t\t\t\t<p class=\"text\">  \n\t\t\t\t\t\t\t<span class=\"text-message\">".concat(BX.util.htmlspecialchars(message.message), "</span> \n\t\t\t\t\t\t\t<span class=\"date-message\">").concat(Helper.dateFormat(message.createdAt), "</span> \n\t\t\t\t\t</p\n\t\t\t\t</div>"));
	        BX.append(elMessage, _this4.messagesContainer);
	        _this4.messagesContainer.scrollTop = _this4.messagesContainer.scrollHeight;
	      });
	    }
	  }]);
	  return Chat;
	}();

	exports.Chat = Chat;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
