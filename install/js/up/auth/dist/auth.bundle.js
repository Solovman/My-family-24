/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var Auth = /*#__PURE__*/function () {
	  function Auth() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      name: 'Auth'
	    };
	    babelHelpers.classCallCheck(this, Auth);
	    this.name = options.name;
	  }
	  babelHelpers.createClass(Auth, [{
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
	  return Auth;
	}();

	exports.Auth = Auth;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
