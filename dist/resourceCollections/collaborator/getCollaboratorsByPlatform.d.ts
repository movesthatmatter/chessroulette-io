import * as io from 'io-ts';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';
export declare namespace GetCollaboratorsByPlatform {
    const resource: Resource<io.TypeC<{
        platform: io.KeyofC<{
            Twitch: boolean;
        }>;
        pageSize: import("io-ts-types/lib/NumberFromString").NumberFromStringC;
        currentIndex: import("io-ts-types/lib/NumberFromString").NumberFromStringC;
    }>, io.TypeC<{
        items: io.ArrayC<io.TypeC<{
            email: io.StringC;
            platform: io.KeyofC<{
                Twitch: boolean;
            }>;
            featuringRank: io.NumberC;
            profileUrl: io.StringC;
            profilePicUrl: io.UnionC<[io.UndefinedC, io.StringC]>;
            about: io.UnionC<[io.StringC, io.UndefinedC]>;
            extra: io.UnionC<[io.UndefinedC, io.TypeC<{}>]>;
        }>>;
        itemsTotal: io.NumberC;
        currentIndex: io.NumberC;
    }>, io.TypeC<{
        type: io.LiteralC<"BadRequestError">;
        content: io.UndefinedC;
    }>, {
        platform: "Twitch";
        pageSize: number;
        currentIndex: number;
    }, {
        items: {
            email: string;
            platform: "Twitch";
            featuringRank: number;
            profileUrl: string;
            profilePicUrl: string | undefined;
            about: string | undefined;
            extra: {} | undefined;
        }[];
        itemsTotal: number;
        currentIndex: number;
    }, {
        type: "BadRequestError";
        content: undefined;
    }>;
    type Request = RequestOf<typeof resource>;
    type OkResponse = OkResponseOf<typeof resource>;
    type ErrResponse = ErrResponseOf<typeof resource>;
    type Response = ResponseOf<typeof resource>;
}
