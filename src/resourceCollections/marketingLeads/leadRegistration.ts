import * as io from 'io-ts';
import { twitchUserRecord } from '../../records/twitchRecords';
import { leadRecord } from '../../records/collabLeadRecord';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';

export namespace LeadRegistration {
  const request = io.union([
    io.type({
      vendor: io.literal('Twitch'),
      vendorData: twitchUserRecord,
    }),
    io.type({
      vendor: io.string,
      vendorData: io.UnknownRecord,
    }),
  ]);

  const response = io.union([leadRecord, io.UnknownRecord]);

  export const resource = new Resource(request, response);

  export type Request = RequestOf<typeof resource>;
  export type OkResponse = OkResponseOf<typeof resource>;
  export type ErrResponse = ErrResponseOf<typeof resource>;
  export type Response = ResponseOf<typeof resource>;
}
