import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../core/connection";
import { RaceEntity } from "../entities/race";
import { Race } from "../models/race";
import raceValidation from '../Validationschemes/raceValidation'

class RaceService {
  private raceRepository: Repository<RaceEntity>;

  constructor() {
    this.raceRepository = AppDataSource.getRepository(RaceEntity);
  }

  getAllRaces(): Promise<Race[]> {
    return this.raceRepository.find();
  }

  async getRaceById(id: number): Promise<Race | undefined> {
    const Race = await this.raceRepository.findOneBy({ raceId: id });
    return Race as Race;
  }

  async createRace(race: Race): Promise<void> {
    const valid = raceValidation.raceSchema.validate(race)
    if (valid.error)
      {
        throw new Error(valid.error.details[0].message);
      }
      else
      {
        const raceToBeSaved: RaceEntity = new RaceEntity();
        raceToBeSaved.name = race.name;
        raceToBeSaved.date = race.date;
        raceToBeSaved.location = race.location;
        console.log(raceToBeSaved, "raceToBeSaved");
        await this.raceRepository.save(raceToBeSaved);
        return;
      }
  }

  async updateRace(id: number, updatedRace: Race): Promise<RaceEntity> {
    const raceToBeUpdated = await this.raceRepository.findOneBy({ raceId: id });
    if (!raceToBeUpdated) {
      throw new Error(`race with ID ${id} not found`);
    }
    const valid = raceValidation.raceSchema.validate(updatedRace)
    if (valid.error)
      {
        throw new Error(valid.error.details[0].message);
      }
      else
      {
      raceToBeUpdated.name = updatedRace.name;
      raceToBeUpdated.date = updatedRace.date;
      raceToBeUpdated.location = updatedRace.location;
      return await this.raceRepository.save(raceToBeUpdated);
      }
  }

  async deleteRace(id: number): Promise<DeleteResult> {
    return await this.raceRepository.delete({ raceId: id });
  }
}
// Export a singleton instance in the service layer
export const raceService = new RaceService();
