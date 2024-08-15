"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorSchema = exports.SponsorEntity = void 0;
const typeorm_1 = require("typeorm");
const team_1 = require("./team");
let SponsorEntity = class SponsorEntity {
};
exports.SponsorEntity = SponsorEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SponsorEntity.prototype, "sponsorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SponsorEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SponsorEntity.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SponsorEntity.prototype, "contribution", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SponsorEntity.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_1.TeamEntity, team => team.riders),
    (0, typeorm_1.JoinColumn)({ name: "teamId" }),
    __metadata("design:type", team_1.TeamEntity)
], SponsorEntity.prototype, "team", void 0);
exports.SponsorEntity = SponsorEntity = __decorate([
    (0, typeorm_1.Entity)()
], SponsorEntity);
exports.sponsorSchema = {
    name: { type: "string", required: true, example: "EY" },
    industry: { type: "string", required: true, example: "Consulting" },
    contribution: { type: "number", required: true, example: 7500000 },
    teamId: { type: "number", required: true, example: 4 }
};
//# sourceMappingURL=sponsor.js.map