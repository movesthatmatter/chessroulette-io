"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitchUserRecord = void 0;
var io = require("io-ts");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
exports.twitchUserRecord = io.type({
    id: io.string,
    email: io.string,
    display_name: io.string,
    profile_image_url: io.string,
    created_at: io_ts_isodatetime_1.isoDateTimeFromIsoString,
});
//# sourceMappingURL=twitchRecords.js.map