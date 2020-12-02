import { __decorate, __param } from "tslib";
import { RestfulClient } from '../restful-client';
import { Inject, Injector } from '@angular/core';
let RestfulHelper = class RestfulHelper extends RestfulClient {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.rootUrl = window.globalConfig.rootUrl;
        this.httpTimeout = 5000;
        this.header = {
            'Accept-Language': 'en-US',
        };
    }
    onHttpTimeout(error) { }
    onHttpError(error, method, path, options) { }
    onHttpRespond(res) { }
    onDefaultSuccessNotice(res) { }
};
RestfulHelper = __decorate([
    __param(0, Inject(Injector))
], RestfulHelper);
export { RestfulHelper };
//# sourceMappingURL=ng-restful-helper.js.map