import { Application, Router, Context } from "./deps.ts";
import { login,authMiddleware } from "./auth/mod.ts";

const router = new Router();

router
  .post("/login", login)
  .get("/must-be-logged-in", authMiddleware, (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.body = {
      You: "are logged in",
    };
  });
// .get('/guest', guest)

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log("Started on port: 8000");
