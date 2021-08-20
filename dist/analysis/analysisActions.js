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
exports.actions = exports.getNextAvailableParallelIndex = exports.incrementChessRecursiveHistoryIndex = exports.getBranchedHistoryLastIndex = exports.getHistoryBranch = exports.getChessHistoryMoveIndex = exports.normalizeChessHistoryIndex = exports.isChessHistoryIndexEqualTo = exports.isChessHistoryIndexLowerThan = exports.isChessHistoryIndexHigherThan = exports.decrementChessHistoryIndex = exports.incrementChessHistoryIndex = exports.getAllFollowingMoves = exports.every = exports.getAlternativeFollowingMoves = exports.getMainFollowingMove = exports.getMoveAtIndex = exports.getBranchAtIndex = exports.getChessHistoryAtIndex = exports.addMoveToChessHistoryAtNextAvailableIndex = exports.addMoveToChessHistory = exports.getNestedChessHistoryIndex = exports.isChessRecursiveHistoryIndex = void 0;
exports.isChessRecursiveHistoryIndex = function (a) {
    return Array.isArray(a) &&
        (a.length === 2 || a.length === 3) &&
        typeof a[0] === 'number' &&
        typeof a[1] === 'number';
};
exports.getNestedChessHistoryIndex = function (i) {
    return typeof i !== 'number' ? i[2] : undefined;
};
exports.addMoveToChessHistory = function (history, m, chessHistoryIndex) {
    if (exports.isChessRecursiveHistoryIndex(chessHistoryIndex)) {
        var moveIndex = chessHistoryIndex[0], branchIndex = chessHistoryIndex[1], nestedBranchedHistoryOrMoveIndex = chessHistoryIndex[2];
        var nestedBranchIndex = exports.isChessRecursiveHistoryIndex(nestedBranchedHistoryOrMoveIndex)
            ? nestedBranchedHistoryOrMoveIndex
            : undefined;
        var currentMove = history[moveIndex];
        if (currentMove.branchedHistories) {
            var _a = exports.addMoveToChessHistory(currentMove.branchedHistories[branchIndex], m, nestedBranchIndex), nextNestedHistory = _a[0], nextNestedHistoryIndex = _a[1];
            var nextBranchedHistories_1 = currentMove.branchedHistories
                ? __spreadArrays(currentMove.branchedHistories.slice(0, branchIndex), [
                    nextNestedHistory
                ], currentMove.branchedHistories.slice(branchIndex + 1)) : [[m]];
            var nextHistory_1 = __spreadArrays(history.slice(0, moveIndex), [
                __assign(__assign({}, history[moveIndex]), { branchedHistories: nextBranchedHistories_1 })
            ], history.slice(moveIndex + 1));
            return [nextHistory_1, [moveIndex, branchIndex, nextNestedHistoryIndex]];
        }
        var nextBranchedHistories = [[m]];
        var nextHistory_2 = __spreadArrays(history.slice(0, moveIndex), [
            __assign(__assign({}, history[moveIndex]), { branchedHistories: nextBranchedHistories })
        ], history.slice(moveIndex + 1));
        return [nextHistory_2, [moveIndex, 0, 0]];
    }
    if (typeof chessHistoryIndex === 'number' && chessHistoryIndex < history.length - 1) {
        var nextHistory_3 = __spreadArrays(history.slice(0, chessHistoryIndex), [
            __assign(__assign({}, history[chessHistoryIndex]), { branchedHistories: [[m]] })
        ], history.slice(chessHistoryIndex + 1));
        return [nextHistory_3, [chessHistoryIndex, 0, 0]];
    }
    var nextHistory = __spreadArrays((history || []), [m]);
    return [nextHistory, nextHistory.length - 1];
};
// Adds a new move from the given index at the next availalbe slot
//  In case of a nested move it simply adds a new branch if the move not already there
//  If the move is already present as a following move (on the main or branched histories) it simply refocuses
//  Otherwise it appends it to the given history
exports.addMoveToChessHistoryAtNextAvailableIndex = function (history, atIndex, move) {
    var lastIndexInBranch = exports.getBranchedHistoryLastIndex(history, atIndex);
    // If the Branched History atIndex is the last one or not given, just append it to the current history branch
    if (!(exports.normalizeChessHistoryIndex(atIndex) < exports.normalizeChessHistoryIndex(lastIndexInBranch))) {
        return exports.addMoveToChessHistory(history, move, atIndex);
    }
    var foundFollowingMoveAndIndex = exports.getAllFollowingMoves(history, atIndex).find(function (_a) {
        var m = _a[0];
        return m.san === move.san;
    });
    // If the move is the same as an already following history branch just refocus on it
    if (foundFollowingMoveAndIndex) {
        var _ = foundFollowingMoveAndIndex[0], followingFoundIndex = foundFollowingMoveAndIndex[1];
        return [history, followingFoundIndex];
    }
    // Otherwise add a parallel history branch for the move
    return exports.addMoveToChessHistory(history, move, exports.getNextAvailableParallelIndex(history, atIndex));
};
exports.getChessHistoryAtIndex = function (history, index) {
    if (index === undefined) {
        return history;
    }
    if (typeof index === 'number') {
        return history.slice(0, index + 1);
    }
    var moveIndex = index[0], branchIndex = index[1], nestedBranchedHistoryOrMoveIndex = index[2];
    var move = history[moveIndex];
    if (!move) {
        return []; // return an empty history if index is out of bounderies
    }
    // If the move doesn't have branches just slice it up to the move index
    if (!move.branchedHistories) {
        return history.slice(0, moveIndex + 1);
    }
    // If the given branch doesn't exist just slice it up to the move index
    if (!move.branchedHistories[branchIndex]) {
        return history.slice(0, moveIndex + 1);
    }
    return __spreadArrays(history.slice(0, moveIndex + 1), exports.getChessHistoryAtIndex(move.branchedHistories[branchIndex], nestedBranchedHistoryOrMoveIndex));
};
exports.getBranchAtIndex = function (history, index) {
    var _a, _b;
    // If number just return the history (aka the main branch)
    if (typeof index === 'number') {
        return history;
    }
    var moveIndex = index[0], branchIndex = index[1], nestedIndex = index[2];
    var branch = (_b = (_a = history[moveIndex]) === null || _a === void 0 ? void 0 : _a.branchedHistories) === null || _b === void 0 ? void 0 : _b[branchIndex];
    if (!branch) {
        return undefined;
    }
    if (!exports.isChessRecursiveHistoryIndex(nestedIndex)) {
        return branch;
    }
    return exports.getBranchAtIndex(branch, nestedIndex);
};
exports.getMoveAtIndex = function (history, index) {
    if (index === undefined) {
        return undefined;
    }
    if (typeof index === 'number') {
        return history[index];
    }
    var moveIndex = index[0], branchIndex = index[1], nestedBranchedHistoryOrMoveIndex = index[2];
    var move = history[moveIndex];
    if (!move) {
        return undefined; // return undefined
    }
    // If the move doesn't have branches return undefined
    if (!move.branchedHistories) {
        return undefined;
    }
    // If the given branch doesn't exist just return undefined
    if (!move.branchedHistories[branchIndex]) {
        return undefined;
    }
    return exports.getMoveAtIndex(move.branchedHistories[branchIndex], nestedBranchedHistoryOrMoveIndex);
};
exports.getMainFollowingMove = function (history, atIndex) {
    var followingIndex = exports.incrementChessHistoryIndex(atIndex);
    var followingMove = exports.getMoveAtIndex(history, followingIndex);
    return followingMove ? [followingMove, followingIndex] : undefined;
};
exports.getAlternativeFollowingMoves = function (history, atIndex) {
    var move = exports.getMoveAtIndex(history, atIndex);
    if (!(move && move.branchedHistories)) {
        return [];
    }
    var deconstructedAtIndex = [];
    exports.every(atIndex, function (i) { return deconstructedAtIndex.push(i); }, { reverse: true });
    return move.branchedHistories
        .map(function (branch, branchIndex) {
        var branchMoveIndex = 0;
        var followingMove = branch[branchMoveIndex];
        if (!followingMove) {
            return undefined;
        }
        var reconstructedFollowingMoveIndex = deconstructedAtIndex.reduce(function (prev, nextIndex) {
            // First position only
            if (typeof nextIndex === 'number') {
                return [nextIndex, branchIndex, 0];
            }
            return [nextIndex[0], nextIndex[1], prev];
        }, []);
        return [followingMove, reconstructedFollowingMoveIndex];
    })
        .filter(function (m) { return !!m; });
};
// The fn params:
//   - i as number -> means it's the last one,
//   - i as BranchHistoryIndex -> means it has another nested one
exports.every = function (index, fn, p) {
    if (p === void 0) { p = {}; }
    if (typeof index === 'number') {
        fn(index);
        return;
    }
    var moveIndex = index[0], branchIndex = index[1], nestedBranchedIndex = index[2];
    if (p.reverse) {
        exports.every(nestedBranchedIndex || 0, fn, p);
        fn([moveIndex, branchIndex]);
    }
    else {
        fn([moveIndex, branchIndex]);
        exports.every(nestedBranchedIndex || 0, fn, p);
    }
};
exports.getAllFollowingMoves = function (history, atIndex) {
    var mainFollowingMove = exports.getMainFollowingMove(history, atIndex);
    var alternativeFollowingMoves = exports.getAlternativeFollowingMoves(history, atIndex);
    return __spreadArrays((mainFollowingMove ? [mainFollowingMove] : []), alternativeFollowingMoves);
};
exports.incrementChessHistoryIndex = function (index) {
    if (index === undefined) {
        return 0;
    }
    if (typeof index === 'number') {
        return index + 1;
    }
    return [index[0], index[1], exports.incrementChessHistoryIndex(index[2])];
};
exports.decrementChessHistoryIndex = function (index) {
    if (index === undefined) {
        return 0;
    }
    if (typeof index === 'number') {
        return index - 1;
    }
    var nestedBranchedIndex = exports.decrementChessHistoryIndex(index[2]);
    // If the nested branched index is smaller than 0 it means the branch is exhausted
    //  and it's time to jump to the root move
    if (typeof nestedBranchedIndex === 'number' && nestedBranchedIndex < 0) {
        return index[0];
    }
    return [index[0], index[1], nestedBranchedIndex];
};
exports.isChessHistoryIndexHigherThan = function (comparingIndex, toIndex) { return exports.normalizeChessHistoryIndex(comparingIndex) > exports.normalizeChessHistoryIndex(toIndex); };
exports.isChessHistoryIndexLowerThan = function (comparingIndex, toIndex) { return exports.isChessHistoryIndexHigherThan(toIndex, comparingIndex); };
exports.isChessHistoryIndexEqualTo = function (comparingIndex, toIndex) {
    return !(exports.isChessHistoryIndexHigherThan(comparingIndex, toIndex) ||
        exports.isChessHistoryIndexLowerThan(comparingIndex, toIndex));
};
exports.normalizeChessHistoryIndex = function (index) {
    if (index === void 0) { index = 0; }
    if (typeof index === 'number') {
        return index; // add the 2 other 0s so it's equal to the nested return
    }
    var _ = index[0], __ = index[1], nestedMoveIndex = index[2];
    // const denormalizedNestedMoveIndex =
    //   typeof nestedMoveIndex === 'number' ? nestedMoveIndex / 100 : nestedMoveIndex;
    var flattendBranchIndex = exports.normalizeChessHistoryIndex(nestedMoveIndex);
    var next = Number("" + index[0] + index[1] + (flattendBranchIndex > 0 ? flattendBranchIndex : ''));
    return next;
};
exports.getChessHistoryMoveIndex = function (index) {
    if (index === undefined) {
        return 0;
    }
    if (typeof index === 'number') {
        return index;
    }
    return index[0] + exports.getChessHistoryMoveIndex(index[2]);
};
exports.getHistoryBranch = function (history, fromIndex) {
    // If it's already a number (moveIndex) the actual history is the correct branch
    if (typeof fromIndex === 'number' || fromIndex === undefined) {
        return history;
    }
    var moveIndex = fromIndex[0], branchIndex = fromIndex[1], nestedBranchedHistoryOrMoveIndex = fromIndex[2];
    var move = history[moveIndex];
    // If the move doesn't exist just return the history
    if (!move) {
        return history;
    }
    // If the move doesn't have branches just return the history
    if (!move.branchedHistories) {
        return history;
    }
    // If the given branch doesn't exist just return the history
    if (!move.branchedHistories[branchIndex]) {
        return history;
    }
    return __spreadArrays(history.slice(0, moveIndex + 1), exports.getHistoryBranch(move.branchedHistories[branchIndex], nestedBranchedHistoryOrMoveIndex));
};
exports.getBranchedHistoryLastIndex = function (history, fromIndex) {
    // If it's already a number (moveIndex) the actual history is the correct branch
    if (typeof fromIndex === 'number' || fromIndex === undefined) {
        return history.length - 1;
    }
    var moveIndex = fromIndex[0], branchIndex = fromIndex[1], nestedBranchedHistoryOrMoveIndex = fromIndex[2];
    var move = history[moveIndex];
    // If the move doesn't exist just return the last in history
    if (!move) {
        return history.length - 1;
    }
    // If the move doesn't have branches just return the last in history
    if (!move.branchedHistories) {
        return history.length - 1;
    }
    // If the given branch doesn't exist just return the last in history
    if (!move.branchedHistories[branchIndex]) {
        return history.length - 1;
    }
    return [
        moveIndex,
        branchIndex,
        exports.getBranchedHistoryLastIndex(move.branchedHistories[branchIndex], nestedBranchedHistoryOrMoveIndex),
    ];
};
exports.incrementChessRecursiveHistoryIndex = function (index) {
    var moveIndex = index[0], branchIndex = index[1], nestedBranchIndex = index[2];
    if (exports.isChessRecursiveHistoryIndex(nestedBranchIndex)) {
        return [moveIndex, branchIndex, exports.incrementChessRecursiveHistoryIndex(nestedBranchIndex)];
    }
    return [moveIndex, branchIndex + 1];
};
exports.getNextAvailableParallelIndex = function (history, fromIndex) {
    // If the index isn't given the next avaialable position is at the end of history
    if (fromIndex === undefined) {
        return history.length;
    }
    if (typeof fromIndex === 'number') {
        var move_1 = history[fromIndex];
        if (!move_1) {
            return history.length;
        }
        // If the move exists than the next available index is within a new nested branch inside the move
        return [fromIndex, (move_1.branchedHistories || []).length];
    }
    var moveIndex = fromIndex[0], branchIndex = fromIndex[1], nestedBranchOrMoveIndex = fromIndex[2];
    var move = history[moveIndex];
    if (!move) {
        return history.length;
    }
    // If there aren't any branches the nestedBranchOrMoveIndex doesn't matter
    //  just return the next available branch (which is the 1st one)
    if (!move.branchedHistories) {
        return [moveIndex, 0];
    }
    // If the branch index is out of range return the next available one
    if (!move.branchedHistories[branchIndex]) {
        return [moveIndex, move.branchedHistories.length];
    }
    return [
        moveIndex,
        branchIndex,
        exports.getNextAvailableParallelIndex(move.branchedHistories[branchIndex], nestedBranchOrMoveIndex),
    ];
};
exports.actions = {};
//# sourceMappingURL=analysisActions.js.map