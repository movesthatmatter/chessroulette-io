import {
  ChessGameColor,
  ChessGameStatePending,
  ChessGameStateStarted,
  ChessGameStateFinished,
  ChessGameStateNeverStarted,
  ChessGameTimeLimit,
  ChessGameStateStopped,
  ChessGameState,
} from '../records';
import { otherChessColor, getRandomChessColor, chessHistoryToSimplePgn } from '../util/util';
import { getNewChessGame } from '../sdk';
import { ISODateTime, toISODateTime } from 'io-ts-isodatetime';
import { ChessHistory, ChessHistoryMove, ChessMove } from '../records/utilRecords';
import { UserInfoRecord } from '../../records/userRecord';
import { chessGameTimeLimitMsMap } from '../../metadata/game';

export type PreparePendingGameProps = {
  players: [UserInfoRecord, UserInfoRecord];
  timeLimit: ChessGameTimeLimit;
  preferredColor?: ChessGameColor | 'random';
};

export type PrepareStartedGameProps = PreparePendingGameProps & {
  history: ChessHistory;
  lastMoveAt: ISODateTime;
};

export type PrepareGameProps = PreparePendingGameProps | PrepareStartedGameProps;

function prepareGameAction(props: PreparePendingGameProps): ChessGameStatePending;
function prepareGameAction(
  props: PrepareStartedGameProps
): ChessGameStateStarted | ChessGameStateFinished;
function prepareGameAction(
  props: PrepareGameProps
): ChessGameStatePending | ChessGameStateStarted | ChessGameStateFinished {
  if ('history' in props && props.history.length > 0) {
    return prepareStartedGame(props);
  }

  return preparePendingGame(props);
}

const preparePendingGame = ({
  players,
  timeLimit,
  preferredColor = 'random',
}: PreparePendingGameProps): ChessGameStatePending => {
  const firstPlayerColor: ChessGameColor =
    preferredColor === 'random' ? getRandomChessColor() : preferredColor;

  return {
    state: 'pending',
    timeLimit,
    players: [
      {
        color: firstPlayerColor,
        user: players[0],
      },
      {
        color: otherChessColor(firstPlayerColor),
        user: players[1],
      },
    ],
    timeLeft: {
      white: chessGameTimeLimitMsMap[timeLimit],
      black: chessGameTimeLimitMsMap[timeLimit],
    },
    // @deprecate
    pgn: undefined,
    history: undefined,

    winner: undefined,

    lastMoveAt: undefined,
    lastMoveBy: undefined,

    startedAt: undefined,
    lastActivityAt: undefined,
  };
};

const prepareStartedGame = (
  props: PrepareStartedGameProps
): ChessGameStatePending | ChessGameStateStarted | ChessGameStateFinished => {
  const pendingGame = preparePendingGame(props);

  // If there is no History Length Given return the pending
  if (props.history.length === 0) {
    return pendingGame;
  }

  const instance = getNewChessGame();

  // Load the current history
  const isValid = instance.load_pgn(chessHistoryToSimplePgn(props.history));

  if (!isValid) {
    return pendingGame;
  }

  // If it's white's turn that means black moved last!
  const lastMovedBy = instance.turn() === 'w' ? 'black' : 'white';
  const last2Moves = props.history.slice(-2);

  const nextGame = {
    ...pendingGame,
    timeLeft: {
      ...pendingGame.timeLeft,

      // Add the clock of the last 2 moves
      ...(last2Moves[0] && {
        [last2Moves[0].color]: last2Moves[0].clock,
      }),
      ...(last2Moves[1] && {
        [last2Moves[1].color]: last2Moves[1].clock,
      }),
    },
    lastMoveAt: props.lastMoveAt,
    history: props.history,
    pgn: instance.pgn(),
    lastMoveBy: lastMovedBy,
    lastActivityAt: props.lastMoveAt,

    // This is a bit of a hack since we don't know the startedAt at this point
    // TODO: Maybe in the future this should also be adjusted
    startedAt: props.lastMoveAt,
  } as const;

  if (instance.game_over()) {
    return {
      ...nextGame,
      state: 'finished',
      winner: instance.in_draw() ? '1/2' : lastMovedBy,
    };
  }

  return {
    ...nextGame,
    state: 'started',
    winner: undefined,
  };
};

