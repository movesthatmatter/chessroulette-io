import * as io from 'io-ts';
import { leadRecord } from 'src/records/collabLeadRecord';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from 'src/sdk/resource';

export namespace LeadRegistration {
  const request = io.type({
    email: io.string,
    accessToken: io.string,
  });

  export const resource = new Resource(request, leadRecord);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
