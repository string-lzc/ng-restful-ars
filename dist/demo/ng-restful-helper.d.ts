import { RestfulClient } from '../restful-client';
import { Injector } from '@angular/core';
import { IRestfulClient } from '../ng-restful-interface';
export declare class RestfulHelper extends RestfulClient implements IRestfulClient {
    injector: Injector;
    constructor(injector: Injector);
    rootUrl: any;
    httpTimeout: number;
    header: {
        'Accept-Language': string;
    };
    onHttpTimeout(error: any): void;
    onHttpError(error: any, method: string, path: string, options: any): void;
    onHttpRespond(res: any): void;
    onDefaultSuccessNotice(res: any): void;
}
