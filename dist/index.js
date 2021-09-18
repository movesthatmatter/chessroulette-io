"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resources = exports.metadata = exports.analysis = void 0;
// TODO: These should be under "records" namespace
__exportStar(require("./records/userRecord"), exports);
__exportStar(require("./records/roomStatsRecord"), exports);
__exportStar(require("./records/peerRecord"), exports);
__exportStar(require("./records/facebookRecords"), exports);
__exportStar(require("./records/twitchRecords"), exports);
__exportStar(require("./records/collabLeadRecord"), exports);
__exportStar(require("./records/lichessRecords"), exports);
__exportStar(require("./records/roomRecord"), exports);
__exportStar(require("./records/roomChallengeRecord"), exports);
__exportStar(require("./records/challengeRecord"), exports);
__exportStar(require("./records/chatRecords"), exports);
__exportStar(require("./records/externalVendorsRecords"), exports);
__exportStar(require("./records/gameRecord"), exports);
__exportStar(require("./records/locationRecords"), exports);
__exportStar(require("./records/collaboratorRecord"), exports);
__exportStar(require("./records/analysisRecord"), exports);
// TODO: add a "Payloads" namespace to this
__exportStar(require("./payloads"), exports);
__exportStar(require("./sdk/io"), exports);
__exportStar(require("./chessGame"), exports); // TODO add as game namespae
exports.analysis = require("./analysis");
exports.metadata = require("./metadata");
exports.Resources = require("./resources");
// Deprecate
__exportStar(require("./AsyncResult/AsyncBox"), exports);
__exportStar(require("ts-results"), exports);
//# sourceMappingURL=index.js.map