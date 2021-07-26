import * as io from 'io-ts';
export declare const leadRecord: io.TypeC<{
    vendor: io.LiteralC<"twitch">;
    campaign: io.StringC;
    vendorData: io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        display_name: io.StringC;
        profile_image_url: io.StringC;
        created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        accessToken: io.StringC;
    }>;
}>;
export declare type LeadRecord = io.TypeOf<typeof leadRecord>;
