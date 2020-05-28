import { Application, Router } from "./deps.ts";
import { login } from "./auth/mod.ts";

const router = new Router();

router
  .post("/login", login);
// .get('/guest', guest)

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log("Started on port: 8000");
