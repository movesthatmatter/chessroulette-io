import * as io from 'io-ts';
import { leadRegistrationTwitchVendorData } from '../records/twitchRecords';

export const leadResponsePayload = io.type({
  status: io.union([io.literal('ExistentLead'), io.literal('NewLeadRegisterdSuccessful')]),
  data: leadRegistrationTwitchVendorData,
});

export type LeadResponsePayload = io.TypeOf<typeof leadResponsePayload>;
