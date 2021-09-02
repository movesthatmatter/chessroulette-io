"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplePgnToChessHistory = exports.chessHistoryToSimplePgn = exports.simplePGNtoMoves = exports.getActivePieces = exports.getCapturedPiecesFromPgn = exports.getCapturedPiecesState = exports.getRandomChessColor = exports.otherChessColor = void 0;
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
        var promotion = _a.promotion, move = __rest(_a, ["promotion"]);
        return __spreadArrays(prev, [
            __assign(__assign(__assign({}, move), { color: move.color === 'b' ? 'black' : 'white', clock: -1 }), (promotion &&
                promotion !== 'k' && {
                promotion: promotion,
            })),
        ]);
    }, []);
};
//# sourceMappingURL=util.js.map