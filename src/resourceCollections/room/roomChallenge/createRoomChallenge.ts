import {
  ErrResponseOf,
  OkResponseOf,
  RequestOf,
  Resource,
  ResponseOf,
} from '../../../sdk/resource';
import { baseCreateChallengeRequest } from '../../../payloads';
import { createOrUpdateResponse } from './records';

export namespace CreateRoomChallenge {
  const request = baseCreateChallengeRequest;
  const response = createOrUpdateResponse;

  export const resource = new Resource(request, response);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
