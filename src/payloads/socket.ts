import * as io from 'io-ts';
import { roomRecord } from '../records/roomRecord';
import { peerRecord } from '../records/peerRecord';
import { challengeAcceptedPayload } from './challenge';
import { broadcastChatMessagePayload } from './chat';
import { gameActionRequestPayload, joinedGameUpdatedPayload } from './game';
import { myStatsPayload } from './peer';
import {
  joinedRoomUpdatedPayload,
  peerJoinedRoomPayload,
  joinRoomRequestPayload,
  joinRoomSuccessPayload,
  joinRoomFailurePayload,
  leaveRoomRequestPayload,
  joinedRoomAndGameUpdatedPayload,
} from './room';
import { statsSocketPayload } from './stats';
import { challengeRecord } from '../records/challengeRecord';
import { analysisMoveRequestPayload, analysisUpdatedResponsePayload } from './analysis';

export const userIdentificationPayload = io.type({
  kind: io.literal('userIdentification'),
  content: io.union([
    io.type({
      isGuest: io.literal(true),
      guestUserId: io.string,
    }),
    io.type({
      isGuest: io.literal(false),
      acessToken: io.string,
    }),
  ])
});
export type UserIdentificationPayload = io.TypeOf<typeof userIdentificationPayload>;

export const statsReaderIdentificationPayload = io.type({
  kind: io.literal('statsReaderIdentificationPayload'),
  content: io.type({
    userId: io.string,
  }),
});
export type StatsReaderIdentificationPayload = io.TypeOf<typeof statsReaderIdentificationPayload>;

export const pingPayload = io.type({
  kind: io.literal('ping'),
  content: io.string,
});
export type PingPayload = io.TypeOf<typeof pingPayload>;

export const connectionOpenedPayload = io.type({
  kind: io.literal('connectionOpened'),
  content: io.type({
    me: peerRecord,
  }),
});
export type ConnectionOpenedPayload = io.TypeOf<typeof connectionOpenedPayload>;

export const whoamiRequestPayload = io.type({
  kind: io.literal('whoami'),
  content: io.unknown,
});
export type WhoamiRequestPayload = io.TypeOf<typeof whoamiRequestPayload>;

export const iamResponsePayload = io.type({
  kind: io.literal('iam'),
  content: io.intersection([
    io.type({
      peer: peerRecord,
      latencyInMs: io.number,
    }),
    io.union([
      io.type({
        hasJoinedRoom: io.literal(true),
        room: roomRecord,
      }),
      io.type({
        hasJoinedRoom: io.literal(false),
      }),
    ]),
    io.union([
      io.type({
        hasActiveChallenge: io.literal(true),
        challenge: challengeRecord,
      }),
      io.type({
        hasActiveChallenge: io.literal(false),
      }),
    ]),
  ]),
});
export type IamResponsePayload = io.TypeOf<typeof iamResponsePayload>;

export const genericFailureResponsePayload = io.type({
  kind: io.literal('genericRequestFailure'),
  content: io.unknown,
});
export type GenericFailureResponsePayload = io.TypeOf<typeof genericFailureResponsePayload>;

export const socketPayload = io.union([
  userIdentificationPayload,
  statsReaderIdentificationPayload,
  pingPayload,
  genericFailureResponsePayload,

  // Business Logic
  connectionOpenedPayload,
  whoamiRequestPayload,
  iamResponsePayload,

  // Challenges
  challengeAcceptedPayload,

  // Room
  peerJoinedRoomPayload,
  joinRoomRequestPayload,
  joinRoomSuccessPayload,
  joinRoomFailurePayload,
  leaveRoomRequestPayload,
  joinedRoomUpdatedPayload,

  // Chat
  broadcastChatMessagePayload,

  // Game Actions
  gameActionRequestPayload,
  joinedGameUpdatedPayload,

  // Analysis
  analysisMoveRequestPayload,
  analysisUpdatedResponsePayload,

  // Room & Game
  joinedRoomAndGameUpdatedPayload,

  // Stats
  statsSocketPayload,
  myStatsPayload,
]);
export type SocketPayload = io.TypeOf<typeof socketPayload>;