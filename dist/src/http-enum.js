export var ContentType;
(function (ContentType) {
    // response ContentType
    ContentType["HTML"] = "text/html";
    ContentType["TEXT"] = "text/plain";
    ContentType["XML_TEXT"] = "text/xml";
    ContentType["GIF"] = "image/gif";
    ContentType["JPEG"] = "image/jpeg";
    ContentType["PNG"] = "image/png";
    // request contentType
    ContentType["XHTML"] = "application/xhtml+xml";
    ContentType["XML"] = "application/xml";
    ContentType["ATOM_XML"] = "application/atom+xml";
    ContentType["JSON"] = "application/json;charset=UTF-8";
    ContentType["PDF"] = "application/pdf";
    ContentType["MS_WORD"] = "application/msword";
    ContentType["OCTET_STREAM"] = "application/octet-stream";
    ContentType["FORM"] = "application/x-www-form-urlencoded;charset=UTF-8";
})(ContentType || (ContentType = {}));
export var RestfulClientState;
(function (RestfulClientState) {
    RestfulClientState[RestfulClientState["CUSTOMED_RESOURCE"] = 0] = "CUSTOMED_RESOURCE";
})(RestfulClientState || (RestfulClientState = {}));
//# sourceMappingURL=http-enum.js.map