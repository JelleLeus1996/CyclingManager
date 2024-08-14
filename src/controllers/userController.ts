import { Context } from "koa";
import {
  request,
  summary,
  responsesAll,
  tagsAll,
  path,
  body,
} from "koa-swagger-decorator";
import { userService } from "../services/userService";
import { UserWithPassword } from "../models/user";
import { userSchema } from "../entities/user";

@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
  404: { description: "not found" },
})

@tagsAll(["Users"])
export default class UserController {

  //GET all teams limited - VIEW: ALL
  @request("get", "/users")
  @summary("Get all users")
  public static async getAllUsers(ctx: Context): Promise<void> {
    const teams = await userService.getAllUsers();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Users not found" };
    }
  }
  @request("post", "/users/login")
  @summary("Login a user")
  @body({
    email: { type: "jelle.leus@student.hogent.be", required: true, description: "User's email" },
    password: { type: "password", required: true, description: "User's password" },
  })
  public static async login(ctx: Context): Promise<void> {
    const { email, password } = ctx.request.body as UserWithPassword;
    try {
      const { token, user } = await userService.login(email, password);
      ctx.status = 200;
      ctx.body = { token, user };
    } catch (error) {
        const err = error as Error;
        ctx.status = 400;
        ctx.body = { message: err.message };
    }
  }
}