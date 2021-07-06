/*!
 * @se-fe/utils v1.0.6
 * Release Date 2021/7/6上午11:46:05
 * (c) 2021-2021
 */
import { formatDatetime } from './datetime.js';

var logPrefix = 'Log';
var DATE_FORMATE = 'HH:mm:ss';

var green = function green() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var arg = [].slice.call(args);
  arg.unshift("%c [" + logPrefix + "][" + formatDatetime(new Date(), DATE_FORMATE) + "]: ", 'color: #ffffff;background: #43bb88');
  console.log.apply(console, arg);
};

var error = function error() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var arg = [].slice.call(args);
  arg.unshift("%c [" + logPrefix + "][" + formatDatetime(new Date(), DATE_FORMATE) + "]: ", 'color: #ffffff;background: red');
  console.log.apply(console, arg);
};

var info = function info() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var arg = [].slice.call(args);
  arg.unshift("%c [" + logPrefix + "][" + formatDatetime(new Date(), DATE_FORMATE) + "]: ", 'color: #ffffff;background: #5c7080');
  console.log.apply(console, arg);
};

var clear = console.clear;
var log = {
  green: green,
  error: error,
  info: info,
  clear: clear
};

export default log;
