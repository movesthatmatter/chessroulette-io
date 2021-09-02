import * as io from 'io-ts';
import { chessGameState } from '../';
import { gameRecord, vendorData } from '../records/gameRecord';

export const lichessGameJoinRequestPayload = io.type({
  kind: io.literal('lichessGameJoinRequest'),
  content: io.type({
    game: chessGameState,
    vendorData: vendorData,
  }),
});

export const lichessGameUpdateRequestPayload = io.type({
  kind: io.literal('lichessGameUpdateRequest'),
  content: io.type({
    game: gameRecord,
  }),
});

export const lichessGameRequestPayloads = io.union([
  lichessGameJoinRequestPayload,
  lichessGameUpdateRequestPayload,
]);

export type LichessGameJoinRequestPayload = io.TypeOf<typeof lichessGameJoinRequestPayload>;

export type LichessGameUpdateRequestPayload = io.TypeOf<typeof lichessGameUpdateRequestPayload>;

export type LichessGameRequestPayloads = io.TypeOf<typeof lichessGameRequestPayloads>;
