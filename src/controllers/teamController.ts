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

  //GET all teams limited - VIEW: ALL
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

    //GET team full by id (id) - VIEW: Admin & concerning team
  @request("get", "/teams/full/{id}")
  @summary("Find team by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamById(ctx: Context): Promise<void> {
    console.log(ctx.params.id);
    const team = await teamService.getTeamById(+ctx.params.id);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Team not found" };
    }
  }

  //GET team full by id (id) - VIEW: Admin & concerning team
  @request("get", "/teams/limited/{id}")
  @summary("Find team by id")
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getLimitedTeamById(ctx: Context): Promise<void> {
    console.log(ctx.params.id);
    const team = await teamService.getLimitedTeamById(+ctx.params.id);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Team not found" };
    }
  }

  //GET team full by name (name) - VIEW: Admin & concerning team
  @request("get", "/teams/full/{name}")
  @summary("Find team by name")
  @path({
    name: { type: "string", required: true, description: "Name of team" },
  })
  public static async getTeamByName(ctx: Context): Promise<void> {
    const name = ctx.params.name
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

  //GET team limited by name (name) - VIEW: ALL
  @request("get", "/teams/limited/{name}")
  @summary("Find team by name")
  @path({
    name: { type: "string", required: true, description: "Name of team" },
  })
  public static async getLimitedTeamByName(ctx: Context): Promise<void> {
    const name = ctx.params.name
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
  
  //GET team full (ID) - VIEW: Admin & concerning team
  @request("get", "/teams/withFinancials/{id}")
  @summary("Get a team with financials")
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamWithFinancials(ctx: Context): Promise<void> {
    const id = +ctx.params.id;
    console.log(id);
    const teams = await teamService.getTeamWithFinancials(id);
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Team with id ${id} not found`  };
    }
  }

  //GET all teams full - VIEW: Admin only
  @request("get", "/teams/withFinancials")
  @summary("Get all teams with financials")
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
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamWithRidersById(ctx: Context): Promise<void> {
    console.log(ctx.params.id);
    const team = await teamService.getTeamWithRidersById(+ctx.params.id);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Team not found" };
    }
  }

  @request("get", "/teams/full/withRiders/{id}")
  @summary("Find team with riders by id")
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamFullWithRidersById(ctx: Context): Promise<void> {
    console.log(ctx.params.id);
    const team = await teamService.getTeamFullWithRidersById(+ctx.params.id);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Team not found" };
    }
  }

  //GET all teams limited - VIEW: ALL
  @request("get", "/teams/limited/withRiders")
  @summary("Get all teams with riders")
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

  //GET team full with all riders (id) - VIEW: ALL
  @request("get", "/teams/full/withRiders")
  @summary("Get all teams with riders")
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

  @request("get", "/teams/limited/withSponsors/{id}")
  @summary("Find team with sponsors by id")
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamWithSponsors(ctx: Context): Promise<void> {
    console.log(ctx.params.id);
    const team = await teamService.getTeamWithSponsors(+ctx.params.id);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Team not found" };
    }
  }

  @request("get", "/teams/full/withSponsors/{id}")
  @summary("Find team with sponsors by id")
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getTeamFullWithSponsors(ctx: Context): Promise<void> {
    console.log(ctx.params.id);
    const team = await teamService.getTeamFullWithSponsors(+ctx.params.id);
    if (team) {
      ctx.status = 200;
      ctx.body = team;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Team not found" };
    }
  }

  //GET all teams full with sponsors (id) - VIEW: Admin & concerning team
  @request("get", "/teams/full/withSponsors")
  @summary("Get all teams with sponsors")
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

  //GET all teams limited with sponsors (id) - VIEW: ALL
  @request("get", "/teams/limited/withSponsors")
  @summary("Get all teams with sponsors")
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

  @request("post", "/teams")
  @summary("Create a new team")
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


  @request("put", "/teams/{id}")
  @summary("Update team by id")
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

  @request("delete", "/teams/{id}")
  @summary("Delete team by id")
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
