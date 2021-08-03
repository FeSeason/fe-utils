/*!
 * @se-fe/utils v1.0.12
 * Release Date 2021/8/3下午3:39:43
 * (c) 2021-2021
 */
var isArray = function isArray(obj) {
  if (!obj) return false;
  return Object.prototype.toString.call(obj) === '[object Array]';
};
var generatorSig = function generatorSig() {
  return (Math.random() + Math.random()).toString(36).replace(/.\./, '');
};

export { generatorSig, isArray };
