import { Resource } from './Resource';
import { FormModelKeysMap } from '../../sdk/http';
import * as io from 'io-ts';
export declare type RequestOf<R extends Resource<any, any, any>> = io.TypeOf<R['requestPayloadCodec']>;
export declare type OkResponseOf<R extends Resource<any, any, any>> = io.TypeOf<R['responseOkPayloadCodec']>;
export declare type ErrResponseOf<R extends Resource<any, any, any>> = io.TypeOf<R['responseErrPayloadCodec']>;
export declare type ResponseOf<R extends Resource<any, any, any>> = OkResponseOf<R> | ErrResponseOf<R>;
export declare const isPayloadOfCodec: <C extends io.Mixed>(c: C, payload: unknown) => payload is io.TypeOf<C>;
export declare const isResourceFailureHandledError: (e: unknown) => e is {
    type: "ResourceFailureHandled";
    content: undefined;
};
export declare const isBadEncodingError: (e: unknown) => e is {
    type: "BadEncodingError";
    content: undefined;
};
export declare const isBadRequestError: (e: unknown) => e is {
    type: "BadRequestError";
    content: undefined;
};
export declare const emptyRequest: io.UnionC<[io.UndefinedC, io.NullC, io.VoidC, io.TypeC<{}>]>;
export declare const getValidationErrorCodec: <M extends {
    [key: string]: io.StringC | io.Mixed | io.NumberC;
}>(model: M) => io.TypeC<{
    type: io.LiteralC<"ValidationErrors">;
    content: io.TypeC<{
        fields: io.PartialC<Record<keyof M, io.UnionC<[io.StringC, io.UndefinedC]>>>;
    }>;
}>;
export declare type ValidationError<M extends FormModelKeysMap> = {
    type: 'ValidationErrors';
    content: {
        fields: {
            [k in keyof M]: string | undefined;
        };
    };
};
export declare const withPaginatorResponse: <TCodec extends io.Mixed>(codec: TCodec) => io.TypeC<{
    items: io.ArrayC<TCodec>;
    itemsTotal: io.NumberC;
    currentIndex: io.NumberC;
}>;
declare type PaginatorWitoutItems = Omit<io.TypeOf<ReturnType<typeof withPaginatorResponse>>, 'items'>;
export declare type PaginatedResponse<TType> = PaginatorWitoutItems & {
    items: TType[];
};
export {};
