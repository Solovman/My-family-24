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
	    key: "getListTrees",
	    value: function getListTrees() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.search.getUserTrees').then(function (response) {
	          var trees = response.data.trees;
	          resolve(trees);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getUsersPersons",
	    value: function getUsersPersons(treeId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.search.getPersonsUsers', {
	          data: {
	            treeId: treeId
	          }
	        }).then(function (response) {
	          var infoUsersPersons = response.data.infoUsersPersons;
	          resolve(infoUsersPersons);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var _templateObject;
	var Search = /*#__PURE__*/function () {
	  function Search() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Search);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Search: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Search: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.trees = [];
	    this.loadTrees();
	  }
	  babelHelpers.createClass(Search, [{
	    key: "loadTrees",
	    value: function loadTrees() {
	      var _this = this;
	      Requests.getListTrees().then(function (list) {
	        _this.trees = list;
	        _this.renderSelect();
	        _this.setEvents();
	      });
	    }
	  }, {
	    key: "setEvents",
	    value: function setEvents() {
	      var btnSearch = BX('search-relatives');
	      BX.bind(btnSearch, 'click', function (event) {
	        var treeId;
	        var selectBoxInput = document.querySelectorAll('.select-box__input-text');
	        selectBoxInput.forEach(function (input) {
	          var displayStyle = window.getComputedStyle(input).display;
	          if (displayStyle === 'block') {
	            treeId = parseInt(input.id.match(/\d+/));
	          }
	        });
	        Requests.getUsersPersons(treeId).then(function (result) {
	          console.log(result);
	        });
	      });
	    }
	  }, {
	    key: "renderSelect",
	    value: function renderSelect() {
	      var select = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"select-box\">\n\t\t\t<h2 class=\"search__heading\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0440\u0435\u0432\u043E, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u043E\u043C\u0443 \u0445\u043E\u0442\u0438\u0442\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043F\u043E\u0438\u0441\u043A</h2>\n\t\t\t<div class=\"select-box__current\" tabindex=\"1\">\n\t\t\t\t", "\n\t\t\t\n\t\t\t\t<img class=\"select-box__icon\" src=\"http://cdn.onlinewebfonts.com/svg/img_295694.svg\" alt=\"Arrow Icon\" aria-hidden=\"true\"/>\n\t\t\t</div>\n\t\t\t<ul class=\"select-box__list\">\n\t\t\t\t", "\n\t\t\t</ul>\n\t\t</div>"])), this.trees.map(function (item) {
	        return "\n\t\t\t\t\t<div class=\"select-box__value\">\n\t\t\t\t\t\t<input class=\"select-box__input\" type=\"radio\" id=\"".concat(item.id, "\" value=\"").concat(item.id, "\" name=\"trees\" checked=\"checked\"/>\n\t\t\t\t\t\t<p id=\"tree").concat(item.id, "\" class=\"select-box__input-text\">").concat(item.title, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t");
	      }).join(''), this.trees.map(function (item) {
	        return "\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label class=\"select-box__option\" for=\"".concat(item.id, "\" aria-hidden=\"aria-hidden\">").concat(item.title, "</label>\n\t\t\t\t\t</li>\n           \t\t ");
	      }).join(''));
	      BX.append(select, this.rootNode);
	    }
	  }]);
	  return Search;
	}();

	exports.Search = Search;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
