import * as io from 'io-ts';
import { externalUserRecord } from '../records/externalVendorsRecords';
import { guestUserRecord } from '../records/userRecord';
import {
  errHttpResponsePayload,
  httpResponsePayload,
  okHttpResponsePayload,
  httpInputValidationError,
  formModel,
  httpGenericError,
  httpRequestPayloadFromProps,
  okHttpResponsePayloadFromProps,
  httpCustomTypeErrorFromProps,
} from '../sdk/http';

// @Deprecate All in Favor of the Authentication Resource Collection

// Check if User exists/ Attempts to Authenticate automatically if exists
export const externalVendor = io.keyof({
  facebook: null,
  lichess: null,
  twitch: null,
});
export type ExternalVendor = io.TypeOf<typeof externalVendor>;

// Deprecate User Check in favor of Resource

export const userCheckInternalAccountRequestPayload = httpRequestPayloadFromProps({
  type: io.literal('internal'),
  email: io.string,
  verificationCode: io.string, // This is the code sent in the Email
});
export type UserCheckInternalAccountRequestPayload = io.TypeOf<
  typeof userCheckInternalAccountRequestPayload
>;

export const userCheckExternalAccountRequestPayload = httpRequestPayloadFromProps({
  type: io.literal('external'),
  vendor: externalVendor,
  accessToken: io.string,
});
export type UserCheckExternalAccountRequestPayload = io.TypeOf<
  typeof userCheckExternalAccountRequestPayload
>;

export const userCheckRequestPayload = io.union([
  userCheckInternalAccountRequestPayload,
  userCheckExternalAccountRequestPayload,
]);
export type UserCheckRequestPayload = io.TypeOf<typeof userCheckRequestPayload>;

export const userCheckVerificationFailedResponsePayload = errHttpResponsePayload(
  httpCustomTypeErrorFromProps({
    status: io.literal('VerificationFailed'),
  })
);
export type UserCheckVerificationFailedResponsePayload = io.TypeOf<
  typeof userCheckVerificationFailedResponsePayload
>;

export const userCheckInexitentUserResponsePayloadData = io.type({
  status: io.literal('InexistentUser'),
  external: io.union([
    io.undefined,
    io.type({
      vendor: externalVendor,
      user: externalUserRecord,
    }),
  ]),
});
export type UserCheckInexitentUserResponsePayloadData = io.TypeOf<
  typeof userCheckInexitentUserResponsePayloadData
>;

export const userCheckExistentUserResponsePayloadData = io.type({
  status: io.literal('ExistentUser'),
  accessToken: io.string,
});
export type UserCheckExistentUserResponsePayloadData = io.TypeOf<
  typeof userCheckExistentUserResponsePayloadData
>;

export const userCheckResponsePayload = httpResponsePayload(
  okHttpResponsePayload(
    io.union([userCheckInexitentUserResponsePayloadData, userCheckExistentUserResponsePayloadData])
  ),
  userCheckVerificationFailedResponsePayload
);
export type UserCheckResponsePayload = io.TypeOf<typeof userCheckResponsePayload>;

// Email Verification

const verifyEmailModel = formModel({
  email: io.string,
});

export const verifyEmailRequestPayload = httpRequestPayloadFromProps(verifyEmailModel);
export type VerifyEmailRequestPayload = io.TypeOf<typeof verifyEmailRequestPayload>;

export const verifyEmailResponsePayload = httpResponsePayload(
  okHttpResponsePayload(io.undefined),
  errHttpResponsePayload(io.union([httpInputValidationError(verifyEmailModel), httpGenericError()]))
);

// export const verifyEmailResponsePayload = io.undefined;
export type VerifyEmailResponsePayload = io.TypeOf<typeof verifyEmailResponsePayload>;

// Registration - In case the User Check came negative

const createUserAccountModel = formModel({
  email: io.string,
  firstName: io.string,
  lastName: io.string,
  username: io.string,
  external: io.union([
    io.undefined,
    io.type({
      vendor: externalVendor,
      accessToken: io.string,
    }),
  ]),
});

export const createUserAccountRequestPayload = httpRequestPayloadFromProps(createUserAccountModel);
export type CreateUserAccountRequestPayload = io.TypeOf<typeof createUserAccountRequestPayload>;

export const createUserAccountResponsePayload = httpResponsePayload(
  okHttpResponsePayloadFromProps({
    // user: userRecord, // TODO: See if this is needed in this call - it's for ease of access at this point
    accessToken: io.string,
  }),
  errHttpResponsePayload(
    io.union([httpInputValidationError(createUserAccountModel), httpGenericError()])
  )
);
export type CreateUserAccountResponsePayload = io.TypeOf<typeof createUserAccountResponsePayload>;

export const guestAuthenticationRequestPayload = httpRequestPayloadFromProps({
  guestUser: io.union([guestUserRecord, io.undefined, io.null]),
});
export type GuestAuthenticationRequestPayload = io.TypeOf<typeof guestAuthenticationRequestPayload>;

export const guestAuthenticationResponsePayload = okHttpResponsePayloadFromProps({
  guest: guestUserRecord,
});
export type GuestAuthenticationResponsePayload = io.TypeOf<
  typeof guestAuthenticationResponsePayload
>;
