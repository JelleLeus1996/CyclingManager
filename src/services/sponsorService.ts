import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../core/connection";
import { Sponsor } from "../models/sponsor";
import { SponsorEntity } from "../entities/sponsor";
import sponsorValidation from "../Validationschemes/sponsorValidation";

class SponsorService {
  private sponsorRepository: Repository<SponsorEntity>;

  constructor() {
    this.sponsorRepository = AppDataSource.getRepository(SponsorEntity);
  }

  //GET all sponsors full - VIEW: Admin
  getAllSponsors(): Promise<Sponsor[]> {
    return this.sponsorRepository.find();
  }

  //GET sponsor full by Id - VIEW: Admin & concerning user related to the team
  async getSponsorById(id: number): Promise<Sponsor | undefined> {
    const sponsor = await this.sponsorRepository.findOneBy({ sponsorId: id });
    return sponsor as Sponsor;
  }

  //GET all sponsors limited with team - VIEW: ALL
  async getAllSponsorsLimitedWithTeam(): Promise<Partial<Sponsor>[]> {
    const sponsors = await this.sponsorRepository
      .createQueryBuilder("sponsor")
      .leftJoinAndSelect("sponsor.teams", "team")
      .select([
        "sponsor.name",
        "sponsor.industry",
        "sponsor.teamId",
        "team.name",
      ])
      .getMany();
    return sponsors;
  }

  //GET all sponsors of a team - VIEW: ALL
  async getAllSponsorsLimitedForTeam(
    teamId: number
  ): Promise<Partial<Sponsor>[]> {
    const sponsors = await this.sponsorRepository
      .createQueryBuilder("sponsor")
      .leftJoinAndSelect("sponsor.teams", "team")
      .select([
        "sponsor.name",
        "sponsor.industry",
        "sponsor.teamId",
        "team.name",
      ])
      .where("sponsor.teamId = :teamId", { teamId })
      .getMany();
    return sponsors;
  }

  //CREATE sponsor - Admin only
  async createSponsor(sponsor: Sponsor): Promise<void> {
    const valid = sponsorValidation.sponsorSchema.validate(sponsor);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
      const sponsorToBeSaved: SponsorEntity = new SponsorEntity();
      sponsorToBeSaved.name = sponsor.name;
      sponsorToBeSaved.industry = sponsor.industry;
      sponsorToBeSaved.contribution = sponsor.contribution;
      sponsorToBeSaved.teamId = sponsor.teamId;

      console.log(sponsorToBeSaved, "sponsorToBeSaved");
      await this.sponsorRepository.save(sponsorToBeSaved);
      return;
    }
  }

  //UPDATE sponsor - Admin only
  async updateSponsor(
    id: number,
    updatedSponsor: Sponsor
  ): Promise<SponsorEntity> {
    const sponsorToBeUpdated = await this.sponsorRepository.findOneBy({
      sponsorId: id,
    });
    if (!sponsorToBeUpdated) {
      throw new Error(`Sponsor with ID ${id} not found`);
    }
    const valid = sponsorValidation.sponsorSchema.validate(updatedSponsor);
    if (valid.error) {
      throw new Error(valid.error.details[0].message);
    } else {
      sponsorToBeUpdated.name = updatedSponsor.name;
      sponsorToBeUpdated.industry = updatedSponsor.industry;
      sponsorToBeUpdated.contribution = updatedSponsor.contribution;
      sponsorToBeUpdated.teamId = updatedSponsor.teamId;

      return await this.sponsorRepository.save(sponsorToBeUpdated);
    }
  }

  //DELETE sponsor - Admin only
  async deleteSponsor(id: number): Promise<DeleteResult> {
    return await this.sponsorRepository.delete({ sponsorId: id });
  }
}

export const sponsorService = new SponsorService();
