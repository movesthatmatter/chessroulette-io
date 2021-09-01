import * as io from 'io-ts';
export declare const leadRecord: io.TypeC<{
    vendor: io.LiteralC<"twitch">;
    campaign: io.StringC;
    vendorData: io.IntersectionC<[io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        displayName: io.StringC;
        profileImageUrl: io.StringC;
        createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        testGabe: io.LiteralC<"asd">;
    }>, io.TypeC<{
        accessToken: io.StringC;
    }>]>;
}>;
export declare type LeadRecord = io.TypeOf<typeof leadRecord>;
