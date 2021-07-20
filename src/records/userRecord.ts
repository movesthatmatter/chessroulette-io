import * as io from 'io-ts';
import { country } from './locationRecords';

const basicUserInfoRecord = io.type({
  id: io.string,
  firstName: io.string,
  lastName: io.string,
  avatarId: io.string,
  // Add any other pertinent details here if needed!

  // @deprecate in favor of the more explicit first/last name
  name: io.string,
});

export const guestUserInfoRecord = io.intersection([
  basicUserInfoRecord,
  io.type({
    isGuest: io.literal(true),
  }),
]);

export const registeredUserInfoRecord = io.intersection([
  basicUserInfoRecord,
  io.type({
    isGuest: io.literal(false),
    profilePicUrl: io.union([io.string, io.undefined]),
    username: io.string,
    country: io.union([country, io.undefined]),
  }),
]);

export const userInfoRecord = io.union([guestUserInfoRecord, registeredUserInfoRecord]);
export type UserInfoRecord = io.TypeOf<typeof userInfoRecord>;

export const userExternalAccountRecord = io.type({
  userId: io.union([io.undefined, io.string]),
});

export type UserExternalAccountRecord = io.TypeOf<typeof userExternalAccountRecord>;

export const userExternalAccountByVendorMap = io.type({
  facebook: io.union([io.undefined, userExternalAccountRecord]),
  lichess: io.union([io.undefined, userExternalAccountRecord]),
  twitch: io.union([io.undefined, userExternalAccountRecord]),
});

export type UserExternalAccountByVendorMap = io.TypeOf<typeof userExternalAccountByVendorMap>;

export const registeredUserRecord = io.intersection([
  registeredUserInfoRecord,
  io.type({
    email: io.string,
    externalAccounts: io.union([io.undefined, userExternalAccountByVendorMap]),
  }),
]);

export type RegisteredUserRecord = io.TypeOf<typeof registeredUserRecord>;

export const guestUserRecord = io.intersection([
  guestUserInfoRecord,
  io.type({
    // ServerId - This is needed to be able to maintain stale/fresh guests
    //  when the server flushes the DB
    sid: io.string,
  }),
]);

export type GuestUserRecord = io.TypeOf<typeof guestUserRecord>;

export const userRecord = io.union([registeredUserRecord, guestUserRecord]);

export type UserRecord = io.TypeOf<typeof userRecord>;
