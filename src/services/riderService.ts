import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../core/connection";
import { RiderEntity } from "../entities/rider";
import { Rider } from "../models/rider";
import riderValidation from "../Validationschemes/riderValidation";

class RiderService {
  private riderRepository: Repository<RiderEntity>;

  constructor() {
    this.riderRepository = AppDataSource.getRepository(RiderEntity);
  }

  //GET all riders full - VIEW: Only Admin
  getAllRiders(): Promise<Rider[]> {
    return this.riderRepository.find();
  }

  //GET all riders limited - VIEW: ALL
  async getAllRidersLimited(): Promise<Partial<Rider>[]> {
    const riders = await this.riderRepository
      .createQueryBuilder("rider")
      .select([
        "rider.first_name",
        "rider.last_name",
        "rider.nationality",
        "rider.birthday",
        "rider.points",
        "rider.monthly_wage",
        "rider.teamId",
      ])
      .getMany();
    return riders;
  }

  //GET rider full (riderId) - VIEW: Admin & concerning user related to the team
  async getRiderById(id: number): Promise<Rider | undefined> {
    const rider = await this.riderRepository.findOneBy({ riderId: id });
    return rider as Rider;
  }

  //GET rider limited (riderId) - VIEW: ALL
  async getLimitedRiderById(riderId: number): Promise<Rider | undefined> {
    const rider = await this.riderRepository
      .createQueryBuilder("rider")
      .select([
        "rider.first_name",
        "rider.last_name",
        "rider.nationality",
        "rider.birthday",
        "rider.points",
        "rider.monthly_wage",
        "rider.teamId",
      ])
      .where("rider.riderId = :riderId", { riderId })
      .getOne();
    return rider as Rider;
  }

  //GET riders full from teamId - VIEW: Admin & concerning user related to the team
  async getRidersFromTeam(teamId: number): Promise<Rider[]> {
    const riders = await this.riderRepository.find({
      where: { teamId: teamId },
    });
    return riders;
  }

  //GET riders limited with team (riderId) - VIEW: ALL
  async getRiderLimitedWithTeam(riderId: number): Promise<Rider | undefined> {
    const rider = await this.riderRepository
      .createQueryBuilder("rider")
      .leftJoinAndSelect("rider.teams", "team")
      .select([
        "rider.first_name",
        "rider.last_name",
        "rider.nationality",
        "rider.birthday",
        "rider.points",
        "rider.monthly_wage",
        "rider.teamId",
        "team.name",
      ])
      .where("rider.riderId = :riderId", { riderId })
      .getOne();
    return rider as Rider;
  }

  //GET rider full by name (first_name & last_name) - VIEW: Admin & concerning user related to the team
  async getRiderByName(
    first_name: string,
    last_name: string
  ): Promise<Rider | undefined> {
    const rider = await this.riderRepository.findOneBy({
      first_name: first_name,
      last_name: last_name,
    });
    return rider as Rider;
  }

  //GET rider limited by name (first_name & last_name) - VIEW: ALL
  async getLimitedRiderByName(
    first_name: string,
    last_name: string
  ): Promise<Rider | undefined> {
    const rider = await this.riderRepository
      .createQueryBuilder("rider")
      .select([
        "rider.first_name",
        "rider.last_name",
        "rider.nationality",
        "rider.birthday",
        "rider.points",
        "rider.monthly_wage",
        "rider.teamId",
      ])
      .where(
        "rider.first_name = :first_name AND rider.last_name = :last_name",
        { first_name, last_name }
      )
      .getOne();
    return rider as Rider;
  }

  //CREATE rider - Only Admin
  async createRider(rider: Rider): Promise<void> {
    const valid = riderValidation.riderSchema.validate(rider);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
      let riderToBeSaved: RiderEntity = new RiderEntity();
      riderToBeSaved = {
        ...riderToBeSaved,
        ...rider,
        points: rider.points || 0,
        monthly_wage: rider.monthly_wage || 250,
      }; 

      console.log(riderToBeSaved, "riderToBeSaved");
      await this.riderRepository.save(riderToBeSaved);
      return;
    }
  }

  //UPDATE rider - Only Admin
  async updateRider(id: number, updatedRider: Rider): Promise<RiderEntity> {
    const riderToBeUpdated = await this.riderRepository.findOneBy({
      riderId: id,
    });
    if (!riderToBeUpdated) {
      throw new Error(`rider with ID ${id} not found`);
    }
    const valid = riderValidation.riderSchema.validate(updatedRider);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
      riderToBeUpdated.first_name = updatedRider.first_name;
      riderToBeUpdated.last_name = updatedRider.last_name;
      riderToBeUpdated.nationality = updatedRider.nationality;
      riderToBeUpdated.birthday = updatedRider.birthday;
      riderToBeUpdated.points = updatedRider.points || 0;
      riderToBeUpdated.teamId = updatedRider.teamId;
      riderToBeUpdated.monthly_wage = updatedRider.monthly_wage || 250;

      return await this.riderRepository.save(riderToBeUpdated);
    }
  }

  //DELETE rider - only Admin
  async deleteRider(id: number): Promise<DeleteResult> {
    return await this.riderRepository.delete({ riderId: id });
  }
}

export const riderService = new RiderService();
