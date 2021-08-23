"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisRecord = exports.chessBoardDrawShape = void 0;
var io = require("io-ts");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var chessGame_1 = require("../chessGame");
// Taken from here https://github.com/ornicar/chessground/blob/2b267687e6c8a11c3889e920dde2de341cc6d9db/src/draw.ts
exports.chessBoardDrawShape = io.intersection([
    io.type({
        orig: io.string,
        visible: io.boolean,
        defaultSnapToValidMove: io.boolean,
        eraseOnClick: io.boolean,
    }),
    io.partial({
        dest: io.string,
        brush: io.string,
    }),
]);
exports.analysisRecord = io.intersection([
    io.type({
        id: io.string,
        createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
        updatedAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
        history: chessGame_1.chessRecursiveHistory,
        focusIndex: chessGame_1.chessHistoryIndex,
    }),
    io.type({
        drawnShapes: io.array(exports.chessBoardDrawShape),
    }),
]);
//# sourceMappingURL=analysisRecord.js.map