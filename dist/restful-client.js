import { __decorate, __param } from "tslib";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injector } from '@angular/core';
import { timeout, catchError, mergeMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { ContentType, RestfulClientState } from './http-enum';
import { ResftulOptions } from './restful-options';
import { HttpCacheService } from './service/http-cache.service';
let RestfulClient = class RestfulClient {
    constructor(injector) {
        this.injector = injector;
        this.httpClient = this.injector.get(HttpClient);
        this.cacheService = this.injector.get(HttpCacheService);
        // http request timeout
        this.httpTimeout = 5000;
        // Route prefix by the RESTFUL interface routing by the server.
        // For example: the router prefix is 'api/app' in the abp framework.
        this.routerPrefix = 'api/app/';
    }
    /**
     * @desc Get resful resource name.
     */
    getRestfulRecources() { }
    /**
     * @desc Get the service name of the cache.
     */
    getCacheRequest() { }
    /**
     * Callback functions
     */
    onHttpRespond(error) { }
    onDefaultSuccessNotice(rse) { }
    onHttpError(error, method, path, options) { }
    onHttpTimeout(error) { }
    /**
     * @desc Make http request using HttpClient of Angular.
     */
    makeHttpRequest(method, path, options, functionName, showDefaultSuccessNotice) {
        var _a, _b, _c;
        const cacheRequestList = (_a = this.getCacheRequest()) !== null && _a !== void 0 ? _a : [];
        return ((_c = this.cacheService.get_cache(functionName, (_b = options === null || options === void 0 ? void 0 : options.params) === null || _b === void 0 ? void 0 : _b.toString())) !== null && _c !== void 0 ? _c : this.httpClient
            .request(method, path, options)
            .pipe(mergeMap((res) => {
            // tslint:disable-next-line: ban-types
            Reflect.apply(this['onHttpRespond'], this, [res]);
            if (showDefaultSuccessNotice) {
                // tslint:disable-next-line: ban-types
                Reflect.apply(this['onDefaultSuccessNotice'], this, [res]);
            }
            if (cacheRequestList.find((item) => item === functionName)) {
                this.cacheService.set_cache(functionName, options.params.toString(), of(res));
            }
            return of(res !== null && res !== void 0 ? res : {});
        }), catchError((e) => {
            // tslint:disable-next-line: ban-types
            Reflect.apply(this['onHttpError'], this, [
                e,
                method,
                path,
                options,
            ]);
            return of(null);
        }))
            .pipe(timeout(this.httpTimeout), catchError((e) => {
            // tslint:disable-next-line: ban-types
            Reflect.apply(this['onHttpTimeout'], this, [e]);
            return of(null);
        })));
    }
};
RestfulClient = __decorate([
    __param(0, Inject(Injector))
], RestfulClient);
export { RestfulClient };
/**
 * @desc The router without any regular prefix
 */
export const CUSTOMED_RESOURCE = RestfulClientState.CUSTOMED_RESOURCE;
/**
 * @desc Annotation of restful api resource name.
 */
export function Resources(businness) {
    // tslint:disable-next-line: ban-types
    return function (Target) {
        Target.prototype.getRestfulRecources = function () {
            return businness;
        };
        return Target;
    };
}
/**
 * @desc Annatation of cached request list
 */
export function CacheRequest(requestList) {
    // tslint:disable-next-line: ban-types
    return function (Target) {
        Target.prototype.getCacheRequest = function () {
            return requestList;
        };
        return Target;
    };
}
/**
 * @desc  Annatation of GET request
 * @param router the api router
 * @param options the restful options
 */
export let GET = function (router = '', options = new ResftulOptions()) {
    return function (target, methodName, desc) {
        const methods = desc.value;
        desc.value = function (params) {
            var _a;
            let requestUrl = this.rootUrl;
            const requestOptions = {
                headers: Object.assign(Object.assign({}, this.header), options.headers),
                params: new HttpParams({
                    fromObject: params,
                })
            };
            requestUrl =
                this.rootUrl +
                    this.routerPrefix +
                    ((_a = this.getRestfulRecources()) !== null && _a !== void 0 ? _a : '') +
                    (router !== null && router !== void 0 ? router : '');
            if (this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE) {
                requestUrl = this.rootUrl + (router !== null && router !== void 0 ? router : '');
            }
            if (requestUrl.indexOf('{') > -1 && requestUrl.indexOf('}') > -1) {
                delete requestOptions.params;
                if (!params) {
                    console.error('Single-case request mode must contain parameters');
                }
                requestUrl = requestUrl.replace(/\{[^\)]*\}/g, params ? params.toString() : '');
            }
            try {
                const res = this.makeHttpRequest('GET', requestUrl, requestOptions, methodName);
                methods.apply(this, [params]);
                return res;
            }
            catch (error) {
                throw new Error("Target service does not inherit the RESTful Helper class");
            }
        };
    };
};
/**
 * @desc  Annatation of POST request
 * @param router the api router
 * @param options the restful options
 */
