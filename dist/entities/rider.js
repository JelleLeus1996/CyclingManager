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
exports.riderSchema = exports.RiderEntity = void 0;
const typeorm_1 = require("typeorm");
const team_1 = require("./team");
let RiderEntity = class RiderEntity {
};
exports.RiderEntity = RiderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RiderEntity.prototype, "riderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RiderEntity.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RiderEntity.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RiderEntity.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RiderEntity.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], RiderEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], RiderEntity.prototype, "monthly_wage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RiderEntity.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_1.TeamEntity, team => team.riders),
    (0, typeorm_1.JoinColumn)({ name: "teamId" }),
    __metadata("design:type", team_1.TeamEntity)
], RiderEntity.prototype, "team", void 0);
exports.RiderEntity = RiderEntity = __decorate([
    (0, typeorm_1.Entity)()
], RiderEntity);
exports.riderSchema = {
    first_name: { type: "string", required: true, example: "Lance" },
    last_name: { type: "string", required: true, example: "Armstrong" },
    nationality: { type: "string", required: true, example: "United States" },
    birthday: { type: "date", required: true, example: "1-1-2000" },
    points: { type: "number", required: false, example: 354 },
    monthly_wage: { type: "number", required: true, example: 220000 },
    teamId: { type: "number", required: true, example: 2 }
};
//# sourceMappingURL=rider.js.map