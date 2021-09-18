import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';
import { chessGameOffer, chessHistory, gameSpecsRecord } from '../chessGame';
import { chatHistoryRecord } from './chatRecords';
import { peerRecord } from './peerRecord';
import { roomChallengeRecord } from './roomChallengeRecord';

export const roomActivityType = io.keyof({
  none: null,
  play: null,
  analysis: null,
});
export type RoomActivityType = io.TypeOf<typeof roomActivityType>;

export const roomNoActivityRecord = io.type({
  type: io.literal('none'),
});

export type RoomNoActivityRecord = io.TypeOf<typeof roomNoActivityRecord>;

export const roomPlayActivityRecord = io.intersection([
  io.type({
    type: io.literal('play'),
    gameId: io.string,
  }),

  // io.union([
  //   io.type({
  //     status: io.literal('challengePending'),
  //     challengeId: io.string,
  //   }),
  //   io.type({
  //     status: io.literal('playing'),
  //     gameId: io.string,
  //   }),

  //   // TODO: Add other types if needed
  // ]),
  io.partial({
    offer: chessGameOffer,
  }),
]);

export type RoomPlayActivityRecord = io.TypeOf<typeof roomPlayActivityRecord>;

export const roomAnalysisActivityRecord = io.type({
  type: io.literal('analysis'),
  analysisId: io.string,
});

export type RoomAnalysisActivityRecord = io.TypeOf<typeof roomAnalysisActivityRecord>;

export const roomActivityRecord = io.union([
  roomNoActivityRecord,
  roomPlayActivityRecord,
  roomAnalysisActivityRecord,
]);

export type RoomActivityRecord = io.TypeOf<typeof roomActivityRecord>;

export const roomType = io.keyof({
  public: null,
  private: null,
});
export type RoomType = io.TypeOf<typeof roomType>;

export const roomRecord = io.intersection([
  io.type({
    id: io.string,
    name: io.string,
    createdAt: isoDateTimeFromIsoString,
    createdBy: io.string,
    slug: io.string,

    peers: io.record(io.string, peerRecord),
    activity: roomActivityRecord,

    chatHistory: chatHistoryRecord,

    // TODO: Add
    // lastJoinedAt: null | ISODateTime;
    // lastLeftAt: null | ISODateTime;

    // TODO: Temporarily additon to match the room stats record
    // game: chessGameState,
    // gameOffer: chessGameOffer,

    pendingChallenges: io.record(io.string, roomChallengeRecord),
  }),
  io.union([
    io.type({
      type: io.literal('public'),
      code: io.null,
    }),
    io.type({
      type: io.literal('private'),
      code: io.string,
    }),
  ]),
]);
export type RoomRecord = io.TypeOf<typeof roomRecord>;

export const publicRoomRecord = io.intersection([
  roomRecord,
  io.type({
    type: io.literal('public'),
  }),
]);
export type PublicRoomRecord = io.TypeOf<typeof publicRoomRecord>;

export const privateRoomRecord = io.intersection([
  roomRecord,
  io.type({
    type: io.literal('private'),
  }),
]);
export type PrivateRoomRecord = io.TypeOf<typeof privateRoomRecord>;

export const roomWithNoActivityRecord = io.intersection([
  roomRecord,
  io.type({
    activity: roomNoActivityRecord,
  }),
]);
export type RoomWithNoActivityRecord = io.TypeOf<typeof roomWithNoActivityRecord>;

export const roomWithPlayActivityRecord = io.intersection([
  roomRecord,
  io.type({
    activity: roomPlayActivityRecord,
  }),
]);
export type RoomWithPlayActivityRecord = io.TypeOf<typeof roomWithPlayActivityRecord>;

export const roomWithAnalysisActivityRecord = io.intersection([
  roomRecord,
  io.type({
    activity: roomAnalysisActivityRecord,
  }),
]);
export type RoomWithAnalysisActivityRecord = io.TypeOf<typeof roomWithAnalysisActivityRecord>;

export const roomActivityCreationRecord = io.union([
  io.type({
    activityType: io.literal('play'),
    gameSpecs: gameSpecsRecord,
  }),
  io.type({
    activityType: io.literal('analysis'),
    history: chessHistory,
  }),
  io.type({
    activityType: io.literal('none'),
  }),
]);

export type RoomActivityCreationRecord = io.TypeOf<typeof roomActivityCreationRecord>;
