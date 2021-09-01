"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRegistrationTwitchVendorData = exports.twitchUserRecord = void 0;
var io = require("io-ts");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
exports.twitchUserRecord = io.type({
    id: io.string,
    email: io.string,
    displayName: io.string,
    profileImageUrl: io.string,
    createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
    testGabe: io.literal('asd'),
});
exports.leadRegistrationTwitchVendorData = io.intersection([
    exports.twitchUserRecord,
    io.type({
        accessToken: io.string,
    }),
]);
//# sourceMappingURL=twitchRecords.js.map