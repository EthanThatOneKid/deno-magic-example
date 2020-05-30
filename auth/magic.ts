import {
  MagicAdmin,
  Router,
  config,
  makeJwt,
  setExpiration,
  Jose,
  Payload,
  validateJwt,
  Context,
} from "../deps.ts";
import {
  addUser,
  updateUser,
  findUser,
  User,
} from "../db/mod.ts";
import {
  Claim,
  MagicUser,
  DoneFunc,
  MagicUserMetadata,
} from "../types/mod.ts";

const { MAGIC_SECRET_KEY } = config();
const admin = new MagicAdmin(MAGIC_SECRET_KEY);

export const verifyDidToken = async (didToken: string | undefined): Promise<Claim | null> => {
  if (didToken === undefined) {
    return null;
  }
  try {
    await admin.token.validate(didToken);
    const [proof, claim]: [string, Claim] = await admin.token.decode(didToken);  
    return claim;
  } catch ({ data }) {
    console.log(data.shift().message);
    return null;
  }
};