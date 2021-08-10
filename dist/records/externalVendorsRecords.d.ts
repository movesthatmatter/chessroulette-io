import * as io from 'io-ts';
export declare const externalUserRecord: io.UnionC<[io.TypeC<{
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
}>, io.TypeC<{
    id: io.StringC;
    email: io.StringC;
    firstName: io.UnionC<[io.StringC, io.UndefinedC]>;
    lastName: io.UnionC<[io.StringC, io.UndefinedC]>;
    name: io.UnionC<[io.StringC, io.UndefinedC]>;
}>, io.TypeC<{
    id: io.StringC;
    email: io.StringC;
    display_name: io.StringC;
    profile_image_url: io.StringC;
    created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
}>]>;
export declare const twitchExternalUserRecord: io.TypeC<{
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
export declare const lichessExternalUserRecord: io.TypeC<{
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
export declare const facebookExternalUserRecord: io.TypeC<{
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
export declare type ExternalUserRecord = io.TypeOf<typeof externalUserRecord>;
export declare type TwitchExternalUserRecord = io.TypeOf<typeof twitchExternalUserRecord>;
export declare type LichessExternalUserRecord = io.TypeOf<typeof lichessExternalUserRecord>;
export declare type FacebookExternalUserRecord = io.TypeOf<typeof facebookExternalUserRecord>;
