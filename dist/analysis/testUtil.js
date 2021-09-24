"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHistory = exports.getRandomInt = exports.pgnToChessHistory = exports.second = exports.seconds = void 0;
var tslib_1 = require("tslib");
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
        var promotion = _a.promotion, move = tslib_1.__rest(_a, ["promotion"]);
        var color = move.color === 'b' ? 'black' : 'white';
        var clock = prev.clocks[color] - getRandomInt(clockRange.minSeconds, clockRange.maxSeconds) * 1000;
        return tslib_1.__assign(tslib_1.__assign({}, prev), { clocks: tslib_1.__assign(tslib_1.__assign({}, prev.clocks), (_b = {}, _b[color] = clock, _b)), moves: tslib_1.__spreadArrays(prev.moves, [
                tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, move), { color: move.color === 'b' ? 'black' : 'white', clock: clock }), (promotion &&
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