import { Application, Router, Context, config } from "./deps.ts";
import {
  login,
  logout,
  protectionMiddleware,
  userMiddleware,
} from "./auth/mod.ts";

const { PORT } = config();
const router = new Router();

router
  .post("/login", login)
  .post("/logout", logout)
  .get("/must-be-logged-in", protectionMiddleware, (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.body = {
      You: "are logged in",
      user: ctx.state.user,
    };
  });

const app = new Application();

app.use(userMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
