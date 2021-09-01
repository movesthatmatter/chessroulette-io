import * as io from 'io-ts';
import { gameRecord } from '../records/gameRecord';

export const lichessGameJoinRequest = io.type({
  kind: io.literal('lichessGameJoinRequest'),
  content: io.type({
    game: gameRecord,
  }),
});

export const lichessGameUpdateRequest = io.type({
  kind: io.literal('lichessGameUpdateRequest'),
  content: io.type({
    id: io.string,
    game: gameRecord,
  }),
});

export const lichessGameRequestPayloads = io.union([
  lichessGameJoinRequest,
  lichessGameUpdateRequest,
]);

export type LichessGameJoinRequest = io.TypeOf<typeof lichessGameJoinRequest>;

export type LichessGameUpdateRequest = io.TypeOf<typeof lichessGameUpdateRequest>;

export type LichessGameRequestPayloads = io.TypeOf<typeof lichessGameRequestPayloads>;
