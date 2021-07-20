"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalUserRecord = void 0;
var io = require("io-ts");
var lichessRecords_1 = require("./lichessRecords");
var facebookRecords_1 = require("./facebookRecords");
var twitchRecords_1 = require("./twitchRecords");
exports.externalUserRecord = io.union([
    lichessRecords_1.lichessUserRecord,
    facebookRecords_1.facebookUserRecord,
    twitchRecords_1.twitchUserRecord,
]);
//# sourceMappingURL=externalVendorsRecords.js.map