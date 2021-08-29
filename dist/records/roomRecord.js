"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomActivityCreationRecord = exports.roomWithAnalysisActivityRecord = exports.roomWithLichessActivityRecord = exports.roomWithPlayActivityRecord = exports.roomWithNoActivityRecord = exports.privateRoomRecord = exports.publicRoomRecord = exports.roomRecord = exports.roomType = exports.roomActivityRecord = exports.roomAnalysisActivityRecord = exports.roomLichessActivityRecord = exports.roomPlayActivityRecord = exports.roomNoActivityRecord = exports.roomActivityType = void 0;
var io = require("io-ts");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var chessGame_1 = require("../chessGame");
var challengeRecord_1 = require("./challengeRecord");
var chatRecords_1 = require("./chatRecords");
var peerRecord_1 = require("./peerRecord");
exports.roomActivityType = io.keyof({
    none: null,
    play: null,
    analysis: null,
});
exports.roomNoActivityRecord = io.type({
    type: io.literal('none'),
});
exports.roomPlayActivityRecord = io.intersection([
    io.type({
        type: io.literal('play'),
        gameId: io.string,
    }),
    // io.union([
    //   io.type({
    //     status: io.literal('challengePending'),
    //     challengeId: io.string,
    //   }),
    //   io.type({
    //     status: io.literal('playing'),
    //     gameId: io.string,
    //   }),
    //   // TODO: Add other types if needed
    // ]),
    io.partial({
        offer: chessGame_1.chessGameOffer,
    }),
]);
exports.roomLichessActivityRecord = io.type({
    type: io.literal('lichess'),
    gameSpecs: chessGame_1.gameSpecsRecord,
});
exports.roomAnalysisActivityRecord = io.type({
    type: io.literal('analysis'),
    analysisId: io.string,
});
exports.roomActivityRecord = io.union([
    exports.roomNoActivityRecord,
    exports.roomPlayActivityRecord,
    exports.roomLichessActivityRecord,
    exports.roomAnalysisActivityRecord,
]);
exports.roomType = io.keyof({
    public: null,
    private: null,
});
exports.roomRecord = io.intersection([
    io.type({
        id: io.string,
        name: io.string,
        createdAt: io_ts_isodatetime_1.isoDateTimeFromIsoString,
        createdBy: io.string,
        slug: io.string,
        peers: io.record(io.string, peerRecord_1.peerRecord),
        activity: exports.roomActivityRecord,
        chatHistory: chatRecords_1.chatHistoryRecord,
        // TODO: Add
        // lastJoinedAt: null | ISODateTime;
        // lastLeftAt: null | ISODateTime;
        // TODO: Temporarily additon to match the room stats record
        // game: chessGameState,
        // gameOffer: chessGameOffer,
        pendingChallenges: io.record(io.string, challengeRecord_1.challengeRecord),
    }),
    io.union([
        io.type({
            type: io.literal('public'),
            code: io.null,
        }),
        io.type({
            type: io.literal('private'),
            code: io.string,
        }),
    ]),
]);
exports.publicRoomRecord = io.intersection([
    exports.roomRecord,
    io.type({
        type: io.literal('public'),
    }),
]);
exports.privateRoomRecord = io.intersection([
    exports.roomRecord,
    io.type({
        type: io.literal('private'),
    }),
]);
exports.roomWithNoActivityRecord = io.intersection([
    exports.roomRecord,
    io.type({
        activity: exports.roomNoActivityRecord,
    }),
]);
exports.roomWithPlayActivityRecord = io.intersection([
    exports.roomRecord,
    io.type({
        activity: exports.roomPlayActivityRecord,
    }),
]);
exports.roomWithLichessActivityRecord = io.intersection([
    exports.roomRecord,
    io.type({
        activity: exports.roomLichessActivityRecord,
    }),
]);
exports.roomWithAnalysisActivityRecord = io.intersection([
    exports.roomRecord,
    io.type({
        activity: exports.roomAnalysisActivityRecord,
    }),
]);
exports.roomActivityCreationRecord = io.union([
    io.type({
        activityType: io.literal('play'),
        gameSpecs: chessGame_1.gameSpecsRecord,
    }),
    io.type({
        activityType: io.literal('analysis'),
    }),
    io.type({
        activityType: io.literal('none'),
    }),
    io.type({
        activityType: io.literal('lichess'),
        gameSpecs: chessGame_1.gameSpecsRecord,
    }),
]);
//# sourceMappingURL=roomRecord.js.map