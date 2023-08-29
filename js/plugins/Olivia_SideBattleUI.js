//=============================================================================
// Olivia Engine - Side Battle Status UI - for RPG Maker MV version 1.6.1
// Olivia_SideBattleUI.js
//=============================================================================
/*:
 * @plugindesc <SideBattleUI> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that changes the UI of the battle system to
 * something more minimalistic. The menus are placed towards the player's party
 * to let the player focus their attention to the center of the screen instead
 * of to the lower ledges of the screen.
 *
 * The status menu is also reworked to reduce the amount of lag produced by the
 * game system. Without this plugin, RPG Maker MV's battle system produces a
 * lot of lag and uses too many resources by constantly redrawing the status
 * window every turn. This causes the game's FPS to drop a lot. This plugin
 * changes the times needed to update the status window and only when it needs
 * to do so.
 *
 * This plugin requires YEP Battle Engine Core because it uses a lot of
 * functions from the Battle Engine Core to optimize and reduce the amount of
 * lag produced by the battle system and to calculate the window positions. If
 * you do not have this plugin, go here to download it from Yanfly's website:
 * http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/
 *
 * This plugin best works in a game with a higher resolution. I recommend a
 * 16:9 screen ratio of roughly 1280x720 size. If you want to change your game
 * screen's resolution, please use Yanfly's Core Engine plugin:
 * http://yanfly.moe/2015/10/09/yep-1-core-engine/
 *
 *
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Plugin parameters can be changed to customize your battle's appearance.
 * Please go over each one carefully.
 *
 * Position Actors: Position actor sprites on the screen using the formula
 * below? This overrides the formula used in Yanfly's Battle Engine Core and
 * Row Formation so turn this off if you want to use those settings instead.
 *
 * Formula for X: Formula used for X screen position
 *
 * Formula for Y: Formula used for Y screen position
 *
 * Position Enemies: Position enemy sprites on the screen using the formula
 * below? This overrides the formula used in Yanfly's Core Engien and Row
 * Formation so turn this off if you want to use those settings instead.
 *
 * Formula for X: Formula used for X screen position
 *
 * Formula for Y: Formula used for Y screen position
 *
 * Status Window:
 *
 * Ceiling Distance: How many pixels from the top of the screen to leave as
 * room for the status windows?
 *
 * Gauge Height: How high should the gauges of the windows be pixels
 *
 * Gauge Width: How wide should the gauges of the windows be in pixels
 *
 * Move Distance: Active: Move the status window this many pixels when the
 * battler is the active battler
 *
 * Move Distance: Selected: Move the status window this many pixels when the
 * battler is selected for a skill or item target
 *
 * Move Distance: Speed: The move speed for the window when animating
 *
 * States Max: Maximum number of states to draw on the status windows
 *
 * Window Scale: Scale the size of the contents of the status windows down by
 * this much
 *
 * Window Width: How wide should the status windows be on the screen
 *
 * Window Settings:
 *
 * Dim Help Window: Dim the help window background
 *
 * Command Window Width: Width in pixels for battle command windows
 *
 * List Window Rows: Maximum number of rows to use for each of the list windows
 *
 * List Window Width: Width in pixels for battle list windows
 *
 * Window Scale: Scale the size of the contents of the command and list windows
 * down by this much
 *
 * Window Masking Effect: Enable or disable the window masking effect. By
 * turning off masking, you also get weird of the strange clipping effects when
 * windows are on top of each other.
 *
 *
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 * -------------
 * Compatibility
 * -------------
 *
 * This plugin is compatible with the following plugins:
 *
 * - YEP Core Engine
 * - YEP Battle Engine Core
 * - YEP Action Sequence Packs 1, 2, 3
 * - YEP Animated Sideview Enemies
 * - YEP Buffs & States Core
 * - YEP Damage Core
 * - YEP Element Core
 * - YEP Item Core
 * - YEP Equip Core
 *
 * Place this plugin under those in the Plugin Manager list.
 *
 * This plugin is NOT compatible with other plugins that change the battle
 * status window because they are likely to overwrite each other.
 *
 * ------------
 * Terms of Use
 * ------------
 *
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins without credit.
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 *
 * - Fallen Angel Olivia
 * - Yanfly
 *
 * @param
 * @param
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param
 * @param
 *
 * @param Warning Side Battle UI
 * @text !!!!! WARNING !!!!!
 * @parent Side Battle UI
 * @default Requires YEP_BattleEngineCore
 *
 * @param
 * @param
 *
 * @param Side Battle Position Actors
 * @text Position Actors
 * @parent Side UI Position Sprites
 * @type boolean
 * @on On
 * @off Off
 * @desc Position actor sprites on the screen using the formula below?
 * @default true
 *
 * @param Side Battle Actor X
 * @text Formula for X
 * @parent Side Battle Position Actors
 * @desc Formula used for X screen position
 * @default Graphics.boxWidth * 0.5 + 128 + index * 64
 *
 * @param Side Battle Actor Y
 * @text Formula for Y
 * @parent Side Battle Position Actors
 * @desc Formula used for Y screen position
 * @default Graphics.boxHeight - 128 - ($gameParty.maxBattleMembers() - index - 1) * 48
 *
 * @param Side Battle Position Enemies
 * @text Position Enemies
 * @parent Side UI Position Sprites
 * @type boolean
 * @on On
 * @off Off
 * @desc Position enemy sprites on the screen using the formula below?
 * @default true
 *
 * @param Side Battle Enemy X
 * @text Formula for X
 * @parent Side Battle Position Enemies
 * @desc Formula used for X screen position
 * @default x
 *
 * @param Side Battle Enemy Y
 * @text Formula for Y
 * @parent Side Battle Position Enemies
 * @desc Formula used for Y screen position
 * @default Graphics.boxHeight - 444 - 128 + y
 *
 * @param Side UI Status Window
 * @text Status Window
 * @parent Side Battle UI
 *
 * @param Side Battle Ceiling Distance
 * @text Ceiling Distance
 * @parent Side UI Status Window
 * @type number
 * @desc How many pixels from the top of the screen to leave as room for the status windows?
 * @default 0
 *
 * @param Side Battle Gauge Height
 * @text Gauge Height
 * @parent Side UI Status Window
 * @type number
 * @desc How high should the gauges of the windows be pixels
 * @default 6
 *
 * @param Side Battle Gauge Width
 * @text Gauge Width
 * @parent Side UI Status Window
 * @type number
 * @desc How wide should the gauges of the windows be in pixels
 * @default 160
 *
 * @param Side Battle Status Move Active
 * @text Move Distance: Active
 * @parent Side UI Status Window
 * @type number
 * @desc Move the status window this many pixels when the battler is the active battler
 * @default 48
 *
 * @param Side Battle Status Move Selected
 * @text Move Distance: Selected
 * @parent Side UI Status Window
 * @type number
 * @desc Move the status window this many pixels when the battler is selected for a skill or item target
 * @default 24
 *
 * @param Side Battle Status Move Speed
 * @text Move Distance: Speed
 * @parent Side UI Status Window
 * @type number
 * @desc The move speed for the window when animating
 * @default 4
 *
 * @param Side Battle Status States Max
 * @text States Max
 * @parent Side UI Status Window
 * @type number
 * @desc Maximum number of states to draw on the status windows
 * @default 4
 *
 * @param Side Battle Status Scale
 * @text Window Scale
 * @parent Side UI Status Window
 * @desc Scale the size of the contents of the status windows down by this much
 * @default 0.6
 *
 * @param Side Battle Status Width
 * @text Window Width
 * @parent Side UI Status Window
 * @type number
 * @desc How wide should the status windows be on the screen
 * @default 200
 *
 * @param Side UI Window Settings
 * @text Window Settings
 * @parent Side Battle UI
 *
 * @param Side Battle Dim Help Window
 * @text Dim Help Window
 * @parent Side UI Window Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Dim the help window background
 * @default true
 *
 * @param Side Battle Command Window Width
 * @text Command Window Width
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Width in pixels for battle command windows
 * @default 160
 *
 * @param Side Battle List Window Max
 * @text List Window Rows
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Maximum number of rows to use for each of the list windows
 * @default 8
 *
 * @param Side Battle List Window Width
 * @text List Window Width
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Width in pixels for battle list windows
 * @default 320
 *
 * @param Side Battle Command Window Scale
 * @text Window Scale
 * @parent Side UI Window Settings
 * @desc Scale the size of the contents of the command and list windows down by this much
 * @default 0.8
 *
 * @param Side Battle Window Masking
 * @text Window Masking Effect
 * @parent Side Battle UI
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the window masking effect
 * @default false
 *
 * @param
 * @param
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_SideBattleUI = true;

var Olivia = Olivia || {};
Olivia.OctoBattle = Olivia.OctoBattle || {};

var parameters = $plugins.filter(function (p) {
  return p.description.contains("<SideBattleUI>");
})[0].parameters;

Olivia.OctoBattle.SideBattleUI = {
  Enabled: true,
  // Windows
  DimHelpWindow: eval(parameters["Side Battle Dim Help Window"]),
  WindowMasking: eval(parameters["Side Battle Window Masking"]),
  WindowScale: Number(parameters["Side Battle Command Window Scale"] || 0.8),
  WindowCmdWidth: Number(parameters["Side Battle Command Window Width"] || 160),
  WindowMaxList: Number(parameters["Side Battle List Window Max"] || 8),
  WindowListWidth: Number(parameters["Side Battle List Window Width"] || 320),
  // Status Window
  CeilingBuffer: Number(parameters["Side Battle Ceiling Distance"] || 0),
  StatusScale: Number(parameters["Side Battle Status Scale"] || 0.6),
  StatusWidth: Number(parameters["Side Battle Status Width"] || 200),
  GaugeWidth: Number(parameters["Side Battle Gauge Width"] || 160),
  GaugeHeight: Number(parameters["Side Battle Gauge Height"] || 6),
  StatesMax: Number(parameters["Side Battle Status States Max"] || 4),
  ActiveBattlerMove: Number(parameters["Side Battle Status Move Active"] || 48),
  SelectBattlerMove: Number(
    parameters["Side Battle Status Move Selected"] || 24
  ),
  WindowMoveSpeed: Number(parameters["Side Battle Status Move Speed"] || 4),
  // Reposition
  PositionActors: eval(parameters["Side Battle Position Actors"]),
  ActorPositionFormulaX: String(parameters["Side Battle Actor X"]),
  ActorPositionFormulaY: String(parameters["Side Battle Actor Y"]),
  PositionEnemies: eval(parameters["Side Battle Position Enemies"]),
  EnemyPositionFormulaX: String(parameters["Side Battle Enemy X"]),
  EnemyPositionFormulaY: String(parameters["Side Battle Enemy Y"]),
};

Olivia.OctoBattle.BattleUI = Olivia.OctoBattle.BattleUI || {};

//=============================================================================
// Window Layer
//
// Masks windows

if (!Olivia.OctoBattle.SideBattleUI.WindowMasking) {
  Olivia.OctoBattle.BattleUI.___WindowLayer_maskWindow___ =
    WindowLayer.prototype._maskWindow;
  WindowLayer.prototype._maskWindow = function (window, shift) {
    if (!!$gameParty && $gameParty.inBattle()) {
      return;
    }
    Olivia.OctoBattle.BattleUI.___WindowLayer_maskWindow___.call(
      this,
      window,
      shift
    );
  };
}

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

Game_System.prototype.isSideView = function () {
  return true;
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Olivia.OctoBattle.BattleUI.___Game_Actor_refresh___ =
  Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function () {
  Olivia.OctoBattle.BattleUI.___Game_Actor_refresh___.call(this);
  if ($gameParty.inBattle()) {
    this._needsStatusStateRefresh = true;
  }
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Scene_Battle.prototype.updateWindowPositions = function () {
  if (BattleManager.isInputting()) {
    if (this._partyCommandWindow.active) {
      this._partyCommandWindow.updatePosition();
    }
    if (this._actorCommandWindow.active) {
      this._actorCommandWindow.updatePosition();
    }
    if (this._skillWindow.active) {
      this._actorCommandWindow.updatePosition();
      this._skillWindow.updatePosition();
    }
    if (this._itemWindow.active) {
      this._actorCommandWindow.updatePosition();
      this._itemWindow.updatePosition();
    }
    if (this._actorWindow.active) {
      this._actorCommandWindow.updateFadeOut();
      this._skillWindow.updateFadeOut();
      this._itemWindow.updateFadeOut();
    }
    if (this._enemyWindow.active) {
      this._actorCommandWindow.updateFadeOut();
      this._skillWindow.updateFadeOut();
      this._itemWindow.updateFadeOut();
    }
  }
};

Olivia.OctoBattle.BattleUI.___Scene_Battle_createStatusWindow___ =
  Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function () {
  Olivia.OctoBattle.BattleUI.___Scene_Battle_createStatusWindow___.call(this);
  this.createSideStatusWindows();
};

Scene_Battle.prototype.createSideStatusWindows = function () {
  this._sideStatusWindows = [];
  for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
    var newStatusWindow = new Window_BattleSideStatus(i);
    this._sideStatusWindows.push(newStatusWindow);
    this.addWindow(newStatusWindow);
  }
};

//-----------------------------------------------------------------------------
// Sprite_Actor
//
// The sprite for displaying an actor.

if (Olivia.OctoBattle.SideBattleUI.PositionActors) {
  Sprite_Actor.prototype.setActorHome = function (index) {
    var x = Math.round(
      eval(Olivia.OctoBattle.SideBattleUI.ActorPositionFormulaX)
    );
    var y = Math.round(
      eval(Olivia.OctoBattle.SideBattleUI.ActorPositionFormulaY)
    );
    this.setHome(x, y);
  };
}

//-----------------------------------------------------------------------------
// Sprite_Enemy
//
// The sprite for displaying an enemy.

if (Olivia.OctoBattle.SideBattleUI.PositionEnemies) {
  Sprite_Enemy.prototype.setHome = function (x, y) {
    x = Math.round(eval(Olivia.OctoBattle.SideBattleUI.EnemyPositionFormulaX));
    y = Math.round(eval(Olivia.OctoBattle.SideBattleUI.EnemyPositionFormulaY));
    Sprite_Battler.prototype.setHome.call(this, x, y);
  };
}

//-----------------------------------------------------------------------------
// Window_Help
//
// The window for displaying the description of the selected item.

if (Olivia.OctoBattle.SideBattleUI.DimHelpWindow) {
  Olivia.OctoBattle.BattleUI.___Window_Help_initialize___ =
    Window_Help.prototype.initialize;
  Window_Help.prototype.initialize = function (numLines) {
    Olivia.OctoBattle.BattleUI.___Window_Help_initialize___.call(
      this,
      numLines
    );
    if (SceneManager._scene instanceof Scene_Battle) {
      this.opacity = 0;
      this.showBackgroundDimmer();
    }
  };

  Window_Help.prototype.refreshDimmerBitmap = function () {
    if (this._dimmerSprite) {
      var bitmap = this._dimmerSprite.bitmap;
      var w = this.width;
      var h = this.height;
      var m = this.standardPadding();
      var w1 = Math.ceil(w / 2);
      var w2 = w1 - Olivia.OctoBattle.SideBattleUI.StatusWidth;
      var h1 = h - m * 2;
      var c1 = this.dimColor1();
      var c2 = this.dimColor2();
      bitmap.resize(w, h);
      bitmap.fillRect(0, m, w1, h1, c1);
      bitmap.gradientFillRect(w1, m, w2, h1, c1, c2);
      this._dimmerSprite.setFrame(0, 0, w, h);
    }
  };
}

//-----------------------------------------------------------------------------
// Window_PartyCommand
//
// The window for selecting whether to fight or escape on the battle screen.

Window_PartyCommand.prototype.numVisibleRows = function () {
  if (!this._list) {
    return 4;
  }
  return Math.min(
    Math.ceil(this.maxItems() / this.maxCols()),
    Olivia.OctoBattle.SideBattleUI.WindowMaxList
  );
};

Window_PartyCommand.prototype.scaleRate = function () {
  return Olivia.OctoBattle.SideBattleUI.WindowScale;
};

Window_PartyCommand.prototype.lineHeight = function () {
  return Math.round(
    Window_Command.prototype.lineHeight.call(this) * this.scaleRate()
  );
};

Window_PartyCommand.prototype.standardFontSize = function () {
  return Math.round(
    Window_Command.prototype.standardFontSize.call(this) * this.scaleRate()
  );
};

Window_PartyCommand.prototype.standardPadding = function () {
  return Math.round(
    Window_Command.prototype.standardPadding.call(this) * this.scaleRate()
  );
};

Window_PartyCommand.prototype.textPadding = function () {
  return Math.round(
    Window_Command.prototype.textPadding.call(this) * this.scaleRate()
  );
};

Window_PartyCommand.prototype.windowWidth = function () {
  return Olivia.OctoBattle.SideBattleUI.WindowCmdWidth;
};

Window_PartyCommand.prototype.drawIcon = function (iconIndex, x, y) {
  var bitmap = ImageManager.loadSystem("IconSet");
  var pw = Window_Base._iconWidth;
  var ph = Window_Base._iconHeight;
  var sx = (iconIndex % 16) * pw;
  var sy = Math.floor(iconIndex / 16) * ph;
  var rate = this.scaleRate();
  this.contents.blt(
    bitmap,
    sx,
    sy,
    pw,
    ph,
    x,
    y,
    Math.round(pw * rate),
    Math.round(ph * rate)
  );
};

Window_PartyCommand.prototype.createContents = function () {
  this.height = this.windowHeight();
  Window_Command.prototype.createContents.call(this);
};

Window_PartyCommand.prototype.updatePosition = function () {
  if (!!$gameParty.aliveMembers()[0]) {
    var actor = $gameParty.aliveMembers()[0];
    var x =
      actor.spritePosX() - Math.round(actor.spriteWidth() / 2) - this.width;
    var y = actor.spritePosY() - actor.spriteHeight();
    this.x = x + (this._positionXCorrection || 0);
    this.y = y + (this._positionYCorrection || 0);
    Window_PartyCommand.prototype.updateFadeIn.call(this);
    Window_PartyCommand.prototype.correctScreenPosition.call(this);
  }
};

Window_PartyCommand.prototype.correctScreenPosition = function () {
  this.x = Math.min(Graphics.boxWidth - this.width, this.x);
  this.y = Math.min(Graphics.boxHeight - this.height, this.y);
};

Window_PartyCommand.prototype.updateFadeIn = function () {
  this.opacity = 255;
  this.contentsOpacity = 255;
};

Window_PartyCommand.prototype.updateFadeOut = function () {
  this.opacity -= 16;
  this.contentsOpacity -= 16;
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Window_ActorCommand.prototype.numVisibleRows = function () {
  return Window_PartyCommand.prototype.numVisibleRows.call(this);
};

Window_ActorCommand.prototype.scaleRate = function () {
  return Window_PartyCommand.prototype.scaleRate.call(this);
};

Window_ActorCommand.prototype.lineHeight = function () {
  return Window_PartyCommand.prototype.lineHeight.call(this);
};

Window_ActorCommand.prototype.standardFontSize = function () {
  return Window_PartyCommand.prototype.standardFontSize.call(this);
};

Window_ActorCommand.prototype.standardPadding = function () {
  return Window_PartyCommand.prototype.standardPadding.call(this);
};

Window_ActorCommand.prototype.textPadding = function () {
  return Window_PartyCommand.prototype.textPadding.call(this);
};

Window_ActorCommand.prototype.windowWidth = function () {
  return Window_PartyCommand.prototype.windowWidth.call(this);
};

Window_ActorCommand.prototype.drawIcon = function (iconIndex, x, y) {
  Window_PartyCommand.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_ActorCommand.prototype.createContents = function () {
  this.height = this.windowHeight();
  Window_Command.prototype.createContents.call(this);
};

Window_ActorCommand.prototype.updatePosition = function () {
  if (this._actor) {
    Window_PartyCommand.prototype.updateFadeIn.call(this);
    var x =
      this._actor.spritePosX() + Math.round(this._actor.spriteWidth() / 2);
    x = Math.min(Graphics.boxWidth - this.width, x);
    var y = this._actor.spritePosY() - this._actor.spriteHeight();
    y = Math.min(Graphics.boxHeight - this.height, y);
    this.x = x + (this._positionXCorrection || 0);
    this.y = y + (this._positionYCorrection || 0);
    Window_PartyCommand.prototype.updateFadeIn.call(this);
    Window_PartyCommand.prototype.correctScreenPosition.call(this);
  }
};

Window_ActorCommand.prototype.updateFadeOut = function () {
  Window_PartyCommand.prototype.updateFadeOut.call(this);
};

Olivia.OctoBattle.BattleUI.___Window_ActorCommand_setup___ =
  Window_ActorCommand.prototype.setup;
Window_ActorCommand.prototype.setup = function (actor) {
  Olivia.OctoBattle.BattleUI.___Window_ActorCommand_setup___.call(this, actor);
  this.updatePosition();
};

//-----------------------------------------------------------------------------
// Window_BattleActor
//
// The window for selecting a target actor on the battle screen.

Window_BattleActor.prototype.processCursorMove = function () {
  if (this.isCursorMovable() && Input.isRepeated("right")) {
    var lastIndex = this.index();
    this.cursorDown(Input.isTriggered("right"));
    if (this.index() !== lastIndex) {
      SoundManager.playCursor();
    }
  } else if (this.isCursorMovable() && Input.isRepeated("left")) {
    var lastIndex = this.index();
    this.cursorUp(Input.isTriggered("left"));
    if (this.index() !== lastIndex) {
      SoundManager.playCursor();
    }
  } else {
    Window_BattleStatus.prototype.processCursorMove.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target actor on the battle screen.

Window_BattleEnemy.prototype.processCursorMove = function () {
  if (this.isCursorMovable() && Input.isRepeated("down")) {
    var lastIndex = this.index();
    this.cursorRight(Input.isTriggered("down"));
    if (this.index() !== lastIndex) {
      SoundManager.playCursor();
    }
  } else if (this.isCursorMovable() && Input.isRepeated("up")) {
    var lastIndex = this.index();
    this.cursorLeft(Input.isTriggered("up"));
    if (this.index() !== lastIndex) {
      SoundManager.playCursor();
    }
  } else {
    Window_Selectable.prototype.processCursorMove.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

Olivia.OctoBattle.BattleUI.___Window_BattleStatus_initialize___ =
  Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function () {
  Olivia.OctoBattle.BattleUI.___Window_BattleStatus_initialize___.call(this);
  if (SceneManager._scene instanceof Scene_Battle) {
    this.y = Graphics.boxHeight * 3;
  }
};

Olivia.OctoBattle.BattleUI.___Window_BattleStatus_drawItem___ =
  Window_BattleStatus.prototype.drawItem;
Window_BattleStatus.prototype.drawItem = function (index) {
  if (!SceneManager._scene instanceof Scene_Battle) {
    Olivia.OctoBattle.BattleUI.___Window_BattleStatus_drawItem___.call(
      this,
      index
    );
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.

Olivia.OctoBattle.BattleUI.___Window_BattleSkill_initialize___ =
  Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function (x, y, width, height) {
  y = Graphics.boxHeight * 3;
  width = Olivia.OctoBattle.SideBattleUI.WindowListWidth;
  height = 100;
  Olivia.OctoBattle.BattleUI.___Window_BattleSkill_initialize___.call(
    this,
    x,
    y,
    width,
    height
  );
};

Window_BattleSkill.prototype.scaleRate = function () {
  return Window_PartyCommand.prototype.scaleRate.call(this);
};

Window_BattleSkill.prototype.lineHeight = function () {
  return Window_PartyCommand.prototype.lineHeight.call(this);
};

Window_BattleSkill.prototype.standardFontSize = function () {
  return Window_PartyCommand.prototype.standardFontSize.call(this);
};

Window_BattleSkill.prototype.standardPadding = function () {
  return Window_PartyCommand.prototype.standardPadding.call(this);
};

Window_BattleSkill.prototype.textPadding = function () {
  return Window_PartyCommand.prototype.textPadding.call(this);
};

Window_BattleSkill.prototype.drawIcon = function (iconIndex, x, y) {
  Window_PartyCommand.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSkill.prototype.maxCols = function () {
  return 1;
};

Window_BattleSkill.prototype.maxListHeight = function () {
  return Math.min(
    this.maxItems(),
    Olivia.OctoBattle.SideBattleUI.WindowMaxList
  );
};

Window_BattleSkill.prototype.createContents = function () {
  this.height = this.fittingHeight(this.maxListHeight());
  Window_SkillList.prototype.createContents.call(this);
};

Window_BattleSkill.prototype.setActor = function (actor) {
  Window_SkillList.prototype.setActor.call(this, actor);
  this.updatePosition();
};

Window_BattleSkill.prototype.updatePosition = function () {
  this._positionXCorrection = 16;
  this._positionYCorrection = 16;
  Window_ActorCommand.prototype.updatePosition.call(this);
};

Window_BattleSkill.prototype.updateFadeOut = function () {
  Window_PartyCommand.prototype.updateFadeOut.call(this);
};

Window_BattleSkill.prototype.drawItemName = function (item, x, y, width) {
  width = width || 312;
  if (item) {
    var iconBoxWidth =
      Math.round(Window_Base._iconWidth * this.scaleRate()) + 4;
    this.resetTextColor();
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    if (Imported.YEP_InstantCast) {
      this.drawInstantIcon(item, x, y, width);
    }
  }
};

//-----------------------------------------------------------------------------
// Window_BattleItem
//
// The window for selecting an item to use on the battle screen.

Olivia.OctoBattle.BattleUI.___Window_BattleItem_initialize___ =
  Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function (x, y, width, height) {
  y = Graphics.boxHeight * 3;
  width = Olivia.OctoBattle.SideBattleUI.WindowListWidth;
  height = 100;
  this._positionXCorrection = 16;
  this._positionYCorrection = 16;
  Olivia.OctoBattle.BattleUI.___Window_BattleItem_initialize___.call(
    this,
    x,
    y,
    width,
    height
  );
};

Window_BattleItem.prototype.scaleRate = function () {
  return Window_PartyCommand.prototype.scaleRate.call(this);
};

Window_BattleItem.prototype.lineHeight = function () {
  return Window_PartyCommand.prototype.lineHeight.call(this);
};

Window_BattleItem.prototype.standardFontSize = function () {
  return Window_PartyCommand.prototype.standardFontSize.call(this);
};

Window_BattleItem.prototype.standardPadding = function () {
  return Window_PartyCommand.prototype.standardPadding.call(this);
};

Window_BattleItem.prototype.textPadding = function () {
  return Window_PartyCommand.prototype.textPadding.call(this);
};

Window_BattleItem.prototype.drawIcon = function (iconIndex, x, y) {
  Window_PartyCommand.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleItem.prototype.maxCols = function () {
  return 1;
};

Window_BattleItem.prototype.maxListHeight = function () {
  return Math.min(
    this.maxItems(),
    Olivia.OctoBattle.SideBattleUI.WindowMaxList
  );
};

Window_BattleItem.prototype.createContents = function () {
  this.height = this.fittingHeight(this.maxListHeight());
  Window_ItemList.prototype.createContents.call(this);
};

Olivia.OctoBattle.BattleUI.___Window_BattleItem_show___ =
  Window_BattleItem.prototype.show;
Window_BattleItem.prototype.show = function () {
  Olivia.OctoBattle.BattleUI.___Window_BattleItem_show___.call(this);
  this.updatePosition();
};

Window_BattleItem.prototype.updatePosition = function () {
  if (!!BattleManager.actor()) {
    var actor = BattleManager.actor();
    var x = actor.spritePosX() + Math.round(actor.spriteWidth() / 2);
    var y = actor.spritePosY() - actor.spriteHeight();
    this.x = x + (this._positionXCorrection || 0);
    this.y = y + (this._positionYCorrection || 0);
    Window_PartyCommand.prototype.updateFadeIn.call(this);
    Window_PartyCommand.prototype.correctScreenPosition.call(this);
  }
};

Window_BattleItem.prototype.updateFadeOut = function () {
  Window_PartyCommand.prototype.updateFadeOut.call(this);
};

Window_BattleItem.prototype.drawItemName = function (item, x, y, width) {
  Window_BattleSkill.prototype.drawItemName.call(this, item, x, y, width);
};

//-----------------------------------------------------------------------------
// Window_BattleSideBase
//
// Used as a base for all of the miniature windows.

function Window_BattleSideBase() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideBase.prototype = Object.create(Window_Base.prototype);
Window_BattleSideBase.prototype.constructor = Window_BattleSideBase;

Window_BattleSideBase.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  this._index = index;
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.opacity = 0;
};

Window_BattleSideBase.prototype.setNewActor = function () {
  this._actor = $gameParty.members()[this._index];
  this.refresh();
};

Window_BattleSideBase.prototype.scaleRate = function () {
  return Olivia.OctoBattle.SideBattleUI.StatusScale;
};

Window_BattleSideBase.prototype.lineHeight = function () {
  return Math.round(
    Window_Base.prototype.lineHeight.call(this) * this.scaleRate()
  );
};

Window_BattleSideBase.prototype.standardFontSize = function () {
  return Math.round(
    Window_Base.prototype.standardFontSize.call(this) * this.scaleRate()
  );
};

Window_BattleSideBase.prototype.standardPadding = function () {
  return 0;
};

Window_BattleSideBase.prototype.textPadding = function () {
  return Math.round(
    Window_Base.prototype.textPadding.call(this) * this.scaleRate()
  );
};

Window_BattleSideBase.prototype.drawIcon = function (iconIndex, x, y) {
  var bitmap = ImageManager.loadSystem("IconSet");
  var pw = Window_Base._iconWidth;
  var ph = Window_Base._iconHeight;
  var sx = (iconIndex % 16) * pw;
  var sy = Math.floor(iconIndex / 16) * ph;
  var rate = this.scaleRate();
  this.contents.blt(
    bitmap,
    sx,
    sy,
    pw,
    ph,
    x,
    y,
    Math.round(pw * rate),
    Math.round(ph * rate)
  );
};

Window_BattleSideBase.prototype.refresh = function () {
  this._actor = $gameParty.members()[this._index];
  this.contents.clear();
};

Window_BattleSideBase.prototype.update = function () {
  Window_Base.prototype.update.call(this);
  if (this._actor !== $gameParty.members()[this._index]) {
    this.setNewActor();
  }
  if (
    BattleManager._phase !== "battleEnd" &&
    this.checkRefreshConditions() &&
    !BattleManager._victoryPhase &&
    !BattleManager._hideOTBTurnDisplay
  ) {
    this.refresh();
  }
};

Window_BattleSideBase.prototype.checkRefreshConditions = function () {
  return false;
};

//-----------------------------------------------------------------------------
// Window_BattleSideName
//
// Draws the actor's name.

function Window_BattleSideName() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideName.prototype = Object.create(
  Window_BattleSideBase.prototype
);
Window_BattleSideName.prototype.constructor = Window_BattleSideName;

Window_BattleSideName.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.refresh();
};

Window_BattleSideName.prototype.refresh = function () {
  Window_BattleSideBase.prototype.refresh.call(this);
  if (!!this._actor) {
    this.drawActorName(this._actor, this.textPadding(), 0, this.width);
    this._actorName = this._actor.name();
  }
};

Window_BattleSideName.prototype.checkRefreshConditions = function () {
  if (!!this._actor) {
    return this._actorName !== this._actor.name();
  } else {
    return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSideShield
//
// Draws the actor's Break Shield count

function Window_BattleSideShield() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideShield.prototype = Object.create(
  Window_BattleSideBase.prototype
);
Window_BattleSideShield.prototype.constructor = Window_BattleSideShield;

Window_BattleSideShield.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.refresh();
};

Window_BattleSideShield.prototype.lineHeight = function () {
  return Window_Base.prototype.lineHeight.call(this);
};

Window_BattleSideShield.prototype.drawIcon = function (iconIndex, x, y) {
  Window_Base.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSideShield.prototype.refresh = function () {
  Window_BattleSideBase.prototype.refresh.call(this);
  if (!!this._actor) {
    this.drawBreakShieldIcon(this._actor, 0, 0);
    this._breakShield = this._actor.currentBreakShield();
  }
};

Window_BattleSideShield.prototype.checkRefreshConditions = function () {
  if (!!this._actor) {
    return this._breakShield !== this._actor.currentBreakShield();
  } else {
    return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSideHP
//
// Draws the actor's HP.

function Window_BattleSideHP() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideHP.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideHP.prototype.constructor = Window_BattleSideHP;

Window_BattleSideHP.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.refresh();
};

Window_BattleSideHP.prototype.gaugeHeight = function () {
  return Olivia.OctoBattle.SideBattleUI.GaugeHeight;
};

Window_BattleSideHP.prototype.refresh = function () {
  Window_BattleSideBase.prototype.refresh.call(this);
  if (!!this._actor) {
    this.drawActorHp(
      this._actor,
      this.textPadding(),
      0,
      Olivia.OctoBattle.SideBattleUI.GaugeWidth
    );
    this._hp = this._actor.hp;
    this._mhp = this._actor.mhp;
  }
};

Window_BattleSideHP.prototype.checkRefreshConditions = function () {
  if (!!this._actor) {
    return this._hp !== this._actor.hp || this._mhp !== this._actor.mhp;
  } else {
    return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSideMP
//
// Draws the actor's MP.

function Window_BattleSideMP() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideMP.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideMP.prototype.constructor = Window_BattleSideMP;

Window_BattleSideMP.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.refresh();
};

Window_BattleSideMP.prototype.gaugeHeight = function () {
  return Olivia.OctoBattle.SideBattleUI.GaugeHeight;
};

Window_BattleSideMP.prototype.refresh = function () {
  Window_BattleSideBase.prototype.refresh.call(this);
  if (!!this._actor) {
    this.drawActorMp(
      this._actor,
      this.textPadding(),
      0,
      Olivia.OctoBattle.SideBattleUI.GaugeWidth
    );
    this._mp = this._actor.mp;
    this._mmp = this._actor.mmp;
  }
};

Window_BattleSideMP.prototype.checkRefreshConditions = function () {
  if (!!this._actor) {
    return this._mp !== this._actor.mp || this._mmp !== this._actor.mmp;
  } else {
    return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSideTP
//
// Draws the actor's TP.

function Window_BattleSideTP() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideTP.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideTP.prototype.constructor = Window_BattleSideMP;

Window_BattleSideTP.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.refresh();
};

Window_BattleSideTP.prototype.gaugeHeight = function () {
  return Olivia.OctoBattle.SideBattleUI.GaugeHeight;
};

Window_BattleSideTP.prototype.refresh = function () {
  Window_BattleSideBase.prototype.refresh.call(this);
  if (!!this._actor) {
    this.drawActorTp(
      this._actor,
      this.textPadding(),
      0,
      Olivia.OctoBattle.SideBattleUI.GaugeWidth
    );
    this._mt = this._actor.tp;
  }
};

Window_BattleSideTP.prototype.checkRefreshConditions = function () {
  if (!!this._actor) {
    return this._tp !== this._actor.tp;
  } else {
    return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSideBoost
//
// Draws the actor's boost status

function Window_BattleSideBoost() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideBoost.prototype = Object.create(
  Window_BattleSideBase.prototype
);
Window_BattleSideBoost.prototype.constructor = Window_BattleSideBoost;

Window_BattleSideBoost.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.refresh();
};

Window_BattleSideBoost.prototype.lineHeight = function () {
  return Window_Base.prototype.lineHeight.call(this);
};

Window_BattleSideBoost.prototype.drawIcon = function (iconIndex, x, y) {
  Window_Base.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSideBoost.prototype.refresh = function () {
  Window_BattleSideBase.prototype.refresh.call(this);
  if (!!this._actor) {
    this.drawBoostIcons(this._actor, 0, 0);
    this._boostCount = this._actor.storedBP();
  }
};

Window_BattleSideBoost.prototype.checkRefreshConditions = function () {
  if (!!this._actor) {
    return this._boostCount !== this._actor.storedBP();
  } else {
    return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSideStates
//
// Draws the actor's states

function Window_BattleSideStates() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideStates.prototype = Object.create(
  Window_BattleSideBase.prototype
);
Window_BattleSideStates.prototype.constructor = Window_BattleSideStates;

Window_BattleSideStates.prototype.initialize = function (
  x,
  y,
  width,
  height,
  index
) {
  width = Olivia.OctoBattle.SideBattleUI.StatesMax * Window_Base._iconWidth + 4;
  x -= width;
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.refresh();
};

Window_BattleSideStates.prototype.lineHeight = function () {
  return Window_Base.prototype.lineHeight.call(this);
};

Window_BattleSideStates.prototype.drawIcon = function (iconIndex, x, y) {
  Window_Base.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSideStates.prototype.refresh = function () {
  Window_BattleSideBase.prototype.refresh.call(this);
  if (!!this._actor) {
    var x = this.contents.width - 2;
    x -=
      Math.min(
        Olivia.OctoBattle.SideBattleUI.StatesMax,
        this._actor.allIcons().length
      ) * Window_Base._iconWidth;
    this.drawActorIcons(this._actor, x, 0, this.contents.width - 2 - x);
    this._actor._needsStatusStateRefresh = undefined;
  }
};

Window_BattleSideStates.prototype.checkRefreshConditions = function () {
  if (!!this._actor) {
    return !!this._actor._needsStatusStateRefresh;
  } else {
    return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
  }
};

//-----------------------------------------------------------------------------
// Window_BattleSideStatus
//
// The window for displaying the status of the party members

function Window_BattleSideStatus() {
  this.initialize.apply(this, arguments);
}

Window_BattleSideStatus.prototype = Object.create(
  Window_BattleSideBase.prototype
);
Window_BattleSideStatus.prototype.constructor = Window_BattleSideStatus;

Window_BattleSideStatus.prototype.initialize = function (index) {
  var width = Olivia.OctoBattle.SideBattleUI.StatusWidth;
  var height = this.fittingHeight(4); //Default: 4.5
  if ($dataSystem.optDisplayTp) {
    height += this.lineHeight();
  }
  var x = Graphics.boxWidth - width;
  var y = height * index + Olivia.OctoBattle.SideBattleUI.CeilingBuffer;
  this._targetX = this._homeX = x;
  this._targetY = this._homeY = y;
  width += Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove * 2;
  Window_BattleSideBase.prototype.initialize.call(
    this,
    x,
    y,
    width,
    height,
    index
  );
  this.createSubWindows();
};

Window_BattleSideStatus.prototype.createSubWindows = function () {
  var width = this.width - Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove * 2;
  var height = Window_Base.prototype.lineHeight.call(this);
  var index = this._index;
  var x = 0;
  var y = Math.ceil(this.lineHeight() / 4);
  var x1 = -1 * Window_Base._iconWidth - 2;
  var y1 = this.lineHeight() - 2;
  // Draw Actor Name
  this.addChild(new Window_BattleSideName(x, y, width, height, index));
  // Draw Boost Points
  if (Olivia.OctoBattle.BoostPoint && Olivia.OctoBattle.BoostPoint.Enabled) {
    x += 8;
    y += this.lineHeight();
    this.addChild(new Window_BattleSideBoost(x, y, width - x, height, index));
  }
  // Draw HP
  x += 8;
  y += this.lineHeight();
  this.addChild(new Window_BattleSideHP(x, y, width - x, height, index));
  // Draw MP
  x += 8;
  y += this.lineHeight();
  this.addChild(new Window_BattleSideMP(x, y, width - x, height, index));
  // Draw TP
  if ($dataSystem.optDisplayTp) {
    x += 8;
    y += this.lineHeight();
    this.addChild(new Window_BattleSideTP(x, y, width - x, height, index));
  }
  // Draw Break Shield Icon
  if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled) {
    if (
      Olivia.OctoBattle.BreakShield.Actors &&
      Olivia.OctoBattle.BreakShield.ShowActorShield
    ) {
      this.addChild(new Window_BattleSideShield(x1, y1, width, height, index));
      y1 += Window_Base._iconHeight + 2;
    }
  }
  // Draw State Icons
  //this.addChild(new Window_BattleSideStates(0, y1, width, height, index));
};

Window_BattleSideStatus.prototype.refresh = function () {
  this.contents.clear();
  if (!!this._actor) {
    var c1 = this.dimColor1();
    var c2 = this.dimColor2();
    var w1 = Math.ceil(this.width / 4);
    var w2 = this.width - w1;
    var h = this.height;
    this.contents.gradientFillRect(0, 0, w1, h, c2, c1);
    this.contents.fillRect(w1, 0, w2, h, c1);
  }
};

Window_BattleSideStatus.prototype.update = function () {
  Window_BattleSideBase.prototype.update.call(this);
  if (!!this._actor) {
    this.updatePosition();
  }
};

Window_BattleSideStatus.prototype.updatePosition = function () {
  this._cursorAll = false;
  if (this._actor === BattleManager.actor()) {
    this._targetX =
      this._homeX - Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove;
    this._cursorAll = true;
  } else if (this._actor === BattleManager._subject) {
    this._targetX =
      this._homeX - Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove;
  } else if (this._actor.isSelected()) {
    this._targetX =
      this._homeX - Olivia.OctoBattle.SideBattleUI.SelectBattlerMove;
  } else {
    this._targetX = this._homeX;
  }
  var moveSpeed = Olivia.OctoBattle.SideBattleUI.WindowMoveSpeed;
  if (this._targetX > this.x) {
    this.x = Math.min(this.x + moveSpeed, this._targetX);
  } else if (this._targetX < this.x) {
    this.x = Math.max(this.x - moveSpeed, this._targetX);
  }
};
