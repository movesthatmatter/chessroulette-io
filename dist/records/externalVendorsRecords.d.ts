import * as io from 'io-ts';
export declare const twitchExternalVendorRecord: io.TypeC<{
    vendor: io.LiteralC<"twitch">;
    user: io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        display_name: io.StringC;
        profile_image_url: io.StringC;
        created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    }>;
    accessToken: io.StringC;
}>;
export declare type TwitchExternalVendorRecord = io.TypeOf<typeof twitchExternalVendorRecord>;
export declare const lichessExternalVendorRecord: io.TypeC<{
    vendor: io.LiteralC<"lichess">;
    user: io.TypeC<{
        email: io.StringC;
        id: io.StringC;
        username: io.StringC;
        perfs: io.PartialC<{
            blitz: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            bullet: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            classical: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            correspondence: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            puzzle: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            rapid: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
        }>;
    }>;
    accessToken: io.StringC;
}>;
export declare type LichessExternalVendorRecord = io.TypeOf<typeof lichessExternalVendorRecord>;
export declare const facebookExternalVendorRecord: io.TypeC<{
    vendor: io.LiteralC<"facebook">;
    user: io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        firstName: io.UnionC<[io.StringC, io.UndefinedC]>;
        lastName: io.UnionC<[io.StringC, io.UndefinedC]>;
        name: io.UnionC<[io.StringC, io.UndefinedC]>;
    }>;
    accessToken: io.StringC;
}>;
export declare type FacebookExternalVendorRecord = io.TypeOf<typeof facebookExternalVendorRecord>;
export declare const externalVendorRecord: io.UnionC<[io.TypeC<{
    vendor: io.LiteralC<"twitch">;
    user: io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        display_name: io.StringC;
        profile_image_url: io.StringC;
        created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    }>;
    accessToken: io.StringC;
}>, io.TypeC<{
    vendor: io.LiteralC<"lichess">;
    user: io.TypeC<{
        email: io.StringC;
        id: io.StringC;
        username: io.StringC;
        perfs: io.PartialC<{
            blitz: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            bullet: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            classical: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            correspondence: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            puzzle: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
            rapid: io.TypeC<{
                games: io.NumberC;
                rating: io.NumberC;
            }>;
        }>;
    }>;
    accessToken: io.StringC;
}>, io.TypeC<{
    vendor: io.LiteralC<"facebook">;
    user: io.TypeC<{
        id: io.StringC;
        email: io.StringC;
        firstName: io.UnionC<[io.StringC, io.UndefinedC]>;
        lastName: io.UnionC<[io.StringC, io.UndefinedC]>;
        name: io.UnionC<[io.StringC, io.UndefinedC]>;
    }>;
    accessToken: io.StringC;
}>]>;
export declare type ExternalVendorRecord = io.TypeOf<typeof externalVendorRecord>;
