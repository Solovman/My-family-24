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
	  }, {
	    key: "getEducationCountByTreeId",
	    value: function getEducationCountByTreeId(treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.statistics.getEducationCountByTreeId', {
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
	  }]);
	  return Requests;
	}();

	var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
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
	    this.isHandle = false;
	    this.loadTrees();
	  }
	  babelHelpers.createClass(Statistics, [{
	    key: "loadTrees",
	    value: function loadTrees() {
	      var _this = this;
	      Requests.getTreesByUserId().then(function (list) {
	        _this.trees = list;
	        _this.renderSelect();
	        if (_this.trees.length === 0) {
	          var noTree = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t<div style=\"text-align: center\">\n\t\t\t\t\t\t<h2 style=\"font-size: 24px\">\u041D\u0435\u0442 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432</h2>\n\t\t\t\t\t</div>\n\t\t\t\t"])));
	          _this.rootNode.style.display = 'block';
	          BX.append(noTree, _this.rootNode);
	          return;
	        }
	        var treeId;
	        var type;
	        var statistics;
	        var selectBoxInput = document.querySelectorAll('.select-box__input-text');
	        var selectBoxInputType = document.querySelectorAll('.select-box__input-text-type');
	        var checkboxStatistics = document.querySelectorAll('.input-checkbox');
	        checkboxStatistics.forEach(function (checkbox) {
	          BX.bind(checkbox, 'click', function () {
	            checkboxStatistics.forEach(function (el) {
	              el.checked = false;
	            });
	            if (checkbox.id === 'age' || checkbox.id === 'weight' || checkbox.id === 'height') {
	              selectBoxInputType.forEach(function (input) {
	                input.style.display = 'none';
	                BX('bar').style.display = 'block';
	              });
	              document.querySelectorAll('.select-box__option').forEach(function (select) {
	                if (select.htmlFor === 'doughnutinput' || select.htmlFor === 'pieinput') {
	                  select.style.display = 'none';
	                }
	              });
	            } else {
	              BX('bar').removeAttribute('style');
	              selectBoxInputType.forEach(function (input) {
	                input.removeAttribute('style');
	              });
	              document.querySelectorAll('.select-box__option').forEach(function (select) {
	                select.style.display = 'block';
	              });
	            }
	            checkbox.checked = true;
	          });
	        });
	        selectBoxInput.forEach(function (input) {
	          var displayStyle = window.getComputedStyle(input).display;
	          if (displayStyle === 'block') {
	            treeId = _this.trees.find(function (item) {
	              return item.id === parseInt(input.id.match(/\d+/));
	            }).id;
	          }
	        });
	        _this.requestsData(treeId, 'pie', 'gender');
	        var btnSendStatistics = BX('statistics-send');
	        if (!_this.isHandle) {
	          _this.isHandle = true;
	          BX.bind(btnSendStatistics, 'click', function () {
	            BX('statistics-send').disabled = true;
	            selectBoxInput.forEach(function (input) {
	              statistics = [];
	              var displayStyle = window.getComputedStyle(input).display;
	              if (displayStyle === 'block') {
	                treeId = _this.trees.find(function (item) {
	                  return item.id === parseInt(input.id.match(/\d+/));
	                }).id;
	              }
	            });
	            selectBoxInputType.forEach(function (input) {
	              var displayStyle = window.getComputedStyle(input).display;
	              if (displayStyle === 'block') {
	                type = input.id;
	              }
	            });
	            checkboxStatistics.forEach(function (checkbox) {
	              if (checkbox.checked) {
	                statistics = checkbox.id;
	              }
	            });
	            _this.requestsData(treeId, type, statistics);
	          });
	        }
	      });
	    }
	  }, {
	    key: "requestsData",
	    value: function requestsData(treeID, type, statistics) {
	      var _this2 = this;
	      this.rootNode.innerHTML = '';
	      if (statistics === 'gender') {
	        Requests.getGenderCountByTreeId(treeID).then(function (result) {
	          var data = _this2.splittingData(result);
	          if (data[0].length === 0 || data[1].length === 0) {
	            var noData = document.createElement('span');
	            noData.textContent = 'Нет данных для построения графика';
	            BX.addClass(noData, 'no-data');
	            BX.append(noData, _this2.rootNode);
	            BX('statistics-send').disabled = false;
	            return;
	          }
	          _this2.renderStatistics(type, data[0], data[1], ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'], 'Статистика по полу');
	          BX('statistics-send').disabled = false;
	        });
	      }
	      if (statistics === 'age') {
	        Requests.getAgesByTreeId(treeID).then(function (result) {
	          console.log(result);
	          var data = _this2.splittingData(result);
	          var backgroundColor = [];
	          for (var i = 0; i < data[0].length; i++) {
	            backgroundColor.push(_this2.getRandomColor(0.5));
	          }
	          if (data[0].length === 0 || data[1].length === 0) {
	            var noData = document.createElement('span');
	            noData.textContent = 'Нет данных для построения графика';
	            BX.addClass(noData, 'no-data');
	            BX.append(noData, _this2.rootNode);
	            BX('statistics-send').disabled = false;
	            return;
	          }
	          _this2.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по возрасту');
	          BX('statistics-send').disabled = false;
	        });
	      }
	      if (statistics === 'height') {
	        Requests.getHeightsByTreeId(treeID).then(function (result) {
	          var data = _this2.splittingData(result);
	          var backgroundColor = [];
	          for (var i = 0; i < data[0].length; i++) {
	            backgroundColor.push(_this2.getRandomColor(0.5));
	          }
	          if (data[0].length === 0 || data[1].length === 0) {
	            var noData = document.createElement('span');
	            noData.textContent = 'Нет данных для построения графика';
	            BX.addClass(noData, 'no-data');
	            BX.append(noData, _this2.rootNode);
	            BX('statistics-send').disabled = false;
	            return;
	          }
	          _this2.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по росту');
	          BX('statistics-send').disabled = false;
	        });
	      }
	      if (statistics === 'weight') {
	        Requests.getWeightByTreeId(treeID).then(function (result) {
	          var data = _this2.splittingData(result);
	          var backgroundColor = [];
	          for (var i = 0; i < data[0].length; i++) {
	            backgroundColor.push(_this2.getRandomColor(0.5));
	          }
	          if (data[0].length === 0 || data[1].length === 0) {
	            var noData = document.createElement('span');
	            noData.textContent = 'Нет данных для построения графика';
	            BX.addClass(noData, 'no-data');
	            BX.append(noData, _this2.rootNode);
	            BX('statistics-send').disabled = false;
	            return;
	          }
	          _this2.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по весу');
	          BX('statistics-send').disabled = false;
	        });
	      }
	      if (statistics === 'education') {
	        Requests.getEducationCountByTreeId(treeID).then(function (result) {
	          var data = _this2.splittingData(result);
	          var backgroundColor = [];
	          for (var i = 0; i < data[0].length; i++) {
	            backgroundColor.push(_this2.getRandomColor(0.5));
	          }
	          if (data[0].length === 0 || data[1].length === 0) {
	            var noData = document.createElement('span');
	            noData.textContent = 'Нет данных для построения графика';
	            BX.addClass(noData, 'no-data');
	            BX.append(noData, _this2.rootNode);
	            BX('statistics-send').disabled = false;
	            return;
	          }
	          _this2.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по уровню образования');
	          BX('statistics-send').disabled = false;
	        });
	      }
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
	      var options;
	      labelCanvas.textContent = label;
	      BX.addClass(labelCanvas, 'heading-graphs');
	      BX.addClass(containerCanvas, 'container-canvas');
	      if (type === 'bar') {
	        containerCanvas.style.width = '70%';
	        labelCanvas.style.left = '26%';
	      }
	      if (label === 'Статистика по уровню образования') {
	        labelCanvas.style.left = '20%';
	      }
	      containerCanvas.innerHTML = '';
	      BX.append(labelCanvas, containerCanvas);
	      BX.append(canvas, containerCanvas);
	      if (type === 'doughnut' || type === 'pie') {
	        options = {
	          plugins: {
	            legend: {
	              display: false
	            }
	          },
	          scales: {
	            y: {
	              display: false
	            }
	          }
	        };
	      } else {
	        options = {
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
	        };
	      }
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
	        options: options
	      });
	      BX.append(containerCanvas, this.rootNode);
	    }
	  }, {
	    key: "renderSelect",
	    value: function renderSelect() {
	      var select = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"select-box\">\n\t\t\t<h2 class=\"search__heading\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0440\u0435\u0432\u043E, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u043E\u043C\u0443 \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443</h2>\n\t\t\t<div class=\"select-box__current\" tabindex=\"1\">\n\t\t\t\t", "\n\t\t\t\t\n\t\t\t\t<img class=\"select-box__icon\" src=\"http://cdn.onlinewebfonts.com/svg/img_295694.svg\" alt=\"Arrow Icon\" aria-hidden=\"true\"/>\n\t\t\t</div>\n\t\t\t<ul class=\"select-box__list\">\n\t\t\t\t", "\n\t\t\t</ul>\n\t\t</div>"])), this.trees.length === 0 ? "\n\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t<input id=\"no-tree\" class=\"select-box__input\" type=\"radio\" name=\"trees\" checked=\"checked\"/>\n\t\t\t\t\t\t<p class=\"select-box__input-text\">\u041D\u0435\u0442 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432</p>\n\t\t\t\t\t</div>\n\t\t\t\t" : "\n\t\t\t\t\t".concat(this.trees.map(function (item) {
	        return "\n\t\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" id=\"".concat(item.id, "\" value=\"").concat(item.id, "\" name=\"trees\" checked=\"checked\"/>\n\t\t\t\t\t\t\t<p id=\"tree").concat(item.id, "\" class=\"select-box__input-text\">").concat(BX.util.htmlspecialchars(item.title), "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t");
	      }).join(''), "\n\t\t\t\t"), this.trees.length === 0 ? "\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label class=\"select-box__option\" for=\"no-tree\" aria-hidden=\"aria-hidden\">\u041D\u0435\u0442 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432</label>\n\t\t\t\t\t</li>\n\t\t\t\t" : "\n\t\t\t\t\t".concat(this.trees.map(function (item) {
	        return "\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label class=\"select-box__option\" for=\"".concat(item.id, "\" aria-hidden=\"aria-hidden\">").concat(BX.util.htmlspecialchars(item.title), "</label>\n\t\t\t\t\t</li>\n           \t\t ");
	      }).join('')));
	      var selectType = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"select-box\">\n\t\t\t\t<h2 class=\"search__heading\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0438\u0434 \u0433\u0440\u0430\u0444\u0438\u043A\u043E\u0432</h2>\n\t\t\t\t<div class=\"select-box__current\" tabindex=\"1\">\n\t\t\t\t\t<div  class=\"select-box__value\">\n\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" id=\"doughnutinput\" value=\"doughnut\" name=\"typeStatistics\" checked=\"checked\"/>\n\t\t\t\t\t\t<p id=\"doughnut\" class=\"select-box__input-text-type\">", "</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" id=\"barinput\" value=\"bar\" name=\"typeStatistics\" checked=\"checked\"/>\n\t\t\t\t\t\t<p id=\"bar\" class=\"select-box__input-text-type\">", "</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" id=\"pieinput\" value=\"pie\" name=\"typeStatistics\" checked=\"checked\"/>\n\t\t\t\t\t\t<p id=\"pie\" class=\"select-box__input-text-type\">", "</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<img class=\"select-box__icon\" src=\"http://cdn.onlinewebfonts.com/svg/img_295694.svg\" alt=\"Arrow Icon\" aria-hidden=\"true\"/>\n\t\t\t\t</div>\n\t\t\t\t<ul class=\"select-box__list\">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label class=\"select-box__option\" for=\"doughnutinput\" aria-hidden=\"aria-hidden\">", "</label>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label class=\"select-box__option\" for=\"barinput\" aria-hidden=\"aria-hidden\">", "</label>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label class=\"select-box__option\" for=\"pieinput\" aria-hidden=\"aria-hidden\">", "</label>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t"])), BX.message('UP_TREE_STATISTIC_DOUGHNUT'), BX.message('UP_TREE_STATISTIC_BAR'), BX.message('UP_TREE_STATISTIC_PIE'), BX.message('UP_TREE_STATISTIC_DOUGHNUT'), BX.message('UP_TREE_STATISTIC_BAR'), BX.message('UP_TREE_STATISTIC_PIE'));
	      var renderCheckbox = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t<ul class=\"action-list\">\n\t\t\t<li class=\"action-item\">\n\t\t\t\t<label for=\"gender\" class=\"label-checkbox\">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u043F\u043E\u043B\u0443</label>\n\t\t\t\t<label class=\"checkbox\">\n\t\t\t\t\t<input checked id=\"gender\" value=\"gender\" class=\"input-checkbox\" type=\"checkbox\" />\n\t\t\t\t\t<svg viewBox=\"0 0 21 18\">\n\t\t\t\t\t\t<symbol id=\"tick-path-gender\" viewBox=\"0 0 21 18\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69\" fill=\"none\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n\t\t\t\t\t\t</symbol>\n\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<mask id=\"tick-gender\">\n\t\t\t\t\t\t\t\t<use class=\"tick mask\" href=\"#tick-path-gender\" />\n\t\t\t\t\t\t\t</mask>\n\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t<use class=\"tick\" href=\"#tick-path-gender\" stroke=\"currentColor\" />\n\t\t\t\t\t\t<path fill=\"white\" mask=\"url(#tick-gender)\" d=\"M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z\" />\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg class=\"lines\" viewBox=\"0 0 11 11\">\n\t\t\t\t\t\t<path d=\"M5.88086 5.89441L9.53504 4.26746\" />\n\t\t\t\t\t\t<path d=\"M5.5274 8.78838L9.45391 9.55161\" />\n\t\t\t\t\t\t<path d=\"M3.49371 4.22065L5.55387 0.79198\" />\n\t\t\t\t\t</svg>\n\t\t\t\t</label>\n\t\t\t</li>\n\t\t\t<li class=\"action-item\">\n\t\t\t\t<label for=\"age\" class=\"label-checkbox\">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0443</label>\n\t\t\t\t<label class=\"checkbox\">\n\t\t\t\t\t<input id=\"age\" value=\"age\" class=\"input-checkbox\" type=\"checkbox\" />\n\t\t\t\t\t<svg viewBox=\"0 0 21 18\">\n\t\t\t\t\t\t<symbol id=\"tick-path-age\" viewBox=\"0 0 21 18\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69\" fill=\"none\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n\t\t\t\t\t\t</symbol>\n\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<mask id=\"tick-age\">\n\t\t\t\t\t\t\t\t<use class=\"tick mask\" href=\"#tick-path-age\" />\n\t\t\t\t\t\t\t</mask>\n\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t<use class=\"tick\" href=\"#tick-path-age\" stroke=\"currentColor\" />\n\t\t\t\t\t\t<path fill=\"white\" mask=\"url(#tick-age)\" d=\"M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z\" />\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg class=\"lines\" viewBox=\"0 0 11 11\">\n\t\t\t\t\t\t<path d=\"M5.88086 5.89441L9.53504 4.26746\" />\n\t\t\t\t\t\t<path d=\"M5.5274 8.78838L9.45391 9.55161\" />\n\t\t\t\t\t\t<path d=\"M3.49371 4.22065L5.55387 0.79198\" />\n\t\t\t\t\t</svg>\n\t\t\t\t</label>\n\t\t\t</li>\n\t\t\t<li class=\"action-item\">\n\t\t\t\t<label for=\"weight\" class=\"label-checkbox\">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u0432\u0435\u0441\u0443</label>\n\t\t\t\t<label class=\"checkbox\">\n\t\t\t\t\t<input id=\"weight\" value=\"weight\" class=\"input-checkbox\" type=\"checkbox\" />\n\t\t\t\t\t<svg viewBox=\"0 0 21 18\">\n\t\t\t\t\t\t<symbol id=\"tick-path-weight\" viewBox=\"0 0 21 18\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69\" fill=\"none\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n\t\t\t\t\t\t</symbol>\n\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<mask id=\"tick-weight\">\n\t\t\t\t\t\t\t\t<use class=\"tick mask\" href=\"#tick-path-weight\" />\n\t\t\t\t\t\t\t</mask>\n\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t<use class=\"tick\" href=\"#tick-path-weight\" stroke=\"currentColor\" />\n\t\t\t\t\t\t<path fill=\"white\" mask=\"url(#tick-weight)\" d=\"M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z\" />\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg class=\"lines\" viewBox=\"0 0 11 11\">\n\t\t\t\t\t\t<path d=\"M5.88086 5.89441L9.53504 4.26746\" />\n\t\t\t\t\t\t<path d=\"M5.5274 8.78838L9.45391 9.55161\" />\n\t\t\t\t\t\t<path d=\"M3.49371 4.22065L5.55387 0.79198\" />\n\t\t\t\t\t</svg>\n\t\t\t\t</label>\n\t\t\t</li>\n\t\t\t<li class=\"action-item\">\n\t\t\t\t<label for=\"height\" class=\"label-checkbox\">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u0440\u043E\u0441\u0442\u0443</label>\n\t\t\t\t<label class=\"checkbox\">\n\t\t\t\t\t<input id=\"height\" value=\"height\" class=\"input-checkbox\" type=\"checkbox\" />\n\t\t\t\t\t<svg viewBox=\"0 0 21 18\">\n\t\t\t\t\t\t<symbol id=\"tick-path-height\" viewBox=\"0 0 21 18\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69\" fill=\"none\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n\t\t\t\t\t\t</symbol>\n\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<mask id=\"tick-height\">\n\t\t\t\t\t\t\t\t<use class=\"tick mask\" href=\"#tick-path-height\" />\n\t\t\t\t\t\t\t</mask>\n\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t<use class=\"tick\" href=\"#tick-path-height\" stroke=\"currentColor\" />\n\t\t\t\t\t\t<path fill=\"white\" mask=\"url(#tick-height)\" d=\"M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z\" />\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg class=\"lines\" viewBox=\"0 0 11 11\">\n\t\t\t\t\t\t<path d=\"M5.88086 5.89441L9.53504 4.26746\" />\n\t\t\t\t\t\t<path d=\"M5.5274 8.78838L9.45391 9.55161\" />\n\t\t\t\t\t\t<path d=\"M3.49371 4.22065L5.55387 0.79198\" />\n\t\t\t\t\t</svg>\n\t\t\t\t</label>\n\t\t\t</li>\n\t\t\t<li class=\"action-item\">\n\t\t\t\t<label for=\"education\" class=\"label-checkbox\">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u0443\u0440\u043E\u0432\u043D\u044E \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F</label>\n\t\t\t\t<label class=\"checkbox\">\n\t\t\t\t\t<input id=\"education\" value=\"education\" class=\"input-checkbox\" type=\"checkbox\" />\n\t\t\t\t\t<svg viewBox=\"0 0 21 18\">\n\t\t\t\t\t\t<symbol id=\"tick-path-education\" viewBox=\"0 0 21 18\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69\" fill=\"none\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n\t\t\t\t\t\t</symbol>\n\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<mask id=\"tick-education\">\n\t\t\t\t\t\t\t\t<use class=\"tick mask\" href=\"#tick-path-education\" />\n\t\t\t\t\t\t\t</mask>\n\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t<use class=\"tick\" href=\"#tick-path-education\" stroke=\"currentColor\" />\n\t\t\t\t\t\t<path fill=\"white\" mask=\"url(#tick-education)\" d=\"M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z\" />\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg class=\"lines\" viewBox=\"0 0 11 11\">\n\t\t\t\t\t\t<path d=\"M5.88086 5.89441L9.53504 4.26746\" />\n\t\t\t\t\t\t<path d=\"M5.5274 8.78838L9.45391 9.55161\" />\n\t\t\t\t\t\t<path d=\"M3.49371 4.22065L5.55387 0.79198\" />\n\t\t\t\t\t</svg>\n\t\t\t\t</label>\n\t\t\t</li>\n\t\t</ul>"])));
	      var getButtonStatistics = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"container-btn-statistics\">\n\t\t\t\t<button id=\"statistics-send\" class=\"btn-statistics\">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443</button>\n\t\t\t</div>\n\t\t"])));
	      BX.append(select, this.containerSelect);
	      BX.append(selectType, this.containerSelect);
	      BX.append(renderCheckbox, this.containerSelect);
	      BX.append(getButtonStatistics, this.containerSelect);
	      BX('statistics-send').disabled = this.trees.length === 0;
	    }
	  }]);
	  return Statistics;
	}();

	exports.Statistics = Statistics;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
