/*!
 * @se-fe/utils v1.0.12
 * Release Date 2021/8/3下午3:39:43
 * (c) 2021-2021
 */
var setCookie = function setCookie(name, value, hours, path) {
  if (hours === void 0) {
    hours = 1;
  }

  if (path === void 0) {
    path = '/';
  }

  var exp = new Date();
  exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ';path=' + path + 'expires=' + exp.toISOString();
};
var getCookie = function getCookie(name) {
  var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
};
var delCookie = function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var val = getCookie(name);
  if (val != null) document.cookie = name + '=' + val + ';expires=' + exp.toISOString();
};

export { delCookie, getCookie, setCookie };
