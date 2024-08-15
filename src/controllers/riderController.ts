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
import { riderService } from "../services/riderService";
import { Rider } from "../models/rider";
import { riderSchema } from "../entities/rider";
import Koa from "koa";
import { checkTeam } from "../core/utility";

//Verification via paramater of rider to get teamId
export const checkTeamIdViaRider = async (ctx: Koa.Context, next: Koa.Next) => {
  const { id } = ctx.params;
  const rider = await riderService.getRiderById(Number(id));
  const teamId = rider?.teamId;
  if (teamId != null) {
    checkTeam(ctx, teamId);
  }
  return next();
};

@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
  404: { description: "not found" },
})
@tagsAll(["Riders"])
export default class RiderController {
  //GET all riders full - VIEW: Only Admin
  @request("get", "/riders")
  @summary("Get all info of all riders")
  @security([{ Bearer: [] }])
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

  //GET all riders limited - VIEW: ALL
  @request("get", "/riders/non-confidential")
  @summary("Get non-confidential info of all riders")
  @security([{ Bearer: [] }])
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

  //GET rider full (riderId) - VIEW: Admin & concerning user related to the team
  @request("get", "/riders/full/{id}")
  @summary("Find rider by id")
  @security([{ Bearer: [] }])
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

  //GET rider limited (riderId) - VIEW: ALL
  @request("get", "/riders/non-confidential/{id}")
  @summary("Find non-confidential info of rider by id")
  @security([{ Bearer: [] }])
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

  //GET rider full by name (first_name & last_name) - VIEW: Admin & concerning user related to the team
  @request("get", "/riders/byName/full/{first_name}{last_name}")
  @summary("Find rider by name")
  @security([{ Bearer: [] }])
  @path({
    first_name: {
      type: "string",
      required: true,
      description: "first name of rider",
    },
    last_name: {
      type: "string",
      required: true,
      description: "last name of rider",
    },
  })
  public static async getRiderByName(ctx: Context): Promise<void> {
    const first_name = ctx.params.first_name;
    const last_name = ctx.params.last_name;
    console.log(first_name, last_name);
    const rider = await riderService.getRiderByName(first_name, last_name);
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: `Rider with name ${first_name} ${last_name} not found`,
      };
    }
  }

  //GET rider limited by name (first_name & last_name) - VIEW: ALL
  @request("get", "/riders/byName/non-confidential/{first_name}{last_name}")
  @summary("Find non-confidential info of rider by name")
  @security([{ Bearer: [] }])
  @path({
    first_name: {
      type: "string",
      required: true,
      description: "first name of rider",
    },
    last_name: {
      type: "string",
      required: true,
      description: "last name of rider",
    },
  })
  public static async getLimitedRiderByName(ctx: Context): Promise<void> {
    const first_name = ctx.params.first_name;
    const last_name = ctx.params.last_name;
    console.log(first_name, last_name);
    const rider = await riderService.getLimitedRiderByName(
      first_name,
      last_name
    );
    if (rider) {
      ctx.status = 200;
      ctx.body = rider;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: `Rider with name ${first_name} ${last_name} not found`,
      };
    }
  }

  //GET riders full from teamId - VIEW: Admin & concerning user related to the team
  @request("get", "/riders/fromTeam/{teamId}")
  @summary("Find riders from team by teamId")
  @security([{ Bearer: [] }])
  @path({
    teamId: { type: "number", required: true, description: "teamId of rider" },
  })
  public static async getRidersFromTeam(ctx: Context): Promise<void> {
    const teamId = ctx.params.teamId;
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

  //GET riders limited with team (riderId) - VIEW: ALL
  @request("get", "/riders/withTeam/{id}")
  @summary("Find rider by id with team")
  @security([{ Bearer: [] }])
  @path({
    riderId: { type: "number", required: true, description: "id of rider" },
  })
  public static async getRiderLimitedWithTeam(ctx: Context): Promise<void> {
    const riderId = ctx.params.riderId;
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

  //CREATE rider - Only Admin
  @request("post", "/riders")
  @summary("Create a new rider")
  @security([{ Bearer: [] }])
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

  //UPDATE rider - Only Admin
  @request("put", "/riders/{id}")
  @summary("Update rider by id")
  @security([{ Bearer: [] }])
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

  //DELETE rider - only Admin
  @request("delete", "/riders/{id}")
  @summary("Delete rider by id")
  @security([{ Bearer: [] }])
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
