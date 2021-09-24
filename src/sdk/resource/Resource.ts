import * as io from 'io-ts';
import { toResult } from '../io';
import { Err, Ok } from 'ts-results';
import { AsyncResultWrapper, AsyncErr } from 'ts-async-results';
import {
  badRequestError,
  commonResponseErrors,
  CommonResponseErrors,
  BadRequestErrorCodec,
  ResourceFailureHandledError,
  BadRequestError,
} from './errors';
import { isBadEncodingError, isBadRequestError, isPayloadOfCodec, isResourceFailureHandledError } from './util';


type BaseRequestPayloadCodec = io.Mixed;
type BaseResponseOkPayloadCodec = io.Mixed;

type SingleBaseResponseErrPayloadCodec = io.TypeC<{
  type: any;
  content: any;
}>;

type BaseResponseErrPayloadCodec = SingleBaseResponseErrPayloadCodec | io.UnionC<[
  SingleBaseResponseErrPayloadCodec,
  SingleBaseResponseErrPayloadCodec,
  ...Array<SingleBaseResponseErrPayloadCodec>
]>;

const responseAsOkResult = <TDataCodec extends io.Mixed>(data: TDataCodec) => io.type({
  ok: io.literal(true),
  data,
});
type ResponseAsOkResultCodec = ReturnType<typeof responseAsOkResult>;
type ResponseAsOkResult = io.TypeOf<ResponseAsOkResultCodec>;

const responseAsErrResult = <TErrCodec extends io.Mixed>(error: TErrCodec) => io.type({
  ok: io.literal(false),
  error,
});
type ResponseAsErrResultCodec = ReturnType<typeof responseAsErrResult>;
type ResponseAsErrResult = io.TypeOf<ResponseAsErrResultCodec>;

const responseAsResult = <
  TOkCodec extends ResponseAsOkResultCodec,
  TErrCodec extends ResponseAsErrResultCodec,
  >(
    ok: TOkCodec,
    customErr: TErrCodec
  ) => io.union([
    ok,
    io.union([
      responseAsErrResult(commonResponseErrors),
      customErr,
    ]),
  ]);

type ResponseAsResultCodec = ReturnType<typeof responseAsResult>;
type ResponseAsResult = io.TypeOf<ResponseAsResultCodec>;

export class Resource<
  RequestPayloadCodec extends BaseRequestPayloadCodec,
  ResponseOkPayloadCodec extends BaseResponseOkPayloadCodec,
  ResponseErrPayloadCodec extends BaseResponseErrPayloadCodec = BadRequestErrorCodec,
  RequestPayload = io.TypeOf<RequestPayloadCodec>,
  ResponseOkPayload = io.TypeOf<ResponseOkPayloadCodec>,
  ResponseErrPayload = io.TypeOf<ResponseErrPayloadCodec>,
  > {
  constructor(
    public requestPayloadCodec: RequestPayloadCodec,
    public responseOkPayloadCodec: ResponseOkPayloadCodec,
    public responseErrPayloadCodec: ResponseErrPayloadCodec = badRequestError as ResponseErrPayloadCodec,
  ) { }

  private get allPossibleErrorsCodec() {
    return io.union([commonResponseErrors, this.responseErrPayloadCodec])
  }

  request(
    requestPayload: RequestPayload,
    senderFn: (requestPayload: RequestPayload) => Promise<{ data: unknown }>,
  ) {
    return new AsyncResultWrapper<
      ResponseOkPayload,
      CommonResponseErrors | ResponseErrPayload
    >(async () => {
      try {
        const { data } = await senderFn(requestPayload);

        const responseAsResultCodec = responseAsResult(
          io.type({
            ok: io.literal(true),
            data: this.responseOkPayloadCodec,
          }),
          io.type({
            ok: io.literal(false),
            error: this.allPossibleErrorsCodec,
          }),
        );

        const result = toResult(responseAsResultCodec.decode(data));

        if (!result.ok) {
          const error = new Err({
            type: 'BadEncodingError',
            content: undefined,
          } as const);

          console.error('[Resource].request() BadEncodingError', error);
          console.info('  [Resource].request() BadEncodingError > Result', result);

          return error;
        }

        if (!result.val.ok) {
          const error = this.getResponseError(result.val);

          console.error('[Resource].request() Response Error', error);
          console.info('  [Resource].request() Response Error > Result', result);

          return error;
        }

        return new Ok(result.val.data);
      } catch (e) {
        // TODO: This is tied to the AXIOS payload, which isn't good!
        //  It should at most use fetch or have it dynamically loaded by the requester somehow
        //  Or somehow adhere to a certin interface!
        if (e.response) {
          const error = this.getResponseError(e.response.data);

          console.error('[Resource].request() Response Error', error);
          console.info('[Resource].request() Response Error Object', e);

          return error;
        }

        const error = new Err({
          type: 'BadRequestError',
          content: undefined,
        } as const);

        console.error('[Resource].request() BadRequestError', error);
        console.info('[Resource].request() BadRequestError', error);

        return error;
      }
    });
  }

  private getResponseError = (e: unknown): Err<CommonResponseErrors | ResponseErrPayload> => {
    const customErrorResult = toResult(responseAsErrResult(this.allPossibleErrorsCodec).decode(e))

    if (!customErrorResult.ok) {
      return new Err({
        type: 'BadErrorEncodingError',
        content: undefined,
      });
    }

    return new Err(customErrorResult.val.error);
  }

  parseRequest(data: unknown) {
    return new AsyncResultWrapper<RequestPayload, BadRequestError>(
      toResult<RequestPayload, io.Errors>(this.requestPayloadCodec.decode(data))
        .mapErr((e) => ({
          type: 'BadRequestError',
          content: e as unknown as undefined,
        })),
    );
  }

  respond(data: ResponseOkPayload, senderFn: (responseResult: ResponseAsOkResult) => void) {
    // TODO: Should we serialize/encode the data before sending?
    senderFn({
      ok: true,
      data,
    });
  }

  fail(
    error: ResponseErrPayload | CommonResponseErrors,
    senderFn: (errPayload: ResponseAsErrResult) => void,
  ): AsyncErr<ResourceFailureHandledError | ResponseErrPayload | CommonResponseErrors> {
    try {
      // TODO: Should we serialize/encode the data before sending?
      senderFn({
        ok: false,
        error,
      });

      return new AsyncErr({
        type: 'ResourceFailureHandled',
        content: undefined,
      });
    } catch (e) {
      return new AsyncErr(error);
    }
  }

  // TODO: This for now doesn't return the correct one when no errResponse given!
  isResponseError = (e: unknown): e is ResponseErrPayload => isPayloadOfCodec(this.responseErrPayloadCodec, e);

  isBadEncodingError = isBadEncodingError;
  isResourceFailureHandledError = isResourceFailureHandledError;
  isBadRequestError = isBadRequestError;

  // isErrorType(t, e) – a method that limits the possible types to the ones available by the resource instance
  //  this is better than the aboce (static) methods as they will be limited to only the ones available to the given instance
  //  be it given or common
}
