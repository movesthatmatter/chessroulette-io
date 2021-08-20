"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisRecord = void 0;
var io = require("io-ts");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var chessGame_1 = require("../chessGame");
exports.analysisRecord = io.type({
    id: io.string,
    createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
    updatedAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
    history: chessGame_1.chessRecursiveHistory,
    focusIndex: chessGame_1.chessHistoryIndex,
});
//# sourceMappingURL=analysisRecord.js.map