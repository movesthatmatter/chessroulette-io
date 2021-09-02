import { SimplePGN } from '../pgnUtil';
import {
  chessHistoryToSimplePgn,
  getActivePieces,
  simplePgnToChessHistory,
  simplePGNtoMoves,
} from './util';

export const hours = (int: number) => int * minutes(60);
export const minutes = (int: number) => int * seconds(60);
export const seconds = (int: number) => int * second();
export const second = () => 1000;
export const milliseconds = (int: number) => int;

describe('chessHistoryToSimplePgn', () => {
  test('First Move', () => {
    const actual = chessHistoryToSimplePgn([
      {
        from: 'e2',
        to: 'e4',
        san: 'e4',
        color: 'white',
        clock: minutes(1),
      },
    ]);

    const expected = '1. e4';

    expect(actual).toBe(expected);
  });

  test('Multiple Moves', () => {
    const actual = chessHistoryToSimplePgn([
      {
        from: 'e2',
        to: 'e4',
        san: 'e4',
        color: 'white',
        clock: minutes(1),
      },
      {
        from: 'e7',
        to: 'e5',
        san: 'e5',
        color: 'black',
        clock: seconds(58),
      },
      {
        from: 'd2',
        to: 'd4',
        san: 'd4',
        color: 'white',
        clock: seconds(57),
      },
      {
        from: 'd7',
        to: 'd6',
        san: 'd6',
        color: 'black',
        clock: seconds(55),
      },
    ]);

    const expected = '1. e4 e5 2. d4 d6';

    expect(actual).toBe(expected);
  });

  test('Finished Game', () => {
    const actual = chessHistoryToSimplePgn([
      {
        from: 'e2',
        to: 'e4',
        san: 'e4',
        color: 'white',
        clock: minutes(1),
      },
      {
        from: 'f7',
        to: 'f6',
        san: 'f6',
        color: 'black',
        clock: seconds(58),
      },
      {
        from: 'd2',
        to: 'd4',
        san: 'd4',
        color: 'white',
        clock: seconds(57),
      },
      {
        from: 'g7',
        to: 'g5',
        san: 'g5',
        color: 'black',
        clock: seconds(55),
      },
      {
        from: 'd1',
        to: 'h5',
        san: 'h5',
        color: 'white',
        clock: seconds(50),
      },
    ]);

    const expected = '1. e4 f6 2. d4 g5 3. Qh5#';

    expect(actual).toBe(expected);
  });
});

describe('simplePgnToChessHistory', () => {
  test('simple chess history', () => {
    const actual = simplePgnToChessHistory('1. e4 f6 2. d4 g5 3. Qh5#' as SimplePGN);
    const expected = [
      {
        clock: -1,
        color: 'white',
        flags: 'b',
        from: 'e2',
        piece: 'p',
        san: 'e4',
        to: 'e4',
      },
      {
        clock: -1,
        color: 'black',
        flags: 'n',
        from: 'f7',
        piece: 'p',
        san: 'f6',
        to: 'f6',
      },
      {
        clock: -1,
        color: 'white',
        flags: 'b',
        from: 'd2',
        piece: 'p',
        san: 'd4',
        to: 'd4',
      },
      {
        clock: -1,
        color: 'black',
        flags: 'b',
        from: 'g7',
        piece: 'p',
        san: 'g5',
        to: 'g5',
      },
      {
        clock: -1,
        color: 'white',
        flags: 'n',
        from: 'd1',
        piece: 'q',
        san: 'Qh5#',
        to: 'h5',
      },
    ];

    expect(actual).toEqual(expected);
  });
});

describe('getCapturedPiecesFromPgn', () => {
  const initialActivePieces = {
    white: { p: 8, n: 2, b: 2, r: 2, q: 1 },
    black: { p: 8, n: 2, b: 2, r: 2, q: 1 },
  };

  test('No captures/No Promotions', () => {
    const actual = getActivePieces([]);

    const expected = initialActivePieces;

    expect(actual).toEqual(expected);
  });

  test('One Captured Pawn', () => {
    const actual = getActivePieces(simplePGNtoMoves('1. e4 d5 2. exd5'));

    const expected = {
      ...initialActivePieces,
      black: {
        ...initialActivePieces.black,
        p: initialActivePieces.white.p - 1,
      },
    };

    expect(actual).toEqual(expected);
  });

  test('Captures and Promotions', () => {
    const actual = getActivePieces(
      simplePGNtoMoves('1. e4 d5 2. exd5 Nf6 3. d6 e5 4. d7+ Ke7 5. dxc8=Q')
    );

    const expected = {
      white: {
        ...initialActivePieces.white,
        q: initialActivePieces.white.q + 1,
      },
      black: {
        ...initialActivePieces.black,
        p: initialActivePieces.white.p - 1,
        b: initialActivePieces.white.b - 1,
      },
    };

    expect(actual).toEqual(expected);
  });
});
