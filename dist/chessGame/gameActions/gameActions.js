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
exports.actions = void 0;
var util_1 = require("../util/util");
var sdk_1 = require("../sdk");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var game_1 = require("../../metadata/game");
function prepareGameAction(props) {
    if ('history' in props && props.history.length > 0) {
        return prepareStartedGame(props);
    }
    return preparePendingGame(props);
}
var preparePendingGame = function (_a) {
    var players = _a.players, timeLimit = _a.timeLimit, _b = _a.preferredColor, preferredColor = _b === void 0 ? 'random' : _b;
    var firstPlayerColor = preferredColor === 'random' ? util_1.getRandomChessColor() : preferredColor;
    return {
        state: 'pending',
        timeLimit: timeLimit,
        players: [
            {
                color: firstPlayerColor,
                user: players[0],
            },
            {
                color: util_1.otherChessColor(firstPlayerColor),
                user: players[1],
            },
        ],
        timeLeft: {
            white: game_1.chessGameTimeLimitMsMap[timeLimit],
            black: game_1.chessGameTimeLimitMsMap[timeLimit],
        },
        // @deprecate
        pgn: undefined,
        history: undefined,
        winner: undefined,
        lastMoveAt: undefined,
        lastMoveBy: undefined,
        startedAt: undefined,
        lastActivityAt: undefined,
    };
};
var prepareStartedGame = function (props) {
    var _a, _b;
    var pendingGame = preparePendingGame(props);
    // If there is no History Length Given return the pending
    if (props.history.length === 0) {
        return pendingGame;
    }
    var instance = sdk_1.getNewChessGame();
    // Load the current history
    var isValid = instance.load_pgn(util_1.chessHistoryToSimplePgn(props.history));
    if (!isValid) {
        return pendingGame;
    }
    // If it's white's turn that means black moved last!
    var lastMovedBy = instance.turn() === 'w' ? 'black' : 'white';
    var last2Moves = props.history.slice(-2);
    var nextGame = __assign(__assign({}, pendingGame), { timeLeft: __assign(__assign(__assign({}, pendingGame.timeLeft), (last2Moves[0] && (_a = {},
            _a[last2Moves[0].color] = last2Moves[0].clock,
            _a))), (last2Moves[1] && (_b = {},
            _b[last2Moves[1].color] = last2Moves[1].clock,
            _b))), lastMoveAt: props.lastMoveAt, history: props.history, pgn: instance.pgn(), lastMoveBy: lastMovedBy, lastActivityAt: props.lastMoveAt, 
        // This is a bit of a hack since we don't know the startedAt at this point
        // TODO: Maybe in the future this should also be adjusted
        startedAt: props.lastMoveAt });
    if (instance.game_over()) {
        return __assign(__assign({}, nextGame), { state: 'finished', winner: instance.in_draw() ? '1/2' : lastMovedBy });
    }
    return __assign(__assign({}, nextGame), { state: 'started', winner: undefined });
};
var moveAction = function (prev, _a) {
    var _b, _c;
    var move = _a.move, movedAt = _a.movedAt;
    // Default it to black so when the game just starts it sets the 1st move to white
    var _d = prev.lastMoveBy, prevTurn = _d === void 0 ? 'black' : _d;
    var turn = util_1.otherChessColor(prevTurn);
    var movedAtAsDate = new Date(movedAt);
    // If it's a pending game the lastMove becomes the movedAt for now.
    // TODO: Later on, when there will be a distinction between first move and game "start"
    //  or maybe there will be another state: "ready", where the game is started automatically
    //  by the system (epecially for an oficial game) and not the first move
    var lastMoveAt = prev.state === 'pending' ? movedAtAsDate : new Date(prev.lastMoveAt);
    var elapsed = movedAtAsDate.getTime() - lastMoveAt.getTime();
    var nextTimeLeft = prev.timeLeft[turn] - elapsed;
    // Finish The Game if the time has passed
    if (prev.timeLimit !== 'untimed' && prev.state !== 'pending' && nextTimeLeft < 0) {
        return __assign(__assign({}, prev), { state: 'finished', timeLeft: __assign(__assign({}, prev.timeLeft), (_b = {}, _b[turn] = 0, _b)), winner: prevTurn, 
            // Last activity is the state change!
            lastActivityAt: movedAt });
    }
    var instance = sdk_1.getNewChessGame();
    var isValidPgn = prev.state === 'pending' || instance.load_pgn(util_1.chessHistoryToSimplePgn(prev.history));
    if (!isValidPgn) {
        return prev;
    }
    var validMove = instance.move(move);
    if (!validMove) {
        return prev;
    }
    var promotion = validMove.promotion, flags = validMove.flags, piece = validMove.piece, restValidMove = __rest(validMove, ["promotion", "flags", "piece"]);
    var nextMove = __assign(__assign(__assign({}, restValidMove), (promotion &&
        promotion !== 'k' && {
        promotion: promotion,
    })), { color: validMove.color === 'b' ? 'black' : 'white', clock: nextTimeLeft });
    var nextHistory = __spreadArrays((prev.history || []), [nextMove]);
    var nextStartedGameProps = {
        state: 'started',
        pgn: instance.pgn(),
        history: nextHistory,
        lastMoveAt: movedAt,
        lastMoveBy: turn,
        timeLeft: __assign(__assign({}, prev.timeLeft), (_c = {}, _c[turn] = nextTimeLeft, _c)),
        winner: undefined,
        lastActivityAt: movedAt,
    };
    if (prev.state === 'pending') {
        return __assign(__assign(__assign({}, prev), nextStartedGameProps), { startedAt: movedAt });
    }
    if (instance.game_over()) {
        return __assign(__assign(__assign({}, prev), nextStartedGameProps), { state: 'finished', winner: instance.in_draw() ? '1/2' : turn, pgn: instance.pgn(), history: nextHistory, lastMoveAt: movedAt, lastMoveBy: turn, lastActivityAt: movedAt });
    }
    return __assign(__assign({}, prev), nextStartedGameProps);
};
var statusCheck = function (prev, at) {
    var _a;
    if (prev.state === 'started') {
        var turn = util_1.otherChessColor(prev.lastMoveBy);
        var delta = at.getTime() - (new Date(prev.lastMoveAt).getTime() + prev.timeLeft[turn]);
        if (delta > 0) {
            return __assign(__assign({}, prev), { state: 'finished', winner: prev.lastMoveBy, timeLeft: __assign(__assign({}, prev.timeLeft), (_a = {}, _a[turn] = 0, _a)) });
        }
    }
    return prev;
};
// @deprecated
var timerFinishedAction = function (prev) {
    return __assign(__assign({}, prev), { state: 'finished', winner: util_1.otherChessColor(prev.lastMoveBy) });
};
var abortAction = function (prev) {
    return __assign(__assign({}, prev), { state: 'neverStarted', lastActivityAt: io_ts_isodatetime_1.toISODateTime(new Date()) });
};
var resignAction = function (prev, resigningColor) {
    return __assign(__assign({}, prev), { state: 'stopped', winner: util_1.otherChessColor(resigningColor) });
};
var takebackAction = function (prev, _a) {
    var _b;
    var movedAt = _a.movedAt;
    var updateHistory = prev.history.slice(0, prev.history.length - 1);
    var newPGN = util_1.chessHistoryToSimplePgn(updateHistory);
    // const instance = getNewChessGame(newPGN);
    // const moveAtAsDate = new Date(moveAt);
    // const lastMoveAt = new Date(prev.lastMoveAt);
    // const turn  = prev.lastMoveBy;
    // const elapsed = moveAtAsDate.getTime() - lastMoveAt.getTime();
    // const nextTimeLeft = prev.timeLeft[turn] - elapsed;
    // return {
    //   ...prev,
    //   history: updateHistory,
    //   pgn: newPGN,
    //   lastMoveBy: otherChessColor(prev.lastMoveBy),
    // };
    var _c = prev.lastMoveBy, prevTurn = _c === void 0 ? 'black' : _c;
    var turn = util_1.otherChessColor(prevTurn);
    var movedAtAsDate = new Date(movedAt);
    var lastMoveAt = new Date(prev.lastMoveAt);
    var elapsed = movedAtAsDate.getTime() - lastMoveAt.getTime();
    var nextTimeLeft = prev.timeLeft[turn] - elapsed;
    // const nextMove: ChessHistoryMove = {
    //   ...restValidMove,
    //   ...(promotion &&
    //     promotion !== 'k' && {
    //       promotion,
    //     }),
    //   color: validMove.color === 'b' ? 'black' : 'white',
    //   clock: nextTimeLeft,
    // };
    //const nextHistory = [...(prev.history || []), nextMove];
    var nextStartedGameProps = {
        state: 'started',
        pgn: newPGN,
        history: updateHistory,
        lastMoveAt: movedAt,
        lastMoveBy: turn,
        timeLeft: __assign(__assign({}, prev.timeLeft), (_b = {}, _b[turn] = nextTimeLeft, _b)),
        winner: undefined,
        lastActivityAt: movedAt,
    };
    return __assign(__assign({}, prev), nextStartedGameProps);
};
var drawAction = function (prev) {
    return __assign(__assign({}, prev), { state: 'stopped', winner: '1/2' });
};
exports.actions = {
    prepareGame: prepareGameAction,
    move: moveAction,
    resign: resignAction,
    draw: drawAction,
    abort: abortAction,
    statusCheck: statusCheck,
    takeback: takebackAction,
    // @deprecate in favor of statusCheck
    timerFinished: timerFinishedAction,
};
//# sourceMappingURL=gameActions.js.map