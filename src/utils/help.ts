/**
 * 数组判断
 * @param obj
 * @returns
 */
export const isArray = (obj: any) => {
  if (!obj) return false;

  return Object.prototype.toString.call(obj) === '[object, Array]';
};

/**
 * 随机生成 36 进制字符串
 * @returns
 */
export const generatorSig = (): string => {
  return (Math.random() + Math.random()).toString(36).replace(/.\./, '');
};
