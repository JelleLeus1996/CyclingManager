import { Context } from "koa";
import {
  request,
  summary,
  responsesAll,
  tagsAll,
  path,
  body,
} from "koa-swagger-decorator";
import { sponsorService } from "../services/sponsorService";
import { Sponsor } from "../models/sponsor";
import { sponsorSchema } from "../entities/sponsor";

@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
  404: { description: "not found" },
})
@tagsAll(["Sponsors"])
export default class SponsorController {
  @request("get", "/sponsors")
  @summary("Get all sponsors")
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

  @request("get", "/sponsors")
  @summary("Get all sponsors")
  public static async getAllSponsorsLimitedWithTeam(ctx: Context): Promise<void> {
    const sponsors = await sponsorService.getAllSponsorsLimitedWithTeam();
    if (sponsors) {
      ctx.status = 200;
      ctx.body = sponsors;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Sponsors not found" };
    }
  }


  @request("get", "/sponsors/{id}")
  @summary("Find sponsor by id")
  @path({
    id: { type: "number", required: true, description: "id of sponsor" },
  })
  public static async getSponsorById(ctx: Context): Promise<void> {
    const id = ctx.params.id
    console.log(id);
    const sponsor = await sponsorService.getSponsorById(id);
    if (sponsor) {
      ctx.status = 200;
      ctx.body = sponsor;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Sponsor with id ${id} not found`};
    }
  }

  @request("get", "/sponsors/forTeam/{teamId}")
  @summary("Find sponsors for team by teamId")
  @path({
    id: { type: "number", required: true, description: "id of team" },
  })
  public static async getAllSponsorsLimitedForTeam(ctx: Context): Promise<void> {
    const id = ctx.params.id
    console.log(id);
    const sponsor = await sponsorService.getAllSponsorsLimitedForTeam(id);
    if (sponsor) {
      ctx.status = 200;
      ctx.body = sponsor;
    } else {
      ctx.status = 404;
      ctx.body = { message: `Sponsors for team with id ${id} not found`};
    }
  }


  @request("post", "/sponsors")
  @summary("Create a new sponsor")
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

  @request("put", "/sponsors/{id}")
  @summary("Update sponsor by id")
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

  @request("delete", "/sponsors/{id}")
  @summary("Delete sponsor by id")
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
