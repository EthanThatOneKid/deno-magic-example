import { RouterContext } from "../deps.ts";
import { logoutUserByIssuer } from "./magic.ts";

export const logout = async (ctx: RouterContext) => {
  const { issuer } = ctx.state.user;
  await logoutUserByIssuer(issuer);
  ctx.cookies.delete("jwt");
  ctx.response.redirect("/");
};
