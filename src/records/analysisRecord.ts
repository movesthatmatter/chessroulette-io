import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';
import { chessGameColor, chessHistoryIndex, chessRecursiveHistory } from '../chessGame';

// Taken from here https://github.com/ornicar/chessground/blob/2b267687e6c8a11c3889e920dde2de341cc6d9db/src/draw.ts#L6
export const chessBoardDrawShape = io.intersection([
  io.type({
    orig: io.string, // This could be more specific if needed
  }),
  io.partial({
    dest: io.string, // This could be more specific if needed
    brush: io.string,
    modifiers: io.partial({
      lineWidth: io.number,
    }),
    piece: io.intersection([
      io.type({
        role: io.keyof({
          king: null,
          queen: null,
          rook: null,
          bishop: null,
          knight: null,
          pawn: null,
        }),
        color: chessGameColor,
      }),
      io.partial({
        scale: io.number,
      }),
    ]),
    customSvg: io.string,
  }),
]);
export type ChessBoardDrawShape = io.TypeOf<typeof chessBoardDrawShape>;

export const analysisRecord = io.intersection([
  io.type({
    id: io.string,
    createdAt: isoDateTimeFromIsoString,
    updatedAt: isoDateTimeFromIsoString,
    history: chessRecursiveHistory,
    focusIndex: chessHistoryIndex,
  }),
  io.partial({
    drawnShapes: io.array(chessBoardDrawShape),
  }),
]);

export type AnalysisRecord = io.TypeOf<typeof analysisRecord>;
