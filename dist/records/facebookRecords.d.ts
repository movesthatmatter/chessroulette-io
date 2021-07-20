import * as io from 'io-ts';
export declare const facebookUserRecord: io.TypeC<{
    id: io.StringC;
    email: io.StringC;
    firstName: io.UnionC<[io.StringC, io.UndefinedC]>;
    lastName: io.UnionC<[io.StringC, io.UndefinedC]>;
    name: io.UnionC<[io.StringC, io.UndefinedC]>;
}>;
export declare type FacebookUserRecord = io.TypeOf<typeof facebookUserRecord>;
