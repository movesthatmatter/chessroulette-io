import { toISODateTime } from 'io-ts-isodatetime';
import { UserInfoRecord } from '../../../records/userRecord';
import { actions } from '../gameActions';
import { ChessGameStatePending, ChessGameStateStarted } from '../../records';
import { addSeconds } from 'date-fns';

const playerA: UserInfoRecord = {
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

const playerB: UserInfoRecord = {
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

const pendingGame = actions.prepareGame({
  players: [playerA, playerB],
  timeLimit: 'blitz5',
  preferredColor: 'white',
}) as ChessGameStatePending;

describe('Invalid Moves', () => {
  test('it returns "pending" when the first move is invalid', () => {
    const now = toISODateTime(new Date());

    const actualAsBlackFirst = actions.move(pendingGame, {
      move: {
        from: 'e7',
        to: 'e5',
      },
      movedAt: now,
    });

    const actualWithInvalidMove = actions.move(pendingGame, {
      move: {
        from: 'e2',
        to: 'f2',
      },
      movedAt: now,
    });

    const expected = {
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

  test('it returns the prev state when a "started" game receives an invalid move', () => {
    const now = toISODateTime(new Date());

    const whiteMovedFirst = actions.move(pendingGame, {
      move: {
        from: 'e2',
        to: 'e4',
      },
      movedAt: now,
    }) as ChessGameStateStarted;

    const actual = actions.move(whiteMovedFirst, {
      move: {
        from: 'e2',
        to: 'f2',
      },
      movedAt: now,
    });

    const expected = {
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

  test('it returns the prev state when a "started" game receives the same move multiple times', () => {
    const now = toISODateTime(new Date());

    const whiteMovedFirst = actions.move(pendingGame, {
      move: {
        from: 'e2',
        to: 'e4',
      },
      movedAt: now,
    }) as ChessGameStateStarted;

    const actual = actions.move(whiteMovedFirst, {
      move: {
        from: 'e2',
        to: 'e4',
      },
      movedAt: now,
    }) as ChessGameStateStarted;

    const expected = {
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

describe('Valid Moves on "started" game', () => {
  test('makes a first move as white', () => {
    const now = toISODateTime(new Date());

    const actual = actions.move(pendingGame, {
      move: {
        from: 'e2',
        to: 'e4',
      },
      movedAt: now,
    });

    const expected = {
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

  test('makes a first move with both colors', () => {
    const now = new Date();

    const startedGame = actions.move(pendingGame, {
      move: {
        from: 'e2',
        to: 'e4',
      },
      movedAt: toISODateTime(now),
    }) as ChessGameStateStarted;

    const actual = actions.move(startedGame, {
      move: {
        from: 'e7',
        to: 'e5',
      },
      movedAt: toISODateTime(addSeconds(now, 5)),
    });

    const expected = {
      startedAt: toISODateTime(now),
      lastMoveAt: toISODateTime(addSeconds(now, 5)),
      lastActivityAt: toISODateTime(addSeconds(now, 5)),
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

  test('the clock adjusts correctly', () => {
    const now = new Date();

    const w1At = now;
    const w1 = actions.move(pendingGame, {
      move: {
        from: 'e2',
        to: 'e4',
      },
      movedAt: toISODateTime(w1At),
    }) as ChessGameStateStarted;

    const b1At = addSeconds(w1At, 3);
    const b1 = actions.move(w1, {
      move: {
        from: 'e7',
        to: 'e5',
      },
      movedAt: toISODateTime(b1At),
    }) as ChessGameStateStarted;

    const w2At = addSeconds(b1At, 13);
    const w2 = actions.move(b1, {
      move: {
        from: 'd2',
        to: 'd4',
      },
      movedAt: toISODateTime(w2At),
    }) as ChessGameStateStarted;

    const b2At = addSeconds(w2At, 19);
    const b2 = actions.move(w2, {
      move: {
        from: 'd7',
        to: 'd6',
      },
      movedAt: toISODateTime(b2At),
    }) as ChessGameStateStarted;

    const expected = {
      startedAt: toISODateTime(w1At),
      lastMoveAt: toISODateTime(b2At),
      lastActivityAt: toISODateTime(b2At),
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

describe('Time Running out', () => {
  test('makes after the time left has passed', () => {
    const now = new Date();

    const w1At = now;
    const w1 = actions.move(pendingGame, {
      move: {
        from: 'e2',
        to: 'e4',
      },
      movedAt: toISODateTime(w1At),
    }) as ChessGameStateStarted;

    const b1At = addSeconds(now, 5);
    const b1 = actions.move(w1, {
      move: {
        from: 'e7',
        to: 'e5',
      },
      movedAt: toISODateTime(b1At),
    }) as ChessGameStateStarted;

    const w2At = addSeconds(b1At, 300 * 1000); // More than the allowed time
    const w2 = actions.move(b1, {
      move: {
        from: 'd2',
        to: 'd4',
      },
      movedAt: toISODateTime(w2At),
    });

    const expected = {
      startedAt: toISODateTime(w1At),
      lastActivityAt: toISODateTime(w2At),
      lastMoveAt: toISODateTime(b1At),
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
