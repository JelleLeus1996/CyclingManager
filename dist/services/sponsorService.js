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
exports.sponsorService = void 0;
const connection_1 = require("../core/connection");
const sponsor_1 = require("../entities/sponsor");
const sponsorValidation_1 = __importDefault(require("../Validationschemes/sponsorValidation"));
class SponsorService {
    constructor() {
        this.sponsorRepository = connection_1.AppDataSource.getRepository(sponsor_1.SponsorEntity);
    }
    //GET all sponsors full - VIEW: Admin & concerning user related to the team
    getAllSponsors() {
        return this.sponsorRepository.find();
    }
    //GET all sponsors limited - VIEW: ALL
    getAllSponsorsLimitedWithTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsors = yield this.sponsorRepository.createQueryBuilder('sponsor')
                .leftJoinAndSelect('sponsor.teams', 'team')
                .select([
                'sponsor.name',
                'sponsor.industry',
                'sponsor.teamId',
                'team.name'
            ])
                .getMany();
            return sponsors;
        });
    }
    //GET all sponsors of a team - VIEW: ALL
    getAllSponsorsLimitedForTeam(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsors = yield this.sponsorRepository.createQueryBuilder('sponsor')
                .leftJoinAndSelect('sponsor.teams', 'team')
                .select([
                'sponsor.name',
                'sponsor.industry',
                'sponsor.teamId',
                'team.name'
            ])
                .where('sponsor.teamId = :teamId', { teamId })
                .getMany();
            return sponsors;
        });
    }
    //GET sponsor full by Id - VIEW: Admin & concerning user related to the team
    getSponsorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsor = yield this.sponsorRepository.findOneBy({ sponsorId: id });
            return sponsor;
        });
    }
    //CREATE sponsor - Admin only
    createSponsor(sponsor) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = sponsorValidation_1.default.sponsorSchema.validate(sponsor);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                const sponsorToBeSaved = new sponsor_1.SponsorEntity();
                sponsorToBeSaved.name = sponsor.name;
                sponsorToBeSaved.industry = sponsor.industry;
                sponsorToBeSaved.contribution = sponsor.contribution;
                sponsorToBeSaved.teamId = sponsor.teamId;
                console.log(sponsorToBeSaved, "sponsorToBeSaved");
                yield this.sponsorRepository.save(sponsorToBeSaved);
                return;
            }
        });
    }
    //UPDATE sponsor - Admin only
    updateSponsor(id, updatedSponsor) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsorToBeUpdated = yield this.sponsorRepository.findOneBy({ sponsorId: id });
            if (!sponsorToBeUpdated) {
                throw new Error(`Sponsor with ID ${id} not found`);
            }
            const valid = sponsorValidation_1.default.sponsorSchema.validate(updatedSponsor);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                sponsorToBeUpdated.name = updatedSponsor.name;
                sponsorToBeUpdated.industry = updatedSponsor.industry;
                sponsorToBeUpdated.contribution = updatedSponsor.contribution;
                sponsorToBeUpdated.teamId = updatedSponsor.teamId;
                return yield this.sponsorRepository.save(sponsorToBeUpdated);
            }
        });
    }
    //DELETE sponsor - Admin only
    deleteSponsor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sponsorRepository.delete({ sponsorId: id });
        });
    }
}
// Export a singleton instance in the service layer
exports.sponsorService = new SponsorService();
//# sourceMappingURL=sponsorService.js.map