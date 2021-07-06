/*!
 * @se-fe/utils v1.0.6
 * Release Date 2021/7/6上午11:46:05
 * (c) 2021-2021
 */
function isNullLike(value) {
  return typeof value === 'undefined' || value === null || value === '';
}

var ONE_MINUTE = 1000 * 60;
var ONE_HOUR = 1000 * 60 * 60;
var ONE_DAY = 1000 * 60 * 60 * 24;
var DATETIME_FORMAT = 'yyyy-MM-dd HH:mm';
function toUnixTimestamp(datetime, bypassNull) {
  if (bypassNull && isNullLike(datetime)) {
    return undefined;
  }

  var timestamp;

  if (typeof datetime === 'number' || typeof datetime === 'string') {
    datetime = new Date(datetime);
  }

  if (datetime instanceof Date) {
    timestamp = datetime.valueOf();
  } else if (typeof datetime === 'number') {
    timestamp = datetime;
  } else {
    throw new Error(datetime + " is not a valid date type");
  }

  return Math.floor(timestamp / 1000);
}
function fromUnixTimestamp(unixTimestamp, bypassNull) {
  if (bypassNull && isNullLike(unixTimestamp)) {
    return undefined;
  }

  if (typeof unixTimestamp !== 'number') {
    throw new Error(unixTimestamp + " is not a valid unix timestamp");
  }

  return unixTimestamp * 1000;
}
function formatDatetime(timeArg, format) {
  if (format === void 0) {
    format = DATETIME_FORMAT;
  }

  var time = timeArg;

  if (typeof time === 'number' || typeof time === 'string') {
    time = new Date(time);
  }

  if (!time || !(time instanceof Date) || isNaN(time.valueOf())) {
    return '';
  }

  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hours24 = time.getHours();
  var hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  var milliseconds = time.getMilliseconds();
  var map = {
    yyyy: year,
    MM: ('0' + month).slice(-2),
    M: month,
    dd: ('0' + day).slice(-2),
    d: day,
    HH: ('0' + hours24).slice(-2),
    H: hours24,
    hh: ('0' + hours).slice(-2),
    h: hours,
    mm: ('0' + minutes).slice(-2),
    m: minutes,
    ss: ('0' + seconds).slice(-2),
    s: seconds,
    S: milliseconds
  };
  return format.replace(/y+|M+|d+|H+|h+|m+|s+|S+/g, function (str) {
    return map[str];
  });
}
function formatUnixDatetime(datetime, datetimeFormat) {
  if (datetimeFormat === void 0) {
    datetimeFormat = DATETIME_FORMAT;
  }

  if (isNullLike(datetime)) {
    return '';
  }

  var timestamp = fromUnixTimestamp(datetime);
  return formatDatetime(timestamp, datetimeFormat);
}
function getDistanceFromNow(timeArg) {
  var now = Date.now();
  var time = timeArg;

  if (typeof time === 'number' || typeof time === 'string') {
    time = new Date(time);
  }

  if (!time || !(time instanceof Date) || isNaN(time.valueOf())) {
    return null;
  }

  time = time.getTime() - now;
  var res = {};
  var ret = [];
  res.days = Math.round(time / ONE_DAY) || 0;

  if (res.days || ret.length) {
    ret.push(res.days);
  }

  time = time % ONE_DAY;
  res.hours = Math.round(time / ONE_HOUR) || 0;

  if (res.hours || ret.length) {
    ret.push(res.hours);
  }

  time = time % ONE_HOUR;
  res.minutes = Math.round(time / ONE_MINUTE) || 0;

  if (res.minutes || ret.length) {
    ret.push(res.minutes);
  }

  time = time % ONE_MINUTE;
  res.seconds = Math.round(time / 1000) || 0;

  if (res.seconds || ret.length) {
    ret.push(res.seconds);
  }

  res.milliseconds = time % 1000 || 0;

  if (res.milliseconds || ret.length) {
    ret.push(res.milliseconds);
  }

  res.distance = ret.reverse();
  return res;
}
function getDefaultSearchDate() {
  var now = new Date();
  now.setHours(10);
  now.setMinutes(0, 0, 0);
  return now;
}
function getTodayTimestamp(options) {
  if (options === void 0) {
    options = {};
  }

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = options.hour || '00';
  var minute = options.minute || '00';
  var seconds = options.seconds || '00';
  var todayStr = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + seconds;
  return new Date(todayStr).getTime();
}
function getBeginningOfTheDate(date) {
  if (date === void 0) {
    date = Date.now();
  }

  var datetime = new Date(date);
  datetime.setHours(0);
  datetime.setMinutes(0);
  datetime.setSeconds(0);
  datetime.setMilliseconds(0);
  return datetime.valueOf();
}
function getNextDate(date) {
  var datetime = new Date(date);
  datetime.setDate(datetime.getDate() + 1);
  return datetime.valueOf();
}
var COMMON_DATEPICKER_PROPS = {
  format: DATETIME_FORMAT,
  defaultHours: [10, 10],
  defaultMinutes: [0, 0],
  isTimestamp: true,
  viewTimePick: true
};
var COMMON_DATEPICKER_RANGE_PROPS = {
  format: DATETIME_FORMAT,
  range: true,
  viewTimePick: true,
  isTimestamp: true,
  defaultHours: [10, 10],
  defaultMinutes: [0, 0]
};
var datetime = {
  toUnixTimestamp: toUnixTimestamp,
  fromUnixTimestamp: fromUnixTimestamp,
  formatDatetime: formatDatetime,
  formatUnixDatetime: formatUnixDatetime,
  getDistanceFromNow: getDistanceFromNow,
  getDefaultSearchDate: getDefaultSearchDate,
  getTodayTimestamp: getTodayTimestamp,
  getBeginningOfTheDate: getBeginningOfTheDate,
  getNextDate: getNextDate,
  ONE_MINUTE: ONE_MINUTE,
  ONE_HOUR: ONE_HOUR,
  ONE_DAY: ONE_DAY,
  DATETIME_FORMAT: DATETIME_FORMAT,
  COMMON_DATEPICKER_PROPS: COMMON_DATEPICKER_PROPS,
  COMMON_DATEPICKER_RANGE_PROPS: COMMON_DATEPICKER_RANGE_PROPS
};

export default datetime;
export { COMMON_DATEPICKER_PROPS, COMMON_DATEPICKER_RANGE_PROPS, DATETIME_FORMAT, ONE_DAY, ONE_HOUR, ONE_MINUTE, formatDatetime, formatUnixDatetime, fromUnixTimestamp, getBeginningOfTheDate, getDefaultSearchDate, getDistanceFromNow, getNextDate, getTodayTimestamp, toUnixTimestamp };
