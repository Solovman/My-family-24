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
	  }, {
	    key: "addChatAdmin",
	    value: function addChatAdmin(message, isAdmin) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.chatRelatives.addMessages', {
	          data: {
	            recipientId: 1,
	            message: message,
	            isAdmin: Number(isAdmin)
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getIdChatWithAdmin",
	    value: function getIdChatWithAdmin() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.chatRelatives.getIdChatWithAdmin').then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getParticipantsByChatId",
	    value: function getParticipantsByChatId(chatId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.chatRelatives.getParticipantsByChatId', {
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
	      var months = ["UP_TREE_CHATS_HELPER_JAN", "UP_TREE_CHATS_HELPER_FEB", "UP_TREE_CHATS_HELPER_MAR", "UP_TREE_CHATS_HELPER_APR", "UP_TREE_CHATS_HELPER_MAY", "UP_TREE_CHATS_HELPER_JUN", "UP_TREE_CHATS_HELPER_JUL", "UP_TREE_CHATS_HELPER_AUG", "UP_TREE_CHATS_HELPER_SEP", "UP_TREE_CHATS_HELPER_OCT", "UP_TREE_CHATS_HELPER_NOV", "UP_TREE_CHATS_HELPER_DEC"];
	      var date = new Date(dateString);
	      var day = date.getDate();
	      var month = BX.message(months[date.getMonth()]);
	      var year = date.getFullYear();
	      var hours = date.getHours().toString().padStart(2, '0');
	      var minutes = date.getMinutes().toString().padStart(2, '0');
	      return "".concat(day, " ").concat(month, ". ").concat(year, " ").concat(hours, ":").concat(minutes);
	    }
	  }]);
	  return Helper;
	}();

	var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
	var Chat = /*#__PURE__*/function () {
	  function Chat() {
	    var _this = this;
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
	    this.isHandlerAdmin = false;
	    this.ws = new WebSocket('ws://localhost:3000');
	    this.ws.onopen = function () {
	      var userId = BX.message('USER_ID');
	      _this.ws.send(JSON.stringify({
	        type: 'userId',
	        userId: userId
	      }));
	      console.log('WebSocket connection established and user ID sent');
	    };
	    this.ws.onclose = function () {
	      return console.log('disconnected');
	    };
	    this.ws.onmessage = function (event) {
	      Requests.getParticipantsByChatId(Number(JSON.parse(event.data).chatId)).then(function (result) {
	        if (result) {
	          var data = JSON.parse(event.data);
	          var userIdNow = Number(BX.message('USER_ID'));
	          var chatContainerId = Number(_this.messagesContainer.dataset.chatId);
	          if (userIdNow === result.authorId || userIdNow === result.recipientId) {
	            if (chatContainerId === data.chatId) {
	              var pathFileName = document.querySelector("[data-icon-chat=\"".concat(data.chatId, "\"]"));
	              var message = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t"])), Number(userIdNow) === Number(data.userId) ? "\n\t\t\t\t\t\t\t\t<div class=\"message text-only\">\n\t\t\t\t\t\t\t\t\t<div class=\"response\">\n\t\t\t\t\t\t\t\t\t\t<p class=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"text-message\">".concat(BX.util.htmlspecialchars(data.text), "</span> \n\t\t\t\t\t\t\t\t\t\t\t<span class=\"date-message\">").concat(Helper.dateFormat(new Date()), "</span> \n\t\t\t\t\t\t\t\t\t\t</p\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t") : "\n\t\t\t\t\t\t\t\t<div class=\"message\">\n\t\t\t\t\t\t\t\t\t<div class=\"photo\" style=\"background-image: url(".concat(pathFileName.dataset.pathFile, ");\"></div>\n\t\t\t\t\t\t\t\t\t<p class=\"text\">  \n\t\t\t\t\t\t\t\t\t\t<span class=\"text-message\">").concat(BX.util.htmlspecialchars(data.text), "</span> \n\t\t\t\t\t\t\t\t\t\t<span class=\"date-message\">").concat(Helper.dateFormat(new Date()), "</span> \n\t\t\t\t\t\t\t\t\t</p\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t"));
	              BX.append(message, _this.messagesContainer);
	              var messageLast = document.querySelectorAll('.lastMessage');
	              messageLast.forEach(function (mess) {
	                var idChat = Number(mess.id.match(/\d+$/)[0]);
	                if (idChat === data.chatId) {
	                  mess.textContent = data.text;
	                }
	              });
	              _this.messagesContainer.scrollTop = _this.messagesContainer.scrollHeight;
	            } else {
	              var _message = document.querySelectorAll('.lastMessage');
	              _message.forEach(function (mess) {
	                var idChat = Number(mess.id.match(/\d+$/)[0]);
	                if (idChat === data.chatId) {
	                  mess.textContent = data.text;
	                }
	              });
	            }
	          }
	        }
	      });
	    };
	    this.reload();
	  }
	  babelHelpers.createClass(Chat, [{
	    key: "reload",
	    value: function reload() {
	      var _this2 = this;
	      Requests.getChats().then(function (list) {
	        _this2.listChats = list;
	        Requests.getIdChatWithAdmin().then(function (chatId) {
	          if (!chatId) {
	            BX('help').style.display = 'block';
	          }
	          _this2.render();
	        });
	      });
	    }
	  }, {
	    key: "loadMessages",
	    value: function loadMessages(dataIdChat) {
	      var _this3 = this;
	      Requests.getMessages(dataIdChat).then(function (result) {
	        _this3.listMessages = result;
	        _this3.renderMessage(dataIdChat);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this4 = this;
	      this.rootNode.innerHTML = '';
	      var currentUserId = BX.message('USER_ID');
	      this.listChats.forEach(function (chat) {
	        var chats = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t", "\n\t\t\t"])), chat.isAdmin === 0 || Number(BX.message('USER_ID')) === 1 ? "\n\t\t\t\t\t<div data-id-chat=\"".concat(chat.id, "\" id=\"chat").concat(chat.id, "\" class=\"discussion chat-list\">\n\t\t\t\t\t\t<div data-icon-chat=\"").concat(chat.id, "\" data-path-file=\"").concat(Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientFileName) : BX.util.htmlspecialchars(chat.authorFileName), "\" class=\"photo\" style=\"\n\t\t\t\t\t\tbackground-image:\n\t\t\t\t\t\t url(").concat(Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientFileName) : BX.util.htmlspecialchars(chat.authorFileName), ");\"></div>\n\t\t\t\t\t\t\t<div class=\"desc-contact\">\n\t\t\t\t\t\t\t<p class=\"name\">").concat(Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName), "</p>\n\t\t\t\t\t\t\t<p id=\"lastMassage").concat(chat.id, "\" class=\"message lastMessage\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>") : "\n\t\t\t\t<div data-id-chat=\"".concat(chat.id, "\" id=\"chat").concat(chat.id, "\" class=\"discussion chat-list\">\n\t\t\t\t\t\t<div data-icon-chat=\"").concat(chat.id, "\" class=\"photo\" style=\"\n\t\t\t\t\t\tbackground-image:\n\t\t\t\t\t\t url(/local/modules/up.tree/images/profile.svg)\"></div>\n\t\t\t\t\t\t\t<div class=\"desc-contact\">\n\t\t\t\t\t\t\t<p class=\"name\">\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440</p>\n\t\t\t\t\t\t\t<p id=\"lastMassage").concat(chat.id, "\" class=\"message lastMessage\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t"));
	        var btnSend = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"submit\" id=\"send", "\" class=\"btn-send\">\n\t\t\t\t<svg width=\"30px\" height=\"30px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t</svg>\n\t\t\t</button>"])), chat.id);
	        BX.append(chats, _this4.rootNode);
	        Requests.getLastMessage(chat.id).then(function (result) {
	          BX("lastMassage".concat(chat.id)).textContent = result;
	        });
	        var currentTarget = null;
	        BX.bind(BX("chat".concat(chat.id)), 'click', function (event) {
	          _this4.messagesContainer.innerHTML = '';
	          BX('footer-send').innerHTML = '';
	          _this4.messagesContainer.dataset.chatId = chat.id;
	          BX('input-message').style.display = 'block';
	          var spinner = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div id=\"spinnerChat\" class=\"spinner-grow\" role=\"status\">\n\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t</div>\n\t\t\t\t"])));
	          BX.append(spinner, _this4.messagesContainer);
	          var chatsList = document.querySelectorAll('.chat-list');
	          chatsList.forEach(function (chat) {
	            BX.removeClass(chat, 'message-active');
	          });
	          BX.addClass(BX("chat".concat(chat.id)), 'message-active');
	          BX.append(btnSend, BX('footer-send'));
	          var targetDiv = event.target.closest('div[data-id-chat]');
	          if (currentTarget !== targetDiv) {
	            _this4.isHandler = false;
	          }
	          currentTarget = targetDiv;
	          if (targetDiv) {
	            var dataIdChat = Number(targetDiv.getAttribute('data-id-chat'));
	            var nameUser = BX('name-user');
	            if (chat.isAdmin === 0 || Number(BX.message('USER_ID')) === 1) {
	              nameUser.textContent = Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName);
	            } else {
	              nameUser.textContent = 'Администратор';
	            }
	            _this4.loadMessages(dataIdChat);
	          }
	          if (!_this4.isHandler) {
	            _this4.isHandler = true;
	            BX.bind(BX("send".concat(chat.id)), 'click', function (event) {
	              event.preventDefault();
	              var textMessage = BX('input-message').value;
	              var message = {
	                userId: Number(BX.message('USER_ID')),
	                authorId: chat.authorId,
	                recipientId: chat.recipientId,
	                chatId: chat.id,
	                text: BX('input-message').value
	              };
	              Requests.addMessages(chat.id, textMessage).then(function (result) {
	                BX('input-message').value = '';
	                BX("lastMassage".concat(chat.id)).textContent = textMessage;
	                _this4.ws.send(JSON.stringify(message));
	                //this.loadMessages(chat.id);
	              });
	            });
	          }
	        });
	      });

	      BX.bindOnce(BX('help'), 'click', function () {
	        var chat = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div id=\"chatAdmin\" data-id-chat=\"admin\" class=\"discussion chat-list message-active\">\n\t\t\t\t\t<div class=\"photo\" style=\"\n\t\t\t\t\tbackground-image:\n\t\t\t\t\t url(/local/modules/up.tree/images/profile.svg);\"></div>\n\t\t\t\t\t\t<div class=\"desc-contact\">\n\t\t\t\t\t\t<p class=\"name\">\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440</p>\n\t\t\t\t\t\t<p id=\"adminText\" class=\"message\"></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"])));
	        BX('help').style.display = 'none';
	        var btnSend = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"submit\" id=\"sendAdmin\" class=\"btn-send\">\n\t\t\t\t<svg width=\"30px\" height=\"30px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t</svg>\n\t\t\t</button>"])));
	        var chatsList = document.querySelectorAll('.chat-list');
	        BX('name-user').textContent = 'Администратор';
	        _this4.messagesContainer.innerHTML = '';
	        BX('footer-send').innerHTML = '';
	        BX('input-message').style.display = 'block';
	        chatsList.forEach(function (chat) {
	          BX.removeClass(chat, 'message-active');
	        });
	        BX.append(chat, _this4.rootNode);
	        BX.append(btnSend, BX('footer-send'));
	        BX.bindOnce(BX('sendAdmin'), 'click', function (event) {
	          event.preventDefault();
	          Requests.addChatAdmin(BX('input-message').value, 1).then(function (result) {
	            var elMessage = main_core.Tag.render(_templateObject7 || (_templateObject7 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<div class=\"message text-only\">\n\t\t\t\t\t\t\t<div class=\"response\">\n\t\t\t\t\t\t\t\t<p class=\"text\">\n\t\t\t\t\t\t\t\t\t<span class=\"text-message\">", "</span> \n\t\t\t\t\t\t\t\t\t<span class=\"date-message\">", "</span> \n\t\t\t\t\t\t\t\t</p\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t"])), BX('input-message').value, Helper.dateFormat(new Date()));
	            BX('adminText').textContent = BX('input-message').value;
	            BX('input-message').value = '';
	            BX.append(elMessage, _this4.messagesContainer);
	          });
	        });
	        if (!_this4.isHandlerAdmin) {
	          _this4.isHandlerAdmin = true;
	          BX.bind(BX('sendAdmin'), 'click', function (event) {
	            event.preventDefault();
	            Requests.getIdChatWithAdmin().then(function (chatId) {
	              if (chatId !== false) {
	                Requests.addMessages(chatId, BX('input-message').value).then(function (result) {
	                  BX('adminText').textContent = BX('input-message').value;
	                  BX('input-message').value = '';
	                  _this4.loadMessages(chatId);
	                });
	              }
	            });
	          });
	        }
	        var currentTargetAdmin = null;
	        BX.bind(BX('chatAdmin'), 'click', function () {
	          _this4.messagesContainer.innerHTML = '';
	          BX('footer-send').innerHTML = '';
	          BX('input-message').style.display = 'block';
	          var spinner = main_core.Tag.render(_templateObject8 || (_templateObject8 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div id=\"spinnerChat\" class=\"spinner-grow\" role=\"status\">\n\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t</div>\n\t\t\t\t"])));
	          BX.append(spinner, _this4.messagesContainer);
	          var chatsList = document.querySelectorAll('.chat-list');
	          chatsList.forEach(function (chat) {
	            BX.removeClass(chat, 'message-active');
	          });
	          BX.addClass(BX('chatAdmin'), 'message-active');
	          BX.append(btnSend, BX('footer-send'));
	          var targetDiv = event.target.closest('div[data-id-chat]');
	          if (currentTargetAdmin !== targetDiv) {
	            _this4.isHandlerAdmin = false;
	          }
	          currentTargetAdmin = targetDiv;
	          if (targetDiv) {
	            BX('name-user').textContent = 'Администратор';
	            Requests.getIdChatWithAdmin().then(function (chatId) {
	              if (chatId) {
	                _this4.loadMessages(chatId);
	              } else {
	                spinner.remove();
	              }
	            });
	          }
	        });
	      });
	    }
	  }, {
	    key: "renderMessage",
	    value: function renderMessage() {
	      var _this5 = this;
	      this.messagesContainer.innerHTML = '';
	      var currentUserId = Number(BX.message('USER_ID'));
	      var pathFileName = document.querySelector("[data-icon-chat=\"".concat(this.listMessages[0].chatId, "\"]"));
	      this.listMessages.forEach(function (message) {
	        var elMessage = main_core.Tag.render(_templateObject9 || (_templateObject9 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t", "\n\t\t\t"])), currentUserId === message.authorId ? "<div class=\"message text-only\">\n\t\t\t\t\t\t<div class=\"response\">\n\t\t\t\t\t\t\t<p class=\"text\">\n\t\t\t\t\t\t\t\t<span class=\"text-message\">".concat(BX.util.htmlspecialchars(message.message), "</span> \n\t\t\t\t\t\t\t\t<span class=\"date-message\">").concat(Helper.dateFormat(message.createdAt), "</span> \n\t\t\t\t\t\t\t</p\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>") : "<div class=\"message\">\n\t\t\t\t\t<div class=\"photo\" style=\"background-image: url(".concat(pathFileName.dataset.pathFile ? pathFileName.dataset.pathFile : '/local/modules/up.tree/images/profile.svg', ");\"></div>\n\t\t\t\t\t<p class=\"text\">  \n\t\t\t\t\t\t\t<span class=\"text-message\">").concat(BX.util.htmlspecialchars(message.message), "</span> \n\t\t\t\t\t\t\t<span class=\"date-message\">").concat(Helper.dateFormat(message.createdAt), "</span> \n\t\t\t\t\t</p\n\t\t\t\t</div>"));
	        BX.append(elMessage, _this5.messagesContainer);
	        _this5.messagesContainer.scrollTop = _this5.messagesContainer.scrollHeight;
	      });
	    }
	  }]);
	  return Chat;
	}();

	exports.Chat = Chat;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
