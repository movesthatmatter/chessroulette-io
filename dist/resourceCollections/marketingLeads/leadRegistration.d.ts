import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from '../../sdk/resource';
export declare namespace LeadRegistration {
    const resource: Resource<import("io-ts").TypeC<{
        vendor: import("io-ts").LiteralC<"twitch">;
        campaign: import("io-ts").StringC;
        vendorData: import("io-ts").IntersectionC<[import("io-ts").TypeC<{
            id: import("io-ts").StringC;
            email: import("io-ts").StringC;
            displayName: import("io-ts").StringC;
            profileImageUrl: import("io-ts").StringC;
            createdAt: import("io-ts").Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        }>, import("io-ts").TypeC<{
            accessToken: import("io-ts").StringC;
        }>]>;
    }>, import("io-ts").TypeC<{
        status: import("io-ts").UnionC<[import("io-ts").LiteralC<"ExistentLead">, import("io-ts").LiteralC<"NewLeadRegisterdSuccessful">]>;
        data: import("io-ts").IntersectionC<[import("io-ts").TypeC<{
            id: import("io-ts").StringC;
            email: import("io-ts").StringC;
            displayName: import("io-ts").StringC;
            profileImageUrl: import("io-ts").StringC;
            createdAt: import("io-ts").Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        }>, import("io-ts").TypeC<{
            accessToken: import("io-ts").StringC;
        }>]>;
    }>, import("io-ts").TypeC<{
        type: import("io-ts").LiteralC<"BadRequestError">;
        content: import("io-ts").UndefinedC;
    }>, {
        vendor: "twitch";
        campaign: string;
        vendorData: {
            id: string;
            email: string;
            displayName: string;
            profileImageUrl: string;
            createdAt: import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand;
        } & {
            accessToken: string;
        };
    }, {
        status: "ExistentLead" | "NewLeadRegisterdSuccessful";
        data: {
            id: string;
            email: string;
            displayName: string;
            profileImageUrl: string;
            createdAt: import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand;
        } & {
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
