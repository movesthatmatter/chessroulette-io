"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookUserRecord = void 0;
var io = require("io-ts");
exports.facebookUserRecord = io.type({
    id: io.string,
    email: io.string,
    firstName: io.union([io.string, io.undefined]),
    lastName: io.union([io.string, io.undefined]),
    name: io.union([io.string, io.undefined]),
});
//# sourceMappingURL=facebookRecords.js.map