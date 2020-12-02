import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { CacheService } from 'src/app/shared/service/cache.service';
import { TranslateService } from '@ngx-translate/core';
import { UserInfo } from 'src/app/shared/model/user.model';
import { RestfulHelper } from './ng-restful-helper';
import { Resources, POST, CUSTOMED_RESOURCE, GET, DELETE, PUT } from 'ng-restful-client/dist/out-tsc/restful-client';
// import { ZorroRestfulHelper } from 'ng-restful-client/dist/out-tsc/helper/zorro-restful-helper';
import { ZorroRestfulHelper } from 'ng-restful-client';

// @Resources('business')
@Resources(CUSTOMED_RESOURCE)
@Injectable({
  providedIn: 'root',
})
export class DemoService extends ZorroRestfulHelper {
  constructor(
    public injector: Injector,
    public message: NzMessageService,
    public router: Router,
    public userService: UserService,
    public cacheService: CacheService,
    public translate: TranslateService

  ) {
    super(injector);
  }
  restfulClient = new RestfulHelper(this.injector);

  @POST('connect/token', {
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  })
  login_token(body: any): any {}

  @POST('api/app/user/agree')
  agreement1(): any {}

  @POST('api/app/user/setAdmin')
  set_admin(body: any): any {}

  @GET('api/app/user/info')
  get_user_info(params: any): any {}

  @DELETE('/{id}')
  delete_business(requestParams: any): any {}

  @PUT('/user')
  edit_business_user(params: any, body: any): any {}
}
