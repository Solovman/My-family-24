/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var Requests = /*#__PURE__*/function () {
	  function Requests() {
	    babelHelpers.classCallCheck(this, Requests);
	  }
	  babelHelpers.createClass(Requests, null, [{
	    key: "loadNodes",
	    value: function loadNodes() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.getPersons', {}).then(function (response) {
	          var nodesList = response.data.tree;
	          resolve(nodesList);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "updateNode",
	    value: function updateNode(id, name, surname, birthDate, deathDate, gender) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.update', {
	          data: {
	            id: id,
	            updatablePerson: {
	              imageId: 0,
	              name: name,
	              surname: surname,
	              birthDate: birthDate,
	              deathDate: deathDate,
	              gender: gender,
	              treeId: 1
	            }
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "addNode",
	    value: function addNode(name, surname, gender, birthDate, deathDate, personConnectedIds, relationType) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.add', {
	          data: {
	            person: {
	              imageId: 0,
	              name: name,
	              surname: surname,
	              birthDate: birthDate,
	              deathDate: deathDate,
	              gender: gender,
	              treeId: 1
	            },
	            personConnectedIds: personConnectedIds,
	            relationType: relationType
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "removeNode",
	    value: function removeNode(id) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.node.remove', {
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
	  }]);
	  return Requests;
	}();

	var Helper = /*#__PURE__*/function () {
	  function Helper() {
	    babelHelpers.classCallCheck(this, Helper);
	  }
	  babelHelpers.createClass(Helper, null, [{
	    key: "addRelation",
	    value: function addRelation(list) {
	      list.familyRelations.forEach(function (parent) {
	        var nodeToUpdateParent = list.persons.find(function (node) {
	          return node.id === parent.childId;
	        });
	        var parents = list.persons.find(function (node) {
	          return node.id === parent.parentId;
	        });
	        if (parents.gender === 'male') {
	          nodeToUpdateParent.fid = parent.parentId;
	        } else {
	          nodeToUpdateParent.mid = parent.parentId;
	        }
	      });
	      list.familyRelationsMarried.forEach(function (partner) {
	        var nodeToUpdateMarried = list.persons.find(function (node) {
	          return node.id === partner.personID;
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
	    }
	  }, {
	    key: "isNumeric",
	    value: function isNumeric(str) {
	      return !isNaN(parseFloat(str)) && isFinite(str);
	    }
	  }, {
	    key: "formatDate",
	    value: function formatDate(date) {
	      var dateObject = new Date(date);
	      var day = dateObject.getDate();
	      var month = dateObject.getMonth() + 1;
	      var year = dateObject.getFullYear();
	      var formattedDay = day < 10 ? '0' + day : day;
	      var formattedMonth = month < 10 ? '0' + month : month;
	      return "".concat(formattedDay, ".").concat(formattedMonth, ".").concat(year);
	    }
	  }]);
	  return Helper;
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
	    this.reload();
	  }
	  babelHelpers.createClass(CreationTree, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      Requests.loadNodes().then(function (nodeList) {
	        _this.nodeList = nodeList;
	        console.log(_this.nodeList);
	        _this.render();
	      });
	    }
	  }, {
	    key: "tree",
	    value: function tree() {
	      var family = new FamilyTree(document.getElementById('tree'), {
	        mouseScrool: FamilyTree.action.scroll,
	        mode: 'light',
	        template: 'hugo',
	        nodeTreeMenu: true,
	        nodeMenu: {
	          remove: {
	            text: 'Remove'
	          },
	          edit: {
	            text: 'Edit'
	          },
	          details: {
	            text: 'Details'
	          }
	        },
	        nodes: this.nodeList.persons,
	        nodeBinding: {
	          field_0: 'name',
	          field_1: 'photo'
	        },
	        editForm: {
	          titleBinding: "name",
	          photoBinding: "photo",
	          addMore: null,
	          generateElementsFromFields: false,
	          elements: [{
	            type: 'textbox',
	            label: 'Name',
	            binding: 'name'
	          }, {
	            type: 'textbox',
	            label: 'Surname',
	            binding: 'surname'
	          }, [{
	            type: 'date',
	            label: 'Date Of Birth',
	            binding: 'born'
	          }, {
	            type: 'date',
	            label: 'Date Of Death',
	            binding: 'death'
	          }], [{
	            type: 'select',
	            options: [{
	              value: 'male',
	              text: 'Male'
	            }, {
	              value: 'female',
	              text: 'Female'
	            }],
	            label: 'Gender',
	            binding: 'gender'
	          }], {
	            type: 'textbox',
	            label: 'Photo Url',
	            binding: 'photo',
	            btn: 'Upload'
	          }]
	        }
	      });
	      var self = this;
	      var buttonPDF = BX('pdf');
	      var buttonJSON = BX('json');
	      BX.bind(buttonPDF, 'click', function () {
	        family.exportPDF();
	      });
	      BX.bind(buttonJSON, 'click', function (filename) {
	        family.exportJSON(filename);
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
	      var onUpdateNodeAdded = false;
	      var onUpdatePerson = false;
	      family.on('click', function (sender, args) {
	        if (args.node.id && typeof args.node.id === "string" && !onUpdateNodeAdded) {
	          onUpdateNodeAdded = true;
	          family.onUpdateNode(function (args) {
	            var updateNodes = args.updateNodesData;
	            var addNodes = args.addNodesData;
	            var removeNodes = args.removeNodeId;
	            if (Object.keys(addNodes).length === 0 && removeNodes === null) {
	              var gender = updateNodes[0].gender[0];
	              var name = updateNodes[0].name;
	              var surname = updateNodes[0].surname;
	              var birthDate = Helper.formatDate(updateNodes[0].born);
	              var deathDate;
	              if (updateNodes[0].death.length === 0) {
	                deathDate = null;
	              } else {
	                deathDate = Helper.formatDate(updateNodes[0].death);
	              }
	              var personConnectedId = [Number(updateNodes[0].pids[0])];
	              if (updateNodes[0].mid || updateNodes[0].fid) {
	                if (Helper.isNumeric(updateNodes[0].mid) && Helper.isNumeric(updateNodes[0].fid)) {
	                  personConnectedId = [Number(updateNodes[0].mid), Number(updateNodes[0].fid)];
	                } else if (Helper.isNumeric(updateNodes[0].mid) && !Helper.isNumeric(updateNodes[0].fid)) {
	                  personConnectedId = [Number(updateNodes[0].mid)];
	                } else if (Helper.isNumeric(updateNodes[0].fid) && !Helper.isNumeric(updateNodes[0].mid)) {
	                  personConnectedId = [Number(updateNodes[0].fid)];
	                }
	                Requests.addNode(name, surname, gender, birthDate, deathDate, personConnectedId, 'child').then(function (node) {
	                  self.reload();
	                });
	                return;
	              }
	              if (updateNodes[0].child && updateNodes[0].pids.length === 0 && updateNodes[0].pids[0] !== 0) {
	                if (updateNodes[0].child.mid) {
	                  personConnectedId = [updateNodes[0].child.mid];
	                } else {
	                  personConnectedId = [updateNodes[0].child.fid];
	                }
	                Requests.addNode(name, surname, gender, birthDate, deathDate, personConnectedId, 'parent').then(function (node) {
	                  self.reload();
	                });
	                return;
	              }
	              if (updateNodes[0].child && updateNodes[0].pids.length !== 0 && updateNodes[0].pids[0] !== 0) {
	                var partner = updateNodes[0].pids[0];
	                var childID = 0;
	                if (updateNodes[0].child.mid) {
	                  childID = updateNodes[0].child.mid;
	                } else {
	                  childID = updateNodes[0].child.fid;
	                }
	                personConnectedId = [partner, childID];
	                Requests.addNode(name, surname, gender, birthDate, deathDate, personConnectedId, 'partnerParent').then(function (node) {
	                  self.reload();
	                });
	                return;
	              }
	              if (updateNodes[0].pids.length !== 0) {
	                Requests.addNode(name, surname, gender, birthDate, deathDate, personConnectedId, 'partner').then(function (node) {
	                  self.reload();
	                });
	                return;
	              }
	              Requests.addNode(name, surname, gender, birthDate, deathDate, [0], 'init').then(function (node) {
	                self.reload();
	              });
	            }
	          });
	        } else if (!onUpdatePerson) {
	          onUpdatePerson = true;
	          family.onUpdateNode(function (args) {
	            if (Object.keys(args.addNodesData).length !== 0) {
	              return;
	            }
	            var updateNodes = args.updateNodesData;
	            var id = updateNodes[0].id;
	            var gender = updateNodes[0].gender[0];
	            var name = updateNodes[0].name;
	            var surname = updateNodes[0].surname;
	            var birthDate = Helper.formatDate(updateNodes[0].born);
	            var deathDate;
	            if (updateNodes[0].death.length === 0) {
	              deathDate = null;
	            } else {
	              deathDate = Helper.formatDate(updateNodes[0].death);
	            }
	            Requests.updateNode(id, name, surname, birthDate, deathDate, gender).then(function (node) {
	              self.reload();
	              return node;
	            });
	          });
	        }
	      });
	      family.onUpdateNode(function (args) {
	        var updateNodes = args.updateNodesData;
	        var addNodes = args.addNodesData;
	        var removeNodes = args.removeNodeId;
	        if (Object.keys(addNodes).length !== 0 && Object.keys(updateNodes).length !== 0 && removeNodes === null && !addNodes[0].pids) {
	          if (updateNodes[0].mid) {
	            addNodes[0].child = {
	              mid: Number(updateNodes[0].id)
	            };
	          } else if (updateNodes[0].fid) {
	            addNodes[0].child = {
	              fid: Number(updateNodes[0].id)
	            };
	          }
	        }
	        if (Object.keys(updateNodes).length === 2 && addNodes[0].pids) {
	          updateNodes.forEach(function (node) {
	            if (node.fid && node.fid === addNodes[0].id) {
	              addNodes[0].child = {
	                fid: updateNodes[0].id
	              };
	            } else if (node.mid && node.mid === addNodes[0].id) {
	              addNodes[0].child = {
	                mid: updateNodes[0].id
	              };
	            }
	          });
	        }
	      });
	      family.nodeMenuUI.on('show', function (sender, args) {
	        args.menu = {
	          edit: {
	            text: 'Edit'
	          },
	          remove: {
	            text: 'Remove',
	            onClick: function onClick() {
	              Requests.removeNode(args.firstNodeId).then(function (node) {
	                self.reload();
	              });
	            }
	          },
	          details: {
	            text: "Details"
	          }
	        };
	      });
	      return family;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      Helper.addRelation(this.nodeList);
	      this.tree();
	    }
	  }]);
	  return CreationTree;
	}();

	exports.CreationTree = CreationTree;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
