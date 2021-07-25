import * as io from 'io-ts';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';
export declare namespace LeadRegistration {
    const resource: Resource<io.UnionC<[io.TypeC<{
        vendor: io.LiteralC<"Twitch">;
        vendorData: io.TypeC<{
            id: io.StringC;
            email: io.StringC;
            display_name: io.StringC;
            profile_image_url: io.StringC;
            created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        }>;
    }>, io.TypeC<{
        vendor: io.StringC;
        vendorData: io.UnknownRecordC;
    }>]>, io.UnionC<[io.TypeC<{
        vendor: io.StringC;
        campaign: io.StringC;
        vendorData: io.TypeC<{
            accessToken: io.StringC;
            email: io.StringC;
        }>;
    }>, io.UnknownRecordC]>, io.TypeC<{
        type: io.LiteralC<"BadRequestError">;
        content: io.UndefinedC;
    }>, {
        vendor: "Twitch";
        vendorData: {
            id: string;
            email: string;
            display_name: string;
            profile_image_url: string;
            created_at: import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand;
        };
    } | {
        vendor: string;
        vendorData: {
            [key: string]: unknown;
        };
    }, {
        vendor: string;
        campaign: string;
        vendorData: {
            accessToken: string;
            email: string;
        };
    } | {
        [key: string]: unknown;
    }, {
        type: "BadRequestError";
        content: undefined;
    }>;
    type Request = RequestOf<typeof resource>;
    type OkResponse = OkResponseOf<typeof resource>;
    type ErrResponse = ErrResponseOf<typeof resource>;
    type Response = ResponseOf<typeof resource>;
}
