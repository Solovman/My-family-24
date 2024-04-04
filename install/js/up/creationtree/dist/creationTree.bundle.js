/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var CreationTree = /*#__PURE__*/function () {
	  function CreationTree() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      name: 'CreationTree'
	    };
	    babelHelpers.classCallCheck(this, CreationTree);
	    this.name = options.name;
	  }
	  babelHelpers.createClass(CreationTree, [{
	    key: "setName",
	    value: function setName(name) {
	      if (main_core.Type.isString(name)) {
	        this.name = name;
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var chart = new OrgChart(document.getElementById("tree"), {
	        nodeBinding: {
	          field_0: "name"
	        },
	        nodes: [{
	          id: 1,
	          name: "Amber McKenzie"
	        }, {
	          id: 2,
	          pid: 1,
	          name: "Ava Field"
	        }, {
	          id: 3,
	          pid: 1,
	          name: "Peter Stevens"
	        }]
	      });
	    }
	  }]);
	  return CreationTree;
	}();

	exports.CreationTree = CreationTree;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
