"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const raceSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).max(99).required(),
    date: joi_1.default.date().greater('1-1-2022').required(),
    location: joi_1.default.string().min(1).max(99).required(),
});
const validationResult = raceSchema.validate({ location: 'Ghent', date: '24-03-2024' });
if (validationResult.error) {
    console.error(validationResult.error.message);
}
else {
    console.log(validationResult.value);
}
exports.default = { raceSchema };
//# sourceMappingURL=raceValidation.js.map