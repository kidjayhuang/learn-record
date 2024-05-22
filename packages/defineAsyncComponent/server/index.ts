import Koa from "koa";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "koa-cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createRequire } from "node:module";
const cjsRequire = createRequire(import.meta.url);

const app = new Koa();
app.use(cors());
// 静态资源
app.use(cjsRequire("koa-static")(path.join(__dirname) + "/public"));
app.use(async (ctx) => {
  ctx.body = "static file server";
});
app.listen(3000, () => {
  console.log("build success");
});
