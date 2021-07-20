import * as io from 'io-ts';
export declare const vendorsAuthenticationRedirectUrlResponsePayload: io.TypeC<{
    redirectUrl: io.StringC;
}>;
export declare type VendorsAuthenticationRedirectUrlPayload = io.TypeOf<typeof vendorsAuthenticationRedirectUrlResponsePayload>;
export declare const verifyUserRequestPayload: io.TypeC<{
    token: io.StringC;
}>;
export declare type VerifyUserRequestPayload = io.TypeOf<typeof verifyUserRequestPayload>;
