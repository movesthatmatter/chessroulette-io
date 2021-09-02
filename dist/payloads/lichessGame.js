"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lichessGameRequestPayloads = exports.lichessGameUpdateRequestPayload = exports.lichessGameJoinRequestPayload = void 0;
var io = require("io-ts");
var gameStateRecords_1 = require("../chessGame/records/gameStateRecords");
var gameRecord_1 = require("../records/gameRecord");
exports.lichessGameJoinRequestPayload = io.type({
    kind: io.literal('lichessGameJoinRequest'),
    content: io.type({
        game: gameStateRecords_1.chessGameState,
        vendorData: gameRecord_1.vendorDataRecord,
    }),
});
exports.lichessGameUpdateRequestPayload = io.type({
    kind: io.literal('lichessGameUpdateRequest'),
    content: io.type({
        game: gameRecord_1.gameRecord,
    }),
});
exports.lichessGameRequestPayloads = io.union([
    exports.lichessGameJoinRequestPayload,
    exports.lichessGameUpdateRequestPayload,
]);
//# sourceMappingURL=lichessGame.js.map