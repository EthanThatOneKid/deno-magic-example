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
interface MagicAdminSDKInterface {
  Magic: any;
  SDKError: any;
}

interface MagicClientSDKInterface {
  Magic: any;
}

// interface MagicPassportInterface {
//   Strategy: any;
// }

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
// export { default as React } from "https://dev.jspm.io/react";
// export { default as ReactDOMServer } from "https://dev.jspm.io/react-dom/server";
import * as MagicClientSDK from "https://dev.jspm.io/magic-sdk";
import * as MagicAdminSDK from "https://dev.jspm.io/@magic-sdk/admin";
// import * as passportModule from "https://dev.jspm.io/passport";
// import * as MagicPassport from "https://dev.jspm.io/passport-magic";

export const { Magic: MagicClient } = MagicClientSDK
  .default as MagicClientSDKInterface;
export const { Magic: MagicAdmin, SDKError } = MagicAdminSDK
  .default as MagicAdminSDKInterface;
// export const passport = passportModule.default as Passport;
// export const { Strategy: MagicStrategy } = MagicPassport
//   .default as MagicPassportInterface;
