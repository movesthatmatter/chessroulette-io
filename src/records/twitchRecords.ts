import * as io from 'io-ts';
import { isoDateTimeFromIsoString } from 'io-ts-isodatetime';

export const twitchUserRecord = io.type({
  id: io.string,
  email: io.string,
  display_name: io.string,
  profile_image_url: io.string,
  created_at: isoDateTimeFromIsoString,
});

export type TwitchUserRecord = io.TypeOf<typeof twitchUserRecord>;
