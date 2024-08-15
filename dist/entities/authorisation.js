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
exports.authorisationSchema = exports.AuthorisationEntity = void 0;
const typeorm_1 = require("typeorm");
let AuthorisationEntity = class AuthorisationEntity {
};
exports.AuthorisationEntity = AuthorisationEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuthorisationEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AuthorisationEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuthorisationEntity.prototype, "teamId", void 0);
exports.AuthorisationEntity = AuthorisationEntity = __decorate([
    (0, typeorm_1.Entity)()
], AuthorisationEntity);
exports.authorisationSchema = {
    name: { type: "string", required: true, example: "Tour de San Luis" },
    date: { type: "date", required: true, example: "18-01-2024" },
    location: { type: "string", required: true, example: "Argentina" }
};
//# sourceMappingURL=authorisation.js.map