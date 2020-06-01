import { RouterContext } from "../deps.ts";

export const logout = async (ctx: RouterContext) => {
  ctx.cookies.delete("jwt");
  ctx.response.redirect("/");
};
