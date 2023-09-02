/*:
 * @plugindesc Allows to offset the starting Y position of parallax backgrounds. Just add <bgoy:300> to the map's notetags to offset the parallax by 300
 * @author Dustb0
 *
 */
(function() {

// Map parallax origin Y
Game_Map.prototype.parallaxOy = function() {
  if (this._parallaxZero) {
      return this._parallaxY * this.tileHeight();
  } else if (this._parallaxLoopY) {
      return this._parallaxY * this.tileHeight() / 2;
  } else {

      if ($dataMap.metaArray && $dataMap.metaArray["bgoy"]) {
        return Number($dataMap.metaArray["bgoy"][0]);
      } else {
        return 0;
      }
  }
}
})();