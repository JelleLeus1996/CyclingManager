/* import { DataSource } from 'typeorm';
import config from 'config'; // Read from config file
import { getLogger } from '../core/logging'; // Import logging */

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
import { createConnection, getRepository } from 'typeorm';
import { TeamEntity } from '../entities/team'
import { teams } from './seeds/202312101116_team';

async function seedDatabase() {
  const connection = await createConnection(); // Make sure to use your actual connection options
  const teamRepository = getRepository(TeamEntity);

  for (const teamData of teams) {
    const team = teamRepository.create(teamData);
    await teamRepository.save(team);
  }

  console.log('Seeding complete!');
  await connection.close();
}

seedDatabase().catch(error => console.error('Seeding failed:', error));
