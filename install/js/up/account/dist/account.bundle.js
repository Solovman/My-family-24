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
	    key: "getInformation",
	    value: function getInformation() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.account.getUserInfo', {}).then(function (response) {
	          var userInfo = response.data.userInfo;
	          resolve(userInfo);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getAvatars",
	    value: function getAvatars() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.account.getAvatars', {}).then(function (response) {
	          var avatars = response.data.avatars;
	          resolve(avatars);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "updateUserImagesByAvatarId",
	    value: function updateUserImagesByAvatarId(avatarId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.account.updateUserImagesByAvatarId', {
	          data: {
	            avatarId: avatarId
	          }
	        }).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getUserFileName",
	    value: function getUserFileName() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tree.account.getUserFileName', {}).then(function (response) {
	          resolve(response.data);
	        })["catch"](function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return Requests;
	}();

	var _templateObject, _templateObject2, _templateObject3, _templateObject4;
	var Content = /*#__PURE__*/function () {
	  function Content() {
	    babelHelpers.classCallCheck(this, Content);
	  }
	  babelHelpers.createClass(Content, null, [{
	    key: "render",
	    value: function render(list) {
	      var container = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"avatars__choose-container\">\n\t\t\t\t<h2 class=\"avatars__choose\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u0432\u0430\u0442\u0430\u0440</h2>\n\t\t\t</div>\n\t\t"])));
	      var avatarsContainer = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<ul id=\"avatars__list\"></ul>\n\t\t"])));
	      var btnSave = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button id=\"avatars__save\">\n\t\t\t\t<div id=\"spinner-save\" class=\"spinner-border text-light\" role=\"status\">\n\t\t\t\t  <span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t</div>\n\t\t\t\t\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\n\t\t\t</button>\n\t\t"])));
	      list.forEach(function (avatar) {
	        var icon = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li  class=\"avatars__item\">\n\t\t\t\t<span data-item-active=\"", "\" class=\"article__active\">\n\t\t\t\t\t<svg height=\"30px\" width=\"30px\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\t\t\tviewBox=\"0 0 512 512\" xml:space=\"preserve\">\n\t\t\t\t\t\t<path style=\"fill:#00ceaa;\" d=\"M256,504C119.033,504,8,392.967,8,256S119.033,8,256,8s248,111.034,248,248\n\t\t\t\t\t\tC503.846,392.902,392.902,503.846,256,504z\"/>\n\t\t\t\t\t\t<path style=\"fill:#00ceaa;\" d=\"M256,16c132.548,0,240,107.452,240,240S388.548,496,256,496S16,388.548,16,256\n\t\t\t\t\t\tC16.15,123.513,123.513,16.15,256,16 M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z\"\n\t\t\t\t\t\t/>\n\t\t\t\t\t\t<polygon style=\"fill:#FFFFFF;\" points=\"345.032,137.848 216.896,295.887 163.04,242.728 127.528,281.848 221.056,374.152 \n\t\t\t\t\t\t384.472,172.608 \"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\t\t\t\t<button data-id-avatar=\"", "\" class=\"avatars__btn\">\n\t\t\t\t\t<img data-id-avatar=\"", "\" class=\"avatars__img\" src=\"", "\" alt=\"avatar", "\">\n\t\t\t\t</button>\n\t\t\t</li>\n\t\t"])), avatar.ID, avatar.ID, avatar.ID, avatar.FILE_NAME, avatar.ID);
	        BX.append(icon, avatarsContainer);
	      });
	      BX.append(avatarsContainer, container);
	      BX.append(btnSave, container);
	      return container;
	    }
	  }]);
	  return Content;
	}();

	var Window = /*#__PURE__*/function () {
	  function Window() {
	    babelHelpers.classCallCheck(this, Window);
	  }
	  babelHelpers.createClass(Window, null, [{
	    key: "render",
	    value: function render(list) {
	      var popupId = "ModalPopup_" + new Date().getTime();
	      var modalPopup = BX.PopupWindowManager.create(popupId, null, {
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
	            var _this = this;
	            this.setContent(Content.render(list));
	            var userNowAvatarId = BX('user-icon').dataset.idFile;
	            var icons = document.querySelectorAll('.avatars__btn');
	            var btnSave = BX('avatars__save');
	            var iconsAvatar = document.querySelectorAll('.avatars__btn');
	            var avatarId;
	            icons.forEach(function (icon) {
	              if (icon.dataset.idAvatar === userNowAvatarId) {
	                BX.addClass(icon, 'is-active');
	                var check = document.querySelector("[data-item-active=\"".concat(icon.dataset.idAvatar, "\"]"));
	                check.style.display = 'block';
	              }
	              BX.bind(icon, 'click', function (event) {
	                var checks = document.querySelectorAll('.article__active');
	                checks.forEach(function (check) {
	                  check.style.display = 'none';
	                });
	                icons.forEach(function (icon) {
	                  BX.removeClass(icon, 'is-active');
	                });
	                var activeBtn = event.currentTarget;
	                var btnId = activeBtn.dataset.idAvatar;
	                var activeCheck = document.querySelector("[data-item-active=\"".concat(btnId, "\"]"));
	                activeCheck.style.display = 'block';
	                BX.addClass(activeBtn, 'is-active');
	              });
	            });
	            BX.bind(btnSave, 'click', function () {
	              btnSave.disabled = true;
	              iconsAvatar.forEach(function (icon) {
	                if (icon.classList.contains('is-active')) {
	                  avatarId = Number(icon.dataset.idAvatar);
	                }
	              });
	              Requests.updateUserImagesByAvatarId(avatarId).then(function (result) {
	                new Account({
	                  rootNodeId: 'data-profile'
	                });
	                console.log(avatarId);
	                BX('headerIcon').src = document.querySelector("img[data-id-avatar=\"".concat(avatarId, "\"]")).src;
	                console.log(document.querySelector("[data-id-avatar=\"".concat(avatarId, "\"]")));
	                btnSave.disabled = false;
	                _this.destroy();
	              });
	            });
	          },
	          onPopupClose: function onPopupClose() {
	            this.destroy();
	          }
	        }
	      });
	      modalPopup.show();
	    }
	  }]);
	  return Window;
	}();

	var _templateObject$1;
	var Account = /*#__PURE__*/function () {
	  function Account() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Account);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Account: options.rootNodeId required');
	    }
	    this.rootNode = BX(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("Account: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.nodeList = [];
	    this.reload();
	  }
	  babelHelpers.createClass(Account, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      Requests.getInformation().then(function (data) {
	        _this.nodeList = data;
	        _this.render();
	      });
	    }
	  }, {
	    key: "setEvents",
	    value: function setEvents() {
	      var btnOpenMenu = BX('open-menu-icon');
	      BX.bind(btnOpenMenu, 'click', function () {
	        Requests.getAvatars().then(function (list) {
	          Window.render(list);
	        });
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	      Requests.getUserFileName().then(function (file) {
	        _this2.rootNode.innerHTML = '';
	        var data = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"profile-container\">\n\t\t\t\t<div class=\"image\">\n\t\t\t\t\t<img data-id-file=\"", "\" id=\"user-icon\" src=\"", "\" alt=\"\u0424\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044F\">\n\t\t\t\t\t<div class=\"caption\">\n\t\t\t\t\t\t<button id=\"open-menu-icon\" class=\"lupa\">\n\t\t\t\t\t\t\t<svg height=\"50px\" width=\"50px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\t\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t\t\t\t</style>\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<path class=\"st0\" d=\"M84.523,84.523V512H512V84.523H84.523z M220.739,184.766c24.028,0,43.5,19.48,43.5,43.507\n\t\t\t\t\t\t\t\t\t\tc0,24.027-19.473,43.507-43.5,43.507c-24.027,0-43.507-19.48-43.507-43.507C177.232,204.246,196.712,184.766,220.739,184.766z\n\t\t\t\t\t\t\t\t\t\tM463.923,407.239c-1.494,2.776-4.398,4.517-7.556,4.517H140.156c-3.151,0-6.048-1.726-7.548-4.502\n\t\t\t\t\t\t\t\t\t\tc-1.501-2.777-1.359-6.153,0.375-8.787l55.311-84.276c3.669-5.59,9.732-9.154,16.403-9.627c6.679-0.472,13.185,2.192,17.612,7.212\n\t\t\t\t\t\t\t\t\t\tl38.15,43.236l69.125-105.196c3.962-6.026,10.693-9.665,17.904-9.672c7.211-0.008,13.95,3.617,17.92,9.635l98.127,148.666\n\t\t\t\t\t\t\t\t\t\tC465.273,401.086,465.424,404.463,463.923,407.239z\"/>\n\t\t\t\t\t\t\t\t\t<polygon class=\"st0\" points=\"450.529,0 0,0 0,450.529 46.104,450.529 46.104,46.104 450.529,46.104 \t\"/>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<h2 class=\"profile-heading font-account\">", "</h2>\n\t\t\t\t<div class=\"font-account\">", " ", "</div>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div class=\"profile-container\">\n\t\t\t\t<div class=\"image\">\n\t\t\t\t\t<img data-id-file=\"", "\" id=\"user-icon\" src=\"", "\" alt=\"\u0424\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044F\">\n\t\t\t\t\t<div class=\"caption\">\n\t\t\t\t\t\t<button id=\"open-menu-icon\" class=\"lupa\">\n\t\t\t\t\t\t\t<svg height=\"50px\" width=\"50px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t\t\t\t\t\t\t\tviewBox=\"0 0 512 512\"  xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<style type=\"text/css\">\n\t\t\t\t\t\t\t\t\t.st0{fill:#fff;}\n\t\t\t\t\t\t\t\t</style>\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<path class=\"st0\" d=\"M84.523,84.523V512H512V84.523H84.523z M220.739,184.766c24.028,0,43.5,19.48,43.5,43.507\n\t\t\t\t\t\t\t\t\t\tc0,24.027-19.473,43.507-43.5,43.507c-24.027,0-43.507-19.48-43.507-43.507C177.232,204.246,196.712,184.766,220.739,184.766z\n\t\t\t\t\t\t\t\t\t\tM463.923,407.239c-1.494,2.776-4.398,4.517-7.556,4.517H140.156c-3.151,0-6.048-1.726-7.548-4.502\n\t\t\t\t\t\t\t\t\t\tc-1.501-2.777-1.359-6.153,0.375-8.787l55.311-84.276c3.669-5.59,9.732-9.154,16.403-9.627c6.679-0.472,13.185,2.192,17.612,7.212\n\t\t\t\t\t\t\t\t\t\tl38.15,43.236l69.125-105.196c3.962-6.026,10.693-9.665,17.904-9.672c7.211-0.008,13.95,3.617,17.92,9.635l98.127,148.666\n\t\t\t\t\t\t\t\t\t\tC465.273,401.086,465.424,404.463,463.923,407.239z\"/>\n\t\t\t\t\t\t\t\t\t<polygon class=\"st0\" points=\"450.529,0 0,0 0,450.529 46.104,450.529 46.104,46.104 450.529,46.104 \\t\"/>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<h2 class=\"profile-heading font-account\">", "</h2>\n\t\t\t\t<div class=\"font-account\">", " ", "</div>\n\t\t\t</div>\n\t\t"])), file.ID, file.FILE_NAME, BX.util.htmlspecialchars(_this2.nodeList[1].name) + ' ' + BX.util.htmlspecialchars(_this2.nodeList[1].surname), BX.message('UP_ACCOUNT_LEVEL_SUBSCRIPTION'), BX.util.htmlspecialchars(_this2.nodeList[0]));
	        _this2.rootNode.append(data);
	        _this2.setEvents();
	      });
	    }
	  }]);
	  return Account;
	}();

	exports.Account = Account;

}((this.BX.Up.Tree = this.BX.Up.Tree || {}),BX));
