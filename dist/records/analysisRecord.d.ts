import * as io from 'io-ts';
export declare const analysisRecord: io.TypeC<{
    id: io.StringC;
    createdAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    updatedAt: io.Type<import("io-ts-isodatetime/dist/lib/ISODateTime").ISODateTimeBrand, string, unknown>;
    history: io.Type<import("../chessGame").ChessRecursiveHistory, import("../chessGame").ChessRecursiveHistory, unknown>;
}>;
export declare type AnalysisRecord = io.TypeOf<typeof analysisRecord>;
