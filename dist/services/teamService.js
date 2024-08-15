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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const connection_1 = require("../core/connection");
const team_1 = require("../entities/team");
const teamValidation_1 = __importDefault(require("../Validationschemes/teamValidation"));
class TeamService {
    constructor() {
        this.teamRepository = connection_1.AppDataSource.getRepository(team_1.TeamEntity);
    }
    //Limited = public info everyone may see
    //Full = All info with financials
    //GET team limited with all races (id) - VIEW: ALL
    //GET all teams limited with all races - VIEW: ALL
    //GET teams only with financials - VIEW: Admin only
    //GET all teams limited - VIEW: ALL
    getAllTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.teamRepository.createQueryBuilder('team')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
            ])
                .getMany();
            return teams;
        });
    }
    //GET team full (ID) - VIEW: Admin & concerning user related to the team
    getTeamWithFinancials(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamWithFinancials = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.riders', 'rider')
                .leftJoinAndSelect('team.sponsors', 'sponsor')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'team.overhead_cost'
            ])
                .addSelect('SUM(rider.monthly_wage * 12)', 'totalSalaryCost')
                .addSelect('SUM(sponsor.contribution)', 'sponsorContribution')
                .addSelect('SUM(sponsor.contribution) - SUM(rider.monthly_wage * 12) - team.overhead_cost', 'profitLoss')
                .where('team.teamId = :teamId', { teamId })
                .groupBy('team.teamId')
                .orderBy('profitLoss')
                .getRawOne();
            return teamWithFinancials;
        });
    }
    //GET all teams full - VIEW: Admin only
    getAllTeamsWithFinancials() {
        return __awaiter(this, void 0, void 0, function* () {
            const teamsWithFinancials = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.riders', 'rider')
                .leftJoinAndSelect('team.sponsors', 'sponsor')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'team.overhead_cost'
            ])
                .addSelect('SUM(rider.monthly_wage * 12)', 'totalSalaryCost')
                .addSelect('SUM(sponsor.contribution)', 'sponsorContribution')
                .addSelect('SUM(sponsor.contribution) - SUM(rider.monthly_wage * 12) - team.overhead_cost', 'profitLoss')
                .groupBy('team.teamId')
                .orderBy('profitLoss')
                .getRawMany(); // Changed from getRawOne to getRawMany
            return teamsWithFinancials;
        });
    }
    //GET team full by id (id) - VIEW: Admin & concerning user related to the team
    getTeamById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.teamRepository.findOneBy({ teamId: id });
            return team;
        });
    }
    //GET team limited by id (id) - VIEW: ALL
    getLimitedTeamById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.teamRepository.createQueryBuilder('team')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
            ])
                .where('team.teamId = :id', { id }).getOne();
            return team;
        });
    }
    //GET team full by name (name) - VIEW: Admin & concerning user related to the team
    getTeamByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.teamRepository.findOneBy({ name: name });
            return team;
        });
    }
    //GET team limited by name (name) - VIEW: ALL
    getLimitedTeamByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.teamRepository.createQueryBuilder('team')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
            ])
                .where('team.name = :name', { name }).getOne();
            return team;
        });
    }
    //GET team limited with all riders (id) - VIEW: ALL
    getTeamWithRidersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.riders', 'rider')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'rider.first_name',
                'rider.last_name'
            ])
                .where('team.teamId = :id', { id }).getOne();
            return team;
        });
    }
    //GET team full with all riders (id) - VIEW: ALL
    getTeamFullWithRidersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.riders', 'rider')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'team.overhead_cost',
                'rider.first_name',
                'rider.last_name',
                'rider.monthly_wage'
            ])
                .where('team.teamId = :id', { id }).getOne();
            return team;
        });
    }
    //GET teams limited with all riders (id) - VIEW: ALL
    getTeamsWithRiders() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.riders', 'rider')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'rider.first_name',
                'rider.last_name'
            ])
                .groupBy('team.teamId')
                .getRawMany();
            return teams;
        });
    }
    //GET team full with all riders (id) - VIEW: ALL
    getTeamsFullWithRiders() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.riders', 'rider')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'team.overhead_cost',
                'rider.first_name',
                'rider.last_name',
                'rider.birthday',
                'rider.monthly_wage',
                'rider.points'
            ])
                .groupBy('team.teamId')
                .getRawMany();
            return teams;
        });
    }
    //GET team limited with sponsors (id) - VIEW: ALL
    getTeamWithSponsors(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamWithSponsors = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.sponsors', 'sponsor')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'sponsor.name',
                'sponsor.industry'
            ])
                .where('team.teamId = :id', { id }).getOne();
            return teamWithSponsors;
        });
    }
    //GET team full with sponsors (id) - VIEW: Admin & concerning user related to the team
    getTeamFullWithSponsors(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamsWithSponsors = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.sponsors', 'sponsor')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'team.overhead_cost',
                'sponsor.name',
                'sponsor.industry',
                'sponsor.contribution'
            ])
                .where('team.teamId = :id', { id }).getOne();
            return teamsWithSponsors;
        });
    }
    //GET all teams full with sponsors (id) - VIEW: Admin & concerning user related to the team
    getTeamsFullWithSponsors() {
        return __awaiter(this, void 0, void 0, function* () {
            const teamsWithSponsors = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.sponsors', 'sponsor')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'team.overhead_cost',
                'sponsor.name',
                'sponsor.industry',
                'sponsor.contribution'
            ])
                .groupBy('team.teamId')
                .getRawMany();
            return teamsWithSponsors;
        });
    }
    //GET all teams limited with sponsors (id) - VIEW: ALL
    getTeamsWithSponsors() {
        return __awaiter(this, void 0, void 0, function* () {
            const teamsWithSponsors = yield this.teamRepository.createQueryBuilder('team')
                .leftJoinAndSelect('team.sponsors', 'sponsor')
                .select([
                'team.teamId',
                'team.name',
                'team.country',
                'team.victories',
                'team.points',
                'team.team_status',
                'team.abbreviation',
                'team.director',
                'team.assistant',
                'team.representative',
                'team.bike',
                'sponsor.name',
                'sponsor.industry',
            ])
                .groupBy('team.teamId')
                .getRawMany();
            return teamsWithSponsors;
        });
    }
    createTeam(team) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = teamValidation_1.default.teamSchema.validate(team);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                const teamToBeSaved = new team_1.TeamEntity();
                teamToBeSaved.name = team.name;
                teamToBeSaved.country = team.country;
                teamToBeSaved.victories = team.victories || 0;
                teamToBeSaved.points = team.points || 0;
                teamToBeSaved.team_status = team.team_status;
                teamToBeSaved.abbreviation = team.abbreviation;
                teamToBeSaved.director = team.director;
                teamToBeSaved.assistant = team.assistant || "";
                teamToBeSaved.representative = team.representative || "";
                teamToBeSaved.bike = team.bike;
                teamToBeSaved.overhead_cost = team.overhead_cost;
                console.log(teamToBeSaved, "teamToBeSaved");
                yield this.teamRepository.save(teamToBeSaved);
                return;
            }
        });
    }
    updateTeam(id, updatedTeam) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamToBeUpdated = yield this.teamRepository.findOneBy({ teamId: id });
            if (!teamToBeUpdated) {
                throw new Error(`team with ID ${id} not found`);
            }
            const valid = teamValidation_1.default.teamSchema.validate(updatedTeam);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                teamToBeUpdated.name = updatedTeam.name;
                teamToBeUpdated.country = updatedTeam.country;
                teamToBeUpdated.victories = updatedTeam.victories || 0;
                teamToBeUpdated.points = updatedTeam.points || 0;
                teamToBeUpdated.team_status = updatedTeam.team_status;
                teamToBeUpdated.abbreviation = updatedTeam.abbreviation;
                teamToBeUpdated.director = updatedTeam.director;
                teamToBeUpdated.assistant = updatedTeam.assistant || "";
                teamToBeUpdated.representative = updatedTeam.representative || "";
                teamToBeUpdated.bike = updatedTeam.bike;
                teamToBeUpdated.overhead_cost = updatedTeam.overhead_cost;
                return yield this.teamRepository.save(teamToBeUpdated);
            }
        });
    }
    deleteTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.teamRepository.delete({ teamId: id });
        });
    }
}
// Export a singleton instance in the service layer
exports.teamService = new TeamService();
//# sourceMappingURL=teamService.js.map