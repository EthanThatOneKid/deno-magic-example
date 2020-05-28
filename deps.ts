// deno.land/x/
export { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
export { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
export { config } from "https://deno.land/x/dotenv/mod.ts";
export { validateJwt } from "https://deno.land/x/djwt/validate.ts";
export {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

// dev.jspm.io/
interface MagicSDKInterface {
  Magic: any;
  SDKError: any;
}
// interface MagicPassportInterface {
//   Strategy: any;
// }

import * as MagicSDK from "https://dev.jspm.io/@magic-sdk/admin";
// import * as passportModule from "https://dev.jspm.io/passport";
// import * as MagicPassport from "https://dev.jspm.io/passport-magic";

export const { Magic, SDKError } = MagicSDK.default as MagicSDKInterface;
// export const passport = passportModule.default as Passport;
// export const { Strategy: MagicStrategy } = MagicPassport
//   .default as MagicPassportInterface;
