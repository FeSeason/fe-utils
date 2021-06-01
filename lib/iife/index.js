/*!
 * @se-fe/utils v1.0.0
 * Release Date 2021-6-1 12:01:58
 * (c) 2021-2021
 */
var se_utils=function(t){"use strict";var e=window.localStorage||{},r=function(t){return!!t&&"[object Array]"===Object.prototype.toString.call(t)},n="__data__",a="__expire__",i="__sig__",o=function(t){e.removeItem(t)},u=function(t){var r=e.getItem(t);if(r)try{var i=JSON.parse(r);if(i[n]){var u=i[a];return u&&+new Date-u<0?(o(t),null):i[n]}return i}catch(t){return r}return null},c=Object.freeze({__proto__:null,setItem:function(t,r,i){var o={};o[t][n]=r,i&&(o[t][a]=+new Date+1e3*i);try{var u=JSON.stringify(o);e.setItem(t,u)}catch(t){}},removeItem:o,getItem:u,pushItem:function(t,a,o){void 0===o&&(o=!1);var u=e.getItem(t),c={};if(c[n]=a,o&&(c[i]=(Math.random()+Math.random()).toString(36).replace(/.\./,"")),u)try{var s=JSON.parse(u);r(s)&&(s.push(c),e.setItem(t,JSON.stringify(s)))}catch(t){}else e.setItem(t,JSON.stringify([c]))},consumeItem:function(t){var a=u(t);if(a&&r(a)){var i=a;if(i.length>0){var o=i.shift();return e.setItem(t,JSON.stringify(i)),o[n]}}}});return t.$localStorage=c,Object.defineProperty(t,"__esModule",{value:!0}),t}({});
