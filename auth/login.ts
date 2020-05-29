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

const findOrCreateUser = async (email: string): Promise<User> => {
  let user: User = await findUser({ email });
  if (user === null) {
    user = await addUser({ email });
  }
  return user;
};

const generateJwt = (iss: string): Promise<string> => {
  const exp = setExpiration(new Date().getTime() + 60000);
  const payload: Payload = {iss, exp};
  const jwt = makeJwt({ key: JWT_SECRET_TOKEN, header, payload });
  return jwt;
};

export const login = async (ctx: Context) => {
  const { value: { email } } = await ctx.request.body();
  const user = await findOrCreateUser(email);
  const jwt = generateJwt(email);
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
