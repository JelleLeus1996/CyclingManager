import supertest, { SuperTest, Test } from "supertest";
import Koa from "koa";
import { AppDataSource } from "../src/core/connection_tests";
import { createServer } from "../src/createServer";

type SupertestInstance = SuperTest<Test>;

// Define the type for the setter function parameter in withServer
interface WithServerSetter {
  supertest: SupertestInstance;
}

const login = async (supertest: SupertestInstance): Promise<string> => {
  const response = await supertest
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

const loginAdmin = async (supertest: SupertestInstance): Promise<string> => {
  const response = await supertest.post("/api/users/login").send({
    email: "jelle.leus@student.hogent.be",
    password: "12345678",
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occurred");
  }

  return `Bearer ${response.body.token}`;
};

const withServer = (setter: (arg: { supertest: supertest.SuperAgentTest }) => void): void => {
  let app: Koa;

  beforeAll(async () => {
    // Initialize the TypeORM data source
    await AppDataSource.initialize();
    app = await createServer();
  });

  afterAll(async () => {
    // Close the TypeORM connection
    await AppDataSource.destroy();
    
  });
};

export { login, loginAdmin, withServer };
