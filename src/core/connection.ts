import { DataSource } from "typeorm";
import { TeamEntity } from "../entities/team";
import { SponsorEntity } from "../entities/sponsor";
import { RiderEntity } from "../entities/rider";
import { UserEntity } from "../entities/user";
import { RaceEntity } from "../entities/race";
import config from "config"; // Import the config library
const databaseConfig = config.get('database');

export const AppDataSource = new DataSource({
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
  entities: [TeamEntity,RiderEntity,RaceEntity,SponsorEntity,UserEntity],
  subscribers: [],
  migrations: [],
});
