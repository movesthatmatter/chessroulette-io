"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
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
        return new ts_async_results_1.AsyncResultWrapper(function () { return __awaiter(_this, void 0, void 0, function () {
            var data, responseAsResultCodec, result, error, error, e_1, error_1, error;
            return __generator(this, function (_a) {
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