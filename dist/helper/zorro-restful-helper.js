import { __decorate, __param } from "tslib";
import { RestfulClient } from '../restful-client';
import { Inject, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
/**
 *  This helper is base on the .NET ABP Framework and NG-ZORRO UI Framwork, and it's works out of the box!
 *  Tips: This helper does not contain any header authentication scheme, such as token.
 */
let ZorroRestfulHelper = class ZorroRestfulHelper extends RestfulClient {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.messageService = this.injector.get(NzMessageService);
        this.rootUrl = window.globalConfig.rootUrl;
        this.httpTimeout = 5000;
        // apb框架restful接口前缀
        this.routerPrefix = 'api/app/';
        this.header = {
            'Accept-Language': 'zh-Hans',
        };
    }
    onHttpTimeout(error) {
        this.messageService.success('请求超时');
    }
    onHttpError(error, method, path, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const errorMsg = '服务器异常:';
        let errorMessage = (_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.error_description;
        errorMessage = !errorMessage
            ? (_d = (_c = (_b = error === null || error === void 0 ? void 0 : error.error) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : errorMsg + error.status : errorMessage;
        this.messageService.error(errorMessage + (((_f = (_e = error === null || error === void 0 ? void 0 : error.error) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.code) ? '(' + ((_h = (_g = error === null || error === void 0 ? void 0 : error.error) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.code) + ')' : ''));
    }
    onHttpRespond(res) { }
    onDefaultSuccessNotice(res) {
        this.messageService.success('操作成功');
    }
};
ZorroRestfulHelper = __decorate([
    __param(0, Inject(Injector))
], ZorroRestfulHelper);
export { ZorroRestfulHelper };
//# sourceMappingURL=zorro-restful-helper.js.map