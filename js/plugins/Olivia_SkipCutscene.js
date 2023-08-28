//=============================================================================
// Olivia Engine - Skip Cutscene - for RPG Maker MV version 1.6.1
// Olivia_SkipCutscene.js
//=============================================================================
 /*:
 * @plugindesc <SkipCutscene> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that provides the functionality to skip ahead
 * in a cutscene. This is a quality of life addition for players that may have
 * played a certain scene already and would like to skip ahead. The player would
 * hold the cancel button (X on the keyboard or Right Click on the mouse) if the
 * ability to skip the cutscene is available. By holding it until the skip gauge
 * is full, the scene skips forward to the next available section.
 *
 * 
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Hold Duration: Duration in frames to hold Cancel button to skip a cutscene
 *
 * Filling Speed: Speed used while filling up the skip gauge
 *
 * Emptying Speed: Speed used while emptying out the skip gauge
 *
 * Skip Text: Text displayed for the skip gauge. You can use text codes here.
 *
 * Gauge Colors: Gauge colors used for the gradients. These use hex color codes.
 *
 * Gauge Position: X and Y positions for where the gauge would appear. You can
 * use 'auto' to have the plugin automatically calculate it for you, or you can
 * use JS code to determine the position yourself. Exact numbers are also fine.
 *
 * Fade Speed: How fast the skip gauge would fade out.
 *
 * 
 * 
 * ------------------------
 * Instructions: Label Tags
 * ------------------------
 * 
 * Not all scenes are skippable from the start. They need to be set up in a 
 * certain way for it to properly work. The setup involves Labels and require a
 * specific naming convention for the labels to allow skipping cutscenes.
 *
 * Label Tags:
 *
 * <Enable Skip>
 * - Once the scene has passed a label named <Enable Skip> the player will be
 * able to hold down the Cancel Button (X on the keyboard or Right Click on the
 * mouse) and skip forward to the next available <Skip Target> Label.
 *
 * <Disable Skip>
 * - If the scene has passed a label named <Disable Skip> then skipping the
 * cutscene will no longer become available for the player.
 *
 * <Skip Target>
 * - If the player decides to skip forward, then the screen will fade out. After
 * that, the scene will skip to the next available <Skip Target> label. You will
 * have to manually fade the screen back in afterwards.
 *
 * These labels cannot be used in tandem with parallel events. Parallel events
 * cannot have cutscene skipping capability.
 *
 *
 * 
 * --------
 * Examples
 * --------
 *
 * I highly recommend that you take a look at the sample project that could be
 * downloaded with this plugin on how to use it. It will teach you many core
 * basics on how to properly create your cutscene events to be usable with the
 * Skip Cutscene function.
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
 * @param Hold Duration
 * @type number
 * @min 1
 * @desc Duration in frames to hold Cancel button to skip a cutscene
 * @default 180
 *
 * @param
 *
 * @param Filling Speed
 * @type number
 * @min 1
 * @desc Speed used while filling up the skip gauge
 * @default 1
 *
 * @param Emptying Speed
 * @type number
 * @min 1
 * @desc Speed used while emptying out the skip gauge
 * @default 4
 *
 * @param
 *
 * @param Skip Text
 * @desc Text displayed for the skip gauge. You can use text codes here.
 * @default Hold \c[27]X\c[0] to skip cutscene
 *
 * @param
 * 
 * @param Gauge Color 1
 * @desc Gauge color used for the left half of the gauge gradient
 * This is a hex color code
 * @default #8781bd
 * 
 * @param Gauge Color 2
 * @desc Gauge color used for the right half of the gauge gradient
 * This is a hex color code
 * @default #bd8cbf
 *
 * @param Gauge Position X
 * @desc X position for the gauge.
 * Use 'auto' if you want the plugin to automatically calculate the position X. Otherwise, it will use code to calculate the position.
 * @default auto
 *
 * @param Gauge Position Y
 * @desc Y position for the gauge.
 * Use 'auto' if you want the plugin to automatically calculate the position Y. Otherwise, it will use code to calculate the position.
 * @default auto
 *
 * @param
 *
 * @param Fade Speed
 * @type number
 * @min 1
 * @desc How fast you wish for the skip gauge to fade out
 * @default 24
 * 
 *
 */
//=============================================================================

