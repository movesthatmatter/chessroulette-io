import { ChessGameColor, ChessColorWhite, ChessColorBlack, ChessGameState, ActivePiecesRecord } from '../records';
import { Move } from 'chess.js';
import { SimplePGN } from '../pgnUtil';
export declare function otherChessColor<C extends ChessGameColor>(c: C): C extends ChessColorWhite ? ChessColorBlack : ChessColorWhite;
export declare const getRandomChessColor: () => "white" | "black";
export declare const getCapturedPiecesState: (history: Move[]) => {
    white: {
        p: number;
        n: number;
        b: number;
        r: number;
        q: number;
    };
    black: {
        p: number;
        n: number;
        b: number;
        r: number;
        q: number;
    };
};
export declare const getCapturedPiecesFromPgn: (pgn: ChessGameState['pgn']) => {
    white: {
        p: number;
        n: number;
        b: number;
        r: number;
        q: number;
    };
    black: {
        p: number;
        n: number;
        b: number;
        r: number;
        q: number;
    };
};
export declare const getActivePieces: (history: Move[]) => ActivePiecesRecord;
export declare const simplePGNtoMoves: (pgn: string) => Move[];
export declare const chessHistoryToSimplePgn: (history: (({
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
}))[]) => SimplePGN;
export declare const simplePgnToChessHistory: (pgn: SimplePGN) => (({
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
