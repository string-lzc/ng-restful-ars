import { Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { CacheService } from 'src/app/shared/service/cache.service';
import { TranslateService } from '@ngx-translate/core';
import { RestfulHelper } from './ng-restful-helper';
import { ZorroRestfulHelper } from 'ng-restful-client';
export declare class DemoService extends ZorroRestfulHelper {
    injector: Injector;
    message: NzMessageService;
    router: Router;
    userService: UserService;
    cacheService: CacheService;
    translate: TranslateService;
    constructor(injector: Injector, message: NzMessageService, router: Router, userService: UserService, cacheService: CacheService, translate: TranslateService);
    restfulClient: RestfulHelper;
    login_token(body: any): any;
    agreement1(): any;
    set_admin(body: any): any;
    get_user_info(params: any): any;
    delete_business(requestParams: any): any;
    edit_business_user(params: any, body: any): any;
}
