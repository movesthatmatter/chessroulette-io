"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisUpdatedResponsePayload = exports.analysisMoveRequestPayload = void 0;
var io = require("io-ts");
var analysisRecord_1 = require("src/records/analysisRecord");
var chessGame_1 = require("../chessGame");
exports.analysisMoveRequestPayload = io.type({
    kind: io.literal('analysisMoveRequest'),
    content: io.type({
        id: io.string,
        move: chessGame_1.chessRecursiveMove,
        index: chessGame_1.chessRecursiveHistoryIndex,
    }),
});
exports.analysisUpdatedResponsePayload = io.type({
    kind: io.literal('analysisUpdatedResponse'),
    content: analysisRecord_1.analysisRecord,
});
//# sourceMappingURL=analysis.js.map