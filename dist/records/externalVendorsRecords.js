"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalUserRecord = exports.facebookExternalUserRecord = exports.lichessExternalUserRecord = exports.twitchExternalUserRecord = void 0;
var io = require("io-ts");
var lichessRecords_1 = require("./lichessRecords");
var facebookRecords_1 = require("./facebookRecords");
var twitchRecords_1 = require("./twitchRecords");
exports.twitchExternalUserRecord = io.type({
    vendor: io.literal('twitch'),
    user: twitchRecords_1.twitchUserRecord,
    accessToken: io.string,
});
exports.lichessExternalUserRecord = io.type({
    vendor: io.literal('lichess'),
    user: lichessRecords_1.lichessUserRecord,
    accessToken: io.string,
});
exports.facebookExternalUserRecord = io.type({
    vendor: io.literal('facebook'),
    user: facebookRecords_1.facebookUserRecord,
    accessToken: io.string,
});
exports.externalUserRecord = io.union([
    exports.twitchExternalUserRecord,
    exports.lichessExternalUserRecord,
    exports.facebookExternalUserRecord,
]);
//# sourceMappingURL=externalVendorsRecords.js.map