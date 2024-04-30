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
	        document.querySelector('.sub__spinner').style.display = "none";
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
	          return BX.message('UP_TREE_SUBSCRIPTIONS_CUSTOM_STATUS_YES');
	        case 0:
	          return BX.message('UP_TREE_SUBSCRIPTIONS_CUSTOM_STATUS_NO');
	      }
	    }
	  }, {
	    key: "getSubscriptionStatusMessage",
	    value: function getSubscriptionStatusMessage(id) {
	      switch (id) {
	        case 3:
	          return BX.message('UP_TREE_SUBSCRIPTIONS_STANDARD_PREMIUM');
	        case 2:
	          return BX.message('UP_TREE_SUBSCRIPTIONS_STANDARD_PREMIUM');
	        case 1:
	          return BX.message('UP_TREE_SUBSCRIPTIONS_FREE');
	      }
	    }
	  }, {
	    key: "getCountNodesMessage",
	    value: function getCountNodesMessage(value) {
	      if (value === 0) {
	        return BX.message('UP_TREE_SUBSCRIPTIONS_NUMBER_NODES_PREMIUM');
	      } else {
	        return BX.message('UP_TREE_SUBSCRIPTIONS_NUMBER_NODES_FREE_STANDARD') + value;
	      }
	    }
	  }, {
	    key: "getCountTreesMessage",
	    value: function getCountTreesMessage(value) {
	      if (value === 0) {
	        return BX.message('UP_TREE_SUBSCRIPTIONS_NUMBER_TREES_PREMIUM');
	      } else {
	        return BX.message('UP_TREE_SUBSCRIPTIONS_NUMBER_TREES_FREE_STANDARD') + value;
	      }
	    }
	  }, {
	    key: "getEmojiByTitle",
	    value: function getEmojiByTitle(title) {
	      if (title === 'Premium') {
	        return BX.util.htmlspecialchars(title) + "👑";
	      } else {
	        return BX.util.htmlspecialchars(title);
	      }
	    }
	  }, {
	    key: "renderCard",
	    value: function renderCard() {
	      var _this3 = this;
	      this.subscriptions.forEach(function (list) {
	        console.log(list);
	        var card = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"subscriptions__item\">\n\t\t\t\t<div class=\"nft ntf_", "\">\n\t\t\t\t\t<div class='main'>\n\t\t\t\t\t\t<h2 class=\"subscriptions__heading\">", "</h2>\n\t\t\t\t\t\t<p class='description'></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<ul style=\"color: white; font-size: 1.4em\">\n\t\t\t\t\t\t<li>\u2727 ", " ", "$</li>\n\t\t\t\t\t\t<li>\u2727 ", "</li>\n\t\t\t\t\t\t<li>\u2727 ", "</li>\n\t\t\t\t\t\t<li>\u2727 ", "</li>\n\t\t\t\t\t\t<li>\u2727 ", "</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t\n\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t<button id=\"", "", "\" class=\"subscriptions__button has-tooltip\">\n\t\t\t\t\t\t\t<svg class=\"subscriptions__main-svg\" width=\"25px\" height=\"25px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t<span class=\"subscriptions__span\">", "</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<span class='tooltip blue'>\n\t\t\t\t\t\t\t<p class=\"tooltip-p\">", "</p>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t"])), list.id, _this3.getEmojiByTitle(list.level), BX.message('UP_TREE_SUBSCRIPTIONS_PRICE'), list.price, _this3.getCountTreesMessage(list.numberTrees), _this3.getCountNodesMessage(list.numberNodes), _this3.getCustomStatusMessage(list.customization), _this3.getSubscriptionStatusMessage(list.id), list.level, list.id, BX.message('UP_TREE_SUBSCRIPTIONS_BUY_BUTTON'), BX.message('UP_TREE_SUBSCRIPTIONS_BUY_TEXT'));
	        BX.append(card, _this3.rootNode);
	      });
	      this.setEvents();
	    }
	  }]);
	  return Subscriptions;
	}();

	exports.Subscriptions = Subscriptions;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
