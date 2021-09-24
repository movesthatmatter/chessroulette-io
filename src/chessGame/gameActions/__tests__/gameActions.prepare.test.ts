import { UserInfoRecord } from '../../../records/userRecord';
import { actions } from '../gameActions';
import { ChessHistory } from '../../records';
import { toISODateTime } from 'io-ts-isodatetime';

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

test('creates an empty game with random color', () => {
  const actual = actions.prepareGame({
    players: [playerA, playerB],
    timeLimit: 'blitz5',
  });

  const expected = {
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

test('creates an empty game with preferred color', () => {
  const actual = actions.prepareGame({
    players: [playerA, playerB],
    timeLimit: 'blitz5',
    preferredColor: 'black',
  });

  const expected = {
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

test('creates a game with preferred color and given empty history', () => {
  const actual = actions.prepareGame({
    players: [playerA, playerB],
    timeLimit: 'blitz5',
    preferredColor: 'black',
  });

  const expected = {
    lastMoveAt: actual.lastMoveAt, // Can't predict the last moveAt since it isn't stored in the pgn
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

test('creates a game with preferred color and given history as started game', () => {
  const startedGameHistory: ChessHistory = [
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

  const now = toISODateTime(new Date());

  const actual = actions.prepareGame({
    players: [playerA, playerB],
    timeLimit: 'blitz5',
    preferredColor: 'black',
    history: startedGameHistory,
    lastMoveAt: now,
  });

  const expected = {
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

test('creates a "finished" game with preferred color and given history', () => {
  const finishedGameHistory: ChessHistory = [
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

  const now = toISODateTime(new Date());

  const actual = actions.prepareGame({
    players: [playerA, playerB],
    timeLimit: 'blitz5',
    preferredColor: 'black',
    history: finishedGameHistory,
    lastMoveAt: now,
  });

  const expected = {
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
