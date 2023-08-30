//==========================================================================
// Eli_CustomParameter.js
//==========================================================================

/*:
@plugindesc ♦5.0.1♦ Adds new custom parameters to battlers!
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Plugin Requirements
============================================================================

Order Before Eli_ClassCurves
Order After Eli_EnemyClass

============================================================================
Features
============================================================================

● Add new custom parameters to actors and enemies!
● Manipulate these parameters with note tags and script calls!
● Add buffs, debuffs, and grow effect to these parameters!

============================================================================
How to use
============================================================================

♦ PLUGIN PARAMETERS ♦

Go to the plugin parameter "New parameters" and add as many parameters 
as you want.

ShortName → This will be the one that you will use to reference script 
calls and note tags.
FullName → This will be the full name of the parameters. That can appear 
on battle log etc.
HP/MP/TP type → That will decide if the parameter will work like 
HP/MP/TP.

After that, you can choose the buff and Debuff icon range for these 
parameters.
They work exactly like the default ones. They will get an icon in the 
icon sheet and will follow a range.
With the exception that the range must follow how many custom parameters 
you have added.

The default works like that:

You have 8 default parameters: hp, mp, atk... etc.
The buff icons for these parameters go from the icon index 32 to 48.
This means the index 32 will be the Hp Buff level 1
33 Hp buff level 2. And so on.
The same for Debuff, which takes the icon index 48 to 62.
48 Hp Debuff level 1
49 Hp Debuff level 2. 

So you have to follow the same logic for the Buff and Debuff icon for 
these new parameters.

♦ NOTE TAGS ♦

You can use the following note tags on the item and skill note fields to 
add effects to the new parameters:

<AddCBuff: paramId/shortName:turns >
<RemoveCBuff: paramId/shortName >

<AddCDebuff: paramId/shortName:turns >
<RemoveCDebuff: paramId/shortName >

<GrowC:paramId/shortName:value >

If you want to add more than one parameter, separate each one with a 
comma ",".

To add new parameter changes for the equipment/class/enemies, you can use 
the following note tag on the weapon, armor, class, or enemy note fields:
(Enemy note field only works for enemy without classes, in case 
you are using Eli Enemy Classes)

<CParams:paramId/shortName:value, paramId/shortName:value>

You can either use the paramId or the shortName of the new parameters. 
The id will start at 0. This means that the new parameter id 0 will 
be the first one you have created.

Example:
<CParams: crm:23, 1:37> → Will add 23 to the crm parameter, and 37 
for the new parameter id 1.

Optionally, you can also use the plugin parameter templates for that:
<CParams: TemplateName>

For both ways, if you don't set a specific parameter, it will be 
equal to 0.

         ***ATTENTION! All notes are case sensitive!***

♦ SCRIPT CALLS ♦

You can use them with actors or enemies:
$gameActors.actor(ID).[script call] => For actors.
$gameParty.members()[index].[script call] =>  For Party Members.
$gameTroop.members()[index].[script call] => For Enemies.

.cparamBase(paramId)
.cparamPlus(paramId)
.cparam(paramId)
.addCParam(paramId, value)

Example:

$gameParty.members()[0].cparam(0) => Will return the value of the first 
Custom Parameter.

You can also reference them using the object name directly, which is the 
short name:
$gameParty.members()[0].crm => Will return the crm(charm) value

For those parameters that work like HP/MP/TP, you will reference the 
current value of them with the script calls above.

But to get the max value, you can use the prefix "max" before the 
shortname:
$gameParty.members()[0].maxrep

To change the current parameter value, like changing the hp and not the 
mhp, you can use the following:

$gameParty.members()[0].changeCustomHpParam(paramId/shortName, value)

To set a value, you can use the below:
$gameParty.members()[0].setCustomHpParam(paramId/shortName, value)

You can do the same for the custom parameters that are not hp/mp/tp type:

$gameParty.members()[0].setCustomParam(paramId/shortName, value)

This one, instead of add or remove a value, it will set a value for the 
custom parameter.

NOTE¹: The recover all event command will also recover the custom 
parameters that are HP like.

NOTE²: If you are using MZ, you can use the plugin commands.

============================================================================
Update Log
============================================================================

https://tinyurl.com/customParameter

============================================================================

@param list
@text New parameters
@type struct<stCustomParam>[]
@desc Set here all your custom parameters.
@default ["{\"shortName\":\"per\",\"name\":\"Perception\",\"isHp\":\"false\"}","{\"shortName\":\"crm\",\"name\":\"Charm\",\"isHp\":\"false\"}","{\"shortName\":\"wis\",\"name\":\"Wisdom\",\"isHp\":\"false\"}","{\"shortName\":\"rep\",\"name\":\"Reputation\",\"isHp\":\"true\"}"]

@param templates
@text Templates
@type struct<templateST>[]
@desc Set here all your custom parameters.
@default ["{\"name\":\"TemplateExample\",\"list\":\"[\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"rep\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"7\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"3\\\\\\\"}\\\"]\"}"]

@param buffIcon
@text Buff Icon
@type text
@desc Select the start icon index for buff.
Press right click and select Iconset viewer.
@default 32

@param debuffIcon
@text Debuff Icon
@type text
@desc Select the start icon index for debuff.
Press right click and select Iconset viewer.
@default 48

*/

