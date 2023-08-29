//=============================================================================
// Icon captions
// by Astfgl
// Date: 09/06/2017
// revision 09/04/2019 for public use
// revision 10/04/2019: sometimes x coord of caption window would go below 0
// 13/04/2019 : caught all the missing base windows
// 16/04/2019 : fixed window battle status from showing icons below other windows
// 17/04/2019 : added support for multiple line captions, and fixed caption window width
// 22/04/2019 : Yanfly visual state and MOGBH compatibility patch
// 24/04/2019  : Added individual conditions for captions, added set caption and set cond functions
// Thanks to HeroicJay on the rpgmakerweb forums for pointing me to the
// textWidthEx function in the base code, which I copied here.
//=============================================================================

/*:
 * @plugindesc Create icon captions
 * @author Astfgl
 *
 * @param ShowCaptions
 * @type Switch
 * @desc This switch will be used in game to turn the captions on or off.
 *
 * @param DefaultText
 * @default
 * @desc The default text displayed when nothing is specified.
 *
 * @help You must setup a caption's text from within the plugin.
 * Open the text file with notepad and follow the template provided.
 * Icons without captions set will display what is inside the DefaultText parameter.
 * If a caption is set to "" the window will not display.
 *
 * You can add or modifiy a caption in game with:
 * IconCaptions.setCaption(iconNumber,text)
 *
 * You can modifiy a caption condition in game with:
 * IconCaptions.setCond(iconNumber,text)
 * The text must be a valid javascript statement, which will be evaled when hovering
 * the caption. If it evals to true, the caption will show.
 */

