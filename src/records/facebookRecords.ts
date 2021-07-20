import * as io from 'io-ts';

export const facebookUserRecord = io.type({
  id: io.string,
  email: io.string,
  firstName: io.union([io.string, io.undefined]),
  lastName: io.union([io.string, io.undefined]),
  name: io.union([io.string, io.undefined]),
});
export type FacebookUserRecord = io.TypeOf<typeof facebookUserRecord>;
