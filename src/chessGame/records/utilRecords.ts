import * as io from 'io-ts';
import { userInfoRecord } from '../../records/userRecord';

// Taken from chess.js

/**
 * - "p" for Pawn
 * - "n" for Knight
 * - "b" for Bishop
 * - "r" for Rook
 * - "q" for Queen
 * - "k" for King
 */
export const chessPieceType = io.keyof({
  p: undefined,
  n: undefined,
  b: undefined,
  r: undefined,
  q: undefined,
  k: undefined,
});
export type ChessPieceType = io.TypeOf<typeof chessPieceType>;

export const promotionalChessPieceType = io.keyof({
  n: undefined,
  b: undefined,
  r: undefined,
  q: undefined,
});
export type PromotionalChessPieceType = io.TypeOf<typeof promotionalChessPieceType>;

export const capturableChessPieceType = io.keyof({
  p: undefined,
  n: undefined,
  b: undefined,
  r: undefined,
  q: undefined,
});
export type CapturableChessPieceType = io.TypeOf<typeof capturableChessPieceType>;

export const chessSquare = io.keyof({
  a8: undefined,
  b8: undefined,
  c8: undefined,
  d8: undefined,
  e8: undefined,
  f8: undefined,
  g8: undefined,
  h8: undefined,
  a7: undefined,
  b7: undefined,
  c7: undefined,
  d7: undefined,
  e7: undefined,
  f7: undefined,
  g7: undefined,
  h7: undefined,
  a6: undefined,
  b6: undefined,
  c6: undefined,
  d6: undefined,
  e6: undefined,
  f6: undefined,
  g6: undefined,
  h6: undefined,
  a5: undefined,
  b5: undefined,
  c5: undefined,
  d5: undefined,
  e5: undefined,
  f5: undefined,
  g5: undefined,
  h5: undefined,
  a4: undefined,
  b4: undefined,
  c4: undefined,
  d4: undefined,
  e4: undefined,
  f4: undefined,
  g4: undefined,
  h4: undefined,
  a3: undefined,
  b3: undefined,
  c3: undefined,
  d3: undefined,
  e3: undefined,
  f3: undefined,
  g3: undefined,
  h3: undefined,
  a2: undefined,
  b2: undefined,
  c2: undefined,
  d2: undefined,
  e2: undefined,
  f2: undefined,
  g2: undefined,
  h2: undefined,
  a1: undefined,
  b1: undefined,
  c1: undefined,
  d1: undefined,
  e1: undefined,
  f1: undefined,
  g1: undefined,
  h1: undefined,
});
export type ChessSquare = io.TypeOf<typeof chessSquare>;

export const chessPlayerWhite = io.type({
  color: io.literal('white'),
  user: userInfoRecord,
});
export type ChessPlayerWhite = io.TypeOf<typeof chessPlayerWhite>;

export const chessPlayerBlack = io.type({
  color: io.literal('black'),
  user: userInfoRecord,
});
export type ChessPlayerBlack = io.TypeOf<typeof chessPlayerBlack>;

export const chessPlayer = io.union([chessPlayerBlack, chessPlayerWhite]);
export type ChessPlayer = io.TypeOf<typeof chessPlayer>;

export const chessPlayers = io.type({
  white: chessPlayerWhite,
  black: chessPlayerBlack,
});
export type ChessPlayers = io.TypeOf<typeof chessPlayers>;

export const chessColorWhite = io.keyof({ white: null });
export type ChessColorWhite = io.TypeOf<typeof chessColorWhite>;
export const chessColorBlack = io.keyof({ black: null });
export type ChessColorBlack = io.TypeOf<typeof chessColorBlack>;

export const chessGameColor = io.union([chessColorWhite, chessColorBlack]);
export type ChessGameColor = io.TypeOf<typeof chessGameColor>;

export const chessPreferredColorOption = io.union([
  chessColorBlack,
  chessColorWhite,
  io.keyof({ random: null }),
]);
export type ChessPrefferedColorOption = io.TypeOf<typeof chessPreferredColorOption>;

export const chessGameStateFen = io.string;
export type ChessGameStateFen = io.TypeOf<typeof chessGameStateFen>;

export const chessGameStatePgn = io.string;
export type ChessGameStatePgn = io.TypeOf<typeof chessGameStatePgn>;