/* ------------------------------ CUSTOM PARAM ------------------------------ */
{
/*~struct~stCustomParam:

@param shortName
@text Short Name
@type text
@desc The short name to be used as an object on the battlers and referenced in script calls.
@default per

@param name
@text Full Name
@type text
@desc The full name to show in menus.
@default Perception

@param isHp
@text Is HP/MP/TP type
@type boolean
@desc If true, this parameter will work like HP/MP/TP that will have a max and current value.
@default false

*/
}

/* --------------------------- CHANGE CUSTOM PARAM -------------------------- */
{
/*~struct~changeCustomParamSt:

@param id
@text Custom Param Id
@type text
@desc The custom parameter Id(or short name) to change
@default 0

@param value
@text Value to remove or add
@type text
@desc The value to remove or add.
Use \v[id] to reference a variable value.
@default 0

@param battlerType
@text The battler type
@type select
@option actor
@option party
@option enemy
@option troop
@desc The enemy/troop only work on battle. 
Actor/Enemy = battler Id || Party/Troop = Member Index
@default party

@param battlerId
@text The battler Id
@type text
@desc The index position of the party/troop(id for Enemy/Actor). Separate each one with a comma. Use -1 for all.
@default 1

*/
}

/* -------------------------------- TEMPLATE -------------------------------- */
{
/*~struct~templateST:

@param name
@text Template name
@type text
@desc The template to set on the class note field.
@default 0

@param list
@text Custom Parameters
@type struct<templateValueST>[]
@desc The list of custom parameters to add to the class/weapon/armor.
@default []

*/
}

