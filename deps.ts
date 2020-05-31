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

import * as MagicClientSDK from "https://dev.jspm.io/magic-sdk";
import * as MagicAdminSDK from "https://dev.jspm.io/@magic-sdk/admin";

export const { Magic: MagicClient } = MagicClientSDK
  .default as MagicClientSDKInterface;
export const { Magic: MagicAdmin, SDKError } = MagicAdminSDK
  .default as MagicAdminSDKInterface;
