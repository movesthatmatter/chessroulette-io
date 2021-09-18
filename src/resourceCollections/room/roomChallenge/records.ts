import * as io from 'io-ts';
import { baseCreateChallengeRequest } from '../../../payloads';
import { roomChallengeRecord } from '../../../records/roomChallenge';
import { roomRecord } from '../../../records/roomRecord';

export const createRequest = io.intersection([
  baseCreateChallengeRequest,
  io.type({
    roomId: io.string,
  }),
]);
export type CreateRequest = io.TypeOf<typeof createRequest>;

export const updateRequest = io.type({
  challengeId: io.string,
  roomId: io.string,
  userId: io.string,
});
export type UpdateRequest = io.TypeOf<typeof updateRequest>;

export const createOrUpdateResponse = io.type({
  challenge: roomChallengeRecord,
  room: roomRecord,
});
export type CreateOrUpdateResponse = io.TypeOf<typeof createOrUpdateResponse>;
