import * as io from 'io-ts';
import { AsyncResultWrapper, AsyncErr } from 'ts-async-results';
import { CommonResponseErrors, BadRequestErrorCodec, ResourceFailureHandledError } from './errors';
declare type BaseRequestPayloadCodec = io.Mixed;
declare type BaseResponseOkPayloadCodec = io.Mixed;
declare type SingleBaseResponseErrPayloadCodec = io.TypeC<{
    type: any;
    content: any;
}>;
declare type BaseResponseErrPayloadCodec = SingleBaseResponseErrPayloadCodec | io.UnionC<[
    SingleBaseResponseErrPayloadCodec,
    SingleBaseResponseErrPayloadCodec,
    ...Array<SingleBaseResponseErrPayloadCodec>
]>;
declare const responseAsOkResult: <TDataCodec extends io.Mixed>(data: TDataCodec) => io.TypeC<{
    ok: io.LiteralC<true>;
    data: TDataCodec;
}>;
declare type ResponseAsOkResultCodec = ReturnType<typeof responseAsOkResult>;
declare type ResponseAsOkResult = io.TypeOf<ResponseAsOkResultCodec>;
declare const responseAsErrResult: <TErrCodec extends io.Mixed>(error: TErrCodec) => io.TypeC<{
    ok: io.LiteralC<false>;
    error: TErrCodec;
}>;
declare type ResponseAsErrResultCodec = ReturnType<typeof responseAsErrResult>;
declare type ResponseAsErrResult = io.TypeOf<ResponseAsErrResultCodec>;
export declare class Resource<RequestPayloadCodec extends BaseRequestPayloadCodec, ResponseOkPayloadCodec extends BaseResponseOkPayloadCodec, ResponseErrPayloadCodec extends BaseResponseErrPayloadCodec = BadRequestErrorCodec, RequestPayload = io.TypeOf<RequestPayloadCodec>, ResponseOkPayload = io.TypeOf<ResponseOkPayloadCodec>, ResponseErrPayload = io.TypeOf<ResponseErrPayloadCodec>> {
    requestPayloadCodec: RequestPayloadCodec;
    responseOkPayloadCodec: ResponseOkPayloadCodec;
    responseErrPayloadCodec: ResponseErrPayloadCodec;
    constructor(requestPayloadCodec: RequestPayloadCodec, responseOkPayloadCodec: ResponseOkPayloadCodec, responseErrPayloadCodec?: ResponseErrPayloadCodec);
    private get allPossibleErrorsCodec();
    request(requestPayload: RequestPayload, senderFn: (requestPayload: RequestPayload) => Promise<{
        data: unknown;
    }>): AsyncResultWrapper<ResponseOkPayload, {
        type: "BadRequestError";
        content: undefined;
    } | {
        type: "BadResponseError";
        content: undefined;
    } | {
        type: "ServerError";
        content: string | undefined;
    } | {
        type: "BadEncodingError";
        content: undefined;
    } | {
        type: "NetworkError";
        content: undefined;
    } | {
        type: "BadErrorEncodingError";
        content: undefined;
    } | ResponseErrPayload>;
    private getResponseError;
    parseRequest(data: unknown): AsyncResultWrapper<RequestPayload, {
        type: "BadRequestError";
        content: undefined;
    }>;
    respond(data: ResponseOkPayload, senderFn: (responseResult: ResponseAsOkResult) => void): void;
    fail(error: ResponseErrPayload | CommonResponseErrors, senderFn: (errPayload: ResponseAsErrResult) => void): AsyncErr<ResourceFailureHandledError | ResponseErrPayload | CommonResponseErrors>;
    isResponseError: (e: unknown) => e is ResponseErrPayload;
    isBadEncodingError: (e: unknown) => e is {
        type: "BadEncodingError";
        content: undefined;
    };
    isResourceFailureHandledError: (e: unknown) => e is {
        type: "ResourceFailureHandled";
        content: undefined;
    };
    isBadRequestError: (e: unknown) => e is {
        type: "BadRequestError";
        content: undefined;
    };
}
export {};
