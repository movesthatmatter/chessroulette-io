import * as io from 'io-ts';
import { ErrResponseOf, OkResponseOf, RequestOf, Resource, ResponseOf } from 'src/sdk/resource';
export declare namespace LeadRegistration {
    const resource: Resource<io.TypeC<{
        email: io.StringC;
        accessToken: io.StringC;
    }>, io.TypeC<{
        vendor: io.StringC;
        campaign: io.StringC;
        vendorData: io.TypeC<{
            accessToken: io.StringC;
            email: io.StringC;
        }>;
    }>, io.TypeC<{
        type: io.LiteralC<"BadRequestError">;
        content: io.UndefinedC;
    }>, {
        email: string;
        accessToken: string;
    }, {
        vendor: string;
        campaign: string;
        vendorData: {
            accessToken: string;
            email: string;
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
