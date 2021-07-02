import { ChessGameColor, ChessGameStatePending, ChessGameStateStarted, ChessGameStateFinished, ChessGameStateNeverStarted, ChessGameTimeLimit, ChessGameStateStopped, ChessGameState } from '../records';
import { ISODateTime } from 'io-ts-isodatetime';
import { ChessHistory, ChessMove } from '../records/utilRecords';
import { UserInfoRecord } from '../../records/userRecord';
export declare type PreparePendingGameProps = {
    players: [UserInfoRecord, UserInfoRecord];
    timeLimit: ChessGameTimeLimit;
    preferredColor?: ChessGameColor | 'random';
};
export declare type PrepareStartedGameProps = PreparePendingGameProps & {
    history: ChessHistory;
    lastMoveAt: ISODateTime;
};
export declare type PrepareGameProps = PreparePendingGameProps | PrepareStartedGameProps;
declare function prepareGameAction(props: PreparePendingGameProps): ChessGameStatePending;
declare function prepareGameAction(props: PrepareStartedGameProps): ChessGameStateStarted | ChessGameStateFinished;
export declare const actions: {
    prepareGame: typeof prepareGameAction;
    move: (prev: ChessGameStatePending | ChessGameStateStarted, { move, movedAt, }: {
        move: ChessMove;
        movedAt: ISODateTime;
    }) => ChessGameStatePending | ChessGameStateStarted | ChessGameStateFinished;
    resign: (prev: ChessGameStateStarted, resigningColor: ChessGameColor) => ChessGameStateStopped;
    draw: (prev: ChessGameStateStarted) => ChessGameStateStopped;
    abort: (prev: ChessGameStatePending) => ChessGameStateNeverStarted;
    statusCheck: (prev: ChessGameState, at: Date) => ChessGameState;
    takeback: (prev: ChessGameStateStarted) => ChessGameStateStarted;
    timerFinished: (prev: ChessGameStateStarted) => ChessGameStateFinished;
};
export {};
