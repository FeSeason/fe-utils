import { kv, storageData } from './types';
import { $localStorage } from './utils/constant';
import { generatorSig, isArray } from './utils/help';

const STORE_KEY = {
  DATA: '__data__',
  EXPIRE: '__expire__',
  SIG: '__sig__',
};

/**
 * 支持过期时间设置
 * @param key
 * @param data
 * @param expire 过期时间, 单位秒
 */
export const setItem = (key: string, data: storageData, expire?: number) => {
  const store: kv = {};

  store[key][STORE_KEY.DATA] = data;

  if (expire) {
    store[key][STORE_KEY.EXPIRE] = +new Date() + expire * 1000;
  }

  try {
    const jsonStr = JSON.stringify(store);

    $localStorage.setItem(key, jsonStr);
  } catch (e) {}
};

/**
 * 移除
 * @param key
 */
export const removeItem = (key: string) => {
  $localStorage.removeItem(key);
};

/**
 * 获取
 * @param key
 * @returns
 */
export const getItem = (key: string): storageData | null => {
  const itemStr = $localStorage.getItem(key);

  if (itemStr) {
    try {
      const jsonStore = JSON.parse(itemStr);

      if (!jsonStore[STORE_KEY.DATA]) {
        return jsonStore;
      } else {
        const expireTime = jsonStore[STORE_KEY.EXPIRE];

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

/**
 * 数组追加形式写入
 * @param key
 * @param data
 * @param sig 是否添加唯一标记
 */
export const pushItem = (key: string, data: storageData, sig = false) => {
  const itemStr = $localStorage.getItem(key);
  const item: kv = {};

  item[STORE_KEY.DATA] = data;

  if (sig) {
    item[STORE_KEY.SIG] = generatorSig();
  }

  if (itemStr) {
    try {
      const jsonStore = JSON.parse(itemStr);

      if (isArray(jsonStore)) {
        jsonStore.push(item);

        $localStorage.setItem(key, JSON.stringify(jsonStore));
      }
    } catch (e) {}
  } else {
    $localStorage.setItem(key, JSON.stringify([item]));
  }
};

/**
 * 消费数组，调用方递归调用
 * @param key
 * @returns 返回消费数据
 */
export const consumeItem = (key: string) => {
  const jsonStore = getItem(key);

  if (jsonStore && isArray(jsonStore)) {
    const arr = jsonStore as any[];

    if (arr.length > 0) {
      const item = arr.shift();

      $localStorage.setItem(key, JSON.stringify(arr));
      return item[STORE_KEY.DATA];
    }
  }
};
