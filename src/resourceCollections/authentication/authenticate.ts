import * as io from 'io-ts';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';
import { externalVendor } from '../../payloads';
import {
  facebookExternalUserRecord,
  lichessExternalUserRecord,
  twitchExternalUserRecord,
} from '../../records/externalVendorsRecords';

export namespace Authenticate {
  const internalAccountRequest = io.type({
    type: io.literal('internal'),
    email: io.string,
    verificationCode: io.string, // This is the code sent in the Email
  });

  const externalAccountRequest = io.type({
    type: io.literal('external'),
    vendor: externalVendor,
    accessToken: io.string,
  });

  const request = io.union([internalAccountRequest, externalAccountRequest]);

  const okResponseInexistentUser = io.type({
    status: io.literal('InexistentUser'),
    // This holds the actual information such as email, external user id, etc.
    verificationToken: io.string,
    external: io.union([
      io.undefined,
      lichessExternalUserRecord,
      twitchExternalUserRecord,
      facebookExternalUserRecord,
    ]),
  });

  const okResponseExistentUser = io.type({
    status: io.literal('ExistentUser'),
    accessToken: io.string,
  });

  // This means that an user wasn't found in our User Base based on
  //  the external user id, but one of it's external identifiers (only email for now)
  //  matches an existent user
  const okResponseInexistentExternalUserMatchesExistentUserEmail = io.type({
    status: io.literal('InexistentExternalUserMatchesExistentUser:Email'),
    email: io.string,
    vendor: externalVendor,
  });

  const okResponse = io.union([
    okResponseInexistentUser,
    okResponseExistentUser,
    okResponseInexistentExternalUserMatchesExistentUserEmail,
  ]);

  const errResponseVerificationFailed = io.type({
    type: io.literal('VerificationFailed'),
    content: io.undefined,
  });

  export const resource = new Resource(request, okResponse, errResponseVerificationFailed);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
