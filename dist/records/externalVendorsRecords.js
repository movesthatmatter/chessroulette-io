"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalVendorRecord = exports.facebookExternalVendorRecord = exports.lichessExternalVendorRecord = exports.twitchExternalVendorRecord = void 0;
var io = require("io-ts");
var lichessRecords_1 = require("./lichessRecords");
var facebookRecords_1 = require("./facebookRecords");
var twitchRecords_1 = require("./twitchRecords");
exports.twitchExternalVendorRecord = io.type({
    vendor: io.literal('twitch'),
    user: twitchRecords_1.twitchUserRecord,
    accessToken: io.string,
});
exports.lichessExternalVendorRecord = io.type({
    vendor: io.literal('lichess'),
    user: lichessRecords_1.lichessUserRecord,
    accessToken: io.string,
});
exports.facebookExternalVendorRecord = io.type({
    vendor: io.literal('facebook'),
    user: facebookRecords_1.facebookUserRecord,
    accessToken: io.string,
});
exports.externalVendorRecord = io.union([
    exports.twitchExternalVendorRecord,
    exports.lichessExternalVendorRecord,
    exports.facebookExternalVendorRecord,
]);
//# sourceMappingURL=externalVendorsRecords.js.map