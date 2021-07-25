"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRegistration = void 0;
var io = require("io-ts");
var twitchRecords_1 = require("../../records/twitchRecords");
var collabLeadRecord_1 = require("../../records/collabLeadRecord");
var resource_1 = require("../../sdk/resource");
var LeadRegistration;
(function (LeadRegistration) {
    var request = io.union([
        io.type({
            vendor: io.literal('Twitch'),
            vendorData: twitchRecords_1.twitchUserRecord,
        }),
        io.type({
            vendor: io.string,
            vendorData: io.UnknownRecord,
        }),
    ]);
    var response = io.union([collabLeadRecord_1.leadRecord, io.UnknownRecord]);
    LeadRegistration.resource = new resource_1.Resource(request, response);
})(LeadRegistration = exports.LeadRegistration || (exports.LeadRegistration = {}));
//# sourceMappingURL=leadRegistration.js.map