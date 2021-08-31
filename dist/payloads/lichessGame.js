"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lichessGameUpdateRequest = exports.lichessGameJoinRequest = void 0;
var io = require("io-ts");
var gameRecord_1 = require("src/records/gameRecord");
exports.lichessGameJoinRequest = io.type({
    kind: io.literal('lichessGameJoinRequest'),
    content: io.type({
        game: gameRecord_1.gameRecord,
    }),
});
exports.lichessGameUpdateRequest = io.type({
    kind: io.literal('lichessGameUpdateRequest'),
    content: io.type({
        id: io.string,
        game: gameRecord_1.gameRecord,
    }),
});
//# sourceMappingURL=lichessGame.js.map