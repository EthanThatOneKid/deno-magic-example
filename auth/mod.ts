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

const { MAGIC_SECRET_KEY, JWT_SECRET_TOKEN } = config();
const admin = new MagicAdmin(MAGIC_SECRET_KEY);

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const verifyDidToken = async (didToken: string) => {
  // This works correctly:
  // const [proof, claim]: [string, Claim] = await admin.token.decode(didToken);
  // console.log({proof, claim});
  try {
    const validation = await admin.token.validate(didToken);
    console.log({ validation });
    // This does not work correctly:
    const userMetadata = await admin.users.getMetadataByToken(didToken);
    console.log(userMetadata);
    return true;
  } catch (err) {
    // Current Error:
    // "The current user is not authorized to access the requested resource. Please make sure the user is authorized to all input parameter entities."
    console.log(err.data[0].message);
    return false;
  }
};

export const logout = async (ctx: Context) => {
  // Logout
};

export const login = async (ctx: Context) => {
  const { value } = await ctx.request.body();
  const { email, didToken } = JSON.parse(value);
  const isVerified = await verifyDidToken(didToken);
  if (!isVerified) {
    ctx.response.status = 401;
    ctx.response.body = {
      message: `Email ${email} is unauthorized`,
    };
  }
  let user: User = await findUser({ email });
  if (user === null) {
    user = await addUser({ email });
  }
  const payload: Payload = {
    iss: user.email, // Put issuer here
    exp: setExpiration(new Date().getTime() + 60000),
  };
  const jwt = makeJwt({ key: JWT_SECRET_TOKEN, header, payload });
  if (jwt) {
    ctx.response.status = 200;
    ctx.response.body = {
      id: user.id,
      username: user.email,
      jwt,
    };
  } else {
    ctx.response.status = 500;
    ctx.response.body = {
      message: "Internal server error",
    };
  }
};
