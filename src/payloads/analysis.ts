import * as io from 'io-ts';
import { analysisRecord } from '../records/analysisRecord';
import { chessRecursiveHistoryIndex, chessRecursiveMove } from '../chessGame';

export const analysisMoveRequestPayload = io.type({
  kind: io.literal('analysisMoveRequest'),
  content: io.type({
    id: io.string,
    move: chessRecursiveMove,
    index: chessRecursiveHistoryIndex,
  }),
});
export type AnalysisMoveRequestPayload = io.TypeOf<typeof analysisMoveRequestPayload>;

export const analysisUpdatedResponsePayload = io.type({
  kind: io.literal('analysisUpdatedResponse'),
  content: analysisRecord,
});
