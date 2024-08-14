import { security, SwaggerRouter } from "koa-swagger-decorator";
import TeamController from "./controllers/teamController";
import { koaSwagger } from "koa2-swagger-ui";
import {requireAuthentication, makeRequireRole} from '../src/core/auth'

const routes = new SwaggerRouter();

// All Team Routes
routes.get("/teams",requireAuthentication, TeamController.getAllTeams)
routes.get("/teams/full/:id",requireAuthentication, TeamController.getTeamById);
routes.get("/teams/limited/:id", TeamController.getLimitedTeamById)
routes.get("/teams/full/:name", TeamController.getTeamByName);
routes.get("/teams/limited/:name", TeamController.getLimitedTeamByName)
routes.get("/teams/withFinancials/:id", TeamController.getTeamWithFinancials)
routes.get("/teams/withFinancials", TeamController.getAllTeamsWithFinancials)
routes.get("/teams/full/withRiders/:id", TeamController.getTeamWithRidersById);
routes.get("/teams/limited/withRiders/:id", TeamController.getTeamFullWithRidersById)
routes.get("/teams/full/withRiders", TeamController.getTeamsWithRiders);
routes.get("/teams/limited/withRiders", TeamController.getTeamsFullWithRiders);
routes.get("/teams/full/withSponsors/:id", TeamController.getTeamWithSponsors);
routes.get("/teams/limited/withSponsors/:id", TeamController.getTeamFullWithSponsors)
routes.get("/teams/full/withSponsors", TeamController.getTeamsWithSponsors);
routes.get("/teams/limited/withSponsors", TeamController.getTeamsFullWithSponsors);
routes.post("/teams", TeamController.createTeam);
routes.put("/teams", TeamController.updateTeam);
routes.del("/teams", TeamController.deleteTeam);



// Swagger docs
routes.swagger({
  title: "Cycling API with Swagger",
  description:
    "This is a simple CRUD API application made with Koa and documented with Swagger",
  version: "1.0.0",
  contact: {
    name: "CyclingAPI",
    url: "https://hogent.be",
    email: "jelle.leus@student.hogent.be",
  },
  securityDefinitions: {
    Bearer: { // This key matches the name displayed in Swagger UI
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter 'Bearer <token>' to authorize",
    },
  },
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
routes.mapDir(__dirname);

// Serve swagger-ui at /cdos;
routes.get(
  "/swagger",
  koaSwagger({
    routePrefix: false,
    swaggerOptions: { url: "/swagger-json" },
  })
);

export { routes };
