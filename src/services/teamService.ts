import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../core/connection";
import { TeamEntity } from "../entities/team";
import { Team } from "../models/team";
import teamValidation from "../Validationschemes/teamValidation";

class TeamService {
  private teamRepository: Repository<TeamEntity>;

  constructor() {
    this.teamRepository = AppDataSource.getRepository(TeamEntity);
  }

  //GET all teams non-confidential - VIEW: ALL
  async getAllTeams(): Promise<Partial<Team>[]> {
    const teams = await this.teamRepository
      .createQueryBuilder("team")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
      ])
      .getMany();
    return teams;
  }

  //GET team full by id - VIEW: Admin & concerning user related to the team
  async getTeamById(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository.findOneBy({ teamId: id });
    return team as Team;
  }

  //GET team limited by id - VIEW: ALL
  async getLimitedTeamById(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository
      .createQueryBuilder("team")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
      ])
      .where("team.teamId = :id", { id })
      .getOne();
    return team as Team;
  }

  //GET team full by name - VIEW: Admin & concerning user related to the team
  async getTeamByName(name: string): Promise<Team | undefined> {
    const team = await this.teamRepository.findOneBy({ name: name });
    return team as Team;
  }

  //GET team limited by name - VIEW: ALL
  async getLimitedTeamByName(name: string): Promise<Team | undefined> {
    const team = await this.teamRepository
      .createQueryBuilder("team")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
      ])
      .where("team.name = :name", { name })
      .getOne();
    return team as Team;
  }

  //GET team full with financials by id - VIEW: Admin & concerning user related to the team
  async getTeamWithFinancials(teamId: number): Promise<
    Team & {
      totalSalaryCost: number;
      sponsorContribution: number;
      profitLoss: number;
    }
  > {
    const teamWithFinancials = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.riders", "rider")
      .leftJoinAndSelect("team.sponsors", "sponsor")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "team.overhead_cost",
      ])
      .addSelect("SUM(rider.monthly_wage * 12)", "totalSalaryCost")
      .addSelect("SUM(sponsor.contribution)", "sponsorContribution")
      .addSelect(
        "SUM(sponsor.contribution) - SUM(rider.monthly_wage * 12) - team.overhead_cost",
        "profitLoss"
      )
      .where("team.teamId = :teamId", { teamId })
      .groupBy("team.teamId")
      .orderBy("profitLoss")
      .getRawOne();
    return teamWithFinancials;
  }

  //GET all teams full - VIEW: Admin only
  async getAllTeamsWithFinancials(): Promise<
    (Team & {
      totalSalaryCost: number;
      sponsorContribution: number;
      profitLoss: number;
    })[]
  > {
    const teamsWithFinancials = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.riders", "rider")
      .leftJoinAndSelect("team.sponsors", "sponsor")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "team.overhead_cost",
      ])
      .addSelect("SUM(rider.monthly_wage * 12)", "totalSalaryCost")
      .addSelect("SUM(sponsor.contribution)", "sponsorContribution")
      .addSelect(
        "SUM(sponsor.contribution) - SUM(rider.monthly_wage * 12) - team.overhead_cost",
        "profitLoss"
      )
      .groupBy("team.teamId")
      .orderBy("profitLoss")
      .getRawMany(); // Changed from getRawOne to getRawMany
    return teamsWithFinancials;
  }

  //GET team limited with all riders (id) - VIEW: ALL
  async getTeamWithRidersById(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.riders", "rider")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "rider.first_name",
        "rider.last_name",
      ])
      .where("team.teamId = :id", { id })
      .getOne();
    return team as Team;
  }

  //GET team full with all riders (id) - VIEW: Admin & concerning user related to the team
  async getTeamFullWithRidersById(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.riders", "rider")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "team.overhead_cost",
        "rider.first_name",
        "rider.last_name",
        "rider.monthly_wage",
      ])
      .where("team.teamId = :id", { id })
      .getOne();
    return team as Team;
  }

  //GET all teams limited with riders - VIEW: ALL
  async getTeamsWithRiders(): Promise<(Team | undefined)[]> {
    const teams = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.riders", "rider")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "rider.first_name",
        "rider.last_name",
      ])
      .groupBy("team.teamId")
      .getRawMany();
    return teams;
  }

  //GET all teams full with all riders - VIEW: Only Admin
  async getTeamsFullWithRiders(): Promise<Team[] | undefined> {
    const teams = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.riders", "rider")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "team.overhead_cost",
        "rider.first_name",
        "rider.last_name",
        "rider.birthday",
        "rider.monthly_wage",
        "rider.points",
      ])
      .groupBy("team.teamId")
      .getRawMany();
    return teams;
  }

  //GET team limited with sponsors (id) - VIEW: ALL
  async getTeamWithSponsors(id: number): Promise<Team | undefined> {
    const teamWithSponsors = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.sponsors", "sponsor")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "sponsor.name",
        "sponsor.industry",
      ])
      .where("team.teamId = :id", { id })
      .getOne();
    return teamWithSponsors as Team;
  }

  //GET team full with sponsors (id) - VIEW: Admin & concerning user related to the team
  async getTeamFullWithSponsors(id: number): Promise<Team | undefined> {
    const teamsWithSponsors = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.sponsors", "sponsor")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "team.overhead_cost",
        "sponsor.name",
        "sponsor.industry",
        "sponsor.contribution",
      ])
      .where("team.teamId = :id", { id })
      .getOne();
    return teamsWithSponsors as Team;
  }

  //GET all teams full with sponsors (id) - VIEW: Admin & concerning user related to the team
  async getTeamsFullWithSponsors(): Promise<Team[] | undefined> {
    const teamsWithSponsors = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.sponsors", "sponsor")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "team.overhead_cost",
        "sponsor.name",
        "sponsor.industry",
        "sponsor.contribution",
      ])
      .groupBy("team.teamId")
      .getRawMany();
    return teamsWithSponsors;
  }

  //GET all teams limited with sponsors - VIEW: ALL
  async getTeamsWithSponsors(): Promise<Team[] | undefined> {
    const teamsWithSponsors = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.sponsors", "sponsor")
      .select([
        "team.teamId",
        "team.name",
        "team.country",
        "team.victories",
        "team.points",
        "team.team_status",
        "team.abbreviation",
        "team.director",
        "team.assistant",
        "team.representative",
        "team.bike",
        "sponsor.name",
        "sponsor.industry",
      ])
      .groupBy("team.teamId")
      .getRawMany();
    return teamsWithSponsors;
  }

  //GET team by id with races - View: All
  async getTeamWithRaces(teamId: number): Promise<Team | undefined> {
    const team = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.raceTeams", "raceTeam")
      .leftJoinAndSelect("raceTeam.race", "race")
      .select(["team.teamId", "team.name", "team.country", "raceTeam.id"])
      .addSelect(["race.raceId", "race.name"])
      .where("team.teamId = :teamId", { teamId })
      .getOne();
    if (team != null) {
      return team;
    }
  }

  //GET all teams with races - View: All
  async getTeamsWithRaces(): Promise<Team[] | undefined> {
    const teams = await this.teamRepository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.raceTeams", "raceTeam")
      .leftJoinAndSelect("raceTeam.race", "race")
      .select(["team.teamId", "team.name", "team.country", "raceTeam.id"])
      .addSelect(["race.raceId", "race.name"])
      .getMany();
    if (teams != null) {
      return teams;
    }
  }

  //POST team - Admin only
  async createTeam(team: Team): Promise<void> {
    const valid = teamValidation.teamSchema.validate(team);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
      const teamToBeSaved: TeamEntity = new TeamEntity();
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
      await this.teamRepository.save(teamToBeSaved);
      return;
    }
  }

  //UPDATE team - Admin only
  async updateTeam(id: number, updatedTeam: Team): Promise<TeamEntity> {
    const teamToBeUpdated = await this.teamRepository.findOneBy({ teamId: id });
    if (!teamToBeUpdated) {
      throw new Error(`team with ID ${id} not found`);
    }
    const valid = teamValidation.teamSchema.validate(updatedTeam);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
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

      return await this.teamRepository.save(teamToBeUpdated);
    }
  }

  //DELETE team - Admin only
  async deleteTeam(id: number): Promise<DeleteResult> {
    return await this.teamRepository.delete({ teamId: id });
  }
}

export const teamService = new TeamService();
