import * as io from 'io-ts';
export declare const leadResponsePayload: io.TypeC<{
    status: io.UnionC<[io.LiteralC<"ExistentLead">, io.LiteralC<"NewLeadRegisterdSuccessful">]>;
    data: io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        display_name: io.StringC;
        profile_image_url: io.StringC;
        created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        accessToken: io.StringC;
    }>;
}>;
export declare type LeadResponsePayload = io.TypeOf<typeof leadResponsePayload>;
