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
  if (ctx.state.currentUser) {
    await next();
  } else {
    ctx.response.redirect("/login");
  }
  return;
  const authorization = ctx.request.headers.get("Authorization");
  if (!authorization) {
    ctx.response.status = 401;
    return;
  }
  const jwt = authorization.split(" ").pop();
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }
  const isValid = await validateJwt(
    jwt,
    JWT_SECRET_TOKEN,
    { isThrowing: false },
  );
  if (isValid) {
    await next();
    return;
  }
  const message = "Invalid jwt token";
  ctx.response.status = 401;
  ctx.response.body = { message };
};
