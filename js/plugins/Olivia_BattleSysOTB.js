//=============================================================================
// Olivia Engine - Battle Sys Order Turn Battle - for RPG Maker MV version 1.6.1
// Olivia_BattleSysOTB.js
//=============================================================================
 /*:
 * @plugindesc <BattleSysOTB> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that changes the battle system to have a turn
 * order system where battlers act immediately after inputting actions. These
 * actions can influence the order position of battlers in the current turn or
 * the next turn. The turn order is displayed to the top of the screen and gives
 * the player a clear understanding on whose turn it will be making it easier
 * for the player to formulate strategies and adapt to the situation in battle.
 *
 * This plugin requires YEP Battle Engine Core because it uses a lot of of the
 * code used to make the battle system feel natural. This is also to utilize
 * the key functions that come with the Battle Engine Core to make the more
 * interesting effects of the Order Turn Battle work smoother.
 *
 *
 *
 * ------------
 * Instructions
 * ------------
 *
 * If you are using other plugins, place this plugin as close to the BOTTOM of
 * the plugin list as you can or else some features of the other plugins may
 * override the battle system and it will not work properly.
 *
 *
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Mechanics: This section in the plugin parameters lets you change how the
 * battle system operates like automatically converting Item and Skill speed
 * into a notetag effect for OTB. This also lets you decide if some mechanics
 * will work in OTB or not like Action Times and how to position the extra
 * actions added to the turn order. Also determine if the AGI calculated for
 * the position in the turn order to be static or random.
 *
 * Visuals: This section lets you decide how the visuals added to the battle
 * system will look. This will mostly affect the turn order display. There is
 * not too much to customize except for some text, colors, and font sizes,
 * because everything is made to look compact in order to maintain efficiency
 * and not consume too many of the game's resources when it is in operation.
 *
 *
 *
 * --------
 * Notetags
 * --------
 *
 * Skill and Item Notetags:
 *
 * <OTB User Next Turn: +x>
 * <OTB User Next Turn: -x>
 * Change the user's turn order position for the next turn upon using this
 * skill or item. This will only occur once upon usage, no matter how many times
 * the battler hits the target.
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: +x>
 * <OTB Target Follow Turn: -x>
 * Change the target's turn order position for the current turn, the next turn,
 * or the following turn. If you are using the 'Follow' version of the notetag,
 * the turn it will modify will depend on if the target has acted during the
 * current turn. If it has acted, then it will affect the next turn, otherwise,
 * the current turn. Successfully attacking the target multiple times will also
 * affect the target multiple times.
 *
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * Add x actions to the current turn or the next turn for the user. This will
 * only be added once no matter how many times the battler hits the target.
 *
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * Add x actions to the current turn or the next turn for the target. If the
 * target is targeted multiple times, the target will gain actions multiple
 * times so please be cautious when using this.
 *
 *
 *
 * ---------------
 * Plugin Commands
 * ---------------
 * 
 * Because this is made with Battle Engine Core, you can change your game away
 * from OTB if you want to. However, if you do, make sure you have the plugin
 * parameter: "Force Battle System?" set to false.
 *
 * setBattleSys OTB
 * This sets the battle system to Order Turn Battle
 *
 * setBattleSys DTB
 * This sets the battle system to Default Turn Battle
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
 * - YEP Counter Control
 * - YEP Battle AI Core
 * - YEP Battle Select Cursor
 * - YEP Buffs & States Core
 * - YEP Damage Core
 * - YEP Element Core
 * - YEP Target Core
 * - YEP Skill Core
 * - YEP Instant Cast
 * - YEP Item Core
 * - YEP Equip Core
 * - YEP Party System
 * - YEP Actor Party Switch
 * - YEP Job Points
 * - YEP Base Troop Events
 * - YEP Swap Enemies
 *
 * Place this plugin under those in the Plugin Manager list. Otherwise, the
 * effects of the plugins under this plugin may not work properly. I am NOT
 * responsible for the compatibility of plugins not shown in the above list.
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' and 'Yanfly' must be given credit in your games.
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
 * @param Warning OTB 
 * @text !!!!! WARNING !!!!!
 * @parent Order Turn Battle
 * @default Requires YEP_BattleEngineCore
 *
 * @param 
 * @param 
 *
 * @param OTB Force Battle System
 * @text Force Battle System?
 * @parent Order Turn Battle
 * @type boolean
 * @on On
 * @off Off
 * @desc Forces the OTB battle system no matter what your Battle Engine Core setting is.
 * @default true
 *
 * @param OTB Mechancs
 * @text Mechanics
 * @parent Order Turn Battle
 *
 * @param OTB Mechanics Action Speed Convert
 * @text Action Speed Convert
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Converts action speed into a <OTB User Next Turn: +x> notetag for items and skills
 * @default true
 *
 * @param OTB Mechanics Buff Debuff AGI Convert
 * @text Buff/Debuff AGI Convert
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Convert AGI buffs/debuffs into <OTB Target Next Turn: +x> notetag for items and skills
 * @default true
 *
 * @param OTB Mechanics Added Action Times
 * @text Added Action Times
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Allow Added Action Times in this battle system?
 * @default true
 *
 * @param OTB Mechanics Action Time Order Randomize
 * @text Randomize Position
 * @parent OTB Mechanics Added Action Times
 * @type boolean
 * @on On
 * @off Off
 * @desc Randomize the positions of newly added actions in the turn order after the first initial position?
 * @default true
 *
 * @param OTB Mechanics Enable Party Window
 * @text Enable Party Window?
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Gives access to the Party Command Window (Fight/Escape window)
 * @default false
 *
 * @param OTB Mechanics Escape Actor Window
 * @text Escape in Actor Window
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add the Escape command in the actor window?
 * @default true
 *
 * @param OTB Mechanics Remove Restrict Current
 * @text Current Turn Wakeup
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add battlers back to the current turn's order when they wake up from a restriction state?
 * @default true
 *
 * @param OTB Mechanics Remove Restrict Next
 * @text Next Turn Wakeup
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add battlers back to the next turn's order when they wake up from a restriction state?
 * @default true
 *
 * @param OTB Mechanics Static AGI Calculation
 * @text Static AGI Calculation
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc If on, calculate speed on static AGI. If off, calculate speed on random AGI.
 * @default true
 *
 * @param OTB Mechanics Stun Wakeup First
 * @text Stun Wakeup First
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc If on, when waking up from a stun, be first in position on the next turn
 * @default true
 *
 * @param OTB Mechanics Stun Wakeup Clamp
 * @text Clamp Turn Effects
 * @parent OTB Mechanics Stun Wakeup First
 * @type boolean
 * @on On
 * @off Off
 * @desc Prevent others from going past waking battlers for turn manipulation effects
 * @default true
 *
 * @param OTB Visuals
 * @text Visuals
 * @parent Order Turn Battle
 *
 * @param OTB Sprite Background Colors
 * @text Sprite Background Colors
 * @parent OTB Visuals
 *
 * @param OTB Background Actor Color
 * @text Actors
 * @parent OTB Sprite Background Colors
 * @desc Background color used for actors in the turn order
 * @default rgba(128, 160, 255, 0.6)
 *
 * @param OTB Background Enemy Color
 * @text Enemies
 * @parent OTB Sprite Background Colors
 * @desc Background color used for enemies in the turn order
 * @default rgba(255, 100, 80, 0.6)
 *
 * @param OTB Turn Order Display
 * @text Turn Order Display
 * @parent OTB Visuals
 *
 * @param OTB Display X
 * @text Display X
 * @parent OTB Turn Order Display
 * @type number
 * @desc The x position of the Turn Order Display
 * @default 48
 *
 * @param OTB Display Y
 * @text Display Y
 * @parent OTB Turn Order Display
 * @type number
 * @desc The y position of the Turn Order Display
 * @default 18
 *
 * @param OTB Display Help Window Move Y
 * @text Move to Y (During)
 * @parent OTB Turn Order Display
 * @type number
 * @desc Move to this Y position when Help Window is open
 * @default 18
 *
 * @param OTB Display Help Window Move Speed
 * @text Move Speed (During)
 * @parent OTB Turn Order Display
 * @type number
 * @desc Move speed when Help Window is open
 * @default 16
 *
 * @param OTB Display Current Text
 * @text Current Turn Text
 * @parent OTB Turn Order Display
 * @desc Text to display for current turn
 * @default CURRENT
 *
 * @param OTB Display Current Size
 * @text Font Size
 * @parent OTB Display Current Text
 * @type number
 * @desc Font size for current turn text
 * @default 20
 *
 * @param OTB Display Next Text
 * @text Next Turn Text
 * @parent OTB Turn Order Display
 * @desc Text to display for next turn
 * @default NEXT
 *
 * @param OTB Display Next Size
 * @text Font Size
 * @parent OTB Display Next Text
 * @type number
 * @desc Font size for next turn text
 * @default 20
 *
 * @param OTB Sprite Properties
 * @text Sprite Properties
 * @parent OTB Visuals
 *
 * @param OTB Sprite Move Duration
 * @text Move Duration
 * @parent OTB Sprite Properties
 * @type number
 * @min 1
 * @desc Number of frames to move the sprite
 * @default 20
 *
 * @param OTB Sprite Opacity Speed
 * @text Opacity Speed
 * @parent OTB Sprite Properties
 * @type number
 * @min 1
 * @desc How fast the sprite changes its opacity
 * @default 16
 *
 * @param OTB Battle Scene Properties
 * @text Battle Scene
 * @parent OTB Visuals
 *
 * @param OTB Help Window Y
 * @text Help Window Y
 * @parent OTB Battle Scene Properties
 * @type number
 * @desc Y coordinate of the help window
 * @default 92
 *
 * @param OTB Log Window Y
 * @text Log Window Y
 * @parent OTB Battle Scene Properties
 * @type number
 * @desc Y coordinate of the log window
 * @default 92
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_OctoBattle = true;

var Olivia = Olivia || {};
Olivia.OctoBattle = Olivia.OctoBattle || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<BattleSysOTB>') })[0].parameters;

Olivia.OctoBattle.OTB = {
    Enabled: true,
    // Settings
    ForceBattleSystem: eval(parameters['OTB Force Battle System']),
    // Mechanics
    ActionSpeedConvert:       eval(parameters['OTB Mechanics Action Speed Convert']),
    BuffDebuffAgiConvert:     eval(parameters['OTB Mechanics Buff Debuff AGI Convert']),
    AddedActionTimes:         eval(parameters['OTB Mechanics Added Action Times']),
    ActionTimeOrderRandomize: eval(parameters['OTB Mechanics Action Time Order Randomize']),
    EnablePartyWindow:        eval(parameters['OTB Mechanics Enable Party Window']),
    EscapeActorWindow:        eval(parameters['OTB Mechanics Escape Actor Window']),
    RemoveRestrictCurrent:    eval(parameters['OTB Mechanics Remove Restrict Current']),
    RemoveRestrictNext:       eval(parameters['OTB Mechanics Remove Restrict Next']),
    StaticAgiCalculation:     eval(parameters['OTB Mechanics Static AGI Calculation']),
    StunWakeUpFirst:          eval(parameters['OTB Mechanics Stun Wakeup First']),
    StunWakeUpClamp:          eval(parameters['OTB Mechanics Stun Wakeup Clamp']),
    // Visuals
    BackgroundActorColor: String(parameters['OTB Background Actor Color']),
    BackgroundEnemyColor: String(parameters['OTB Background Enemy Color']),
    DisplayX:             Number(parameters['OTB Display X']),
    DisplayY:             Number(parameters['OTB Display Y']),
    HelpWindowMoveY:      Number(parameters['OTB Display Help Window Move Y']),
    HelpWindowMoveSpeed:  Number(parameters['OTB Display Help Window Move Speed']),
    CurrentTurnText:      String(parameters['OTB Display Current Text']),
    CurrentTurnFontSize:  Number(parameters['OTB Display Current Size']),
    NextTurnText:         String(parameters['OTB Display Next Text']),
    NextTurnFontSize:     Number(parameters['OTB Display Next Size']),
    MoveDuration:         Number(parameters['OTB Sprite Move Duration']),
    OpacitySpeed:         Number(parameters['OTB Sprite Opacity Speed']),
    HelpWindowNewY:       Number(parameters['OTB Help Window Y']),
    LogWindowNewY:        Number(parameters['OTB Log Window Y'])
};

//=============================================================================
// Order Turn Battle
//
// 1. Immediate action after selecting a command

if (Imported.YEP_BattleEngineCore && Olivia.OctoBattle.OTB.Enabled) {

Olivia.OctoBattle.Battle = Olivia.OctoBattle.Battle || {};

//-----------------------------------------------------------------------------
// Array
//
// Array functions

Object.defineProperties(Array.prototype, {
    getAllIndices: {
        enumerable: false,
        value: function(value) {
            var array = [];
            for (var i = 0; i < this.length; i++) {
                if (this[i] === value) {
                    array.push(i);
                }
            }
            return array;
        }
    }
});

//-----------------------------------------------------------------------------
// Bitmap
//
// Draw Functions

Bitmap.prototype.drawOutlinePolygon = function(points, color1, color2, weight, opacity, stroke) {
    var context = this._context;
    context.save();
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (var i = 2; i < points.length; i += 2) {
        context.lineTo(points[i], points[i + 1]);
    }
    context.lineTo(points[0], points[1]);
    context.strokeStyle = color1;
    context.lineWidth = weight;
    if (stroke) {
        context.stroke();
    }
    context.globalAlpha = opacity;
    context.fillStyle = color2;
    context.fill();
    context.globalAlpha = 1;
    context.restore();
    this._setDirty();
};

//-----------------------------------------------------------------------------
// Plugin Parameters
//
// Change some plugin parameters to fit the game better

Yanfly.Param.BECStartActCmd = true;

if (Olivia.OctoBattle.OTB.ForceBattleSystem) {
    Yanfly.Param.BECSystem = 'otb';
}

Yanfly.Param.PartyShowBattle = false;
Yanfly.Param.PartyEnBattle = false;

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.

DataManager.otbBuffDebuffAgiConvert = function(item) {
    if (BattleManager.isOTB() && Olivia.OctoBattle.OTB.BuffDebuffAgiConvert && !!item && !item._otbBuffDebuffAgiConvert) {
        item._otbBuffDebuffAgiConvert = true;
        for (var i = 0; i < item.effects.length; i++) {
            var effect = item.effects[i];
            if (effect.code === Game_Action.EFFECT_ADD_BUFF && effect.dataId === 6) {
                item.note += '<OTB Target Next Turn: +1>';
            }
            if (effect.code === Game_Action.EFFECT_ADD_BUFF && effect.dataId === 6) {
                item.note += '<OTB Target Next Turn: -1>';
            }
        }
    }
};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

Olivia.OctoBattle.Battle.___BattleManager_initMembers___ = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Olivia.OctoBattle.Battle.___BattleManager_initMembers___.call(this);
    if (this.isOTB()) {
        this._nextTurnActionBattlers = []
        this._createdFirstTurnActionOrders = false;
        this._requestCurrentTurnUpdate = false;
        this._requestCurrentTurnUpdateInstantly = false;
        this._requestNextTurnUpdate = false;
        this._requestNextTurnUpdateInstantly = false;
        this._requestShiftTurnOrder = false
        this._requestClearUnableBattlers = false;
        this._requestNextTurnPreview = null;
        this._requestNextTurnPreviewClear = false;
        this._requestCurrentTurnSpriteReorder = false;
        this._requestNextTurnSpriteReorder = false;
        this._hideOTBTurnDisplay = false;
    }
};

Olivia.OctoBattle.Battle.___BattleManager_isDTB___ = BattleManager.isDTB;
BattleManager.isDTB = function() {
    if (this.isOTB()) {
        return false;
    } else {
        return Olivia.OctoBattle.Battle.___BattleManager_isDTB___.call(this);
    }
};

BattleManager.isOTB = function() {
    if (Olivia.OctoBattle.OTB.ForceBattleSystem) {
        return true;
    } else {
        return this.isBattleSystem('otb');
    }
};

Olivia.OctoBattle.Battle.___BattleManager_isTurnBased___ = BattleManager.isTurnBased;
BattleManager.isTurnBased = function() {
    if (this.isOTB()) {
        return true;
    } else {
        return Olivia.OctoBattle.Battle.___BattleManager_isTurnBased___.call(this);
    }
};

BattleManager.otbDisplayWindow = function() {
    return SceneManager._scene._otbDisplayWindow;
};

Olivia.OctoBattle.Battle.___BattleManager_endBattle___ = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    Olivia.OctoBattle.Battle.___BattleManager_endBattle___.call(this, result);
    this._hideOTBTurnDisplay = true;
};

Olivia.OctoBattle.Battle.___BattleManager_startInput___ = BattleManager.startInput;
BattleManager.startInput = function() {
    Olivia.OctoBattle.Battle.___BattleManager_startInput___.call(this);
    if (this.isOTB() && this._phase !== 'turn') {
        this.startTurn();
    }
};

Olivia.OctoBattle.Battle.___BattleManager_startTurn___ = BattleManager.startTurn;
BattleManager.startTurn = function() {
    if (this._otbFailedEscape) {
        this.otbFailedEscape();
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_startTurn___.call(this);
    }
};

BattleManager.otbFailedEscape = function() {
    this._otbFailedEscape = false;
    $gameParty.requestMotionRefresh();
};

Olivia.OctoBattle.Battle.___BattleManager_processTurn___ = BattleManager.processTurn;
BattleManager.processTurn = function() {
  if (this.isOTB() && this._subject.isActor()) {
      this.startOTBInput();
  } else {
      Olivia.OctoBattle.Battle.___BattleManager_processTurn___.call(this);
  }
};

BattleManager.startOTBInput = function() {
      this._phase = 'input';
      var battler = this._subject;
      if (!!battler) {
          BattleManager.changeActor(battler.index(), 'undecided');
          if (!battler.canInput()) {
              battler.makeActions();
              this.startAction();
          }
      }
};

Olivia.OctoBattle.Battle.___BattleManager_getNextSubject___ = BattleManager.getNextSubject;
BattleManager.getNextSubject = function() {
    if (this.isOTB()) {
        this._subject = this.getNextSubjectOTB();
        if (!!this._subject) {
            this._subject.makeActions();
        }
        this.otbDisplayWindow().updateShiftOrder();
        return this._subject;
    } else {
        return Olivia.OctoBattle.Battle.___BattleManager_getNextSubject___.call(this);
    }
};

BattleManager.getNextSubjectOTB = function() {
    for (;;) {
        var battler = this._actionBattlers.shift();
        if (!battler) {
            return null;
        }
        if (battler.isBattleMember() && battler.isAlive()) {
            return battler;
        }
    }
};

Olivia.OctoBattle.Battle.___BattleManager_selectPreviousCommand___ = BattleManager.selectPreviousCommand;
BattleManager.selectPreviousCommand = function() {
    if (this.isOTB()) {
        this._activeOTBActor = this._actorIndex;
        this._subject = null;
        this.changeActor(-1, 'undecided');
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_selectPreviousCommand___.call(this);
    }
};

Olivia.OctoBattle.Battle.___BattleManager_displayEscapeFailureMessage___ = BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
    Olivia.OctoBattle.Battle.___BattleManager_displayEscapeFailureMessage___.call(this);
    if (this.isOTB()) {
        this.endAction();
        this._otbFailedEscape = true;
    }
};

BattleManager.otbSetSubject = function() {
    BattleManager.changeActor(this._activeOTBActor, 'undecided');
    this._subject = this.actor();
};

Olivia.OctoBattle.Battle.___BattleManager_selectNextCommand___ = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
    if (this.isOTB()) {
        if (this._subject) {
            this.startAction();
        } else {
            this.otbSetSubject();
            this.startOTBInput();
        }
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_selectNextCommand___.call(this);
    }
};

Olivia.OctoBattle.Battle.___BattleManager_startAction___ = BattleManager.startAction;
BattleManager.startAction = function() {
    if (Imported.YEP_InstantCast) {
        this.detectOtbInstantCast();
    }
    Olivia.OctoBattle.Battle.___BattleManager_startAction___.call(this);
};

if (Imported.YEP_InstantCast) { // Bypass need to order the Plugin Manager List

Olivia.OctoBattle.Battle.___InstantBattleManager_startAction___ = BattleManager.startAction;
BattleManager.startAction = function() {
    this._startedInstantCasting = true;
    Olivia.OctoBattle.Battle.___InstantBattleManager_startAction___.call(this);
};

}

Olivia.OctoBattle.Battle.___BattleManager_endAction___ = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this.isOTB()) {
        this.endOTBAction();
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_endAction___.call(this);
    }
};

if (Imported.YEP_InstantCast) { // Bypass need to order the Plugin Manager List

Olivia.OctoBattle.Battle.___InstantBattleManager_endAction___ = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this.isOTB() && this._instantCasting) {
        this.endActorInstantCast();
    } else {
        Olivia.OctoBattle.Battle.___InstantBattleManager_endAction___.call(this);
    }
    this._startedInstantCasting = false;
};

}

BattleManager.endOTBAction = function() {
    this._phase = 'turn';
    if (this._otbInstantCast) {
        this._otbInstantCast = false;
        if (this._subject.isEnemy()) {
            this._actionBattlers.unshift(this._subject);
            this._subject.makeActions();
        }
        return Yanfly.BEC.BattleManager_endAction.call(this);
    }
    if (this._subject) {
        this._subject.spriteStepBack();
        if (Imported.YEP_BuffsStatesCore) {
            this._subject.onActionEndStateEffects();
        }
        this._subject.onAllActionsEnd();
        this._subject.removeCurrentAction();
    }
    if (this._processingForcedAction) {
        this._phase = this._preForcePhase;
        this._processingForcedAction = false;
    }
    if (this.loadPreForceActionSettings()) {
        return;
    }
    this.clearActor();
    this._subject = null;
    this.otbClearActionOrdersOfUnableBattlers();
    Yanfly.BEC.BattleManager_endAction.call(this);
};

BattleManager.otbClearActionOrdersOfUnableBattlers = function() {
    var changes1 = this.otbClearActionOrdersOfUnableBattlersArray(this._actionBattlers);
    var changes2 = this.otbClearActionOrdersOfUnableBattlersArray(this._nextTurnActionBattlers);
    this._requestClearUnableBattlers = changes1 || changes2;
};

BattleManager.otbClearActionOrdersOfUnableBattlersArray = function(array) {
    var changesMade = false;
    for (var i = 0; i < array.length; i++) {
        var battler = array[i];
        if (!!battler) {
            if (this.otbCheckIfBattlerIsUnable(battler, array)) {
                array.splice(i, 1);
                i--;
                this._requestCurrentTurnUpdate = true;
                this._requestNextTurnUpdate = true;
                changesMade = true;
            }
        }
    }
    return changesMade;
};

Olivia.OctoBattle.Battle.___BattleManager_forceAction___ = BattleManager.forceAction;
BattleManager.forceAction = function(battler) {
    if (this.isOTB()) {
        if ($gameTroop.turnCount() > 0) {
            battler._otbTimesActedThisTurn -= 1;
            this.otbForceAction(battler);
        } else if ($gameTemp.isPlaytest()) {
            var message = 'Forced actions do not work on turn 0. Please use turn 1.';
            SceneManager.stop();
            Graphics.printError('Battle System OTB Error', message);
        }
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_forceAction___.call(this, battler);
    }
};

BattleManager.otbForceAction = function(battler) {
    if (this._subject) this._subject.clearResult();
    this.createForceActionFailSafes();
    this.savePreForceActionSettings();
    this._actionForcedBattler = battler;
};

BattleManager.otbCheckIfBattlerIsUnable = function(battler, array) {
    if (battler.isDead() || battler.isHidden()) {
        return true;
    } else if (!battler.canMove() && array === this._actionBattlers) {
        return true;
    } else if (!this.allBattleMembers().contains(battler)) {
        return true;
    } else if (!battler.canMove() && array === this._nextTurnActionBattlers) {
        var tempBattler = JsonEx.makeDeepCopy(battler);
        tempBattler._tempBattler = true;
        tempBattler.updateStateTurns();
        tempBattler.refresh();
        return !tempBattler.canMove();
    } else {
        return false;
    }
};

BattleManager.otbInsertRevivalActionOrders = function(battler) {
    battler._otbTimesActedThisTurn = battler._otbTimesActedThisTurn || 0;
    if (Olivia.OctoBattle.OTB.RemoveRestrictCurrent && battler.makeActionTimes() > battler._otbTimesActedThisTurn) {
        this.otbInsertRevivalActionOrder(battler, this._actionBattlers);
    }
    if (Olivia.OctoBattle.OTB.RemoveRestrictNext) {
        this.otbInsertRevivalActionOrder(battler, this._nextTurnActionBattlers);
    }
};

BattleManager.otbInsertRevivalActionOrder = function(battler, array) {
    if (!array.contains(battler)) {
        if (Olivia.OctoBattle.OTB.AddedActionTimes) {
            battler._otbTimesActedThisTurn = battler._otbTimesActedThisTurn || 0;
            var times = Math.max(battler.makeActionTimes() - battler._otbTimesActedThisTurn, 1);
        } else {
            var times = 1;
        }
        while (times--) {
            array.push(battler);
        }
        this.otbDisplayWindow().createReturnedBattlerSprite(battler, array === this._actionBattlers);
    }
};

BattleManager.otbInsertActionOrderAtEnd = function(battler, array, times) {
    while (times--) {
        array.push(battler);
        this.otbDisplayWindow().createBattlerSpriteAtEnd(battler, array === this._actionBattlers);
    }
};

BattleManager.detectOtbInstantCast = function() {
    this._otbInstantCast = false;
    if (!this.isOTB()) {
        return;
    } else if (!this._subject) {
        return;
    } else if (!this._subject.currentAction()) {
        return;
    } else if (!this._subject.currentAction().item()) {
        return;
    } else {
        var item = this._subject.currentAction().item();
        this._otbInstantCast = this._subject.isInstantCast(item);
    }
};

BattleManager.getSpritePriority = function() {
    if (this._subject && this._subject.isActor()) {
        return 1;
    } else if (this._subject && this._subject.isEnemy()) {
        return 2;
    } else {
        return 0;
    } 
};

Olivia.OctoBattle.Battle.___BattleManager_makeActionOrders___ = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
    if (this.isOTB()) {
        this.makeActionOrdersOTB();
        this.otbDisplayWindow().createNewSprites();
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_makeActionOrders___.call(this);
    }
};

BattleManager.makeActionOrdersOTB = function() {
    if (this._createdFirstTurnActionOrders) {
        this._actionBattlers = this._nextTurnActionBattlers;
    }
    this._nextTurnActionBattlers = [];
    this._nextTurnActionBattlers = this._nextTurnActionBattlers.concat($gameParty.aliveMembers());
    this._nextTurnActionBattlers = this._nextTurnActionBattlers.concat($gameTroop.aliveMembers());
    this._nextTurnActionBattlers.forEach(function(battler) {
        battler.makeSpeed();
    });
    this._nextTurnActionBattlers.sort(function(a, b) {
        return b.speed() - a.speed();
    });
    if (!this._createdFirstTurnActionOrders) {
        Olivia.OctoBattle.Battle.___BattleManager_makeActionOrders___.call(this);
    }
    if (!this._createdFirstTurnActionOrders) {
        this.otbActionTimesModification(this._actionBattlers);
    }
    this.otbClearActionOrdersOfUnableBattlers();
    this.otbActionTimesModification(this._nextTurnActionBattlers);
    this._createdFirstTurnActionOrders = true;
};

BattleManager.otbActionTimesModification = function(array) {
    if (Olivia.OctoBattle.OTB.AddedActionTimes) {
        var battlers = this.allBattleMembers();
        for (var i = 0; i < battlers.length; i++) {
            var battler = battlers[i];
            if (!!battler && array.contains(battler)) {
                var minimumIndex = array.indexOf(battler);
                var actionTimes = battler.makeActionTimes() - 1;
                while (actionTimes--) {
                    if (Olivia.OctoBattle.OTB.ActionTimeOrderRandomize && battler.speed() !== Infinity) {
                        var targetIndex = Math.randomInt(array.length - minimumIndex) + minimumIndex;
                    } else {
                        var targetIndex = minimumIndex;
                    }
                    array.splice(targetIndex, 0, battler);
                }
            }
        }
    }
};

BattleManager.otbNextTurnChange = function(battler, change, currentTurn) {
    if (currentTurn) {
        var targetArray = this._actionBattlers;
        this._requestCurrentTurnUpdate = true;
        this._requestCurrentTurnSpriteReorder = true;
    } else {
        var targetArray = this._nextTurnActionBattlers;
        this._requestNextTurnUpdate = true;
        this._requestNextTurnSpriteReorder = true;
    }
    if (targetArray.contains(battler)) {
        var indices = targetArray.getAllIndices(battler);
        for (var i = indices.length - 1; i >= 0; i--) {
            targetArray.splice(indices[i], 1);
        }
        var minimum = this.otbInfinityClamp(targetArray);
        for (var i = 0; i < indices.length; i++) {
            var index = (indices[i] - change).clamp(minimum, targetArray.length);
            targetArray.splice(index, 0, battler);
        }
    }
};

BattleManager.otbInfinityClamp = function(sourceArray) {
    if (Olivia.OctoBattle.OTB.StunWakeUpClamp) {
        for (var i = 0; i < sourceArray.length; i++) {
            var battler = sourceArray[i];
            if (battler.speed() !== Infinity) {
                return i;
            }
        }
        return i;
    } else {
        return 0;
    }
};

BattleManager.otbAddBattler = function(battler) {
    if (!!battler && this.allBattleMembers().contains(battler)) {
        this.otbInsertActionOrderAtEnd(battler, this._actionBattlers);
        this.otbInsertActionOrderAtEnd(battler, this._nextTurnActionBattlers);
    }
};

BattleManager.otbRemoveBattler = function(battler) {
    this.otbClearActionOrdersOfUnableBattlers();
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

Olivia.OctoBattle.Battle.___Game_Action_speed___ = Game_Action.prototype.speed;
Game_Action.prototype.speed = function() {
    if (BattleManager.isOTB()) {
        return this.speedOTB();
    } else {
        return Olivia.OctoBattle.Battle.___Game_Action_speed___.call(this);
    }
};

Game_Action.prototype.speedOTB = function() {
    if (Olivia.OctoBattle.OTB.StaticAgiCalculation) {
        var speed = this.subject().agi;
    } else {
        var agi = this.subject().agi;
        var speed = agi + Math.randomInt(Math.floor(5 + agi / 4));
    }
    return speed;
};

Olivia.OctoBattle.Battle.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.Battle.___Game_Action_applyItemUserEffect___.call(this, target);
    if (BattleManager.isOTB() && !!this.item()) {
        DataManager.otbBuffDebuffAgiConvert(this.item());
        this.applyOTBEffect(target);
        this.applyOTBAddAction(target);
    }
};

Game_Action.prototype.applyOTBEffect = function(target) {
    if (target.speed() !== Infinity) {
        var currentTurnChange = 0;
        var nextTurnChange = 0;
        if (this.item().note.match(/<OTB Target Follow Turn: ([\+\-]\d+)>/i)) {
            if (BattleManager._actionBattlers.contains(target)) {
                currentTurnChange += parseInt(RegExp.$1);
            } else {
                nextTurnChange += parseInt(RegExp.$1);
            }
        }
        if (this.item().note.match(/<OTB Target Current Turn: ([\+\-]\d+)>/i)) {
            currentTurnChange += parseInt(RegExp.$1);
        }
        if (this.item().note.match(/<OTB Target Next Turn: ([\+\-]\d+)>/i)) {
            nextTurnChange += parseInt(RegExp.$1);
        }
        if (currentTurnChange !== 0) {
            BattleManager.otbNextTurnChange(target, currentTurnChange, true);
        }
        if (nextTurnChange !== 0) {
            BattleManager.otbNextTurnChange(target, nextTurnChange, false);
        }
    }
};

Game_Action.prototype.applyOTBAddAction = function(target) {
    if (this.item().note.match(/<OTB Target Add Current Turn (?:Action|Actions): (\d+)>/i)) {
        var times = parseInt(RegExp.$1);
        target.otbAddActionTimes(times, true);
    }
    if (this.item().note.match(/<OTB Target Add Next Turn (?:Action|Actions): (\d+)>/i)) {
        var times = parseInt(RegExp.$1);
        target.otbAddActionTimes(times, false);
    }
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.OctoBattle.Battle.___Game_BattlerBase_paySkillCost___ = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Olivia.OctoBattle.Battle.___Game_BattlerBase_paySkillCost___.call(this, skill);
    if ($gameParty.inBattle() && BattleManager.isOTB()) {
        this.otbTurnShiftCost();
        this.otbAddActionCost();
    }
};

Game_BattlerBase.prototype.otbTurnShiftCost = function() {
    var nextTurnChange = 0;
    if (!!this.currentAction() && this.currentAction().item()) {
        var item = this.currentAction().item();
        if (Olivia.OctoBattle.OTB.ActionSpeedConvert) {
            nextTurnChange += item.speed;
        }
        if (item.note.match(/<OTB User Next Turn: ([\+\-]\d+)>/i)) {
            nextTurnChange += parseInt(RegExp.$1);
        }
    }
    if (nextTurnChange !== 0) {
        BattleManager.otbNextTurnChange(this, nextTurnChange, false);
    }
};

Game_BattlerBase.prototype.otbAddActionCost = function() {
    if (!!this.currentAction() && this.currentAction().item()) {
        var item = this.currentAction().item();
        if (item.note.match(/<OTB User Add Current Turn (?:Action|Actions): (\d+)>/i)) {
            var times = parseInt(RegExp.$1);
            this.otbAddActionTimes(times, true);
        }
        if (item.note.match(/<OTB User Add Next Turn (?:Action|Actions): (\d+)>/i)) {
            var times = parseInt(RegExp.$1);
            this.otbAddActionTimes(times, false);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_BattlerBase_hide___ = Game_BattlerBase.prototype.hide;
Game_BattlerBase.prototype.hide = function() {
    var isHidden = this._hidden;
    Olivia.OctoBattle.Battle.___Game_BattlerBase_hide___.call(this);
    if (BattleManager.isOTB() && isHidden !== this._hidden && !isHidden) {
        BattleManager.otbRemoveBattler(this);
    }
};

Olivia.OctoBattle.Battle.___Game_BattlerBase_appear___ = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
    var isHidden = this._hidden;
    Olivia.OctoBattle.Battle.___Game_BattlerBase_appear___.call(this);
    if (BattleManager.isOTB() && isHidden !== this._hidden && isHidden) {
        BattleManager.otbAddBattler(this);
    }
};

Game_BattlerBase.prototype.otbInstanceName = function() {
    if (this.isActor()) {
        return 'Actor ' + this.actorId();
    } else {
        return 'Enemy ' + this.index();
    }
};
//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Olivia.OctoBattle.Battle.___Game_Battler_onBattleStart___ = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    if (BattleManager.isOTB()) {
        this._otbTimesActedThisTurn = 0;
    }
    Olivia.OctoBattle.Battle.___Game_Battler_onBattleStart___.call(this);
};

Olivia.OctoBattle.Battle.___Game_Battler_onBattleEnd___ = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    if (BattleManager.isOTB()) {
        this._otbTimesActedThisTurn = 0;
    }
    Olivia.OctoBattle.Battle.___Game_Battler_onBattleEnd___.call(this);
};

Olivia.OctoBattle.Battle.___Game_Battler_performActionEnd___ = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    Olivia.OctoBattle.Battle.___Game_Battler_performActionEnd___.call(this);
    this._otbTimesActedThisTurn = this._otbTimesActedThisTurn || 0;
    this._otbTimesActedThisTurn += 1;
};

Olivia.OctoBattle.Battle.___Game_Battler_onTurnEnd___ = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
    if (BattleManager.isOTB()) {
        this._otbTimesActedThisTurn = 0;
        var setting = Olivia.OctoBattle.OTB.RemoveRestrictCurrent;
        Olivia.OctoBattle.OTB.RemoveRestrictCurrent = false;
    }
    Olivia.OctoBattle.Battle.___Game_Battler_onTurnEnd___.call(this);
    if (BattleManager.isOTB()) {
        Olivia.OctoBattle.OTB.RemoveRestrictCurrent = setting;
    }
};

if (Imported.YEP_BuffsStatesCore) {

Olivia.OctoBattle.Battle.___Game_Battler_customEffectEval___ = Game_Battler.prototype.customEffectEval;
Game_Battler.prototype.customEffectEval = function(stateId, type) {
    if (!this._tempBattler) {
        Olivia.OctoBattle.Battle.___Game_Battler_customEffectEval___.call(this, stateId, type);
    }
};

Olivia.OctoBattle.Battle.___Game_Action_customEffectEval___ = Game_Action.prototype.customEffectEval;
Game_Action.prototype.customEffectEval = function(target, stateId, type, side, value) {
    if (this._tempBattler || target._tempBattler) {
        return value;
    } else {
        return Olivia.OctoBattle.Battle.___Game_Action_customEffectEval___.call(this, target, stateId, type, side, value);
    }
};

}

Game_Battler.prototype.otbAddActionTimes = function(times, currentTurn) {
    if (Olivia.OctoBattle.OTB.AddedActionTimes) {
        var times = Math.max(1, times);
        if (currentTurn) {
            var array = BattleManager._actionBattlers;
        } else {
            var array = BattleManager._nextTurnActionBattlers;
        }
        BattleManager.otbInsertActionOrderAtEnd(this, array, times);
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_addState___ = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    var canMove = this.canMove();
    var actionTimes = this.makeActionTimes();
    Olivia.OctoBattle.Battle.___Game_Battler_addState___.call(this, stateId);
    if ($gameParty.inBattle() && BattleManager.isOTB()) {
        if (canMove && !this.canMove()) {
            BattleManager.otbClearActionOrdersOfUnableBattlers();
        } else if (this.makeActionTimes() > actionTimes) {
            var times = this.makeActionTimes() > actionTimes;
            this.otbAddActionTimes(times, true);
            this.otbAddActionTimes(times, false);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_removeState___ = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    var canMove = this.canMove();
    var actionTimes = this.makeActionTimes();
    Olivia.OctoBattle.Battle.___Game_Battler_removeState___.call(this, stateId);
    if (!this._tempBattler && $gameParty.inBattle() && BattleManager.isOTB()) {
        if (!canMove && this.canMove()) {
            BattleManager.otbInsertRevivalActionOrders(this);
        } else if (this.makeActionTimes() > actionTimes) {
            var times = this.makeActionTimes() > actionTimes;
            this.otbAddActionTimes(times, true);
            this.otbAddActionTimes(times, false);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_makeSpeed___ = Game_Battler.prototype.makeSpeed;
Game_Battler.prototype.makeSpeed = function() {
    if (!Olivia.OctoBattle.OTB.StunWakeUpFirst && this._actions.length <= 0) {
        this._actions.push(new Game_Action(this));
    }
    Olivia.OctoBattle.Battle.___Game_Battler_makeSpeed___.call(this);
};

Olivia.OctoBattle.Battle.___Game_Battler_isUndecided___ = Game_Battler.prototype.isUndecided;
Game_Battler.prototype.isUndecided = function() {
    if (BattleManager.isOTB()) {
        return true;
    } else {
        return Olivia.OctoBattle.Battle.___Game_Battler_isUndecided___.call(this);
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_consumeItem___ = Game_Battler.prototype.consumeItem;
Game_Battler.prototype.consumeItem = function(item) {
    Olivia.OctoBattle.Battle.___Game_Battler_consumeItem___.call(this, item);
    if ($gameParty.inBattle() && BattleManager.isOTB()) {
        this.otbTurnShiftCost();
        this.otbAddActionCost();
    }
};

//-----------------------------------------------------------------------------
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

Olivia.OctoBattle.Battle.___Game_Party_addActor___ = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    var inParty = this._actors.contains(actorId);
    Olivia.OctoBattle.Battle.___Game_Party_addActor___.call(this, actorId);
    if (BattleManager.isOTB() && $gameParty.inBattle() && !inParty) {
        var actor = $gameActors.actor(actorId);
        if (!!actor) {
            BattleManager.otbAddBattler(actor);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_Party_removeActor___ = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    var inParty = this._actors.contains(actorId);
    Olivia.OctoBattle.Battle.___Game_Party_removeActor___.call(this, actorId);
    if (BattleManager.isOTB() && $gameParty.inBattle() && inParty) {
        var actor = $gameActors.actor(actorId);
        if (!!actor) {
            BattleManager.otbRemoveBattler(actor);
        }
    }
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Olivia.OctoBattle.Battle.___Scene_Battle_createHelpWindow___ = Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
    Olivia.OctoBattle.Battle.___Scene_Battle_createHelpWindow___.call(this);
    if (BattleManager.isOTB()) {
        this.createOTBDisplayWindow();
        this._helpWindow.y = Olivia.OctoBattle.OTB.HelpWindowNewY;
        this._logWindow.y = Olivia.OctoBattle.OTB.LogWindowNewY;
    }
};

Scene_Battle.prototype.createOTBDisplayWindow = function() {
    this._otbDisplayWindow = new Window_OTBDisplay(this._helpWindow);
    this.addWindow(this._otbDisplayWindow);
};

Olivia.OctoBattle.Battle.___Scene_Battle_createActorCommandWindow___ = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    Olivia.OctoBattle.Battle.___Scene_Battle_createActorCommandWindow___.call(this);
    if (BattleManager.isOTB()) {
        this._actorCommandWindow.setHandler('escape', this.commandEscape.bind(this));
        if (!Olivia.OctoBattle.OTB.EnablePartyWindow) {
            this._actorCommandWindow._handlers['cancel'] = undefined;
        }
    }
};

Olivia.OctoBattle.Battle.___Scene_Battle_commandEscape___ = Scene_Battle.prototype.commandEscape;
Scene_Battle.prototype.commandEscape = function() {
    if (BattleManager.isOTB()) {
        BattleManager.processEscape();
    } else {
        Olivia.OctoBattle.Battle.___Scene_Battle_commandEscape___.call(this);
    }
};

if (Imported.YEP_PartySystem && Imported.YEP_X_ActorPartySwitch) {

Olivia.OctoBattle.Battle.___Scene_Battle_postPartySwitch___ = Scene_Battle.prototype.postPartySwitch;
Scene_Battle.prototype.postPartySwitch = function(index, swapOut, swapIn) {
    Olivia.OctoBattle.Battle.___Scene_Battle_postPartySwitch___.call(this, index, swapOut, swapIn);
    if (BattleManager.isOTB()) {
        this.otbPostPartySwitch(index, swapOut, swapIn);
    }
};

Scene_Battle.prototype.otbPostPartySwitch = function(index, swapOut, swapIn) {
    BattleManager._subject = swapIn;
    BattleManager.otbDisplayWindow()._subjectSprite.setBattler(swapIn);
    BattleManager.otbRemoveBattler(swapOut);
    var times = Math.max(0, swapIn.makeActionTimes() - swapIn._otbTimesActedThisTurn - 1);
    if (times > 0) {
        swapIn.otbAddActionTimes(times, true);
    }
    swapIn.otbAddActionTimes(swapIn.makeActionTimes(), false);
    this._helpWindow.setBPSubject(BattleManager.actor());
};

}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//
// The set of sprites on the battle screen.

Spriteset_Battle.prototype.updateZCoordinates = function() {
    if (Imported.YEP_ImprovedBattlebacks) {
        this.updateBattlebackGroupRemove();
    } else {
        this._battleField.removeChild(this._back1Sprite);
        this._battleField.removeChild(this._back2Sprite);
    }
    if (BattleManager.getSpritePriority() !== 0){
        this._battleField.children.sort(this.battleFieldDepthCompare);
    }
    if (Imported.YEP_ImprovedBattlebacks) {
        this.updateBattlebackGroupAdd();
    } else {
        this._battleField.addChildAt(this._back2Sprite, 0);
        this._battleField.addChildAt(this._back1Sprite, 0);
    }
};

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
    var priority = BattleManager.getSpritePriority();
    if (a._battler && b._battler && priority !== 0) {
        if (priority === 1) {
            if (a._battler.isActor() && b._battler.isEnemy()) return 1;
            if (a._battler.isEnemy() && b._battler.isActor()) return -1;
        } else if (priority === 2) {
            if (a._battler.isActor() && b._battler.isEnemy()) return -1;
            if (a._battler.isEnemy() && b._battler.isActor()) return 1;
        }
    }
    if (a.z < b.z) {
        return -1;
    } else if (a.z > b.z) {
        return 1;
    } else if (a.y < b.y) {
        return -1;
    } else if (a.y > b.y) {
        return 1;
    } else {
        return 0;
    }
};

//-----------------------------------------------------------------------------
// Sprite_OTBTurnOrder
//
// The sprite for displaying a button.

function Sprite_OTBTurnOrder() {
    this.initialize.apply(this, arguments);
}

Sprite_OTBTurnOrder.prototype = Object.create(Sprite_Base.prototype);
Sprite_OTBTurnOrder.prototype.constructor = Sprite_OTBTurnOrder;

Sprite_OTBTurnOrder.prototype.initialize = function(battler, instance, source) {
    this._battler = battler;
    this._instance = instance || 0;
    this._sourceArray = source;
    this.createConstants();
    this._previewMode = false;
    this._disposeState = false;
    Sprite_Base.prototype.initialize.call(this);
    this.opacity = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.createBackground1Sprite();
    this.createBackground2Sprite();
    this.createBattlerSprite();
};

Sprite_OTBTurnOrder.prototype.lineHeight = function() {
    return Window_Base.prototype.lineHeight.call(this);
};

Sprite_OTBTurnOrder.prototype.createConstants = function() {
    this._updateReady = false;
    this._targetX = 0;
    this._moveDuration = Olivia.OctoBattle.OTB.MoveDuration;
    this._opacityRate = Olivia.OctoBattle.OTB.OpacitySpeed;
    this._bigAppearance = false;
    this._selectionEffectCount = 0;
    this._x1 = BattleManager.otbDisplayWindow()._x1;
    this._x2 = BattleManager.otbDisplayWindow()._x2;
    this._width1 = BattleManager.otbDisplayWindow()._width1;
    this._width2 = BattleManager.otbDisplayWindow()._width2;
};

Sprite_OTBTurnOrder.prototype.createBackground1Sprite = function() {
    var lh = this.lineHeight();
    this.x = lh;
    this.y = lh;
    var hlh = Math.round(lh / 2);
    this._background1Sprite = new Sprite();
    this.addChild(this._background1Sprite);
    this._background1Sprite.bitmap = new Bitmap(lh, lh);
    var color1 = 'rgba(255, 255, 255, 1)';
    if (this._battler.isActor()) {
        var color2 = Olivia.OctoBattle.OTB.BackgroundActorColor;
    } else {
        var color2 = Olivia.OctoBattle.OTB.BackgroundEnemyColor;
    }
    var points = [hlh, 0, 0, hlh, hlh, lh, lh, hlh];
    this._background1Sprite.bitmap.drawOutlinePolygon(points, color1, color2, 1, 1, true);
    this._background1Sprite.anchor.x = 0.5;
    this._background1Sprite.anchor.y = 0.5;
};

Sprite_OTBTurnOrder.prototype.createBackground2Sprite = function() {
    var lh = this.lineHeight() * 2;
    var hlh = Math.round(lh / 2);
    this._background2Sprite = new Sprite();
    this.addChild(this._background2Sprite);
    this._background2Sprite.bitmap = new Bitmap(lh, lh);
    var color1 = 'rgba(255, 255, 255, 1)';
    if (this._battler.isActor()) {
        var color2 = Olivia.OctoBattle.OTB.BackgroundActorColor;
    } else {
        var color2 = Olivia.OctoBattle.OTB.BackgroundEnemyColor;
    }
    var points = [hlh, 0, 0, hlh, hlh, lh, lh, hlh];
    this._background2Sprite.bitmap.drawOutlinePolygon(points, color1, color2, 1, 1, true);
    this._background2Sprite.anchor.x = 0.5;
    this._background2Sprite.anchor.y = 0.5;
    this._background2Sprite.opacity = 0;
};

Sprite_OTBTurnOrder.prototype.createBattlerSprite = function() {
    this._battlerSprite = new Sprite();
    this.addChild(this._battlerSprite);
    this._battlerSprite.anchor.x = 0.5;
    this._battlerSprite.anchor.y = 0.5;
    this._battlerSprite.bitmap = this.loadBattlerSpriteBitmap();
    this._battlerSprite.bitmap.addLoadListener(this.setupBattlerBitmap.bind(this));
};

Sprite_OTBTurnOrder.prototype.checkDragonbones = function() {
    return Imported.KELYEP_DragonBones && this._battler.isReplacedByDragonBonesBattler();
};

Sprite_OTBTurnOrder.prototype.loadBattlerSpriteBitmap = function() {
    var name = this._battler.battlerName();
    if (this._battler.isActor()) {
        if ($gameSystem.isSideView() && !this.checkDragonbones()) {
            return ImageManager.loadSvActor(name);
        } else {
            name = this._battler.characterName();
            return ImageManager.loadCharacter(name);
        }
    } else {
        var hue = this._battler.battlerHue();
        this._battlerName = name;
        this._battlerHue = hue;
        if (this.checkDragonbones()) {
            this._battlerName = dragonBonesIntegration.Game_Enemy_battlerName.call(this._battler);
            if ($gameSystem.isSideView()) {
                return ImageManager.loadSvEnemy(this._battlerName, hue);
            } else {
                return ImageManager.loadEnemy(this._battlerName, hue);
            }
        } else if (Imported.YEP_X_AnimatedSVEnemies && this._battler.hasSVBattler()) {
            this._battlerName = this._battler.svBattlerName();
            return ImageManager.loadSvActor(this._battlerName)
        } else if ($gameSystem.isSideView()) {
            return ImageManager.loadSvEnemy(name, hue);
        } else {
            return ImageManager.loadEnemy(name, hue);
        }
    }
};

Sprite_OTBTurnOrder.prototype.setupBattlerBitmap = function() {
    this.setupBattlerBitmapFrame();
    this.setupBattlerBitmapScale();
    this._updateReady = true;
};

Sprite_OTBTurnOrder.prototype.setupBattlerBitmapFrame = function() {
    var x = 0;
    var y = 0;
    var w = this._battlerSprite.bitmap.width;
    var h = this._battlerSprite.bitmap.height;
    this.scale.x = 1;
    if (this._battler.isActor()) {
        if ($gameSystem.isSideView() && !this.checkDragonbones()) {
            w /= 9;
            h /= 6;
        } else {
            var index = this._battler.characterIndex();
            var big = ImageManager.isBigCharacter(this._battler.characterName());
            w = this._battlerSprite.bitmap.width / (big ? 3 : 12);
            h = this._battlerSprite.bitmap.height / (big ? 4 : 8);
            x = (index % 4 * 3 + 1) * w;
            y = (Math.floor(index / 4) * 4) * h;
        }
    } else if (this.checkDragonbones()) {
        w *= 1;
        h *= 1;
    } else if (Imported.YEP_X_AnimatedSVEnemies && this._battler.isEnemy() && this._battler.hasSVBattler()) {
        w /= 9;
        h /= 6;
        this.scale.x = -1;
    }
    this._battlerSprite.setFrame(x, y, w, h);
};

Sprite_OTBTurnOrder.prototype.setupBattlerBitmapScale = function() {
    var lh = this.lineHeight();
    var largerDimension = Math.max(this._battlerSprite.width, this._battlerSprite.height);
    if (largerDimension > lh) {
        var rate = lh / largerDimension;
        this._battlerSprite.scale.x = rate;
        this._battlerSprite.scale.y = rate;
    }
    this._baseScale = rate;
    this._largeScale = Math.min(1, 2 * this._baseScale);
};

Sprite_OTBTurnOrder.prototype.setPreview = function(index) {
    this._previewMode = true;
    this.y = 0;
    if (this._sourceArray === BattleManager._actionBattlers) {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width1 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this.x = this._x1 + Math.round(this.lineHeight() / 2) + index * width - Math.round(width / 2);
    } else {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width2 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this.x = this._x2 + Math.round(this.lineHeight() / 2) + index * width - 4 - Math.round(width / 2);
    }
    this._background1Sprite.setBlendColor([255, 255, 255, 255]);
    this.opacity = 255;
};

Sprite_OTBTurnOrder.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (this._battler && this._updateReady) {
        this.updateBattlerBitmap();
    }
    this.updateOpacity();
    if (!this._previewMode) {
        this.updateMovement();
        this.updateSelectionEffect();
    }
};

Sprite_OTBTurnOrder.prototype.updateBattlerBitmap = function() {
    if (this._battler.isEnemy()) {
        if (this.checkDragonbones()) {
            var battlerName = dragonBonesIntegration.Game_Enemy_battlerName.call(this._battler);
        } else {
            var battlerName = this._battler.battlerName();
        }
        if (this._battlerName !== battlerName || this._battlerHue !== this._battler.battlerHue()) {
            this._updateReady = false;
            this.removeChild(this._battlerSprite);
            this.createBattlerSprite();
        }
    }
};

Sprite_OTBTurnOrder.prototype.setBattler = function(battler) {
    if (this._battler !== battler) {
        this._battler = battler;
        this._updateReady = false;
        this.removeChild(this._battlerSprite);
        this.createBattlerSprite();
    }
};

Sprite_OTBTurnOrder.prototype.updateMovement = function() {
    if (this._moveDuration) {
        var d = this._moveDuration;
        this.x = (this.x * (d - 1) + this._targetX) / d;
        this._moveDuration--;
    }
};

Sprite_OTBTurnOrder.prototype.updateOpacity = function() {
    if (this._disposeState && this._opacityRate > 0) {
        this._opacityRate *= -1;
    }
    if (!!BattleManager._hideOTBTurnDisplay) {
        this.opacity -= Math.ceil(Olivia.OctoBattle.OTB.OpacitySpeed);
    } else if (this._opacityRate > 0 && this.opacity < 255) {
        this.opacity += this._opacityRate;
    } else if (this._opacityRate < 0 && this.opacity > 0) {
        this.opacity += this._opacityRate;
    }
};

Sprite_OTBTurnOrder.prototype.updateSelectionEffect = function() {
    if (this._battler.isSelected()) {
        this._selectionEffectCount++
        if (this._selectionEffectCount % 30 < 15) {
            this._battlerSprite.setBlendColor([255, 255, 255, 64]);
        } else {
            this._battlerSprite.setBlendColor([0, 0, 0, 0]);
        }
        this._battlerSprite.scale.x = this._largeScale;
        this._battlerSprite.scale.y = this._largeScale;
        this._background2Sprite.opacity = 255;
        this._background1Sprite.opacity = 0;
    } else if (this._bigAppearance && this.x === this._targetX) {
        this._battlerSprite.setBlendColor([0, 0, 0, 0]);
        this._battlerSprite.scale.x = Math.min(this._largeScale, this._battlerSprite.scale.x + 0.05);
        this._battlerSprite.scale.y = Math.min(this._largeScale, this._battlerSprite.scale.y + 0.05);
        this._background2Sprite.opacity = 255;
        this._background1Sprite.opacity = 0;
    } else {
        this._selectionEffectCount = 0;
        this._battlerSprite.setBlendColor([0, 0, 0, 0]);
        this._battlerSprite.scale.x = 1 * this._baseScale;
        this._battlerSprite.scale.y = 1 * this._baseScale;
        this._background1Sprite.opacity = 255;
        this._background2Sprite.opacity = 0;
    }
};

Sprite_OTBTurnOrder.prototype.updatePosition = function() {
    this._moveDuration = Olivia.OctoBattle.OTB.MoveDuration;
    var indices = this._sourceArray.getAllIndices(this._battler);
    var index = indices[this._instance];
    if (this._instance < 0) {
        this._targetX = this.lineHeight();
        this._bigAppearance = true;
    } else if (this._sourceArray === BattleManager._actionBattlers) {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width1 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this._targetX = this._x1 + Math.round(this.lineHeight() / 2) + index * width;
    } else {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width2 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this._targetX = this._x2 + Math.round(this.lineHeight() / 2) + index * width - 4;
    }
};

//-----------------------------------------------------------------------------
// Window_Selectable
//
// The window class with cursor movement and scroll functions.

Olivia.OctoBattle.Battle.___Window_Selectable_select___ = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    Olivia.OctoBattle.Battle.___Window_Selectable_select___.call(this, index);
    if ($gameParty.inBattle() && BattleManager.isOTB() && SceneManager._scene instanceof Scene_Battle && this._otbTurnPreview) {
        if (index >= 0) {
            this.otbCreateTurnPreview();
        } else {
            this.otbClearTurnPreview();
        }
    }
};

Olivia.OctoBattle.Battle.Window_Selectable_deactivate = Window_Selectable.prototype.deactivate;
Window_Selectable.prototype.deactivate = function() {
    Olivia.OctoBattle.Battle.Window_Selectable_deactivate.call(this);
    this.otbClearTurnPreview();
};

Window_Selectable.prototype.otbCreateTurnPreview = function() {
};

Window_Selectable.prototype.otbClearTurnPreview = function() {
    BattleManager._requestNextTurnPreview = null;
    BattleManager._requestNextTurnPreviewClear = true;
};

Window_Selectable.prototype.otbSetTurnPreviewItem = function(item) {
    if (!!item) {
        DataManager.otbBuffDebuffAgiConvert(item);
        this.otbClearTurnPreview();
        BattleManager._requestNextTurnPreview = item;
        BattleManager._requestNextTurnPreviewClear = false;
    }
};


//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Olivia.OctoBattle.Battle.Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function() {
    this._otbTurnPreview = true;
    Olivia.OctoBattle.Battle.Window_ActorCommand_initialize.call(this);
};

Olivia.OctoBattle.Battle.___Window_ActorCommand_makeCommandList___ = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    Olivia.OctoBattle.Battle.___Window_ActorCommand_makeCommandList___.call(this);
    if (this._actor && Olivia.OctoBattle.OTB.EscapeActorWindow) {
        this.addEscapeCommand();
    }
};

Window_ActorCommand.prototype.addEscapeCommand = function() {
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
};

Window_ActorCommand.prototype.otbCreateTurnPreview = function() {
    if (this.currentSymbol() === 'attack') {
        this.otbSetTurnPreviewItem($dataSkills[this._actor.attackSkillId()]);
    } else if (this.currentSymbol() === 'guard') {
        this.otbSetTurnPreviewItem($dataSkills[this._actor.guardSkillId()]);
    } else {
        this.otbClearTurnPreview();
    }
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.

Olivia.OctoBattle.Battle.___Window_BattleEnemy_initialize___ = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
    this._otbTurnPreview = true;
    Olivia.OctoBattle.Battle.___Window_BattleEnemy_initialize___.call(this, x, y);
};

Window_BattleEnemy.prototype.otbCreateTurnPreview = function() {
    this.otbSetTurnPreviewItem(BattleManager.inputtingAction().item());
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.

Olivia.OctoBattle.Battle.___Window_BattleSkill_initialize___ = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
    this._otbTurnPreview = true;
    Olivia.OctoBattle.Battle.___Window_BattleSkill_initialize___.call(this, x, y, width, height);
};

Window_BattleSkill.prototype.otbCreateTurnPreview = function() {
    if (!!this.item()) {
        this.otbSetTurnPreviewItem(this.item());
    } else {
        this.otbClearTurnPreview();
    }
};

//-----------------------------------------------------------------------------
// Window_OTBDisplay
//
// The window for displaying the turn order for Battle System OTB

function Window_OTBDisplay() {
    this.initialize.apply(this, arguments);
}

Window_OTBDisplay.prototype = Object.create(Window_Base.prototype);
Window_OTBDisplay.prototype.constructor = Window_OTBDisplay;

Window_OTBDisplay.prototype.initialize = function(helpWindow) {
    this._helpWindow = helpWindow;
    var x = Olivia.OctoBattle.OTB.DisplayX;
    var y = Olivia.OctoBattle.OTB.DisplayY;
    var width = Graphics.boxWidth - x;
    if (Olivia.OctoBattle.SideBattleUI && Olivia.OctoBattle.SideBattleUI.Enabled) {
        width -= Olivia.OctoBattle.SideBattleUI.StatusWidth;
        width -= Math.max(Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove, Olivia.OctoBattle.SideBattleUI.SelectBattlerMove);
        width -= Window_Base._iconWidth * (Olivia.OctoBattle.SideBattleUI.StatesMax + 0.5);
    } else {
        width -= x;
    }
    width = Math.round(width);
    var height = this.lineHeight() * 3;
    this.setupVariableConstants();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.setupWindowConstants();
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.refresh();
};

Window_OTBDisplay.prototype.standardPadding = function() {
    return 0;
};

Window_OTBDisplay.prototype.setupVariableConstants = function() {
    BattleManager._requestCurrentTurnUpdate = false;
    BattleManager._requestCurrentTurnUpdateInstantly = false;
    BattleManager._requestNextTurnUpdate = false;
    BattleManager._requestNextTurnUpdateInstantly = false;
    this._subjectSprite = null;
    this._previewSprites = [];
    this._disposedSprites = [];
};

Window_OTBDisplay.prototype.setupWindowConstants = function() {
    this._x1 = this.lineHeight() * 2;
    this._x2 = Math.ceil(this.width / 2) + Math.round(Window_Base._iconWidth / 2) + 12;
    this._y = this.lineHeight();
    this._width1 = Math.ceil(this.width / 2) - Math.round(this.lineHeight() * 2.5);
    this._width2 = this.width - this._x2;
    this._helpWindowY = Olivia.OctoBattle.OTB.HelpWindowMoveY;
    this._helpMoveSpeed = Olivia.OctoBattle.OTB.HelpWindowMoveSpeed;
    this._spriteContainer = new Sprite();
    this.addChild(this._spriteContainer);
};

Window_OTBDisplay.prototype.refresh = function() {
    this.contents.clear();
    this.drawBackgroundLines();
    this.drawBackgroundText();
};

Window_OTBDisplay.prototype.drawBackgroundLines = function() {
    this.changePaintOpacity(true);
    var points = []
    var lh = this.lineHeight();
    var opacity = 1;
    points = [lh, 0, 0, lh, lh, lh * 2, lh * 2, lh];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [lh * 2 + 8, lh - 8, lh * 2, lh, lh * 2 + 8, lh + 8, lh * 2 + 12, lh + 4, this._x1 + this._width1 - 8, lh + 4, this._x1 + this._width1 - 4, lh + 8, this._x1 + this._width1 + 4, lh, this._x1 + this._width1 - 4, lh - 8, this._x1 + this._width1 - 8, lh - 4, lh * 2 + 12, lh - 4];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [this._x2 - 4, lh, this._x2 + 4, lh + 8, this._x2 + 8, lh + 4, this._x2 + this._width2 - 12, lh + 4, this._x2 + this._width2 - 8, lh + 8, this._x2 + this._width2, lh, this._x2 + this._width2 - 8, lh - 8, this._x2 + this._width2 - 12, lh - 4, this._x2 + 8, lh - 4, this._x2 + 4, lh - 8];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [this._x2 - 12, lh, this._x2 - 12 + lh, lh * 2, this._x2 - 20 + lh, lh * 2, this._x2 - 20, lh, this._x2 - 20 + lh, 0, this._x2 - 12 + lh, 0];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [this._x2 - 28, lh, this._x2 - 28 + lh, lh * 2, this._x2 - 36 + lh, lh * 2, this._x2 - 36, lh, this._x2 - 36 + lh, 0, this._x2 - 28 + lh, 0];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
};

Window_OTBDisplay.prototype.drawBackgroundText = function() {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    var original = this.contents.outlineColor;
    var text1 = Olivia.OctoBattle.OTB.CurrentTurnText;
    var text2 = Olivia.OctoBattle.OTB.NextTurnText;
    var fontSize1 = Olivia.OctoBattle.OTB.CurrentTurnFontSize;
    var fontSize2 = Olivia.OctoBattle.OTB.NextTurnFontSize;
    this.contents.fontSize = fontSize1;
    this.contents.drawText(text1, this.lineHeight(), this.lineHeight() * 2, this._width1, fontSize1, 'left');
    this.contents.fontSize = fontSize2;
    this.contents.drawText(text2, this._x2, this.lineHeight() * 2, this._width2, fontSize2, 'left');
};

Window_OTBDisplay.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (BattleManager._hideOTBTurnDisplay) {
        this.contentsOpacity -= Math.ceil(Olivia.OctoBattle.OTB.OpacitySpeed);
    } else if (this.contentsOpacity < 255) {
        this.contentsOpacity += Math.ceil(Olivia.OctoBattle.OTB.OpacitySpeed / 2);
    }
    if (!!this._helpWindow) {
        this.updateWindowPosition();
    }
    this.updateDisposeSprites();
    this.updateBattleManagerRequests();
};

Window_OTBDisplay.prototype.updateWindowPosition = function() {
    if (this._helpWindow.visible) {
        this.y = Math.min(this._helpWindowY, this.y + this._helpMoveSpeed);
    } else {
        this.y = Math.max(Olivia.OctoBattle.OTB.DisplayY, this.y - this._helpMoveSpeed);
    }
};

Window_OTBDisplay.prototype.disposeSprite = function(sprite) {
    sprite._opacityRate = Math.abs(sprite._opacityRate) * -1;
    sprite._disposeState = true;
    this._disposedSprites.push(sprite);
};

Window_OTBDisplay.prototype.updateDisposeSprites = function() {
    if (this._disposedSprites.length > 0 && this._disposedSprites[0].opacity <= 0) {
        this._spriteContainer.removeChild(this._disposedSprites.shift());
    }
};

Window_OTBDisplay.prototype.createNewSprites = function() {
    if (this._currentTurnSprites === undefined) {
        this._currentTurnSprites = [];
        this.createNewSpritesFor(true);
        this._nextTurnSprites = [];
        this.createNewSpritesFor(false);
        BattleManager._requestCurrentTurnUpdate = true;
        BattleManager._requestCurrentTurnUpdateInstantly = true;
        BattleManager._requestNextTurnUpdate = true;
        BattleManager._requestNextTurnUpdateInstantly = true;
    } else {
        this.giveTurnSpritesToNewArray();
        this.createNewSpritesFor(false);
        BattleManager._requestCurrentTurnUpdate = true;
        BattleManager._requestCurrentTurnUpdateInstantly = false;
        BattleManager._requestNextTurnUpdate = true;
        BattleManager._requestNextTurnUpdateInstantly = false;
    }
};

Window_OTBDisplay.prototype.giveTurnSpritesToNewArray = function() {
    while (this._currentTurnSprites.length > 0) {
        this.disposeSprite(this._currentTurnSprites.shift());
    }
    while (this._nextTurnSprites.length > 0) {
        var sprite = this._nextTurnSprites.shift();
        sprite._sourceArray = BattleManager._actionBattlers;
        this._currentTurnSprites.push(sprite);
    }
};

Window_OTBDisplay.prototype.createNewSpritesFor = function(currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
    }
    var instances = {};
    for (var i = 0; i < sourceArray.length; i++) {
        var battler = sourceArray[i];
        instances[battler.otbInstanceName()] = instances[battler.otbInstanceName()] || 0;
        var newSprite = new Sprite_OTBTurnOrder(battler, instances[battler.otbInstanceName()], sourceArray);
        instances[battler.otbInstanceName()] += 1;
        this._spriteContainer.addChild(newSprite);
        targetArray.push(newSprite);
        if (!currentTurn) {
            newSprite.x = this.width;
        }
    }
};

Window_OTBDisplay.prototype.createReturnedBattlerSprite = function(battler, currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
        var returnX = this._x1 + this._width1;
        BattleManager._requestCurrentTurnUpdate = true;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
        var returnX = this._x2 + this._width2;
        BattleManager._requestNextTurnUpdate = true;
    }
    var instances = {};
    instances[battler.otbInstanceName()] = instances[battler.otbInstanceName()] || 0;
    var indices = sourceArray.getAllIndices(battler);
    while (indices.length > 0) {
        var index = indices.shift()
        var newSprite = new Sprite_OTBTurnOrder(battler, instances[battler.otbInstanceName()], sourceArray);
        instances[battler.otbInstanceName()] += 1;
        this._spriteContainer.addChild(newSprite);
        targetArray.splice(index, 0, newSprite);
        newSprite.x = returnX;
    }
};

Window_OTBDisplay.prototype.createBattlerSpriteAtEnd = function(battler, currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
        var returnX = this._x1 + this._width1;
        BattleManager._requestCurrentTurnUpdate = true;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
        var returnX = this._x2 + this._width2;
        BattleManager._requestNextTurnUpdate = true;
    }
    var instances = {};
    var indices = sourceArray.getAllIndices(battler);
    var instance = indices.length - 1;
    var newSprite = new Sprite_OTBTurnOrder(battler, instance, sourceArray);
    targetArray.push(newSprite);
    this._spriteContainer.addChild(newSprite);
    newSprite.x = returnX;
};

Window_OTBDisplay.prototype.updateShiftOrder = function() {
    if (!!this._subjectSprite) {
        this.disposeSprite(this._subjectSprite);
        this._subjectSprite = null;
    }
    for (var i = 0; i < this._currentTurnSprites.length; i++) {
        var sprite = this._currentTurnSprites[i];
        if (sprite._battler === BattleManager._subject) {
            sprite._instance -= 1;
            if (sprite._instance === -1) {
                this._subjectSprite = sprite;
                this._subjectSprite.updatePosition();
                this._currentTurnSprites.splice(this._currentTurnSprites.indexOf(sprite), 1);
                i--;
                BattleManager._requestCurrentTurnUpdate = true;
            } else if (sprite._instance < -1) {
                this.disposeSprite(sprite);
                this._currentTurnSprites.splice(this._currentTurnSprites.indexOf(sprite), 1);
                i--;
                BattleManager._requestCurrentTurnUpdate = true;
            }
        }
    }
};

Window_OTBDisplay.prototype.updateBattleManagerRequests = function() {
    if (BattleManager._requestClearUnableBattlers) {
        this.updateClearUnableBattlers(this._currentTurnSprites);
        this.updateClearUnableBattlers(this._nextTurnSprites);
    }
    if (BattleManager._requestCurrentTurnUpdate) {
        this.updateTurnSpriteLocations(true);
    }
    if (BattleManager._requestNextTurnUpdate) {
        this.updateTurnSpriteLocations(false);
    }
    if (BattleManager._requestCurrentTurnSpriteReorder) {
        this.updateReorderSprites(true);
    }
    if (BattleManager._requestNextTurnSpriteReorder) {
        this.updateReorderSprites(false);
    }
    if (BattleManager._requestNextTurnPreview) {
        this.updateNextTurnPreview();
    }
    if (BattleManager._requestNextTurnPreviewClear) {
        this.updateNextTurnPreviewClear();
    }
};

Window_OTBDisplay.prototype.updateClearUnableBattlers = function(array) {
    BattleManager._requestClearUnableBattlers = false;
    for (var i = 0; i < array.length; i++) {
        var sprite = array[i];
        if (!!sprite && BattleManager.otbCheckIfBattlerIsUnable(sprite._battler, sprite._sourceArray)) {
            this.disposeSprite(sprite);
            array.splice(i, 1);
            i--;
        }
    }
};

Window_OTBDisplay.prototype.updateTurnSpriteLocations = function(currentTurn) {
    if (currentTurn) {
        var array = this._currentTurnSprites;
        var instant = BattleManager._requestCurrentTurnUpdateInstantly;
        BattleManager._requestCurrentTurnUpdate = false;
        BattleManager._requestCurrentTurnUpdateInstantly = false;
    } else {
        var array = this._nextTurnSprites;
        var instant = BattleManager._requestNextTurnUpdateInstantly;
        BattleManager._requestNextTurnUpdate = false;
        BattleManager._requestNextTurnUpdateInstantly = false;
    }
    for (var i = 0; i < array.length; i++) {
        var sprite = array[i];
        if (!sprite) {
            continue;
        }
        sprite.updatePosition();
        if (instant) {
            sprite.x = sprite._targetX;
            sprite._moveDuration = 1;
        }
    }
};

Window_OTBDisplay.prototype.updateReorderSprites = function(currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
        BattleManager._requestCurrentTurnUpdate = true;
        BattleManager._requestCurrentTurnSpriteReorder = false;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
        BattleManager._requestNextTurnUpdate = true;
        BattleManager._requestNextTurnSpriteReorder = false;
    }
    targetArray.sort(function(a, b) {
        return a._targetX - b._targetX;
    });
    this._spriteContainer.children.sort(function(a, b) {
        return a._targetX - b._targetX;
    });
};

Window_OTBDisplay.prototype.updateNextTurnPreview = function() {
    this._previewItem = BattleManager._requestNextTurnPreview;
    if (!this._previewItem) {
        return;
    }
    BattleManager._requestNextTurnPreview = null;
    this.updateNextTurnPreviewClear();
    this.updateNextTurnPreviewUser();
    this.updateNextTurnPreviewTargets();
};

Window_OTBDisplay.prototype.updateNextTurnPreviewUser = function() {
    var nextTurnChange = 0;
    if (Olivia.OctoBattle.OTB.ActionSpeedConvert) {
        nextTurnChange += this._previewItem.speed;
    }
    if (this._previewItem.note.match(/<OTB User Next Turn: ([\+\-]\d+)>/i)) {
        nextTurnChange += parseInt(RegExp.$1);
    }
    var battler = BattleManager._subject;
    var sourceArray = BattleManager._nextTurnActionBattlers;
    this.createPreviewSprite(battler, sourceArray, nextTurnChange);
};

Window_OTBDisplay.prototype.createPreviewSprite = function(battler, sourceArray, change) {
    if (change !== 0 && sourceArray.contains(battler)) {
        change += change > 0 ? 0 : -1;
        var indices = sourceArray.getAllIndices(battler);
        var minimum = BattleManager.otbInfinityClamp(sourceArray);
        for (var i = 0; i < indices.length; i++) {
            var index = (indices[i] - change).clamp(minimum, sourceArray.length);
            var newSprite = new Sprite_OTBTurnOrder(battler, i, sourceArray);
            this._spriteContainer.addChild(newSprite);
            this._previewSprites.push(newSprite);
            newSprite.setPreview(index);
        }
    }
};

Window_OTBDisplay.prototype.updateNextTurnPreviewTargets = function() {
    var targets = this.getSelectedBattleTargets();
    if (targets.length > 0) {
        var followTurnChange = 0;
        var currentTurnChange = 0;
        var nextTurnChange = 0;
        if (this._previewItem.note.match(/<OTB Target Follow Turn: ([\+\-]\d+)>/i)) {
            followTurnChange += parseInt(RegExp.$1);
        }
        if (this._previewItem.note.match(/<OTB Target Current Turn: ([\+\-]\d+)>/i)) {
            currentTurnChange += parseInt(RegExp.$1);
        }
        if (this._previewItem.note.match(/<OTB Target Next Turn: ([\+\-]\d+)>/i)) {
            nextTurnChange += parseInt(RegExp.$1);
        }
        for (var i = 0; i < targets.length; i++) {
            var battler = targets[i];
            if (battler.speed() !== Infinity) {
                if (BattleManager._actionBattlers.contains(battler)) {
                    currentTurnChange += followTurnChange;
                } else {
                    nextTurnChange += followTurnChange;
                }
                this.createPreviewSprite(battler, BattleManager._actionBattlers, currentTurnChange);
                this.createPreviewSprite(battler, BattleManager._nextTurnActionBattlers, nextTurnChange);
            }
        }
    }
};

Window_OTBDisplay.prototype.getSelectedBattleTargets = function() {
    var targets = [];
    var members = BattleManager.allBattleMembers();
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (!!member && member.isSelected()) {
            targets.push(member);
        }
    }
    return targets;
};

Window_OTBDisplay.prototype.updateNextTurnPreviewClear = function() {
    BattleManager._requestNextTurnPreviewClear = false;
    while (this._previewSprites.length > 0) {
        var sprite = this._previewSprites.shift();
        this.disposeSprite(sprite);
    }
};

//=============================================================================
} // End OTB
//=============================================================================

























