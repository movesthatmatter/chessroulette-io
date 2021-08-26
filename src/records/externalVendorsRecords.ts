import * as io from 'io-ts';
import { lichessUserRecord } from './lichessRecords';
import { facebookUserRecord } from './facebookRecords';
import { twitchUserRecord } from './twitchRecords';

export const twitchExternalUserRecord = io.type({
  vendor: io.literal('twitch'),
  user: twitchUserRecord,
  accessToken: io.string,
});
export type TwitchExternalUserRecord = io.TypeOf<typeof twitchExternalUserRecord>;

export const lichessExternalUserRecord = io.type({
  vendor: io.literal('lichess'),
  user: lichessUserRecord,
  accessToken: io.string,
});
export type LichessExternalUserRecord = io.TypeOf<typeof lichessExternalUserRecord>;

export const facebookExternalUserRecord = io.type({
  vendor: io.literal('facebook'),
  user: facebookUserRecord,
  accessToken: io.string,
});
export type FacebookExternalUserRecord = io.TypeOf<typeof facebookExternalUserRecord>;

export const externalUserRecord = io.union([
  lichessUserRecord,
  facebookUserRecord,
  twitchUserRecord,
]);
export type ExternalUserRecord = io.TypeOf<typeof externalUserRecord>;
