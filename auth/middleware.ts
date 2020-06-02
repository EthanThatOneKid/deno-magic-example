import {
  config,
  validateJwt,
  Context,
  JwtObject,
  Payload,
} from "../deps.ts";
import { findUser } from "../db/mod.ts";

const { JWT_SECRET_TOKEN } = config();

export const userMiddleware = async (ctx: Context, next: Function) => {
  const jwt = ctx.cookies.get("jwt");
  if (jwt !== undefined) {
    const data = await validateJwt(
      jwt,
      JWT_SECRET_TOKEN || "",
      { isThrowing: false },
    );
    if (data !== null) {
      const { iss: issuer } = data.payload as Payload;
      ctx.state.user = await findUser({ issuer });
    } else {
      ctx.cookies.delete("jwt");
    }
  } else {
    ctx.state.user = null;
  }
  await next();
};

export const protectionMiddleware = async (ctx: Context, next: Function) => {
  if (ctx.state.user !== null) {
    await next();
  } else {
    ctx.response.redirect("/login");
  }
};
