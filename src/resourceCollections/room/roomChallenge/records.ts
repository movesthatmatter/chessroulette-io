import * as io from 'io-ts';
import { baseCreateChallengeRequest } from 'src/payloads';
import { roomChallengeRecord } from '../../../records/roomChallenge';
import { roomRecord } from '../../../records/roomRecord';

export const createRequest = baseCreateChallengeRequest;
export type CreateRRequest = io.TypeOf<typeof createRequest>;

export const updateRequest = io.type({
  challegeId: io.string,
  roomId: io.string,
  userId: io.string,
});
export type UpdateRequest = io.TypeOf<typeof updateRequest>;

export const createOrUpdateResponse = io.type({
  challenge: roomChallengeRecord,
  room: roomRecord,
});
export type CreateOrUpdateResponse = io.TypeOf<typeof createOrUpdateResponse>;
