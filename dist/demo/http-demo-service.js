import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { RestfulHelper } from './ng-restful-helper';
import { Resources, POST, CUSTOMED_RESOURCE, GET, DELETE, PUT } from 'ng-restful-client/dist/out-tsc/restful-client';
// import { ZorroRestfulHelper } from 'ng-restful-client/dist/out-tsc/helper/zorro-restful-helper';
import { ZorroRestfulHelper } from 'ng-restful-client';
// @Resources('business')
let DemoService = class DemoService extends ZorroRestfulHelper {
    constructor(injector, message, router, userService, cacheService, translate) {
        super(injector);
        this.injector = injector;
        this.message = message;
        this.router = router;
        this.userService = userService;
        this.cacheService = cacheService;
        this.translate = translate;
        this.restfulClient = new RestfulHelper(this.injector);
    }
    login_token(body) { }
    agreement1() { }
    set_admin(body) { }
    get_user_info(params) { }
    delete_business(requestParams) { }
    edit_business_user(params, body) { }
};
__decorate([
    POST('connect/token', {
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    })
], DemoService.prototype, "login_token", null);
__decorate([
    POST('api/app/user/agree')
], DemoService.prototype, "agreement1", null);
__decorate([
    POST('api/app/user/setAdmin')
], DemoService.prototype, "set_admin", null);
__decorate([
    GET('api/app/user/info')
], DemoService.prototype, "get_user_info", null);
__decorate([
    DELETE('/{id}')
], DemoService.prototype, "delete_business", null);
__decorate([
    PUT('/user')
], DemoService.prototype, "edit_business_user", null);
DemoService = __decorate([
    Resources(CUSTOMED_RESOURCE),
    Injectable({
        providedIn: 'root',
    })
], DemoService);
export { DemoService };
//# sourceMappingURL=http-demo-service.js.map