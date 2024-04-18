/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject;
	var Purchases = /*#__PURE__*/function () {
	  function Purchases() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Purchases);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Purchases: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Purchases: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.purchases = [];
	    this.reload();
	  }
	  babelHelpers.createClass(Purchases, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      this.loadList().then(function (purchases) {
	        _this.purchases = purchases;
	        _this.render();
	      });
	    }
	  }, {
	    key: "loadList",
	    value: function loadList() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.purchases.getPurchases', {
	          data: {
	            apiKey: 'very_secret_key'
	          }
	        }).then(function (responce) {
	          var purchases = responce.data.purchases;
	          console.log(purchases);
	          resolve(purchases);
	        })["catch"](function (error) {
	          console.error(error);
	        });
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	      this.purchases.forEach(function (purchases) {
	        console.log(purchases);
	        var item = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<a class=\"navbar-item header_item\">\n\t\t\t\t\u2727 ", "\n\t\t\t</a>\n\t\t"])), purchases.TITLE);
	        BX.append(item, _this2.rootNode);
	      });
	    }
	  }]);
	  return Purchases;
	}();

	exports.Purchases = Purchases;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
