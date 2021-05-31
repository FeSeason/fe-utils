/*!
 * @se-fe/utils v1.0.0
 * Release Date 2021-5-31 15:05:21
 * (c) 2021-2021
 */
import{$localStorage as t}from"./utils/constant.js";import{generatorSig as r,isArray as e}from"./utils/help.js";var i="__data__",n="__expire__",a="__sig__",s=function(r,e,a){var s={};s[r][i]=e,a&&(s[r][n]=+new Date+1e3*a);try{var f=JSON.stringify(s);t.setItem(r,f)}catch(t){}},f=function(r){t.removeItem(r)},u=function(r){var e=t.getItem(r);if(e)try{var a=JSON.parse(e);if(a[i]){var s=a[n];return s&&+new Date-s<0?(f(r),null):a[i]}return a}catch(t){return e}return null},o=function(n,s,f){void 0===f&&(f=!1);var u=t.getItem(n),o={};if(o[i]=s,f&&(o[a]=r()),u)try{var v=JSON.parse(u);e(v)&&(v.push(o),t.setItem(n,JSON.stringify(v)))}catch(t){}else t.setItem(n,JSON.stringify([o]))},v=function(r){var n=u(r);if(n&&e(n)){var a=n;if(a.length>0){var s=a.shift();return t.setItem(r,JSON.stringify(a)),s[i]}}};export{v as consumeItem,u as getItem,o as pushItem,f as removeItem,s as setItem};
