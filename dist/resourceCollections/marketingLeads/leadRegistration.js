"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRegistration = void 0;
var twitchRecords_1 = require("../../records/twitchRecords");
var collabLeadRecord_1 = require("../../records/collabLeadRecord");
var resource_1 = require("../../sdk/resource");
var LeadRegistration;
(function (LeadRegistration) {
    var request = collabLeadRecord_1.leadRecord;
    var response = twitchRecords_1.leadRegistrationTwitchVendorData;
    LeadRegistration.resource = new resource_1.Resource(request, response);
})(LeadRegistration = exports.LeadRegistration || (exports.LeadRegistration = {}));
//# sourceMappingURL=leadRegistration.js.map