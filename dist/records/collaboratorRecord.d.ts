import * as io from 'io-ts';
export declare const collaboratorPlatform: io.KeyofC<{
    Twitch: boolean;
}>;
export declare type CollaboratorPlatform = io.TypeOf<typeof collaboratorPlatform>;
export declare const collaboratorRecord: io.TypeC<{
    email: io.StringC;
    platform: io.KeyofC<{
        Twitch: boolean;
    }>;
    featuringRank: io.NumberC;
    profileUrl: io.StringC;
    profilePicUrl: io.UnionC<[io.UndefinedC, io.StringC]>;
    about: io.UnionC<[io.StringC, io.UndefinedC]>;
    extra: io.UnionC<[io.UndefinedC, io.TypeC<{}>]>;
}>;
export declare type CollaboratorRecord = io.TypeOf<typeof collaboratorRecord>;
