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
exports.raceService = void 0;
const connection_1 = require("../core/connection");
const race_1 = require("../entities/race");
const raceValidation_1 = __importDefault(require("../Validationschemes/raceValidation"));
class RaceService {
    constructor() {
        this.raceRepository = connection_1.AppDataSource.getRepository(race_1.RaceEntity);
    }
    getAllRaces() {
        return this.raceRepository.find();
    }
    getRaceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Race = yield this.raceRepository.findOneBy({ raceId: id });
            return Race;
        });
    }
    createRace(race) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = raceValidation_1.default.raceSchema.validate(race);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                const raceToBeSaved = new race_1.RaceEntity();
                raceToBeSaved.name = race.name;
                raceToBeSaved.date = race.date;
                raceToBeSaved.location = race.location;
                console.log(raceToBeSaved, "raceToBeSaved");
                yield this.raceRepository.save(raceToBeSaved);
                return;
            }
        });
    }
    updateRace(id, updatedRace) {
        return __awaiter(this, void 0, void 0, function* () {
            const raceToBeUpdated = yield this.raceRepository.findOneBy({ raceId: id });
            if (!raceToBeUpdated) {
                throw new Error(`race with ID ${id} not found`);
            }
            const valid = raceValidation_1.default.raceSchema.validate(updatedRace);
            if (valid.error) {
                throw new Error(valid.error.details[0].message);
            }
            else {
                raceToBeUpdated.name = updatedRace.name;
                raceToBeUpdated.date = updatedRace.date;
                raceToBeUpdated.location = updatedRace.location;
                return yield this.raceRepository.save(raceToBeUpdated);
            }
        });
    }
    deleteRace(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.raceRepository.delete({ raceId: id });
        });
    }
}
// Export a singleton instance in the service layer
exports.raceService = new RaceService();
//# sourceMappingURL=raceService.js.map