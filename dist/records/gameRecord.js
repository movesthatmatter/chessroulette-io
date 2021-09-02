"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRecordWithoutPlayerInfo = exports.gameRecordFinished = exports.gameRecordStopped = exports.gameRecordNeverStarted = exports.gameRecordStarted = exports.gameRecordPending = exports.gameRecordFromGameState = exports.gameRecord = exports.vendorData = void 0;
var io = require("io-ts");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var chessGame_1 = require("../chessGame");
exports.vendorData = io.type({
    vendor: io.literal('lichess'),
    gameId: io.string,
    playerId: io.string,
    userRating: io.number,
});
exports.gameRecord = io.intersection([
    chessGame_1.chessGameState,
    io.type({
        id: io.string,
        createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
        updatedAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
    }),
    io.union([
        io.type({
            isVendorGame: io.literal(true),
            vendorData: exports.vendorData,
        }),
        io.partial({
            isVendorGame: io.undefined,
            vendorData: io.undefined,
        }),
    ]),
]);
exports.gameRecordFromGameState = function (gameStateCodec) {
    return io.intersection([
        gameStateCodec,
        io.type({
            id: io.string,
            createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
            updatedAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
        }),
    ]);
};
exports.gameRecordPending = exports.gameRecordFromGameState(chessGame_1.chessGameStatePending);
exports.gameRecordStarted = exports.gameRecordFromGameState(chessGame_1.chessGameStateStarted);
exports.gameRecordNeverStarted = exports.gameRecordFromGameState(chessGame_1.chessGameStateNeverStarted);
exports.gameRecordStopped = exports.gameRecordFromGameState(chessGame_1.chessGameStateStopped);
exports.gameRecordFinished = exports.gameRecordFromGameState(chessGame_1.chessGameStateFinished);
exports.gameRecordWithoutPlayerInfo = io.intersection([
    exports.gameRecord,
    io.type({
        players: io.string,
    }),
]);
//# sourceMappingURL=gameRecord.js.map