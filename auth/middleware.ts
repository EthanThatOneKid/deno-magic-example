import {
  config,
  validateJwt,
  Context,
} from "../deps.ts";

const { JWT_SECRET_TOKEN } = config();

export const authMiddleware = async (ctx: Context, next: any) => {
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
