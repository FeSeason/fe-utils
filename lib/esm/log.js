/*!
 * @se-fe/utils v1.0.12
 * Release Date 2021/8/3下午3:39:43
 * (c) 2021-2021
 */
import { formatDatetime } from './datetime.js';

var DATE_FORMATE = 'HH:mm:ss';
var defaultConfig = {
  level: 1,
  open: true,
  prefix: 'Log'
};

var sLog = function () {
  function sLog(config) {
    this.config = defaultConfig;
    this.config = config;
  }

  sLog.prototype.resolveLog = function (type, args) {
    var _a = this.config,
        level = _a.level,
        open = _a.open,
        prefix = _a.prefix;
    var arg = [].slice.call(args);

    if (!open) {
      return;
    }

    switch (type) {
      case 'great':
        if (level !== 1) {
          return;
        }

        arg.unshift("%c [" + prefix + "][" + formatDatetime(new Date(), DATE_FORMATE) + "]: ", 'color: #ffffff;background: #43bb88');
        break;

      case 'info':
        if (level > 2) {
          return;
        }

        arg.unshift("%c [" + prefix + "][" + formatDatetime(new Date(), DATE_FORMATE) + "]: ", 'color: #ffffff;background: #5c7080');
        break;

      case 'error':
        if (level === 2) {
          return;
        }

        arg.unshift("%c [" + prefix + "][" + formatDatetime(new Date(), DATE_FORMATE) + "]: ", 'color: #ffffff;background: red');
        break;
    }

    console.log.apply(console, arg);
  };

  sLog.prototype.great = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this.resolveLog('great', args);
  };

  sLog.prototype.info = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this.resolveLog('info', args);
  };

  sLog.prototype.error = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this.resolveLog('error', args);
  };

  sLog.prototype.clear = function () {
  };

  return sLog;
}();

export default sLog;
