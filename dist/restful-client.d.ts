import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { RestfulClientState } from './http-enum';
export declare class RestfulClient {
    injector: Injector;
    constructor(injector: Injector);
    httpClient: any;
    cacheService: any;
    header: any;
    rootUrl?: string;
    httpTimeout: number;
    routerPrefix: string;
    /**
     * @desc Get resful resource name.
     */
    protected getRestfulRecources(): any;
    /**
     * @desc Get the service name of the cache.
     */
    protected getCacheRequest(): any;
    /**
     * Callback functions
     */
    protected onHttpRespond?(error: any): void;
    protected onDefaultSuccessNotice?(rse: any): void;
    protected onHttpError?(error: any, method: string, path: string, options: any): void;
    protected onHttpTimeout?(error: any): void;
    /**
     * @desc Make http request using HttpClient of Angular.
     */
    protected makeHttpRequest(method: string, path: string, options: any, functionName: string, showDefaultSuccessNotice: boolean): Observable<ArrayBuffer>;
}
/**
 * @desc The router without any regular prefix
 */
export declare const CUSTOMED_RESOURCE = RestfulClientState.CUSTOMED_RESOURCE;
/**
 * @desc Annotation of restful api resource name.
 */
export declare function Resources(businness: string | RestfulClientState): <TFunction extends Function>(Target: TFunction) => TFunction;
/**
 * @desc Annatation of cached request list
 */
export declare function CacheRequest(requestList: Array<string>): <TFunction extends Function>(Target: TFunction) => TFunction;
/**
 * @desc  Annatation of GET request
 * @param router the api router
 * @param options the restful options
 */
export declare let GET: (router?: string, options?: any) => (target: any, methodName: string, desc: any) => void;
/**
 * @desc  Annatation of POST request
 * @param router the api router
 * @param options the restful options
 */
export declare let POST: (router?: string, options?: any) => (target: any, methodName: string, desc: any) => void;
/**
 * @desc  Annatation of PUT request
 * @param router the api router
 * @param options the restful options
 */
export declare let PUT: (router?: string, options?: any) => (target: any, methodName: string, desc: any) => void;
/**
 * @desc  Annatation of DELETE request
 * @param router the api router
 * @param options the restful options
 */
export declare let DELETE: (router?: string, options?: any) => (target: any, methodName: string, desc: any) => void;
