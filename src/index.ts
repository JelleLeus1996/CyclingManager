import Koa from "koa";
import { routes } from "./routes";
import bodyParser from "koa-bodyparser";
import { AppDataSource } from "./core/connection";
import { runMigrationsAndSeed } from './core/migrationsAndSeed'
import 'dotenv/config'

// Initialize the connection to the database
AppDataSource.initialize()
  .then(async () => {

    console.log('Database password from .env:', process.env.DATABASE_PASSWORD);
    //run migrations and seed the db
    await runMigrationsAndSeed();
    
    //After filling the db, start koa server
    const app = new Koa();

    const port = 3000;
    
    // Enable bodyParser with default options
    app.use(bodyParser());

    app.use(routes.routes());

    app.listen(port, () => {
      console.log(`🚀 Server is running on port http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
// The code above is the entry point of the application. It initializes the connection to the database, creates a new Koa instance, and listens on port 3000. It also enables the bodyParser middleware to parse incoming requests.
