import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';
import {
  ChessGameState,
  chessGameState,
  chessGameStateFinished,
  chessGameStateNeverStarted,
  chessGameStatePending,
  chessGameStateStarted,
  chessGameStateStopped,
} from '../chessGame';

export const vendorData = io.type({
  vendor: io.literal('lichess'),
  gameId: io.string,
  playerId: io.string,
  userRating: io.number,
});

export type GameVendorData = io.TypeOf<typeof vendorData>;

export const gameRecord = io.intersection([
  chessGameState,
  io.type({
    id: io.string,
    createdAt: isoDateTimeFromIsoString,
    updatedAt: isoDateTimeFromIsoString,
  }),
  io.union([
    io.type({
      isVendorGame: io.literal(true),
      vendorData: vendorData,
    }),
    io.partial({
      isVendorGame: io.undefined,
      vendorData: io.undefined,
    }),
  ]),
]);

export type GameRecord = io.TypeOf<typeof gameRecord>;

export const gameRecordFromGameState = <TCodec extends io.Mixed>(gameStateCodec: TCodec) =>
  io.intersection([
    gameStateCodec,
    io.type({
      id: io.string,
      createdAt: isoDateTimeFromIsoString,
      updatedAt: isoDateTimeFromIsoString,
    }),
  ]);

export type GameRecordFromGameState<GameState extends ChessGameState> = GameRecord & GameState;

export const gameRecordPending = gameRecordFromGameState(chessGameStatePending);
export type GameRecordPending = io.TypeOf<typeof gameRecordPending>;

export const gameRecordStarted = gameRecordFromGameState(chessGameStateStarted);
export type GameRecordStarted = io.TypeOf<typeof gameRecordStarted>;

export const gameRecordNeverStarted = gameRecordFromGameState(chessGameStateNeverStarted);
export type GameRecordNeverStarted = io.TypeOf<typeof gameRecordNeverStarted>;

export const gameRecordStopped = gameRecordFromGameState(chessGameStateStopped);
export type GameRecordStopped = io.TypeOf<typeof gameRecordStopped>;

export const gameRecordFinished = gameRecordFromGameState(chessGameStateFinished);
export type GameRecordFinished = io.TypeOf<typeof gameRecordFinished>;

export const gameRecordWithoutPlayerInfo = io.intersection([
  gameRecord,
  io.type({
    players: io.string,
  }),
]);

export type GameRecordWithoutPlayerInfo = io.TypeOf<typeof gameRecordWithoutPlayerInfo>;
