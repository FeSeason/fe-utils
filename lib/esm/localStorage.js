/*!
 * @se-fe/utils v1.0.4
 * Release Date 2021/7/6上午11:36:32
 * (c) 2021-2021
 */
import { $localStorage } from './utils/constant.js';
import { generatorSig, isArray } from './utils/help.js';

var STORE_KEY = {
  DATA: '__data__',
  EXPIRE: '__expire__',
  SIG: '__sig__'
};
var setItem = function setItem(key, data, expire) {
  var store = {};
  store[key][STORE_KEY.DATA] = data;

  if (expire) {
    store[key][STORE_KEY.EXPIRE] = +new Date() + expire * 1000;
  }

  try {
    var jsonStr = JSON.stringify(store);
    $localStorage.setItem(key, jsonStr);
  } catch (e) {}
};
var removeItem = function removeItem(key) {
  $localStorage.removeItem(key);
};
var getItem = function getItem(key) {
  var itemStr = $localStorage.getItem(key);

  if (itemStr) {
    try {
      var jsonStore = JSON.parse(itemStr);

      if (!jsonStore[STORE_KEY.DATA]) {
        return jsonStore;
      } else {
        var expireTime = jsonStore[STORE_KEY.EXPIRE];

        if (expireTime && +new Date() - expireTime < 0) {
          removeItem(key);
          return null;
        }

        return jsonStore[STORE_KEY.DATA];
      }
    } catch (e) {
      return itemStr;
    }
  }

  return null;
};
var pushItem = function pushItem(key, data, sig) {
  if (sig === void 0) {
    sig = false;
  }

  var itemStr = $localStorage.getItem(key);
  var item = {};
  item[STORE_KEY.DATA] = data;

  if (sig) {
    item[STORE_KEY.SIG] = generatorSig();
  }

  if (itemStr) {
    try {
      var jsonStore = JSON.parse(itemStr);

      if (isArray(jsonStore)) {
        jsonStore.push(item);
        $localStorage.setItem(key, JSON.stringify(jsonStore));
      }
    } catch (e) {}
  } else {
    $localStorage.setItem(key, JSON.stringify([item]));
  }
};
var consumeItem = function consumeItem(key) {
  var jsonStore = getItem(key);

  if (jsonStore && isArray(jsonStore)) {
    var arr = jsonStore;

    if (arr.length > 0) {
      var item = arr.shift();
      $localStorage.setItem(key, JSON.stringify(arr));
      return item[STORE_KEY.DATA];
    }
  }
};

export { consumeItem, getItem, pushItem, removeItem, setItem };
