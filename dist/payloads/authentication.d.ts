import * as io from 'io-ts';
export declare const externalVendor: io.KeyofC<{
    facebook: null;
    lichess: null;
    twitch: null;
}>;
export declare type ExternalVendor = io.TypeOf<typeof externalVendor>;
export declare const userCheckInternalAccountRequestPayload: io.TypeC<{
    protocol: io.LiteralC<"http">;
    data: io.TypeC<{
        type: io.LiteralC<"internal">;
        email: io.StringC;
        verificationCode: io.StringC;
    }>;
}>;
export declare type UserCheckInternalAccountRequestPayload = io.TypeOf<typeof userCheckInternalAccountRequestPayload>;
export declare const userCheckExternalAccountRequestPayload: io.TypeC<{
    protocol: io.LiteralC<"http">;
    data: io.TypeC<{
        type: io.LiteralC<"external">;
        vendor: io.KeyofC<{
            facebook: null;
            lichess: null;
            twitch: null;
        }>;
        accessToken: io.StringC;
    }>;
}>;
export declare type UserCheckExternalAccountRequestPayload = io.TypeOf<typeof userCheckExternalAccountRequestPayload>;
export declare const userCheckRequestPayload: io.UnionC<[io.TypeC<{
    protocol: io.LiteralC<"http">;
    data: io.TypeC<{
        type: io.LiteralC<"internal">;
        email: io.StringC;
        verificationCode: io.StringC;
    }>;
}>, io.TypeC<{
    protocol: io.LiteralC<"http">;
    data: io.TypeC<{
        type: io.LiteralC<"external">;
        vendor: io.KeyofC<{
            facebook: null;
            lichess: null;
            twitch: null;
        }>;
        accessToken: io.StringC;
    }>;
}>]>;
export declare type UserCheckRequestPayload = io.TypeOf<typeof userCheckRequestPayload>;
export declare const userCheckVerificationFailedResponsePayload: io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<false>;
    error: io.TypeC<{
        type: io.LiteralC<"HttpCustomError">;
        content: io.TypeC<{
            status: io.LiteralC<"VerificationFailed">;
        }>;
    }>;
}>;
export declare type UserCheckVerificationFailedResponsePayload = io.TypeOf<typeof userCheckVerificationFailedResponsePayload>;
export declare const userCheckInexitentUserResponsePayloadData: io.TypeC<{
    status: io.LiteralC<"InexistentUser">;
    external: io.UnionC<[io.UndefinedC, io.TypeC<{
        vendor: io.KeyofC<{
            facebook: null;
            lichess: null;
            twitch: null;
        }>;
        user: io.UnionC<[io.TypeC<{
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
    }>]>;
}>;
export declare type UserCheckInexitentUserResponsePayloadData = io.TypeOf<typeof userCheckInexitentUserResponsePayloadData>;
export declare const userCheckExistentUserResponsePayloadData: io.TypeC<{
    status: io.LiteralC<"ExistentUser">;
    accessToken: io.StringC;
}>;
export declare type UserCheckExistentUserResponsePayloadData = io.TypeOf<typeof userCheckExistentUserResponsePayloadData>;
export declare const userCheckResponsePayload: io.UnionC<[io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<true>;
    data: io.UnionC<[io.TypeC<{
        status: io.LiteralC<"InexistentUser">;
        external: io.UnionC<[io.UndefinedC, io.TypeC<{
            vendor: io.KeyofC<{
                facebook: null;
                lichess: null;
                twitch: null;
            }>;
            user: io.UnionC<[io.TypeC<{
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
        }>]>;
    }>, io.TypeC<{
        status: io.LiteralC<"ExistentUser">;
        accessToken: io.StringC;
    }>]>;
}>, io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<false>;
    error: io.TypeC<{
        type: io.LiteralC<"HttpCustomError">;
        content: io.TypeC<{
            status: io.LiteralC<"VerificationFailed">;
        }>;
    }>;
}>]>;
export declare type UserCheckResponsePayload = io.TypeOf<typeof userCheckResponsePayload>;
export declare const verifyEmailRequestPayload: io.TypeC<{
    protocol: io.LiteralC<"http">;
    data: io.TypeC<{
        email: io.StringC;
    }>;
}>;
export declare type VerifyEmailRequestPayload = io.TypeOf<typeof verifyEmailRequestPayload>;
export declare const verifyEmailResponsePayload: io.UnionC<[io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<true>;
    data: io.UndefinedC;
}>, io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<false>;
    error: io.UnionC<[io.TypeC<{
        type: io.LiteralC<"HttpInputValidationError">;
        invalidInput: io.RecordC<io.KeyofC<{
            email: io.StringC;
        }>, io.UnionC<[io.StringC, io.UndefinedC]>>;
    }>, io.TypeC<{
        type: io.LiteralC<"HttpGenericError">;
        message: io.UnionC<[io.StringC, io.UndefinedC]>;
    }>]>;
}>]>;
export declare type VerifyEmailResponsePayload = io.TypeOf<typeof verifyEmailResponsePayload>;
export declare const createUserAccountRequestPayload: io.TypeC<{
    protocol: io.LiteralC<"http">;
    data: io.TypeC<{
        email: io.StringC;
        firstName: io.StringC;
        lastName: io.StringC;
        username: io.StringC;
        external: io.UnionC<[io.UndefinedC, io.TypeC<{
            vendor: io.KeyofC<{
                facebook: null;
                lichess: null;
                twitch: null;
            }>;
            accessToken: io.StringC;
        }>]>;
    }>;
}>;
export declare type CreateUserAccountRequestPayload = io.TypeOf<typeof createUserAccountRequestPayload>;
export declare const createUserAccountResponsePayload: io.UnionC<[io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<true>;
    data: io.TypeC<{
        accessToken: io.StringC;
    }>;
}>, io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<false>;
    error: io.UnionC<[io.TypeC<{
        type: io.LiteralC<"HttpInputValidationError">;
        invalidInput: io.RecordC<io.KeyofC<{
            email: io.StringC;
            firstName: io.StringC;
            lastName: io.StringC;
            username: io.StringC;
            external: io.UnionC<[io.UndefinedC, io.TypeC<{
                vendor: io.KeyofC<{
                    facebook: null;
                    lichess: null;
                    twitch: null;
                }>;
                accessToken: io.StringC;
            }>]>;
        }>, io.UnionC<[io.StringC, io.UndefinedC]>>;
    }>, io.TypeC<{
        type: io.LiteralC<"HttpGenericError">;
        message: io.UnionC<[io.StringC, io.UndefinedC]>;
    }>]>;
}>]>;
export declare type CreateUserAccountResponsePayload = io.TypeOf<typeof createUserAccountResponsePayload>;
export declare const guestAuthenticationRequestPayload: io.TypeC<{
    protocol: io.LiteralC<"http">;
    data: io.TypeC<{
        guestUser: io.UnionC<[io.IntersectionC<[io.IntersectionC<[io.TypeC<{
            id: io.StringC;
            firstName: io.StringC;
            lastName: io.StringC;
            avatarId: io.StringC;
            name: io.StringC;
        }>, io.TypeC<{
            isGuest: io.LiteralC<true>;
        }>]>, io.TypeC<{
            sid: io.StringC;
        }>]>, io.UndefinedC, io.NullC]>;
    }>;
}>;
export declare type GuestAuthenticationRequestPayload = io.TypeOf<typeof guestAuthenticationRequestPayload>;
export declare const guestAuthenticationResponsePayload: io.TypeC<{
    protocol: io.LiteralC<"http">;
    ok: io.LiteralC<true>;
    data: io.TypeC<{
        guest: io.IntersectionC<[io.IntersectionC<[io.TypeC<{
            id: io.StringC;
            firstName: io.StringC;
            lastName: io.StringC;
            avatarId: io.StringC;
            name: io.StringC;
        }>, io.TypeC<{
            isGuest: io.LiteralC<true>;
        }>]>, io.TypeC<{
            sid: io.StringC;
        }>]>;
    }>;
}>;
export declare type GuestAuthenticationResponsePayload = io.TypeOf<typeof guestAuthenticationResponsePayload>;
