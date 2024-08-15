import { DataSource } from "typeorm";
import { TeamEntity } from "../entities/team";
import { SponsorEntity } from "../entities/sponsor";
import { RiderEntity } from "../entities/rider";
import { UserEntity } from "../entities/user";
import { RaceEntity } from "../entities/race";
import { RaceTeamEntity } from "../entities/raceTeam";
import config from "config"; // Import the config library
const databaseConfig = config.get('database');

export const AppDataSource = new DataSource({
  type: "mysql",
   host: databaseConfig.DATABASE_HOST,
  port: databaseConfig.PORT,
  username: databaseConfig.DATABASE_USERNAME,
  password: databaseConfig.DATABASE_PASSWORD,
  database: databaseConfig.DATABASE_NAME, 
  //host: "localhost",
  //port: 3306,
  //username: "root",
  //password: "everglide",
  //database: "cyclingdatabase",
  synchronize: true, 
  logging: true,
  entities: [TeamEntity,RiderEntity,RaceEntity,SponsorEntity,UserEntity, RaceTeamEntity],
  subscribers: [],
  migrations: [],
});
