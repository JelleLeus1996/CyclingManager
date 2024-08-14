import { Context } from "koa";
import {
  request,
  summary,
  responsesAll,
  tagsAll,
  path,
  body,
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
  @request("get", "/races")
  @summary("Get all races")
  public static async getAllRaces(ctx: Context): Promise<void> {
    const races = await raceService.getAllRaces();
    if (races) {
      ctx.status = 200;
      ctx.body = races;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Races not found" };
    }
  }

  @request("get", "/races/{id}")
  @summary("Find race by id")
  @path({
    id: { type: "number", required: true, description: "id of race" },
  })
  public static async getRaceById(ctx: Context): Promise<void> {
    console.log(ctx.params.id);
    const race = await raceService.getRaceById(+ctx.params.id);
    if (race) {
      ctx.status = 200;
      ctx.body = race;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Race not found" };
    }
  }

  @request("post", "/races")
  @summary("Create a new race")
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

  @request("put", "/races/{id}")
  @summary("Update race by id")
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

  @request("delete", "/races/{id}")
  @summary("Delete race by id")
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
