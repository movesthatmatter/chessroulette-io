import {
  ErrResponseOf,
  OkResponseOf,
  RequestOf,
  Resource,
  ResponseOf,
} from '../../../sdk/resource';
import { createOrUpdateResponse, updateRequest } from './records';

export namespace AcceptRoomChallenge {
  const request = updateRequest;
  const response = createOrUpdateResponse;

  export const resource = new Resource(request, response);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
