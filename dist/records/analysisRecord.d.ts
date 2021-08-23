import * as io from 'io-ts';
export declare const chessBoardDrawShape: io.IntersectionC<[io.TypeC<{
    orig: io.StringC;
    visible: io.BooleanC;
    defaultSnapToValidMove: io.BooleanC;
    eraseOnClick: io.BooleanC;
}>, io.PartialC<{
    dest: io.StringC;
    brush: io.StringC;
}>]>;
export declare type ChessBoardDrawShape = io.TypeOf<typeof chessBoardDrawShape>;
export declare const analysisRecord: io.IntersectionC<[io.TypeC<{
    id: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    updatedAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    history: io.Type<import("../chessGame").ChessRecursiveHistory, import("../chessGame").ChessRecursiveHistory, unknown>;
    focusIndex: io.Type<import("../chessGame").ChessHistoryIndex, import("../chessGame").ChessHistoryIndex, unknown>;
}>, io.TypeC<{
    drawnShapes: io.ArrayC<io.IntersectionC<[io.TypeC<{
        orig: io.StringC;
        visible: io.BooleanC;
        defaultSnapToValidMove: io.BooleanC;
        eraseOnClick: io.BooleanC;
    }>, io.PartialC<{
        dest: io.StringC;
        brush: io.StringC;
    }>]>>;
}>]>;
export declare type AnalysisRecord = io.TypeOf<typeof analysisRecord>;
