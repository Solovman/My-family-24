/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2;
	var TreeList = /*#__PURE__*/function () {
	  function TreeList() {
	    var _this = this;
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
	    var addButton = BX('addTreeButton');
	    addButton.addEventListener('click', function () {
	      _this.handleAddTreeButtonClick();
	    });
	    this.reload();
	  }
	  babelHelpers.createClass(TreeList, [{
	    key: "handleAddTreeButtonClick",
	    value: function handleAddTreeButtonClick() {
	      var _this2 = this;
	      var inputTitle = BX('treeTitleInput');
	      var treeTitle = inputTitle.value.trim();
	      var warningMessage = BX('warningMessage');
	      if (treeTitle !== '') {
	        this.addTree(treeTitle).then(function () {
	          inputTitle.value = '';
	          _this2.reload();
	        })["catch"](function (error) {
	          console.error('Error adding tree:', error);
	        });
	      } else {
	        warningMessage.textContent = 'Please enter a tree title!';
	        console.error('Tree title is empty');
	      }
	    }
	  }, {
	    key: "handleRemoveTreeButtonClick",
	    value: function handleRemoveTreeButtonClick() {
	      var _this3 = this;
	      var treeId = BX('treeId').value;
	      console.log(treeId);
	      if (treeId !== '') {
	        this.removeTree(treeId).then(function () {
	          _this3.reload();
	        })["catch"](function (error) {
	          console.error('Error remove tree:', error);
	        });
	      }
	    }
	  }, {
	    key: "reload",
	    value: function reload() {
	      var _this4 = this;
	      this.loadList().then(function (treeList) {
	        _this4.treeList = treeList;
	        console.log(_this4.treeList);
	        _this4.render();
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
	          var treeList = responce.data.trees;
	          resolve(treeList);
	        })["catch"](function (error) {
	          console.error(error);
	        });
	      });
	    }
	  }, {
	    key: "addTree",
	    value: function addTree(treeTitle) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.trees.addTree', {
	          data: {
	            treeTitle: treeTitle
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "removeTree",
	    value: function removeTree(id) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.trees.removeTree', {
	          data: {
	            id: id
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this5 = this;
	      this.rootNode.innerHTML = '';
	      var treeContainerNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["<div class=\"columns my-container\"></div>"])));
	      this.treeList.forEach(function (trees) {
	        var treeNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"columns is-multiline\">\n\t\t\t\t\t<div class=\"column is-two-fifth\">\n\t\t\t\t\t\t<div class=\"card\">\n\t\t\t\t\t\t\t<header class=\"card-header is-size-4 emerald-color\">\n\t\t\t\t\t\t\t\t\t<a href=\"/tree/", "/\" class=\"card-header-title\">\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t<form method=\"post\" action=\"/delete/\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"treeId\" value=\"", "\" id=\"treeId\">\n\t\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"card-header-icon\" aria-label=\"delete task\" id=\"delTreeButton\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"icon disabled\">\u274C</span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t<footer class=\"card-footer\">\n\t\t\t\t\t\t\t\t\t<span class=\"card-footer-item is-size-6\">\n\t\t\t\t\t\t\t\t\t\t<strong>Created at</strong>: ", "\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</footer>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t<?php\n\t\t\t\t\tendforeach; ?>\n\t\t\t\t</div>\n\t\t\t"])), trees.id, BX.util.htmlspecialchars(trees.title), trees.id, BX.date.format('d-m-Y', trees.createdAt));
	        // console.log(trees.id)
	        treeContainerNode.appendChild(treeNode);
	      });
	      this.rootNode.appendChild(treeContainerNode);
	      var removeButton = BX('delTreeButton');
	      removeButton.addEventListener('click', function () {
	        _this5.handleRemoveTreeButtonClick();
	      });
	    }
	  }]);
	  return TreeList;
	}();

	exports.TreeList = TreeList;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
