"use strict";
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
exports.runMigrationsAndSeed = runMigrationsAndSeed;
const connection_1 = require("./connection");
const team_1 = require("../entities/team");
const rider_1 = require("../entities/rider");
const sponsor_1 = require("../entities/sponsor");
const race_1 = require("../entities/race");
const user_1 = require("../entities/user");
const _202312101116_team_1 = require("../data/seeds/202312101116_team");
const _202408091536_rider_1 = require("../data/seeds/202408091536_rider");
const _202408091538_sponsor_1 = require("../data/seeds/202408091538_sponsor");
const _202408121032_user_1 = require("../data/seeds/202408121032_user");
function runMigrationsAndSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        //run migrations
        yield connection_1.AppDataSource.runMigrations();
        //seed db
        const teamRepo = connection_1.AppDataSource.getRepository(team_1.TeamEntity);
        const riderRepo = connection_1.AppDataSource.getRepository(rider_1.RiderEntity);
        const sponsorRepo = connection_1.AppDataSource.getRepository(sponsor_1.SponsorEntity);
        const raceRepo = connection_1.AppDataSource.getRepository(race_1.RaceEntity);
        const userRepo = connection_1.AppDataSource.getRepository(user_1.UserEntity);
        for (const teamData of _202312101116_team_1.teams) {
            //check if team already exists
            const existingTeam = yield teamRepo.findOneBy({ name: teamData.name });
            let team;
            if (!existingTeam) {
                team = teamRepo.create(teamData);
                yield teamRepo.save(team);
                console.log(`Team ${teamData.name} has been added`);
            }
            else {
                team = existingTeam;
            }
            //seed riders linked to the team above
            const teamRiders = _202408091536_rider_1.riders.filter(rider => rider.teamId === team.teamId);
            for (const riderData of teamRiders) {
                const existingRider = yield riderRepo.findOneBy({ first_name: riderData.first_name, last_name: riderData.last_name });
                let rider;
                if (!existingRider) {
                    rider = riderRepo.create(riderData);
                    yield riderRepo.save(rider);
                    console.log(`Rider ${riderData.first_name} ${riderData.last_name} has been added`);
                }
                else {
                    rider = existingRider;
                }
            }
            //seed sponsors linked to the team above
            const teamSponsors = _202408091538_sponsor_1.sponsors.filter(sponsor => sponsor.teamId === team.teamId);
            for (const sponsorData of teamSponsors) {
                const existingSponsor = yield sponsorRepo.findOneBy({ name: sponsorData.name });
                let sponsor;
                if (!existingSponsor) {
                    sponsor = sponsorRepo.create(sponsorData);
                    yield sponsorRepo.save(sponsor);
                    console.log(`Sponsor ${sponsorData.name} has been added`);
                }
                else {
                    sponsor = existingSponsor;
                }
            }
            const teamUsers = _202408121032_user_1.users.filter(user => user.teamId === team.teamId);
            for (const userData of teamUsers) {
                const existingUser = yield userRepo.findOneBy({ email: userData.email });
                let user;
                if (!existingUser) {
                    user = userRepo.create(userData);
                    yield userRepo.save(user);
                    console.log(`User ${userData.email} has been added`);
                }
                else {
                    user = existingUser;
                }
            }
        }
        console.log('Database has been seeded');
    });
}
//# sourceMappingURL=migrationsAndSeed.js.map