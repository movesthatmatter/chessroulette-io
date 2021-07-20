"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestAuthenticationResponsePayload = exports.guestAuthenticationRequestPayload = exports.createUserAccountResponsePayload = exports.createUserAccountRequestPayload = exports.verifyEmailResponsePayload = exports.verifyEmailRequestPayload = exports.userCheckResponsePayload = exports.userCheckExistentUserResponsePayloadData = exports.userCheckInexitentUserResponsePayloadData = exports.userCheckVerificationFailedResponsePayload = exports.userCheckRequestPayload = exports.userCheckExternalAccountRequestPayload = exports.userCheckInternalAccountRequestPayload = exports.externalVendor = void 0;
var io = require("io-ts");
var externalVendorsRecords_1 = require("../records/externalVendorsRecords");
var userRecord_1 = require("../records/userRecord");
var http_1 = require("../sdk/http");
// @Deprecate All in Favor of the Authentication Resource Collection
// Check if User exists/ Attempts to Authenticate automatically if exists
exports.externalVendor = io.keyof({
    facebook: null,
    lichess: null,
    twitch: null,
});
// Deprecate User Check in favor of Resource
exports.userCheckInternalAccountRequestPayload = http_1.httpRequestPayloadFromProps({
    type: io.literal('internal'),
    email: io.string,
    verificationCode: io.string,
});
exports.userCheckExternalAccountRequestPayload = http_1.httpRequestPayloadFromProps({
    type: io.literal('external'),
    vendor: exports.externalVendor,
    accessToken: io.string,
});
exports.userCheckRequestPayload = io.union([
    exports.userCheckInternalAccountRequestPayload,
    exports.userCheckExternalAccountRequestPayload,
]);
exports.userCheckVerificationFailedResponsePayload = http_1.errHttpResponsePayload(http_1.httpCustomTypeErrorFromProps({
    status: io.literal('VerificationFailed'),
}));
exports.userCheckInexitentUserResponsePayloadData = io.type({
    status: io.literal('InexistentUser'),
    external: io.union([
        io.undefined,
        io.type({
            vendor: exports.externalVendor,
            user: externalVendorsRecords_1.externalUserRecord,
        }),
    ]),
});
exports.userCheckExistentUserResponsePayloadData = io.type({
    status: io.literal('ExistentUser'),
    accessToken: io.string,
});
exports.userCheckResponsePayload = http_1.httpResponsePayload(http_1.okHttpResponsePayload(io.union([exports.userCheckInexitentUserResponsePayloadData, exports.userCheckExistentUserResponsePayloadData])), exports.userCheckVerificationFailedResponsePayload);
// Email Verification
var verifyEmailModel = http_1.formModel({
    email: io.string,
});
exports.verifyEmailRequestPayload = http_1.httpRequestPayloadFromProps(verifyEmailModel);
exports.verifyEmailResponsePayload = http_1.httpResponsePayload(http_1.okHttpResponsePayload(io.undefined), http_1.errHttpResponsePayload(io.union([http_1.httpInputValidationError(verifyEmailModel), http_1.httpGenericError()])));
// Registration - In case the User Check came negative
var createUserAccountModel = http_1.formModel({
    email: io.string,
    firstName: io.string,
    lastName: io.string,
    username: io.string,
    external: io.union([
        io.undefined,
        io.type({
            vendor: exports.externalVendor,
            accessToken: io.string,
        }),
    ]),
});
exports.createUserAccountRequestPayload = http_1.httpRequestPayloadFromProps(createUserAccountModel);
exports.createUserAccountResponsePayload = http_1.httpResponsePayload(http_1.okHttpResponsePayloadFromProps({
    // user: userRecord, // TODO: See if this is needed in this call - it's for ease of access at this point
    accessToken: io.string,
}), http_1.errHttpResponsePayload(io.union([http_1.httpInputValidationError(createUserAccountModel), http_1.httpGenericError()])));
exports.guestAuthenticationRequestPayload = http_1.httpRequestPayloadFromProps({
    guestUser: io.union([userRecord_1.guestUserRecord, io.undefined, io.null]),
});
exports.guestAuthenticationResponsePayload = http_1.okHttpResponsePayloadFromProps({
    guest: userRecord_1.guestUserRecord,
});
//# sourceMappingURL=authentication.js.map