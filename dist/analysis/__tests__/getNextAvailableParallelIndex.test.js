"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../..//metadata/game");
var util_1 = require("../../util");
var analysisActions_1 = require("../analysisActions");
var testUtil_1 = require("../testUtil");
test('empty history w/o given index', function () {
    var history = [];
    var actual = analysisActions_1.getNextAvailableParallelIndex(history);
    var expected = 0;
    expect(actual).toEqual(expected);
});
test('history without branches w/o given index', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getNextAvailableParallelIndex(history);
    var expected = 3;
    expect(actual).toEqual(expected);
});
test('history without branches w given index as number', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getNextAvailableParallelIndex(history, 2);
    var expected = [2, 0];
    expect(actual).toEqual(expected);
});
test('history without branches w given index as number out of boundaries', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getNextAvailableParallelIndex(history, 200);
    var expected = 3;
    expect(actual).toEqual(expected);
});
test('history without branches w given index as NestedBranchIndex out of boundaries', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getNextAvailableParallelIndex(history, [200, 0, 1]);
    var expected = 3;
    expect(actual).toEqual(expected);
});
test('history without branches w given index and existing move w/o prior branches', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getNextAvailableParallelIndex(history, 2);
    var expected = [2, 0];
    expect(actual).toEqual(expected);
});
test('history with branches w/o given index', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var nestedMoves = [
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
    var nestedMoveIndex = 1;
    var nestedBranchIndex = 0;
    var nestedHistory = nestedMoves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [nestedMoveIndex, nestedBranchIndex])[0];
    }, history);
    var actual = analysisActions_1.getNextAvailableParallelIndex(nestedHistory);
    var expected = 3;
    expect(actual).toEqual(expected);
});
test('history with 1 level branch w given Nested Branched Index and move with existing branches', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var nestedMoves = [
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
    var nestedMoveIndex = 1;
    var nestedBranchIndex = 0;
    var nestedHistory = nestedMoves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [nestedMoveIndex, nestedBranchIndex])[0];
    }, history);
    var actual = analysisActions_1.getNextAvailableParallelIndex(nestedHistory, nestedMoveIndex);
    var expected = [1, 1];
    expect(actual).toEqual(expected);
});
test('history with 2nd level branch w given Nested Branched Index and move with existing branches', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var nestedMoves = [
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
    var nestedMoveIndex = 1;
    var nestedBranchIndex = 0;
    var nestedHistory = nestedMoves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [nestedMoveIndex, nestedBranchIndex])[0];
    }, history);
    var nestedLvl2Moves = [
        {
            from: 'h7',
            to: 'h6',
            san: 'h6',
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
        {
            from: 'h6',
            to: 'h5',
            san: 'h5',
            color: 'black',
            clock: util_1.seconds(1),
        },
    ];
    var nestedLvl2MoveIndex = 0;
    var nestedLvl2BranchIndex = 0;
    var nestedLvl2History = nestedLvl2Moves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [
            nestedMoveIndex,
            nestedBranchIndex,
            [nestedLvl2MoveIndex, nestedLvl2BranchIndex],
        ])[0];
    }, nestedHistory);
    var actual = analysisActions_1.getNextAvailableParallelIndex(nestedLvl2History, [
        nestedMoveIndex,
        nestedBranchIndex,
        [nestedLvl2MoveIndex, nestedLvl2BranchIndex, 1],
    ]);
    var expected = [
        nestedMoveIndex,
        nestedBranchIndex,
        [nestedLvl2MoveIndex, nestedLvl2BranchIndex, [1, 0]],
    ];
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=getNextAvailableParallelIndex.test.js.map