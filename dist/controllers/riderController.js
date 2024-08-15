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
const riderService_1 = require("../services/riderService");
const rider_1 = require("../entities/rider");
let RiderController = class RiderController {
    static getAllRiders(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riders = yield riderService_1.riderService.getAllRiders();
            if (riders) {
                ctx.status = 200;
                ctx.body = riders;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "No riders found" };
            }
        });
    }
    static getAllRidersLimited(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riders = yield riderService_1.riderService.getAllRidersLimited();
            if (riders) {
                ctx.status = 200;
                ctx.body = riders;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "No riders found" };
            }
        });
    }
    static getRiderById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riderId = ctx.params.riderId;
            console.log(riderId);
            const rider = yield riderService_1.riderService.getRiderById(riderId);
            if (rider) {
                ctx.status = 200;
                ctx.body = rider;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `No rider found with id ${riderId}` };
            }
        });
    }
    static getLimitedRiderById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riderId = ctx.params.riderId;
            console.log(riderId);
            const rider = yield riderService_1.riderService.getLimitedRiderById(riderId);
            if (rider) {
                ctx.status = 200;
                ctx.body = rider;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `No rider found with id ${riderId}` };
            }
        });
    }
    static getRidersFromTeam(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamId = ctx.params.teamId;
            console.log(teamId);
            const rider = yield riderService_1.riderService.getRidersFromTeam(teamId);
            if (rider) {
                ctx.status = 200;
                ctx.body = rider;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `No riders found with teamId ${teamId}` };
            }
        });
    }
    static getRiderLimitedWithTeam(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riderId = ctx.params.riderId;
            console.log(riderId);
            const rider = yield riderService_1.riderService.getRiderLimitedWithTeam(riderId);
            if (rider) {
                ctx.status = 200;
                ctx.body = rider;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Rider with id ${riderId} not found` };
            }
        });
    }
    static getRiderByName(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const first_name = ctx.params.first_name;
            const last_name = ctx.params.last_name;
            console.log(first_name, last_name);
            const rider = yield riderService_1.riderService.getRiderByName(first_name, last_name);
            if (rider) {
                ctx.status = 200;
                ctx.body = rider;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Rider with name ${first_name} ${last_name} not found` };
            }
        });
    }
    static getLimitedRiderByName(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const first_name = ctx.params.first_name;
            const last_name = ctx.params.last_name;
            console.log(first_name, last_name);
            const rider = yield riderService_1.riderService.getLimitedRiderByName(first_name, last_name);
            if (rider) {
                ctx.status = 200;
                ctx.body = rider;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Rider with name ${first_name} ${last_name} not found` };
            }
        });
    }
    static createRider(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riderToBeSaved = Object.assign({}, ctx.request.body);
            try {
                yield riderService_1.riderService.createRider(riderToBeSaved);
                ctx.status = 200;
                ctx.body = { message: "Rider created" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static updateRider(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riderId = +ctx.params.id;
            const updatedRider = Object.assign({}, ctx.request.body);
            try {
                yield riderService_1.riderService.updateRider(riderId, updatedRider);
                ctx.status = 200;
                ctx.body = { message: "Rider updated" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static deleteRider(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const riderId = +ctx.params.id;
            try {
                yield riderService_1.riderService.deleteRider(riderId);
                ctx.status = 200;
                ctx.body = { message: "Rider deleted" };
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
    (0, koa_swagger_decorator_1.request)("get", "/riders"),
    (0, koa_swagger_decorator_1.summary)("Get all info of all riders"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getAllRiders", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/riders/non-confidential"),
    (0, koa_swagger_decorator_1.summary)("Get non-confidential info of all riders"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getAllRidersLimited", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/riders/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find rider by id"),
    (0, koa_swagger_decorator_1.path)({
        riderId: { type: "number", required: true, description: "id of rider" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getRiderById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/riders/non-confidential/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find non-confidential info of rider by id"),
    (0, koa_swagger_decorator_1.path)({
        riderId: { type: "number", required: true, description: "id of rider" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getLimitedRiderById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/riders/fromTeam/{teamId}"),
    (0, koa_swagger_decorator_1.summary)("Find riders from team by teamId"),
    (0, koa_swagger_decorator_1.path)({
        teamId: { type: "number", required: true, description: "teamId of rider" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getRidersFromTeam", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/riders/withTeam/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find rider by id with team"),
    (0, koa_swagger_decorator_1.path)({
        riderId: { type: "number", required: true, description: "id of rider" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getRiderLimitedWithTeam", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/riders/byName/{first_name}{last_name}"),
    (0, koa_swagger_decorator_1.summary)("Find rider by name"),
    (0, koa_swagger_decorator_1.path)({
        first_name: { type: "string", required: true, description: "first name of rider" },
        last_name: { type: "string", required: true, description: "last name of rider" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getRiderByName", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/riders/byName/non-confidential/{first_name}{last_name}"),
    (0, koa_swagger_decorator_1.summary)("Find non-confidential info of rider by name"),
    (0, koa_swagger_decorator_1.path)({
        first_name: { type: "string", required: true, description: "first name of rider" },
        last_name: { type: "string", required: true, description: "last name of rider" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "getLimitedRiderByName", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/riders"),
    (0, koa_swagger_decorator_1.summary)("Create a new rider"),
    (0, koa_swagger_decorator_1.body)(rider_1.riderSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "createRider", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("put", "/riders/{id}"),
    (0, koa_swagger_decorator_1.summary)("Update rider by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of rider" },
    }),
    (0, koa_swagger_decorator_1.body)(rider_1.riderSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "updateRider", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("delete", "/riders/{id}"),
    (0, koa_swagger_decorator_1.summary)("Delete rider by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of rider" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RiderController, "deleteRider", null);
RiderController = __decorate([
    (0, koa_swagger_decorator_1.responsesAll)({
        200: { description: "success" },
        400: { description: "bad request" },
        401: { description: "unauthorized, missing/wrong jwt token" },
        404: { description: "not found" },
    }),
    (0, koa_swagger_decorator_1.tagsAll)(["Riders"])
], RiderController);
exports.default = RiderController;
//# sourceMappingURL=riderController.js.map