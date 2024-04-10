/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2;
	var TreeList = /*#__PURE__*/function () {
	  function TreeList() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, TreeList);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('TreeList: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("TreeList: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.treeList = [];
	    this.reload();
	    console.log('qq');
	  }
	  babelHelpers.createClass(TreeList, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      this.loadList().then(function (treeList) {
	        _this.treeList = treeList;
	        console.log(_this.treeList);
	        console.log('Hi');
	        //this.render();
	      });
	    }
	  }, {
	    key: "loadList",
	    value: function loadList() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.trees.getTrees', {
	          data: {
	            apiKey: 'very_secret_key'
	          }
	        }).then(function (responce) {
	          var treeList = responce.data.treeList;
	          console.log(treeList);
	          resolve(treeList);
	        })["catch"](function (error) {
	          console.error(error);
	        });
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.rootNode.innerHTML = '';
	      var treeContainerNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["<div class=\"columns\"></div>"])));
	      this.treeList.forEach(function (treeData) {
	        var treeNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"column\">\n\t\t\t\t\t<div class=\"card project-card\">\n\t\t\t\t\t\t<header class=\"card-header\">\n\t\t\t\t\t\t\t<a class=\"card-header-title card-header-title-from-database\" href=\"/tree/", "/\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<button class=\"card-header-icon\" aria-label=\"more options\">\n\t\t\t\t\t\t\t\t<span class=\"icon disabled\">\n\t\t\t\t\t\t\t\t*\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis commodi cum dicta ex excepturi in ipsa, iusto maxime molestiae nobis non officia officiis porro sunt, tempore vel vero, voluptates!\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<footer class=\"card-footer\">\n\t\t\t\t\t\t\t<span class=\"card-footer-item is-size-7\">\n\t\t\t\t\t\t\t\t<strong>", "</strong>: 10\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"card-footer-item is-size-7\">\n\t\t\t\t\t\t\t\t<strong>", "</strong>: 20.Mar 14:49\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</footer>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"], ["\n\t\t\t\t<div class=\"column\">\n\t\t\t\t\t<div class=\"card project-card\">\n\t\t\t\t\t\t<header class=\"card-header\">\n\t\t\t\t\t\t\t<a class=\"card-header-title card-header-title-from-database\" href=\"/tree/", "/\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<button class=\"card-header-icon\" aria-label=\"more options\">\n\t\t\t\t\t\t\t\t<span class=\"icon disabled\">\n\t\t\t\t\t\t\t\t*\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis commodi cum dicta ex excepturi in ipsa, iusto maxime molestiae nobis non officia officiis porro sunt, tempore vel vero, voluptates!\\t\\t\\t\\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<footer class=\"card-footer\">\n\t\t\t\t\t\t\t<span class=\"card-footer-item is-size-7\">\n\t\t\t\t\t\t\t\t<strong>", "</strong>: 10\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"card-footer-item is-size-7\">\n\t\t\t\t\t\t\t\t<strong>", "</strong>: 20.Mar 14:49\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</footer>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"])), treeData.ID, treeData.TITLE, Loc.getMessage('UP_PROJECTOR_PROJECT_LIST_TASKS_OPENED'), Loc.getMessage('UP_PROJECTOR_PROJECT_LIST_LAST_ACTIVITY'));
	        treeContainerNode.appendChild(treeNode);
	      });
	      this.rootNode.appendChild(treeContainerNode);
	    }
	  }]);
	  return TreeList;
	}();

	exports.TreeList = TreeList;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
