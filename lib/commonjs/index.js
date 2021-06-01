/*!
 * @se-fe/utils v1.0.0
 * Release Date 2021-6-1 12:01:58
 * (c) 2021-2021
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=window.localStorage||{},e=function(t){return!!t&&"[object Array]"===Object.prototype.toString.call(t)},r="__data__",n="__expire__",a="__sig__",i=function(e){t.removeItem(e)},o=function(e){var a=t.getItem(e);if(a)try{var o=JSON.parse(a);if(o[r]){var c=o[n];return c&&+new Date-c<0?(i(e),null):o[r]}return o}catch(t){return a}return null},c=Object.freeze({__proto__:null,setItem:function(e,a,i){var o={};o[e][r]=a,i&&(o[e][n]=+new Date+1e3*i);try{var c=JSON.stringify(o);t.setItem(e,c)}catch(t){}},removeItem:i,getItem:o,pushItem:function(n,i,o){void 0===o&&(o=!1);var c=t.getItem(n),s={};if(s[r]=i,o&&(s[a]=(Math.random()+Math.random()).toString(36).replace(/.\./,"")),c)try{var u=JSON.parse(c);e(u)&&(u.push(s),t.setItem(n,JSON.stringify(u)))}catch(t){}else t.setItem(n,JSON.stringify([s]))},consumeItem:function(n){var a=o(n);if(a&&e(a)){var i=a;if(i.length>0){var c=i.shift();return t.setItem(n,JSON.stringify(i)),c[r]}}}});exports.$localStorage=c;
