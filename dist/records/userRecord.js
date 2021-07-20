"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRecord = exports.guestUserRecord = exports.registeredUserRecord = exports.userExternalAccountByVendorMap = exports.userExternalAccountRecord = exports.userInfoRecord = exports.registeredUserInfoRecord = exports.guestUserInfoRecord = void 0;
var io = require("io-ts");
var locationRecords_1 = require("./locationRecords");
var basicUserInfoRecord = io.type({
    id: io.string,
    firstName: io.string,
    lastName: io.string,
    avatarId: io.string,
    // Add any other pertinent details here if needed!
    // @deprecate in favor of the more explicit first/last name
    name: io.string,
});
exports.guestUserInfoRecord = io.intersection([
    basicUserInfoRecord,
    io.type({
        isGuest: io.literal(true),
    }),
]);
exports.registeredUserInfoRecord = io.intersection([
    basicUserInfoRecord,
    io.type({
        isGuest: io.literal(false),
        profilePicUrl: io.union([io.string, io.undefined]),
        username: io.string,
        country: io.union([locationRecords_1.country, io.undefined]),
    }),
]);
exports.userInfoRecord = io.union([exports.guestUserInfoRecord, exports.registeredUserInfoRecord]);
exports.userExternalAccountRecord = io.type({
    userId: io.union([io.undefined, io.string]),
});
exports.userExternalAccountByVendorMap = io.type({
    facebook: io.union([io.undefined, exports.userExternalAccountRecord]),
    lichess: io.union([io.undefined, exports.userExternalAccountRecord]),
    twitch: io.union([io.undefined, exports.userExternalAccountRecord]),
});
exports.registeredUserRecord = io.intersection([
    exports.registeredUserInfoRecord,
    io.type({
        email: io.string,
        externalAccounts: io.union([io.undefined, exports.userExternalAccountByVendorMap]),
    }),
]);
exports.guestUserRecord = io.intersection([
    exports.guestUserInfoRecord,
    io.type({
        // ServerId - This is needed to be able to maintain stale/fresh guests
        //  when the server flushes the DB
        sid: io.string,
    }),
]);
exports.userRecord = io.union([exports.registeredUserRecord, exports.guestUserRecord]);
//# sourceMappingURL=userRecord.js.map