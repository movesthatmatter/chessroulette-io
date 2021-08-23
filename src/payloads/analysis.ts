import * as io from 'io-ts';
import { analysisRecord, chessBoardDrawShape } from '../records/analysisRecord';
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

export const analysisRefocusRequestPayload = io.type({
  kind: io.literal('analysisRefocusRequest'),
  content: io.type({
    id: io.string,
    focusIndex: chessHistoryIndex,
  }),
});
export type AnalysisRefocusRequestPayload = io.TypeOf<typeof analysisRefocusRequestPayload>;

export const analysisDrawableUpdatedRequestPayload = io.type({
  kind: io.literal('analysisDrawableUpdatedResquest'),
  content: io.type({
    id: io.string,
    drawable: io.array(chessBoardDrawShape),
  }),
});

export type AnalysisDrawableUpdatedRequestPayload = io.TypeOf<typeof analysisDrawableUpdatedRequestPayload>;

export const analysisUpdatedResponsePayload = io.type({
  kind: io.literal('analysisUpdatedResponse'),
  content: analysisRecord,
});

export type AnalysisUpdatedResponsePayload = io.TypeOf<typeof analysisUpdatedResponsePayload>;
