"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisUpdatedResponsePayload = exports.analysisDrawableUpdatedRequestPayload = exports.analysisRefocusRequestPayload = exports.analysisMoveRequestPayload = void 0;
var io = require("io-ts");
var analysisRecord_1 = require("../records/analysisRecord");
var chessGame_1 = require("../chessGame");
exports.analysisMoveRequestPayload = io.type({
    kind: io.literal('analysisMoveRequest'),
    content: io.type({
        id: io.string,
        move: chessGame_1.chessRecursiveMove,
        atIndex: chessGame_1.chessHistoryIndex,
    }),
});
exports.analysisRefocusRequestPayload = io.type({
    kind: io.literal('analysisRefocusRequest'),
    content: io.type({
        id: io.string,
        focusIndex: chessGame_1.chessHistoryIndex,
    }),
});
exports.analysisDrawableUpdatedRequestPayload = io.type({
    kind: io.literal('analysisDrawableUpdatedResquest'),
    content: io.type({
        id: io.string,
        drawable: io.array(analysisRecord_1.chessBoardDrawShape),
    }),
});
exports.analysisUpdatedResponsePayload = io.type({
    kind: io.literal('analysisUpdatedResponse'),
    content: analysisRecord_1.analysisRecord,
});
//# sourceMappingURL=analysis.js.map