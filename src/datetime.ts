function isNullLike(value: any) {
  return typeof value === 'undefined' || value === null || value === '';
}

export const ONE_MINUTE = 1000 * 60;
export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm';

export function toUnixTimestamp(datetime: any, bypassNull: any) {
  if (bypassNull && isNullLike(datetime)) {
    return undefined;
  }

  let timestamp;

  if (typeof datetime === 'number' || typeof datetime === 'string') {
    datetime = new Date(datetime);
  }

  if (datetime instanceof Date) {
    timestamp = datetime.valueOf();
  } else if (typeof datetime === 'number') {
    timestamp = datetime;
  } else {
    throw new Error(`${datetime} is not a valid date type`);
  }

  return Math.floor(timestamp / 1000);
}

export function fromUnixTimestamp(unixTimestamp: any, bypassNull?: any) {
  if (bypassNull && isNullLike(unixTimestamp)) {
    return undefined;
  }

  if (typeof unixTimestamp !== 'number') {
    throw new Error(`${unixTimestamp} is not a valid unix timestamp`);
  }

  return unixTimestamp * 1000;
}

export function formatDatetime(
  timeArg: number | string | Date | undefined,
  format = DATETIME_FORMAT,
) {
  let time = timeArg;

  if (typeof time === 'number' || typeof time === 'string') {
    time = new Date(time);
  }

  if (!time || !(time instanceof Date) || isNaN(time.valueOf())) {
    return '';
  }

  const year = time.getFullYear(); // 年份
  const month = time.getMonth() + 1; // 月份
  const day = time.getDate(); // 日
  const hours24 = time.getHours(); // 小时
  const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minutes = time.getMinutes(); // 分
  const seconds = time.getSeconds(); // 秒
  const milliseconds = time.getMilliseconds(); // 毫秒

  const map: any = {
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
    S: milliseconds,
  };

  return format.replace(/y+|M+|d+|H+|h+|m+|s+|S+/g, (str) => map[str]);
}

export function formatUnixDatetime(
  datetime: number | string | Date,
  datetimeFormat = DATETIME_FORMAT,
) {
  if (isNullLike(datetime)) {
    return '';
  }

  const timestamp = fromUnixTimestamp(datetime);

  return formatDatetime(timestamp, datetimeFormat);
}

/**
 * @param time 一个时间值
 * @return 输出该时间到运行该代码时（当前时刻）的距离值，如：
 *   输出结果：
 *   {
 *     days: 0,
 *     hours: 0,
 *     minutes: -1,
 *     seconds: -1,
 *     milliseconds: -53,
 *     distance: [-740, -53, -1]
 *   }
 *   其中：distance: [-740, -53, -1] 的含义是：
 *     1分钟 53秒 740毫秒 之前
 *     注： 从左至右 分别代表 [毫秒，秒，分钟，小时，天数]，
 *         最多计算到天数，负数代表之前，正数代表之后
 */
export function getDistanceFromNow(timeArg: any) {
  let now = Date.now();
  let time = timeArg;

  if (typeof time === 'number' || typeof time === 'string') {
    time = new Date(time);
  }

  if (!time || !(time instanceof Date) || isNaN(time.valueOf())) {
    return null;
  }

  time = time.getTime() - now;

  let res: any = {};
  let ret = [];

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

export function getDefaultSearchDate() {
  const now = new Date();

  now.setHours(10);
  now.setMinutes(0, 0, 0);
  return now;
}

export function getTodayTimestamp(options = {} as any) {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = options.hour || '00';
  let minute = options.minute || '00';
  let seconds = options.seconds || '00';
  let todayStr = `${year}/${month}/${day} ${hour}:${minute}:${seconds}`;

  return new Date(todayStr).getTime();
}

export function getBeginningOfTheDate(date = Date.now()) {
  const datetime = new Date(date);

  datetime.setHours(0);
  datetime.setMinutes(0);
  datetime.setSeconds(0);
  datetime.setMilliseconds(0);

  return datetime.valueOf();
}

export function getNextDate(date: any) {
  const datetime = new Date(date);

  datetime.setDate(datetime.getDate() + 1);

  return datetime.valueOf();
}

export const COMMON_DATEPICKER_PROPS = {
  format: DATETIME_FORMAT,
  defaultHours: [10, 10],
  defaultMinutes: [0, 0],
  isTimestamp: true,
  viewTimePick: true,
};

export const COMMON_DATEPICKER_RANGE_PROPS = {
  format: DATETIME_FORMAT,
  range: true,
  viewTimePick: true,
  isTimestamp: true,
  defaultHours: [10, 10],
  defaultMinutes: [0, 0],
};

export default {
  toUnixTimestamp,
  fromUnixTimestamp,
  formatDatetime,
  formatUnixDatetime,
  getDistanceFromNow,
  getDefaultSearchDate,
  getTodayTimestamp,
  getBeginningOfTheDate,
  getNextDate,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_DAY,
  DATETIME_FORMAT,
  COMMON_DATEPICKER_PROPS,
  COMMON_DATEPICKER_RANGE_PROPS,
};
