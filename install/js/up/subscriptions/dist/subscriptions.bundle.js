/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var Form = /*#__PURE__*/function () {
	  function Form() {
	    babelHelpers.classCallCheck(this, Form);
	  }
	  babelHelpers.createClass(Form, null, [{
	    key: "render",
	    value: function render() {
	      var buyPopup = BX.PopupWindowManager.create("FormPopup", null, {
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
	            this.setContent(BX("bx_popup_form"));
	          },
	          onPopupClose: function onPopupClose() {
	            var modal = document.querySelector('.sign-up-modal');
	            BX.removeClass(modal, 'sing-modal-free');
	            BX.removeClass(modal, 'sing-modal-standard');
	            BX.removeClass(modal, 'sing-modal-premium');
	          }
	        }
	      });
	      buyPopup.show();
	    }
	  }]);
	  return Form;
	}();

	var Requests = /*#__PURE__*/function () {
	  function Requests() {
	    babelHelpers.classCallCheck(this, Requests);
	  }
	  babelHelpers.createClass(Requests, null, [{
	    key: "loadList",
	    value: function loadList() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.subscriptions.getList').then(function (response) {
	          var subscriptionsList = response.data.subscriptionsList;
	          resolve(subscriptionsList);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var _templateObject;
	var Subscriptions = /*#__PURE__*/function () {
	  function Subscriptions() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Subscriptions);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Subscriptions: options.rootNodeId required');
	    }
	    this.rootNode = BX(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Subscriptions: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.subscriptions = [];
	    this.loadList();
	  }
	  babelHelpers.createClass(Subscriptions, [{
	    key: "loadList",
	    value: function loadList() {
	      var _this = this;
	      Requests.loadList().then(function (list) {
	        _this.subscriptions = list;
	        _this.renderCard();
	      });
	    }
	  }, {
	    key: "setEvents",
	    value: function setEvents() {
	      var _this2 = this;
	      var subscriptionsButton = document.querySelectorAll('.subscriptions__button');
	      var formButton = document.querySelector('.sign-up-button');
	      var formHeading = BX('modal-form-heading');
	      subscriptionsButton.forEach(function (btn) {
	        if (btn.id === 'Free1') {
	          btn.style.display = 'none';
	        }
	        var heading = btn.id.replace(/[^a-zA-Z]+/g, '');
	        var buttonId = btn.id.match(/\d+/g);
	        BX.bind(btn, 'click', function () {
	          formButton.id = buttonId;
	          formHeading.innerText = heading;
	          _this2.addClass(btn.id);
	          Form.render();
	        });
	      });
	    }
	  }, {
	    key: "addClass",
	    value: function addClass(id) {
	      var modal = document.querySelector('.sign-up-modal');
	      switch (id) {
	        case 'Standard2':
	          BX.addClass(modal, 'sing-modal-standard');
	          break;
	        case 'Premium3':
	          BX.addClass(modal, 'sing-modal-premium');
	          break;
	      }
	    }
	  }, {
	    key: "getCustomStatusMessage",
	    value: function getCustomStatusMessage(customStatus) {
	      switch (customStatus) {
	        case 1:
	          return "Доступна возможность кастомизации деревьев";
	        case 0:
	          return "Возможность кастомизации отсутствует";
	      }
	    }
	  }, {
	    key: "getSubscriptionStatusMessage",
	    value: function getSubscriptionStatusMessage(customStatus) {
	      switch (customStatus) {
	        case 'purchase':
	          return "Купи один раз и пользуйся!";
	        case 'subscription':
	          return "Месячная подписка";
	        case 'default':
	          return "Доступно сейчас";
	      }
	    }
	  }, {
	    key: "getCorrectValue",
	    value: function getCorrectValue(value) {
	      if (value === 0) {
	        return "не ограничено";
	      } else {
	        return value;
	      }
	    }
	  }, {
	    key: "getEmojiByTitle",
	    value: function getEmojiByTitle(title) {
	      if (title === 'Premium') {
	        return title + "👑";
	      } else {
	        return title;
	      }
	    }
	  }, {
	    key: "renderCard",
	    value: function renderCard() {
	      var _this3 = this;
	      this.subscriptions.forEach(function (list) {
	        var card = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"subscriptions__item\">\n\t\t\t\t<div class=\"nft ntf_", "\">\n\t\t\t\t<div class='main'>\n\t\t\t\t\t<h2 class=\"subscriptions__heading\">", "</h2>\n\t\t\t\t\t<p class='description'></p>\n\t\t\t\t</div>\n\t\t\t\t<ul style=\"color: white; font-size: 1.4em\">\n\t\t\t\t\t<li>\u2727 \u0426\u0435\u043D\u0430: ", "$</li>\n\t\t\t\t\t<li>\u2727 \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432: ", "</li>\n\t\t\t\t\t<li>\u2727 \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0435\u0440\u0448\u0438\u043D: ", "</li>\n\t\t\t\t\t<li>\u2727 ", "</li>\n\t\t\t\t\t<li>\u2727 ", "</li>\n\t\t\t\t</ul>\n\t\t\t\t<button id=\"", "", "\" class=\"subscriptions__button\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n\t\t\t</div>\n\t\t\t</li>\n\t\t"])), list.id, _this3.getEmojiByTitle(list.level), list.price, _this3.getCorrectValue(list.numberTrees), _this3.getCorrectValue(list.numberNodes), _this3.getCustomStatusMessage(list.customization), _this3.getSubscriptionStatusMessage(list.subscriptionType), list.level, list.id);
	        BX.append(card, _this3.rootNode);
	      });
	      this.setEvents();
	    }
	  }]);
	  return Subscriptions;
	}();

	exports.Subscriptions = Subscriptions;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
