import * as io from 'io-ts';
import { twitchUserRecord } from '../../records/twitchRecords';

export const verifyTwitchUserResponsePayload = io.type({
  user: twitchUserRecord,
});
export type VerifyTwitchUserResponsePayload = io.TypeOf<typeof verifyTwitchUserResponsePayload>;
