"use strict";
/* import { DataSource } from 'typeorm';
import config from 'config'; // Read from config file
import { getLogger } from '../core/logging'; // Import logging */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Start config
/* const NODE_ENV: string = config.get('env');
const isDevelopment: boolean = NODE_ENV === 'development';

const DATABASE_TYPE: string = config.get('database.type');
const DATABASE_NAME: string = config.get('database.name');
const DATABASE_HOST: string = config.get('database.host');
const DATABASE_PORT: number = config.get('database.port');
const DATABASE_USERNAME: string = config.get('database.username');
const DATABASE_PASSWORD: string = config.get('database.password'); */
// Define your entities and migrations directories
//const entitiesPath = 'src/entity/**/*.ts';
//const migrationsPath = 'src/migration/**/*.ts';
// Create a new DataSource instance
//const AppDataSource = new DataSource({
//  type: DATABASE_TYPE as any,
//  host: DATABASE_HOST,
//  port: DATABASE_PORT,
//  username: DATABASE_USERNAME,
//  password: DATABASE_PASSWORD,
//  database: DATABASE_NAME,
//  synchronize: isDevelopment, // Use synchronize only in development
//  logging: isDevelopment,
//  entities: [entitiesPath],
//  migrations: [migrationsPath],
//});
//
//const initializeData = async (): Promise<DataSource> => {
//  const logger = getLogger();
//  logger.info('Initializing connection to the database');
//
//  try {
//    await AppDataSource.initialize();
//    logger.info('Database connection established');
//  } catch (error) {
//    logger.error('Error initializing database', { error });
//    throw new Error('Could not initialize the data layer');
//  }
//
//  try {
//    await AppDataSource.runMigrations();
//    logger.info('Migrations executed');
//  } catch (error) {
//    logger.error('Migrations failed', { error });
//    throw new Error('Migrations failed');
//  }
//
//  // Seeding is not directly supported in TypeORM, you would need to implement a custom seeding mechanism
//
//  return AppDataSource;
//};
//
//async function shutdownData(): Promise<void> {
//  getLogger().info('Shutting down database connection');
//  await AppDataSource.destroy();
//  getLogger().info('Database connection closed');
//}
//
//const getDataSource = (): DataSource => {
//  if (!AppDataSource.isInitialized) {
//    throw new Error('Initialize database first');
//  }
//  return AppDataSource;
//};
//
//// Export initializeData, getDataSource, and shutdownData
//export { initializeData, getDataSource, shutdownData };
//
// seed.ts
const typeorm_1 = require("typeorm");
const team_1 = require("../entities/team");
const _202312101116_team_1 = require("./seeds/202312101116_team");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, typeorm_1.createConnection)(); // Make sure to use your actual connection options
        const teamRepository = (0, typeorm_1.getRepository)(team_1.TeamEntity);
        for (const teamData of _202312101116_team_1.teams) {
            const team = teamRepository.create(teamData);
            yield teamRepository.save(team);
        }
        console.log('Seeding complete!');
        yield connection.close();
    });
}
seedDatabase().catch(error => console.error('Seeding failed:', error));
//# sourceMappingURL=index.js.map