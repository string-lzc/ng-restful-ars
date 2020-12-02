import { RestfulClient } from '../restful-client';
import { Inject, Injector } from '@angular/core';
import { IRestfulClient } from '../ng-restful-interface';

export class RestfulHelper extends RestfulClient implements IRestfulClient {
  constructor(@Inject(Injector) public injector: Injector) {
    super(injector);
  }

  rootUrl = (window as any).globalConfig.rootUrl;
  httpTimeout = 5000;

  header = {
    'Accept-Language': 'en-US',
  };
  onHttpTimeout(error: any): void {}
  onHttpError(error: any, method: string, path: string, options: any): void {}
  onHttpRespond(res: any) {}
  onDefaultSuccessNotice(res: any) {}
}
