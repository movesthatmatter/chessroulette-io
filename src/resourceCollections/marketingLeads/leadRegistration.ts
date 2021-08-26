import { leadRecord } from '../../records/collabLeadRecord';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';
import { leadResponsePayload } from '../../payloads/lead';

export namespace LeadRegistration {
  const request = leadRecord;
  const response = leadResponsePayload;

  export const resource = new Resource(request, response);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
