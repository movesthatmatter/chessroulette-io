import * as io from 'io-ts';
export declare const analysisMoveRequestPayload: io.TypeC<{
    kind: io.LiteralC<"analysisMoveRequest">;
    content: io.TypeC<{
        id: io.StringC;
        move: io.Type<import("../chessGame").ChessRecursiveMove, import("../chessGame").ChessRecursiveMove, unknown>;
        atIndex: io.Type<import("../chessGame").ChessHistoryIndex, import("../chessGame").ChessHistoryIndex, unknown>;
    }>;
}>;
export declare type AnalysisMoveRequestPayload = io.TypeOf<typeof analysisMoveRequestPayload>;
export declare const analysisRefocusRequestPayload: io.TypeC<{
    kind: io.LiteralC<"analysisRefocusRequest">;
    content: io.TypeC<{
        id: io.StringC;
        focusIndex: io.Type<import("../chessGame").ChessHistoryIndex, import("../chessGame").ChessHistoryIndex, unknown>;
    }>;
}>;
export declare type AnalysisRefocusRequestPayload = io.TypeOf<typeof analysisRefocusRequestPayload>;
export declare const analysisDrawnShapesUpdatedRequestPayload: io.TypeC<{
    kind: io.LiteralC<"analysisDrawnShapesUpdatedRequest">;
    content: io.TypeC<{
        id: io.StringC;
        drawnShapes: io.ArrayC<io.IntersectionC<[io.TypeC<{
            orig: io.StringC;
        }>, io.PartialC<{
            dest: io.StringC;
            brush: io.StringC;
            modifiers: io.PartialC<{
                lineWidth: io.NumberC;
            }>;
            piece: io.IntersectionC<[io.TypeC<{
                role: io.KeyofC<{
                    king: null;
                    queen: null;
                    rook: null;
                    bishop: null;
                    knight: null;
                    pawn: null;
                }>;
                color: io.UnionC<[io.KeyofC<{
                    white: null;
                }>, io.KeyofC<{
                    black: null;
                }>]>;
            }>, io.PartialC<{
                scale: io.NumberC;
            }>]>;
            customSvg: io.StringC;
        }>]>>;
    }>;
}>;
export declare type AnalysisDrawnShapesUpdatedRequestPayload = io.TypeOf<typeof analysisDrawnShapesUpdatedRequestPayload>;
export declare const analysisImportPgnRequestPayload: io.TypeC<{
    kind: io.LiteralC<"analysisImportPgnRequest">;
    content: io.TypeC<{
        pgn: io.StringC;
    }>;
}>;
export declare type AnalysisImportPgnRequestPayload = io.TypeOf<typeof analysisImportPgnRequestPayload>;
export declare const analysisUpdatedResponsePayload: io.TypeC<{
    kind: io.LiteralC<"analysisUpdatedResponse">;
    content: io.IntersectionC<[io.TypeC<{
        id: io.StringC;
        createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        updatedAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
        history: io.Type<import("../chessGame").ChessRecursiveHistory, import("../chessGame").ChessRecursiveHistory, unknown>;
        focusIndex: io.Type<import("../chessGame").ChessHistoryIndex, import("../chessGame").ChessHistoryIndex, unknown>;
    }>, io.PartialC<{
        drawnShapes: io.ArrayC<io.IntersectionC<[io.TypeC<{
            orig: io.StringC;
        }>, io.PartialC<{
            dest: io.StringC;
            brush: io.StringC;
            modifiers: io.PartialC<{
                lineWidth: io.NumberC;
            }>;
            piece: io.IntersectionC<[io.TypeC<{
                role: io.KeyofC<{
                    king: null;
                    queen: null;
                    rook: null;
                    bishop: null;
                    knight: null;
                    pawn: null;
                }>;
                color: io.UnionC<[io.KeyofC<{
                    white: null;
                }>, io.KeyofC<{
                    black: null;
                }>]>;
            }>, io.PartialC<{
                scale: io.NumberC;
            }>]>;
            customSvg: io.StringC;
        }>]>>;
    }>]>;
}>;
export declare type AnalysisUpdatedResponsePayload = io.TypeOf<typeof analysisUpdatedResponsePayload>;
