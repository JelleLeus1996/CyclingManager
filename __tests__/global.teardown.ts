import { AppDataSource } from '../src/core/connection'; // Import your TypeORM data source
import { RiderEntity } from '../src/entities/rider'; // Import your Rider entity
import { TeamEntity } from '../src/entities/team'; // Import your Team entity

export default async (): Promise<void> => {
  // Initialize the TypeORM data source if not already initialized
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  // Get the repositories for the Rider and Team entities
  const riderRepo = AppDataSource.getRepository(RiderEntity);
  const teamRepo = AppDataSource.getRepository(TeamEntity);

  // Remove any leftover data
  await riderRepo.delete({});
  await teamRepo.delete({});

  // Close the TypeORM connection
  await AppDataSource.destroy();
};