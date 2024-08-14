import Koa from "koa";
import { routes } from "./routes";
import bodyParser from "koa-bodyparser";
import { AppDataSource } from "./core/connection";
import { runMigrationsAndSeed } from './core/migrationsAndSeed'
import jwt from "koa-jwt";

// Initialize the connection to the database
AppDataSource.initialize()
  .then(async () => {

    //run migrations and seed the db
    await runMigrationsAndSeed();

    //After filling the db, start koa server
    const app = new Koa();

    const port = 3000;
    
    // Enable bodyParser with default options
    app.use(bodyParser());

    // Middleware below this line is only reached if JWT token is valid
    app.use(jwt({ secret: 'config.jwtSecret' }).unless({ path: [/^\/swagger/] }));
     
    app.use(routes.routes()).use(routes.allowedMethods());

    app.listen(port, () => {
      console.log(`🚀 Server is running on port http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
// The code above is the entry point of the application. It initializes the connection to the database, creates a new Koa instance, and listens on port 3000. It also enables the bodyParser middleware to parse incoming requests.
// Test