import supertest from "supertest";
import Koa from "koa";
import { AppDataSource } from "../core/connection_tests";
import createServer from "../createServer";
const app = createServer();
 
export const login = async (): Promise<string> => {
  const response = await supertest
    .agent(app.callback())
    .post("/api/users/login")
    .send({
      email: "Magnus.Bäckstedt@hotmail.com",
      password: "12345678",
    })
    .set("Accept", "application/json");
 
  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occurred");
  }
 
  return `Bearer ${response.body.token}`;
};
 
export const loginAdmin = async (): Promise<string> => {
  const response = await supertest(app.callback())
    .post("/api/users/login")
    .send({
      email: "jelle.leus@student.hogent.be",
      password: "12345678",
    });
 
  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occurred");
  }
 
  return `Bearer ${response.body.token}`;
};
 
export const withServer = (
  setter: (arg: { request: supertest.SuperTest<supertest.Test> }) => void
): void => {
  let app;
 
  beforeAll(async () => {
    await AppDataSource.initialize();
    app = createServer();
    const request = supertest(
      app.callback()
    ) as unknown as supertest.SuperTest<supertest.Test>; // Cast the request object to the correct type
    setter({ request });
  });
 
  afterAll(async () => {
    await AppDataSource.destroy();
  });
};
 