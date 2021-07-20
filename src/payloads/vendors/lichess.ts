import * as io from 'io-ts';
import { lichessUserRecord } from '../../records/lichessRecords';

export const verifyLichessUserResponsePayload = io.type({
  user: lichessUserRecord,
});
export type VerifyLichessUserResponsePayload = io.TypeOf<typeof verifyLichessUserResponsePayload>;
