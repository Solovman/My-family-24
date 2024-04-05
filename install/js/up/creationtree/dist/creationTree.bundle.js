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
	        nodeMenu: {
	          details: {
	            text: "Details"
	          },
	          edit: {
	            text: "Edit"
	          },
	          add: {
	            text: "Add"
	          },
	          remove: {
	            text: "Remove"
	          }
	        },
	        nodeBinding: {
	          field_0: "name",
	          img_0: "img"
	        }
	      });
	      chart.load([{
	        id: 1,
	        name: "Denny Curtis",
	        img: "https://cdn.balkan.app/shared/2.jpg"
	      }, {
	        id: 2,
	        pid: 1,
	        name: "Ashley Barnett",
	        img: "https://cdn.balkan.app/shared/3.jpg"
	      }, {
	        id: 3,
	        pid: 1,
	        name: "Caden Ellison",
	        img: "https://cdn.balkan.app/shared/4.jpg"
	      }]);
	    }
	  }]);
	  return CreationTree;
	}();

	exports.CreationTree = CreationTree;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
