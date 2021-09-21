"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_ts_isodatetime_1 = require("io-ts-isodatetime");
var gameActions_1 = require("../gameActions");
var date_fns_1 = require("date-fns");
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
describe('Invalid Moves', function () {
    test('it returns "pending" when the first move is invalid', function () {
        var now = io_ts_isodatetime_1.toISODateTime(new Date());
        var actualAsBlackFirst = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e7',
                to: 'e5',
            },
            movedAt: now,
        });
        var actualWithInvalidMove = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e2',
                to: 'f2',
            },
            movedAt: now,
        });
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
        expect(actualAsBlackFirst).toEqual(expected);
        expect(actualWithInvalidMove).toEqual(expected);
    });
    test('it returns the prev state when a "started" game receives an invalid move', function () {
        var now = io_ts_isodatetime_1.toISODateTime(new Date());
        var whiteMovedFirst = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e2',
                to: 'e4',
            },
            movedAt: now,
        });
        var actual = gameActions_1.actions.move(whiteMovedFirst, {
            move: {
                from: 'e2',
                to: 'f2',
            },
            movedAt: now,
        });
        var expected = {
            startedAt: now,
            lastMoveAt: now,
            lastActivityAt: now,
            lastMoveBy: 'white',
            pgn: '1. e4',
            history: [
                {
                    from: 'e2',
                    to: 'e4',
                    san: 'e4',
                    color: 'white',
                    clock: 300 * 1000,
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
                black: 300 * 1000,
                white: 300 * 1000,
            },
            timeLimit: 'blitz5',
            winner: undefined,
        };
        expect(actual).toEqual(expected);
    });
    test('it returns the prev state when a "started" game receives the same move multiple times', function () {
        var now = io_ts_isodatetime_1.toISODateTime(new Date());
        var whiteMovedFirst = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e2',
                to: 'e4',
            },
            movedAt: now,
        });
        var actual = gameActions_1.actions.move(whiteMovedFirst, {
            move: {
                from: 'e2',
                to: 'e4',
            },
            movedAt: now,
        });
        var expected = {
            startedAt: now,
            lastMoveAt: now,
            lastActivityAt: now,
            lastMoveBy: 'white',
            pgn: '1. e4',
            history: [
                {
                    from: 'e2',
                    to: 'e4',
                    san: 'e4',
                    color: 'white',
                    clock: 300 * 1000,
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
                black: 300 * 1000,
                white: 300 * 1000,
            },
            timeLimit: 'blitz5',
            winner: undefined,
        };
        expect(actual).toEqual(expected);
    });
});
describe('Valid Moves on "started" game', function () {
    test('makes a first move as white', function () {
        var now = io_ts_isodatetime_1.toISODateTime(new Date());
        var actual = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e2',
                to: 'e4',
            },
            movedAt: now,
        });
        var expected = {
            startedAt: now,
            lastMoveAt: now,
            lastActivityAt: now,
            lastMoveBy: 'white',
            pgn: '1. e4',
            history: [
                {
                    from: 'e2',
                    to: 'e4',
                    san: 'e4',
                    color: 'white',
                    clock: 300 * 1000,
                },
            ],
            players: [
                {
                    color: actual.players[0].color,
                    user: playerA,
                },
                {
                    color: actual.players[1].color,
                    user: playerB,
                },
            ],
            state: 'started',
            timeLeft: {
                black: 300000,
                white: 300000,
            },
            timeLimit: 'blitz5',
            winner: undefined,
        };
        expect(actual).toEqual(expected);
    });
    test('makes a first move with both colors', function () {
        var now = new Date();
        var startedGame = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e2',
                to: 'e4',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(now),
        });
        var actual = gameActions_1.actions.move(startedGame, {
            move: {
                from: 'e7',
                to: 'e5',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(date_fns_1.addSeconds(now, 5)),
        });
        var expected = {
            startedAt: io_ts_isodatetime_1.toISODateTime(now),
            lastMoveAt: io_ts_isodatetime_1.toISODateTime(date_fns_1.addSeconds(now, 5)),
            lastActivityAt: io_ts_isodatetime_1.toISODateTime(date_fns_1.addSeconds(now, 5)),
            lastMoveBy: 'black',
            pgn: '1. e4 e5',
            history: [
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
            ],
            players: [
                {
                    color: actual.players[0].color,
                    user: playerA,
                },
                {
                    color: actual.players[1].color,
                    user: playerB,
                },
            ],
            state: 'started',
            timeLeft: {
                white: 300000,
                black: 295 * 1000,
            },
            timeLimit: 'blitz5',
            winner: undefined,
        };
        expect(actual).toEqual(expected);
    });
    test('the clock adjusts correctly', function () {
        var now = new Date();
        var w1At = now;
        var w1 = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e2',
                to: 'e4',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(w1At),
        });
        var b1At = date_fns_1.addSeconds(w1At, 3);
        var b1 = gameActions_1.actions.move(w1, {
            move: {
                from: 'e7',
                to: 'e5',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(b1At),
        });
        var w2At = date_fns_1.addSeconds(b1At, 13);
        var w2 = gameActions_1.actions.move(b1, {
            move: {
                from: 'd2',
                to: 'd4',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(w2At),
        });
        var b2At = date_fns_1.addSeconds(w2At, 19);
        var b2 = gameActions_1.actions.move(w2, {
            move: {
                from: 'd7',
                to: 'd6',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(b2At),
        });
        var expected = {
            startedAt: io_ts_isodatetime_1.toISODateTime(w1At),
            lastMoveAt: io_ts_isodatetime_1.toISODateTime(b2At),
            lastActivityAt: io_ts_isodatetime_1.toISODateTime(b2At),
            lastMoveBy: 'black',
            pgn: '1. e4 e5 2. d4 d6',
            history: [
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
                    clock: 297 * 1000,
                },
                {
                    from: 'd2',
                    to: 'd4',
                    san: 'd4',
                    color: 'white',
                    clock: 287 * 1000,
                },
                {
                    from: 'd7',
                    to: 'd6',
                    san: 'd6',
                    color: 'black',
                    clock: 278 * 1000,
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
                white: 287 * 1000,
                black: 278 * 1000,
            },
            timeLimit: 'blitz5',
            winner: undefined,
        };
        expect(b2).toEqual(expected);
    });
});
describe('Time Running out', function () {
    test('makes after the time left has passed', function () {
        var now = new Date();
        var w1At = now;
        var w1 = gameActions_1.actions.move(pendingGame, {
            move: {
                from: 'e2',
                to: 'e4',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(w1At),
        });
        var b1At = date_fns_1.addSeconds(now, 5);
        var b1 = gameActions_1.actions.move(w1, {
            move: {
                from: 'e7',
                to: 'e5',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(b1At),
        });
        var w2At = date_fns_1.addSeconds(b1At, 300 * 1000); // More than the allowed time
        var w2 = gameActions_1.actions.move(b1, {
            move: {
                from: 'd2',
                to: 'd4',
            },
            movedAt: io_ts_isodatetime_1.toISODateTime(w2At),
        });
        var expected = {
            startedAt: io_ts_isodatetime_1.toISODateTime(w1At),
            lastActivityAt: io_ts_isodatetime_1.toISODateTime(w2At),
            lastMoveAt: io_ts_isodatetime_1.toISODateTime(b1At),
            lastMoveBy: 'black',
            pgn: '1. e4 e5',
            history: [
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
                black: 295 * 1000,
            },
            timeLimit: 'blitz5',
            winner: 'black',
        };
        expect(w2).toEqual(expected);
    });
});
//# sourceMappingURL=gameActions.move.test.js.map