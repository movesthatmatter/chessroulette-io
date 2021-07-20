import * as io from 'io-ts';

export const collaboratorPlatform = io.keyof({
  Twitch: true,
});

export type CollaboratorPlatform = io.TypeOf<typeof collaboratorPlatform>;

export const collaboratorRecord = io.type({
  email: io.string,
  platform: collaboratorPlatform,
  featuringRank: io.number,
  profileUrl: io.string,
  profilePicUrl: io.union([io.undefined, io.string]),
  about: io.union([io.string, io.undefined]),
  extra: io.union([io.undefined, io.type({})]),
});

export type CollaboratorRecord = io.TypeOf<typeof collaboratorRecord>;
