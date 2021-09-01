import * as io from 'io-ts';
export declare const leadResponsePayload: io.TypeC<{
    status: io.UnionC<[io.LiteralC<"ExistentLead">, io.LiteralC<"NewLeadRegisterdSuccessful">]>;
    data: io.IntersectionC<[io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        displayName: io.StringC;
        profileImageUrl: io.StringC;
        createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    }>, io.TypeC<{
        accessToken: io.StringC;
    }>]>;
}>;
export declare type LeadResponsePayload = io.TypeOf<typeof leadResponsePayload>;