/* ----------------------- CUSTOM PARAM VALUE TEMPLATE ---------------------- */
{
/*~struct~templateValueST:

@param id
@text Custom Param Id
@type text
@desc The custom parameter Id(or short name) to change
@default 0

@param value
@text Value to remove or add
@type number
@desc The value that this custom parameter will have.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CustomParameter = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.CustomParameter = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-custom-parameters-for-rpg-maker",
    parameters: {
        list: [ {shortName: '', name:'', isHp: false} ],
        templates: [ {name: '', list: [{id: 0, value: 0}]} ],
        buffIcon: 0,
        debuffIcon: 0,

    },
    alias: {},
    hpTypeParams: [],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.createParamPropertyOnBattlers()
        this.createHpTypeParams()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = ['changeParam', 'changeHpParam']
        Eli.PluginManager.registerCommands(this, commands)
    },

    createHpTypeParams(){
        for(const param of this.parameters.list){
            if(param.isHp){
                this.hpTypeParams.push(`_${param.shortName}`)
            }
        }
    },

    param(){
        return this.parameters
    },

    findCParamId(cparam){
        if(isNaN(cparam)){
            cparam = Eli.String.removeSpaces(cparam)
            cparam = this.parameters.list.findIndex(item => 
                item.name.includes(cparam) ||
                item.shortName.includes(cparam)
            )
        }

        return Number(cparam)
    },

    createParamPropertyOnBattlers(){
        const addToBattler = (param, id) => {
            if(param.isHp){
                const maxName = `max${param.shortName}`
                this.addParameterToBattler(param.shortName, id, maxName)
            }else{
                this.addParameterToBattler(param.shortName, id)
            }
        }
        this.parameters.list.forEach(addToBattler)
    },

    getShortName(id){
        return this.parameters.list[id].shortName
    },

    getFullName(id){
        return this.parameters.list[id].name
    },

    isHpType(id){
        return this.parameters.list[id].isHp
    },

    getMaxName(id){
        return `max${this.parameters.list[id].shortName}`
    },

    get_name(id){
        return `_${this.parameters.list[id].shortName}`
    },

    addParameterToBattler(name, id, maxName){
        if(maxName){
            Object.defineProperties(Game_BattlerBase.prototype, {
                [maxName]: { get: function() { return this.cparam(id); }, configurable: true },
                [name]: { get: function() { return this[`_${name}`] }, configurable: true },
            })
        }else{
            Object.defineProperties(Game_BattlerBase.prototype, {
                [name]: { get: function() { return this.cparam(id); }, configurable: true },
            })
        }

    },

    list(){
        return this.parameters.list
    },

    cParamsLength(){
        return this.parameters.list.length
    },

    getBattlerId(battlerId){
        if(battlerId.includes(",")){
            return battlerId.split(",").map(item => Number(item))
        }else{
            return [Number(battlerId)]
        }
    },

    getParsedArgsForChangeParam(args){
        let {battlerType, battlerId, id, value} = args
        battlerId = this.getBattlerId(battlerId)
        value = Number(Eli.Utils.convertEscapeVariablesOnly(value))
        id = this.findCParamId(id)

        return [battlerType, battlerId, id, value]
    },

    changeParam(args){
        var addParam = () => {}
        const [battlerType, battlerId, id, value] = this.getParsedArgsForChangeParam(args)
    
        if(battlerId[0] === -1){
            this.changeParamForAll(battlerType, value, id)
        }else{
            const isBattleScene = SceneManager._scene instanceof Scene_Battle

            if(battlerType === "troop" && isBattleScene){
                var addParam = memberIndex => {
                    $gameTroop.members()[memberIndex].addCParam(id, value)
                }
    
            }else if(battlerType === "party"){
                var addParam = memberIndex => {
                    $gameParty.members()[memberIndex].addCParam(id, value)
                }
    
            }else if(battlerType === "actor"){
                var addParam = actorId => {
                    const getActor = member => member.actorId() === actorId
                    const member = $gameParty.members().find(getActor)
    
                    if(member){
                        member.addCParam(id, value)
                    }
                }
    
            }else if(battlerType === "enemy" && isBattleScene){
                var addParam = enemyId => {
                    const getEnemy = member => member.enemyId() === enemyId
                    const member = $gameTroop.members().find(getEnemy)
    
                    if(member){
                        member.addCParam(id, value)
                    }
                }
            }
            battlerId.forEach(addParam) 
        }   
    },

    changeParamForAll(battlerType, value, id){
        const isBattleScene = SceneManager._scene instanceof Scene_Battle
        if(battlerType === "party" || battlerType === "actor"){
            $gameParty.members().forEach(member => {
                member.addCParam(id, value)
            })
        }else if(isBattleScene){
            $gameTroop.members().forEach(member => {
                member.addCParam(id, value)
            })
        }
    },

    changeHpParam(args){
        var addParam = () => {}
        const isBattleScene = SceneManager._scene instanceof Scene_Battle
        const [battlerType, battlerId, id, value] = this.getParsedArgsForChangeParam(args)
        const _param = this.get_name(id)
        
        if(battlerId[0] === -1){
            this.changeHpParamForAll(battlerType, value, id, _param)
        }else{
            if(battlerType === "troop" && isBattleScene){
                var addParam = memberIndex => {
                    const member = $gameTroop.members()[memberIndex]
                    member.changeCustomHpParam(id, value)
                }
    
            }else if(battlerType === "party"){
                var addParam = memberIndex => {
                    const member = $gameParty.members()[memberIndex]
                    member.changeCustomHpParam(id, value)
                }
    
            }else if(battlerType === "actor"){
                var addParam = actorId => {
                    const getActor = member => member.actorId() === actorId
                    const member = $gameParty.members().find(getActor)
    
                    if(member){
                        member.changeCustomHpParam(id, value)
                    }
                }
    
            }else if(battlerType === "enemy" && isBattleScene){
                var addParam = enemyId => {
                    const getEnemy = member => member.enemyId() === enemyId
                    const member = $gameTroop.members().find(getEnemy)
    
                    if(member){
                        member.changeCustomHpParam(id, value)
                    }
                }
            }
            battlerId.forEach(addParam) 
        }
        
    },

    changeHpParamForAll(battlerType, value, id, _param){
        const isBattleScene = SceneManager._scene instanceof Scene_Battle

        if(battlerType === "party" || battlerType === "actor"){
            $gameParty.members().forEach(member => {
                member.changeCustomHpParam(id, value)
            })

        }else if(isBattleScene){
            $gameTroop.members().forEach(member => {
                member.changeCustomHpParam(id, value)
            })
        }
    },

}

const Plugin = Eli.CustomParameter
const Alias = Eli.CustomParameter.alias

Plugin.initialize()

/* ------------------------------ DATA MANAGER ------------------------------ */
{

Alias.DataManager_extractMetadata = DataManager.extractMetadata
DataManager.extractMetadata = function(data) {
    Alias.DataManager_extractMetadata.call(this, data)
    this.addMetaEffects(data)
    this.addCParameterChanges(data)
}

DataManager.addMetaEffects = function(data){
    const isItemOrSkill = Eli.Utils.isDataItem(data) || Eli.Utils.isDataSkills(data)

    if(isItemOrSkill){

        if(data.meta.AddCBuff){
            this.addCBuffEffect(data)
        }

        if(data.meta.AddCDebuff){
            this.addCDebuffEffect(data)
        }

        if(data.meta.RemoveCBuff){
            this.removeCBuffEffect(data)
        }

        if(data.meta.RemoveCDebuff){
            this.removeCDebuffEffect(data)
        }

        if(data.meta.GrowC){
            this.addGrowC(data)
        }

    }
}

DataManager.addCBuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.AddCBuff).split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Plugin.findCParamId(cparamId)
        const cEffect = {code: 100, dataId: cparamId, value1: Number(value), value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.addCDebuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.AddCDebuff).split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Plugin.findCParamId(cparamId)
        const cEffect = {code: 101, dataId: cparamId, value1: Number(value), value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.removeCBuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.RemoveCBuff).split(",").forEach(item => {
        const cparamId = Plugin.findCParamId(item)
        const cEffect = {code: 102, dataId: cparamId, value1: 1, value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.removeCDebuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.RemoveCDebuff).split(",").forEach(item => {
        const cparamId = Plugin.findCParamId(item)
        const cEffect = {code: 103, dataId: cparamId, value1: 1, value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.addGrowC = function(data){
    Eli.String.removeSpaces(data.meta.GrowC).split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Plugin.findCParamId(cparamId)
        const cEffect = {code: 104, dataId: cparamId, value1: +value, value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.addCParameterChanges = function(data){
    const isValidData = Eli.Utils.isDataWeapon(data) || Eli.Utils.isDataArmor(data) || 
                        Eli.Utils.isDataClass(data) || Eli.Utils.isDataEnemy(data)

    if(isValidData){
        data.cparams = new Array(Plugin.cParamsLength()).fill(0)

        if(data.meta.hasOwnProperty("CParams")){

            if(data.meta.CParams.includes(":")){
                this.parseCParamNotesByString(data)
            }else{
                this.parseCParamNotesByTemplate(data)
            }

        }
    }
}

DataManager.parseCParamNotesByString = function(data){
    const customParameters = data.meta.CParams.split(",")

    for(const cparam of customParameters){
        let [id, value] = cparam.split(":")
        id = Plugin.findCParamId(id)
        data.cparams[Number(id)] = Number(value)
    }
}

DataManager.parseCParamNotesByTemplate = function(data){
    const templateName = Eli.String.removeSpaces(data.meta.CParams)
    const customParameters = Plugin.param().templates.find(item => item.name === templateName).list

    for(const cparam of customParameters){
        let {id, value} = cparam
        id = Plugin.findCParamId(id)
        data.cparams[Number(id)] = Number(value)
    }
}

}

/* ------------------------------- GAME ACTION ------------------------------ */
{

Game_Action.EFFECT_ADD_CBUFF        = 100
Game_Action.EFFECT_ADD_CDEBUFF      = 101
Game_Action.EFFECT_REMOVE_CBUFF     = 102
Game_Action.EFFECT_REMOVE_CDEBUFF   = 103
Game_Action.EFFECT_GROWC            = 104

Alias.Game_Action_testItemEffect = Game_Action.prototype.testItemEffect
Game_Action.prototype.testItemEffect = function(target, effect) {
    const alias = Alias.Game_Action_testItemEffect.call(this, target, effect)
    const effectc = this.testItemEffectC(target, effect)

    return effectc || alias
}

Alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect
Game_Action.prototype.applyItemEffect = function(target, effect) {
    Alias.Game_Action_applyItemEffect.call(this, target, effect)
    this.applyItemEffectC(target, effect)
}

Game_Action.prototype.testItemEffectC = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_ADD_CBUFF:
            return !target.isMaxCBuffAffected(effect.dataId)

        case Game_Action.EFFECT_ADD_CDEBUFF:
            return !target.isMaxCDebuffAffected(effect.dataId)

        case Game_Action.EFFECT_REMOVE_CBUFF:
            return target.isCBuffAffected(effect.dataId)

        case Game_Action.EFFECT_REMOVE_CDEBUFF:
            return target.isCDebuffAffected(effect.dataId)
    }
}

Game_Action.prototype.applyItemEffectC = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_ADD_CBUFF:
            this.itemEffectAddCBuff(target, effect)
            break
        case Game_Action.EFFECT_ADD_CDEBUFF:
            this.itemEffectAddCDebuff(target, effect)
            break
        case Game_Action.EFFECT_REMOVE_CBUFF:
            this.itemEffectRemoveCBuff(target, effect)
            break
        case Game_Action.EFFECT_REMOVE_CDEBUFF:
            this.itemEffectRemoveCDebuff(target, effect)
            break
        case Game_Action.EFFECT_GROWC:
            this.itemEffectGrowC(target, effect)
            break
        }
}

Game_Action.prototype.itemEffectAddCBuff = function(target, effect) {
    target.addCBuff(effect.dataId, effect.value1)
    this.makeSuccess(target)
}

Game_Action.prototype.itemEffectAddCDebuff = function(target, effect) {
    const chance = target.cdebuffRate(effect.dataId) * this.lukEffectRate(target)
    if (Math.random() < chance) {
        target.addCDebuff(effect.dataId, effect.value1)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectRemoveCBuff = function(target, effect) {
    if (target.isCBuffAffected(effect.dataId)) {
        target.removeCBuff(effect.dataId)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectRemoveCDebuff = function(target, effect) {
    if (target.isCDebuffAffected(effect.dataId)) {
        target.removeCBuff(effect.dataId)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectGrowC = function(target, effect) {
    target.addCParam(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

}

/* --------------------------- GAME ACTION RESULT --------------------------- */
{

Alias.Game_ActionResult_clear = Game_ActionResult.prototype.clear
Game_ActionResult.prototype.clear = function() {
    Alias.Game_ActionResult_clear.call(this)
    this.clearCBuffsAndDebuffs()
}

Alias.Game_ActionResult_isStatusAffected = Game_ActionResult.prototype.isStatusAffected;
Game_ActionResult.prototype.isStatusAffected = function() {
    const alias = Alias.Game_ActionResult_isStatusAffected
    const cStatus = this.addedCBuffs.length > 0 ||
                    this.addedCDebuffs.length > 0 ||
                    this.removedCBuffs.length > 0

    return alias || cStatus

}

Game_ActionResult.prototype.clearCBuffsAndDebuffs = function() {
    this.addedCBuffs = []
    this.addedCDebuffs = []
    this.removedCBuffs = []
}
  
Game_ActionResult.prototype.isCBuffAdded = function(paramId) {
    return this.addedCBuffs.includes(paramId)
}

Game_ActionResult.prototype.pushAddedCBuff = function(paramId) {
    if (!this.isCBuffAdded(paramId)) {
        this.addedCBuffs.push(paramId)
    }
}

Game_ActionResult.prototype.isCDebuffAdded = function(paramId) {
    return this.addedCDebuffs.includes(paramId)
}

Game_ActionResult.prototype.pushAddedCDebuff = function(paramId) {
    if (!this.isCDebuffAdded(paramId)) {
        this.addedCDebuffs.push(paramId)
    }
}

Game_ActionResult.prototype.isCBuffRemoved = function(paramId) {
    return this.removedCBuffs.includes(paramId)
}

Game_ActionResult.prototype.pushRemovedCBuff = function(paramId) {
    if (!this.isCBuffRemoved(paramId)) {
        this.removedCBuffs.push(paramId)
    }
}

}

/* ---------------------------- GAME BATTLER BASE --------------------------- */
{

Game_BattlerBase.ICON_CBUFF_START       = Plugin.param().buffIcon
Game_BattlerBase.ICON_CDEBUFF_START     = Plugin.param().debuffIcon
Game_BattlerBase.TRAIT_CPARAM           = 100
Game_BattlerBase.TRAIT_CDEBUFF_RATE     = 101

Alias.Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize
Game_BattlerBase.prototype.initialize = function() {
    this.initNewParameters()
    Alias.Game_BattlerBase_initialize.call(this)
    this.initCustomHpMpParameters()
}

Alias.Game_BattlerBase_clearParamPlus = Game_BattlerBase.prototype.clearParamPlus
Game_BattlerBase.prototype.clearParamPlus = function() {
    Alias.Game_BattlerBase_clearParamPlus.call(this)
    this.clearCParamPlus()
}

Alias.Game_BattlerBase_clearBuffs = Game_BattlerBase.prototype.clearBuffs
Game_BattlerBase.prototype.clearBuffs = function() {
    Alias.Game_BattlerBase_clearBuffs.call(this)
    this.clearCBuffs()
}

Alias.Game_BattlerBase_updateBuffTurns = Game_BattlerBase.prototype.updateBuffTurns;
Game_BattlerBase.prototype.updateBuffTurns = function() {
    Alias.Game_BattlerBase_updateBuffTurns.call(this);
    this.updateCBuffTurns();
}

Alias.Game_BattlerBase_allIcons = Game_BattlerBase.prototype.allIcons;
Game_BattlerBase.prototype.allIcons = function() {
    const allIcons = Alias.Game_BattlerBase_allIcons.call(this)
    return allIcons.concat(this.cbuffIcons())
}

Alias.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function() {
    Alias.Game_BattlerBase_refresh.call(this)
    this.refreshAllCustomParameters()
}

Alias.Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll
Game_BattlerBase.prototype.recoverAll = function() {
    Alias.Game_BattlerBase_recoverAll.call(this)
    this.recoverAllCustomParameters()
}

Game_BattlerBase.prototype.initCustomHpMpParameters = function(){
    const list = Plugin.param().list
    list.forEach(param => {
        if(param.isHp){
            this[`_${param.shortName}`] = 0
        }
    })
}

Game_BattlerBase.prototype.initNewParameters = function(){
    const length = Plugin.cParamsLength()

    this._cparamPlus = new Array(length)
    this._cbuffs = new Array(length)
    this._cbuffTurns = new Array(length)
}

Game_BattlerBase.prototype.clearCParamPlus = function() {
    this._cparamPlus.fill(0)
}

Game_BattlerBase.prototype.clearCBuffs = function() {
    this._cbuffs.fill(0)
    this._cbuffTurns.fill(0)
}

Game_BattlerBase.prototype.eraseCBuff = function(paramId){
    this._cbuffs[paramId] = 0
    this._cbuffTurns[paramId] = 0
}

Game_BattlerBase.prototype.cbuffLength = function() {
    return this._cbuffs.length
}

Game_BattlerBase.prototype.cbuff = function(paramId) {
    return this._cbuffs[paramId]
}

Game_BattlerBase.prototype.isCBuffAffected = function(paramId) {
    return this._cbuffs[paramId] > 0
}

Game_BattlerBase.prototype.isCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] < 0
}

Game_BattlerBase.prototype.isCBuffOrCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] !== 0
}

Game_BattlerBase.prototype.isMaxCBuffAffected = function(paramId) {
    return this._cbuffs[paramId] === 2
}

Game_BattlerBase.prototype.isMaxCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] === -2
}

Game_BattlerBase.prototype.increaseCBuff = function(paramId) {
    if (!this.isMaxCBuffAffected(paramId)) {
        this._cbuffs[paramId]++
    }
}

Game_BattlerBase.prototype.decreaseCBuff = function(paramId) {
    if (!this.isMaxCDebuffAffected(paramId)) {
        this._cbuffs[paramId]--
    }
}

Game_BattlerBase.prototype.overwriteCBuffTurns = function(paramId, turns) {
    if (this._cbuffTurns[paramId] < turns) {
        this._cbuffTurns[paramId] = turns
    }
}

Game_BattlerBase.prototype.isCBuffExpired = function(paramId) {
    return this._cbuffTurns[paramId] === 0
}

Game_BattlerBase.prototype.updateCBuffTurns = function() {
    for (let i = 0, l = this._cbuffTurns.length; i < l; i++) {
        if (this._cbuffTurns[i] > 0) {
            this._cbuffTurns[i]--
        }
    }
}

Game_BattlerBase.prototype.cbuffIcons = function() {
    const icons = [];
    for (let i = 0, l = this.cbuffLength(); i < l; i++) {
        if (this._cbuffs[i] !== 0) {
            icons.push(this.cbuffIconIndex(this._cbuffs[i], i))
        }
    }
    return icons
}

Game_BattlerBase.prototype.cbuffIconIndex = function(buffLevel, paramId) {
    const maxParams = Plugin.cParamsLength();
    if (buffLevel > 0) {
        return Game_BattlerBase.ICON_CBUFF_START + (buffLevel - 1) * maxParams + paramId
    } else if (buffLevel < 0) {
        return Game_BattlerBase.ICON_CDEBUFF_START + (-buffLevel - 1) * maxParams + paramId
    } else {
        return 0
    }
}

Game_BattlerBase.prototype.cparamBase = function(paramId) {
    return 0
}

Game_BattlerBase.prototype.cparamPlus = function(paramId) {
    return this._cparamPlus[paramId]
}

Game_BattlerBase.prototype.cparamBuffRate = function(paramId) {
    return this._cbuffs[paramId] * 0.25 + 1.0
}

Game_BattlerBase.prototype.cdebuffRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_CDEBUFF_RATE, paramId)
}

Game_BattlerBase.prototype.cparamRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_CPARAM, paramId)
}

Game_BattlerBase.prototype.cparam = function(paramId) {
    let value = this.cparamBase(paramId) + this.cparamPlus(paramId)
    value *= this.cparamRate(paramId) * this.cparamBuffRate(paramId)
    const result = Math.round( Math.max(0, value) )
    return result
}

Game_BattlerBase.prototype.addCParam = function(paramId, value) {
    paramId = Plugin.findCParamId(paramId)
    this._cparamPlus[paramId] += value
}

Game_BattlerBase.prototype.setCustomHpParam = function(paramId, value, isChanging) {
    paramId = Plugin.findCParamId(paramId)

    if(Plugin.isHpType(paramId)){
        const oldValue = isChanging ? this.cparam(paramId) : 0
        const _name = Plugin.get_name(paramId)
        this[_name] = oldValue + value
        this.refreshCustomParameter(_name)
    }
}

Game_BattlerBase.prototype.changeCustomHpParam = function(paramId, value) {
    this.setCustomHpParam(paramId, value, true)
}

Game_BattlerBase.prototype.setCustomParam = function(paramId, targetValue) {
    paramId = Plugin.findCParamId(paramId)
    const currentValue = this.cparam(paramId)
    const finalValue = targetValue - currentValue

    this.addCParam(paramId, finalValue)
}

Game_BattlerBase.prototype.changeCustomParam = function(paramId, value) {
    this.setCustomParam(paramId, value, true)
}

Game_BattlerBase.prototype.refreshCustomParameter = function(_paramName){
    const maxName = `max${_paramName.substring(1)}`
    this[_paramName] = this[_paramName].clamp(0, this[maxName])
}

Game_BattlerBase.prototype.refreshAllCustomParameters = function(){
    Plugin.hpTypeParams.forEach(this.refreshCustomParameter.bind(this))
}

Game_BattlerBase.prototype.recoverCustomParameter = function(paramId) {
    paramId = Plugin.findCParamId(paramId)

    if(Plugin.isHpType(paramId)){
        const _name = Plugin.get_name(paramId)
        const maxName = Plugin.getMaxName(paramId)
        this[_name] = this[maxName]
    }
}

Game_BattlerBase.prototype.recoverAllCustomParameters = function() {
    const cparamNames = Plugin.param().list.map(item => item.shortName)
    cparamNames.forEach(this.recoverCustomParameter.bind(this))
}

}

/* ------------------------------ GAME BATTLER ------------------------------ */
{

Alias.Game_Battler_removeAllBuffs = Game_Battler.prototype.removeAllBuffs
Game_Battler.prototype.removeAllBuffs = function() {
    Alias.Game_Battler_removeAllBuffs.call(this)
    this.removeAllCBuffs()
}

Alias.Game_Battler_removeBuffsAuto = Game_Battler.prototype.removeBuffsAuto
Game_Battler.prototype.removeBuffsAuto = function() {
    Alias.Game_Battler_removeBuffsAuto.call(this)
    this.removeCBuffsAuto()
}

Game_Battler.prototype.addCBuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.increaseCBuff(paramId)
        if (this.isCBuffAffected(paramId)) {
            this.overwriteCBuffTurns(paramId, turns)
        }
        this._result.pushAddedCBuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.addCDebuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.decreaseCBuff(paramId);
        if (this.isCDebuffAffected(paramId)) {
            this.overwriteCBuffTurns(paramId, turns)
        }
        this._result.pushAddedCDebuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.removeCBuff = function(paramId) {
    if (this.isAlive() && this.isCBuffOrCDebuffAffected(paramId)) {
        this.eraseCBuff(paramId)
        this._result.pushRemovedCBuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.removeAllCBuffs = function() {
    for (var i = 0, l = this.cbuffLength(); i < l; i++) {
        this.removeCBuff(i)
    }
}

Game_Battler.prototype.removeCBuffsAuto = function() {
    for (var i = 0, l = this.cbuffLength(); i < l; i++) {
        if (this.isCBuffExpired(i)) {
            this.removeCBuff(i)
        }
    }
}

}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Game_Actor.prototype.cparamBase = function(paramId) {
    return this.currentClass().cparams[paramId]
}

Game_Actor.prototype.cparamPlus = function(paramId) {
    let value = Game_Battler.prototype.cparamPlus.call(this, paramId)

    for(const equip of this.equips()){
        if(equip){
            value += equip.cparams[paramId]
        }
    }

    return value
}

}

/* ------------------------------- GAME ENEMY ------------------------------- */

if(Imported.Eli_EnemyClass){

Alias.Game_Enemy_cparamBase = Game_Enemy.prototype.cparamBase
Game_Enemy.prototype.cparamBase = function(paramId) {
    if(this._classId > 0){
        return this.getCParamBaseFromClass(paramId)
    }else{
        return Alias.Game_Enemy_cparamBase.call(this, paramId)
    }
}

Game_Enemy.prototype.getCParamBaseFromClass = function(paramId) {
    return this.currentClass().cparams[paramId][this._level]
}

Game_Enemy.prototype.getCParamPlusFromEquip = function(paramId){
    let value = 0

    for(const equip of this.equips()){
        if(equip){
            value += equip.cparams[paramId]
        }
    }

    return value
}

Game_Enemy.prototype.cparamPlus = function(paramId) {
    let value = Game_Battler.prototype.cparamPlus.call(this, paramId)

    if(this._classId > 0){
        value += this.getCParamPlusFromEquip(paramId)
    }

    return value
}

}else{ // If not imported Eli Enemy Class...

Game_Enemy.prototype.cparamBase = function(paramId) {
    return this.enemy().cparams[paramId] || 0
}

}

/* ---------------------------- WINDOW BATTLE LOG --------------------------- */
{

Alias.Window_BattleLog_displayChangedBuffs = Window_BattleLog.prototype.displayChangedBuffs
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
    Alias.Window_BattleLog_displayChangedBuffs.call(this, target)
    this.displayChangedCBuffs(target)
}

Window_BattleLog.prototype.displayChangedCBuffs = function(target) {
    const result = target.result();
    this.displayCBuffs(target, result.addedCBuffs, TextManager.buffAdd)
    this.displayCBuffs(target, result.addedCDebuffs, TextManager.debuffAdd)
    this.displayCBuffs(target, result.removedCBuffs, TextManager.buffRemove)
}

Window_BattleLog.prototype.displayCBuffs = function(target, buffs, fmt) {
    for (const paramId of buffs) {
        const text = fmt.format(target.name(), Plugin.list()[paramId][1])
        this.push("popBaseLine")
        this.push("pushBaseLine")
        this.push("addText", text)
    }
}

}

}