import { storageData } from './types';
export declare const setItem: (key: string, data: storageData, expire?: number | undefined) => void;
export declare const removeItem: (key: string) => void;
export declare const getItem: (key: string) => storageData | null;
export declare const pushItem: (key: string, data: storageData, sig?: boolean) => void;
export declare const consumeItem: (key: string) => any;
