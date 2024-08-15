"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const teamController_1 = __importDefault(require("./controllers/teamController"));
const koa2_swagger_ui_1 = require("koa2-swagger-ui");
const auth_1 = require("../src/core/auth");
const roles_1 = require("./models/roles");
const routes = new koa_swagger_decorator_1.SwaggerRouter();
exports.routes = routes;
//Verification team via paramater
const checkTeamId = (ctx, next) => {
    const { teamId: paramTeamId } = ctx.params;
    // You can only get our own data unless you're an admin
    checkTeam(ctx, paramTeamId);
    return next();
};
//Verification team via session id or role
const checkTeam = (ctx, teamId) => {
    const { teamId: sessionTeamId, roles } = ctx.state.session;
    if (teamId !== sessionTeamId && !roles.includes(roles_1.Role.ADMIN)) {
        ctx.throw(403, 'You are not allowed to view this user\'s information', {
            code: 'FORBIDDEN',
        });
    }
};
//Variable assigned for admin required requests
const requireAdmin = (0, auth_1.makeRequireRole)(roles_1.Role.ADMIN);
// All Team Routes
routes.get("/teams", auth_1.requireAuthentication, teamController_1.default.getAllTeams);
routes.get("/teams/full/:id", auth_1.requireAuthentication, checkTeamId, teamController_1.default.getTeamById);
routes.get("/teams/limited/:id", teamController_1.default.getLimitedTeamById);
routes.get("/teams/full/:name", auth_1.requireAuthentication, teamController_1.default.getTeamByName);
routes.get("/teams/limited/:name", teamController_1.default.getLimitedTeamByName);
routes.get("/teams/withFinancials/:id", auth_1.requireAuthentication, teamController_1.default.getTeamWithFinancials);
routes.get("/teams/withFinancials", auth_1.requireAuthentication, teamController_1.default.getAllTeamsWithFinancials);
routes.get("/teams/full/withRiders/:id", teamController_1.default.getTeamWithRidersById);
routes.get("/teams/limited/withRiders/:id", teamController_1.default.getTeamFullWithRidersById);
routes.get("/teams/full/withRiders", teamController_1.default.getTeamsWithRiders);
routes.get("/teams/limited/withRiders", teamController_1.default.getTeamsFullWithRiders);
routes.get("/teams/full/withSponsors/:id", teamController_1.default.getTeamWithSponsors);
routes.get("/teams/limited/withSponsors/:id", teamController_1.default.getTeamFullWithSponsors);
routes.get("/teams/full/withSponsors", teamController_1.default.getTeamsWithSponsors);
routes.get("/teams/limited/withSponsors", teamController_1.default.getTeamsFullWithSponsors);
routes.post("/teams", teamController_1.default.createTeam);
routes.put("/teams", teamController_1.default.updateTeam);
routes.del("/teams", teamController_1.default.deleteTeam);
// Swagger docs
routes.swagger({
    title: "Cycling API with Swagger",
    description: "This is a simple CRUD API application made with Koa and documented with Swagger",
    version: "1.0.0",
    contact: {
        name: "CyclingAPI",
        url: "https://hogent.be",
        email: "jelle.leus@student.hogent.be",
    },
    swaggerOptions: {
        securityDefinitions: {
            Bearer: {
                // This key matches the name displayed in Swagger UI
                type: "apiKey",
                name: "Authorization",
                in: "header",
                description: "Enter 'Bearer <token>' to authorize",
            },
        },
    },
});
// mapDir will scan the input dir, and automatically call router.map to all Router Class
routes.mapDir(__dirname);
// Serve swagger-ui at /cdos;
routes.get("/swagger", (0, koa2_swagger_ui_1.koaSwagger)({
    routePrefix: false,
    swaggerOptions: { url: "/swagger-json" },
}));
//# sourceMappingURL=routes.js.map