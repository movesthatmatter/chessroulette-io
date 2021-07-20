"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collaboratorRecord = exports.collaboratorPlatform = void 0;
var io = require("io-ts");
exports.collaboratorPlatform = io.keyof({
    Twitch: true,
});
exports.collaboratorRecord = io.type({
    email: io.string,
    platform: exports.collaboratorPlatform,
    featuringRank: io.number,
    profileUrl: io.string,
    profilePicUrl: io.union([io.undefined, io.string]),
    about: io.union([io.string, io.undefined]),
    extra: io.union([io.undefined, io.type({})]),
});
//# sourceMappingURL=collaboratorRecord.js.map