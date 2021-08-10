import * as io from 'io-ts';
export declare const baseChallengeRecord: io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    id: io.StringC;
    createdBy: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    slug: io.StringC;
}>;
export declare const lichessSeekChallengeRecord: io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    rated: io.BooleanC;
    time: io.NumberC;
    increment: io.NumberC;
    variant: io.LiteralC<"standard">;
    color: io.UnionC<[io.KeyofC<{
        white: null;
    }>, io.KeyofC<{
        black: null;
    }>]>;
}>;
export declare const lichessPlayerChallengeRecord: io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    rated: io.BooleanC;
    "clock.limit": io.NumberC;
    "clock.increment": io.NumberC;
    variant: io.LiteralC<"standard">;
    color: io.UnionC<[io.KeyofC<{
        white: null;
    }>, io.KeyofC<{
        black: null;
    }>]>;
}>;
export declare const publicChallengeRecord: io.IntersectionC<[io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    id: io.StringC;
    createdBy: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    slug: io.StringC;
}>, io.TypeC<{
    type: io.LiteralC<"public">;
}>]>;
export declare type PublicChallengeRecord = io.TypeOf<typeof publicChallengeRecord>;
export declare const privateChallengeRecord: io.IntersectionC<[io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    id: io.StringC;
    createdBy: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    slug: io.StringC;
}>, io.TypeC<{
    type: io.LiteralC<"private">;
}>]>;
export declare type PrivateChallengeRecord = io.TypeOf<typeof privateChallengeRecord>;
export declare const lichessChallengeRecord: io.IntersectionC<[io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    rated: io.BooleanC;
    "clock.limit": io.NumberC;
    "clock.increment": io.NumberC;
    variant: io.LiteralC<"standard">;
    color: io.UnionC<[io.KeyofC<{
        white: null;
    }>, io.KeyofC<{
        black: null;
    }>]>;
}>, io.TypeC<{
    type: io.LiteralC<"lichess">;
}>]>;
export declare type LichessChallengeRecord = io.TypeOf<typeof lichessChallengeRecord>;
export declare const challengeRecord: io.UnionC<[io.IntersectionC<[io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    id: io.StringC;
    createdBy: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    slug: io.StringC;
}>, io.TypeC<{
    type: io.LiteralC<"public">;
}>]>, io.IntersectionC<[io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    id: io.StringC;
    createdBy: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    slug: io.StringC;
}>, io.TypeC<{
    type: io.LiteralC<"private">;
}>]>, io.IntersectionC<[io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    rated: io.BooleanC;
    "clock.limit": io.NumberC;
    "clock.increment": io.NumberC;
    variant: io.LiteralC<"standard">;
    color: io.UnionC<[io.KeyofC<{
        white: null;
    }>, io.KeyofC<{
        black: null;
    }>]>;
}>, io.TypeC<{
    type: io.LiteralC<"lichess">;
}>]>]>;
export declare type ChallengeRecord = io.TypeOf<typeof challengeRecord>;
export declare const quickPairingRecord: io.TypeC<{
    gameSpecs: io.TypeC<{
        timeLimit: io.KeyofC<{
            bullet30: null;
            bullet1: null;
            blitz2: null;
            blitz3: null;
            blitz5: null;
            rapid10: null;
            rapid15: null;
            rapid20: null;
            rapid30: null;
            rapid45: null;
            rapid60: null;
            untimed: null;
        }>;
        preferredColor: io.UnionC<[io.KeyofC<{
            black: null;
        }>, io.KeyofC<{
            white: null;
        }>, io.KeyofC<{
            random: null;
        }>]>;
    }>;
    createdBy: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    slug: io.StringC;
}>;
export declare type QuickPairingRecord = io.TypeOf<typeof quickPairingRecord>;
