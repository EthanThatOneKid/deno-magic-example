import {
  Magic,
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
  MagicUser,
  DoneFunc,
  MagicUserMetadata,
} from "../types/mod.ts";

const { MAGIC_SECRET_KEY, JWT_SECRET_TOKEN } = config();
const admin = new Magic(MAGIC_SECRET_KEY);

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const login = async (ctx: Context) => {
  const { value } = await ctx.request.body();
  const { email, didToken } = JSON.parse(value);
  // try {
  //   const userMetadata = await admin.users.getMetadataByToken(didToken);
  //   console.log(userMetadata);
  // } catch (err) {
  //   console.log(err.data[0].message);
  // }
  let user: User = await findUser({ email });
  if (user === null) {
    user = await addUser({ email });
  }
  const payload: Payload = {
    iss: user.email,
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
