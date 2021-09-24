import * as io from 'io-ts';
import { leadRegistrationTwitchVendorData } from './twitchRecords';

export const leadRecord = io.type({
  vendor: io.literal('twitch'),
  campaign: io.string,
  vendorData: leadRegistrationTwitchVendorData,
});

export type LeadRecord = io.TypeOf<typeof leadRecord>;
