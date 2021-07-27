import * as io from 'io-ts';
import { leadRegistrationTwitchVendorData } from '../../records/twitchRecords';
import { leadRecord } from '../../records/collabLeadRecord';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';

export namespace LeadRegistration {
  const request = leadRecord;
  const response = io.type({
    status: io.union([io.literal('ExistentLead'), io.literal('NewLeadRegisterdSuccessful')]),
    data: leadRegistrationTwitchVendorData,
  });

  export const resource = new Resource(request, response);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
