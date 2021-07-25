import * as io from 'io-ts';

export const leadRecord = io.type({
  vendor: io.string,
  campaign: io.string,
  vendorData: io.type({
    accessToken: io.string,
    email: io.string,
  }),
});

export type LeadRecord = io.TypeOf<typeof leadRecord>;
