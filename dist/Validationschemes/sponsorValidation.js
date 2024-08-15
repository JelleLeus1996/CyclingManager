"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const sponsorSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).max(99).required(),
    industry: joi_1.default.string().min(1).max(99).required(),
    teamId: joi_1.default.number().integer().required(),
    contribution: joi_1.default.number().min(100000).max(100000000),
});
const validationResult = sponsorSchema.validate({ industry: 'abc', contribution: 250000 });
if (validationResult.error) {
    console.error(validationResult.error.message);
}
else {
    console.log(validationResult.value);
}
exports.default = { sponsorSchema };
//# sourceMappingURL=sponsorValidation.js.map