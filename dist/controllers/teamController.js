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
const teamService_1 = require("../services/teamService");
const team_1 = require("../entities/team");
let TeamController = class TeamController {
    //GET all teams limited - VIEW: ALL
    static getAllTeams(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield teamService_1.teamService.getAllTeams();
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Teams not found" };
            }
        });
    }
    //GET team full by id (id) - VIEW: Admin & concerning user related to the team
    static getTeamById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params.id);
            const team = yield teamService_1.teamService.getTeamById(+ctx.params.id);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Team not found" };
            }
        });
    }
    //GET team full by id (id) - VIEW: Admin & concerning user related to the team
    static getLimitedTeamById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params.id);
            const team = yield teamService_1.teamService.getLimitedTeamById(+ctx.params.id);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Team not found" };
            }
        });
    }
    //GET team full by name (name) - VIEW: Admin & concerning user related to the team
    static getTeamByName(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = ctx.params.name;
            console.log(name);
            const team = yield teamService_1.teamService.getTeamByName(name);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Team with name ${name} not found` };
            }
        });
    }
    //GET team limited by name (name) - VIEW: ALL
    static getLimitedTeamByName(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = ctx.params.name;
            console.log(name);
            const team = yield teamService_1.teamService.getLimitedTeamByName(name);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Team with name ${name} not found` };
            }
        });
    }
    //GET team full (ID) - VIEW: Admin & concerning user related to the team
    static getTeamWithFinancials(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +ctx.params.id;
            console.log(id);
            const teams = yield teamService_1.teamService.getTeamWithFinancials(id);
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: `Team with id ${id} not found` };
            }
        });
    }
    //GET all teams full - VIEW: Admin only
    static getAllTeamsWithFinancials(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield teamService_1.teamService.getAllTeamsWithFinancials();
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Teams not found" };
            }
        });
    }
    static getTeamWithRidersById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params.id);
            const team = yield teamService_1.teamService.getTeamWithRidersById(+ctx.params.id);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Team not found" };
            }
        });
    }
    static getTeamFullWithRidersById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params.id);
            const team = yield teamService_1.teamService.getTeamFullWithRidersById(+ctx.params.id);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Team not found" };
            }
        });
    }
    //GET all teams limited - VIEW: ALL
    static getTeamsWithRiders(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield teamService_1.teamService.getTeamsWithRiders();
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Teams not found" };
            }
        });
    }
    //GET team full with all riders (id) - VIEW: ALL
    static getTeamsFullWithRiders(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield teamService_1.teamService.getTeamsFullWithRiders();
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Teams not found" };
            }
        });
    }
    static getTeamWithSponsors(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params.id);
            const team = yield teamService_1.teamService.getTeamWithSponsors(+ctx.params.id);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Team not found" };
            }
        });
    }
    static getTeamFullWithSponsors(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params.id);
            const team = yield teamService_1.teamService.getTeamFullWithSponsors(+ctx.params.id);
            if (team) {
                ctx.status = 200;
                ctx.body = team;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Team not found" };
            }
        });
    }
    //GET all teams full with sponsors (id) - VIEW: Admin & concerning user related to the team
    static getTeamsFullWithSponsors(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield teamService_1.teamService.getTeamsFullWithSponsors();
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Teams not found" };
            }
        });
    }
    //GET all teams limited with sponsors (id) - VIEW: ALL
    static getTeamsWithSponsors(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield teamService_1.teamService.getTeamsWithSponsors();
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Teams not found" };
            }
        });
    }
    static createTeam(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamToBeSaved = Object.assign({}, ctx.request.body);
            try {
                yield teamService_1.teamService.createTeam(teamToBeSaved);
                ctx.status = 200;
                ctx.body = { message: "Team created" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static updateTeam(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamId = +ctx.params.id;
            const updatedTeam = Object.assign({}, ctx.request.body);
            try {
                yield teamService_1.teamService.updateTeam(teamId, updatedTeam);
                ctx.status = 200;
                ctx.body = { message: "Team updated" };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
    static deleteTeam(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamId = +ctx.params.id;
            try {
                yield teamService_1.teamService.deleteTeam(teamId);
                ctx.status = 200;
                ctx.body = { message: "Team deleted" };
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
    (0, koa_swagger_decorator_1.request)("get", "/teams"),
    (0, koa_swagger_decorator_1.summary)("Get all teams"),
    (0, koa_swagger_decorator_1.security)([{ Bearer: [] }]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getAllTeams", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/full/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find team by id"),
    (0, koa_swagger_decorator_1.security)([{ Bearer: [] }]),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/limited/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find team by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getLimitedTeamById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/full/{name}"),
    (0, koa_swagger_decorator_1.summary)("Find team by name"),
    (0, koa_swagger_decorator_1.path)({
        name: { type: "string", required: true, description: "Name of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamByName", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/limited/{name}"),
    (0, koa_swagger_decorator_1.summary)("Find team by name"),
    (0, koa_swagger_decorator_1.path)({
        name: { type: "string", required: true, description: "Name of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getLimitedTeamByName", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/withFinancials/{id}"),
    (0, koa_swagger_decorator_1.summary)("Get a team with financials"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamWithFinancials", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/withFinancials"),
    (0, koa_swagger_decorator_1.summary)("Get all teams with financials"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getAllTeamsWithFinancials", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/limited/withRiders/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find team with riders by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamWithRidersById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/full/withRiders/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find team with riders by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamFullWithRidersById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/limited/withRiders"),
    (0, koa_swagger_decorator_1.summary)("Get all teams with riders"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamsWithRiders", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/full/withRiders"),
    (0, koa_swagger_decorator_1.summary)("Get all teams with riders"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamsFullWithRiders", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/limited/withSponsors/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find team with sponsors by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamWithSponsors", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/full/withSponsors/{id}"),
    (0, koa_swagger_decorator_1.summary)("Find team with sponsors by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamFullWithSponsors", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/full/withSponsors"),
    (0, koa_swagger_decorator_1.summary)("Get all teams with sponsors"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamsFullWithSponsors", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/teams/limited/withSponsors"),
    (0, koa_swagger_decorator_1.summary)("Get all teams with sponsors"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "getTeamsWithSponsors", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/teams"),
    (0, koa_swagger_decorator_1.summary)("Create a new team"),
    (0, koa_swagger_decorator_1.body)(team_1.teamSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "createTeam", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("put", "/teams/{id}"),
    (0, koa_swagger_decorator_1.summary)("Update team by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    (0, koa_swagger_decorator_1.body)(team_1.teamSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "updateTeam", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("delete", "/teams/{id}"),
    (0, koa_swagger_decorator_1.summary)("Delete team by id"),
    (0, koa_swagger_decorator_1.path)({
        id: { type: "number", required: true, description: "id of team" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController, "deleteTeam", null);
TeamController = __decorate([
    (0, koa_swagger_decorator_1.responsesAll)({
        200: { description: "success" },
        400: { description: "bad request" },
        401: { description: "unauthorized, missing/wrong jwt token" },
        404: { description: "not found" },
    }),
    (0, koa_swagger_decorator_1.tagsAll)(["Teams"])
], TeamController);
exports.default = TeamController;
//# sourceMappingURL=teamController.js.map