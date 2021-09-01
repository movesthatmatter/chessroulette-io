import * as io from 'io-ts';
export declare const verifyTwitchUserResponsePayload: io.TypeC<{
    user: io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        displayName: io.StringC;
        profileImageUrl: io.StringC;
        createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    }>;
}>;
export declare type VerifyTwitchUserResponsePayload = io.TypeOf<typeof verifyTwitchUserResponsePayload>;
