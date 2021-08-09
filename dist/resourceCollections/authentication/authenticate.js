"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
var io = require("io-ts");
var resource_1 = require("../../sdk/resource");
var payloads_1 = require("../../payloads");
var externalVendorsRecords_1 = require("../../records/externalVendorsRecords");
var Authenticate;
(function (Authenticate) {
    var internalAccountRequest = io.type({
        type: io.literal('internal'),
        email: io.string,
        verificationCode: io.string,
    });
    var externalAccountRequest = io.type({
        type: io.literal('external'),
        vendor: payloads_1.externalVendor,
        accessToken: io.string,
    });
    var request = io.union([internalAccountRequest, externalAccountRequest]);
    var okResponseInexistentUser = io.type({
        status: io.literal('InexistentUser'),
        // This holds the actual information such as email, external user id, etc.
        verificationToken: io.string,
        external: io.union([
            io.undefined,
            externalVendorsRecords_1.lichessExternalUserRecord,
            externalVendorsRecords_1.twitchExternalUserRecord,
            externalVendorsRecords_1.facebookExternalUserRecord,
        ]),
    });
    var okResponseExistentUser = io.type({
        status: io.literal('ExistentUser'),
        accessToken: io.string,
    });
    // This means that an user wasn't found in our User Base based on
    //  the external user id, but one of it's external identifiers (only email for now)
    //  matches an existent user
    var okResponseInexistentExternalUserMatchesExistentUserEmail = io.type({
        status: io.literal('InexistentExternalUserMatchesExistentUser:Email'),
        email: io.string,
        vendor: payloads_1.externalVendor,
    });
    var okResponse = io.union([
        okResponseInexistentUser,
        okResponseExistentUser,
        okResponseInexistentExternalUserMatchesExistentUserEmail,
    ]);
    var errResponseVerificationFailed = io.type({
        type: io.literal('VerificationFailed'),
        content: io.undefined,
    });
    Authenticate.resource = new resource_1.Resource(request, okResponse, errResponseVerificationFailed);
})(Authenticate = exports.Authenticate || (exports.Authenticate = {}));
//# sourceMappingURL=authenticate.js.map