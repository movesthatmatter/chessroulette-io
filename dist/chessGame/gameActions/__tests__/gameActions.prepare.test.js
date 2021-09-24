"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.milliseconds = exports.second = exports.seconds = exports.minutes = exports.hours = void 0;
var gameActions_1 = require("../gameActions");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
exports.hours = function (int) { return int * exports.minutes(60); };
exports.minutes = function (int) { return int * exports.seconds(60); };
exports.seconds = function (int) { return int * exports.second(); };
exports.second = function () { return 1000; };
exports.milliseconds = function (int) { return int; };
var playerA = {
    id: '1',
    firstName: 'Mikhael',
    lastName: 'Tal',
    avatarId: '12',
    name: 'Mikhael Tal',
    isGuest: false,
    profilePicUrl: '',
    username: 'mikhael.tal',
    country: {
        name: 'Latvia',
        code: 'LV',
        languages: ['russian'],
        flagEmoji: '',
        flagEmojiU: '',
        phone: '',
        currency: '',
    },
};
var playerB = {
    id: '2',
    firstName: 'Mikhael',
    lastName: 'Botvinik',
    avatarId: '11',
    name: 'Mikhael Botvinik',
    isGuest: false,
    profilePicUrl: '',
    username: 'mikhael.botvinik',
    country: {
        name: 'Russia',
        code: 'RU',
        languages: ['russian'],
        flagEmoji: '',
        flagEmojiU: '',
        phone: '',
        currency: '',
    },
};
test('creates an empty game with random color', function () {
    var actual = gameActions_1.actions.prepareGame({
        players: [playerA, playerB],
        timeLimit: 'blitz5',
    });
    var expected = {
        lastMoveAt: undefined,
        lastMoveBy: undefined,
        pgn: undefined,
        history: undefined,
        players: [{
                color: actual.players[0].color,
                user: playerA,
            }, {
                color: actual.players[1].color,
                user: playerB,
            }],
        state: 'pending',
        timeLeft: {
            black: 300000,
            white: 300000,
        },
        timeLimit: 'blitz5',
        winner: undefined,
    };
    expect(actual).toEqual(expected);
});
test('creates an empty game with preferred color', function () {
    var actual = gameActions_1.actions.prepareGame({
        players: [playerA, playerB],
        timeLimit: 'blitz5',
        preferredColor: 'black',
    });
    var expected = {
        lastMoveAt: undefined,
        lastMoveBy: undefined,
        pgn: undefined,
        history: undefined,
        players: [
            {
                color: 'black',
                user: playerA,
            },
            {
                color: 'white',
                user: playerB,
            }
        ],
        state: 'pending',
        timeLeft: {
            black: 300000,
            white: 300000,
        },
        timeLimit: 'blitz5',
        winner: undefined,
    };
    expect(actual).toEqual(expected);
});
test('creates a game with preferred color and given empty history', function () {
    var actual = gameActions_1.actions.prepareGame({
        players: [playerA, playerB],
        timeLimit: 'blitz5',
        preferredColor: 'black',
    });
    var expected = {
        lastMoveAt: actual.lastMoveAt,
        lastMoveBy: undefined,
        history: undefined,
        pgn: undefined,
        players: [
            {
                color: 'black',
                user: playerA,
            },
            {
                color: 'white',
                user: playerB,
            }
        ],
        state: 'pending',
        timeLeft: {
            black: 300 * 1000,
            white: 300 * 1000,
        },
        timeLimit: 'blitz5',
        winner: undefined,
    };
    expect(actual).toEqual(expected);
});
test('creates a game with preferred color and given history as started game', function () {
    var startedGameHistory = [
        {
            from: 'e2',
            to: 'e4',
            san: 'e4',
            color: 'white',
            clock: 300 * 1000,
        },
        {
            from: 'e7',
            to: 'e5',
            san: 'e5',
            color: 'black',
            clock: 295 * 1000,
        },
    ];
    var now = io_ts_isodatetime_1.toISODateTime(new Date());
    var actual = gameActions_1.actions.prepareGame({
        players: [playerA, playerB],
        timeLimit: 'blitz5',
        preferredColor: 'black',
        history: startedGameHistory,
        lastMoveAt: now,
    });
    var expected = {
        startedAt: now,
        lastActivityAt: now,
        lastMoveAt: now,
        lastMoveBy: 'black',
        history: startedGameHistory,
        pgn: '1. e4 e5',
        players: [
            {
                color: 'black',
                user: playerA,
            },
            {
                color: 'white',
                user: playerB,
            }
        ],
        state: 'started',
        timeLeft: {
            white: 300 * 1000,
            black: 295 * 1000,
        },
        timeLimit: 'blitz5',
        winner: undefined,
    };
    expect(actual).toEqual(expected);
});
test('creates a "finished" game with preferred color and given history', function () {
    var finishedGameHistory = [
        {
            from: 'e2',
            to: 'e4',
            san: 'e4',
            color: 'white',
            clock: 300 * 1000,
        },
        {
            from: 'f7',
            to: 'f6',
            san: 'f6',
            color: 'black',
            clock: 298 * 1000,
        },
        {
            from: 'd2',
            to: 'd4',
            san: 'd4',
            color: 'white',
            clock: 299 * 1000,
        },
        {
            from: 'g7',
            to: 'g5',
            san: 'g5',
            color: 'black',
            clock: 295 * 1000,
        },
        {
            from: 'd1',
            to: 'h5',
            san: 'h5',
            color: 'white',
            clock: 291 * 1000,
        },
    ];
    var now = io_ts_isodatetime_1.toISODateTime(new Date());
    var actual = gameActions_1.actions.prepareGame({
        players: [playerA, playerB],
        timeLimit: 'blitz5',
        preferredColor: 'black',
        history: finishedGameHistory,
        lastMoveAt: now,
    });
    var expected = {
        startedAt: now,
        lastActivityAt: now,
        lastMoveAt: now,
        lastMoveBy: 'white',
        pgn: '1. e4 f6 2. d4 g5 3. Qh5#',
        history: finishedGameHistory,
        players: [
            {
                color: 'black',
                user: playerA,
            },
            {
                color: 'white',
                user: playerB,
            }
        ],
        state: 'finished',
        timeLeft: {
            white: 291 * 1000,
            black: 295 * 1000,
        },
        timeLimit: 'blitz5',
        winner: 'white',
    };
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=gameActions.prepare.test.js.map