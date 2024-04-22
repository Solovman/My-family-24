/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var ModalWindow = /*#__PURE__*/function () {
	  function ModalWindow() {
	    babelHelpers.classCallCheck(this, ModalWindow);
	  }
	  babelHelpers.createClass(ModalWindow, null, [{
	    key: "render",
	    value: function render() {
	      var modalPopup = BX.PopupWindowManager.create("ModalPopup", null, {
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
	            this.setContent(BX("bx_popup_modal_tree"));
	          }
	        }
	      });
	      modalPopup.show();
	    }
	  }]);
	  return ModalWindow;
	}();

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
	    var inputTitle = BX('treeTitleInput');
	    inputTitle.addEventListener('keypress', function (event) {
	      if (event.key === 'Enter') {
	        _this.handleAddTreeButtonClick();
	      }
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
	        this.addTree(treeTitle).then(function (result) {
	          if (result === false) {
	            ModalWindow.render();
	          }
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
	    value: function handleRemoveTreeButtonClick(element) {
	      var _this3 = this;
	      var treeId = parseInt(element.id.match(/\d+/));
	      if (treeId !== '') {
	        var confirmDelete = confirm("Are you sure you want to remove the tree?");
	        if (confirmDelete) {
	          this.removeTree(treeId).then(function () {
	            _this3.reload();
	          })["catch"](function (error) {
	            console.error('Error when deleting a tree:', error);
	          });
	        }
	      }
	    }
	  }, {
	    key: "reload",
	    value: function reload() {
	      var _this4 = this;
	      this.loadList().then(function (treeList) {
	        _this4.treeList = treeList;
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
	          // console.log( typeof treeList[0].createdAt)
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
	      var treeContainerNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["<div class=\"columns cards-container\"></div>"])));
	      this.treeList.forEach(function (trees) {
	        console.log(trees);
	        var treeNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"columns is-multiline\">\n\t\t\t\t\t<div class=\"column is-two-fifth\">\n\t\t\t\t\t\t<div class=\"card\" style=\"background: ", "\">\n\t\t\t\t\t\t\t<header class=\"card-header is-size-4\">\n\t\t\t\t\t\t\t\t\t<a href=\"/tree/", "/\" class=\"card-header-title\" style=\"color:white\">\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<input class=\"tree-card\" type=\"hidden\" name=\"treeId\" value=\"", "\" id=\"treeId", "\">\n\t\t\t\t\t\t\t\t\t\t\t<button id=\"button", "\" type=\"button\" class=\"card-header-icon delTreeButton\" aria-label=\"delete task\" data-tree-id=\"", "\">\n\t\t\t\t\t\t\t\t\t\t\t\t<span id=\"span", "\" class=\"icon disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t<?xml version=\"1.0\" ?>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<svg enable-background=\"new 0 0 40 40\" version=\"1.1\" viewBox=\"0 0 40 40\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<path fill=\"white\" d=\"M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z\"/></g>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<g><path fill=\"white\" d=\"M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z\"/></g><g>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<path fill=\"white\" d=\"M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z\"/></g><g>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<path fill=\"white\" d=\"M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</g><g><path fill=\"white\"  d=\"M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z\"/></g></svg>\n\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t<footer class=\"card-footer\">\n\t\t\t\t\t\t\t\t\t<span class=\"card-footer-item is-size-6\">\n\t\t\t\t\t\t\t\t\t\t<div style=\"font-size: 1.2em; color:white\"><strong style=\"color:white\">Created at :</strong> ", "</div>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</footer>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t<?php\n\t\t\t\t\tendforeach; ?>\n\t\t\t\t</div>\n\t\t\t"])), trees.color, trees.id, BX.util.htmlspecialchars(trees.title), trees.id, trees.id, trees.id, trees.id, trees.id, BX.date.format('d F Y', trees.createdAt));
	        treeContainerNode.appendChild(treeNode);
	      });
	      this.rootNode.appendChild(treeContainerNode);
	      var removeButtons = document.querySelectorAll('.delTreeButton');
	      removeButtons.forEach(function (button) {
	        button.addEventListener('click', function (event) {
	          _this5.handleRemoveTreeButtonClick(event.target);
	        });
	      });
	    }
	  }]);
	  return TreeList;
	}();

	exports.TreeList = TreeList;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
