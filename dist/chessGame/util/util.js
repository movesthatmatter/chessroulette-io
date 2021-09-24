"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplePgnToChessHistory = exports.chessHistoryToSimplePgn = exports.simplePGNtoMoves = exports.getActivePieces = exports.getCapturedPiecesFromPgn = exports.getCapturedPiecesState = exports.getRandomChessColor = exports.otherChessColor = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("../sdk");
function otherChessColor(c) {
    return c === 'white' ? 'black' : 'white';
}
exports.otherChessColor = otherChessColor;
exports.getRandomChessColor = function () {
    return ['white', 'black'][Math.round(Math.random())];
};
exports.getCapturedPiecesState = function (history) {
    var initial = {
        white: { p: 0, n: 0, b: 0, r: 0, q: 0 },
        black: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    };
    return history.reduce(function (acc, move) {
        if (move.captured) {
            var piece = move.captured;
            acc[otherChessColor(move.color === 'w' ? 'white' : 'black')][piece] += 1;
            return acc;
        }
        return acc;
    }, initial);
};
exports.getCapturedPiecesFromPgn = function (pgn) {
    var instance = sdk_1.getNewChessGame(pgn);
    return exports.getCapturedPiecesState(instance.history({ verbose: true }));
};
exports.getActivePieces = function (history) {
    var initial = {
        w: { p: 8, n: 2, b: 2, r: 2, q: 1 },
        b: { p: 8, n: 2, b: 2, r: 2, q: 1 },
    };
    var result = history.reduce(function (acc, move) {
        // If it's a capture substract it
        if (move.captured) {
            var piece = move.captured;
            var otherColor = move.color === 'b' ? 'w' : 'b';
            acc[otherColor][piece] = acc[otherColor][piece] - 1;
        }
        // If it's a promotion add it
        if (move.promotion && move.promotion !== 'k') {
            var piece = move.promotion;
            acc[move.color][piece] = acc[move.color][piece] + 1;
        }
        return acc;
    }, initial);
    return {
        white: result.w,
        black: result.b,
    };
};
// export const pgnToChessHistory = (pgn: SimplePGN | EnhancedPGN): ChessHistory => {
//   const instance = getNewChessGame(pgn);
// };
// Note this isn't History is just the Chess.js History aka Move[]
exports.simplePGNtoMoves = function (pgn) {
    var instance = sdk_1.getNewChessGame(pgn);
    return instance.history({ verbose: true });
};
exports.chessHistoryToSimplePgn = function (history) {
    var instance = sdk_1.getNewChessGame();
    // TODO: This might not be the most efficient
    //  but it's ok for now to ensure the validaty of the pgn
    history.forEach(function (move) {
        instance.move(move);
    });
    return instance.pgn();
};
exports.simplePgnToChessHistory = function (pgn) {
    var instance = sdk_1.getNewChessGame(pgn);
    return instance.history({ verbose: true }).reduce(function (prev, _a) {
        var promotion = _a.promotion, move = tslib_1.__rest(_a, ["promotion"]);
        return tslib_1.__spreadArrays(prev, [
            tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, move), { color: move.color === 'b' ? 'black' : 'white', clock: -1 }), (promotion &&
                promotion !== 'k' && {
                promotion: promotion,
            })),
        ]);
    }, []);
};
//# sourceMappingURL=util.js.map