export const chessGameTimeLimit = io.keyof({
  bullet30: null,
  bullet1: null,
  blitz2: null,
  blitz3: null,
  blitz5: null,
  rapid10: null,
  rapid15: null,
  rapid20: null,
  rapid30: null,
  rapid45: null,
  rapid60: null,
  untimed: null,
  // day: null,
});
export type ChessGameTimeLimit = io.TypeOf<typeof chessGameTimeLimit>;

export const chessPlayersBySide = io.union([
  io.type({
    home: chessPlayerWhite,
    away: chessPlayerBlack,
  }),
  io.type({
    home: chessPlayerBlack,
    away: chessPlayerWhite,
  }),
]);
export type ChessPlayersBySide = io.TypeOf<typeof chessPlayersBySide>;

export const partialChessPlayersBySide = io.union([
  io.type({
    home: chessPlayer,
    away: io.undefined,
  }),
  io.type({
    home: io.undefined,
    away: chessPlayer,
  }),
]);
export type PartialChessPlayersBySide = io.TypeOf<typeof partialChessPlayersBySide>;

export const chessGameDrawOffer = io.type({
  id: io.string,
  type: io.literal('draw'),
  content: io.type({
    gameId: io.string,
    byUser: userInfoRecord,
    toUser: userInfoRecord,

    // @deprecate in favor of the avove
    by: chessGameColor,
  }),
});
export type ChessGameDrawOffer = io.TypeOf<typeof chessGameDrawOffer>;

export const gameSpecsRecord = io.type({
  timeLimit: chessGameTimeLimit,
  preferredColor: chessPreferredColorOption,
});
export type GameSpecsRecord = io.TypeOf<typeof gameSpecsRecord>;

export const chessGameRematchOffer = io.type({
  id: io.string,
  type: io.literal('rematch'),
  content: io.type({
    gameId: io.string,
    byUser: userInfoRecord,
    toUser: userInfoRecord,

    // @deprecate in favor of the avove
    by: chessGameColor,
    gameSpecs: io.union([gameSpecsRecord, io.undefined]),
  }),
});
export type ChessGameRematchOffer = io.TypeOf<typeof chessGameRematchOffer>;

export const chessGameChallengeOffer = io.type({
  id: io.string,
  type: io.literal('challenge'),
  content: io.type({
    byUser: userInfoRecord,
    toUser: userInfoRecord,
    gameSpecs: gameSpecsRecord,
  }),
});
export type ChessGameChallengeOffer = io.TypeOf<typeof chessGameChallengeOffer>;

export const chessGameTakebackOffer = io.type({
  id: io.string,
  type: io.literal('takeback'),
  content: io.type({
    gameId: io.string,
    byUser: userInfoRecord,
    toUser: userInfoRecord,
  }),
});

export type ChessGameTakebackOffer = io.TypeOf<typeof chessGameTakebackOffer>;

export const chessGameOffer = io.union([
  chessGameDrawOffer,
  chessGameRematchOffer,
  chessGameChallengeOffer,
  chessGameTakebackOffer,
]);
export type ChessGameOffer = io.TypeOf<typeof chessGameOffer>;

export const capturedPiecesRecord = io.type({
  white: io.record(capturableChessPieceType, io.number),
  black: io.record(capturableChessPieceType, io.number),
});

export type CapturedPiecesRecord = io.TypeOf<typeof capturedPiecesRecord>;

export const activePiecesRecord = capturedPiecesRecord;
export type ActivePiecesRecord = io.TypeOf<typeof activePiecesRecord>;

export const chessMove = io.intersection([
  io.type({
    from: chessSquare,
    to: chessSquare,
  }),
  io.partial({
    promotion: promotionalChessPieceType,
  }),
]);
export type ChessMove = io.TypeOf<typeof chessMove>;

export const chessHistoryMove = io.intersection([
  chessMove,
  io.type({
    san: io.string,
    color: chessGameColor, // not needed as the order
    clock: io.number, // Corresponds to %clk in the extended PGN: https://www.enpassant.dk/chess/palview/enhancedpgn.htm
  }),
]);

export type ChessHistoryMove = io.TypeOf<typeof chessHistoryMove>;

export const chessHistory = io.array(chessHistoryMove);

export type ChessHistory = io.TypeOf<typeof chessHistory>;
