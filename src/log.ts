import { formatDatetime } from './datetime.js';

const DATE_FORMATE = 'HH:mm:ss';

export interface ISLog {
  /** 日志等级: 1 显示所有 | 2 只显示 info | 3 只显示 error */
  level: 1 | 2 | 3,
  /** 是否开启 */
  open: true,
  /** 前缀 */
  prefix: string;
}

export type logTye = 'great' | 'info' | 'error';

const defaultConfig = {
  level: 1,
  open: true,
  prefix: 'Log'
}

class sLog {
  config = defaultConfig;

  constructor(config: ISLog) {
    this.config = config
  }

  private resolveLog(type: logTye, args: any) {
    const { level, open, prefix } = this.config;
    const arg = [].slice.call(args);

    if (!open) {
      return
    }

    switch (type) {
      case 'great':
        if (level !== 1) {
          return;
        }
        arg.unshift(
          `%c [${prefix}][${formatDatetime(new Date(), DATE_FORMATE)}]: `,
          'color: #ffffff;background: #43bb88',
        );
        
        break;

      case 'info':
        if (level > 2) {
          return;
        }
        arg.unshift(
          `%c [${prefix}][${formatDatetime(new Date(), DATE_FORMATE)}]: `,
          'color: #ffffff;background: #5c7080',
        );
        
        break;

      case 'error':
        if (level !== 1 && level !== 3) {
          return;
        }
        arg.unshift(
          `%c [${prefix}][${formatDatetime(new Date(), DATE_FORMATE)}]: `,
          'color: #ffffff;background: red',
        );
        
        break;
    
      default:
        break;
    }

    console.log.apply(console, arg);
  }

  // 很棒
  public great(...args: any) {
    this.resolveLog('great', args);
  }

  // 常规信息
  public info(...args: any) {
    this.resolveLog('info', args);
  }

  // 错误信息
  public error(...args: any) {
    this.resolveLog('error', args);
  }

  public clear() {
    console.clear;
  }
}

export default sLog;