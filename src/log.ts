import { formatDatetime } from './datetime.js';

const logPrefix = 'Log';
const DATE_FORMATE = 'HH:mm:ss';

const green = function (...args: any) {
  const arg = [].slice.call(args);

  arg.unshift(
    `%c [${logPrefix}][${formatDatetime(new Date(), DATE_FORMATE)}]: `,
    'color: #ffffff;background: #43bb88',
  );

  console.log.apply(console, arg);
};

const error = function (...args: any) {
  const arg = [].slice.call(args);
  arg.unshift(
    `%c [${logPrefix}][${formatDatetime(new Date(), DATE_FORMATE)}]: `,
    'color: #ffffff;background: red',
  );

  console.log.apply(console, arg);
};

const info = function (...args: any) {
  const arg = [].slice.call(args);
  arg.unshift(
    `%c [${logPrefix}][${formatDatetime(new Date(), DATE_FORMATE)}]: `,
    'color: #ffffff;background: #5c7080',
  );

  console.log.apply(console, arg);
};

const clear = console.clear;

export default {
  green,
  error,
  info,
  clear,
};