var _0x3a77=['_params','textWidthEx','_skipCutsceneDuration','gaugeColor1','height','addChild','_scene','isSkipCutscene','create','stopSkipCutscene','_gaugeSpriteBack','boxWidth','terminate','gaugeColor2','setFrame','startFadeOut','Gauge\x20Position\x20X','gaugePositionX','holdDuration','addChildToBack','Gauge\x20Position\x20Y','increaseSpeed','initialize','Filling\x20Speed','message','event','___Game_Interpreter_terminate___','_gaugeSpriteRate','createChildSprite','boxHeight','bitmap','___Game_Interpreter_setup___','_index','getLatestInterpreter','isTriggered','___Scene_Map_createAllWindows___','gaugePositionY','textPadding','<SkipCutscene>','updateSkipCutscene','refresh','Gauge\x20Color\x201','standardPadding','___Window_Selectable_isOkTriggered___','_eventId','fittingHeight','You\x20do\x20not\x20have\x20a\x20<Skip\x20Target>\x20Label\x20Tag\x20for\x20this\x20event!\x0aAdd\x20the\x20<Skip\x20Target>\x20Label\x20to\x20your\x20event\x20to\x20make\x20Skip\x20Cutscene\x20work\x20properly.','___Window_NumberInput_isOkTriggered___','isRepeated','Skip\x20Text','update','gaugeBackColor','opacity','auto','wait','___Window_ChoiceList_isOkTriggered___','_canSkipCutscene','lineHeight','processSkipCutscene','isLongPressed','updateOpacity','match','gradientFillRect','_list','decreaseSpeed','_depth','call','length','cancel','width','filter','_waitMode','Emptying\x20Speed','isOkTriggered','startFadeIn','parameters','_childInterpreter','isEventRunning','setup','Hold\x20Duration','round','_skippingCutscene','_trigger','prototype','jumpTo','___Window_Message_isTriggered___','fadeSpeed','SkipCutscene','command118','code','___Game_Interpreter_command118___','drawTextEx','createAllWindows','fillRect','inBattle','isSceneChanging','isPlaytest','constructor','contents','_skipCutsceneWindow','contentsOpacity','Olivia_SkipCutscene'];(function(_0x3225af,_0x3a77ce){var _0x3e4980=function(_0x372bf0){while(--_0x372bf0){_0x3225af['push'](_0x3225af['shift']());}};_0x3e4980(++_0x3a77ce);}(_0x3a77,0x136));var _0x3e49=function(_0x3225af,_0x3a77ce){_0x3225af=_0x3225af-0x0;var _0x3e4980=_0x3a77[_0x3225af];return _0x3e4980;};var Imported=Imported||{};Imported[_0x3e49('0x61')]=!![];var Olivia=Olivia||{};var parameters=$plugins[_0x3e49('0x42')](function(_0x14e884){return _0x14e884['description']['contains'](_0x3e49('0x22'));})[0x0]['parameters'];Olivia['SkipCutscene']={'holdDuration':Number(parameters[_0x3e49('0x4b')]),'increaseSpeed':Number(parameters[_0x3e49('0x13')]),'decreaseSpeed':Number(parameters[_0x3e49('0x44')]),'message':String(parameters[_0x3e49('0x2d')]),'gaugeColor1':String(parameters[_0x3e49('0x25')]),'gaugeColor2':String(parameters['Gauge\x20Color\x202']),'gaugePositionX':String(parameters[_0x3e49('0xc')]),'gaugePositionY':String(parameters[_0x3e49('0x10')]),'fadeSpeed':Number(parameters['Fade\x20Speed'])};Olivia[_0x3e49('0x53')][_0x3e49('0x1b')]=Game_Interpreter[_0x3e49('0x4f')][_0x3e49('0x4a')];Game_Interpreter[_0x3e49('0x4f')]['setup']=function(_0x2ebc81,_0x4957bd){if(!$gameParty[_0x3e49('0x5a')]()&&this[_0x3e49('0x3d')]===0x0){if(!!_0x4957bd&&!!$gameMap['event'](_0x4957bd)&&$gameMap[_0x3e49('0x15')](_0x4957bd)['_trigger']!==0x4){$gameTemp[_0x3e49('0x34')]=![];$gameTemp[_0x3e49('0x4d')]=![];SceneManager[_0x3e49('0x2')]['_skipCutsceneDuration']=0x0;}}Olivia[_0x3e49('0x53')]['___Game_Interpreter_setup___']['call'](this,_0x2ebc81,_0x4957bd);};Olivia[_0x3e49('0x53')]['___Game_Interpreter_terminate___']=Game_Interpreter['prototype'][_0x3e49('0x8')];Game_Interpreter[_0x3e49('0x4f')][_0x3e49('0x8')]=function(){if(!$gameParty['inBattle']()&&this[_0x3e49('0x3d')]===0x0){if(!!this[_0x3e49('0x28')]&&!!$gameMap['event'](this[_0x3e49('0x28')])&&$gameMap[_0x3e49('0x15')](this['_eventId'])[_0x3e49('0x4e')]!==0x4){$gameTemp[_0x3e49('0x34')]=undefined;$gameTemp['_skippingCutscene']=undefined;SceneManager[_0x3e49('0x2')][_0x3e49('0x64')]=0x0;}}Olivia[_0x3e49('0x53')][_0x3e49('0x16')][_0x3e49('0x3e')](this);};Olivia['SkipCutscene'][_0x3e49('0x56')]=Game_Interpreter[_0x3e49('0x4f')][_0x3e49('0x54')];Game_Interpreter[_0x3e49('0x4f')][_0x3e49('0x54')]=function(){if(this[_0x3e49('0x62')][0x0][_0x3e49('0x39')](/<Enable Skip>/i)){$gameTemp[_0x3e49('0x34')]=!![];$gameTemp[_0x3e49('0x4d')]=![];}else if(this[_0x3e49('0x62')][0x0][_0x3e49('0x39')](/<Disable Skip>/i)){$gameTemp[_0x3e49('0x34')]=![];$gameTemp[_0x3e49('0x4d')]=![];}else if(this[_0x3e49('0x62')][0x0][_0x3e49('0x39')](/<Skip Target>/i)){$gameTemp[_0x3e49('0x34')]=![];$gameTemp['_skippingCutscene']=![];}return Olivia[_0x3e49('0x53')][_0x3e49('0x56')][_0x3e49('0x3e')](this);};Game_Interpreter[_0x3e49('0x4f')][_0x3e49('0x36')]=function(){var _0x2611e1=this[_0x3e49('0x1d')]();if(!!_0x2611e1[_0x3e49('0x3b')]){for(var _0x319127=_0x2611e1[_0x3e49('0x1c')];_0x319127<_0x2611e1[_0x3e49('0x3b')]['length'];_0x319127++){var _0x2efbc0=_0x2611e1[_0x3e49('0x3b')][_0x319127];if(_0x2efbc0[_0x3e49('0x55')]===0x76&&_0x2efbc0[_0x3e49('0x47')][0x0]['match'](/<Skip Target>/i)){_0x2611e1['stopSkipCutscene'](_0x2611e1,_0x319127,!![]);return;}}}if(_0x2611e1===this){_0x2611e1[_0x3e49('0x5')](_0x2611e1,this[_0x3e49('0x3b')][_0x3e49('0x3f')]-0x1,![]);}else{_0x2611e1[_0x3e49('0x8')]();this[_0x3e49('0x36')]();}};Game_Interpreter[_0x3e49('0x4f')][_0x3e49('0x1d')]=function(){var _0xd34cbb=this;while(!!_0xd34cbb[_0x3e49('0x48')]&&!!_0xd34cbb[_0x3e49('0x48')]['_list']){_0xd34cbb=_0xd34cbb[_0x3e49('0x48')];}return _0xd34cbb;};Game_Interpreter[_0x3e49('0x4f')]['stopSkipCutscene']=function(_0x5d278b,_0x8712e5,_0x351d91){_0x5d278b[_0x3e49('0x43')]='';_0x5d278b[_0x3e49('0x32')](_0x5d278b[_0x3e49('0x52')]());$gameScreen[_0x3e49('0xb')](_0x5d278b[_0x3e49('0x52')]());if(_0x5d278b===this){$gameTemp[_0x3e49('0x34')]=![];$gameTemp[_0x3e49('0x4d')]=!![];}SceneManager[_0x3e49('0x2')]['_skipCutsceneDuration']=0x0;_0x5d278b[_0x3e49('0x50')](_0x8712e5);if(!_0x351d91){$gameScreen[_0x3e49('0x46')](_0x5d278b[_0x3e49('0x52')]());if($gameTemp[_0x3e49('0x5c')]()){alert(_0x3e49('0x2a'));}}};Olivia[_0x3e49('0x53')]['___Scene_Map_updateMainMultiply___']=Scene_Map['prototype']['updateMainMultiply'];Scene_Map['prototype']['updateMainMultiply']=function(){Olivia['SkipCutscene']['___Scene_Map_updateMainMultiply___'][_0x3e49('0x3e')](this);if(!!$gameTemp[_0x3e49('0x34')]){this[_0x3e49('0x23')]();}};Scene_Map[_0x3e49('0x4f')][_0x3e49('0x3')]=function(){return $gameMap[_0x3e49('0x49')]()&&!SceneManager[_0x3e49('0x5b')]()&&Input[_0x3e49('0x37')](_0x3e49('0x40'));};Scene_Map[_0x3e49('0x4f')]['updateSkipCutscene']=function(){this[_0x3e49('0x64')]=this[_0x3e49('0x64')]||0x0;if(this[_0x3e49('0x3')]()){this['_skipCutsceneDuration']+=Olivia[_0x3e49('0x53')][_0x3e49('0x11')];if(this[_0x3e49('0x64')]>=Olivia[_0x3e49('0x53')][_0x3e49('0xe')]){this[_0x3e49('0x36')]();}}else{this[_0x3e49('0x64')]=Math['max'](0x0,this[_0x3e49('0x64')]-Olivia['SkipCutscene'][_0x3e49('0x3c')]);}};Scene_Map['prototype']['processSkipCutscene']=function(){$gameMap['_interpreter'][_0x3e49('0x36')]();};Olivia['SkipCutscene'][_0x3e49('0x1f')]=Scene_Map[_0x3e49('0x4f')][_0x3e49('0x58')];Scene_Map[_0x3e49('0x4f')][_0x3e49('0x58')]=function(){Olivia[_0x3e49('0x53')][_0x3e49('0x1f')][_0x3e49('0x3e')](this);this[_0x3e49('0x5f')]=new Window_SkipCutscene();this[_0x3e49('0x1')](this[_0x3e49('0x5f')]);};Olivia[_0x3e49('0x53')][_0x3e49('0x27')]=Window_Selectable[_0x3e49('0x4f')][_0x3e49('0x45')];Window_Selectable[_0x3e49('0x4f')][_0x3e49('0x45')]=function(){if(!!$gameTemp[_0x3e49('0x4d')]){return!![];}else{return Olivia[_0x3e49('0x53')][_0x3e49('0x27')]['call'](this);}};Olivia['SkipCutscene'][_0x3e49('0x51')]=Window_Message[_0x3e49('0x4f')]['isTriggered'];Window_Message[_0x3e49('0x4f')][_0x3e49('0x1e')]=function(){if(!!$gameTemp[_0x3e49('0x4d')]){return!![];}else if(!!$gameTemp[_0x3e49('0x34')]&&Input[_0x3e49('0x2c')]('cancel')){return![];}else{return Olivia[_0x3e49('0x53')][_0x3e49('0x51')][_0x3e49('0x3e')](this);}};Olivia[_0x3e49('0x53')][_0x3e49('0x33')]=Window_ChoiceList[_0x3e49('0x4f')][_0x3e49('0x45')];Window_ChoiceList[_0x3e49('0x4f')]['isOkTriggered']=function(){if(!!$gameTemp['_skippingCutscene']){return!![];}else{return Olivia[_0x3e49('0x53')][_0x3e49('0x33')][_0x3e49('0x3e')](this);}};Olivia['SkipCutscene'][_0x3e49('0x2b')]=Window_NumberInput[_0x3e49('0x4f')][_0x3e49('0x45')];Window_NumberInput[_0x3e49('0x4f')][_0x3e49('0x45')]=function(){if(!!$gameTemp[_0x3e49('0x4d')]){return!![];}else{return Olivia[_0x3e49('0x53')][_0x3e49('0x2b')][_0x3e49('0x3e')](this);}};function Window_SkipCutscene(){this[_0x3e49('0x12')]['apply'](this,arguments);}Window_SkipCutscene[_0x3e49('0x4f')]=Object[_0x3e49('0x4')](Window_Base['prototype']);Window_SkipCutscene[_0x3e49('0x4f')][_0x3e49('0x5d')]=Window_SkipCutscene;Window_SkipCutscene[_0x3e49('0x4f')][_0x3e49('0x12')]=function(){var _0x2e24b2=Graphics[_0x3e49('0x7')];var _0x119fe6=this[_0x3e49('0x29')](0x1);Window_Base['prototype'][_0x3e49('0x12')][_0x3e49('0x3e')](this,this['textPadding']()*0x4,0x0,_0x2e24b2,_0x119fe6);if(Olivia[_0x3e49('0x53')][_0x3e49('0x20')]===_0x3e49('0x31')){this['y']=Graphics[_0x3e49('0x19')]-0xf0;}else{this['y']=eval(Olivia[_0x3e49('0x53')][_0x3e49('0x20')]);}this[_0x3e49('0x30')]=0x0;this[_0x3e49('0x60')]=0x0;this['refresh']();};Window_SkipCutscene[_0x3e49('0x4f')][_0x3e49('0x26')]=function(){return 0x0;};Window_SkipCutscene[_0x3e49('0x4f')]['textWidthEx']=function(_0x28892b){return this['drawTextEx'](_0x28892b,0x0,this[_0x3e49('0x5e')][_0x3e49('0x0')]);};Window_SkipCutscene[_0x3e49('0x4f')][_0x3e49('0x18')]=function(){var _0x539a92=this[_0x3e49('0x63')](Olivia[_0x3e49('0x53')][_0x3e49('0x14')]);_0x539a92+=this['textPadding']()*0x4;var _0x33ab35=this[_0x3e49('0x35')]();this['_gaugeSpriteRate']=new Sprite();this[_0x3e49('0x17')]['bitmap']=new Bitmap(_0x539a92-0x2,_0x33ab35-0x2);var _0x4f36da=Olivia[_0x3e49('0x53')][_0x3e49('0x65')];var _0x41e1c1=Olivia[_0x3e49('0x53')][_0x3e49('0x9')];this[_0x3e49('0x17')][_0x3e49('0x1a')][_0x3e49('0x3a')](0x0,0x0,_0x539a92-0x2,_0x33ab35-0x2,_0x4f36da,_0x41e1c1);this['_gaugeSpriteRate']['x']=0x1;this[_0x3e49('0x17')]['y']=0x1;this['addChildToBack'](this[_0x3e49('0x17')]);this[_0x3e49('0x6')]=new Sprite();this[_0x3e49('0x6')]['bitmap']=new Bitmap(_0x539a92,_0x33ab35);this['_gaugeSpriteBack'][_0x3e49('0x1a')][_0x3e49('0x59')](0x0,0x0,_0x539a92,_0x33ab35,this[_0x3e49('0x2f')]());this[_0x3e49('0xf')](this[_0x3e49('0x6')]);if(Olivia[_0x3e49('0x53')]['gaugePositionX']===_0x3e49('0x31')){this['x']=Math[_0x3e49('0x4c')]((Graphics[_0x3e49('0x7')]-_0x539a92)/0x2);}else{this['x']=eval(Olivia[_0x3e49('0x53')][_0x3e49('0xd')]);}};Window_SkipCutscene[_0x3e49('0x4f')][_0x3e49('0x24')]=function(){this[_0x3e49('0x57')](Olivia[_0x3e49('0x53')][_0x3e49('0x14')],this[_0x3e49('0x21')]()*0x2,0x0);this[_0x3e49('0x18')]();};Window_SkipCutscene[_0x3e49('0x4f')][_0x3e49('0x2e')]=function(){Window_Base['prototype'][_0x3e49('0x2e')][_0x3e49('0x3e')](this);this['updateOpacity']();if(!!this[_0x3e49('0x17')]){this['updateGaugeSprites']();}};Window_SkipCutscene[_0x3e49('0x4f')][_0x3e49('0x38')]=function(){if(!!$gameTemp[_0x3e49('0x34')]&&!!SceneManager[_0x3e49('0x2')][_0x3e49('0x64')]){var _0x111fda=Olivia[_0x3e49('0x53')][_0x3e49('0x52')];}else{var _0x111fda=-0x1*Olivia[_0x3e49('0x53')][_0x3e49('0x52')];}this[_0x3e49('0x60')]+=_0x111fda;};Window_SkipCutscene[_0x3e49('0x4f')]['updateGaugeSprites']=function(){this[_0x3e49('0x17')][_0x3e49('0x30')]=this[_0x3e49('0x60')];this[_0x3e49('0x6')][_0x3e49('0x30')]=this[_0x3e49('0x60')];if(!!$gameTemp[_0x3e49('0x4d')]){var _0xdca5c1=0x1;}else{var _0xdca5c1=SceneManager[_0x3e49('0x2')][_0x3e49('0x64')]/Olivia[_0x3e49('0x53')][_0x3e49('0xe')];}var _0xe6efcb=_0xdca5c1*this[_0x3e49('0x17')][_0x3e49('0x1a')][_0x3e49('0x41')];this[_0x3e49('0x17')][_0x3e49('0xa')](0x0,0x0,_0xe6efcb,this[_0x3e49('0x17')][_0x3e49('0x0')]);};