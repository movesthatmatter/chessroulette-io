import * as io from 'io-ts';
import { lichessUserRecord } from './lichessRecords';
import { facebookUserRecord } from './facebookRecords';
import { twitchUserRecord } from './twitchRecords';

export const twitchExternalVendorRecord = io.type({
  vendor: io.literal('twitch'),
  user: twitchUserRecord,
  accessToken: io.string,
});
export type TwitchExternalVendorRecord = io.TypeOf<typeof twitchExternalVendorRecord>;

export const lichessExternalVendorRecord = io.type({
  vendor: io.literal('lichess'),
  user: lichessUserRecord,
  accessToken: io.string,
});
export type LichessExternalVendorRecord = io.TypeOf<typeof lichessExternalVendorRecord>;

export const facebookExternalVendorRecord = io.type({
  vendor: io.literal('facebook'),
  user: facebookUserRecord,
  accessToken: io.string,
});
export type FacebookExternalVendorRecord = io.TypeOf<typeof facebookExternalVendorRecord>;

export const externalVendorRecord = io.union([
  twitchExternalVendorRecord,
  lichessExternalVendorRecord,
  facebookExternalVendorRecord,
]);
export type ExternalVendorRecord = io.TypeOf<typeof externalVendorRecord>;
