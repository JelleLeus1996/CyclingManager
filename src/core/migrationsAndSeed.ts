import { AppDataSource } from './connection';
import { TeamEntity } from '../entities/team';
import { RiderEntity } from '../entities/rider';
import { SponsorEntity } from '../entities/sponsor';
import { RaceEntity } from '../entities/race'
import { UserEntity } from '../entities/user';
import { teams } from '../data/seeds/202312101116_team';
import { riders } from '../data/seeds/202408091536_rider';
import { sponsors } from '../data/seeds/202408091538_sponsor';
import { users } from '../data/seeds/202408121032_user';
import { races } from '../data/seeds/202408091539_race';

export async function runMigrationsAndSeed() {
    //run migrations
    await AppDataSource.runMigrations();

    //seed db
    const teamRepo = AppDataSource.getRepository(TeamEntity);
    const riderRepo = AppDataSource.getRepository(RiderEntity);
    const sponsorRepo = AppDataSource.getRepository(SponsorEntity);
    const raceRepo = AppDataSource.getRepository(RaceEntity);
    const userRepo = AppDataSource.getRepository(UserEntity);
    for (const teamData of teams) 
    {
        //check if team already exists
        const existingTeam = await teamRepo.findOneBy({ name: teamData.name })
        let team;
        if (!existingTeam)
        {
            team = teamRepo.create(teamData);
            await teamRepo.save(team);
            console.log(`Team ${teamData.name} has been added`)
        }
        else {
            team = existingTeam;
        }
        //seed riders linked to the team above
        const teamRiders = riders.filter(rider => rider.teamId === team.teamId);
        for (const riderData of teamRiders)
        {
            const existingRider = await riderRepo.findOneBy({first_name : riderData.first_name, last_name : riderData.last_name})
            let rider;
            if (!existingRider)
            {
                rider = riderRepo.create(riderData);
                await riderRepo.save(rider);
                console.log(`Rider ${riderData.first_name} ${riderData.last_name} has been added`)
            }
            else{
                rider = existingRider;
            }
            
        }

        //seed sponsors linked to the team above
        const teamSponsors = sponsors.filter(sponsor => sponsor.teamId === team.teamId);
        for (const sponsorData of teamSponsors)
        {
            const existingSponsor = await sponsorRepo.findOneBy({name : sponsorData.name})
            let sponsor;
            if (!existingSponsor)
            {
                sponsor = sponsorRepo.create(sponsorData);
                await sponsorRepo.save(sponsor);
                console.log(`Sponsor ${sponsorData.name} has been added`)
            }
            else{
                sponsor = existingSponsor;
            }

        }
        const teamUsers = users.filter(user => user.teamId === team.teamId);
        for (const userData of teamUsers)
        {

            const existingUser = await userRepo.findOneBy({email : userData.email})
            let user;
            if (!existingUser)
            {
                user = userRepo.create(userData);
                await userRepo.save(user);
                console.log(`User ${userData.email} has been added`)
            }
            else{
                user = existingUser;
            }

        }
    }
    console.log('Database has been seeded');
}