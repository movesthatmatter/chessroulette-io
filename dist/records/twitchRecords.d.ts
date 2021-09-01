import * as io from 'io-ts';
export declare const twitchUserRecord: io.TypeC<{
    id: io.StringC;
    email: io.StringC;
    displayName: io.StringC;
    profileImageUrl: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
}>;
export declare type TwitchUserRecord = io.TypeOf<typeof twitchUserRecord>;
export declare const leadRegistrationTwitchVendorData: io.IntersectionC<[io.TypeC<{
    id: io.StringC;
    email: io.StringC;
    displayName: io.StringC;
    profileImageUrl: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
}>, io.TypeC<{
    accessToken: io.StringC;
}>]>;
export declare type TwitchRecordWithAccessToken = io.TypeOf<typeof leadRegistrationTwitchVendorData>;
