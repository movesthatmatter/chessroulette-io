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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../../metadata/game");
var util_1 = require("../../util");
var analysisActions_1 = require("../analysisActions");
var testUtil_1 = require("../testUtil");
test('empty history', function () {
    var history = [];
    var move = {
        from: 'e2',
        to: 'e4',
        san: 'e4',
        color: 'white',
        clock: util_1.seconds(10),
    };
    var _a = analysisActions_1.addMoveToChessHistory(history, move), actualHistory = _a[0], actualIndex = _a[1];
    var expectedHistory = [move];
    var expectedIndex = 0;
    expect(actualHistory).toEqual(expectedHistory);
    expect(actualIndex).toEqual(expectedIndex);
});
test('adds a further move', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var move = {
        from: 'e2',
        to: 'e4',
        san: 'e4',
        color: 'white',
        clock: util_1.seconds(10),
    };
    var _a = analysisActions_1.addMoveToChessHistory(history, move), actualHistory = _a[0], actualIndex = _a[1];
    var expectedHistory = __spreadArrays(history, [move]);
    var expectedIndex = 3;
    expect(actualHistory).toEqual(expectedHistory);
    expect(actualIndex).toEqual(expectedIndex);
});
test('adds a single branched move as white', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var originalHistory = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var displayedMoveIndex = 1;
    var branchIndex = 0;
    var move = {
        from: 'd2',
        to: 'd4',
        san: 'd4',
        color: 'white',
        clock: util_1.seconds(10),
    };
    var _a = analysisActions_1.addMoveToChessHistory(originalHistory, move, [
        displayedMoveIndex,
        branchIndex,
    ]), actualHistory = _a[0], actualIndex = _a[1];
    var expectedHistory = __spreadArrays(originalHistory.slice(0, displayedMoveIndex), [
        __assign(__assign({}, originalHistory[displayedMoveIndex]), { branchedHistories: [[move]] })
    ], originalHistory.slice(displayedMoveIndex + 1));
    var expectedIndex = [displayedMoveIndex, branchIndex, 0];
    expect(actualHistory).toEqual(expectedHistory);
    expect(actualIndex).toEqual(expectedIndex);
});
test('adds a single branched move as black', function () {
    var pgn = '1. e4 c5 2. Nf3 Nf6';
    var originalHistory = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var displayedMoveIndex = 2;
    var branchIndex = 0;
    var move = {
        from: 'd7',
        to: 'd6',
        san: 'd6',
        color: 'black',
        clock: util_1.seconds(10),
    };
    var _a = analysisActions_1.addMoveToChessHistory(originalHistory, move, [
        displayedMoveIndex,
        branchIndex,
    ]), actualHistory = _a[0], actualIndex = _a[1];
    var expectedHistory = __spreadArrays(originalHistory.slice(0, displayedMoveIndex), [
        __assign(__assign({}, originalHistory[displayedMoveIndex]), { branchedHistories: [[move]] })
    ], originalHistory.slice(displayedMoveIndex + 1));
    var expectedIndex = [displayedMoveIndex, branchIndex, 0];
    expect(actualHistory).toEqual(expectedHistory);
    expect(actualIndex).toEqual(expectedIndex);
});
test('adds multiple consecutive moves in one branch', function () {
    var pgn = '1. e4 c5 2. Nf3 Nf6 3. a4 a6';
    // const pgn = '1. e4 c5';
    var originalHistory = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var moves = [
        {
            from: 'd2',
            to: 'd4',
            san: 'd4',
            color: 'white',
            clock: util_1.seconds(1),
        },
        {
            from: 'd7',
            to: 'd6',
            san: 'd6',
            color: 'black',
            clock: util_1.seconds(1),
        },
        {
            from: 'a2',
            to: 'a3',
            san: 'a3',
            color: 'white',
            clock: util_1.seconds(1),
        },
    ];
    var displayedMoveIndex = 1;
    var branchIndex = 0;
    var historyWithMoves = moves
        .slice(0, -1)
        .reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [displayedMoveIndex, branchIndex])[0];
    }, originalHistory);
    var _a = analysisActions_1.addMoveToChessHistory(historyWithMoves, moves.slice(-1)[0], [
        displayedMoveIndex,
        branchIndex,
    ]), actualHistory = _a[0], actualIndex = _a[1];
    var expectedHistory = __spreadArrays(originalHistory.slice(0, displayedMoveIndex), [
        __assign(__assign({}, originalHistory[displayedMoveIndex]), { branchedHistories: [moves] })
    ], originalHistory.slice(displayedMoveIndex + 1));
    var expectedIndex = [displayedMoveIndex, branchIndex, 2];
    expect(actualHistory).toEqual(expectedHistory);
    expect(actualIndex).toEqual(expectedIndex);
});
test('adds one move in a nested branch', function () {
    var pgn = '1. e4 c5 2. Nf3 Nf6 3. a4 a6';
    var originalHistory = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var movesBranch1 = [
        {
            from: 'd2',
            to: 'd4',
            san: 'd4',
            color: 'white',
            clock: util_1.seconds(1),
        },
        {
            from: 'd7',
            to: 'd6',
            san: 'd6',
            color: 'black',
            clock: util_1.seconds(1),
        },
    ];
    var rootMoveIndex = 2;
    var rootBranchIndex = 0;
    var historyWithOneBranchedMove = movesBranch1.reduce(function (prev, nextMove) { return analysisActions_1.addMoveToChessHistory(prev, nextMove, [rootMoveIndex, rootBranchIndex])[0]; }, originalHistory);
    var movesBranch1Nested = [
        {
            from: 'a7',
            to: 'a5',
            san: 'a5',
            color: 'black',
            clock: util_1.seconds(1),
        },
    ];
    var nestedMoveIndex = 1;
    var branchIndex = 0;
    var _a = analysisActions_1.addMoveToChessHistory(historyWithOneBranchedMove, movesBranch1Nested[0], [rootMoveIndex, branchIndex, [nestedMoveIndex, branchIndex]]), actualHistory = _a[0], actualIndex = _a[1];
    var expectedHistory = __spreadArrays(originalHistory.slice(0, rootMoveIndex), [
        __assign(__assign({}, originalHistory[rootMoveIndex]), { branchedHistories: [
                __spreadArrays(movesBranch1.slice(0, nestedMoveIndex), [
                    __assign(__assign({}, movesBranch1[nestedMoveIndex]), { branchedHistories: [movesBranch1Nested] })
                ], movesBranch1.slice(nestedMoveIndex + 1)),
            ] })
    ], originalHistory.slice(rootMoveIndex + 1));
    var expectedIndex = [rootMoveIndex, rootBranchIndex, [nestedMoveIndex, branchIndex, 0]];
    expect(actualHistory).toEqual(expectedHistory);
    expect(actualIndex).toEqual(expectedIndex);
});
test('adds one move in a parallel branch', function () {
    var pgn = '1. e4 c5 2. Nf3 Nf6 3. a4 a6';
    var originalHistory = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var movesBranch1 = [
        {
            from: 'd2',
            to: 'd4',
            san: 'd4',
            color: 'white',
            clock: util_1.seconds(1),
        },
        {
            from: 'd7',
            to: 'd6',
            san: 'd6',
            color: 'black',
            clock: util_1.seconds(1),
        },
    ];
    var displayedMoveIndex = 1;
    var historyWithOneBranchedMove = movesBranch1.reduce(function (prev, nextMove) { return analysisActions_1.addMoveToChessHistory(prev, nextMove, [displayedMoveIndex, 0])[0]; }, originalHistory);
    var movesBranch2 = [
        {
            from: 'a2',
            to: 'a4',
            san: 'a4',
            color: 'white',
            clock: util_1.seconds(1),
        },
        {
            from: 'a7',
            to: 'a5',
            san: 'a5',
            color: 'black',
            clock: util_1.seconds(1),
        },
        {
            from: 'g1',
            to: 'f3',
            san: 'Nf3',
            color: 'black',
            clock: util_1.seconds(1),
        },
    ];
    var branchIndex = 1;
    var historyWithAnoterBranchedMove = movesBranch2
        .slice(0, -1)
        .reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [displayedMoveIndex, branchIndex])[0];
    }, historyWithOneBranchedMove);
    var _a = analysisActions_1.addMoveToChessHistory(historyWithAnoterBranchedMove, movesBranch2.slice(-1)[0], [displayedMoveIndex, branchIndex]), actualHistory = _a[0], actualIndex = _a[1];
    var expectedHistory = __spreadArrays(originalHistory.slice(0, displayedMoveIndex), [
        __assign(__assign({}, originalHistory[displayedMoveIndex]), { branchedHistories: [movesBranch1, movesBranch2] })
    ], originalHistory.slice(displayedMoveIndex + 1));
    var expectedIndex = [displayedMoveIndex, branchIndex, 2];
    expect(actualHistory).toEqual(expectedHistory);
    expect(actualIndex).toEqual(expectedIndex);
});
//# sourceMappingURL=addMoveToChessHistory.test.js.map