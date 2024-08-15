import config from 'config'; // 👈 2
import { AppDataSource } from '../src/core/connection_tests';
import { TeamEntity } from '../src/entities/team';
import { RiderEntity } from '../src/entities/rider';
import { SponsorEntity } from '../src/entities/sponsor';
import { UserEntity } from '../src/entities/user';
import { RaceEntity } from '../src/entities/race';
import { RaceTeamEntity } from '../src/entities/raceTeam';
import { initializeLogger } from '../src/core/logging'; // 👈 2
import { Role } from '../src/models/roles'; // 👈 4
import { Team } from '../src/models/team';
import { Rider } from '../src/models/rider';
 
//Test data
const teams : Team[] = [
    {
      name: 'Canyon//SRAM Racing',
      country: 'Germany',
      victories: 8,
      points: 5710,
      team_status: 'WTW',
      abbreviation: 'CSR',
      director: 'Ronny Lauke',
      assistant: 'Beth Duryea',
      representative: 'Magnus Bäckstedt',
      bike: 'Canyon',
      overhead_cost: 6500000.00,
    },
    {
      name: 'Union Cycliste Internationale',
      country: 'Switzerland',
      victories: 0,
      points: 0,
      team_status: 'UCI',
      abbreviation: 'UCI',
      director: 'David Lappartient',
      assistant: 'Adam Hansen',
      representative: 'Jelle Leus',
      bike: 'Shimano',
      overhead_cost: 60000000,
    }
  ]
  const riders: Rider[] = [
    { riderId:1, nationality:'Poland', last_name:'Niewiadoma', first_name:'Katarzyna', birthday: new Date('1994-09-29'), points:10763, teamId:1, monthly_wage:50047.57 },
    { riderId:2, nationality:'Australia', last_name:'Cromwell', first_name:'Tiffany', birthday: new Date('1988-07-06'), points:3604, teamId:1, monthly_wage:7192.01 },
    { riderId:3, nationality:'Italy', last_name:'Paladin', first_name:'Soraya', birthday: new Date('1994-04-11'), points:3372, teamId:1, monthly_wage:6517.66 },
]
export async function runMigrationsAndSeed() {
    //run migrations
    await AppDataSource.runMigrations();
    
    //seed db
    const teamRepo = AppDataSource.getRepository(TeamEntity);
    const riderRepo = AppDataSource.getRepository(RiderEntity);
    const sponsorRepo = AppDataSource.getRepository(SponsorEntity);
    const raceRepo = AppDataSource.getRepository(RaceEntity);
    const userRepo = AppDataSource.getRepository(UserEntity);
    const raceTeamRepo = AppDataSource.getRepository(RaceTeamEntity);

    for (const teamData of teams) {
        //check if team already exists
        const existingTeam = await teamRepo.findOneBy({ name: teamData.name });
        let team;
        if (!existingTeam) {
          team = teamRepo.create(teamData);
          await teamRepo.save(team);
          console.log(`Team ${teamData.name} has been added`);
        } else {
          team = existingTeam;
        }
        //seed riders linked to the team above
        const teamRiders = riders.filter((rider) => rider.teamId === team.teamId);
        for (const riderData of teamRiders) {
          const existingRider = await riderRepo.findOneBy({
            first_name: riderData.first_name,
            last_name: riderData.last_name,
          });
          let rider;
          if (!existingRider) {
            rider = riderRepo.create(riderData);
            await riderRepo.save(rider);
            console.log(
              `Rider ${riderData.first_name} ${riderData.last_name} has been added`
            );
          } else {
            rider = existingRider;
          }
        }
      }
    }
// 👇 1
 export default async (): Promise<void> => {
    // Initialize the TypeORM data source
    await AppDataSource.initialize();
    
    // Insert the test teams
    runMigrationsAndSeed();
    
    
};