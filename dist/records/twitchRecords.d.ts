import * as io from 'io-ts';
export declare const twitchUserRecord: io.TypeC<{
    id: io.StringC;
    email: io.StringC;
    display_name: io.StringC;
    profile_image_url: io.StringC;
    created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
}>;
export declare type TwitchUserRecord = io.TypeOf<typeof twitchUserRecord>;
