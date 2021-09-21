"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.milliseconds = exports.second = exports.seconds = exports.minutes = exports.hours = void 0;
var gameActions_1 = require("../gameActions");
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var date_fns_1 = require("date-fns");
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
var pendingGame = gameActions_1.actions.prepareGame({
    players: [playerA, playerB],
    timeLimit: 'blitz5',
    preferredColor: 'white',
});
test('returns the same state for a pending game', function () {
    var expected = {
        lastMoveAt: undefined,
        lastMoveBy: undefined,
        pgn: undefined,
        history: undefined,
        players: [
            {
                color: 'white',
                user: playerA,
            },
            {
                color: 'black',
                user: playerB,
            },
        ],
        state: 'pending',
        timeLeft: {
            black: 300000,
            white: 300000,
        },
        timeLimit: 'blitz5',
        winner: undefined,
    };
    var now = new Date();
    var actual = gameActions_1.actions.statusCheck(pendingGame, now);
    expect(actual).toEqual(expected);
});
test('returns the same state for a started game that still has time left', function () {
    var startTime = new Date();
    var startedGame = gameActions_1.actions.move(pendingGame, {
        move: {
            from: 'e2',
            to: 'e4',
        },
        movedAt: io_ts_isodatetime_1.toISODateTime(startTime),
    });
    var blackMovedAt = date_fns_1.addSeconds(startTime, 15);
    var blackMoved = gameActions_1.actions.move(startedGame, {
        move: {
            from: 'e7',
            to: 'e5',
        },
        movedAt: io_ts_isodatetime_1.toISODateTime(blackMovedAt),
    });
    var expected = {
        startedAt: io_ts_isodatetime_1.toISODateTime(startTime),
        lastActivityAt: io_ts_isodatetime_1.toISODateTime(blackMovedAt),
        lastMoveAt: io_ts_isodatetime_1.toISODateTime(blackMovedAt),
        lastMoveBy: 'black',
        pgn: '1. e4 e5',
        history: [
            {
                from: 'e2',
                to: 'e4',
                clock: 300 * 1000,
                color: 'white',
                san: 'e4',
            },
            {
                from: 'e7',
                to: 'e5',
                clock: 285 * 1000,
                color: 'black',
                san: 'e5',
            },
        ],
        players: [
            {
                color: 'white',
                user: playerA,
            },
            {
                color: 'black',
                user: playerB,
            },
        ],
        state: 'started',
        timeLeft: {
            white: 300 * 1000,
            black: 285 * 1000,
        },
        timeLimit: 'blitz5',
        winner: undefined,
    };
    var actual = gameActions_1.actions.statusCheck(blackMoved, date_fns_1.addSeconds(startTime, 50));
    expect(actual).toEqual(expected);
});
test('returns the "finished" state for a started game that does NOT have any time left', function () {
    var startTime = new Date();
    var startedGame = gameActions_1.actions.move(pendingGame, {
        move: {
            from: 'e2',
            to: 'e4',
        },
        movedAt: io_ts_isodatetime_1.toISODateTime(startTime),
    });
    var blackMovedAt = date_fns_1.addSeconds(startTime, 15);
    var blackMoved = gameActions_1.actions.move(startedGame, {
        move: {
            from: 'e7',
            to: 'e5',
        },
        movedAt: io_ts_isodatetime_1.toISODateTime(blackMovedAt),
    });
    var expected = {
        startedAt: io_ts_isodatetime_1.toISODateTime(startTime),
        lastMoveAt: io_ts_isodatetime_1.toISODateTime(blackMovedAt),
        lastActivityAt: io_ts_isodatetime_1.toISODateTime(blackMovedAt),
        lastMoveBy: 'black',
        pgn: '1. e4 e5',
        history: [
            {
                from: 'e2',
                to: 'e4',
                san: 'e4',
                clock: 300 * 1000,
                color: 'white',
            },
            {
                from: 'e7',
                to: 'e5',
                san: 'e5',
                clock: 285 * 1000,
                color: 'black',
            },
        ],
        players: [
            {
                color: 'white',
                user: playerA,
            },
            {
                color: 'black',
                user: playerB,
            },
        ],
        state: 'finished',
        timeLeft: {
            white: 0,
            black: 285 * 1000,
        },
        timeLimit: 'blitz5',
        winner: 'black',
    };
    var actual = gameActions_1.actions.statusCheck(blackMoved, date_fns_1.addSeconds(startTime, 300 * 1000));
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=gameActions.statusCheck.test.js.map