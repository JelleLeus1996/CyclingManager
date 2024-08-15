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
import { sponsorService } from "../services/sponsorService";
import { Sponsor } from "../models/sponsor";
import { sponsorSchema } from "../entities/sponsor";
import Koa from "koa";
import { checkTeam } from "../core/utility";

//Verification via paramater of sponsor to get teamId
export const checkTeamIdViaSponsor = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  const { id } = ctx.params;
  const sponsor = await sponsorService.getSponsorById(Number(id));
  const teamId = sponsor?.teamId;
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
@tagsAll(["Sponsors"])
export default class SponsorController {
  //GET all sponsors full - VIEW: Admin
  @request("get", "/sponsors")
  @summary("Get all sponsors")
  @security([{ Bearer: [] }])
  public static async getAllSponsors(ctx: Context): Promise<void> {
    const sponsors = await sponsorService.getAllSponsors();
    if (sponsors) {
      ctx.status = 200;
      ctx.body = sponsors;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Sponsors not found" };
    }
  }

  //GET all sponsors limited with team - VIEW: ALL
  @request("get", "/sponsors/non-confidential")
  @summary("Get all sponsors")
  @security([{ Bearer: [] }])
  public static async getAllSponsorsLimitedWithTeam(
    ctx: Context
  ): Promise<void> {
    const sponsors = await sponsorService.getAllSponsorsLimitedWithTeam();
    if (sponsors) {
      ctx.status = 200;
      ctx.body = sponsors;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Sponsors not found" };
    }
  }

  //GET sponsor full by Id - VIEW: Admin & concerning user related to the team
  @request("get", "/sponsors/{id}")
  @summary("Find sponsor by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of sponsor" },
  })
  public static async getSponsorById(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    console.log(id);
    const sponsor = await sponsorService.getSponsorById(id);
    if (sponsor) {
      ctx.status = 200;
      ctx.body = sponsor;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Sponsor with id ${id} not found` };
    }
  }

  //GET all sponsors of a team - VIEW: ALL
  @request("get", "/sponsors/forTeam/{teamId}")
  @summary("Find sponsors for team by teamId")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getAllSponsorsLimitedForTeam(
    ctx: Context
  ): Promise<void> {
    const id = ctx.params.id;
    console.log(id);
    const sponsor = await sponsorService.getAllSponsorsLimitedForTeam(id);
    if (sponsor) {
      ctx.status = 200;
      ctx.body = sponsor;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Sponsors for team with id ${id} not found` };
    }
  }

  //CREATE sponsor - Admin only
  @request("post", "/sponsors")
  @summary("Create a new sponsor")
  @security([{ Bearer: [] }])
  @body(sponsorSchema)
  public static async createSponsor(ctx: Context): Promise<void> {
    const sponsorToBeSaved: Sponsor = {
      ...(ctx.request.body as Sponsor),
    };

    try {
      await sponsorService.createSponsor(sponsorToBeSaved);
      ctx.status = 200;
      ctx.body = { message: "Sponsor created" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  //UPDATE sponsor - Admin only
  @request("put", "/sponsors/{id}")
  @summary("Update sponsor by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of sponsor" },
  })
  @body(sponsorSchema)
  public static async updateSponsor(ctx: Context): Promise<void> {
    const sponsorId = +ctx.params.id;
    const updatedSponsor: Sponsor = {
      ...(ctx.request.body as Sponsor),
    };
    try {
      await sponsorService.updateSponsor(sponsorId, updatedSponsor);
      ctx.status = 200;
      ctx.body = { message: "Sponsor updated" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  //DELETE sponsor - Admin only
  @request("delete", "/sponsors/{id}")
  @summary("Delete sponsor by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of sponsor" },
  })
  public static async deleteSponsor(ctx: Context): Promise<void> {
    const sponsorId = +ctx.params.id;
    try {
      await sponsorService.deleteSponsor(sponsorId);
      ctx.status = 200;
      ctx.body = { message: "Sponsor deleted" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }
}
