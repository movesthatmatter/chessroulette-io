"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRecord = void 0;
var io = require("io-ts");
var twitchRecords_1 = require("./twitchRecords");
exports.leadRecord = io.type({
    vendor: io.literal('twitch'),
    campaign: io.string,
    vendorData: twitchRecords_1.leadRegistrationTwitchVendorData,
});
//# sourceMappingURL=collabLeadRecord.js.map