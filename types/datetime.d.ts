export declare const ONE_MINUTE: number;
export declare const ONE_HOUR: number;
export declare const ONE_DAY: number;
export declare const DATETIME_FORMAT = "yyyy-MM-dd HH:mm";
export declare function toUnixTimestamp(datetime: any, bypassNull: any): number | undefined;
export declare function fromUnixTimestamp(unixTimestamp: any, bypassNull?: any): number | undefined;
export declare function formatDatetime(timeArg: number | string | Date | undefined, format?: string): string;
export declare function formatUnixDatetime(datetime: number | string | Date, datetimeFormat?: string): string;
export declare function getDistanceFromNow(timeArg: any): any;
export declare function getDefaultSearchDate(): Date;
export declare function getTodayTimestamp(options?: any): number;
export declare function getBeginningOfTheDate(date?: number): number;
export declare function getNextDate(date: any): number;
export declare const COMMON_DATEPICKER_PROPS: {
    format: string;
    defaultHours: number[];
    defaultMinutes: number[];
    isTimestamp: boolean;
    viewTimePick: boolean;
};
export declare const COMMON_DATEPICKER_RANGE_PROPS: {
    format: string;
    range: boolean;
    viewTimePick: boolean;
    isTimestamp: boolean;
    defaultHours: number[];
    defaultMinutes: number[];
};
declare const _default: {
    toUnixTimestamp: typeof toUnixTimestamp;
    fromUnixTimestamp: typeof fromUnixTimestamp;
    formatDatetime: typeof formatDatetime;
    formatUnixDatetime: typeof formatUnixDatetime;
    getDistanceFromNow: typeof getDistanceFromNow;
    getDefaultSearchDate: typeof getDefaultSearchDate;
    getTodayTimestamp: typeof getTodayTimestamp;
    getBeginningOfTheDate: typeof getBeginningOfTheDate;
    getNextDate: typeof getNextDate;
    ONE_MINUTE: number;
    ONE_HOUR: number;
    ONE_DAY: number;
    DATETIME_FORMAT: string;
    COMMON_DATEPICKER_PROPS: {
        format: string;
        defaultHours: number[];
        defaultMinutes: number[];
        isTimestamp: boolean;
        viewTimePick: boolean;
    };
    COMMON_DATEPICKER_RANGE_PROPS: {
        format: string;
        range: boolean;
        viewTimePick: boolean;
        isTimestamp: boolean;
        defaultHours: number[];
        defaultMinutes: number[];
    };
};
export default _default;