const moveAction = (
  prev: ChessGameStatePending | ChessGameStateStarted,
  {
    move,
    movedAt,
  }: {
    move: ChessMove;
    movedAt: ISODateTime;
  }
): ChessGameStatePending | ChessGameStateStarted | ChessGameStateFinished => {
  // Default it to black so when the game just starts it sets the 1st move to white
  const { lastMoveBy: prevTurn = 'black' } = prev;
  const turn = otherChessColor(prevTurn);

  const movedAtAsDate = new Date(movedAt);

  // If it's a pending game the lastMove becomes the movedAt for now.
  // TODO: Later on, when there will be a distinction between first move and game "start"
  //  or maybe there will be another state: "ready", where the game is started automatically
  //  by the system (epecially for an oficial game) and not the first move
  const lastMoveAt = prev.state === 'pending' ? movedAtAsDate : new Date(prev.lastMoveAt);
  const elapsed = movedAtAsDate.getTime() - lastMoveAt.getTime();
  const nextTimeLeft = prev.timeLeft[turn] - elapsed;

  // Finish The Game if the time has passed
  if (prev.timeLimit !== 'untimed' && prev.state !== 'pending' && nextTimeLeft < 0) {
    return {
      ...prev,
      state: 'finished',
      timeLeft: {
        ...prev.timeLeft,
        // If the time is 0 we know the game ended b/c of clock running out!
        [turn]: 0,
      },
      winner: prevTurn,

      // Last activity is the state change!
      lastActivityAt: movedAt,
    };
  }

  const instance = getNewChessGame();

  const isValidPgn =
    prev.state === 'pending' ||
    instance.load_pgn(chessHistoryToSimplePgn(prev.history)) ||
    prev.history.length === 0;

  if (!isValidPgn) {
    return prev;
  }

  const validMove = instance.move(move);

  if (!validMove) {
    return prev;
  }

  const { promotion, flags, piece, ...restValidMove } = validMove;

  const nextMove: ChessHistoryMove = {
    ...restValidMove,
    ...(promotion &&
      promotion !== 'k' && {
        promotion,
      }),
    color: validMove.color === 'b' ? 'black' : 'white',
    clock: nextTimeLeft,
  };
  console.log('move action prev', prev);
  const nextHistory = [...(prev.history || []), nextMove];

  const nextStartedGameProps = {
    state: 'started',
    pgn: instance.pgn(),
    history: nextHistory,
    lastMoveAt: movedAt,
    lastMoveBy: turn,
    timeLeft: {
      ...prev.timeLeft,
      [turn]: nextTimeLeft,
    },
    winner: undefined,
    lastActivityAt: movedAt,
  } as const;
  console.log('move action next ', nextStartedGameProps);

  if (prev.state === 'pending') {
    return {
      ...prev,
      ...nextStartedGameProps,
      startedAt: movedAt,
    };
  }

  if (instance.game_over()) {
    return {
      ...prev,
      ...nextStartedGameProps,
      state: 'finished',
      winner: instance.in_draw() ? '1/2' : turn,
      pgn: instance.pgn(),
      history: nextHistory,
      lastMoveAt: movedAt,
      lastMoveBy: turn,
      lastActivityAt: movedAt,
    };
  }

  return {
    ...prev,
    ...nextStartedGameProps,
  };
};

const statusCheck = (prev: ChessGameState, at: Date): ChessGameState => {
  if (prev.state === 'started') {
    const turn = otherChessColor(prev.lastMoveBy);
    const delta = at.getTime() - (new Date(prev.lastMoveAt).getTime() + prev.timeLeft[turn]);

    if (delta > 0) {
      return {
        ...prev,
        state: 'finished',
        winner: prev.lastMoveBy,
        timeLeft: {
          ...prev.timeLeft,
          [turn]: 0,
        },
      };
    }
  }

  return prev;
};

// @deprecated
const timerFinishedAction = (prev: ChessGameStateStarted): ChessGameStateFinished => {
  return {
    ...prev,
    state: 'finished',
    winner: otherChessColor(prev.lastMoveBy),
  };
};

const abortAction = (prev: ChessGameStatePending): ChessGameStateNeverStarted => {
  return {
    ...prev,
    state: 'neverStarted',
    lastActivityAt: toISODateTime(new Date()),
  };
};

const resignAction = (
  prev: ChessGameStateStarted,
  resigningColor: ChessGameColor
): ChessGameStateStopped => {
  return {
    ...prev,
    state: 'stopped',
    winner: otherChessColor(resigningColor),
  };
};

const takebackAction = (
  prev: ChessGameStateStarted,
  { movedAt }: { movedAt: ISODateTime }
): ChessGameStateStarted => {
  const updateHistory = prev.history.slice(0, prev.history.length - 1);
  const newPGN = chessHistoryToSimplePgn(updateHistory);
  // const instance = getNewChessGame(newPGN);
  // const moveAtAsDate = new Date(moveAt);
  // const lastMoveAt = new Date(prev.lastMoveAt);
  // const turn  = prev.lastMoveBy;
  // const elapsed = moveAtAsDate.getTime() - lastMoveAt.getTime();
  // const nextTimeLeft = prev.timeLeft[turn] - elapsed;

  // return {
  //   ...prev,
  //   history: updateHistory,
  //   pgn: newPGN,
  //   lastMoveBy: otherChessColor(prev.lastMoveBy),
  // };
  const { lastMoveBy: prevTurn = 'black' } = prev;
  const turn = otherChessColor(prevTurn);

  const movedAtAsDate = new Date(movedAt);

  const lastMoveAt = new Date(prev.lastMoveAt);
  const elapsed = movedAtAsDate.getTime() - lastMoveAt.getTime();
  const nextTimeLeft = prev.timeLeft[turn] - elapsed;

  // const nextMove: ChessHistoryMove = {
  //   ...restValidMove,
  //   ...(promotion &&
  //     promotion !== 'k' && {
  //       promotion,
  //     }),
  //   color: validMove.color === 'b' ? 'black' : 'white',
  //   clock: nextTimeLeft,
  // };

  //const nextHistory = [...(prev.history || []), nextMove];

  const nextStartedGameProps = {
    state: 'started',
    pgn: newPGN,
    history: updateHistory,
    lastMoveAt: movedAt,
    lastMoveBy: turn,
    timeLeft: {
      ...prev.timeLeft,
      [turn]: nextTimeLeft,
    },
    winner: undefined,
    lastActivityAt: movedAt,
  } as const;

  return {
    ...prev,
    ...nextStartedGameProps,
  };
};

const drawAction = (prev: ChessGameStateStarted): ChessGameStateStopped => {
  return {
    ...prev,
    state: 'stopped',
    winner: '1/2',
  };
};

export const actions = {
  prepareGame: prepareGameAction,
  move: moveAction,
  resign: resignAction,
  draw: drawAction,
  abort: abortAction,
  statusCheck,
  takeback: takebackAction,
  // @deprecate in favor of statusCheck
  timerFinished: timerFinishedAction,
};
