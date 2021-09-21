import {
  ErrResponseOf,
  OkResponseOf,
  RequestOf,
  Resource,
  ResponseOf,
} from '../../../sdk/resource';
import { removeOrAcceptResponse, updateRequest } from './records';

export namespace AcceptRoomChallenge {
  const request = updateRequest;
  const response = removeOrAcceptResponse;

  export const resource = new Resource(request, response);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
