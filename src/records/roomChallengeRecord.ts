import * as io from 'io-ts';
import { baseChallengeRecord } from './challengeRecord';

export const roomChallengeRecord = io.intersection([
  baseChallengeRecord,
  io.type({ roomId: io.string }),
]);

export type RoomChallengeRecord = io.TypeOf<typeof roomChallengeRecord>;
