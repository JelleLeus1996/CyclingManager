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
import { raceService } from "../services/raceService";
import { Race } from "../models/race";
import { raceSchema } from "../entities/race";

@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
  404: { description: "not found" },
})
@tagsAll(["Races"])
export default class RaceController {
  //GET all races - View: All
  @request("get", "/races")
  @summary("Get all races")
  @security([{ Bearer: [] }])
  public static async getAllRaces(ctx: Context): Promise<void> {
    const races = await raceService.getAllRaces();
    if (races) {
      ctx.status = 200;
      ctx.body = races;
    } else {
      ctx.status = 404;
      ctx.body = { message: "No races found" };
    }
  }

  //GET race by id - View: All
  @request("get", "/races/{id}")
  @summary("Find race by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of race" },
  })
  public static async getRaceById(ctx: Context): Promise<void> {
    const raceId = +ctx.params.id;
    console.log(raceId);
    const race = await raceService.getRaceById(raceId);
    if (race) {
      ctx.status = 200;
      ctx.body = race;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No race found with id ${raceId}` };
    }
  }

  //GET race by id with teams - View: All
  @request("get", "/races/withTeams/{id}")
  @summary("Find race with teams by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of race" },
  })
  public static async getRaceWithTeamsById(ctx: Context): Promise<void> {
    const raceId = +ctx.params.id;
    console.log(raceId);
    const race = await raceService.getRaceWithTeams(raceId);
    if (race) {
      ctx.status = 200;
      ctx.body = race;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No race found with id ${raceId}` };
    }
  }

  //GET race by id with teams and riders - View: All
  @request("get", "/races/withTeamsAndRiders/{id}")
  @summary("Find race with teams by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of race" },
  })
  public static async getRaceWithTeamsAndRiders(ctx: Context): Promise<void> {
    const raceId = +ctx.params.id;
    console.log(raceId);
    const race = await raceService.getRaceWithTeamsAndRiders(raceId);
    if (race) {
      ctx.status = 200;
      ctx.body = race;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No race found with id ${raceId}` };
    }
  }

  //POST race - only Admin
  @request("post", "/races")
  @summary("Create a new race")
  @security([{ Bearer: [] }])
  @body(raceSchema)
  public static async createRace(ctx: Context): Promise<void> {
    const raceToBeSaved: Race = {
      ...(ctx.request.body as Race),
    };

    try {
      await raceService.createRace(raceToBeSaved);
      ctx.status = 200;
      ctx.body = { message: "Race created" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  //UPDATE race - only Admin
  @request("put", "/races/{id}")
  @summary("Update race by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of race" },
  })
  @body(raceSchema)
  public static async updateRace(ctx: Context): Promise<void> {
    const raceId = +ctx.params.id;
    const updatedRace: Race = {
      ...(ctx.request.body as Race),
    };
    try {
      await raceService.updateRace(raceId, updatedRace);
      ctx.status = 200;
      ctx.body = { message: "Race updated" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  //DELETE race - only Admin
  @request("delete", "/races/{id}")
  @summary("Delete race by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of race" },
  })
  public static async deleteRace(ctx: Context): Promise<void> {
    const raceId = +ctx.params.id;
    try {
      await raceService.deleteRace(raceId);
      ctx.status = 200;
      ctx.body = { message: "Race deleted" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }
}
