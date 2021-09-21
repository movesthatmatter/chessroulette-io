"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomChallengeRecord = void 0;
var io = require("io-ts");
var challengeRecord_1 = require("./challengeRecord");
exports.roomChallengeRecord = io.intersection([
    challengeRecord_1.baseChallengeRecord,
    io.type({ roomId: io.string }),
]);
//# sourceMappingURL=roomChallenge.js.map