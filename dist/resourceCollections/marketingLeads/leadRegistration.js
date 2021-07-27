"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRegistration = void 0;
var collabLeadRecord_1 = require("../../records/collabLeadRecord");
var resource_1 = require("../../sdk/resource");
var lead_1 = require("../../payloads/lead");
var LeadRegistration;
(function (LeadRegistration) {
    var request = collabLeadRecord_1.leadRecord;
    var response = lead_1.leadResponsePayload;
    LeadRegistration.resource = new resource_1.Resource(request, response);
})(LeadRegistration = exports.LeadRegistration || (exports.LeadRegistration = {}));
//# sourceMappingURL=leadRegistration.js.map