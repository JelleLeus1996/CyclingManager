"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const routes_1 = require("./routes");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const connection_1 = require("./core/connection");
const migrationsAndSeed_1 = require("./core/migrationsAndSeed");
// Initialize the connection to the database
connection_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    //run migrations and seed the db
    yield (0, migrationsAndSeed_1.runMigrationsAndSeed)();
    //After filling the db, start koa server
    const app = new koa_1.default();
    const port = 3000;
    // Enable bodyParser with default options
    app.use((0, koa_bodyparser_1.default)());
    app.use(routes_1.routes.routes());
    app.listen(port, () => {
        console.log(`🚀 Server is running on port http://localhost:${port}/`);
    });
}))
    .catch((error) => {
    console.error("Error connecting to the database", error);
});
// The code above is the entry point of the application. It initializes the connection to the database, creates a new Koa instance, and listens on port 3000. It also enables the bodyParser middleware to parse incoming requests.
//# sourceMappingURL=index.js.map