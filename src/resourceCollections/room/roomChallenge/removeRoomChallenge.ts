import { roomRecord } from '../../../records/roomRecord';
import {
  ErrResponseOf,
  OkResponseOf,
  RequestOf,
  Resource,
  ResponseOf,
} from '../../../sdk/resource';
import { updateRequest } from './records';

export namespace RemoveRoomChallenge {
  const request = updateRequest;
  const response = roomRecord;

  export const resource = new Resource(request, response);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
