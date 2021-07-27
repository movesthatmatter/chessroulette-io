import * as io from 'io-ts';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';
export declare namespace LeadRegistration {
    const resource: Resource<io.TypeC<{
        vendor: io.LiteralC<"twitch">;
        campaign: io.StringC;
        vendorData: io.TypeC<{
            id: io.StringC;
            email: io.StringC;
            display_name: io.StringC;
            profile_image_url: io.StringC;
            created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
            accessToken: io.StringC;
        }>;
    }>, io.TypeC<{
        status: io.UnionC<[io.LiteralC<"ExistentLead">, io.LiteralC<"NewLeadRegisterdSuccessful">]>;
        data: io.TypeC<{
            id: io.StringC;
            email: io.StringC;
            display_name: io.StringC;
            profile_image_url: io.StringC;
            created_at: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
            accessToken: io.StringC;
        }>;
    }>, io.TypeC<{
        type: io.LiteralC<"BadRequestError">;
        content: io.UndefinedC;
    }>, {
        vendor: "twitch";
        campaign: string;
        vendorData: {
            id: string;
            email: string;
            display_name: string;
            profile_image_url: string;
            created_at: import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand;
            accessToken: string;
        };
    }, {
        status: "ExistentLead" | "NewLeadRegisterdSuccessful";
        data: {
            id: string;
            email: string;
            display_name: string;
            profile_image_url: string;
            created_at: import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand;
            accessToken: string;
        };
    }, {
        type: "BadRequestError";
        content: undefined;
    }>;
    type Request = RequestOf<typeof resource>;
    type OkResponse = OkResponseOf<typeof resource>;
    type ErrResponse = ErrResponseOf<typeof resource>;
    type Response = ResponseOf<typeof resource>;
}
