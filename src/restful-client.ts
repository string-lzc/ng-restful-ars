import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injector } from '@angular/core';
import { timeout, catchError, mergeMap } from 'rxjs/internal/operators';
import { of, Observable, OperatorFunction } from 'rxjs';
import { ContentType, RestfulClientState } from './http-enum';
import { ResftulOptions } from './restful-options';
import { HttpCacheService } from './service/http-cache.service';

export class RestfulClient {
  public constructor(@Inject(Injector) public injector: Injector) { }
  public httpClient = this.injector.get(HttpClient);
  public cacheService = this.injector.get(HttpCacheService);
  // http request header
  public header: any;

  // server/api url
  public rootUrl?: string;

  // http request timeout
  public httpTimeout = 5000;

  // Route prefix by the RESTFUL interface routing by the server.
  // For example: the router prefix is 'api/app' in the abp framework.
  public routerPrefix = 'api/app/';

  /**
   * @desc Get resful resource name.
   */
  protected getRestfulRecources(): any {}
  /**
   * @desc Get the service name of the cache.
   */
  protected getCacheRequest(): any {}
  /**
   * Callback functions
   */
  protected onHttpRespond?(error: any) {}
  protected onDefaultSuccessNotice?(rse: any) {}
  protected onHttpError?(error: any, method: string, path: string, options: any) {}
  protected onHttpTimeout?(error: any) {}
  /**
   * @desc Make http request using HttpClient of Angular.
   */
  protected makeHttpRequest(
    method: string,
    path: string,
    options: any,
    functionName: string,
    showDefaultSuccessNotice: boolean
  ): Observable<ArrayBuffer> {
    const cacheRequestList: Array<string> = this.getCacheRequest() ?? [];
    return (
      this.cacheService.get_cache(functionName, options?.params?.toString()) ??
      this.httpClient
        .request(method, path, options)
        .pipe(
          mergeMap((res: any) => {
            // tslint:disable-next-line: ban-types
            Reflect.apply(this['onHttpRespond'] as Function, this, [res]);
            if (showDefaultSuccessNotice) {
              // tslint:disable-next-line: ban-types
              Reflect.apply(this['onDefaultSuccessNotice'] as Function, this, [res]);
            }
            if (cacheRequestList.find((item) => item === functionName)) {
              this.cacheService.set_cache(
                functionName,
                options.params.toString(),
                of(res)
              );
            }
            return of(res ?? {});
          }),
          catchError((e: any) => {
            // tslint:disable-next-line: ban-types
            Reflect.apply(this['onHttpError'] as Function, this, [
              e,
              method,
              path,
              options,
            ]);
            return of(null);
          })
        )
        .pipe(
          timeout(this.httpTimeout) as OperatorFunction<ArrayBuffer | null, ArrayBuffer>,
          catchError((e: any) => {
            // tslint:disable-next-line: ban-types
            Reflect.apply(this['onHttpTimeout'] as Function, this, [e]);
            return of(null);
          })
        )
    );
  }
}

/**
 * @desc The router without any regular prefix
 */
export const CUSTOMED_RESOURCE = RestfulClientState.CUSTOMED_RESOURCE;

/**
 * @desc Annotation of restful api resource name.
 */
export function Resources(businness: string | RestfulClientState) {
  // tslint:disable-next-line: ban-types
  return function <TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getRestfulRecources = function () {
      return businness;
    };
    return Target;
  };
}

/**
 * @desc Annatation of cached request list
 */
