import * as io from 'io-ts';
import { lichessUserRecord } from './lichessRecords';
import { facebookUserRecord } from './facebookRecords';
import { twitchUserRecord } from './twitchRecords';

export const externalUserRecord = io.union([
  lichessUserRecord,
  facebookUserRecord,
  twitchUserRecord,
]);

export const twitchExternalUserRecord = io.type({
  vendor: io.literal('twitch'),
  user: twitchUserRecord,
  accessToken: io.string,
});

export const lichessExternalUserRecord = io.type({
  vendor: io.literal('lichess'),
  user: lichessUserRecord,
  accessToken: io.string,
});

export const facebookExternalUserRecord = io.type({
  vendor: io.literal('facebook'),
  user: facebookUserRecord,
  accessToken: io.string,
});

export type ExternalUserRecord = io.TypeOf<typeof externalUserRecord>;

export type TwitchExternalUserRecord = io.TypeOf<typeof twitchExternalUserRecord>;

export type LichessExternalUserRecord = io.TypeOf<typeof lichessExternalUserRecord>;

export type FacebookExternalUserRecord = io.TypeOf<typeof facebookExternalUserRecord>;
