import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let HttpCacheService = class HttpCacheService {
    constructor() {
        this.cacheMap = new Map();
    }
    get_cache(key, requestStr) {
        var _a;
        return (_a = this.cacheMap.get(key)) === null || _a === void 0 ? void 0 : _a.get(requestStr);
    }
    set_cache(key, requestStr, value) {
        var _a;
        if (this.cacheMap.get(key)) {
            (_a = this.cacheMap.get(key)) !== null && _a !== void 0 ? _a : new Map().set(requestStr, value);
        }
        else {
            this.cacheMap.set(key, new Map().set(requestStr, value));
        }
    }
};
HttpCacheService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], HttpCacheService);
export { HttpCacheService };
//# sourceMappingURL=http-cache.service.js.map