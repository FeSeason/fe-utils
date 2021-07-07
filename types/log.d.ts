export interface ISLog {
    level: 1 | 2 | 3;
    open: true;
    prefix: string;
}
export declare type logTye = 'great' | 'info' | 'error';
declare class sLog {
    config: {
        level: number;
        open: boolean;
        prefix: string;
    };
    constructor(config: ISLog);
    private resolveLog;
    great(...args: any): void;
    info(...args: any): void;
    error(...args: any): void;
    clear(): void;
}
export default sLog;
