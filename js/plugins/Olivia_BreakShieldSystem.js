//=============================================================================
// Olivia Engine - Break Shield System - for RPG Maker MV version 1.6.1
// Olivia_BreakShieldSystem.js
//=============================================================================
 /*:
 * @plugindesc <BreakShieldSystem> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that will create a new mechanic called a
 * Break Shield. Actors and/or enemies can have them. Whenever a battler is
 * struck with an elemental weakness, their Break Shield is reduced by 1
 * (unless modified by a notetag). Once the battler's Break Shield reaches
 * a score of 0, a state is then applied to the battler (usually a stun state).
 * Once the Break state wears off, the battler will regain their Break Shields
 * again. This can be used to create complex battle depth for your game.
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * There are some important plugin parameters to modify if you want to
 * customize the Break Shield system to your liking.
 *
 * Access:
 *
 * Actor Shields: Enable or disable the Break Shield system for actors. 
 * If enabled, actors when hit by elemental weaknesses will also lose shields
 * and can be stunned, too.
 *
 * Draw Menu Shields: If enabled, will draw Break Shield in the menu where
 * states are drawn.
 *
 * Enemy Shields: Enable or disable the Break Shield system for enemies.
 * You can disable this if you want only your actors to suffer from the
 * Break Shield system.
 *
 * Mechanics:
 *
 * Base Shield Value: The minimum amount of shields a battler can have
 *
 * Break Reduction: The default value of the item or skill when it goes to
 * reduce Break Shield points
 *
 * Element Weakness Rate: The element weakness rate must be greater than this
 * value to break a Break Shield point
 *
 * Max Break Shields: The maximum amount of shields a battler can have
 *
 * Stun State ID: The state ID used for the stun state that is applied when
 * Break Shields reach 0. THIS IS AN IMPORTANT PLUGIN PARAMETER TO ADJUST
 * if you want to customize this system for your game! Change this to the
 * ID of the state you want to count as the Break state.
 *
 * Visuals:
 *
 * Shield Icon: The icon ID used for representing Break Shields
 *
 * Stun Icon: The icon ID used for representing Break Stun
 *
 * Protect Weakness Icon: The icon ID used for representing a protected
 * weakness. Protect Weakness Icon will be drawn on top of lower icon
 *
 * Reduce Animation: The animation ID used for the moment an enemy's Break
 * Shields is reduced. Use 0 for no animation.
 *
 * Break Animation: The animation ID used for the moment an enemy's Break
 * Shields reach 0. Use 0 for no animation.
 *
 * Icon Font Size: The font size of the text used to display the shields left
 * or duration of the turn.
 *
 * Show Actor Shields: Show the actor shields next to their name in the
 * status window?
 *
 * Show Enemy Shields: Show the enemy shields next to their name in the
 * target window?
 * 
 *
 *
 * --------
 * Notetags
 * --------
 *
 * Skills and Items Notetags:
 * 
 * <Break Reduce: x>
 * Reduces the target's Break Shield by x if this action hits a weakness.
 * If you do not use this notetag, x will be the default value found in
 * the plugin's parameters.
 *
 * <Change Break Shield: x>
 * This will change the target battler's Break Shield value to x if the
 * battler isn't currently stunned. No effect if you don't use this notetag.
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 * This will either increase the target battler's break shield by x or
 * decrease the target battler's break shield by x. Happens after the
 * Change Break Shield notetag. No effect if you don't use this notetag.
 *
 *
 *
 * Actor, Class, and Enemy Notetags:
 * 
 * <Break Shields: x>
 * x is the base number of Break Shields the battler starts with.
 * If you do not use this notetag, x will be the default value found in
 * the plugin's parameters.
 *
 *
 *
 * Class, Weapon, Armor, and State Notetags:
 * 
 * <Break Shields: +x>
 * <Break Shields: -x>
 * x is the increased/decreased amount of Break Shields applied to how
 * much the battler will start with. If you do not use this notetag,
 * then no extra Break Shields will be added.
 *
 * <Protect Element: x>
 * <Protect Elements: x, x, x, x, x>
 * x element will be guarded. A maximum of 100% damage will be dealt to
 * the battler if that element is protected. This will also prevent the
 * Break Shields from reducing for that element. Insert more x's to
 * protect more elements.
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
 *
 * Place this plugin under those in the Plugin Manager list.
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
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Break Shield Access
 * @text Access
 * @parent Break Shield System 
 *
 * @param Actor Shields
 * @parent Break Shield Access
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system for actors
 * @default false
 *
 * @param Draw Menu Shields
 * @text Draw In Menus?
 * @parent Actor Shields
 * @type boolean
 * @on On
 * @off Off
 * @desc If enabled, will draw break shields in the menu where states are drawn.
 * @default true
 *
 * @param Enemy Shields
 * @parent Break Shield Access
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system for enemies
 * @default true
 *
 * @param Break Shield Mechanics
 * @text Mechanics
 * @parent Break Shield System 
 *
 * @param Base Shield Value
 * @parent Break Shield Mechanics
 * @type number
 * @min 1
 * @desc The minimum amount of shields a battler can have
 * @default 1
 *
 * @param Break Reduction
 * @parent Break Shield Mechanics
 * @desc The default value of the item or skill when it goes to reduce Break Shield points
 * @default 1
 *
 * @param Element Weakness Rate
 * @parent Break Shield Mechanics
 * @desc The element weakness rate must be greater than this value to break a Break Shield point
 * @default 1.1
 *
 * @param Max Break Shields
 * @parent Break Shield Mechanics
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have
 * @default 99
 *
 * @param Stun State ID
 * @parent Break Shield Mechanics
 * @type state
 * @desc The state ID used for the stun state that is applied when Break Shields reach 0
 * @default 4
 *
 * @param Break Shield Visual
 * @text Visuals
 * @parent Break Shield System 
 *
 * @param Shield Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing Break Shields
 * @default 81
 *
 * @param Stun Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing Break Stun
 * @default 6
 *
 * @param Protect Weakness Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing a protected weakness. Protect Weakness Icon will be drawn on top of lower icon
 * @default 81
 *
 * @param Reduce Animation
 * @parent Break Shield Visual
 * @type animation
 * @desc The animation ID used for the moment an enemy's Break Shields is reduced. Use 0 for no animation.
 * @default 2
 *
 * @param Break Animation
 * @parent Break Shield Visual
 * @type animation
 * @desc The animation ID used for the moment an enemy's Break Shields reach 0. Use 0 for no animation.
 * @default 56
 *
 * @param Icon Font Size
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The font size of the text used to display the shields left or duration of the turn.
 * @default 22
 *
 * @param Show Actor Shields
 * @parent Break Shield Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the actor shields next to their name in the status window?
 * @default true
 *
 * @param Show Enemy Shields
 * @parent Break Shield Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the enemy shields next to their name in the target window?
 * @default true
 *
 * @param
 * @param
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_BreakShieldSystem = true;

var Olivia = Olivia || {};
Olivia.OctoBattle = Olivia.OctoBattle || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<BreakShieldSystem>') })[0].parameters;

Olivia.OctoBattle.BreakShield = {
    Enabled: true,
    // Access
    Actors:   eval(parameters['Actor Shields']),
    DrawMenu: eval(parameters['Draw Menu Shields']),
    Enemies:  eval(parameters['Enemy Shields']),
    // Mechanics
    BaseShields: Number(parameters['Base Shield Value'] || 0),
    BreakReduce: Number(parameters['Break Reduction'] || 1),
    MaxShields:  Number(parameters['Max Break Shields'] || 99),
    StunState:   Number(parameters['Stun State ID'] || 1),
    WeakRate:    Number(parameters['Element Weakness Rate'] || 1.1),
    // Visuals
    ShieldIcon:      Number(parameters['Shield Icon'] || 81),
    StunIcon:        Number(parameters['Stun Icon'] || 6),
    ProtectIcon:     Number(parameters['Protect Weakness Icon'] || 81),
    IconFontSize:    Number(parameters['Icon Font Size'] || 22),
    ReduceAnimation: Number(parameters['Reduce Animation'] || 0),
    BreakAnimation:  Number(parameters['Break Animation'] || 0),
    ShowActorShield: eval(parameters['Show Actor Shields']),
    ShowEnemyShield: eval(parameters['Show Enemy Shields'])
};

Olivia.OctoBattle.Shields = Olivia.OctoBattle.Shields || {};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

Olivia.OctoBattle.Shields.___BattleManager_setup___ = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
  Olivia.OctoBattle.Shields.___BattleManager_setup___.call(this, troopId, canEscape, canLose);
  $gameParty.resetBreakShields();
  $gameTroop.resetBreakShields();
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

Olivia.OctoBattle.Shields.___Game_Action_executeDamage___ = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    Olivia.OctoBattle.Shields.___Game_Action_executeDamage___.call(this, target, value);
    if (!!target && value > 0 && target.isAffectedByBreakShield() && this.isHpEffect()) {
        this.executeBreakShieldReduction(target, value);
    }
};

Game_Action.prototype.executeBreakShieldReduction = function(target, value) {
    if (!target.isBreakStunned()) {
        var rate = this.calcElementRate(target);
        if (rate >= Olivia.OctoBattle.BreakShield.WeakRate) {
            var value = -1 * this.itemBreakShieldReduction();
            target.startBreakShieldReduceAnimation();
            target.alterBreakShield(value);
        }
    }
};

Game_Action.prototype.itemBreakShieldReduction = function() {
    if (this.item().note.match(/<Break (?:Reduce|Reduction): (\d+)>/i)) {
        return parseInt(RegExp.$1);
    } else {
        return Olivia.OctoBattle.BreakShield.BreakReduce;
    }
};

Olivia.OctoBattle.Shields.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.Shields.___Game_Action_applyItemUserEffect___.call(this, target);
    if (!!target && target.isAffectedByBreakShield()) {
        this.applyChangeBreakShield(target);
    }
};

Game_Action.prototype.applyChangeBreakShield = function(target) {
    if (!target.isBreakStunned()) {
        if (this.item().note.match(/<(?:Set|Change) Break (?:Shield|Shields): (\d+)>/i)) {
            target.setBreakShield(parseInt(RegExp.$1));
            $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
        }
        if (this.item().note.match(/<(?:Increase|Decrease|Change) Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
            target.alterBreakShield(parseInt(RegExp.$1));
            $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
        }
    }
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___ = Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
    var rate = Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___.call(this, elementId);
    if (this.getProtectedWeaknessElements().contains(elementId)) {
        return Math.min(1.0, rate);
    } else {
        return rate;
    }
};

Game_BattlerBase.prototype.originalElementRate = function(elementId) {
    return Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___.call(this, elementId);
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Olivia.OctoBattle.Shields.___Game_Battler_removeBattleStates___ = Game_Battler.prototype.removeBattleStates;
Game_Battler.prototype.removeBattleStates = function() {
    Olivia.OctoBattle.Shields.___Game_Battler_removeBattleStates___.call(this);
    this.resetBreakShield();
};

Game_Battler.prototype.resetBreakShield = function() {
    if (this.isAffectedByBreakShield()) {
        this.setBreakShield(this.topBreakShield());
        this.refresh();
    }
};

Game_Battler.prototype.baseBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.BaseShields;
};

Game_Battler.prototype.topBreakShield = function() {
    var shields = this.baseBreakShield();
    shields = this.addedBreakShields(shields);
    return Math.max(1, shields);
};

Game_Battler.prototype.addedBreakShields = function(shields) {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
            shields += parseInt(RegExp.$1);
        }
    }
    return shields;
};

Game_Battler.prototype.currentBreakShield = function() {
    if (this._currentBreakShield === undefined) {
        this.setBreakShield(this.topBreakShield());
    }
    return this._currentBreakShield;
};

Game_Battler.prototype.setBreakShield = function(value) {
    if (this.isAffectedByBreakShield()) {
        this._currentBreakShield = Math.ceil(value);
        this._currentBreakShield = this._currentBreakShield.clamp(0, Olivia.OctoBattle.BreakShield.MaxShields);
        if (this._currentBreakShield <= 0) {
            this.applyBreakStun();
        }
        this.refresh();
    }
};

Game_Battler.prototype.alterBreakShield = function(value) {
    this.setBreakShield(this.currentBreakShield() + value);
};

Game_Battler.prototype.applyBreakStun = function() {
    this.setBreakShield(this.topBreakShield());
    var stateId = Olivia.OctoBattle.BreakShield.StunState;
    this.addState(stateId);
    this.startBreakShieldBrokenAnimation();
};

Game_Battler.prototype.isBreakStunned = function() {
    return this.isStateAffected(Olivia.OctoBattle.BreakShield.StunState);
};

Game_Battler.prototype.startBreakShieldReduceAnimation = function() {
    if (Olivia.OctoBattle.BreakShield.ReduceAnimation) {
        var animationId = Olivia.OctoBattle.BreakShield.ReduceAnimation;
        this.startAnimation(animationId);
    }
};

Game_Battler.prototype.startBreakShieldBrokenAnimation = function() {
    if (Olivia.OctoBattle.BreakShield.BreakAnimation) {
        var animationId = Olivia.OctoBattle.BreakShield.BreakAnimation;
        this.startAnimation(animationId);
    }
};

Game_Battler.prototype.getProtectedWeaknessElements = function() {
    var elements = [];
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            elements = elements.concat(array);
        }
    }
    elements.sort(function(a, b) {
        return a - b;
    });
    return elements;
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Game_Actor.prototype.isAffectedByBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.Actors;
};

Game_Actor.prototype.baseBreakShield = function() {
    var shield = Olivia.OctoBattle.BreakShield.BaseShields;
    if (!!this.currentClass() && this.currentClass().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
        shield = parseInt(RegExp.$1);
    } else if (this.actor() && this.actor().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
        shield = parseInt(RegExp.$1);
    }
    return shield;
};

Game_Actor.prototype.addedBreakShields = function(shields) {
    shields = Game_Battler.prototype.addedBreakShields.call(this, shields);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (!!item && item.note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
            shields += parseInt(RegExp.$1);
        }
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        shields += parseInt(RegExp.$1);
    }
    return shields;
};

Game_Actor.prototype.getProtectedWeaknessElements = function() {
    var elements = Game_Battler.prototype.getProtectedWeaknessElements.call(this);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (!!item && item.note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            elements = elements.concat(array);
        }
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        elements = elements.concat(array);
    }
    elements.sort(function(a, b) {
        return a - b;
    });
    return elements;
};

//-----------------------------------------------------------------------------
// Game_Enemy
//
// The game object class for an enemy.

Game_Enemy.prototype.isAffectedByBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.Enemies;
};

Game_Enemy.prototype.baseBreakShield = function() {
    var shield = Olivia.OctoBattle.BreakShield.BaseShields;
    if (this.enemy() && this.enemy().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
        shield = parseInt(RegExp.$1);
    }
    return shield;
};

//-----------------------------------------------------------------------------
// Game_Unit
//
// The superclass of Game_Party and Game_Troop.

Game_Unit.prototype.resetBreakShields = function() {
    var inBattle = this._inBattle;
    this._inBattle = false;
    var members = this.members();
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (member) {
            member.resetBreakShield();
        }
    }
    this._inBattle = inBattle;
};

//-----------------------------------------------------------------------------
// Window_Base
//
// The superclass of all windows within the game.

Window_Base._iconBreakShield = Olivia.OctoBattle.BreakShield.ShieldIcon;
Window_Base._iconBreakStun   = Olivia.OctoBattle.BreakShield.StunIcon;

Window_Base.prototype.drawBreakShieldIcon = function(target, x, y) {
    if (target.isAffectedByBreakShield()) {
        if (target.isDead() && $dataStates[target.deathStateId()].iconIndex > 0) {
            var icon = $dataStates[target.deathStateId()].iconIndex;
            var text = '';
        } else if (target.isDead()) {
            var icon = 0;
            var text = '';
        } else if (target.isBreakStunned()) {
            var icon = Window_Base._iconBreakStun;
            if (this.showBreakStunDuration()) {
                var text = target._stateTurns[Olivia.OctoBattle.BreakShield.StunState] || 0;
                if (text === 0) {
                    text = '';
                }
            } else {
                var text = '';
            }
        } else {
            var icon = Window_Base._iconBreakShield;
            var text = target.currentBreakShield();
        }
        this.drawIcon(icon, x, y);
        this.contents.fontSize = Olivia.OctoBattle.BreakShield.IconFontSize;
        var outline = this.contents.outlineColor;
        this.contents.outlineColor = 'rgba(0, 0, 0, 1.0)';
        this.drawText(text, x, y, Window_Base._iconWidth, 'center');
        this.resetFontSettings();
        this.contents.outlineColor = outline;
    }
};

Window_Base.prototype.showBreakStunDuration = function() {
    return true;
};

if (Olivia.OctoBattle.BreakShield.Actors && Olivia.OctoBattle.BreakShield.DrawMenu) {

Olivia.OctoBattle.Shields.___Window_Base_drawActorIcons___ = Window_Base.prototype.drawActorIcons;
Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
    if (!$gameParty.inBattle() && !(SceneManager._scene instanceof Scene_Battle)) {
        actor.resetBreakShield();
        this.drawBreakShieldIcon(actor, x, y + 2);
        x += Window_Base._iconWidth;
        width -= Window_Base._iconWidth;
    }
    Olivia.OctoBattle.Shields.___Window_Base_drawActorIcons___.call(this, actor, x, y, width);
};

}

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

if (Olivia.OctoBattle.BreakShield.Actors && Olivia.OctoBattle.BreakShield.ShowActorShield) {

Olivia.OctoBattle.BreakShield.Window_BattleStatus_drawBasicArea = Window_BattleStatus.prototype.drawBasicArea;
Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    if (actor.isAffectedByBreakShield()) {
        this.drawBreakShieldBasic(rect, actor)
        rect.x += Window_Base._iconWidth + 2;
        rect.width -= Window_Base._iconWidth + 2;
    }
    Olivia.OctoBattle.BreakShield.Window_BattleStatus_drawBasicArea.call(this, rect, actor);
};

Window_BattleStatus.prototype.drawBreakShieldBasic = function(rect, actor) {
    this.drawBreakShieldIcon(actor, rect.x, rect.y + 2);
};

}

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.

if (Olivia.OctoBattle.BreakShield.Enemies && Olivia.OctoBattle.BreakShield.ShowEnemyShield) {

Window_BattleEnemy.prototype.drawItem = function(index) {
    this.resetTextColor();
    var name = this._enemies[index].name();
    var rect = this.itemRectForText(index);
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    this.drawBreakShieldIcon(this._enemies[index], x, y + 2);
    x += Window_Base._iconWidth + 2;
    width -= Window_Base._iconWidth + 2;
    this.drawText(name, x, y, width);
};

}


































