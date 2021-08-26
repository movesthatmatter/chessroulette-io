"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadResponsePayload = void 0;
var io = require("io-ts");
var twitchRecords_1 = require("../records/twitchRecords");
exports.leadResponsePayload = io.type({
    status: io.union([io.literal('ExistentLead'), io.literal('NewLeadRegisterdSuccessful')]),
    data: twitchRecords_1.leadRegistrationTwitchVendorData,
});
//# sourceMappingURL=lead.js.map