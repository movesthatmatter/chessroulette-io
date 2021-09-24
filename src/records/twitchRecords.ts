import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';

export const twitchUserRecord = io.type({
  id: io.string,
  email: io.string,
  displayName: io.string,
  profileImageUrl: io.string,
  createdAt: isoDateTimeFromIsoString,
});

export type TwitchUserRecord = io.TypeOf<typeof twitchUserRecord>;

export const leadRegistrationTwitchVendorData = io.intersection([
  twitchUserRecord,
  io.type({
    accessToken: io.string,
  }),
]);

export type TwitchRecordWithAccessToken = io.TypeOf<typeof leadRegistrationTwitchVendorData>;
