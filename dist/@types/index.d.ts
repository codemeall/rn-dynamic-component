/// <reference types="react" />
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare type PromiseCallback<T> = {
    readonly resolve: (result: T) => void;
    readonly reject: (error: Error) => void;
};
export declare type DynamicComponentSource = {
    readonly uri: string;
} | string;
export declare type DynamicComponentCache = {
    readonly [uri: string]: React.Component | null;
};
export declare type DynamicComponentTasks = {
    readonly [uri: string]: PromiseCallback<React.Component>[];
};
export declare type DynamicComponentOptions = {
    readonly dangerouslySetInnerJSX: boolean;
};
export declare type DynamicComponentContextConfig = {
    readonly verify: (response: AxiosResponse<string>) => Promise<boolean>;
    readonly buildRequestForUri?: (config: AxiosRequestConfig) => AxiosPromise<string>;
    readonly global?: any;
};
