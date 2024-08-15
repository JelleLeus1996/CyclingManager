"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const team_1 = require("../entities/team");
const sponsor_1 = require("../entities/sponsor");
const rider_1 = require("../entities/rider");
const user_1 = require("../entities/user");
const race_1 = require("../entities/race");
const config_1 = __importDefault(require("config")); // Import the config library
const databaseConfig = config_1.default.get('database');
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    /*   host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.name, */
    host: "localhost",
    port: 3306,
    username: "root",
    password: "everglide",
    database: "cyclingdatabase",
    synchronize: true, // Be cautious with this in production
    logging: true,
    entities: [team_1.TeamEntity, rider_1.RiderEntity, race_1.RaceEntity, sponsor_1.SponsorEntity, user_1.UserEntity],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=connection.js.map