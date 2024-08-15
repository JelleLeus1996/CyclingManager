import { security, SwaggerRouter } from "koa-swagger-decorator";
import TeamController from "./controllers/teamController";
import { koaSwagger } from "koa2-swagger-ui";
import {requireAuthentication, makeRequireRole} from '../src/core/auth'
import { Role } from "./models/roles";
import UserController, { checkTeamIdViaUser } from "./controllers/userController";
import { checkTeamId } from "./core/utility";
import RiderController, { checkTeamIdViaRider } from "./controllers/riderController";
import SponsorController, { checkTeamIdViaSponsor} from "./controllers/sponsorController";
import RaceController from "./controllers/raceController";

const routes = new SwaggerRouter();


//Variable assigned for admin required requests
const requireAdmin = makeRequireRole(Role.ADMIN);

//Routes with 'Limited' = public info (non-confidential) everyone may see 
//Routes with 'Full' = All info with financials (confidential)

// User routes
routes.get("/users",requireAuthentication, requireAdmin, UserController.getAllUsers)
routes.get("/users/:id", requireAuthentication, checkTeamIdViaUser, UserController.getUserById)
routes.post("/users", UserController.login)
routes.put("/users", requireAuthentication, requireAdmin, UserController.updateUser);
routes.del("/users", requireAuthentication, requireAdmin, UserController.deleteUser);

// Team Routes
routes.get("/teams", requireAuthentication, TeamController.getAllTeams)
routes.get("/teams/full/:id", requireAuthentication, checkTeamId, TeamController.getTeamById);
routes.get("/teams/limited/:id", requireAuthentication, TeamController.getLimitedTeamById)
routes.get("/teams/full/:name", requireAuthentication, checkTeamId, TeamController.getTeamByName);
routes.get("/teams/limited/:name", requireAuthentication, TeamController.getLimitedTeamByName)
routes.get("/teams/withFinancials/:id", requireAuthentication, checkTeamId, TeamController.getTeamWithFinancials)
routes.get("/teams/withFinancials", requireAuthentication, requireAdmin, TeamController.getAllTeamsWithFinancials)
routes.get("/teams/full/withRiders/:id", requireAuthentication, checkTeamId, TeamController.getTeamWithRidersById);
routes.get("/teams/limited/withRiders/:id", requireAuthentication, TeamController.getTeamFullWithRidersById)
routes.get("/teams/full/withRiders", requireAuthentication, requireAdmin, TeamController.getTeamsWithRiders);
routes.get("/teams/limited/withRiders", requireAuthentication, TeamController.getTeamsFullWithRiders);
routes.get("/teams/full/withSponsors/:id", requireAuthentication, checkTeamId, TeamController.getTeamWithSponsors);
routes.get("/teams/limited/withSponsors/:id", requireAuthentication, TeamController.getTeamFullWithSponsors)
routes.get("/teams/full/withSponsors", requireAuthentication, requireAdmin, TeamController.getTeamsWithSponsors);
routes.get("/teams/limited/withSponsors", requireAuthentication, TeamController.getTeamsFullWithSponsors);
routes.post("/teams", requireAuthentication, requireAdmin, TeamController.createTeam);
routes.put("/teams", requireAuthentication, requireAdmin, TeamController.updateTeam);
routes.del("/teams", requireAuthentication, requireAdmin, TeamController.deleteTeam);

// Rider Routes
routes.get("/riders", requireAuthentication, requireAdmin, RiderController.getAllRiders)
routes.get("/riders/non-confidential", requireAuthentication, RiderController.getAllRidersLimited)
routes.get("/riders/full/:id", requireAuthentication, checkTeamIdViaRider, RiderController.getRiderById);
routes.get("/riders/non-confidential/:id", requireAuthentication, RiderController.getLimitedRiderById)
routes.get("/riders/byName/full/:first_name:last_name", requireAuthentication, checkTeamIdViaRider, RiderController.getRiderByName);
routes.get("/riders/byName/non-confidential/:first_name:last_name", requireAuthentication, RiderController.getLimitedRiderByName);
routes.get("/riders/fromTeam/:teamId", requireAuthentication, checkTeamId, RiderController.getRidersFromTeam)
routes.get("/riders/withTeam/:id", requireAuthentication, RiderController.getRiderLimitedWithTeam)
routes.post("/riders", requireAuthentication, requireAdmin, RiderController.createRider);
routes.put("/riders", requireAuthentication, requireAdmin, RiderController.updateRider);
routes.del("/riders", requireAuthentication, requireAdmin, RiderController.deleteRider);

// Sponsor Routes
routes.get("/sponsors", requireAuthentication, requireAdmin, SponsorController.getAllSponsors)
routes.get("/sponsors/non-confidential", requireAuthentication, SponsorController.getAllSponsorsLimitedWithTeam)
routes.get("/sponsors/full/:id", requireAuthentication, checkTeamIdViaSponsor, SponsorController.getSponsorById);
routes.get("/sponsors/forTeam/:teamId", requireAuthentication, SponsorController.getAllSponsorsLimitedForTeam)
routes.post("/sponsors", requireAuthentication, requireAdmin, SponsorController.createSponsor);
routes.put("/sponsors", requireAuthentication, requireAdmin, SponsorController.updateSponsor);
routes.del("/sponsors", requireAuthentication, requireAdmin, SponsorController.deleteSponsor);


//Race Routes
routes.get("/races", requireAuthentication, RaceController.getAllRaces);
routes.get("/races/:id", requireAuthentication, RaceController.getRaceById);
routes.get("/races/withTeams/:id", requireAuthentication, RaceController.getRaceWithTeamsById);
routes.get("/races/withTeamsAndRiders/:id", requireAuthentication, RaceController.getRaceWithTeamsAndRiders);
routes.post("/races", requireAuthentication, requireAdmin, RaceController.createRace);
routes.put("/races", requireAuthentication, requireAdmin, RaceController.updateRace);
routes.del("/races", requireAuthentication, requireAdmin, RaceController.deleteRace);



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
routes.get(
  "/swagger",
  koaSwagger({
    routePrefix: false,
    swaggerOptions: { url: "/swagger-json" },
  })
);

export { routes };
