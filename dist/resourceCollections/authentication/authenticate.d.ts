import * as io from 'io-ts';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';
export declare namespace Authenticate {
    const resource: Resource<io.UnionC<[io.TypeC<{
        type: io.LiteralC<"internal">;
        email: io.StringC;
        verificationCode: io.StringC;
    }>, io.TypeC<{
        type: io.LiteralC<"external">;
        vendor: io.KeyofC<{
            facebook: null;
            lichess: null;
            twitch: null;
        }>;
        accessToken: io.StringC;
    }>]>, io.UnionC<[io.TypeC<{
        status: io.LiteralC<"InexistentUser">;
        verificationToken: io.StringC;
        external: io.UnionC<[io.UndefinedC, io.TypeC<{
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
        }>, io.TypeC<{
            vendor: io.LiteralC<"twitch">;
            user: io.TypeC<{
                id: io.StringC;
                email: io.StringC;
                display_name: io.StringC;
                profile_image_url: io.StringC;
                created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
            }>;
        }>, io.TypeC<{
            vendor: io.LiteralC<"facebook">;
            user: io.TypeC<{
                id: io.StringC;
                email: io.StringC;
                firstName: io.UnionC<[io.StringC, io.UndefinedC]>;
                lastName: io.UnionC<[io.StringC, io.UndefinedC]>;
                name: io.UnionC<[io.StringC, io.UndefinedC]>;
            }>;
        }>]>;
    }>, io.TypeC<{
        status: io.LiteralC<"ExistentUser">;
        accessToken: io.StringC;
    }>, io.TypeC<{
        status: io.LiteralC<"InexistentExternalUserMatchesExistentUser:Email">;
        email: io.StringC;
        vendor: io.KeyofC<{
            facebook: null;
            lichess: null;
            twitch: null;
        }>;
    }>]>, io.TypeC<{
        type: io.LiteralC<"VerificationFailed">;
        content: io.UndefinedC;
    }>, {
        type: "internal";
        email: string;
        verificationCode: string;
    } | {
        type: "external";
        vendor: "twitch" | "lichess" | "facebook";
        accessToken: string;
    }, {
        status: "InexistentUser";
        verificationToken: string;
        external: {
            vendor: "twitch";
            user: {
                id: string;
                email: string;
                display_name: string;
                profile_image_url: string;
                created_at: import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand;
            };
        } | {
            vendor: "lichess";
            user: {
                email: string;
                id: string;
                username: string;
                perfs: {
                    blitz?: {
                        games: number;
                        rating: number;
                    } | undefined;
                    bullet?: {
                        games: number;
                        rating: number;
                    } | undefined;
                    classical?: {
                        games: number;
                        rating: number;
                    } | undefined;
                    correspondence?: {
                        games: number;
                        rating: number;
                    } | undefined;
                    puzzle?: {
                        games: number;
                        rating: number;
                    } | undefined;
                    rapid?: {
                        games: number;
                        rating: number;
                    } | undefined;
                };
            };
        } | {
            vendor: "facebook";
            user: {
                id: string;
                email: string;
                firstName: string | undefined;
                lastName: string | undefined;
                name: string | undefined;
            };
        } | undefined;
    } | {
        status: "ExistentUser";
        accessToken: string;
    } | {
        status: "InexistentExternalUserMatchesExistentUser:Email";
        email: string;
        vendor: "twitch" | "lichess" | "facebook";
    }, {
        type: "VerificationFailed";
        content: undefined;
    }>;
    type Request = RequestOf<typeof resource>;
    type OkResponse = OkResponseOf<typeof resource>;
    type ErrResponse = ErrResponseOf<typeof resource>;
    type Response = ResponseOf<typeof resource>;
}
