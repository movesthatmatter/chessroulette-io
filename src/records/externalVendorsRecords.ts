import * as io from 'io-ts';
import { lichessUserRecord } from './lichessRecords';
import { facebookUserRecord } from './facebookRecords';
import { twitchUserRecord } from './twitchRecords';

export const externalUserRecord = io.union([
  lichessUserRecord,
  facebookUserRecord,
  twitchUserRecord,
]);

export type ExternalUserRecord = io.TypeOf<typeof externalUserRecord>;
