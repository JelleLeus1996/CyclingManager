// createServer.ts
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { routes } from "./routes";

export async function createServer() {
  const app = new Koa();

  // Enable bodyParser with default options
  app.use(bodyParser());

  // Use the routes defined in your application
  app.use(routes.routes());

  return app;
}
