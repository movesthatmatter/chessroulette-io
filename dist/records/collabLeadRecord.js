"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRecord = void 0;
var io = require("io-ts");
exports.leadRecord = io.type({
    vendor: io.string,
    campaign: io.string,
    vendorData: io.type({
        accessToken: io.string,
        email: io.string,
    }),
});
//# sourceMappingURL=collabLeadRecord.js.map