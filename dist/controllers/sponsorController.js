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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const sponsorService_1 = require("../services/sponsorService");
const sponsor_1 = require("../entities/sponsor");
let SponsorController = class SponsorController {
    static getAllSponsors(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsors = yield sponsorService_1.sponsorService.getAllSponsors();
            if (sponsors) {
                ctx.status = 200;
                ctx.body = sponsors;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Sponsors not found" };
            }
        });
    }
    static getAllSponsorsLimitedWithTeam(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsors = yield sponsorService_1.sponsorService.getAllSponsorsLimitedWithTeam();
            if (sponsors) {
                ctx.status = 200;
                ctx.body = sponsors;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Sponsors not found" };
            }
        });
    }
    static getSponsorById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = ctx.params.id;
            console.log(id);
            const sponsor = yield sponsorService_1.sponsorService.getSponsorById(id);
            if (sponsor) {
                ctx.status = 200;
                ctx.body = sponsor;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Sponsor with id ${id} not found` };
            }
        });
    }
    static getAllSponsorsLimitedForTeam(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = ctx.params.id;
            console.log(id);
            const sponsor = yield sponsorService_1.sponsorService.getAllSponsorsLimitedForTeam(id);
            if (sponsor) {
                ctx.status = 200;
                ctx.body = sponsor;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Sponsors for team with id ${id} not found` };
            }
        });
    }
    static createSponsor(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsorToBeSaved = Object.assign({}, ctx.request.body);
            try {
                yield sponsorService_1.sponsorService.createSponsor(sponsorToBeSaved);
                ctx.status = 200;
                ctx.body = { message: "Sponsor created" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static updateSponsor(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsorId = +ctx.params.id;
            const updatedSponsor = Object.assign({}, ctx.request.body);
            try {
                yield sponsorService_1.sponsorService.updateSponsor(sponsorId, updatedSponsor);
                ctx.status = 200;
                ctx.body = { message: "Sponsor updated" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static deleteSponsor(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsorId = +ctx.params.id;
            try {
                yield sponsorService_1.sponsorService.deleteSponsor(sponsorId);
                ctx.status = 200;
                ctx.body = { message: "Sponsor deleted" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
};
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/sponsors"),
    (0, koa_swagger_decorator_1.summary)("Get all sponsors"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SponsorController, "getAllSponsors", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/sponsors"),
    (0, koa_swagger_decorator_1.summary)("Get all sponsors"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SponsorController, "getAllSponsorsLimitedWithTeam", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/sponsors/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find sponsor by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of sponsor" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SponsorController, "getSponsorById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/sponsors/forTeam/{teamId}"),
    (0, koa_swagger_decorator_1.summary)("Find sponsors for team by teamId"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SponsorController, "getAllSponsorsLimitedForTeam", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/sponsors"),
    (0, koa_swagger_decorator_1.summary)("Create a new sponsor"),
    (0, koa_swagger_decorator_1.body)(sponsor_1.sponsorSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SponsorController, "createSponsor", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("put", "/sponsors/{id}"),
    (0, koa_swagger_decorator_1.summary)("Update sponsor by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of sponsor" },
    }),
    (0, koa_swagger_decorator_1.body)(sponsor_1.sponsorSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SponsorController, "updateSponsor", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("delete", "/sponsors/{id}"),
    (0, koa_swagger_decorator_1.summary)("Delete sponsor by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of sponsor" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SponsorController, "deleteSponsor", null);
SponsorController = __decorate([
    (0, koa_swagger_decorator_1.responsesAll)({
        200: { description: "success" },
        400: { description: "bad request" },
        401: { description: "unauthorized, missing/wrong jwt token" },
        404: { description: "not found" },
    }),
    (0, koa_swagger_decorator_1.tagsAll)(["Sponsors"])
], SponsorController);
exports.default = SponsorController;
//# sourceMappingURL=sponsorController.js.map