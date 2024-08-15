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
const raceService_1 = require("../services/raceService");
const race_1 = require("../entities/race");
let RaceController = class RaceController {
    static getAllRaces(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const races = yield raceService_1.raceService.getAllRaces();
            if (races) {
                ctx.status = 200;
                ctx.body = races;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Races not found" };
            }
        });
    }
    static getRaceById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params.id);
            const race = yield raceService_1.raceService.getRaceById(+ctx.params.id);
            if (race) {
                ctx.status = 200;
                ctx.body = race;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Race not found" };
            }
        });
    }
    static createRace(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const raceToBeSaved = Object.assign({}, ctx.request.body);
            try {
                yield raceService_1.raceService.createRace(raceToBeSaved);
                ctx.status = 200;
                ctx.body = { message: "Race created" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static updateRace(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const raceId = +ctx.params.id;
            const updatedRace = Object.assign({}, ctx.request.body);
            try {
                yield raceService_1.raceService.updateRace(raceId, updatedRace);
                ctx.status = 200;
                ctx.body = { message: "Race updated" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static deleteRace(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const raceId = +ctx.params.id;
            try {
                yield raceService_1.raceService.deleteRace(raceId);
                ctx.status = 200;
                ctx.body = { message: "Race deleted" };
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
    (0, koa_swagger_decorator_1.request)("get", "/races"),
    (0, koa_swagger_decorator_1.summary)("Get all races"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RaceController, "getAllRaces", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/races/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find race by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of race" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RaceController, "getRaceById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/races"),
    (0, koa_swagger_decorator_1.summary)("Create a new race"),
    (0, koa_swagger_decorator_1.body)(race_1.raceSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RaceController, "createRace", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("put", "/races/{id}"),
    (0, koa_swagger_decorator_1.summary)("Update race by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of race" },
    }),
    (0, koa_swagger_decorator_1.body)(race_1.raceSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RaceController, "updateRace", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("delete", "/races/{id}"),
    (0, koa_swagger_decorator_1.summary)("Delete race by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of race" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RaceController, "deleteRace", null);
RaceController = __decorate([
    (0, koa_swagger_decorator_1.responsesAll)({
        200: { description: "success" },
        400: { description: "bad request" },
        401: { description: "unauthorized, missing/wrong jwt token" },
        404: { description: "not found" },
    }),
    (0, koa_swagger_decorator_1.tagsAll)(["Races"])
], RaceController);
exports.default = RaceController;
//# sourceMappingURL=raceController.js.map