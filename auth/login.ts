import {
  Context,
  setExpiration,
  Payload,
  Jose,
  makeJwt,
  config,
} from "../deps.ts";
import {
  addUser,
  findUser,
  User,
  updateUser,
} from "../db/mod.ts";
import { verifyDidToken } from "./magic.ts";
import { MagicUserMetadata } from "../types/mod.ts";

const { JWT_SECRET_TOKEN } = config();
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const findOrCreateUser = async (
  metadata: MagicUserMetadata,
): Promise<User> => {
  const { email, issuer } = metadata;
  let user: User = await findUser({ email });
  if (user === null) {
    user = await addUser({ email, issuer });
  }
  return { ...user };
};

const updateLastLogin = async (issuer: string, lastLoginAt: number) => {
  return await updateUser({ issuer }, { lastLoginAt });
};

const generateJwt = (iss: string): string => {
  const exp = setExpiration(new Date().getTime() + 60000);
  const payload: Payload = { iss, exp };
  const jwt = makeJwt({ key: JWT_SECRET_TOKEN, header, payload });
  return jwt;
};

export const login = async (ctx: Context) => {
  const didToken = ctx.request.headers.get("Authorization")?.substring(7);
  const verification = await verifyDidToken(didToken);
  if (verification === null) {
    console.log("There was a problem with Magic verification");
    return;
  }
  const { claim, metadata } = verification;
  const user = await findOrCreateUser(metadata);
  if (user.lastLoginAt !== undefined && claim.iat <= user.lastLoginAt) {
    console.log(`Replay attack detected for user ${user.issuer}}.`);
    return;
  }
  await updateLastLogin(user.issuer as string, claim.iat);
  ctx.cookies.set("jwt", generateJwt(claim.iss));
  ctx.response.status = 200;
  ctx.response.redirect("/");
};
