
import EventEmitter from 'events'

export default class Helpers extends EventEmitter {
  constructor(){
    super();
  }

  static bool(str) {
    switch(!0){
      case typeof str === 'boolean' :
        return str;
      break;
      case str.match(/(true)/)[1] :
        return true;
      break;
      default:
      case str.match(/(false)/) :
      case str === null || str === undefined :
        return false;
      break;
    }
  }

  static debounce(fn, time) {
    let flag = '';

    time = time || 300;

    return function () {
      const args = arguments;

      clearTimeout(flag);

      flag = setTimeout(() => {
        fn.apply({}, args);
      }, time);
    };
  }
}
