import { Application, Router, Context } from "./deps.ts";
import { login, logout, protectionMiddleware, userMiddleware } from "./auth/mod.ts";

const router = new Router();

router
  .post("/login", login)
  .post("/logout", logout)
  .get("/must-be-logged-in", protectionMiddleware, (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.body = {
      You: "are logged in",
    };
  });

const app = new Application();

app.use(userMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log("Started on port: 8000");
