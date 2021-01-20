## NG-RESTFUL-ARS

A restful http request lib based on decorator of typescript in Angular.

[github page](https://github.com/string-lzc/ng-restful-ars) 



# Installation

``` shell
npm i ng-restful-ars -S
```



# Getting Started

The typescript version needs to support double question marks and optional chain proposals.

* The recommended version of typescript is over 3.7.5.



# Usage

Please refer to the [demo](https://github.com/string-lzc/ng-restful-ars/tree/main/src/demo) page.



1. First create a helper class(free class name e.g. RestfulHelper) to extend the RestfulClien, and then implement IRestfulClient interface.

```javascript
import { RestfulClient } from 'ng-restful-ars';
import { Inject, Injector } from '@angular/core';
import { IRestfulClient } from 'ng-restful-ars';

export class RestfulHelper extends RestfulClient implements IRestfulClient {
  // Your helper should inject an Injector in constructor.
  constructor(@Inject(Injector) public injector: Injector) {
    super(injector);
  }
  // rootUrl is required
  rootUrl = "https://www.api.com";
  httpTimeout = 5000;
  header = {
    'Accept-Language': 'en-US',
  };
  
  // the callback function is required
  onHttpTimeout(error: any): void {}
  onHttpError(error: any, method: string, path: string, options: any): void {}
  onHttpRespond(res: any) {}
  onDefaultSuccessNotice(res: any) {}
}

```

After the above helper is created, the global configuration of the network request is basically completed.


2. Use the helper in your service. Extend the RestfulHelper and import the HTTP METHOD(POST PUT GET DELETE). And add them as a decorator of the request function. 

```javascript
import { Injectable, Injector } from '@angular/core';
import { RestfulHelper } from './restful-helper';
import { Resources, POST, CUSTOMED_RESOURCE, GET, DELETE, PUT } from 'ng-restful-ars';
import { ZorroRestfulHelper } from 'ng-restful-ars';

// @Resources('business')
@Resources(CUSTOMED_RESOURCE)
@Injectable({
  providedIn: 'root',
})
export class DemoService extends RestfulHelper {
  constructor(
    public injector: Injector
  ) {
    super(injector);
  }

  @POST('connect/token', {
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  })
  login_token(body: any): any {}

  @POST('api/app/user/agree')
  agreement(): any {}

  @POST('api/app/user/setAdmin')
  set_admin(body: any): any {}

  @GET('api/app/user/info')
  get_user_info(params: any): any {}

  @DELETE('/{id}')
  delete_business(requestParams: any): any {}

  @PUT('/user')
  edit_business_user(params: any, body: any): any {}
}

```

the functions with ng-restful-ars decorator must Declare a return of any.

3. Use the service.

```javascript
this.demoService.agreement().subscribe(res => {
   // TODO 
});
```



# Supported http request form

* post()
* post(body)
* post(param)
* get()
* get(param)
* get(singleCase)
* put(param)
* put(param, body)
* put(singleCase, body)
* put(body)
* delete(param)
* delete(singleCase)

Notice: The `singleCase` means that the singleton parameter is placed in the URL in the requested address. E.g. 

```javascript
@GET('api/app/user/{id}') 
get_user_info(singleCase: string): any {}
```

The param of get_user_info() singleCase will be filled in the {id};



# Decorators

| NAME           | PARAMS                                   | DESC                                            |
| :------------- | :--------------------------------------- | ----------------------------------------------- |
| @ Resources    | businness: string \| RestfulClientState  | restful resource name or CUSTOMED_RESOURCE      |
| @ CacheRequest | requestList: Array<string>               | the request method name list you want to cache. |
| @POST          | router: string, options:  ResftulOptions | the post method                                 |
| @GET           | router: string, options:  ResftulOptions | the get method                                  |
| @PUT           | router: string, options:  ResftulOptions | the put method                                  |
| @DELETE        | router: string, options:  ResftulOptions | the delete method                               |



# ResftulOptions

The `RestfulOptions` is the second param of http method decorators.

| NAME                     | TYPE                  | DESC                                                         |
| ------------------------ | --------------------- | ------------------------------------------------------------ |
| contentType              | string \| ContentType | the content-type attr in request header                      |
| headers                  | Object                | request header                                               |
| showDefaultSuccessNotice | boolean               | whether to notify by default when the interface call is successful |

# Callbacks

the interface `IRestfulClient` ss to constrain the helper created by the user. The principle is to use the reflection mechanism in the parent class to call the function of the subclass as a callback function.

| ATTR \| METHOD                                               | DESC                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| rootUrl: string;                                             | the api url                                                  |
| onHttpTimeout(error: any): void;                             | Called when the request times out.                           |
| onHttpError(error: any, method: string, path: string, options: any): void; | Called when the server returns an error.                     |
| onHttpRespond(res);                                          | Called when the server response.                             |
| onDefaultSuccessNotice(res);                                 | When `showDefaultSuccessNotice` is set to true, the processing in the callback is executed. |






