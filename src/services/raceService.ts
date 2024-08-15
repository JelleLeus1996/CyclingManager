import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../core/connection";
import { RaceEntity } from "../entities/race";
import { Race } from "../models/race";
import raceValidation from "../Validationschemes/raceValidation";

class RaceService {
  private raceRepository: Repository<RaceEntity>;

  constructor() {
    this.raceRepository = AppDataSource.getRepository(RaceEntity);
  }

  //GET all races - View: All
  getAllRaces(): Promise<Race[]> {
    return this.raceRepository.find();
  }

  //GET race by id - View: All
  async getRaceById(id: number): Promise<Race | undefined> {
    const Race = await this.raceRepository.findOneBy({ raceId: id });
    return Race as Race;
  }

  //GET race by id with teams - View: All
  async getRaceWithTeams(raceId: number): Promise<Race | undefined> {
    const race = await this.raceRepository
      .createQueryBuilder("race")
      .leftJoinAndSelect("race.raceTeams", "raceTeam")
      .leftJoinAndSelect("raceTeam.team", "team")
      .select([
        "race.raceId",
        "race.name",
        "race.date",
        "race.location",
        "raceTeam.id",
      ])
      .addSelect(["team.teamId", "team.name"])
      .where("race.raceId = :raceId", { raceId })
      .getOne();
    if (race != null) {
      return race;
    }
  }

  //GET race by id with teams and riders - View: All
  async getRaceWithTeamsAndRiders(raceId: number): Promise<Race | undefined> {
    const race = await this.raceRepository
      .createQueryBuilder("race")
      .leftJoinAndSelect("race.raceTeams", "raceTeam")
      .leftJoinAndSelect("raceTeam.team", "team")
      .leftJoinAndSelect("team.riders", "rider")
      .select([
        "race.raceId",
        "race.name",
        "race.date",
        "race.location",
        "raceTeam.id",
      ])
      .addSelect([
        "team.teamId",
        "team.name",
        "rider.first_name",
        "rider.last_name",
      ])
      .where("race.raceId = :raceId", { raceId })
      .getOne();
    if (race != null) {
      return race;
    }
  }

  //POST race - only Admin
  async createRace(race: Race): Promise<void> {
    const valid = raceValidation.raceSchema.validate(race);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
      const raceToBeSaved: RaceEntity = new RaceEntity();
      raceToBeSaved.name = race.name;
      raceToBeSaved.date = race.date;
      raceToBeSaved.location = race.location;
      console.log(raceToBeSaved, "raceToBeSaved");
      await this.raceRepository.save(raceToBeSaved);
      return;
    }
  }

  //UPDATE race - only Admin
  async updateRace(id: number, updatedRace: Race): Promise<RaceEntity> {
    const raceToBeUpdated = await this.raceRepository.findOneBy({ raceId: id });
    if (!raceToBeUpdated) {
      throw new Error(`race with ID ${id} not found`);
    }
    const valid = raceValidation.raceSchema.validate(updatedRace);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
      raceToBeUpdated.name = updatedRace.name;
      raceToBeUpdated.date = updatedRace.date;
      raceToBeUpdated.location = updatedRace.location;
      return await this.raceRepository.save(raceToBeUpdated);
    }
  }

  //DELETE race - only Admin
  async deleteRace(id: number): Promise<DeleteResult> {
    return await this.raceRepository.delete({ raceId: id });
  }
}

export const raceService = new RaceService();
