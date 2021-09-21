"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../chessGame/util");
var game_1 = require("../../metadata/game");
var util_2 = require("../../util");
var analysisActions_1 = require("../analysisActions");
var testUtil_1 = require("../testUtil");
test('empty history', function () {
    var history = [];
    var actual = analysisActions_1.getHistoryBranch(history);
    var expected = [];
    expect(actual).toEqual(expected);
});
test('history without branches w/o given index', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getHistoryBranch(history);
    var expected = history;
    expect(actual).toEqual(expected);
});
test('history without branches w given index as number', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getHistoryBranch(history, 2);
    var expected = history;
    expect(actual).toEqual(expected);
});
test('history without branches w given index as number out of boundaries', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getHistoryBranch(history, 200);
    var expected = history;
    expect(actual).toEqual(expected);
});
test('history without branches w given index as branchIndex', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getHistoryBranch(history, [0, 0, 1]);
    var expected = history;
    expect(actual).toEqual(expected);
});
test('history without branches w given index as NestdedBranchIndex and move Index out of boundaries', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var actual = analysisActions_1.getHistoryBranch(history, [200, 0, 1]);
    var expected = history;
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
            clock: util_2.seconds(1),
        },
        {
            from: 'd7',
            to: 'd6',
            san: 'd6',
            color: 'black',
            clock: util_2.seconds(1),
        },
    ];
    var nestedMoveIndex = 1;
    var nestedBranchIndex = 0;
    var nestedHistory = nestedMoves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [nestedMoveIndex, nestedBranchIndex])[0];
    }, history);
    var actual = analysisActions_1.getHistoryBranch(nestedHistory);
    var expected = history;
    expect(util_1.chessHistoryToSimplePgn(actual)).toEqual(util_1.chessHistoryToSimplePgn(expected));
});
test('history with 1 level branch w given branched index', function () {
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
            clock: util_2.seconds(1),
        },
        {
            from: 'd7',
            to: 'd6',
            san: 'd6',
            color: 'black',
            clock: util_2.seconds(1),
        },
    ];
    var nestedMoveIndex = 1;
    var nestedBranchIndex = 0;
    var nestedHistory = nestedMoves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [nestedMoveIndex, nestedBranchIndex])[0];
    }, history);
    var actual = util_1.chessHistoryToSimplePgn(analysisActions_1.getHistoryBranch(nestedHistory, [nestedMoveIndex, nestedBranchIndex]));
    var expected = "1. e4 c5 2. d4 d6";
    expect(actual).toEqual(expected);
});
test('history with 2nd level branches w given branched index', function () {
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
            clock: util_2.seconds(1),
        },
        {
            from: 'd7',
            to: 'd6',
            san: 'd6',
            color: 'black',
            clock: util_2.seconds(1),
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
            clock: util_2.seconds(1),
        },
        {
            from: 'a2',
            to: 'a3',
            san: 'a3',
            color: 'white',
            clock: util_2.seconds(1),
        },
        {
            from: 'h6',
            to: 'h5',
            san: 'h5',
            color: 'black',
            clock: util_2.seconds(1),
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
    var actualHistory = analysisActions_1.getHistoryBranch(nestedLvl2History, [
        nestedMoveIndex,
        nestedBranchIndex,
        [nestedLvl2MoveIndex, nestedLvl2BranchIndex, 0],
    ]);
    var actual = util_1.chessHistoryToSimplePgn(actualHistory);
    var expected = "1. e4 c5 2. d4 h6 3. a3 h5";
    expect(actual).toEqual(expected);
});
test('history with 2 parallel branches w given branched index', function () {
    var pgn = '1. e4 c5 2. Nf3';
    var history = testUtil_1.pgnToChessHistory(pgn, {
        white: game_1.chessGameTimeLimitMsMap.blitz3,
        black: game_1.chessGameTimeLimitMsMap.blitz3,
    });
    var parallelMoves = [
        {
            from: 'd2',
            to: 'd4',
            san: 'd4',
            color: 'white',
            clock: util_2.seconds(1),
        },
        {
            from: 'd7',
            to: 'd6',
            san: 'd6',
            color: 'black',
            clock: util_2.seconds(1),
        },
    ];
    var nestedMoveIndex = 1;
    var nestedBranchIndex = 0;
    var parallelBranchHistory = parallelMoves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [nestedMoveIndex, nestedBranchIndex])[0];
    }, history);
    var parallel2ndBranchMoves = [
        {
            from: 'a2',
            to: 'a3',
            san: 'a3',
            color: 'white',
            clock: util_2.seconds(1),
        },
        {
            from: 'h7',
            to: 'h6',
            san: 'h6',
            color: 'black',
            clock: util_2.seconds(1),
        },
        {
            from: 'a3',
            to: 'a4',
            san: 'a4',
            color: 'white',
            clock: util_2.seconds(1),
        },
    ];
    var nestedParallel2ndBranchMoveIndex = nestedMoveIndex;
    var nestedParallel2ndBranchBranchIndex = 1;
    var parallel2ndBranchHistory = parallel2ndBranchMoves.reduce(function (prev, nextMove) {
        return analysisActions_1.addMoveToChessHistory(prev, nextMove, [
            nestedParallel2ndBranchMoveIndex,
            nestedParallel2ndBranchBranchIndex,
        ])[0];
    }, parallelBranchHistory);
    var actualHistory = analysisActions_1.getHistoryBranch(parallel2ndBranchHistory, [
        nestedParallel2ndBranchMoveIndex,
        nestedParallel2ndBranchBranchIndex,
    ]);
    var actual = util_1.chessHistoryToSimplePgn(actualHistory);
    var expected = "1. e4 c5 2. a3 h6 3. a4";
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=getHistoryBranch.test.js.map