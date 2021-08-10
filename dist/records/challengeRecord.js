"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickPairingRecord = exports.challengeRecord = exports.lichessChallengeRecord = exports.privateChallengeRecord = exports.publicChallengeRecord = exports.lichessPlayerChallengeRecord = exports.lichessSeekChallengeRecord = exports.baseChallengeRecord = void 0;
var io = require("io-ts");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var ChessGame = require("../chessGame");
var chessGame_1 = require("../chessGame");
exports.baseChallengeRecord = io.type({
    gameSpecs: ChessGame.gameSpecsRecord,
    id: io.string,
    createdBy: io.string,
    createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
    slug: io.string,
});
exports.lichessSeekChallengeRecord = io.type({
    rated: io.boolean,
    time: io.number,
    increment: io.number,
    variant: io.literal('standard'),
    color: io.union([
        io.keyof({
            white: null,
        }),
        io.keyof({
            black: null,
        }),
    ]),
});
exports.lichessPlayerChallengeRecord = io.type((_a = {
        rated: io.boolean
    },
    _a["clock.limit"] = io.number,
    _a["clock.increment"] = io.number,
    _a.variant = io.literal('standard'),
    _a.color = io.union([
        io.keyof({
            white: null,
        }),
        io.keyof({
            black: null,
        }),
    ]),
    _a));
exports.publicChallengeRecord = io.intersection([
    exports.baseChallengeRecord,
    io.type({
        type: io.literal('public'),
    }),
]);
exports.privateChallengeRecord = io.intersection([
    exports.baseChallengeRecord,
    io.type({
        type: io.literal('private'),
    }),
]);
exports.lichessChallengeRecord = io.intersection([
    exports.lichessPlayerChallengeRecord,
    io.type({
        type: io.literal('lichess'),
    }),
]);
exports.challengeRecord = io.union([
    exports.publicChallengeRecord,
    exports.privateChallengeRecord,
    exports.lichessChallengeRecord,
]);
exports.quickPairingRecord = io.type({
    gameSpecs: chessGame_1.gameSpecsRecord,
    createdBy: io.string,
    createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
    slug: io.string,
});
//# sourceMappingURL=challengeRecord.js.map