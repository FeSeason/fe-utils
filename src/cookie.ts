/**
 *
 * @param name cookie key
 * @param value cookie value
 * @param hours 时长默认1小时
 * @param path 默认 '/'
 * @returns
 */
export const setCookie = (
  name: string,
  value: string,
  hours = 1,
  path = '/',
) => {
  const exp = new Date();

  exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);

  document.cookie =
    name +
    '=' +
    escape(value) +
    ';path=' +
    path +
    'expires=' +
    exp.toISOString();
};

/**
 * 获取 cookie 值
 * @param name cookie key
 * @returns value
 */

export const getCookie = (name: string): string | null => {
  let arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
};


/**
 * 删除 cookie
 * @param name cookie key
 */
export const delCookie = (name: string) => {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);

  const val = getCookie(name);
  
  if (val != null)
    document.cookie = name + '=' + val + ';expires=' + exp.toISOString();
};
