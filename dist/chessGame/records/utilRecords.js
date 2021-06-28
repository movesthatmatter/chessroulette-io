"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chessHistory = exports.chessHistoryMove = exports.chessMove = exports.activePiecesRecord = exports.capturedPiecesRecord = exports.chessGameOffer = exports.chessGameTakebackOffer = exports.chessGameChallengeOffer = exports.chessGameRematchOffer = exports.gameSpecsRecord = exports.chessGameDrawOffer = exports.partialChessPlayersBySide = exports.chessPlayersBySide = exports.chessGameTimeLimit = exports.chessGameStatePgn = exports.chessGameStateFen = exports.chessPreferredColorOption = exports.chessGameColor = exports.chessColorBlack = exports.chessColorWhite = exports.chessPlayers = exports.chessPlayer = exports.chessPlayerBlack = exports.chessPlayerWhite = exports.chessSquare = exports.capturableChessPieceType = exports.promotionalChessPieceType = exports.chessPieceType = void 0;
var io = require("io-ts");
var userRecord_1 = require("../../records/userRecord");
// Taken from chess.js
/**
 * - "p" for Pawn
 * - "n" for Knight
 * - "b" for Bishop
 * - "r" for Rook
 * - "q" for Queen
 * - "k" for King
 */
exports.chessPieceType = io.keyof({
    p: undefined,
    n: undefined,
    b: undefined,
    r: undefined,
    q: undefined,
    k: undefined,
});
exports.promotionalChessPieceType = io.keyof({
    n: undefined,
    b: undefined,
    r: undefined,
    q: undefined,
});
exports.capturableChessPieceType = io.keyof({
    p: undefined,
    n: undefined,
    b: undefined,
    r: undefined,
    q: undefined,
});
exports.chessSquare = io.keyof({
    a8: undefined,
    b8: undefined,
    c8: undefined,
    d8: undefined,
    e8: undefined,
    f8: undefined,
    g8: undefined,
    h8: undefined,
    a7: undefined,
    b7: undefined,
    c7: undefined,
    d7: undefined,
    e7: undefined,
    f7: undefined,
    g7: undefined,
    h7: undefined,
    a6: undefined,
    b6: undefined,
    c6: undefined,
    d6: undefined,
    e6: undefined,
    f6: undefined,
    g6: undefined,
    h6: undefined,
    a5: undefined,
    b5: undefined,
    c5: undefined,
    d5: undefined,
    e5: undefined,
    f5: undefined,
    g5: undefined,
    h5: undefined,
    a4: undefined,
    b4: undefined,
    c4: undefined,
    d4: undefined,
    e4: undefined,
    f4: undefined,
    g4: undefined,
    h4: undefined,
    a3: undefined,
    b3: undefined,
    c3: undefined,
    d3: undefined,
    e3: undefined,
    f3: undefined,
    g3: undefined,
    h3: undefined,
    a2: undefined,
    b2: undefined,
    c2: undefined,
    d2: undefined,
    e2: undefined,
    f2: undefined,
    g2: undefined,
    h2: undefined,
    a1: undefined,
    b1: undefined,
    c1: undefined,
    d1: undefined,
    e1: undefined,
    f1: undefined,
    g1: undefined,
    h1: undefined,
});
exports.chessPlayerWhite = io.type({
    color: io.literal('white'),
    user: userRecord_1.userInfoRecord,
});
exports.chessPlayerBlack = io.type({
    color: io.literal('black'),
    user: userRecord_1.userInfoRecord,
});
exports.chessPlayer = io.union([exports.chessPlayerBlack, exports.chessPlayerWhite]);
exports.chessPlayers = io.type({
    white: exports.chessPlayerWhite,
    black: exports.chessPlayerBlack,
});
exports.chessColorWhite = io.keyof({ white: null });
exports.chessColorBlack = io.keyof({ black: null });
exports.chessGameColor = io.union([exports.chessColorWhite, exports.chessColorBlack]);
exports.chessPreferredColorOption = io.union([
    exports.chessColorBlack,
    exports.chessColorWhite,
    io.keyof({ random: null }),
]);
exports.chessGameStateFen = io.string;
exports.chessGameStatePgn = io.string;
exports.chessGameTimeLimit = io.keyof({
    bullet30: null,
    bullet1: null,
    blitz2: null,
    blitz3: null,
    blitz5: null,
    rapid10: null,
    rapid15: null,
    rapid20: null,
    rapid30: null,
    rapid45: null,
    rapid60: null,
    untimed: null,
});
exports.chessPlayersBySide = io.union([
    io.type({
        home: exports.chessPlayerWhite,
        away: exports.chessPlayerBlack,
    }),
    io.type({
        home: exports.chessPlayerBlack,
        away: exports.chessPlayerWhite,
    }),
]);
exports.partialChessPlayersBySide = io.union([
    io.type({
        home: exports.chessPlayer,
        away: io.undefined,
    }),
    io.type({
        home: io.undefined,
        away: exports.chessPlayer,
    }),
]);
exports.chessGameDrawOffer = io.type({
    id: io.string,
    type: io.literal('draw'),
    content: io.type({
        gameId: io.string,
        byUser: userRecord_1.userInfoRecord,
        toUser: userRecord_1.userInfoRecord,
        // @deprecate in favor of the avove
        by: exports.chessGameColor,
    }),
});
exports.gameSpecsRecord = io.type({
    timeLimit: exports.chessGameTimeLimit,
    preferredColor: exports.chessPreferredColorOption,
});
exports.chessGameRematchOffer = io.type({
    id: io.string,
    type: io.literal('rematch'),
    content: io.type({
        gameId: io.string,
        byUser: userRecord_1.userInfoRecord,
        toUser: userRecord_1.userInfoRecord,
        // @deprecate in favor of the avove
        by: exports.chessGameColor,
        gameSpecs: io.union([exports.gameSpecsRecord, io.undefined]),
    }),
});
exports.chessGameChallengeOffer = io.type({
    id: io.string,
    type: io.literal('challenge'),
    content: io.type({
        byUser: userRecord_1.userInfoRecord,
        toUser: userRecord_1.userInfoRecord,
        gameSpecs: exports.gameSpecsRecord,
    }),
});
exports.chessGameTakebackOffer = io.type({
    id: io.string,
    type: io.literal('takeback'),
    content: io.type({
        gameId: io.string,
        byUser: userRecord_1.userInfoRecord,
        toUser: userRecord_1.userInfoRecord,
    }),
});
exports.chessGameOffer = io.union([
    exports.chessGameDrawOffer,
    exports.chessGameRematchOffer,
    exports.chessGameChallengeOffer,
    exports.chessGameTakebackOffer,
]);
exports.capturedPiecesRecord = io.type({
    white: io.record(exports.capturableChessPieceType, io.number),
    black: io.record(exports.capturableChessPieceType, io.number),
});
exports.activePiecesRecord = exports.capturedPiecesRecord;
exports.chessMove = io.intersection([
    io.type({
        from: exports.chessSquare,
        to: exports.chessSquare,
    }),
    io.partial({
        promotion: exports.promotionalChessPieceType,
    }),
]);
exports.chessHistoryMove = io.intersection([
    exports.chessMove,
    io.type({
        san: io.string,
        color: exports.chessGameColor,
        clock: io.number,
    }),
]);
exports.chessHistory = io.array(exports.chessHistoryMove);
//# sourceMappingURL=utilRecords.js.map