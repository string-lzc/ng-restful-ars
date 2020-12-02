import { RestfulClient } from '../restful-client';
import { Injector } from '@angular/core';
import { IRestfulClient } from '../ng-restful-interface';
/**
 *  This helper is base on the .NET ABP Framework and NG-ZORRO UI Framwork, and it's works out of the box!
 *  Tips: This helper does not contain any header authentication scheme, such as token.
 */
export declare class ZorroRestfulHelper extends RestfulClient implements IRestfulClient {
    injector: Injector;
    constructor(injector: Injector);
    messageService: any;
    rootUrl: any;
    httpTimeout: number;
    routerPrefix: string;
    header: {
        'Accept-Language': string;
    };
    onHttpTimeout(error: any): void;
    onHttpError(error: any, method: string, path: string, options: any): void;
    onHttpRespond(res: any): void;
    onDefaultSuccessNotice(res: any): void;
}