var Imported = Imported || {};
(function () {
  var parameters = PluginManager.parameters("IconCaptions");
  var showCaptions = parameters.ShowCaptions;
  var defText = parameters.DefaultText;

  //Set the icon captions in here.
  IconCaptions = {
    313: "Gold \nMultiple lines",
    cond313: "$gameParty.gold() > 0",
    //template: iconId: "Text",
    //you can use all text codes, but have to make them with two \ instead of one. \\c[1] for example
    //cond[iconId] : "Text",
    //The text must be a valid javascript statement. If it evals to true the caption will show.
    //In the given example, the gold caption will only show if party gold is > 0.
  };

  IconCaptions.setCaption = function (num, value) {
    this[num] = value;
  };
  IconCaptions.setCond = function (num, value) {
    this["cond" + num] = value;
  };

  var _Astfgl_newWBDI = Window_Base.prototype.drawIcon;
  Window_Base.prototype.drawIcon = function (index, x, y) {
    _Astfgl_newWBDI.call(this, index, x, y);
    this.addIconCaption(index, x, y);
  };

  Window_Base.prototype.addIconCaption = function (index, x, y) {
    if (!this._iconCaptions) {
      this._iconCaptions = [];
    }
    if (
      this._iconCaptions.some(function (caption) {
        return (
          caption[0][0] === x && caption[0][1] === y && caption[2] === index
        );
      })
    ) {
      return;
    }
    this._iconCaptions.push([
      [x, y],
      [x + Window_Base._iconWidth, y + Window_Base._iconHeight],
      index,
    ]);
  };

  Window_Base.prototype.updateCaptions = function () {
    if (!$gameSwitches.value(Number(showCaptions))) {
      return;
    }
    if (!this.visible) {
      return;
    }
    if (this._iconCaptions) {
      var x = this.x + this._padding;
      var y = this.y + this._padding;
      var win = this;
      this._iconCaptions.forEach(function (caption) {
        if (
          IconCaptions[caption[2]] &&
          IconCaptions["cond" + caption[2]] !== undefined &&
          !eval(IconCaptions["cond" + caption[2]])
        ) {
          return;
        }
        if (
          TouchInput._mouseX >= caption[0][0] + x &&
          TouchInput._mouseX <= caption[1][0] + x &&
          TouchInput._mouseY >= caption[0][1] + y &&
          TouchInput._mouseY <= caption[1][1] + y
        ) {
          if (!SceneManager._scene._captionWindow) {
            var captionWindow = new Window_IconCaption(
              caption[0][0] + x,
              caption[1][0] + y + win.lineHeight(),
              800,
              600
            );
            captionWindow.height = win.lineHeight() + win._padding * 2;
            captionWindow.width = 100;
            captionWindow.hide();
            SceneManager._scene._captionWindow = captionWindow;
            SceneManager._scene.addChild(SceneManager._scene._captionWindow);
          } else {
            if (win instanceof Window_Gold && $gameParty.inBattle()) {
              return;
            }
            if (
              win instanceof Window_Gold &&
              SceneManager._scene instanceof Scene_Map
            ) {
              return;
            }
            if (!win.visible) {
              return;
            }
            var captionWindow = SceneManager._scene._captionWindow;
            captionWindow._index = caption[2];
            captionWindow.isHovered = true;
            captionWindow.x = caption[0][0] + x;
            captionWindow.y = caption[0][1] + y + win.lineHeight();
            var lineNum = 1;
            if (IconCaptions[caption[2]]) {
              lineNum = IconCaptions[caption[2]].split(/\r\n|\r|\n/).length;
            }
            if (captionWindow.y + captionWindow.height > Graphics.boxHeight) {
              captionWindow.y =
                caption[0][1] + y - win.lineHeight() * (1 + lineNum);
            }
            if (captionWindow.x + captionWindow.width > Graphics.boxWidth) {
              captionWindow.x -= captionWindow.width;
            }
            if (captionWindow.x < 0) {
              captionWindow.x = 0;
            }
            captionWindow.height =
              win.lineHeight() * lineNum + win._padding * 2;
          }
        }
      });
    }
  };

  Window_BattleStatus.prototype.updateCaptions = function () {
    if (
      SceneManager._scene._skillWindow.visible ||
      SceneManager._scene._itemWindow.visible
    ) {
      return;
    }
    Window_Base.prototype.updateCaptions.call(this);
  };

  var _Astfgl_newSBUC = Scene_Base.prototype.updateChildren;
  Scene_Base.prototype.updateChildren = function () {
    _Astfgl_newSBUC.call(this);
    if (this._captionWindow) {
      this._captionWindow.isHovered = false;
    }
    if (this._windowLayer) {
      this._windowLayer.children.forEach(function (child) {
        if (child._iconCaptions) {
          child.updateCaptions();
        }
      });
    }
  };

  function Window_IconCaption() {
    this.initialize.apply(this, arguments);
  }

  Window_IconCaption.prototype = Object.create(Window_Base.prototype);
  Window_IconCaption.prototype.constructor = Window_IconCaption;

  Window_IconCaption.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._index = 0;
    this.isHovered = false;
  };

  Window_IconCaption.prototype.update = function () {
    this.contents.clear();
    var txt = "";
    if (IconCaptions[this._index]) {
      txt = IconCaptions[this._index];
    } else {
      if (IconCaptions[this._index] === "") {
        this.hide();
        return;
      }
      if (defText === "") {
        this.hide();
        return;
      }
      txt = defText;
    }
    var lines = txt.split("\n");
    var maxWidth = 0;
    for (let i = 0; i < lines.length; i++) {
      if (maxWidth < this.textWidthEx(lines[i])) {
        maxWidth = this.textWidthEx(lines[i]);
      }
    }
    this.width = maxWidth + this._padding * 2;
    //this.width = this.textWidth(txt) + this._padding * 3;
    this.drawTextEx(txt, 1, 0);
    if (this.isHovered) {
      this.show();
    } else {
      this.hide();
    }
  };

  Window_IconCaption.prototype.textWidthEx = function (text) {
    return this.drawTextEx(text, 0, this.contents.height);
  };

  var _Astfgl_newWSR = Window_Selectable.prototype.refresh;
  Window_Selectable.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWSR.call(this);
  };

  var _Astfgl_newWHR = Window_Help.prototype.refresh;
  Window_Help.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWHR.call(this);
  };

  var _Astfgl_newWGR = Window_Gold.prototype.refresh;
  Window_Gold.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWGR.call(this);
  };

  var _Astfgl_newWMNR = Window_MapName.prototype.refresh;
  Window_MapName.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWMNR.call(this);
  };

  var _Astfgl_newWSTR = Window_ScrollText.prototype.refresh;
  Window_ScrollText.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWSTR.call(this);
  };

  var _Astfgl_newWMNP = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function (textState) {
    this._iconCaptions = [];
    _Astfgl_newWMNP.call(this, textState);
  };

  var _Astfgl_newWSLR = Window_SkillList.prototype.refresh;
  Window_SkillList.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWSLR.call(this);
  };

  var _Astfgl_newWBSR = Window_BattleStatus.prototype.refresh;
  Window_BattleStatus.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWBSR.call(this);
  };

  var _Astfgl_newWSSR = Window_SkillStatus.prototype.refresh;
  Window_SkillStatus.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWSSR.call(this);
  };

  var _Astfgl_newWShopSR = Window_ShopStatus.prototype.refresh;
  Window_ShopStatus.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWShopSR.call(this);
  };

  var _Astfgl_newWShopNR = Window_ShopNumber.prototype.refresh;
  Window_ShopNumber.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWShopNR.call(this);
  };

  var _Astfgl_newWShopBR = Window_ShopBuy.prototype.refresh;
  Window_ShopBuy.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWShopBR.call(this);
  };

  var _Astfgl_newWILR = Window_ItemList.prototype.refresh;
  Window_ItemList.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWILR.call(this);
  };

  var _Astfgl_newWESR = Window_EquipStatus.prototype.refresh;
  Window_EquipStatus.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWESR.call(this);
  };

  var _Astfgl_newWBLR = Window_BattleLog.prototype.refresh;
  Window_BattleLog.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWBLR.call(this);
  };

  var _Astfgl_newWinStatusR = Window_Status.prototype.refresh;
  Window_Status.prototype.refresh = function () {
    this._iconCaptions = [];
    _Astfgl_newWinStatusR.call(this);
  };

  //Sprite_StateIcon
  var _Astfgl_newSSIU = Sprite_StateIcon.prototype.update;
  Sprite_StateIcon.prototype.update = function () {
    _Astfgl_newSSIU.call(this);
    if (!$gameSwitches.value(Number(showCaptions)) || this._iconIndex === 0) {
      return;
    }
    if (
      IconCaptions[this._iconIndex] &&
      IconCaptions["cond" + this._iconIndex] !== undefined &&
      !eval(IconCaptions["cond" + this._iconIndex])
    ) {
      return;
    }
    if (!this.visible) {
      return;
    }
    var win = new Window_Base(800, 600);
    var x = this.parent.x - Window_Base._iconWidth / 2;
    var y = this.parent.y - Window_Base._iconHeight / 2;
    if (
      TouchInput._mouseX >= this.x + x &&
      TouchInput._mouseX <= this.x + 48 + x &&
      TouchInput._mouseY >= this.y + y &&
      TouchInput._mouseY <= this.y + 48 + y
    ) {
      if (!SceneManager._scene._captionWindow) {
        var captionWindow = new Window_IconCaption(
          this.x + x,
          this.y + y + win.lineHeight(),
          800,
          600
        );
        captionWindow.height = win.lineHeight() + win._padding * 2;
        captionWindow.width = 100;
        captionWindow.hide();
        SceneManager._scene._captionWindow = captionWindow;
        SceneManager._scene.addChild(SceneManager._scene._captionWindow);
      } else {
        var captionWindow = SceneManager._scene._captionWindow;
        captionWindow._index = this._iconIndex;
        captionWindow.isHovered = true;
        captionWindow.x = this.x + x;
        captionWindow.y = this.y + y + win.lineHeight();
        var lineNum = 1;
        if (IconCaptions[this._iconIndex]) {
          lineNum = IconCaptions[this._iconIndex].split(/\r\n|\r|\n/).length;
        }
        if (captionWindow.y + captionWindow.height > Graphics.boxHeight) {
          captionWindow.y = this.y + y - win.lineHeight() * (1 + lineNum);
        }
        if (captionWindow.x + captionWindow.width > Graphics.boxWidth) {
          captionWindow.x -= captionWindow.width;
        }
        if (captionWindow.x < 0) {
          captionWindow.x = 0;
        }
        captionWindow.height = win.lineHeight() * lineNum + win._padding * 2;
      }
    }
  };

  if (Imported) {
    if (Imported.MOG_BattleHud) {
      var _Astfgl_MGBHRST2 = Battle_Hud.prototype.refresh_states2;
      Battle_Hud.prototype.refresh_states2 = function () {
        _Astfgl_MGBHRST2.call(this);
        var w = Window_Base._iconWidth;
        var icons = this._battler.allIcons().slice(0, w);
        var m = Math.min(
          Math.max(this._battler.allIcons().length, 0),
          Moghunter.bhud_statesMax
        );
        var align = Moghunter.bhud_statesAlign;
        for (i = 0; i < m; i++) {
          this._stateIcons[i]._iconIndex = icons[i];
        }
      };

      var _Astfgl_newBHUS2 = Battle_Hud.prototype.update_states2;
      Battle_Hud.prototype.update_states2 = function () {
        _Astfgl_newBHUS2.call(this);
        if (
          SceneManager._scene._skillWindow.visible ||
          SceneManager._scene._itemWindow.visible
        ) {
          return;
        }
        if (this._battler.allIcons().length == 0) {
          return;
        }
        this._stateIcons.forEach(function (icon) {
          if (
            !$gameSwitches.value(Number(showCaptions)) ||
            icon._iconIndex === 0
          ) {
            return;
          }
          if (
            IconCaptions[icon._iconIndex] &&
            IconCaptions["cond" + icon._iconIndex] !== undefined &&
            !eval(IconCaptions["cond" + icon._iconIndex])
          ) {
            return;
          }
          if (!icon.visible) {
            return;
          }
          var win = new Window_Base(800, 600);
          var x = icon.parent.x;
          var y = icon.parent.y;
          if (
            TouchInput._mouseX >= icon.x + x &&
            TouchInput._mouseX <= icon.x + 48 + x &&
            TouchInput._mouseY >= icon.y + y &&
            TouchInput._mouseY <= icon.y + 48 + y
          ) {
            if (!SceneManager._scene._captionWindow) {
              var captionWindow = new Window_IconCaption(
                icon.x + x,
                icon.y + y + win.lineHeight(),
                800,
                600
              );
              captionWindow.height = win.lineHeight() + win._padding * 2;
              captionWindow.width = 100;
              captionWindow.hide();
              SceneManager._scene._captionWindow = captionWindow;
              SceneManager._scene.addChild(SceneManager._scene._captionWindow);
            } else {
              var captionWindow = SceneManager._scene._captionWindow;
              captionWindow._index = icon._iconIndex;
              captionWindow.isHovered = true;
              captionWindow.x = icon.x + x;
              captionWindow.y = icon.y + y + win.lineHeight();
              var lineNum = 1;
              if (IconCaptions[icon._iconIndex]) {
                lineNum =
                  IconCaptions[icon._iconIndex].split(/\r\n|\r|\n/).length;
              }
              if (captionWindow.y + captionWindow.height > Graphics.boxHeight) {
                captionWindow.y = icon.y + y - win.lineHeight() * (1 + lineNum);
              }
              if (captionWindow.x + captionWindow.width > Graphics.boxWidth) {
                captionWindow.x -= captionWindow.width;
              }
              if (captionWindow.x < 0) {
                captionWindow.x = 0;
              }
              captionWindow.height =
                win.lineHeight() * lineNum + win._padding * 2;
            }
          }
        });
      };
    }
  }
  /*
	//custom battle UI windows, remove before release to the public
	if (Window_ActorActions) {
		Window_ActorActions.prototype.drawIcon = function(index,x,y) {
		  _Astfgl_newWBDI.call(this,index,x,y);
		}
		Window_ActorActions.prototype.updateCaptions = function() {}
	}
	
	if (Window_ActorMiniStatus) {
		Window_ActorMiniStatus.prototype.drawIcon = function(index,x,y) {
		  _Astfgl_newWBDI.call(this,index,x,y);
		}
		Window_ActorMiniStatus.prototype.updateCaptions = function() {}
	}
	if (Window_optIcon) {
		Window_optIcon.prototype.drawIcon = function(index,x,y) {
		  _Astfgl_newWBDI.call(this,index,x,y);
		}
		Window_optIcon.prototype.updateCaptions = function() {}
	}
	*/

  //TI alias to get coordinate to use for captions
  var TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function (event) {
    TIOMM.call(this, event);
    this._mouseX = Graphics.pageToCanvasX(event.pageX);
    this._mouseY = Graphics.pageToCanvasY(event.pageY);
  };
})();
