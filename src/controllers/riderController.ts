import { Context } from "koa";
import {
  request,
  summary,
  responsesAll,
  tagsAll,
  path,
  body,
} from "koa-swagger-decorator";
import { riderService } from "../services/riderService";
import { Rider } from "../models/rider";
import { riderSchema } from "../entities/rider";

@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
  404: { description: "not found" },
})
@tagsAll(["Riders"])
export default class RiderController {

  @request("get", "/riders")
  @summary("Get all info of all riders")
  public static async getAllRiders(ctx: Context): Promise<void> {
    const riders = await riderService.getAllRiders();
    if (riders) {
      ctx.status = 200;
      ctx.body = riders;
    } else {
      ctx.status = 404;
      ctx.body = { message: "No riders found" };
    }
  }

  @request("get", "/riders/non-confidential")
  @summary("Get non-confidential info of all riders")
  public static async getAllRidersLimited(ctx: Context): Promise<void> {
    const riders = await riderService.getAllRidersLimited();
    if (riders) {
      ctx.status = 200;
      ctx.body = riders;
    } else {
      ctx.status = 404;
      ctx.body = { message: "No riders found" };
    }
  }

  @request("get", "/riders/{id}")
  @summary("Find rider by id")
  @path({
    riderId: { type: "number", required: true, description: "id of rider" },
  })
  public static async getRiderById(ctx: Context): Promise<void> {
    const riderId = ctx.params.riderId;
    console.log(riderId);
    const rider = await riderService.getRiderById(riderId);
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No rider found with id ${riderId}` };
    }
  }

  @request("get", "/riders/non-confidential/{id}")
  @summary("Find non-confidential info of rider by id")
  @path({
    riderId: { type: "number", required: true, description: "id of rider" },
  })
  public static async getLimitedRiderById(ctx: Context): Promise<void> {
    const riderId = ctx.params.riderId;
    console.log(riderId);
    const rider = await riderService.getLimitedRiderById(riderId);
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No rider found with id ${riderId}` };
    }
  }

  @request("get", "/riders/fromTeam/{teamId}")
  @summary("Find riders from team by teamId")
  @path({
    teamId: { type: "number", required: true, description: "teamId of rider" },
  })
  public static async getRidersFromTeam(ctx: Context): Promise<void> {
    const teamId = ctx.params.teamId
    console.log(teamId);
    const rider = await riderService.getRidersFromTeam(teamId);
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No riders found with teamId ${teamId}` };
    }
  }
  @request("get", "/riders/withTeam/{id}")
  @summary("Find rider by id with team")
  @path({
    riderId: { type: "number", required: true, description: "id of rider" },
  })
  public static async getRiderLimitedWithTeam(ctx: Context): Promise<void> {
    const riderId = ctx.params.riderId
    console.log(riderId);
    const rider = await riderService.getRiderLimitedWithTeam(riderId);
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Rider with id ${riderId} not found` };
    }
  }

  @request("get", "/riders/byName/{first_name}{last_name}")
  @summary("Find rider by name")
  @path({
    first_name: { type: "string", required: true, description: "first name of rider" },
    last_name: { type: "string", required: true, description: "last name of rider" },
  })
  public static async getRiderByName(ctx: Context): Promise<void> {
    const first_name = ctx.params.first_name
    const last_name = ctx.params.last_name
    console.log(first_name, last_name);
    const rider = await riderService.getRiderByName(first_name,last_name);
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Rider with name ${first_name} ${last_name} not found` };
    }
  }

  @request("get", "/riders/byName/non-confidential/{first_name}{last_name}")
  @summary("Find non-confidential info of rider by name")
  @path({
    first_name: { type: "string", required: true, description: "first name of rider" },
    last_name: { type: "string", required: true, description: "last name of rider" },
  })
  public static async getLimitedRiderByName(ctx: Context): Promise<void> {
    const first_name = ctx.params.first_name
    const last_name = ctx.params.last_name
    console.log(first_name, last_name);
    const rider = await riderService.getLimitedRiderByName(first_name,last_name);
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Rider with name ${first_name} ${last_name} not found` };
    }
  }

  @request("post", "/riders")
  @summary("Create a new rider")
  @body(riderSchema)
  public static async createRider(ctx: Context): Promise<void> {
    const riderToBeSaved: Rider = {
      ...(ctx.request.body as Rider),
    };

    try {
      await riderService.createRider(riderToBeSaved);
      ctx.status = 200;
      ctx.body = { message: "Rider created" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  @request("put", "/riders/{id}")
  @summary("Update rider by id")
  @path({
    id: { type: "number", required: true, description: "id of rider" },
  })
  @body(riderSchema)
  public static async updateRider(ctx: Context): Promise<void> {
    const riderId = +ctx.params.id;
    const updatedRider: Rider = {
      ...(ctx.request.body as Rider),
    };
    try {
      await riderService.updateRider(riderId, updatedRider);
      ctx.status = 200;
      ctx.body = { message: "Rider updated" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  @request("delete", "/riders/{id}")
  @summary("Delete rider by id")
  @path({
    id: { type: "number", required: true, description: "id of rider" },
  })
  public static async deleteRider(ctx: Context): Promise<void> {
    const riderId = +ctx.params.id;
    try {
      await riderService.deleteRider(riderId);
      ctx.status = 200;
      ctx.body = { message: "Rider deleted" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }
}
