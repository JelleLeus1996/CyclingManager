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
exports.userSchema = exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const team_1 = require("./team");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_1.TeamEntity, team => team.riders),
    (0, typeorm_1.JoinColumn)({ name: "teamId" }),
    __metadata("design:type", team_1.TeamEntity)
], UserEntity.prototype, "team", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)()
], UserEntity);
exports.userSchema = {
    email: { type: "string", required: true, example: "john.doe@hotmail.com" },
    password: { type: "string", required: true, example: "Password" },
};
//# sourceMappingURL=user.js.map