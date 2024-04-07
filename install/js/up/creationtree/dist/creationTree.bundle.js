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
	    key: "loadNodes",
	    value: function loadNodes() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.getPersons', {}).then(function (response) {
	          var nodesList = JSON.parse(response.data.tree);
	          console.log(response);
	          resolve(nodesList);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getRelation",
	    value: function getRelation(ids) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.getPersonRelation', {
	          data: {
	            ids: ids
	          }
	        }).then(function (response) {
	          var result = [];
	          var parent = response.data.personParent;
	          var married = response.data.personMarried;
	          result.push(parent, married);
	          resolve(result);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addNode",
	    value: function addNode(name, surname) {
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
	            },
	            relation: {
	              parentID: '',
	              childID: '',
	              personID: '',
	              partnerID: ''
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
	    this.nodeList = [];

	    //this.setEvent();

	    this.reload();
	  }
	  babelHelpers.createClass(CreationTree, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      Requests.loadNodes().then(function (nodeList) {
	        _this.nodeList = nodeList;
	        _this.render();
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	      var family = new FamilyTree(document.getElementById('tree'), {
	        mouseScrool: FamilyTree.none,
	        mode: 'light',
	        template: 'hugo',
	        nodeMenu: {
	          add: {
	            text: 'Add'
	          },
	          edit: {
	            text: 'Edit'
	          },
	          details: {
	            text: 'Details'
	          }
	        },
	        nodeBinding: {
	          field_0: 'NAME',
	          field_1: 'BIRTH_DATE'
	        },
	        editForm: {
	          titleBinding: "NAME",
	          photoBinding: "photo",
	          addMoreBtn: 'Add element',
	          addMore: 'Add more elements',
	          addMoreFieldName: 'Element name',
	          generateElementsFromFields: false,
	          elements: [{
	            type: 'textbox',
	            label: 'Full Name',
	            binding: 'NAME'
	          }, {
	            type: 'textbox',
	            label: 'Email Address',
	            binding: 'email'
	          }, [{
	            type: 'textbox',
	            label: 'Phone',
	            binding: 'phone'
	          }, {
	            type: 'date',
	            label: 'Date Of Birth',
	            binding: 'born'
	          }], [{
	            type: 'select',
	            options: [{
	              value: 'bg',
	              text: 'Bulgaria'
	            }, {
	              value: 'ru',
	              text: 'Russia'
	            }, {
	              value: 'gr',
	              text: 'Greece'
	            }],
	            label: 'Country',
	            binding: 'country'
	          }, {
	            type: 'textbox',
	            label: 'City',
	            binding: 'city'
	          }], {
	            type: 'textbox',
	            label: 'Photo Url',
	            binding: 'photo',
	            btn: 'Upload'
	          }]
	        }
	      });
	      FamilyTree.templates.tommy_male.defs = "<g transform=\"matrix(0.05,0,0,0.05,-12,-9)\" id=\"heart\">\n       \t\t\t <path fill=\"#F57C00\" d=\"M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z\"/>\n\t\t\t<g>\n\t\t\t";
	      family.on('expcollclick', function (sender, isCollapsing, nodeId) {
	        var node = family.getNode(nodeId);
	        if (isCollapsing) {
	          family.expandCollapse(nodeId, [], node.ftChildrenIds);
	        } else {
	          family.expandCollapse(nodeId, node.ftChildrenIds, []);
	        }
	        return false;
	      });
	      family.on('render-link', function (sender, args) {
	        if (args.cnode.ppid != undefined) args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + args.p.xa + '" y="' + args.p.ya + '"/>';
	        if (args.cnode.isPartner && args.node.partnerSeparation == 30) args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + args.p.xb + '" y="' + args.p.yb + '"/>';
	      });
	      var ids = [];
	      this.nodeList.forEach(function (node) {
	        ids.push(node.id);
	      });
	      Requests.getRelation(ids).then(function (data) {
	        var parents = data[0];
	        var married = data[1];
	        parents.forEach(function (parent) {
	          var nodeToUpdateParent = _this2.nodeList.find(function (node) {
	            return node.id === parent.id;
	          });
	          if (nodeToUpdateParent) {
	            if (!nodeToUpdateParent.parentIds) {
	              nodeToUpdateParent.parentIds = [];
	            }
	            if (!nodeToUpdateParent.parentIds.includes(parent.parentID)) {
	              nodeToUpdateParent.parentIds.push(parent.parentID);
	            }
	          }
	          nodeToUpdateParent.fid = nodeToUpdateParent.parentIds[0];
	          nodeToUpdateParent.mid = nodeToUpdateParent.parentIds[1];
	        });
	        married.forEach(function (partner) {
	          var nodeToUpdateMarried = _this2.nodeList.find(function (node) {
	            return node.id === partner.id;
	          });
	          if (nodeToUpdateMarried) {
	            if (!nodeToUpdateMarried.pids) {
	              nodeToUpdateMarried.pids = [];
	            }
	            if (!nodeToUpdateMarried.pids.includes(partner.partnerID)) {
	              nodeToUpdateMarried.pids.push(partner.partnerID);
	            }
	          }
	        });
	        family.load(_this2.nodeList);
	      });
	      console.log(this.nodeList);
	      family.nodeMenuUI.on('show', function (sender, args) {
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
	        var _this3 = this;
	        event.preventDefault();
	        var form = document.querySelector('.node__form');
	        var name = BX('name').value;
	        var surname = BX('surname').value;
	        Requests.addNode(name, surname).then(function (node) {
	          _this3.nodeList.push({
	            id: Math.floor(Math.random() * 100),
	            pid: Number(form.id),
	            name: name,
	            img: "https://cdn.balkan.app/shared/5.jpg"
	          });
	          _this3.render();
	        });
	      }.bind(this));
	    }
	  }]);
	  return CreationTree;
	}();

	exports.CreationTree = CreationTree;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