export function CacheRequest(requestList: Array<string>) {
  // tslint:disable-next-line: ban-types
  return function <TFunction extends Function>(Target: TFunction): TFunction {
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
export let GET = function(
  router: string = '',
  options: any = new ResftulOptions()) {
    return function (target: any, methodName: string, desc: any) {
      const methods = desc.value;
      desc.value = function (params: any) {
        let requestUrl = this.rootUrl;
        const requestOptions = {
          headers: {
            ...this.header,
            ...options.headers,
          },
          params: new HttpParams({
            fromObject: params,
          })
        };
        requestUrl =
        this.rootUrl +
        this.routerPrefix +
        (this.getRestfulRecources() ?? '') +
        (router ?? '');
        if (
          this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE
        ) {
          requestUrl = this.rootUrl + (router ?? '');
        }

        if (requestUrl.indexOf('{') > -1 && requestUrl.indexOf('}') > -1) {
          delete requestOptions.params;
          if (!params) {
            console.error('Single-case request mode must contain parameters');
          }
          requestUrl = requestUrl.replace(/\{[^\)]*\}/g, params ? params.toString() : '');
        }
        const res = this.makeHttpRequest(
          'GET',
          requestUrl,
          requestOptions,
          methodName
        );
        methods.apply(this, [params]);
        return res;
      };
    };
};

/**
 * @desc  Annatation of POST request
 * @param router the api router
 * @param options the restful options
 */
export let POST = function (
  router: string = '',
  options: any = new ResftulOptions()
) {
  return function (target: any, methodName: string, desc: any) {
    const methods = desc.value;
    desc.value = function (body: any) {
      let requestUrl = this.rootUrl;
      const requestOptions = {
        headers: {
          ...this.header,
          ...options.headers,
        },
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
      (this.getRestfulRecources() ?? '') +
      (router ?? '');
      if (
        this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE
      ) {
        requestUrl = this.rootUrl + (router ?? '');
      }
      const res = this.makeHttpRequest(
        'POST',
        requestUrl,
        requestOptions,
        methodName
      );
      methods.apply(this, body);
      return res;
    };
  };
};

/**
 * @desc  Annatation of PUT request
 * @param router the api router
 * @param options the restful options
 */
export let PUT = function(
  router: string = '',
  options: any = new ResftulOptions()
  ) {
    return function (target: any, methodName: string, desc: any) {
      const methods = desc.value;
      desc.value = function (params: any, body?: any) {
        let requestUrl = this.rootUrl;
        const requestOptions = {
          headers: {
            ...this.header,
            ...options.headers,
          },
          params: new HttpParams({
            fromObject: params,
          }),
          body
        };
        requestUrl =
        this.rootUrl +
        this.routerPrefix +
        (this.getRestfulRecources() ?? '') +
        (router ?? '');
        if (
          this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE
        ) {
          requestUrl = this.rootUrl + (router ?? '');
        }

        if (requestUrl.indexOf('{') > -1 && requestUrl.indexOf('}') > -1) {
          delete requestOptions.params;
          if (!params) {
            console.error('Single-case request mode must contain parameters');
          }
          requestUrl = requestUrl.replace(/\{[^\)]*\}/g, params ? params.toString() : '');
        }
        const res = this.makeHttpRequest(
          'PUT',
          requestUrl,
          requestOptions,
          methodName
        );
        methods.apply(this, [params, body]);
        return res;
      };
    };
};

/**
 * @desc  Annatation of DELETE request
 * @param router the api router
 * @param options the restful options
 */
export let DELETE = function(
  router: string = '',
  options: any = new ResftulOptions()) {
    return function (target: any, methodName: string, desc: any) {
      const methods = desc.value;
      desc.value = function (params: any) {
        let requestUrl = this.rootUrl;
        const requestOptions = {
          headers: {
            ...this.header,
            ...options.headers,
          },
          params: new HttpParams({
            fromObject: params,
          })
        };
        requestUrl =
        this.rootUrl +
        this.routerPrefix +
        (this.getRestfulRecources() ?? '') +
        (router ?? '');
        if (
          this.getRestfulRecources() === RestfulClientState.CUSTOMED_RESOURCE
        ) {
          requestUrl = this.rootUrl + (router ?? '');
        }

        if (requestUrl.indexOf('{') > -1 && requestUrl.indexOf('}') > -1) {
          delete requestOptions.params;
          if (!params) {
            console.error('Single-case request mode must contain parameters');
          }
          requestUrl = requestUrl.replace(/\{[^\)]*\}/g, params ? params.toString() : '');
        }
        const res = this.makeHttpRequest(
          'DELETE',
          requestUrl,
          requestOptions,
          methodName
        );
        methods.apply(this, [params]);
        return res;
      };
    };
};
