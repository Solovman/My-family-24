/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var RenderForm = /*#__PURE__*/function () {
	  function RenderForm() {
	    babelHelpers.classCallCheck(this, RenderForm);
	  }
	  babelHelpers.createClass(RenderForm, null, [{
	    key: "addForm",
	    value: function addForm(idNode) {
	      var form = document.querySelector('.node__form');
	      form.id = idNode;
	      var authPopup = BX.PopupWindowManager.create("FormPopup", null, {
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
	      authPopup.show();
	    }
	  }]);
	  return RenderForm;
	}();

	var Requests = /*#__PURE__*/function () {
	  function Requests() {
	    babelHelpers.classCallCheck(this, Requests);
	  }
	  babelHelpers.createClass(Requests, null, [{
	    key: "loadNode",
	    value: function loadNode(name, surname) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.add', {
	          data: {
	            person: {
	              imageId: 1,
	              name: name,
	              surname: surname,
	              birthDate: null,
	              deathDate: null,
	              gender: 'Male',
	              treeId: 1
	            }
	          }
	        }).then(function (response) {
	          console.log(response.data);
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var CreationTree = /*#__PURE__*/function () {
	  function CreationTree() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, CreationTree);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('TaskList: options.rootNodeId required');
	    }
	    this.rootNode = BX(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("TaskList: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.nodeList = [{
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
	    }];

	    //data-n-id

	    this.setEvent();
	  }
	  babelHelpers.createClass(CreationTree, [{
	    key: "render",
	    value: function render() {
	      var chart = new OrgChart(document.getElementById("tree"), {
	        nodeMenu: {},
	        nodeBinding: {
	          field_0: "name",
	          img_0: "img"
	        }
	      });
	      chart.load(this.nodeList);
	      chart.nodeMenuUI.on('show', function (sender, args) {
	        args.menu = {
	          add: {
	            text: "Add",
	            onClick: function onClick() {
	              RenderForm.addForm(args.firstNodeId);
	            }
	          },
	          edit: {
	            text: 'Edit'
	          },
	          remove: {
	            text: 'Remove'
	          },
	          details: {
	            text: "Details"
	          }
	        };
	      });
	    }
	  }, {
	    key: "setEvent",
	    value: function setEvent() {
	      var submitButtonAdd = BX('addPerson');
	      BX.bind(submitButtonAdd, 'click', function (event) {
	        var _this = this;
	        event.preventDefault();
	        var form = document.querySelector('.node__form');
	        var name = BX('name').value;
	        var surname = BX('surname').value;
	        Requests.loadNode(name, surname).then(function (node) {
	          _this.nodeList.push({
	            id: Math.floor(Math.random() * 100),
	            pid: Number(form.id),
	            name: name,
	            img: "https://cdn.balkan.app/shared/5.jpg"
	          });
	          _this.render();
	        });
	      }.bind(this));
	    }
	  }]);
	  return CreationTree;
	}();

	exports.CreationTree = CreationTree;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
