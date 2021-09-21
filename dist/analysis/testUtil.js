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
exports.printHistory = exports.getRandomInt = exports.pgnToChessHistory = exports.second = exports.seconds = void 0;
var sdk_1 = require("../chessGame/sdk");
exports.seconds = function (int) { return int * exports.second(); };
exports.second = function () { return 1000; };
exports.pgnToChessHistory = function (pgn, timeLimit, clockRange) {
    if (clockRange === void 0) { clockRange = {
        minSeconds: 0,
        maxSeconds: 3,
    }; }
    var instance = sdk_1.getNewChessGame(pgn);
    var r = instance.history({ verbose: true }).reduce(function (prev, _a) {
        var _b;
        var promotion = _a.promotion, move = __rest(_a, ["promotion"]);
        var color = move.color === 'b' ? 'black' : 'white';
        var clock = prev.clocks[color] - getRandomInt(clockRange.minSeconds, clockRange.maxSeconds) * 1000;
        return __assign(__assign({}, prev), { clocks: __assign(__assign({}, prev.clocks), (_b = {}, _b[color] = clock, _b)), moves: __spreadArrays(prev.moves, [
                __assign(__assign(__assign({}, move), { color: move.color === 'b' ? 'black' : 'white', clock: clock }), (promotion &&
                    promotion !== 'k' && {
                    promotion: promotion,
                })),
            ]) });
    }, {
        clocks: timeLimit,
        moves: [],
    });
    return r.moves;
};
/**
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 *
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(givenMin, givenMax) {
    var min = Math.ceil(givenMin);
    var max = Math.floor(givenMax);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
exports.printHistory = function (h, baseIndex) {
    if (baseIndex === void 0) { baseIndex = 0; }
    console.group('Printing  History:');
    h.forEach(function (m, i) {
        var index = baseIndex + i;
        console.log('move', Math.floor(index / 2) + 1 + "." + (index % 2 === 0 ? 'w' : 'b'), m.san);
        if (m.branchedHistories) {
            console.log('branches', m.branchedHistories);
            m.branchedHistories.forEach(function (branchedHistory) {
                exports.printHistory(branchedHistory, index + 1);
            });
        }
    });
    console.groupEnd();
    console.log(JSON.stringify(h, null, 2));
};
//# sourceMappingURL=testUtil.js.map