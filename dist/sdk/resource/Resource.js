"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
var tslib_1 = require("tslib");
var io = require("io-ts");
var io_1 = require("../io");
var ts_results_1 = require("ts-results");
var ts_async_results_1 = require("ts-async-results");
var errors_1 = require("./errors");
var util_1 = require("./util");
var responseAsOkResult = function (data) { return io.type({
    ok: io.literal(true),
    data: data,
}); };
var responseAsErrResult = function (error) { return io.type({
    ok: io.literal(false),
    error: error,
}); };
var responseAsResult = function (ok, customErr) { return io.union([
    ok,
    io.union([
        responseAsErrResult(errors_1.commonResponseErrors),
        customErr,
    ]),
]); };
var Resource = /** @class */ (function () {
    function Resource(requestPayloadCodec, responseOkPayloadCodec, responseErrPayloadCodec) {
        var _this = this;
        if (responseErrPayloadCodec === void 0) { responseErrPayloadCodec = errors_1.badRequestError; }
        this.requestPayloadCodec = requestPayloadCodec;
        this.responseOkPayloadCodec = responseOkPayloadCodec;
        this.responseErrPayloadCodec = responseErrPayloadCodec;
        this.getResponseError = function (e) {
            var customErrorResult = io_1.toResult(responseAsErrResult(_this.allPossibleErrorsCodec).decode(e));
            if (!customErrorResult.ok) {
                return new ts_results_1.Err({
                    type: 'BadErrorEncodingError',
                    content: undefined,
                });
            }
            return new ts_results_1.Err(customErrorResult.val.error);
        };
        // TODO: This for now doesn't return the correct one when no errResponse given!
        this.isResponseError = function (e) { return util_1.isPayloadOfCodec(_this.responseErrPayloadCodec, e); };
        this.isBadEncodingError = util_1.isBadEncodingError;
        this.isResourceFailureHandledError = util_1.isResourceFailureHandledError;
        this.isBadRequestError = util_1.isBadRequestError;
    }
    Object.defineProperty(Resource.prototype, "allPossibleErrorsCodec", {
        get: function () {
            return io.union([errors_1.commonResponseErrors, this.responseErrPayloadCodec]);
        },
        enumerable: false,
        configurable: true
    });
    Resource.prototype.request = function (requestPayload, senderFn) {
        var _this = this;
        return new ts_async_results_1.AsyncResultWrapper(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var data, responseAsResultCodec, result, error, error, e_1, error_1, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, senderFn(requestPayload)];
                    case 1:
                        data = (_a.sent()).data;
                        responseAsResultCodec = responseAsResult(io.type({
                            ok: io.literal(true),
                            data: this.responseOkPayloadCodec,
                        }), io.type({
                            ok: io.literal(false),
                            error: this.allPossibleErrorsCodec,
                        }));
                        result = io_1.toResult(responseAsResultCodec.decode(data));
                        if (!result.ok) {
                            error = new ts_results_1.Err({
                                type: 'BadEncodingError',
                                content: undefined,
                            });
                            console.error('[Resource].request() BadEncodingError', error);
                            console.info('  [Resource].request() BadEncodingError > Result', result);
                            return [2 /*return*/, error];
                        }
                        if (!result.val.ok) {
                            error = this.getResponseError(result.val);
                            console.error('[Resource].request() Response Error', error);
                            console.info('  [Resource].request() Response Error > Result', result);
                            return [2 /*return*/, error];
                        }
                        return [2 /*return*/, new ts_results_1.Ok(result.val.data)];
                    case 2:
                        e_1 = _a.sent();
                        // TODO: This is tied to the AXIOS payload, which isn't good!
                        //  It should at most use fetch or have it dynamically loaded by the requester somehow
                        //  Or somehow adhere to a certin interface!
                        if (e_1.response) {
                            error_1 = this.getResponseError(e_1.response.data);
                            console.error('[Resource].request() Response Error', error_1);
                            console.info('[Resource].request() Response Error Object', e_1);
                            return [2 /*return*/, error_1];
                        }
                        error = new ts_results_1.Err({
                            type: 'BadRequestError',
                            content: undefined,
                        });
                        console.error('[Resource].request() BadRequestError', error);
                        console.info('[Resource].request() BadRequestError', error);
                        return [2 /*return*/, error];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Resource.prototype.parseRequest = function (data) {
        return new ts_async_results_1.AsyncResultWrapper(io_1.toResult(this.requestPayloadCodec.decode(data))
            .mapErr(function (e) { return ({
            type: 'BadRequestError',
            content: e,
        }); }));
    };
    Resource.prototype.respond = function (data, senderFn) {
        // TODO: Should we serialize/encode the data before sending?
        senderFn({
            ok: true,
            data: data,
        });
    };
    Resource.prototype.fail = function (error, senderFn) {
        try {
            // TODO: Should we serialize/encode the data before sending?
            senderFn({
                ok: false,
                error: error,
            });
            return new ts_async_results_1.AsyncErr({
                type: 'ResourceFailureHandled',
                content: undefined,
            });
        }
        catch (e) {
            return new ts_async_results_1.AsyncErr(error);
        }
    };
    return Resource;
}());
exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map