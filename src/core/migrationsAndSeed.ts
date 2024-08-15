import { AppDataSource } from "./connection";
import { TeamEntity } from "../entities/team";
import { RiderEntity } from "../entities/rider";
import { SponsorEntity } from "../entities/sponsor";
import { RaceEntity } from "../entities/race";
import { UserEntity } from "../entities/user";
import { teams } from "../data/seeds/202312101116_team";
import { riders } from "../data/seeds/202408091536_rider";
import { sponsors } from "../data/seeds/202408091538_sponsor";
import { users } from "../data/seeds/202408121032_user";
import { races } from "../data/seeds/202408091539_race";
import { getRandomContinentalTeamIds } from "../data/seeds/202407131054_race_team";
import { RaceTeamEntity } from "../entities/raceTeam";
import { Status } from "../models/status";

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

    //seed sponsors linked to the team above
    const teamSponsors = sponsors.filter(
      (sponsor) => sponsor.teamId === team.teamId
    );
    for (const sponsorData of teamSponsors) {
      const existingSponsor = await sponsorRepo.findOneBy({
        name: sponsorData.name,
      });
      let sponsor;
      if (!existingSponsor) {
        sponsor = sponsorRepo.create(sponsorData);
        await sponsorRepo.save(sponsor);
        console.log(`Sponsor ${sponsorData.name} has been added`);
      } else {
        sponsor = existingSponsor;
      }
    }
    const teamUsers = users.filter((user) => user.teamId === team.teamId);
    for (const userData of teamUsers) {
      const existingUser = await userRepo.findOneBy({ email: userData.email });
      let user;
      if (!existingUser) {
        user = userRepo.create(userData);
        await userRepo.save(user);
        console.log(`User ${userData.email} has been added`);
      } else {
        user = existingUser;
      }
    }
  }

  for (const raceData of races) {
    //check if team already exists
    const existingRace = await raceRepo.findOneBy({ name: raceData.name });
    let race;
    if (!existingRace) {
      race = raceRepo.create(raceData);
      await raceRepo.save(race);
      console.log(`Race ${raceData.name} has been added`);
    } else {
      race = existingRace;
    }
    const count = await raceTeamRepo.countBy({ race: { raceId: race.raceId } });
    const expectedTeamCount = 19;
    if (count < expectedTeamCount) {
      const worldTourTeams = teams.filter(
        (team) => team.team_status === Status.WTW
      );
      const continentalTeams = teams.filter(
        (team) => team.team_status === Status.CTW
      );
      const contiTeamIds = continentalTeams.map((team) => team.teamId);
      const continentalTeamIds = getRandomContinentalTeamIds(contiTeamIds, 4);
      const continentalTeamsParticipating = teams.filter((team) =>
        continentalTeamIds.includes(team.teamId)
      );
      for (const team of worldTourTeams.concat(continentalTeamsParticipating)) {
        // Check if the race-team association already exists
        const existingRaceTeam = await raceTeamRepo.findOne({
          where: {
            race: { raceId: race.raceId },
            team: { teamId: team.teamId },
          },
        });

        if (!existingRaceTeam) {
          const raceTeam = raceTeamRepo.create({
            race: race,
            team: team,
          });
          await raceTeamRepo.save(raceTeam);
        }
      }
      console.log("Race-Team relationships have been seeded");
    } else {
      console.log("Race-Team already been seeded");
    }
  }
}
