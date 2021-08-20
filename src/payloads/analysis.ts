import * as io from 'io-ts';
import { analysisRecord } from '../records/analysisRecord';
import { chessHistoryIndex, chessRecursiveMove } from '../chessGame';

export const analysisMoveRequestPayload = io.type({
  kind: io.literal('analysisMoveRequest'),
  content: io.type({
    id: io.string,
    move: chessRecursiveMove,
    atIndex: chessHistoryIndex,
  }),
});
export type AnalysisMoveRequestPayload = io.TypeOf<typeof analysisMoveRequestPayload>;

export const analysisFocusRequestPayload = io.type({
  kind: io.literal('analysisRefocusRequest'),
  content: io.type({
    id: io.string,
    focusIndex: chessHistoryIndex,
  }),
});
export type AnalysisFocusRequestPayload = io.TypeOf<typeof analysisMoveRequestPayload>;

export const analysisUpdatedResponsePayload = io.type({
  kind: io.literal('analysisUpdatedResponse'),
  content: analysisRecord,
});

export type AnalysisUpdatedResponsePayload = io.TypeOf<typeof analysisUpdatedResponsePayload>;