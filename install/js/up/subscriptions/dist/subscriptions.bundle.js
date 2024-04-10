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
	          }
	        }
	      });
	      buyPopup.show();
	    }
	  }]);
	  return Form;
	}();

	var Subscriptions = /*#__PURE__*/function () {
	  function Subscriptions() {
	    babelHelpers.classCallCheck(this, Subscriptions);
	    this.setEvents();
	    console.log('test');
	  }
	  babelHelpers.createClass(Subscriptions, [{
	    key: "setEvents",
	    value: function setEvents() {
	      var subscriptionsButton = document.querySelectorAll('.subscriptions__button');
	      subscriptionsButton.forEach(function (btn) {
	        BX.bind(btn, 'click', function () {
	          Form.render();
	        });
	      });
	    }
	  }]);
	  return Subscriptions;
	}();

	exports.Subscriptions = Subscriptions;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
