import { RestfulClient } from '../restful-client';
import { Inject, Injector } from '@angular/core';
import { IRestfulClient } from '../ng-restful-interface';
import { NzMessageService } from 'ng-zorro-antd';

/**
 *  This helper is base on the .NET ABP Framework and NG-ZORRO UI Framwork, and it's works out of the box!
 *  Tips: This helper does not contain any header authentication scheme, such as token.
 */
export class ZorroRestfulHelper extends RestfulClient implements IRestfulClient {
  constructor(@Inject(Injector) public injector: Injector) {
    super(injector);
  }

  messageService = this.injector.get(NzMessageService);

  rootUrl = (window as any).globalConfig.rootUrl;
  httpTimeout = 5000;
  // apb框架restful接口前缀
  routerPrefix = 'api/app/';
  header = {
    'Accept-Language': 'zh-Hans',
  };

  onHttpTimeout(error: any): void {
    this.messageService.success('请求超时');
  }
  onHttpError(error: any, method: string, path: string, options: any): void {
    const errorMsg = '服务器异常:';
    let errorMessage = error?.error?.error_description;

    errorMessage = !errorMessage
      ? error?.error?.error?.message ?? errorMsg + error.status
      : errorMessage;
    this.messageService.error(errorMessage + ((error?.error?.error?.code) ? '(' + (error?.error?.error?.code) + ')' : ''));
  }
  onHttpRespond(res: any) {}
  onDefaultSuccessNotice(res: any) {
    this.messageService.success('操作成功');
  }
}
