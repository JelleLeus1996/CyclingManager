import { Context } from "koa";
import {
  request,
  summary,
  responsesAll,
  tagsAll,
  path,
  body,
  security,
} from "koa-swagger-decorator";
import { teamService } from "../services/teamService";
import { Team } from "../models/team";
import { teamSchema } from "../entities/team";

@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
  404: { description: "not found" },
})
@tagsAll(["Teams"])
export default class TeamController {
  //GET all teams non-confidential - VIEW: ALL
  @request("get", "/teams")
  @summary("Get all teams")
  @security([{ Bearer: [] }])
  public static async getAllTeams(ctx: Context): Promise<void> {
    const teams = await teamService.getAllTeams();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Teams not found" };
    }
  }

  //GET team full by id - VIEW: Admin & concerning user related to the team
  @request("get", "/teams/full/{id}")
  @summary("Find team by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamById(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const team = await teamService.getTeamById(teamId);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET team full by id - VIEW: Admin & concerning user related to the team
  @request("get", "/teams/limited/{id}")
  @summary("Find team by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getLimitedTeamById(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const team = await teamService.getLimitedTeamById(teamId);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET team full by name - VIEW: Admin & concerning user related to the team
  @request("get", "/teams/full/{name}")
  @summary("Find team by name")
  @security([{ Bearer: [] }])
  @path({
    name: { type: "string", required: true, description: "Name of team" },
  })
  public static async getTeamByName(ctx: Context): Promise<void> {
    const name = ctx.params.name;
    console.log(name);
    const team = await teamService.getTeamByName(name);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with name ${name} not found` };
    }
  }

  //GET team limited by name - VIEW: ALL
  @request("get", "/teams/limited/{name}")
  @summary("Find team by name")
  @security([{ Bearer: [] }])
  @path({
    name: { type: "string", required: true, description: "Name of team" },
  })
  public static async getLimitedTeamByName(ctx: Context): Promise<void> {
    const name = ctx.params.name;
    console.log(name);
    const team = await teamService.getLimitedTeamByName(name);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with name ${name} not found` };
    }
  }

  //GET team full with financials by id - VIEW: Admin & concerning user related to the team
  @request("get", "/teams/withFinancials/{id}")
  @summary("Get a team with financials")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamWithFinancials(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const teams = await teamService.getTeamWithFinancials(teamId);
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET all teams full - VIEW: Admin only
  @request("get", "/teams/withFinancials")
  @summary("Get all teams with financials")
  @security([{ Bearer: [] }])
  public static async getAllTeamsWithFinancials(ctx: Context): Promise<void> {
    const teams = await teamService.getAllTeamsWithFinancials();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Teams not found" };
    }
  }

  @request("get", "/teams/limited/withRiders/{id}")
  @summary("Find team with riders by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamWithRidersById(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const team = await teamService.getTeamWithRidersById(teamId);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET team full with all riders (id) - VIEW: Admin & concerning user related to the team
  @request("get", "/teams/full/withRiders/{id}")
  @summary("Find team with riders by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamFullWithRidersById(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const team = await teamService.getTeamFullWithRidersById(teamId);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET all teams limited with riders - VIEW: ALL
  @request("get", "/teams/limited/withRiders")
  @summary("Get all teams with riders")
  @security([{ Bearer: [] }])
  public static async getTeamsWithRiders(ctx: Context): Promise<void> {
    const teams = await teamService.getTeamsWithRiders();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Teams not found" };
    }
  }

  //GET all teams full with all riders - VIEW: Only Admin
  @request("get", "/teams/full/withRiders")
  @summary("Get all teams with riders")
  @security([{ Bearer: [] }])
  public static async getTeamsFullWithRiders(ctx: Context): Promise<void> {
    const teams = await teamService.getTeamsFullWithRiders();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Teams not found" };
    }
  }

  //GET team limited with sponsors (id) - VIEW: ALL
  @request("get", "/teams/limited/withSponsors/{id}")
  @summary("Find team with sponsors by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamWithSponsors(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const team = await teamService.getTeamWithSponsors(teamId);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET team full with sponsors (id) - VIEW: Admin & concerning user related to the team
  @request("get", "/teams/full/withSponsors/{id}")
  @summary("Find team with sponsors by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamFullWithSponsors(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const team = await teamService.getTeamFullWithSponsors(teamId);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET all teams full with sponsors (id) - VIEW: Admin & concerning user related to the team
  @request("get", "/teams/full/withSponsors")
  @summary("Get all teams with sponsors")
  @security([{ Bearer: [] }])
  public static async getTeamsFullWithSponsors(ctx: Context): Promise<void> {
    const teams = await teamService.getTeamsFullWithSponsors();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Teams not found" };
    }
  }

  //GET all teams limited with sponsors - VIEW: ALL
  @request("get", "/teams/limited/withSponsors")
  @summary("Get all teams with sponsors")
  @security([{ Bearer: [] }])
  public static async getTeamsWithSponsors(ctx: Context): Promise<void> {
    const teams = await teamService.getTeamsWithSponsors();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Teams not found" };
    }
  }

  //GET team by id with races - View: All
  @request("get", "/teams/withRaces/{id}")
  @summary("Find team with races by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamWithRaces(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    console.log(teamId);
    const team = await teamService.getTeamWithRaces(teamId);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${teamId} not found` };
    }
  }

  //GET all teams with races - View: All
  @request("get", "/teams/withRaces")
  @summary("Find all teams with races")
  @security([{ Bearer: [] }])
  public static async getTeamsWithRaces(ctx: Context): Promise<void> {
    const team = await teamService.getTeamsWithRaces();
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No teams found` };
    }
  }

  //POST team - Admin only
  @request("post", "/teams")
  @summary("Create a new team")
  @security([{ Bearer: [] }])
  @body(teamSchema)
  public static async createTeam(ctx: Context): Promise<void> {
    const teamToBeSaved: Team = {
      ...(ctx.request.body as Team),
    };

    try {
      await teamService.createTeam(teamToBeSaved);
      ctx.status = 200;
      ctx.body = { message: "Team created" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  //UPDATE team - Admin only
  @request("put", "/teams/{id}")
  @summary("Update team by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  @body(teamSchema)
  public static async updateTeam(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    const updatedTeam: Team = {
      ...(ctx.request.body as Team),
    };
    try {
      await teamService.updateTeam(teamId, updatedTeam);
      ctx.status = 200;
      ctx.body = { message: "Team updated" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  //DELETE team - Admin only
  @request("delete", "/teams/{id}")
  @summary("Delete team by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async deleteTeam(ctx: Context): Promise<void> {
    const teamId = +ctx.params.id;
    try {
      await teamService.deleteTeam(teamId);
      ctx.status = 200;
      ctx.body = { message: "Team deleted" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }
}
