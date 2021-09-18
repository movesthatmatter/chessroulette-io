import * as io from 'io-ts';
import { baseChallengeRecord } from './challengeRecord';

export const roomChallengeRecord = baseChallengeRecord;

export type RoomChallengeRecord = io.TypeOf<typeof roomChallengeRecord>;
