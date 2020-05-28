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
  // updateUser,
  findUser,
  User,
} from "../db/mod.ts";

const { JWT_SECRET_TOKEN } = config();
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const login = async (ctx: Context) => {
  const { value } = await ctx.request.body();
  const { email } = value; // JSON.parse(value);
  let user: User = await findUser({ email });
  if (user === null) {
    user = await addUser({ email });
  }
  const payload: Payload = {
    iss: user.email, // Magic Issuer Here
    exp: setExpiration(new Date().getTime() + 60000),
  };
  const jwt = makeJwt({ key: JWT_SECRET_TOKEN, header, payload });
  if (jwt) {
    ctx.response.status = 200;
    ctx.response.body = { user, jwt };
  } else {
    const message = "Internal server error";
    ctx.response.status = 500;
    ctx.response.body = { message };
  }
  return;
};
