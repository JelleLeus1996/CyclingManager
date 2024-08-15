import { DataSource } from "typeorm";
import { TeamEntity } from "../entities/team";
import { SponsorEntity } from "../entities/sponsor";
import { RiderEntity } from "../entities/rider";
import { UserEntity } from "../entities/user";
import { RaceEntity } from "../entities/race";
import { RaceTeamEntity } from "../entities/raceTeam";
import config from "config"; // Import the config library
const databaseConfig = config.get<{
  client:string;
  host:string;
  port:number;
  username:string;
  password:string;
  name:string;
}>("database");

export const AppDataSource = new DataSource({
  type: "mysql",
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: "cyclingDatabase_tests", 
  synchronize: true, 
  logging: true,
  entities: [TeamEntity,RiderEntity,RaceEntity,SponsorEntity,UserEntity, RaceTeamEntity],
  subscribers: [],
  migrations: [],
});
