import { ChessRecursiveHistory } from '../chessGame';
export declare const seconds: (int: number) => number;
export declare const second: () => number;
export declare const pgnToChessHistory: (pgn: string, timeLimit: {
    white: number;
    black: number;
}, clockRange?: {
    minSeconds: number;
    maxSeconds: number;
}) => (({
    from: "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8" | "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7" | "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6" | "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5" | "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4" | "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3" | "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2" | "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1";
    to: "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8" | "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7" | "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6" | "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5" | "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4" | "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3" | "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2" | "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1";
} & {
    promotion?: "n" | "b" | "r" | "q" | undefined;
} & {
    san: string;
    clock: number;
} & {
    color: "white";
}) | ({
    from: "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8" | "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7" | "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6" | "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5" | "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4" | "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3" | "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2" | "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1";
    to: "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8" | "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7" | "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6" | "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5" | "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4" | "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3" | "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2" | "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1";
} & {
    promotion?: "n" | "b" | "r" | "q" | undefined;
} & {
    san: string;
    clock: number;
} & {
    color: "black";
}))[];
/**
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 *
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export declare function getRandomInt(givenMin: number, givenMax: number): number;
export declare const printHistory: (h: ChessRecursiveHistory, baseIndex?: number) => void;
