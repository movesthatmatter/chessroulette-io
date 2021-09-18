"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateResponse = exports.updateRequest = exports.createRequest = void 0;
var io = require("io-ts");
var payloads_1 = require("src/payloads");
var roomChallenge_1 = require("../../../records/roomChallenge");
var roomRecord_1 = require("../../../records/roomRecord");
exports.createRequest = payloads_1.baseCreateChallengeRequest;
exports.updateRequest = io.type({
    challegeId: io.string,
    roomId: io.string,
    userId: io.string,
});
exports.createOrUpdateResponse = io.type({
    challenge: roomChallenge_1.roomChallengeRecord,
    room: roomRecord_1.roomRecord,
});
//# sourceMappingURL=records.js.map