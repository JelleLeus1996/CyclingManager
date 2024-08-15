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
exports.teamSchema = exports.TeamEntity = void 0;
const typeorm_1 = require("typeorm");
const rider_1 = require("./rider");
const sponsor_1 = require("./sponsor");
let TeamEntity = class TeamEntity {
};
exports.TeamEntity = TeamEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TeamEntity.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "victories", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "team_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "abbreviation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "director", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TeamEntity.prototype, "assistant", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TeamEntity.prototype, "representative", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "bike", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TeamEntity.prototype, "overhead_cost", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rider_1.RiderEntity, rider => rider.team),
    __metadata("design:type", Array)
], TeamEntity.prototype, "riders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sponsor_1.SponsorEntity, rider => rider.team),
    __metadata("design:type", Array)
], TeamEntity.prototype, "sponsors", void 0);
exports.TeamEntity = TeamEntity = __decorate([
    (0, typeorm_1.Entity)()
], TeamEntity);
exports.teamSchema = {
    name: { type: "string", required: true, example: "Team Ineos" },
    country: { type: "string", required: true, example: "United Kingdom" },
    victories: { type: "number", required: false, example: 10 },
    points: { type: "number", required: false, example: 1000 },
    team_status: { type: "string", required: true, example: "UCI" },
    abbreviation: { type: "string", required: true, example: "INS" },
    director: { type: "string", required: true, example: "Dave Brailsford" },
    assistant: { type: "string", required: false, example: "Rod Ellingworth" },
    representative: { type: "string", required: false, example: "Chris Froome" },
    bike: { type: "string", required: true, example: "Pinarello" },
    overhead_cost: { type: "number", required: true, example: 1000000 },
};
//# sourceMappingURL=team.js.map