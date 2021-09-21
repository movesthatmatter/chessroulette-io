"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateResponse = exports.updateRequest = exports.removeOrAcceptResponse = exports.createRequest = void 0;
var io = require("io-ts");
var payloads_1 = require("../../../payloads");
var roomChallengeRecord_1 = require("../../../records/roomChallengeRecord");
var roomRecord_1 = require("../../../records/roomRecord");
exports.createRequest = io.intersection([
    payloads_1.baseCreateChallengeRequest,
    io.type({
        roomId: io.string,
    }),
]);
exports.removeOrAcceptResponse = roomRecord_1.roomRecord;
exports.updateRequest = io.type({
    challengeId: io.string,
    roomId: io.string,
});
exports.createOrUpdateResponse = io.type({
    challenge: roomChallengeRecord_1.roomChallengeRecord,
    room: roomRecord_1.roomRecord,
});
//# sourceMappingURL=records.js.map