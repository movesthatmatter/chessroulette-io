import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';
import * as ChessGame from '../chessGame';
import { gameSpecsRecord } from '../chessGame';

export const baseChallengeRecord = io.type({
  gameSpecs: ChessGame.gameSpecsRecord,
  id: io.string,
  createdBy: io.string,
  createdAt: isoDateTimeFromIsoString,
  slug: io.string,
});

export const lichessSeekChallengeRecord = io.type({
  rated: io.boolean,
  time: io.number,
  increment: io.number,
  variant: io.literal('standard'),
  color: io.union([
    io.keyof({
      white: null,
    }),
    io.keyof({
      black: null,
    }),
  ]),
});
export const lichessPlayerChallengeRecord = io.type({
  rated: io.boolean,
  [`clock.limit`]: io.number,
  [`clock.increment`]: io.number,
  variant: io.literal('standard'),
  color: io.union([
    io.keyof({
      white: null,
    }),
    io.keyof({
      black: null,
    }),
  ]),
});

export const publicChallengeRecord = io.intersection([
  baseChallengeRecord,
  io.type({
    type: io.literal('public'),
  }),
]);
export type PublicChallengeRecord = io.TypeOf<typeof publicChallengeRecord>;

export const privateChallengeRecord = io.intersection([
  baseChallengeRecord,
  io.type({
    type: io.literal('private'),
  }),
]);
export type PrivateChallengeRecord = io.TypeOf<typeof privateChallengeRecord>;

export const lichessChallengeRecord = io.intersection([
  lichessPlayerChallengeRecord,
  io.type({
    type: io.literal('lichess'),
  }),
]);

export type LichessChallengeRecord = io.TypeOf<typeof lichessChallengeRecord>;

export const challengeRecord = io.union([
  publicChallengeRecord,
  privateChallengeRecord,
  lichessChallengeRecord,
]);
export type ChallengeRecord = io.TypeOf<typeof challengeRecord>;

export const quickPairingRecord = io.type({
  gameSpecs: gameSpecsRecord,
  createdBy: io.string,
  createdAt: isoDateTimeFromIsoString,
  slug: io.string,
});
export type QuickPairingRecord = io.TypeOf<typeof quickPairingRecord>;
