/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var Account = /*#__PURE__*/function () {
	  function Account() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      name: 'Account'
	    };
	    babelHelpers.classCallCheck(this, Account);
	    this.name = options.name;
	  }
	  babelHelpers.createClass(Account, [{
	    key: "setName",
	    value: function setName(name) {
	      if (main_core.Type.isString(name)) {
	        this.name = name;
	      }
	    }
	  }, {
	    key: "getName",
	    value: function getName() {
	      return this.name;
	    }
	  }]);
	  return Account;
	}();

	exports.Account = Account;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
