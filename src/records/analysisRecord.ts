import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';
import { chessHistoryIndex, chessRecursiveHistory } from '../chessGame';

// Taken from here https://github.com/ornicar/chessground/blob/2b267687e6c8a11c3889e920dde2de341cc6d9db/src/draw.ts
export const chessBoardDrawShape = io.intersection([
  io.type({
    orig: io.string, // This could be more specific if needed
    visible: io.boolean,
    defaultSnapToValidMove: io.boolean,
    eraseOnClick: io.boolean,
  }),
  io.partial({
    dest: io.string,
    brush: io.string,
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
  io.type({
    drawnShapes: io.array(chessBoardDrawShape),
  }),
]);

export type AnalysisRecord = io.TypeOf<typeof analysisRecord>;
