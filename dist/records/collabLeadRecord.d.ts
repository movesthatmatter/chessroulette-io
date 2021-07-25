import * as io from 'io-ts';
export declare const leadRecord: io.TypeC<{
    vendor: io.StringC;
    campaign: io.StringC;
    vendorData: io.TypeC<{
        accessToken: io.StringC;
        email: io.StringC;
    }>;
}>;
export declare type LeadRecord = io.TypeOf<typeof leadRecord>;
