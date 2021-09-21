import { UserInfoRecord } from '../../../records/userRecord';
import { actions } from '../gameActions';
import { ChessGameStateStarted } from '../../records';
import { toISODateTime } from 'io-ts-isodatetime';
import { addSeconds } from 'date-fns';

export const hours = (int: number) => int * minutes(60);
export const minutes = (int: number) => int * seconds(60);
export const seconds = (int: number) => int * second();
export const second = () => 1000;
export const milliseconds = (int: number) => int;

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
});

test('returns the same state for a pending game', () => {
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

  const now = new Date();

  const actual = actions.statusCheck(pendingGame, now);

  expect(actual).toEqual(expected);
});

test('returns the same state for a started game that still has time left', () => {
  const startTime = new Date();
  const startedGame = actions.move(pendingGame, {
    move: {
      from: 'e2',
      to: 'e4',
    },
    movedAt: toISODateTime(startTime),
  }) as ChessGameStateStarted;

  const blackMovedAt = addSeconds(startTime, 15);
  const blackMoved = actions.move(startedGame, {
    move: {
      from: 'e7',
      to: 'e5',
    },
    movedAt: toISODateTime(blackMovedAt),
  });

  const expected = {
    startedAt: toISODateTime(startTime),
    lastActivityAt: toISODateTime(blackMovedAt),
    lastMoveAt: toISODateTime(blackMovedAt),
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

  const actual = actions.statusCheck(blackMoved, addSeconds(startTime, 50));

  expect(actual).toEqual(expected);
});

test('returns the "finished" state for a started game that does NOT have any time left', () => {
  const startTime = new Date();
  const startedGame = actions.move(pendingGame, {
    move: {
      from: 'e2',
      to: 'e4',
    },
    movedAt: toISODateTime(startTime),
  }) as ChessGameStateStarted;

  const blackMovedAt = addSeconds(startTime, 15);
  const blackMoved = actions.move(startedGame, {
    move: {
      from: 'e7',
      to: 'e5',
    },
    movedAt: toISODateTime(blackMovedAt),
  });

  const expected = {
    startedAt: toISODateTime(startTime),
    lastMoveAt: toISODateTime(blackMovedAt),
    lastActivityAt: toISODateTime(blackMovedAt),
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

  const actual = actions.statusCheck(blackMoved, addSeconds(startTime, 300 * 1000));

  expect(actual).toEqual(expected);
});
