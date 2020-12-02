"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.ZorroRestfulHelper = exports.ResftulOptions = exports.DELETE = exports.POST = exports.PUT = exports.GET = exports.CacheRequest = exports.Resources = exports.CUSTOMED_RESOURCE = exports.RestfulClient = exports.RestfulClientState = exports.ContentType = exports.HttpCacheService = void 0;
var http_cache_service_1 = require("./dist/service/http-cache.service");
__createBinding(exports, http_cache_service_1, "HttpCacheService");
var http_enum_1 = require("./dist/http-enum");
__createBinding(exports, http_enum_1, "ContentType");
var http_enum_2 = require("./dist/http-enum");
__createBinding(exports, http_enum_2, "RestfulClientState");
var restful_client_1 = require("./dist/restful-client");
__createBinding(exports, restful_client_1, "RestfulClient");
__createBinding(exports, restful_client_1, "CUSTOMED_RESOURCE");
__createBinding(exports, restful_client_1, "Resources");
__createBinding(exports, restful_client_1, "CacheRequest");
__createBinding(exports, restful_client_1, "GET");
__createBinding(exports, restful_client_1, "PUT");
__createBinding(exports, restful_client_1, "POST");
__createBinding(exports, restful_client_1, "DELETE");
var restful_options_1 = require("./dist/restful-options");
__createBinding(exports, restful_options_1, "ResftulOptions");
var zorro_restful_helper_1 = require("./dist/helper/zorro-restful-helper");
__createBinding(exports, zorro_restful_helper_1, "ZorroRestfulHelper");
