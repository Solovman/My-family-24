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
	    key: "getGenderCountByTreeId",
	    value: function getGenderCountByTreeId(treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.statistics.getGenderCountByTreeId', {
	          data: {
	            treeId: treeId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getHeightsByTreeId",
	    value: function getHeightsByTreeId(treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.statistics.getHeightsByTreeId', {
	          data: {
	            treeId: treeId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getWeightByTreeId",
	    value: function getWeightByTreeId(treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.statistics.getWeightByTreeId', {
	          data: {
	            treeId: treeId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getAgesByTreeId",
	    value: function getAgesByTreeId(treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.statistics.getAgesByTreeId', {
	          data: {
	            treeId: treeId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getTreesByUserId",
	    value: function getTreesByUserId() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.statistics.getTreesByUserId').then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var _templateObject;
	var Statistics = /*#__PURE__*/function () {
	  function Statistics() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Statistics);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Account: options.rootNodeId required');
	    }
	    if (main_core.Type.isStringFilled(options.rootSelectId)) {
	      this.rootSelectId = options.rootSelectId;
	    } else {
	      throw new Error('Account: options.rootSelectId required');
	    }
	    this.rootNode = BX(this.rootNodeId);
	    this.containerSelect = BX(this.rootSelectId);
	    if (!this.rootNode) {
	      throw new Error("Account: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    if (!this.containerSelect) {
	      throw new Error("Account: element with id \"".concat(this.containerSelect, "\" not found"));
	    }
	    this.trees = [];
	    this.loadTrees();
	  }
	  babelHelpers.createClass(Statistics, [{
	    key: "loadTrees",
	    value: function loadTrees() {
	      var _this = this;
	      Requests.getTreesByUserId().then(function (list) {
	        _this.trees = list;
	        _this.renderSelect();
	        _this.requestsData();
	      });
	    }
	  }, {
	    key: "requestsData",
	    value: function requestsData() {
	      var _this2 = this;
	      Requests.getGenderCountByTreeId(1).then(function (result) {
	        var data = _this2.splittingData(result);
	        _this2.renderStatistics('bar', data[0], data[1], ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'], 'Статистика по полу');
	      });
	      Requests.getAgesByTreeId(1).then(function (result) {
	        var data = _this2.splittingData(result);
	        var backgroundColor = [];
	        for (var i = 0; i < data[0].length; i++) {
	          backgroundColor.push(_this2.getRandomColor(0.5));
	        }
	        _this2.renderStatistics('bar', data[0], data[1], backgroundColor, 'Статистика по возрасту');
	      });
	      Requests.getHeightsByTreeId(1).then(function (result) {
	        var data = _this2.splittingData(result);
	        var backgroundColor = [];
	        for (var i = 0; i < data[0].length; i++) {
	          backgroundColor.push(_this2.getRandomColor(0.5));
	        }
	        _this2.renderStatistics('bar', data[0], data[1], backgroundColor, 'Статистика по росту');
	      });
	      Requests.getWeightByTreeId(1).then(function (result) {
	        var data = _this2.splittingData(result);
	        var backgroundColor = [];
	        for (var i = 0; i < data[0].length; i++) {
	          backgroundColor.push(_this2.getRandomColor(0.5));
	        }
	        _this2.renderStatistics('bar', data[0], data[1], backgroundColor, 'Статистика по весу');
	      });
	    }
	  }, {
	    key: "splittingData",
	    value: function splittingData(data) {
	      var keys = [];
	      var values = [];
	      for (var key in data) {
	        if (Object.hasOwnProperty.call(data, key)) {
	          if (data[key] && data[key] > 0) {
	            keys.push(key);
	            values.push(Number(data[key]));
	          }
	        }
	      }
	      return [keys, values];
	    }
	  }, {
	    key: "getRandomColor",
	    value: function getRandomColor() {
	      var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	      var r = Math.floor(Math.random() * 256);
	      var g = Math.floor(Math.random() * 256);
	      var b = Math.floor(Math.random() * 256);
	      return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
	    }
	  }, {
	    key: "renderStatistics",
	    value: function renderStatistics(type, labels, data) {
	      var backgroundColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	      var label = arguments.length > 4 ? arguments[4] : undefined;
	      var containerCanvas = document.createElement('div');
	      var canvas = document.createElement('canvas');
	      var labelCanvas = document.createElement('h2');
	      labelCanvas.textContent = label;
	      BX.addClass(containerCanvas, 'container-canvas');
	      BX.append(labelCanvas, containerCanvas);
	      BX.append(canvas, containerCanvas);
	      new Chart(canvas, {
	        type: type,
	        data: {
	          labels: labels,
	          datasets: [{
	            label: '# of Votes',
	            data: data,
	            borderWidth: 1,
	            backgroundColor: backgroundColor
	          }]
	        },
	        options: {
	          plugins: {
	            legend: {
	              display: false
	            }
	          },
	          scales: {
	            y: {
	              beginAtZero: true
	            }
	          }
	        }
	      });
	      BX.append(containerCanvas, this.rootNode);
	    }
	  }, {
	    key: "renderSelect",
	    value: function renderSelect() {
	      var select = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"select-box\">\n\t\t\t<h2 class=\"search__heading\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0440\u0435\u0432\u043E, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u043E\u043C\u0443 \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443</h2>\n\t\t\t<div class=\"select-box__current\" tabindex=\"1\">\n\t\t\t\t", "\n\t\t\t\n\t\t\t\t<img class=\"select-box__icon\" src=\"http://cdn.onlinewebfonts.com/svg/img_295694.svg\" alt=\"Arrow Icon\" aria-hidden=\"true\"/>\n\t\t\t</div>\n\t\t\t<ul class=\"select-box__list\">\n\t\t\t\t", "\n\t\t\t</ul>\n\t\t</div>"])), this.trees.map(function (item) {
	        return "\n\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" id=\"".concat(item.id, "\" value=\"").concat(item.id, "\" name=\"trees\" checked=\"checked\"/>\n\t\t\t\t\t\t<p id=\"tree").concat(item.id, "\" class=\"select-box__input-text\">").concat(item.title, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t");
	      }).join(''), this.trees.map(function (item) {
	        return "\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label class=\"select-box__option\" for=\"".concat(item.id, "\" aria-hidden=\"aria-hidden\">").concat(item.title, "</label>\n\t\t\t\t\t</li>\n           \t\t ");
	      }).join(''));
	      BX.append(select, this.containerSelect);
	    }
	  }]);
	  return Statistics;
	}();

	exports.Statistics = Statistics;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