export let POST = function (router = '', options = new ResftulOptions()) {
    return function (target, methodName, desc) {
        const methods = desc.value;
        desc.value = function (body) {
            var _a;
            let requestUrl = this.rootUrl;
            const requestOptions = {
                headers: Object.assign(Object.assign({}, this.header), options.headers),
                body,
            };
            switch (options.contentType) {
                case ContentType.FORM:
                    requestOptions.body = new HttpParams({
                        fromObject: body,
                    });
                    break;
                // TODO: Other content-type needs to handle things
                default:
                    break;
            }
            requestUrl =
                this.rootUrl +
                    this.routerPrefix +
                    ((_a = this.getRestfulRecources()) !== null && _a !== void 0 ? _a : '') +
                    (router !== null && router !== void 0 ? router : '');
            if (this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE) {
                requestUrl = this.rootUrl + (router !== null && router !== void 0 ? router : '');
            }
            try {
                const res = this.makeHttpRequest('POST', requestUrl, requestOptions, methodName);
                methods.apply(this, body);
                return res;
            }
            catch (error) {
                throw new Error("Target service does not inherit the RESTful Helper class");
            }
        };
    };
};
/**
 * @desc  Annatation of PUT request
 * @param router the api router
 * @param options the restful options
 */
export let PUT = function (router = '', options = new ResftulOptions()) {
    return function (target, methodName, desc) {
        const methods = desc.value;
        desc.value = function (params, body) {
            var _a;
            let requestUrl = this.rootUrl;
            const requestOptions = {
                headers: Object.assign(Object.assign({}, this.header), options.headers),
                params: new HttpParams({
                    fromObject: params,
                }),
                body
            };
            requestUrl =
                this.rootUrl +
                    this.routerPrefix +
                    ((_a = this.getRestfulRecources()) !== null && _a !== void 0 ? _a : '') +
                    (router !== null && router !== void 0 ? router : '');
            if (this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE) {
                requestUrl = this.rootUrl + (router !== null && router !== void 0 ? router : '');
            }
            if (requestUrl.indexOf('{') > -1 && requestUrl.indexOf('}') > -1) {
                delete requestOptions.params;
                if (!params) {
                    console.error('Single-case request mode must contain parameters');
                }
                requestUrl = requestUrl.replace(/\{[^\)]*\}/g, params ? params.toString() : '');
            }
            try {
                const res = this.makeHttpRequest('PUT', requestUrl, requestOptions, methodName);
                methods.apply(this, [params, body]);
                return res;
            }
            catch (error) {
                throw new Error("Target service does not inherit the RESTful Helper class");
            }
        };
    };
};
/**
 * @desc  Annatation of DELETE request
 * @param router the api router
 * @param options the restful options
 */
export let DELETE = function (router = '', options = new ResftulOptions()) {
    return function (target, methodName, desc) {
        const methods = desc.value;
        desc.value = function (params) {
            var _a;
            let requestUrl = this.rootUrl;
            const requestOptions = {
                headers: Object.assign(Object.assign({}, this.header), options.headers),
                params: new HttpParams({
                    fromObject: params,
                })
            };
            requestUrl =
                this.rootUrl +
                    this.routerPrefix +
                    ((_a = this.getRestfulRecources()) !== null && _a !== void 0 ? _a : '') +
                    (router !== null && router !== void 0 ? router : '');
            if (this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE) {
                requestUrl = this.rootUrl + (router !== null && router !== void 0 ? router : '');
            }
            if (requestUrl.indexOf('{') > -1 && requestUrl.indexOf('}') > -1) {
                delete requestOptions.params;
                if (!params) {
                    console.error('Single-case request mode must contain parameters');
                }
                requestUrl = requestUrl.replace(/\{[^\)]*\}/g, params ? params.toString() : '');
            }
            try {
                const res = this.makeHttpRequest('DELETE', requestUrl, requestOptions, methodName);
                methods.apply(this, [params]);
                return res;
            }
            catch (error) {
                throw new Error("Target service does not inherit the RESTful Helper class");
            }
        };
    };
};
//# sourceMappingURL=restful-client.js.map