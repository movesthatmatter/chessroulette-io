import * as io from 'io-ts';

export const vendorsAuthenticationRedirectUrlResponsePayload = io.type({
  redirectUrl: io.string,
});

export type VendorsAuthenticationRedirectUrlPayload = io.TypeOf<
  typeof vendorsAuthenticationRedirectUrlResponsePayload
>;

export const verifyUserRequestPayload = io.type({
  token: io.string,
});

export type VerifyUserRequestPayload = io.TypeOf<typeof verifyUserRequestPayload>;
