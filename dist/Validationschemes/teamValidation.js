"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const teamSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).max(99).required(),
    country: joi_1.default.string().min(1).max(50).required(),
    victories: joi_1.default.number().min(0).max(250),
    points: joi_1.default.number().min(0).max(1000000),
    team_status: joi_1.default.string().valid('WTW', 'CTW', 'UCI').required(),
    abbreviation: joi_1.default.string().min(3).max(3).required(),
    director: joi_1.default.string().min(1).max(99).required(),
    assistant: joi_1.default.string().min(1).max(99).required(),
    representative: joi_1.default.string().min(1).max(99).required(),
    bike: joi_1.default.string().min(1).max(50).required(),
    overhead_cost: joi_1.default.number().min(100000).max(50000000).required(),
});
const validationResult = teamSchema.validate({ country: 'abc', points: 1994 });
if (validationResult.error) {
    console.error(validationResult.error.message);
}
else {
    console.log(validationResult.value);
}
exports.default = { teamSchema };
//# sourceMappingURL=teamValidation.js.map