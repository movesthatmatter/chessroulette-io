import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';
import { chessRecursiveHistory } from '../chessGame';

export const analysisRecord = io.type({
  id: io.string,
  createdAt: isoDateTimeFromIsoString,
  updatedAt: isoDateTimeFromIsoString,
  history: chessRecursiveHistory,
});

export type AnalysisRecord = io.TypeOf<typeof analysisRecord>;
