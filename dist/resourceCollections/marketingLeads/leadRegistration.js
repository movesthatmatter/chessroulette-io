"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRegistration = void 0;
var io = require("io-ts");
var collabLeadRecord_1 = require("src/records/collabLeadRecord");
var resource_1 = require("src/sdk/resource");
var LeadRegistration;
(function (LeadRegistration) {
    var request = io.type({
        email: io.string,
        accessToken: io.string,
    });
    LeadRegistration.resource = new resource_1.Resource(request, collabLeadRecord_1.leadRecord);
})(LeadRegistration = exports.LeadRegistration || (exports.LeadRegistration = {}));
//# sourceMappingURL=leadRegistration.js.map