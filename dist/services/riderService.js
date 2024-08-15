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
exports.riderService = void 0;
const connection_1 = require("../core/connection");
const rider_1 = require("../entities/rider");
const riderValidation_1 = __importDefault(require("../Validationschemes/riderValidation"));
class RiderService {
    constructor() {
        this.riderRepository = connection_1.AppDataSource.getRepository(rider_1.RiderEntity);
    }
    //GET all riders full - VIEW: Admin & concerning user related to the team
    getAllRiders() {
        return this.riderRepository.find();
    }
    //GET all riders limited - VIEW: ALL
    getAllRidersLimited() {
        return __awaiter(this, void 0, void 0, function* () {
            const riders = yield this.riderRepository.createQueryBuilder('rider')
                .select([
                'rider.first_name',
                'rider.last_name',
                'rider.nationality',
                'rider.birthday',
                'rider.points',
                'rider.monthly_wage',
                'rider.teamId',
            ])
                .getMany();
            return riders;
        });
    }
    //GET rider full (riderId) - VIEW: Admin & concerning user related to the team
    getRiderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rider = yield this.riderRepository.findOneBy({ riderId: id });
            return rider;
        });
    }
    //GET rider limited (riderId) - VIEW: ALL
    getLimitedRiderById(riderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rider = yield this.riderRepository.createQueryBuilder('rider')
                .select([
                'rider.first_name',
                'rider.last_name',
                'rider.nationality',
                'rider.birthday',
                'rider.points',
                'rider.monthly_wage',
                'rider.teamId',
            ])
                .where('rider.riderId = :riderId', { riderId }).getOne();
            return rider;
        });
    }
    //GET riders full from teamId - VIEW: Admin & concerning user related to the team
    getRidersFromTeam(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const riders = yield this.riderRepository.find({ where: { teamId: teamId } });
            return riders;
        });
    }
    //GET riders limited with team (riderId) - VIEW: ALL
    getRiderLimitedWithTeam(riderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rider = yield this.riderRepository.createQueryBuilder('rider')
                .leftJoinAndSelect('rider.teams', 'team')
                .select([
                'rider.first_name',
                'rider.last_name',
                'rider.nationality',
                'rider.birthday',
                'rider.points',
                'rider.monthly_wage',
                'rider.teamId',
                'team.name'
            ])
                .where('rider.riderId = :riderId', { riderId }).getOne();
            return rider;
        });
    }
    //GET rider full by name (first_name & last_name) - VIEW: Admin & concerning user related to the team
    getRiderByName(first_name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const rider = yield this.riderRepository.findOneBy({ first_name: first_name, last_name: last_name });
            return rider;
        });
    }
    //GET rider limited by name (first_name & last_name) - VIEW: ALL
    getLimitedRiderByName(first_name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const rider = yield this.riderRepository.createQueryBuilder('rider')
                .select([
                'rider.first_name',
                'rider.last_name',
                'rider.nationality',
                'rider.birthday',
                'rider.points',
                'rider.monthly_wage',
                'rider.teamId',
            ])
                .where('rider.first_name = :first_name AND rider.last_name = :last_name', { first_name, last_name })
                .getOne();
            return rider;
        });
    }
    //CREATE rider - Only Admin
    createRider(rider) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = riderValidation_1.default.riderSchema.validate(rider);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                const riderToBeSaved = new rider_1.RiderEntity();
                riderToBeSaved.first_name = rider.first_name;
                riderToBeSaved.last_name = rider.last_name;
                riderToBeSaved.nationality = rider.nationality;
                riderToBeSaved.birthday = rider.birthday;
                riderToBeSaved.points = rider.points || 0;
                riderToBeSaved.teamId = rider.teamId;
                riderToBeSaved.monthly_wage = rider.monthly_wage || 250;
                console.log(riderToBeSaved, "riderToBeSaved");
                yield this.riderRepository.save(riderToBeSaved);
                return;
            }
        });
    }
    //UPDATE rider - Only Admin
    updateRider(id, updatedRider) {
        return __awaiter(this, void 0, void 0, function* () {
            const riderToBeUpdated = yield this.riderRepository.findOneBy({ riderId: id });
            if (!riderToBeUpdated) {
                throw new Error(`rider with ID ${id} not found`);
            }
            const valid = riderValidation_1.default.riderSchema.validate(updatedRider);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                riderToBeUpdated.first_name = updatedRider.first_name;
                riderToBeUpdated.last_name = updatedRider.last_name;
                riderToBeUpdated.nationality = updatedRider.nationality;
                riderToBeUpdated.birthday = updatedRider.birthday;
                riderToBeUpdated.points = updatedRider.points || 0;
                riderToBeUpdated.teamId = updatedRider.teamId;
                riderToBeUpdated.monthly_wage = updatedRider.monthly_wage || 250;
                return yield this.riderRepository.save(riderToBeUpdated);
            }
        });
    }
    //DELETE rider - only Admin
    deleteRider(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.riderRepository.delete({ riderId: id });
        });
    }
}
// Export a singleton instance in the service layer
exports.riderService = new RiderService();
//# sourceMappingURL=riderService.js.map