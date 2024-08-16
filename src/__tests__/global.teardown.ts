import { AppDataSource } from '../core/connection_tests';

export default async (): Promise<void> => {
  await AppDataSource.destroy();
};