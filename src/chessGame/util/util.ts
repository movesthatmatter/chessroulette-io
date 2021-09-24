import {
  ChessGameColor,
  ChessColorWhite,
  ChessColorBlack,
  CapturedPiecesRecord,
  ChessGameState,
  ChessHistory,
  ActivePiecesRecord,
} from '../records';
import { getNewChessGame } from '../sdk';
import { Move } from 'chess.js';
import { SimplePGN } from '../pgnUtil';
import { getRandomInt } from 'src/analysis/testUtil';

// I don't know why this needs to be typed like this
//  with a function declaration but if it's declared
//  as an anonymous function it throws a tsc error
export function otherChessColor<C extends ChessGameColor>(
  c: C
): C extends ChessColorWhite ? ChessColorBlack : ChessColorWhite;
export function otherChessColor<C extends ChessGameColor>(c: C) {
  return c === 'white' ? 'black' : 'white';
}

export const getRandomChessColor = () =>
  ['white', 'black'][Math.round(Math.random())] as ChessGameColor;

export const getCapturedPiecesState = (history: Move[]) => {
  const initial: CapturedPiecesRecord = {
    white: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    black: { p: 0, n: 0, b: 0, r: 0, q: 0 },
  };

  return history.reduce((acc, move) => {
    if (move.captured) {
      const piece = move.captured;

      acc[otherChessColor(move.color === 'w' ? 'white' : 'black')][piece] += 1;

      return acc;
    }

    return acc;
  }, initial);
};

export const getCapturedPiecesFromPgn = (pgn: ChessGameState['pgn']) => {
  const instance = getNewChessGame(pgn);

  return getCapturedPiecesState(instance.history({ verbose: true }));
};

export const getActivePieces = (history: Move[]): ActivePiecesRecord => {
  const initial = {
    w: { p: 8, n: 2, b: 2, r: 2, q: 1 },
    b: { p: 8, n: 2, b: 2, r: 2, q: 1 },
  };

  const result = history.reduce((acc, move) => {
    // If it's a capture substract it
    if (move.captured) {
      const piece = move.captured;
      const otherColor = move.color === 'b' ? 'w' : 'b';

      acc[otherColor][piece] = acc[otherColor][piece] - 1;
    }

    // If it's a promotion add it
    if (move.promotion && move.promotion !== 'k') {
      const piece = move.promotion;

      acc[move.color][piece] = acc[move.color][piece] + 1;
    }

    return acc;
  }, initial);

  return {
    white: result.w,
    black: result.b,
  };
};

// export const pgnToChessHistory = (pgn: SimplePGN | EnhancedPGN): ChessHistory => {
//   const instance = getNewChessGame(pgn);
// };

// Note this isn't History is just the Chess.js History aka Move[]
export const simplePGNtoMoves = (pgn: string): Move[] => {
  const instance = getNewChessGame(pgn);

  return instance.history({ verbose: true });
};

export const chessHistoryToSimplePgn = (history: ChessHistory): SimplePGN => {
  const instance = getNewChessGame();

  // TODO: This might not be the most efficient
  //  but it's ok for now to ensure the validaty of the pgn
  history.forEach((move) => {
    instance.move(move);
  });

  return instance.pgn() as SimplePGN;
};

export const simplePgnToChessHistory = (pgn: SimplePGN): ChessHistory => {
  const instance = getNewChessGame(pgn);

  return instance.history({ verbose: true }).reduce((prev, { promotion, ...move }) => {
    return [
      ...prev,
      {
        ...move,
        color: move.color === 'b' ? 'black' : 'white',
        clock: -1,
        ...(promotion &&
          promotion !== 'k' && {
            promotion,
          }),
      } as const,
    ];
  }, [] as ChessHistory);
};
