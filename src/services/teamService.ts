import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../core/connection";
import { TeamEntity } from "../entities/team";
import { Team } from "../models/team";
import validate from '../core/validation';
import teamValidation from '../Validationschemes/teamValidation'

class TeamService {
  private teamRepository: Repository<TeamEntity>;

  constructor() {
    this.teamRepository = AppDataSource.getRepository(TeamEntity);
  }
  //Limited = public info everyone may see
  //Full = All info with financials

  //GET team limited with all races (id) - VIEW: ALL
  //GET all teams limited with all races - VIEW: ALL
  //GET teams only with financials - VIEW: Admin only
  
  //GET all teams limited - VIEW: ALL
  async getAllTeams(): Promise<Partial<Team>[]> {
    const teams = await this.teamRepository.createQueryBuilder('team') 
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
    .getMany()
    return teams;
  }

  //GET team full (ID) - VIEW: Admin & concerning team
  async getTeamWithFinancials(teamId:number): Promise<Team & { totalSalaryCost: number; sponsorContribution:number; profitLoss: number }> {
    const teamWithFinancials = await this.teamRepository.createQueryBuilder('team')
    .leftJoinAndSelect('team.riders','rider')
    .leftJoinAndSelect('team.sponsors','sponsor')
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
    .addSelect('SUM(sponsor.contribution)','sponsorContribution')
    .addSelect('SUM(sponsor.contribution) - SUM(rider.monthly_wage * 12) - team.overhead_cost', 'profitLoss')
    .where('team.teamId = :teamId', {teamId})
    .groupBy('team.teamId')
    .orderBy('profitLoss')
    .getRawOne();
    return teamWithFinancials;
  }

  //GET all teams full - VIEW: Admin only
  async getAllTeamsWithFinancials(): Promise<(Team & { totalSalaryCost: number; sponsorContribution: number; profitLoss: number })[]> {
    const teamsWithFinancials = await this.teamRepository.createQueryBuilder('team')
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
  }

  //GET team full by id (id) - VIEW: Admin & concerning team
  async getTeamById(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository.findOneBy({ teamId: id });
    return team as Team;
  }
  
  //GET team limited by id (id) - VIEW: ALL
  async getLimitedTeamById(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository.createQueryBuilder('team') 
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
    .where('team.teamId = :id', {id}).getOne();
    return team as Team;
  }

  //GET team full by name (name) - VIEW: Admin & concerning team
  async getTeamByName(name: string): Promise<Team | undefined> {
    const team = await this.teamRepository.findOneBy({ name: name });
    return team as Team;
  }

  //GET team limited by name (name) - VIEW: ALL
  async getLimitedTeamByName(name: string): Promise<Team | undefined> {
    const team = await this.teamRepository.createQueryBuilder('team') 
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
    .where('team.name = :name', {name}).getOne();
    return team as Team;
  }
    
  //GET team limited with all riders (id) - VIEW: ALL
  async getTeamWithRidersById(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository.createQueryBuilder('team') 
    .leftJoinAndSelect('team.riders','rider')
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
    .where('team.teamId = :id', {id}).getOne();
    return team as Team;
  }

    //GET team full with all riders (id) - VIEW: ALL
    async getTeamFullWithRidersById(id: number): Promise<Team | undefined> {
      const team = await this.teamRepository.createQueryBuilder('team') 
      .leftJoinAndSelect('team.riders','rider')
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
      .where('team.teamId = :id', {id}).getOne();
      return team as Team;
    }

  //GET teams limited with all riders (id) - VIEW: ALL
  async getTeamsWithRiders(): Promise<(Team | undefined)[]> {
    const teams = await this.teamRepository.createQueryBuilder('team') 
    .leftJoinAndSelect('team.riders','rider')
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
  }

  //GET team full with all riders (id) - VIEW: ALL
  async getTeamsFullWithRiders(): Promise<Team[] | undefined> {
    const teams = await this.teamRepository.createQueryBuilder('team') 
    .leftJoinAndSelect('team.riders','rider')
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
  }

  //GET team limited with sponsors (id) - VIEW: ALL
  async getTeamWithSponsors(id:number): Promise<Team | undefined>{
    const teamWithSponsors = await this.teamRepository.createQueryBuilder('team')
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
    .where('team.teamId = :id', {id}).getOne();
    return teamWithSponsors as Team;
  }

  //GET team full with sponsors (id) - VIEW: Admin & concerning team
  async getTeamFullWithSponsors(id:number): Promise<Team | undefined>{
    const teamsWithSponsors = await this.teamRepository.createQueryBuilder('team')
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
    .where('team.teamId = :id', {id}).getOne();
    return teamsWithSponsors as Team;
  }

  //GET all teams full with sponsors (id) - VIEW: Admin & concerning team
  async getTeamsFullWithSponsors(): Promise<Team[] | undefined>{
    const teamsWithSponsors = await this.teamRepository.createQueryBuilder('team')
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
  }
    
  //GET all teams limited with sponsors (id) - VIEW: ALL
  async getTeamsWithSponsors(): Promise<Team[] | undefined>{
    const teamsWithSponsors = await this.teamRepository.createQueryBuilder('team')
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
  }

  async createTeam(team: Team): Promise<void> {
    const valid = teamValidation.teamSchema.validate(team)
    if (valid.error)
      {
        throw new Error(valid.error.details[0].message);
      }
      else
      {
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

  async updateTeam(id: number, updatedTeam: Team): Promise<TeamEntity> {
    const teamToBeUpdated = await this.teamRepository.findOneBy({ teamId: id });
    if (!teamToBeUpdated) {
      throw new Error(`team with ID ${id} not found`);
    }
    const valid = teamValidation.teamSchema.validate(updatedTeam)
    if (valid.error)
      {
        throw new Error(valid.error.details[0].message);
      }
      else
      {
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

  async deleteTeam(id: number): Promise<DeleteResult> {
    return await this.teamRepository.delete({ teamId: id });
  }
}
// Export a singleton instance in the service layer
export const teamService = new TeamService();
