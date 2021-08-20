import { getNewChessGame } from '../chessGame/sdk';
import { ChessHistory, ChessRecursiveHistory } from '../chessGame';

export const seconds = (int: number) => int * second();
export const second = () => 1000;

export const pgnToChessHistory = (
  pgn: string,
  timeLimit: {
    white: number;
    black: number;
  },
  clockRange: {
    minSeconds: number;
    maxSeconds: number;
  } = {
    minSeconds: 0,
    maxSeconds: 3,
  }
): ChessHistory => {
  const instance = getNewChessGame(pgn);

  const r = instance.history({ verbose: true }).reduce(
    (prev, { promotion, ...move }) => {
      const color = move.color === 'b' ? 'black' : 'white';
      const clock =
        prev.clocks[color] - getRandomInt(clockRange.minSeconds, clockRange.maxSeconds) * 1000;

      return {
        ...prev,
        clocks: {
          ...prev.clocks,
          [color]: clock,
        },
        moves: [
          ...prev.moves,
          {
            ...move,
            color: move.color === 'b' ? 'black' : 'white',
            clock,
            ...(promotion &&
              promotion !== 'k' && {
                promotion,
              }),
          } as const,
        ],
      };
    },
    {
      clocks: timeLimit,
      moves: [] as ChessHistory,
    }
  );

  return r.moves;
};

/**
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 *
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(givenMin: number, givenMax: number) {
  const min = Math.ceil(givenMin);
  const max = Math.floor(givenMax);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const printHistory = (h: ChessRecursiveHistory, baseIndex: number = 0) => {
  console.group('Printing  History:');
  h.forEach((m, i) => {
    const index = baseIndex + i;
    console.log('move', `${Math.floor(index / 2) + 1}.${index % 2 === 0 ? 'w' : 'b'}`, m.san);
    if (m.branchedHistories) {
      console.log('branches', m.branchedHistories);
      m.branchedHistories.forEach((branchedHistory) => {
        printHistory(branchedHistory, index + 1);
      });
    }
  });
  console.groupEnd();

  console.log(JSON.stringify(h, null, 2));
};
