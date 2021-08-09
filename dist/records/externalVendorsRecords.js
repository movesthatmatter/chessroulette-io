"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookExternalUserRecord = exports.lichessExternalUserRecord = exports.twitchExternalUserRecord = exports.externalUserRecord = void 0;
var io = require("io-ts");
var lichessRecords_1 = require("./lichessRecords");
var facebookRecords_1 = require("./facebookRecords");
var twitchRecords_1 = require("./twitchRecords");
exports.externalUserRecord = io.union([
    lichessRecords_1.lichessUserRecord,
    facebookRecords_1.facebookUserRecord,
    twitchRecords_1.twitchUserRecord,
]);
exports.twitchExternalUserRecord = io.type({
    vendor: io.literal('twitch'),
    user: twitchRecords_1.twitchUserRecord,
});
exports.lichessExternalUserRecord = io.type({
    vendor: io.literal('lichess'),
    user: lichessRecords_1.lichessUserRecord,
});
exports.facebookExternalUserRecord = io.type({
    vendor: io.literal('facebook'),
    user: facebookRecords_1.facebookUserRecord,
});
//# sourceMappingURL=externalVendorsRecords.js.map