var LIGHT_GREEN = '#7f7';
var LIGHT_RED   = '#f77';

function getOffset( elem ) {
    var left = 0;
    var top = 0;
    while( true ){
      left += elem.offsetLeft;
      top += elem.offsetTop;
      if( elem.offsetParent === null ) {
          break;
      }
      elem = elem.offsetParent;
    }
    return { x:left, y:top };
}
